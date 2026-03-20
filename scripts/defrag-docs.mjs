#!/usr/bin/env node

/**
 * Docs defragmentation script.
 *
 * Three-stage flow:
 *   1. Analysis: Read all pages in each section together, produce a report
 *      of cross-page issues (redundancy, terminology drift, missing links)
 *      including structured content relocations.
 *   2. Relocation: For each identified relocation, send source + target
 *      files together and get both back edited atomically.
 *   3. Editing: For each file that needs changes, send the file + the
 *      relevant report, get back the complete corrected file.
 *
 * Build verification is handled separately by confirm-build.mjs.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-docs.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-docs.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { structuredPatch } from "diff";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const DOCS_DIR = join(ROOT, "docs", "pages");
const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";
const DRY_RUN = process.argv.includes("--dry-run");
const MAX_HUNK_LINES = 10;

// Sections to skip (editorial content, not reference docs)
const SKIP_DIRS = new Set(["blog"]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadTextFile(path) {
    return readFileSync(path, "utf-8");
}

function collectDocFiles(dir, base = dir) {
    const results = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const rel = relative(base, full);
        const stat = statSync(full);
        if (stat.isDirectory()) {
            const topDir = rel.split("/")[0];
            if (SKIP_DIRS.has(topDir)) continue;
            results.push(...collectDocFiles(full, base));
        } else if (/\.(md|mdx)$/.test(entry)) {
            results.push({ path: full, rel });
        }
    }
    return results;
}

function groupBySection(files) {
    const groups = {};
    for (const f of files) {
        const section = dirname(f.rel).split("/")[0] || "_root";
        if (!groups[section]) groups[section] = [];
        groups[section].push(f);
    }
    return groups;
}

/**
 * Check if any single diff hunk exceeds the size limit.
 * Returns { ok: true } if all hunks are within limits,
 * or { ok: false, maxHunkSize, hunks } with details if not.
 */
function checkHunkSizes(original, corrected, filename) {
    const patch = structuredPatch(filename, filename, original, corrected);
    let maxHunkSize = 0;
    const oversized = [];
    for (const hunk of patch.hunks) {
        const changedLines = hunk.lines.filter(
            (l) => l.startsWith("+") || l.startsWith("-")
        ).length;
        if (changedLines > maxHunkSize) maxHunkSize = changedLines;
        if (changedLines > MAX_HUNK_LINES) {
            oversized.push({
                start: hunk.oldStart,
                changedLines,
            });
        }
    }
    if (oversized.length > 0) {
        return { ok: false, maxHunkSize, hunks: oversized };
    }
    return { ok: true, maxHunkSize, hunks: [] };
}

async function callClaude(system, userContent, maxTokens = 16000) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY environment variable is required");
    }

    const body = {
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: userContent }],
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Claude API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data.content[0].text;
}

// ---------------------------------------------------------------------------
// Stage 1: Analysis — produce a report per section
// ---------------------------------------------------------------------------

const ANALYSIS_SYSTEM = `You are a documentation editor for the Dojo framework (on-chain game engine on Starknet).

You will receive all documentation pages from one section of the docs.
Analyze them for cross-page issues and produce a structured report.

Focus on:
1. **Redundancy**: Content duplicated or substantially repeated across pages. Identify which page has the best version and which pages should defer to it.
2. **Terminology inconsistency**: The same concept referred to with different terms across pages.
3. **Missing cross-references**: Pages that discuss related topics but don't link to each other.
4. **Content relocations**: Content that lives in the wrong page and should be moved to a more appropriate one. Only flag this for substantial blocks of content (multiple paragraphs or sections), not individual sentences.

Do NOT flag:
- Issues that are purely within a single page (formatting, sentence structure)
- Minor stylistic preferences
- Code block content

Output format — a plain text report with sections:

## Redundancy
- [description of duplicated content, which files, which version to keep]

## Terminology
- [inconsistent term]: used as "[X]" in file A, "[Y]" in file B. Prefer "[Z]".

## Missing cross-references
- file A should link to file B when discussing [topic]

## Relocations

For each content relocation, use this exact format (one per block):

RELOCATE
from: [source filename relative to docs/pages/]
to: [target filename relative to docs/pages/]
description: [what content to move and where to place it in the target]
END_RELOCATE

If no relocations are needed, write "None found." under this section.`;

function buildAnalysisPrompt(section, files) {
    const fileContents = files
        .map((f) => `--- FILE: ${f.rel} ---\n${loadTextFile(f.path)}`)
        .join("\n\n");

    return `Analyze these ${files.length} documentation pages from the "${section}" section:\n\n${fileContents}`;
}

