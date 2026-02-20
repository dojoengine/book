#!/usr/bin/env node

/**
 * Docs defragmentation script.
 *
 * Two-stage flow:
 *   1. Analysis: Read all pages in each section together, produce a report
 *      of cross-page issues (redundancy, terminology drift, missing links).
 *   2. Editing: For each file that needs changes, send the file + the
 *      relevant report, get back the complete corrected file.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-docs.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-docs.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const DOCS_DIR = join(ROOT, "docs", "pages");
const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";
const DRY_RUN = process.argv.includes("--dry-run");

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
4. **Structural issues**: Pages that overlap in scope or whose boundaries are unclear.

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

## Structural issues
- [description]

If a category has no issues, write "None found." under it.`;

function buildAnalysisPrompt(section, files) {
    const fileContents = files
        .map((f) => `--- FILE: ${f.rel} ---\n${loadTextFile(f.path)}`)
        .join("\n\n");

    return `Analyze these ${files.length} documentation pages from the "${section}" section:\n\n${fileContents}`;
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
- Do not invent new content or add explanations that weren't there.
- Do not remove content that is unique and correct — only trim true redundancy.
- When the report says to replace duplicated content with a cross-reference, use a brief mention with a markdown link to the canonical page.
- If the file needs no changes, return it exactly as-is.
- Preserve the original voice and technical accuracy.`;
}

function buildEditPrompt(report, file) {
    const content = loadTextFile(file.path);

    return `## Editorial report for this section

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
    console.log();

    const styleGuide = loadTextFile(join(ROOT, "spec", "style-guide.md"));
    const editSystemPrompt = buildEditSystemPrompt(styleGuide);

    const allFiles = collectDocFiles(DOCS_DIR);
    const sections = groupBySection(allFiles);

    console.log(
        `Found ${allFiles.length} doc files across ${Object.keys(sections).length} sections`
    );
    console.log();

    let filesChanged = 0;
    let filesUnchanged = 0;
    let filesErrored = 0;
    const changeLog = [];

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

        // Stage 2: Edit each file with the report as context
        for (const file of files) {
            const original = loadTextFile(file.path);
            console.log(`  Editing ${file.rel}...`);

            try {
                const corrected = await callClaude(
                    editSystemPrompt,
                    buildEditPrompt(report, file),
                    Math.max(16000, Math.ceil(original.length / 3))
                );

                if (corrected.trim() === original.trim()) {
                    console.log(`    No changes.`);
                    filesUnchanged++;
                } else {
                    if (!DRY_RUN) {
                        writeFileSync(file.path, corrected, "utf-8");
                    }
                    filesChanged++;
                    changeLog.push(file.rel);
                    console.log(`    Updated.`);
                }
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
    console.log(`Files errored:   ${filesErrored}`);

    if (changeLog.length > 0) {
        console.log("\n=== Changed files ===");
        for (const f of changeLog) {
            console.log(`- ${f}`);
        }
    } else {
        console.log("\nNo changes needed — docs are clean!");
    }
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
