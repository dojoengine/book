# Dojo Book Style Guide (Agent Reference)

Condensed version of style-guide.md for use in agent prompts.
For the full guide, see style-guide.md.

## Formatting

- One sentence per line. Trailing newline at EOF. Straight quotes only.
- Bullets use `-`. Indent nested items 2 spaces.
- Code blocks: `bash` (not `sh`/`shell`), `typescript` (not `ts`), `cairo` for Dojo contracts.
- Present tense, no contractions, Oxford comma, "e.g." over "for example".

## Terminology

**Ecosystem names — always capitalized in prose:**
- **Dojo**, **Cairo**, **Starknet**, **Katana**, **Torii**, **Sozo**, **Saya**, **Scarb**
- Lowercase is fine in CLI commands and config keys.

**Third-party — official branding:**
- **Cartridge Controller** (first mention) → **Controller** (subsequent)
- **MetaMask**, **React Native**

**Compounds:** onchain, cross-chain, gasless, multicall

**Do not rename API terms.**
Any term that appears as an attribute, type name, or CLI command in code must be preserved exactly in prose.
Use backticks when referencing them.
High-risk examples: `#[dojo::model]` (not "model decorator"), `entrypoint` (not "entry point"), `calldata` (not "call data"), `felt252` (not "field element").

## Cross-references

**This is the highest-risk area. Broken links fail the build.**

- No `.md`/`.mdx` extensions: `[Models](/framework/models)` not `[Models](/framework/models.md)`
- Relative for same-section: `[Testing](./testing)`
- Absolute for cross-section: `[Katana](/toolchain/katana)`
- **Do not guess anchors.** Only use `#heading-slug` if you have verified the heading exists. If unsure, link without an anchor or use `[TODO: link to X]`.
- **Do not invent links during content edits.** Use `[TODO: link to X]` for uncertain targets.
- Before replacing content with a link, verify the target page contains equivalent information.
- Valid sections: `/getting-started/*`, `/framework/*`, `/toolchain/*`, `/client/sdk/*`, `/tutorials/*`, `/libraries/*`, `/architecture/*`, `/theory/*`, `/community/*`