// ---------------------------------------------------------------------------
// Stage 1.5: Relocation — move content between files atomically
// ---------------------------------------------------------------------------

function parseRelocations(report) {
    const relocations = [];
    const regex = /RELOCATE\nfrom:\s*(.+)\nto:\s*(.+)\ndescription:\s*(.+(?:\n(?!END_RELOCATE).+)*)\nEND_RELOCATE/g;
    let match;
    while ((match = regex.exec(report)) !== null) {
        relocations.push({
            from: match[1].trim(),
            to: match[2].trim(),
            description: match[3].trim(),
        });
    }
    return relocations;
}

const RELOCATION_SYSTEM = `You are a documentation editor for the Dojo framework.

You will receive two documentation files and a description of content that should be moved from the source file to the target file.

Your job is to:
1. Move the described content from the source to an appropriate location in the target.
2. In the source, replace the moved content with a brief cross-reference link to the target.
3. Preserve all other content in both files exactly as-is.

Return your response in this exact format:

--- SOURCE ---
[complete corrected source file content]
--- TARGET ---
[complete corrected target file content]

Rules:
- Return ONLY the two file contents in the format above — no other commentary.
- Preserve all frontmatter, code blocks, and existing links.
- The moved content should fit naturally into the target page's structure.
- The cross-reference in the source should be a brief sentence with a markdown link.
- Do not make any other changes to either file beyond the relocation.`;

function buildRelocationPrompt(relocation, allFiles) {
    const sourceFile = allFiles.find((f) => f.rel === relocation.from);
    const targetFile = allFiles.find((f) => f.rel === relocation.to);
    if (!sourceFile || !targetFile) return null;

    const sourceContent = loadTextFile(sourceFile.path);
    const targetContent = loadTextFile(targetFile.path);

    return `## Relocation description

${relocation.description}

## Source file: ${relocation.from}

${sourceContent}

## Target file: ${relocation.to}

${targetContent}`;
}

function parseRelocationResponse(response) {
    const sourceMatch = response.match(/--- SOURCE ---\n([\s\S]*?)(?=--- TARGET ---)/);
    const targetMatch = response.match(/--- TARGET ---\n([\s\S]*?)$/);
    if (!sourceMatch || !targetMatch) return null;
    return {
        source: sourceMatch[1].trim(),
        target: targetMatch[1].trim(),
    };
}

// ---------------------------------------------------------------------------
// Stage 2: Editing — rewrite files based on the report
// ---------------------------------------------------------------------------

function buildEditSystemPrompt(styleGuide) {
    return `You are a documentation editor for the Dojo framework.

You will receive:
1. An editorial report describing cross-page issues found in a documentation section.
2. A single documentation file to edit.

Your job is to return the COMPLETE corrected file content, addressing both:
- Issues from the report that apply to this file
- Within-page issues: one-sentence-per-line violations, formatting inconsistencies, redundant prose

## Style guide
${styleGuide}

## Rules
- Return ONLY the corrected file content — no commentary, no wrapping, no code fences.
- Preserve all frontmatter, code blocks, and link URLs exactly.
- One sentence per line is MANDATORY for prose paragraphs. This does NOT apply to list items, headings, code blocks, or frontmatter.
- Do NOT convert :::note, :::warning, :::tip, or :::info blocks to blockquote format. This site uses Vocs, which renders ::: blocks as styled callout boxes.
- Do NOT use HTML comments (<!-- -->) in .mdx files — MDX cannot parse them. Use JSX comments instead: {/* comment */}
- ECS terms (model, system, entity, event, world) must be lowercase in prose. Do NOT capitalize "Model", "System", etc. unless in a heading, link text, or table header.
- Do not invent new content or add explanations that weren't there.
- Keep each continuous change small — no single diff hunk should touch more than ${MAX_HUNK_LINES} lines. If the report suggests a larger change, add a TODO comment instead: {/* TODO: deduplicate with [target page] */}
- Do not remove content that is unique and correct — only trim true redundancy.
- Do NOT delete content and replace it with a cross-reference unless you are certain the target page already contains equivalent information. If unsure, leave the content in place.
- When the report says to replace duplicated content with a cross-reference, verify that the linked page covers the same material before removing anything.
- When adding or modifying links, ONLY use targets from the valid routes list provided. Use extensionless relative links (e.g. "./introspection" not "../introspection.md").
- If the file needs no changes, return it exactly as-is.
- Preserve the original voice and technical accuracy.
- Use *single asterisks* for italics and **double asterisks** for bold. Do not use underscores for emphasis.`;
}

