#!/usr/bin/env node

/**
 * Confirm docs build, replacing dead links with #TODO.
 *
 * Runs `pnpm run build` in a loop. If dead links are found, replaces them
 * with #TODO and retries (vocs may not report all dead links in one pass).
 * Fails on non-link build errors.
 *
 * Usage:
 *   node scripts/confirm-build.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const MAX_PASSES = 5;

// ---------------------------------------------------------------------------
// Build error parsing
// ---------------------------------------------------------------------------

function parseBuildErrors(output) {
    const clean = output.replace(/\x1b\[[0-9;]*m/g, "");
    const deadLinks = {};

    for (const line of clean.split("\n")) {
        const match = line.trim().match(/^(\S+)\s+in\s+(\S+)$/);
        if (match) {
            const [, link, file] = match;
            if (!deadLinks[file]) deadLinks[file] = [];
            deadLinks[file].push(link);
        }
    }

    return deadLinks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    console.log("=== Confirm Build ===\n");

    for (let pass = 1; pass <= MAX_PASSES; pass++) {
        console.log(`Build pass ${pass}/${MAX_PASSES}...`);

        try {
            execSync("pnpm run build", { cwd: ROOT, stdio: "pipe" });
            console.log("Build passed.");
            return;
        } catch (err) {
            const output =
                (err.stdout?.toString() || "") +
                (err.stderr?.toString() || "");
            const deadLinks = parseBuildErrors(output);
            const fileCount = Object.keys(deadLinks).length;

            if (fileCount === 0) {
                console.error("Build failed with non-link errors:");
                console.error(output.slice(-2000));
                process.exit(1);
            }

            console.log(`Found dead links in ${fileCount} file(s). Replacing with #TODO...`);

            for (const [filePath, links] of Object.entries(deadLinks)) {
                let content = readFileSync(filePath, "utf-8");
                for (const link of links) {
                    const escaped = link.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    content = content.replace(
                        new RegExp(`(\\]\\()${escaped}(\\))`, "g"),
                        "$1#TODO$2"
                    );
                }
                writeFileSync(filePath, content, "utf-8");
                console.log(`  ${filePath}: ${links.length} link(s) replaced`);
            }

            execSync("pnpm run prettier", { cwd: ROOT, stdio: "pipe" });
        }
    }

    console.error("Build still failing after all passes.");
    process.exit(1);
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
