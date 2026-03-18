# Dojo Book Style Guide

This guide defines writing conventions for the Dojo documentation site.
It is the source of truth for automated tooling (defragmentation, linting) and human contributors.

## Formatting

- One sentence per line in markdown source.
- Files must end with a single trailing newline.
- Use straight quotes (`"`, `'`), not smart/curly quotes.
- No trailing whitespace on lines.
- Use `-` for bullet lists (not `*` or `+`).
- Use 2-space indentation for nested list items.

## Page structure

- Every page should have YAML frontmatter with `title` and `description`.
- Use one H1 (`#`) per page for the title, matching the frontmatter `title`.
- Use H2 (`##`) for major sections, H3 (`###`) for subsections.
- Avoid H4 and deeper nesting unless a page genuinely requires it.

## Prose

- Write in **present tense**: "This deploys the contract", not "This will deploy the contract".
- Use **second person** ("you") for instructions, **third person** for describing system behavior ("the World contract manages all state").
- Use **imperative mood** for procedural steps: "Configure the world", not "You should configure the world".
- **Do not use contractions**: "do not", not "don't"; "you will", not "you'll".
- Use the **Oxford comma**: "models, systems, and events".
- Prefer **"e.g."** over "for example" in parentheticals.
- Use **bold** for feature names and key concepts in running text.
  Do not use italic for emphasis (reserve it for introducing defined terms if needed).
- **Emojis**: do not use emojis in body text or technical documentation.

## Lists

- Bullet items that are sentence fragments do not need periods.
- Bullet items that are full sentences should end with periods.
- Be consistent within a single list — do not mix fragments and full sentences.

## Terminology

### Dojo ecosystem names

These are proper nouns — always capitalize in prose:

| Use | Do not use |
|-----|-----------|
| **Dojo** | "dojo" in prose |
| **Cairo** | "cairo" in prose |
| **Starknet** | "StarkNet" (outdated branding) |
| **Katana** | "katana" in prose (lowercase is fine in CLI commands) |
| **Torii** | "torii" in prose (lowercase is fine in CLI commands and config) |
| **Sozo** | "sozo" in prose (lowercase is fine in CLI commands) |
| **Saya** | "saya" in prose |
| **Scarb** | "scarb" in prose (lowercase is fine in CLI commands) |

### ECS terms

Capitalize when referring to Dojo ECS concepts specifically:

| Canonical term | Notes |
|----------------|-------|
| **World** | The root contract that manages all state |
| **Model** | Data structures decorated with `#[dojo::model]` |
| **System** | Functions that modify models, implementing game logic |
| **Entity** | An addressable unit of state composed of models |
| **Component** | Avoid — use **Model** instead (legacy term) |
| **Event** | On-chain events decorated with `#[dojo::event]` |

### Third-party names

Use official branding:

| Use | Do not use |
|-----|-----------|
| **Cartridge** | "cartridge" in prose |
| **Cartridge Controller** (first mention) | "the Controller SDK", "CC" |
| **Controller** (subsequent mentions) | "Cartridge Controller" repeatedly |
| **MetaMask** | "Metamask", "metamask" |
| **React Native** | "react native", "ReactNative" |

### Hyphenation and compound words

| Use | Do not use |
|-----|-----------|
| **onchain** | "on-chain" |
| **cross-chain** | "crosschain" |
| **gasless** | "gas-free", "gas-less" |
| **multicall** | "multi-call" |

### Technical terms — do not rename

These terms are API surface (attribute names, type names, CLI flags).
They must match the code and should not be rewritten in prose:

**Dojo attributes:**
- `#[dojo::model]` — not "model decorator" or "model annotation"
- `#[dojo::event]` — not "event decorator"
- `#[dojo::contract]` — not "contract decorator"
- `#[key]` — not "key attribute"

**Starknet/Cairo terms:**
- `entrypoint` — not "entry point"
- `calldata` — not "call data"
- `felt252` — not "field element" (except when explicitly defining the term)