function buildEditPrompt(report, file, routeList) {
    const content = loadTextFile(file.path);

    return `## Valid routes in this site

${routeList}

## Editorial report for this section

${report}

## File to edit: ${file.rel}

${content}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    console.log("=== Dojo Docs Defragmentation ===");
    console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
    console.log(`Max lines per diff hunk: ${MAX_HUNK_LINES}`);
    console.log();

    const styleGuide = loadTextFile(join(ROOT, "spec", "style-guide.md"));
    const editSystemPrompt = buildEditSystemPrompt(styleGuide);

    const allFiles = collectDocFiles(DOCS_DIR);
    const validRoutes = getValidRoutes();
    const routeList = validRoutes.join("\n");
    const sections = groupBySection(allFiles);

    console.log(
        `Found ${allFiles.length} doc files across ${Object.keys(sections).length} sections`
    );
    console.log();

    let filesChanged = 0;
    let filesUnchanged = 0;
    let filesErrored = 0;
    let filesSkipped = 0;
    const changeLog = [];
    const skipLog = [];

    for (const [section, files] of Object.entries(sections)) {
        console.log(`\n=== Section: ${section} (${files.length} files) ===`);

        // Stage 1: Analyze the section
        let report = "No cross-page issues (single-file section).";
        if (files.length >= 2) {
            console.log("  Analyzing cross-page issues...");
            try {
                report = await callClaude(
                    ANALYSIS_SYSTEM,
                    buildAnalysisPrompt(section, files)
                );
                console.log("  Report generated.");
            } catch (err) {
                console.error(`  Analysis failed: ${err.message}`);
                report =
                    "Analysis unavailable due to error. Focus on within-page issues only.";
            }
        }

        // Stage 1.5: Process relocations from the report
        const relocations = parseRelocations(report);
        if (relocations.length > 0) {
            console.log(
                `  Found ${relocations.length} relocation(s) to process.`
            );
            for (const reloc of relocations) {
                console.log(`    Moving content: ${reloc.from} → ${reloc.to}`);
                const prompt = buildRelocationPrompt(reloc, allFiles);
                if (!prompt) {
                    console.log(`    Skipped: file not found.`);
                    continue;
                }
                try {
                    const response = await callClaude(
                        RELOCATION_SYSTEM,
                        prompt,
                        32000
                    );
                    const parsed = parseRelocationResponse(response);
                    if (!parsed) {
                        console.log(`    Skipped: could not parse response.`);
                        continue;
                    }
                    const sourceFile = allFiles.find(
                        (f) => f.rel === reloc.from
                    );
                    const targetFile = allFiles.find(
                        (f) => f.rel === reloc.to
                    );
                    const sourceOrig = loadTextFile(sourceFile.path);
                    const targetOrig = loadTextFile(targetFile.path);
                    const sourceCheck = checkHunkSizes(sourceOrig, parsed.source, reloc.from);
                    const targetCheck = checkHunkSizes(targetOrig, parsed.target, reloc.to);
                    if (!sourceCheck.ok || !targetCheck.ok) {
                        const details = [];
                        if (!sourceCheck.ok) details.push(`${reloc.from}: hunk of ${sourceCheck.maxHunkSize} lines`);
                        if (!targetCheck.ok) details.push(`${reloc.to}: hunk of ${targetCheck.maxHunkSize} lines`);
                        console.log(`    SKIPPED relocation: oversized hunks (${details.join(", ")})`);
                        filesSkipped += 2;
                        skipLog.push({ file: reloc.from, reason: "relocation", maxHunkSize: sourceCheck.maxHunkSize, hunks: sourceCheck.hunks });
                        skipLog.push({ file: reloc.to, reason: "relocation", maxHunkSize: targetCheck.maxHunkSize, hunks: targetCheck.hunks });
                        continue;
                    }
                    if (!DRY_RUN) {
                        writeFileSync(sourceFile.path, parsed.source, "utf-8");
                        writeFileSync(targetFile.path, parsed.target, "utf-8");
                    }
                    // Track both files as changed
                    if (!changeLog.includes(reloc.from)) {
                        changeLog.push(reloc.from);
                        filesChanged++;
                    }
                    if (!changeLog.includes(reloc.to)) {
                        changeLog.push(reloc.to);
                        filesChanged++;
                    }
                    console.log(`    Done.`);
                } catch (err) {
                    console.error(`    Relocation failed: ${err.message}`);
                }
            }
        }

        // Stage 2: Edit each file with the report as context
        for (const file of files) {
            const original = loadTextFile(file.path);
            console.log(`  Editing ${file.rel}...`);

            try {
                const corrected = await callClaude(
                    editSystemPrompt,
                    buildEditPrompt(report, file, routeList),
                    Math.max(16000, Math.ceil(original.length / 3))
                );

                // Normalize trailing newline before comparing
                let normalizedCorrected = corrected.replace(/\n*$/, "\n");

                // Safety: convert HTML comments to JSX comments in MDX files
                // (MDX cannot parse <!-- --> syntax)
                if (file.rel.endsWith(".mdx")) {
                    normalizedCorrected = normalizedCorrected.replace(
                        /<!--([\s\S]*?)-->/g,
                        (_match, inner) => `{/*${inner}*/}`
                    );
                }

                if (normalizedCorrected === original) {
                    console.log(`    No changes.`);
                    filesUnchanged++;
                    continue;
                }

                // Size guard: reject files with any oversized diff hunk
                const sizeCheck = checkHunkSizes(original, normalizedCorrected, file.rel);
                if (!sizeCheck.ok) {
                    console.log(
                        `    SKIPPED: hunk of ${sizeCheck.maxHunkSize} lines (limit: ${MAX_HUNK_LINES})`
                    );
                    filesSkipped++;
                    skipLog.push({ file: file.rel, reason: "edit", maxHunkSize: sizeCheck.maxHunkSize, hunks: sizeCheck.hunks });
                    continue;
                }

                if (!DRY_RUN) {
                    writeFileSync(file.path, normalizedCorrected, "utf-8");
                }
                filesChanged++;
                changeLog.push(file.rel);
                console.log(`    Updated (max hunk: ${sizeCheck.maxHunkSize} lines).`);
            } catch (err) {
                console.error(`    Error: ${err.message}`);
                filesErrored++;
            }
        }
    }

    // Summary
    console.log("\n=== Summary ===");
    console.log(`Files changed:   ${filesChanged}`);
    console.log(`Files unchanged: ${filesUnchanged}`);
    console.log(`Files skipped:   ${filesSkipped}`);
    console.log(`Files errored:   ${filesErrored}`);

    if (changeLog.length > 0) {
        console.log("\n=== Changed files ===");
        for (const f of changeLog) {
            console.log(`- ${f}`);
        }
    }

    if (skipLog.length > 0) {
        console.log("\n=== Skipped files (oversized hunks — needs manual review) ===");
        for (const entry of skipLog) {
            const hunkDetail = entry.hunks.map((h) => `line ${h.start} (${h.changedLines} lines)`).join(", ");
            console.log(`- ${entry.file} [${entry.reason}]: max hunk ${entry.maxHunkSize} lines — ${hunkDetail}`);
        }

        // Create a GitHub issue with all skipped changes
        if (!DRY_RUN && process.env.GITHUB_ACTIONS) {
            await createSkipIssue(skipLog);
        }
    }

    if (filesChanged === 0 && filesSkipped === 0) {
        console.log("\nNo changes needed — docs are clean!");
    }
}

async function createSkipIssue(skipLog) {
    const rows = skipLog.map((entry) => {
        const hunks = entry.hunks
            .map((h) => `line ${h.start} (${h.changedLines} lines)`)
            .join(", ");
        return `| \`${entry.file}\` | ${entry.reason} | ${entry.maxHunkSize} | ${hunks} |`;
    });

    const body = `## Defrag: skipped changes need manual review

The monthly defrag workflow skipped the following files because they contained
diff hunks larger than ${MAX_HUNK_LINES} lines. These changes may still be valid
but need a human to review and apply manually.

| File | Stage | Max hunk | Oversized hunks |
|------|-------|----------|-----------------|
${rows.join("\n")}

> Created automatically by the defrag workflow.`;

    try {
        const res = await fetch("https://api.github.com/repos/dojoengine/book/issues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                title: "defrag: skipped changes need manual review",
                body,
                labels: ["documentation"],
            }),
        });
        if (res.ok) {
            const issue = await res.json();
            console.log(`\nCreated issue #${issue.number}: ${issue.html_url}`);
        } else {
            console.error(`Failed to create issue: ${res.status} ${await res.text()}`);
        }
    } catch (err) {
        console.error(`Failed to create issue: ${err.message}`);
    }
}

// ---------------------------------------------------------------------------
// Helpers used by both this script and the route list
// ---------------------------------------------------------------------------

function getValidRoutes() {
    const files = collectDocFiles(DOCS_DIR);
    return files.map((f) => "/" + f.rel.replace(/\.(md|mdx)$/, "").replace(/\/index$/, ""));
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
