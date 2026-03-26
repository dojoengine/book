/**
 * Shared utilities for defrag scripts.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { structuredPatch } from "diff";

export const ROOT = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");
export const DOCS_DIR = join(ROOT, "docs", "pages");
export const MODEL = "claude-sonnet-4-20250514";
export const API_URL = "https://api.anthropic.com/v1/messages";
export const MAX_HUNK_LINES = 10;

// Sections to skip (editorial content, not reference docs)
const SKIP_DIRS = new Set(["blog"]);

export function loadTextFile(path) {
    return readFileSync(path, "utf-8");
}

export function collectDocFiles(dir, base = dir) {
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

export function groupBySection(files) {
    const groups = {};
    for (const f of files) {
        const section = dirname(f.rel).split("/")[0] || "_root";
        if (!groups[section]) groups[section] = [];
        groups[section].push(f);
    }
    return groups;
}

export function getValidRoutes() {
    const files = collectDocFiles(DOCS_DIR);
    return files.map((f) => "/" + f.rel.replace(/\.(md|mdx)$/, "").replace(/\/index$/, ""));
}

/**
 * Check if any single diff hunk exceeds the size limit.
 */
export function checkHunkSizes(original, corrected, filename) {
    const patch = structuredPatch(filename, filename, original, corrected);
    let maxHunkSize = 0;
    const oversized = [];
    for (const hunk of patch.hunks) {
        const changedLines = hunk.lines.filter(
            (l) => l.startsWith("+") || l.startsWith("-")
        ).length;
        if (changedLines > maxHunkSize) maxHunkSize = changedLines;
        if (changedLines > MAX_HUNK_LINES) {
            oversized.push({ start: hunk.oldStart, changedLines });
        }
    }
    if (oversized.length > 0) {
        return { ok: false, maxHunkSize, hunks: oversized };
    }
    return { ok: true, maxHunkSize, hunks: [] };
}

export async function callClaude(system, userContent, maxTokens = 16000, model = MODEL) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY environment variable is required");
    }

    const body = {
        model,
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