**CLI commands** (always use backticks in prose):
- `sozo build`, `sozo migrate`, `sozo execute`, `sozo inspect`
- `katana`, `torii`

**Type names** (always use backticks in prose):
- `WorldStorage`, `IWorldDispatcher`, `ContractAddress`

When explaining these concepts to users, you may add clarifying language alongside the technical term (e.g., "the `#[key]` attribute marks fields used for entity identification"), but do not replace the term itself.

### Product-adjacent terms

| Use | Do not use |
|-----|-----------|
| **autonomous world** | "autonomous World" (capitalize only when referring to the Dojo World contract) |
| **provable game** | "verifiable game" (in Dojo context) |
| **paymaster** (lowercase) | "Paymaster" in prose |

## Cross-references

Links are the highest-risk area for automated edits.
Broken links fail the build and are hard to debug.
Follow these rules strictly.

### Path format

- **No extensions.** Use extensionless paths: `[Models](/framework/models)`, not `[Models](/framework/models.md)`.
- **Relative** for same-section links: `[Testing](./testing)`
- **Absolute** for cross-section links: `[Katana](/toolchain/katana)`

### Anchors

- Only use anchor links (`#some-heading`) when you have verified the target heading exists on the page.
- Heading anchors are auto-generated as lowercase, hyphenated slugs (e.g., `## Custom Models` -> `#custom-models`).
- Do not guess at anchors.
  If unsure, link to the page without an anchor.

### When adding cross-references

- **Do not invent links during content edits.**
  If you want to suggest a cross-reference but cannot verify the target, use a TODO marker instead: `[TODO: link to X]`.
  A separate link-repair pass will resolve these.
- When replacing duplicated content with a link, verify the target page actually contains equivalent information before deleting.
- Do not add a cross-reference if the linked page only tangentially covers the topic.
  A link should save the reader from needing an explanation on the current page.

### Valid link targets

The documentation site has these top-level sections:

- `/getting-started/*` — Onboarding and setup guides
- `/framework/*` — Core Dojo framework (World, Models, Systems, Testing, Config)
- `/toolchain/*` — Tool documentation (Katana, Torii, Sozo, Saya, Slot)
- `/client/sdk/*` — SDK documentation (JavaScript, Unity, Unreal, Bevy, Godot, C, Rust)
- `/tutorials/*` — Step-by-step learning guides
- `/libraries/*` — Ecosystem libraries (Origami, Alexandria)
- `/architecture/*` — Scaling and technical deep-dives
- `/theory/*` — Conceptual topics (autonomous worlds)
- `/community/*` — Community resources

## Code examples

### Language tags

- Use `bash` for shell commands (not `sh` or `shell`).
- Use `typescript` for TypeScript code (not `ts`).
- Use `tsx` for React component code with JSX.
- Use `cairo` for Cairo/Dojo smart contract code.
- Use `toml`, `json`, `rust` as appropriate.

### Style

- Always show import statements — do not assume imports are already present.
- Use realistic game scenarios, not abstract examples.
- Keep comments minimal and semantic — explain "why", not "what".
- Include type annotations for complex objects and function parameters.
- Quick-start examples may omit error handling for brevity.
  Advanced or real-world examples should include error handling.
- Use inline code (backticks) for API names in prose: `` `sozo build` ``, `` `WorldStorage` ``.

## Admonitions

Use admonitions sparingly for genuinely important callouts:

- `:::info` — general context the reader should know
- `:::warning` — something that could cause problems if ignored
- `:::note` — supplementary information
- `:::tip` — helpful suggestion, not required

Do not convert `:::` blocks to blockquote format.
This site uses Vocs, which renders `:::` blocks as styled callout boxes.
Do not use admonitions for routine information that belongs in body text.

## Content guidelines

- Do not duplicate explanations across pages.
  When content exists on a canonical page, link to it rather than restating it.
- When removing duplicated content, verify the target page actually contains the information before deleting.
- Keep code examples focused — show the minimum needed to illustrate the point.
