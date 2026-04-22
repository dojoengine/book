#!/usr/bin/env node

/**
 * Pass B: Terminology normalization.
 *
 * LLM-powered but narrowly scoped:
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
    checkCodeRegionsPreserved,
    normalizePackageNames,
} from "./lib/defrag-utils.mjs";
import { join } from "path";

const DRY_RUN = process.argv.includes("--dry-run");

function buildSystemPrompt(styleGuide) {
    return `You are a documentation terminology normalizer. You make exactly the changes described below and nothing else.

## Terminology rules

${styleGuide}

## What you change

Apply these rules ONLY to prose text — never to code.

1. **Proper noun capitalization**: Dojo, Cairo, Starknet (not StarkNet), Katana, Torii, Sozo, Saya, Scarb, Cartridge, MetaMask, React Native — capitalize when they appear in running prose.

2. **Hyphenation**: onchain (not on-chain), gasless (not gas-free/gas-less), multicall (not multi-call), cross-chain (keep hyphen).

## Protected regions — never modify

These regions must be returned byte-for-byte identical to the input:

- **Fenced code blocks** (anything between \`\`\` fences), including comments and string literals inside them.
- **Inline code spans** (text inside single backticks: \`katana\`, \`sozo\`, \`Sozo\`). If a CLI tool name appears in backticks, do NOT change its capitalization — backticks signal this is a code token, not prose.
- **URLs** in any context: full URLs in prose, inside quotes, inside code blocks, inside link targets. Do not change capitalization of host names or paths.
- **Link text and link targets** in markdown links \`[text](target)\`.
- **Frontmatter** (the YAML block at the top of the file between \`---\` markers).
- **HTML/JSX attribute values and tag names.**

Concrete examples of changes you must NOT make:
- \`\`katana\`\` → \`\`Katana\`\` (inline code, leave alone)
- \`https://api.cartridge.gg\` → \`https://api.Cartridge.gg\` (URL host, leave alone)
- \`rpc_url = "https://api.cartridge.gg/..."\` inside a code block (never touch code blocks)
- \`dojo.js\` → \`Dojo.js\` (package/module identifier, leave alone)

## What you must NOT do

- Do NOT change any wording, phrasing, meaning, or sentence structure.
- Do NOT split or join lines (no one-sentence-per-line changes).
- Do NOT expand or introduce contractions.
- Do NOT add or remove any content, paragraphs, sections, or sentences.
- Do NOT rename headings.
- Do NOT add or modify links or cross-references.
- Do NOT fix typos, grammar, or punctuation.

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
            normalized = normalizePackageNames(normalized);

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

            const codeCheck = checkCodeRegionsPreserved(original, normalized);
            if (!codeCheck.ok) {
                console.warn(`    REJECTED: LLM modified code regions in ${file.rel}`);
                for (const m of codeCheck.mismatches) console.warn(`      ${m}`);
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
