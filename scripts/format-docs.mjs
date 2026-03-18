#!/usr/bin/env node

/**
 * Phase 1: Mechanical formatting pass for documentation files.
 *
 * Deterministic, no LLM. Applies:
 *   - Trailing newline at EOF
 *   - Smart quotes → straight quotes
 *   - Trailing whitespace removal
 *   - Code block language tag normalization (sh→bash, ts→typescript)
 *
 * Usage:
 *   node scripts/format-docs.mjs
 *   node scripts/format-docs.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const DOCS_DIR = join(ROOT, "docs", "pages");
const DRY_RUN = process.argv.includes("--dry-run");

// ---------------------------------------------------------------------------
// File collection
// ---------------------------------------------------------------------------

function collectDocFiles(dir, base = dir) {
    const results = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const rel = relative(base, full);
        const stat = statSync(full);
        if (stat.isDirectory()) {
            results.push(...collectDocFiles(full, base));
        } else if (/\.(md|mdx)$/.test(entry)) {
            results.push({ path: full, rel });
        }
    }
    return results;
}

// ---------------------------------------------------------------------------
// Formatting rules
// ---------------------------------------------------------------------------

const LANG_TAG_MAP = {
    sh: "bash",
    shell: "bash",
    ts: "typescript",
    js: "javascript",
};

const SMART_QUOTES = [
    [/\u2018/g, "'"], // left single
    [/\u2019/g, "'"], // right single
    [/\u201C/g, '"'], // left double
    [/\u201D/g, '"'], // right double
    [/\u2013/g, "--"], // en dash
    [/\u2014/g, "---"], // em dash
];

function formatFile(content) {
    let lines = content.split("\n");
    let inCodeBlock = false;
    let codeBlockIndent = "";

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trimStart();
        const indent = lines[i].slice(0, lines[i].length - trimmed.length);

        // Track code block state
        if (trimmed.startsWith("```")) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockIndent = indent;

                // Normalize language tag on opening fence
                const match = trimmed.match(/^```(\w+)(.*)/);
                if (match) {
                    const [, lang, rest] = match;
                    const normalized = LANG_TAG_MAP[lang];
                    if (normalized) {
                        lines[i] = `${indent}\`\`\`${normalized}${rest}`;
                    }
                }
            } else if (indent.length <= codeBlockIndent.length) {
                inCodeBlock = false;
            }
        }

        // Only apply formatting outside code blocks
        if (!inCodeBlock) {
            // Strip trailing whitespace
            lines[i] = lines[i].replace(/\s+$/, "");

            // Smart quotes → straight quotes
            for (const [pattern, replacement] of SMART_QUOTES) {
                lines[i] = lines[i].replace(pattern, replacement);
            }
        }
    }

    let result = lines.join("\n");

    // Ensure single trailing newline
    result = result.replace(/\n*$/, "\n");

    return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
    console.log("=== Phase 1: Formatting ===");
    console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
    console.log();

    const files = collectDocFiles(DOCS_DIR);
    console.log(`Found ${files.length} doc files`);

    let changed = 0;
    let unchanged = 0;
    const changeLog = [];

    for (const file of files) {
        const original = readFileSync(file.path, "utf-8");
        const formatted = formatFile(original);

        if (formatted === original) {
            unchanged++;
        } else {
            if (!DRY_RUN) {
                writeFileSync(file.path, formatted, "utf-8");
            }
            changed++;
            changeLog.push(file.rel);
        }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Files changed:   ${changed}`);
    console.log(`Files unchanged: ${unchanged}`);

    if (changeLog.length > 0) {
        console.log(`\n=== Changed files ===`);
        for (const f of changeLog) {
            console.log(`- ${f}`);
        }
    } else {
        console.log("\nAll files already formatted.");
    }
}

main();
