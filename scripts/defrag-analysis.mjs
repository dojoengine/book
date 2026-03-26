#!/usr/bin/env node

/**
 * Pass C: Cross-page analysis.
 *
 * Reads all pages in each section together and identifies structural issues:
 *   - Redundancy (duplicated content across pages)
 *   - Terminology inconsistency across pages
 *   - Missing cross-references
 *   - Content that belongs on a different page
 *   - Heading inconsistencies
 *
 * Does NOT edit any files. Instead creates a GitHub issue with findings
 * for interactive resolution by a human or agent.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-analysis.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-analysis.mjs --dry-run
 */

import {
    DOCS_DIR,
    collectDocFiles,
    groupBySection,
    loadTextFile,
    callClaude,
} from "./lib/defrag-utils.mjs";

const DRY_RUN = process.argv.includes("--dry-run");

const ANALYSIS_SYSTEM = `You are a documentation editor for the Dojo framework (onchain game engine on Starknet).

You will receive all documentation pages from one section of the docs.
Analyze them for cross-page issues and produce a structured report.

Focus on:
1. **Redundancy**: Content duplicated or substantially repeated across pages. Identify which page has the best version and which pages should defer to it.
2. **Terminology inconsistency**: The same concept referred to with different terms across pages.
3. **Missing cross-references**: Pages that discuss related topics but do not link to each other. Only flag cases where a cross-reference would genuinely help the reader — not every tangential mention.
4. **Content relocations**: Substantial blocks of content (multiple paragraphs or sections) that live on the wrong page and should be moved.
5. **Heading inconsistencies**: Headings that use inconsistent naming patterns across pages in the same section.

Do NOT flag:
- Issues that are purely within a single page (formatting, sentence structure)
- Minor stylistic preferences
- Code block content
- Opportunities to add new content that does not currently exist

Output format — a plain text report with sections:

## Redundancy
- [description of duplicated content, which files, which version to keep]

## Terminology
- [inconsistent term]: used as "[X]" in file A, "[Y]" in file B. Prefer "[Z]".

## Missing Cross-References
- file A should link to file B when discussing [topic]

## Content Relocations
- [description of what content to move, from which file, to which file]

## Heading Inconsistencies
- [description of inconsistent heading patterns]

If a section has no issues, write "None found." under it.
Be specific about file paths and line content so findings are actionable.`;

function buildAnalysisPrompt(section, files) {
    const fileContents = files
        .map((f) => `--- FILE: ${f.rel} ---\n${loadTextFile(f.path)}`)
        .join("\n\n");

    return `Analyze these ${files.length} documentation pages from the "${section}" section:\n\n${fileContents}`;
}

async function main() {
    console.log("=== Pass C: Cross-Page Analysis ===");
    console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
    console.log();

    const allFiles = collectDocFiles(DOCS_DIR);
    const sections = groupBySection(allFiles);

    console.log(
        `Found ${allFiles.length} doc files across ${Object.keys(sections).length} sections`
    );
    console.log();

    const reports = [];

    for (const [section, files] of Object.entries(sections)) {
        if (files.length < 2) {
            console.log(`  Skipping "${section}" (single file)`);
            continue;
        }

        console.log(`  Analyzing "${section}" (${files.length} files)...`);
        try {
            const report = await callClaude(
                ANALYSIS_SYSTEM,
                buildAnalysisPrompt(section, files)
            );

            // Check if the report has any actual findings
            const hasFindings = !report.split("\n").every(
                (line) => !line.trim() || line.startsWith("#") || line.trim() === "None found."
            );

            if (hasFindings) {
                reports.push({ section, report });
                console.log(`    Findings reported.`);
            } else {
                console.log(`    No issues found.`);
            }
        } catch (err) {
            console.error(`    Analysis failed: ${err.message}`);
        }
    }

    console.log("\n=== Summary ===");
    console.log(`Sections analyzed: ${Object.keys(sections).length}`);
    console.log(`Sections with findings: ${reports.length}`);

    if (reports.length === 0) {
        console.log("\nNo cross-page issues found.");
        return;
    }

    // Build issue body
    const issueBody = buildIssueBody(reports);

    if (DRY_RUN) {
        console.log("\n=== Issue body (dry run) ===");
        console.log(issueBody);
        return;
    }

    // Create GitHub issue
    if (process.env.GITHUB_ACTIONS) {
        await createGitHubIssue(issueBody);
    } else {
        console.log("\n=== Issue body (not in CI, printing instead) ===");
        console.log(issueBody);
    }
}

function buildIssueBody(reports) {
    let body = `The monthly defrag analysis identified the following cross-page issues.
Each finding should be reviewed and resolved interactively.

`;

    for (const { section, report } of reports) {
        body += `## Section: \`${section}\`\n\n`;
        body += report.trim() + "\n\n---\n\n";
    }

    body += `> Created automatically by the defrag analysis workflow.`;
    return body;
}

async function createGitHubIssue(body) {
    try {
        const res = await fetch("https://api.github.com/repos/dojoengine/book/issues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                title: "defrag: cross-page analysis findings",
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

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
