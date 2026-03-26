#!/usr/bin/env node

/**
 * Pass B: Terminology normalization.
 *
 * LLM-powered but narrowly scoped:
 *   - ECS term capitalization (world/model/system/entity/event lowercase in prose)
 *   - Proper noun capitalization (Dojo, Cairo, Starknet, Katana, Torii, Sozo, Saya, Scarb)
 *   - Hyphenation fixes (on-chain → onchain, etc.)
 *
 * Nothing else — no rewording, no content changes, no sentence splitting,
 * no cross-references, no heading changes, no link modifications.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-terminology.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/defrag-terminology.mjs --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import {
    ROOT,
    DOCS_DIR,
    collectDocFiles,
    loadTextFile,
    callClaude,
    checkLinksPreserved,
} from "./lib/defrag-utils.mjs";
import { join } from "path";

const DRY_RUN = process.argv.includes("--dry-run");

function buildSystemPrompt(styleGuide) {
    return `You are a documentation terminology normalizer. You make exactly the changes described below and nothing else.

## Terminology rules

${styleGuide}

## What you change

1. **ECS terms in prose**: model, system, entity, event, world must be lowercase in running prose sentences. Keep them capitalized in:
   - Headings (lines starting with #)
   - Table column headers and table description cells
   - Link text that is a proper name (e.g., "[World API](/framework/world/api)")

2. **Proper noun capitalization**: Dojo, Cairo, Starknet (not StarkNet), Katana, Torii, Sozo, Saya, Scarb, Cartridge, MetaMask, React Native — capitalize in prose.

3. **Hyphenation**: onchain (not on-chain), gasless (not gas-free/gas-less), multicall (not multi-call), cross-chain (keep hyphen).

## What you must NOT do

- Do NOT change any wording, phrasing, meaning, or sentence structure.
- Do NOT split or join lines (no one-sentence-per-line changes).
- Do NOT expand contractions.
- Do NOT add or remove any content, paragraphs, sections, or sentences.
- Do NOT rename headings (only fix capitalization of ECS terms in headings per the rules above).
- Do NOT add or modify links or cross-references.
- Do NOT change code blocks, inline code, frontmatter, URLs, or any non-prose content.
- Do NOT fix typos, grammar, or punctuation.
- Do NOT change link text or link targets.

Return ONLY the complete corrected file content — no commentary, no wrapping, no code fences.
If the file needs no changes, return it exactly as-is.`;
}

function buildPrompt(file) {
    const content = loadTextFile(file.path);
    return `## File to edit: ${file.rel}\n\n${content}`;
}

async function main() {
    console.log("=== Pass B: Terminology Normalization ===");
    console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
    console.log();

    const styleGuide = loadTextFile(join(ROOT, "spec", "style-guide.md"));
    const systemPrompt = buildSystemPrompt(styleGuide);

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
                systemPrompt,
                buildPrompt(file),
                Math.max(16000, Math.ceil(original.length / 3))
            );

            let normalized = corrected.replace(/\n*$/, "\n");

            if (normalized === original) {
                console.log(`    No changes.`);
                filesUnchanged++;
                continue;
            }

            const linkCheck = checkLinksPreserved(original, normalized);
            if (!linkCheck.ok) {
                console.warn(`    REJECTED: LLM modified links in ${file.rel}`);
                if (linkCheck.added.length) console.warn(`      Added: ${linkCheck.added.join(", ")}`);
                if (linkCheck.removed.length) console.warn(`      Removed: ${linkCheck.removed.join(", ")}`);
                filesErrored++;
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
