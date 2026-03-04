#!/usr/bin/env node

/**
 * Confirm docs build, fixing errors if needed.
 *
 * Runs `pnpm run build`, parses errors, sends broken files to Claude for
 * fixing, and retries up to 3 times.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/fix-build-errors.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { execSync } from "child_process";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const DOCS_DIR = join(ROOT, "docs", "pages");
const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";
const MAX_ATTEMPTS = 3;

// ---------------------------------------------------------------------------
// Helpers
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

function getValidRoutes() {
    const files = collectDocFiles(DOCS_DIR);
    return files.map(
        (f) => "/" + f.rel.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "")
    );
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
// Build error parsing and fixing
// ---------------------------------------------------------------------------

const BUILD_FIX_SYSTEM = `You are a documentation editor for the Dojo framework.

You will receive a documentation file and build errors that reference it.
Fix the file so the build errors are resolved.

## Rules
- Return ONLY the corrected file content — no commentary, no wrapping, no code fences.
- Fix only what is needed to resolve the reported errors.
- Do not make other changes to the file.
- For dead links: this site uses vocs, which requires extensionless relative links (e.g. "./introspection" not "../introspection.md"). Check relative path depth carefully.
- You will be given the complete list of valid routes. ONLY use link targets that resolve to one of these routes.
- If a link target clearly does not exist in the valid routes, replace the link href with "#TODO".`;

function parseBuildErrors(output) {
    const clean = output.replace(/\x1b\[[0-9;]*m/g, "");
    const byFile = {};

    for (const line of clean.split("\n")) {
        const match = line.trim().match(/^(\S+)\s+in\s+(\S+)$/);
        if (match) {
            const [, link, file] = match;
            if (!byFile[file]) byFile[file] = [];
            byFile[file].push(`Dead link: ${link}`);
        }
    }

    return byFile;
}

async function main() {
    console.log("=== Confirm Build ===\n");

    const validRoutes = getValidRoutes();
    const routeList = validRoutes.join("\n");

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        console.log(
            `Build attempt ${attempt}/${MAX_ATTEMPTS}...`
        );

        try {
            execSync("pnpm run build", { cwd: ROOT, stdio: "pipe" });
            console.log("Build passed.");
            return;
        } catch (err) {
            const output =
                (err.stdout?.toString() || "") +
                (err.stderr?.toString() || "");
            const errorsByFile = parseBuildErrors(output);
            const fileCount = Object.keys(errorsByFile).length;

            if (fileCount === 0) {
                console.error("Build failed with unknown errors:");
                console.error(output.slice(-2000));
                process.exit(1);
            }

            console.log(
                `Build failed. Found errors in ${fileCount} file(s).`
            );

            for (const [filePath, errors] of Object.entries(errorsByFile)) {
                console.log(`  Fixing ${filePath}...`);
                const content = readFileSync(filePath, "utf-8");
                const prompt = `## Valid routes in this site\n\n${routeList}\n\n## Build errors for this file\n\n${errors.join("\n")}\n\n## File to fix: ${filePath}\n\n${content}`;

                try {
                    const fixed = await callClaude(
                        BUILD_FIX_SYSTEM,
                        prompt,
                        Math.max(16000, Math.ceil(content.length / 3))
                    );
                    writeFileSync(filePath, fixed, "utf-8");
                    console.log(`    Fixed.`);
                } catch (fixErr) {
                    console.error(`    Fix failed: ${fixErr.message}`);
                }
            }

            console.log("  Running prettier...");
            execSync("pnpm run prettier", { cwd: ROOT, stdio: "pipe" });
        }
    }

    // Final check
    try {
        execSync("pnpm run build", { cwd: ROOT, stdio: "pipe" });
        console.log("Build passed after fixes.");
    } catch {
        console.error(
            `Build still failing after ${MAX_ATTEMPTS} fix attempts.`
        );
        process.exit(1);
    }
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
