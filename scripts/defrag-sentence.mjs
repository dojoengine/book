#!/usr/bin/env node

/**
 * Pass A: Sentence formatting.
 *
 * LLM-powered but narrowly scoped:
 *   - One sentence per line (break multi-sentence lines)
 *   - Contraction expansion (don't → do not, you're → you are, etc.)
 *
 * Nothing else — no rewording, no content changes, no terminology fixes,
 * no cross-references, no heading changes, no link modifications.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-sentence.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-sentence.mjs --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import {
    DOCS_DIR,
    collectDocFiles,
    loadTextFile,
    callClaude,
} from "./lib/defrag-utils.mjs";

const DRY_RUN = process.argv.includes("--dry-run");

const SYSTEM_PROMPT = `You are a documentation formatting tool. You make exactly two types of changes and nothing else.

## Task 1: One sentence per line

Break multi-sentence prose lines so each sentence starts on its own line.

Rules:
- Only split lines that contain multiple sentences (period followed by a space and a new sentence).
- Do NOT split inside code blocks, frontmatter, list items, headings, HTML/JSX tags, or admonition markers (:::).
- Do NOT split on abbreviations like "e.g.", "i.e.", "etc.", "vs." or on decimal numbers like "1.5".
- Do NOT split on periods inside inline code backticks.
- Do NOT reword, rephrase, or change any content.

## Task 2: Contraction expansion

Expand English contractions in prose text to their full forms.

Common contractions to expand:
- don't → do not, doesn't → does not, won't → will not, can't → cannot
- shouldn't → should not, wouldn't → would not, couldn't → could not
- isn't → is not, aren't → are not, wasn't → was not, weren't → were not
- haven't → have not, hasn't → has not, hadn't → had not
- you're → you are, they're → they are, we're → we are, it's → it is
- let's → let us, here's → here is, there's → there is, that's → that is
- what's → what is, who's → who is
- you'll → you will, you've → you have, we've → we have
- I'm → I am (rare in docs, but expand if found)

Rules:
- Do NOT expand contractions inside code blocks, inline code backticks, frontmatter, or URLs.
- Do NOT expand contractions in quoted speech or proper names.
- Preserve the original capitalization of the first letter (e.g., "Don't" → "Do not").

## What you must NOT do

- Do NOT change any wording, phrasing, or meaning.
- Do NOT add or remove any content, paragraphs, or sentences.
- Do NOT change terminology, capitalization (beyond contraction expansion), or heading text.
- Do NOT add or modify links or cross-references.
- Do NOT change code blocks, frontmatter, or any non-prose content.
- Do NOT fix typos, grammar, or punctuation (other than sentence splitting and contraction expansion).

Return ONLY the complete corrected file content — no commentary, no wrapping, no code fences.
If the file needs no changes, return it exactly as-is.`;

function buildPrompt(file) {
    const content = loadTextFile(file.path);
    return `## File to edit: ${file.rel}\n\n${content}`;
}

async function main() {
    console.log("=== Pass A: Sentence Formatting ===");
    console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
    console.log();

    const allFiles = collectDocFiles(DOCS_DIR);
    console.log(`Found ${allFiles.length} doc files`);

    let filesChanged = 0;
    let filesUnchanged = 0;
    let filesErrored = 0;
    const changeLog = [];

    for (const file of allFiles) {
        const original = loadTextFile(file.path);
        console.log(`  Editing ${file.rel}...`);

        try {
            const corrected = await callClaude(
                SYSTEM_PROMPT,
                buildPrompt(file),
                Math.max(16000, Math.ceil(original.length / 3))
            );

            let normalized = corrected.replace(/\n*$/, "\n");

            if (normalized === original) {
                console.log(`    No changes.`);
                filesUnchanged++;
                continue;
            }

            if (!DRY_RUN) {
                writeFileSync(file.path, normalized, "utf-8");
            }
            filesChanged++;
            changeLog.push(file.rel);
            console.log(`    Updated.`);
        } catch (err) {
            console.error(`    Error: ${err.message}`);
            filesErrored++;
        }
    }

    console.log("\n=== Summary ===");
    console.log(`Files changed:   ${filesChanged}`);
    console.log(`Files unchanged: ${filesUnchanged}`);
    console.log(`Files errored:   ${filesErrored}`);

    if (changeLog.length > 0) {
        console.log("\n=== Changed files ===");
        for (const f of changeLog) console.log(`- ${f}`);
    }

    if (filesChanged === 0) {
        console.log("\nNo changes needed.");
    }
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
