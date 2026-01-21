# CLAUDE.md - Dojo Book Documentation Project

## Project Overview

This repository contains the official documentation for the **Dojo** ecosystem - a comprehensive toolchain for building provable games and autonomous worlds on Starknet. Dojo provides a complete framework for developing fully on-chain games using Cairo smart contracts with Entity Component System (ECS) architecture.

### Project Type

- **Type**: Technical documentation website built with Vocs (Vue-based documentation framework)
- **Primary Technology**: TypeScript/JavaScript with React components
- **Content Format**: Markdown/MDX files with code examples
- **Deployment**: Vercel hosting with automatic builds
- **Architecture**: Doc source in docs/, with reference material kept in src/ as Git submodules

### Content Management

- **Markdown/MDX**: Documentation content with JSX components
- **Git Submodules**: Source code references from multiple repositories
- **Structured Navigation**: Hierarchical routing with collapsible sections

## Build & Development Commands

### Development Workflow

```bash
# Start development server (http://localhost:5173/)
pnpm run dev

# Build for production
pnpm run build
```

### Content Management

```bash
# Update all submodules to latest versions
git submodule update --remote

# Check submodule status
git submodule status
```

## High-Level Architecture

### Documentation Structure

```
~/book/
├── docs/                  # Documentation content
│   ├── components/        # React components for docs
│   ├── pages/             # MDX content files
│   │   ├── architecture/  # Technical architecture (execution, rollups)
│   │   ├── blog/          # Blog posts and articles
│   │   ├── client/        # SDK documentation for multiple platforms
│   │   │   └── sdk/       # Platform-specific SDKs
│   │   │       ├── bevy/  # Bevy engine integration // REFERENCE: src/sdks/dojo.bevy
│   │   │       ├── c/     # C language bindings // REFERENCE: src/sdks/dojo.c
│   │   │       ├── discord/ # Discord integration
│   │   │       ├── godot/ # Godot engine integration
│   │   │       ├── javascript/ # JavaScript SDK // REFERENCE: src/sdks/dojo.js
│   │   │       ├── rust/  # Rust SDK
│   │   │       ├── telegram/ # Telegram integration
│   │   │       ├── unity/ # Unity integration // REFERENCE: src/sdks/dojo.unity
│   │   │       └── unreal/ # Unreal Engine integration // REFERENCE: src/sdks/dojo.unreal
│   │   ├── community/     # Community resources
│   │   ├── framework/     # Core Dojo framework documentation // REFERENCE: src/framework/dojo && src/starters && src/games
│   │   │   ├── authorization/ # Authorization system
│   │   │   ├── config/    # Configuration management
│   │   │   ├── models/    # Model definitions and API
│   │   │   ├── systems/   # Systems documentation
│   │   │   ├── testing/   # Testing framework and cheat codes
│   │   │   └── world/     # World contract (API, events, metadata, permissions)
│   │   ├── getting-started/ # Onboarding and setup guides
│   │   ├── libraries/     # Ecosystem libraries
│   │   │   ├── alexandria/ # Alexandria library collection
│   │   │   └── origami/   # Cairo utilities library // REFERENCE: src/libraries/origami
│   │   ├── misc/          # Miscellaneous content
│   │   ├── theory/        # Conceptual topics (autonomous worlds)
│   │   ├── toolchain/     # Tool-specific documentation
│   │   │   ├── katana/    # Starknet sequencer // REFERENCE: src/toolchain/katana
│   │   │   ├── saya/      # Proving system // REFERENCE: src/toolchain/saya
│   │   │   ├── slot/      # Deployment commands
│   │   │   ├── sozo/      # Project and world commands // REFERENCE: src/framework/dojo
│   │   │   └── torii/     # Indexing engine // REFERENCE: src/toolchain/torii
│   │   └── tutorials/     # Step-by-step learning guides // REFERENCE: src/starters && src/games
│   └── public/            # Static assets
├── src/                   # Git submodules (reference repositories)
├── spec/                  # Documentation standards
└── configuration files    # Build, linting, deployment
```

### Key Directories

#### `/docs/pages/` - Content Organization

- **Framework**: Core Dojo concepts (World, Models, Systems) -- theoretically focused
- **Toolchain**: Tool-specific documentation (Katana, Torii, Sozo, Saya) -- theoretically focused
- **Tutorials**: Step-by-step learning guides -- practically focused
- **Client/SDK**: Integration guides for various platforms -- practically focused
- **Architecture**: Scaling and technical deep-dives -- theoretically focused
- **Libraries**: Ecosystem libraries (Origami, Alexandria) -- practically focused

#### `/src/` - Source Code Submodules

- **Framework**: Core Dojo framework implementation (Rust/Cairo)
- **Games**: Example game implementations showcasing Dojo capabilities
- **Libraries**: Ecosystem libraries like Origami (Cairo utilities)
- **SDKs**: Multi-platform integrations (JavaScript, Unity, Unreal, Bevy, C/C++)
- **Starters**: Template projects for quick development setup
- **Toolchain**: Core infrastructure tools (Katana, Torii, Saya)

#### `/spec/` - Documentation Standards

- **Process Documentation**: Update workflows and maintenance procedures
- **Style Guide**: Writing standards and terminology consistency
- **Architecture**: Content organization using Diátaxis framework

## Development Guidelines & Rules

### Documentation Standards (from `/spec/`)

#### Content Types (Diátaxis Framework)

1. **Tutorials**: Learning-oriented, step-by-step guides
2. **How-to Guides**: Goal-oriented problem-solving
3. **Reference**: Information-oriented technical specs
4. **Explanations**: Understanding-oriented concepts

#### Writing Style (from `spec/style-guide.md`)

- **Voice**: Direct, conversational, present tense
- **Tone**: Helpful, inclusive, professional but approachable
- **Terminology**: Consistent use of Dojo-specific terms
- **Code Examples**: Working, tested, well-commented snippets
- **Newlines**: Put each sentence on a new line

#### Quality Standards (from `spec/best-practices.md`)

- **Documentation as Code**: Treat docs as first-class deliverables
- **Audience-Driven**: Content tailored to user skill levels
- **Visual Integration**: Diagrams, screenshots, and examples
- **Accessibility**: Global audience, screen-reader friendly

### Development Rules

- **CRITICAL: One sentence per line**: Always put each sentence on its own line in Markdown files for maintainability and easier editing. This is non-negotiable for all content changes.

    ```markdown
    # Correct format:

    Katana provides flexible mining modes.
    This allows precise control over block production.

    # Incorrect format:

    Katana provides flexible mining modes. This allows precise control over block production.
    ```

- **CRITICAL: Omit best practices**: LLM-generated "best practices" are often generic, do not include them in generated documentation
- **Ensure code correctness**: Verify all code examples against source code in src/ submodules (see "Code Verification Workflow" below)
- **Maintain cross-references**: Link related content appropriately
- **Follow navigation structure**: Use existing routing patterns in `routes.ts`
- **Never commit without testing**: Run `pnpm run build` before commits

### Code Example Requirements

- **Accuracy**: All Cairo code must be verified against src/ submodule source code
- **Realism**: Use realistic game scenarios, not abstract examples
- **References**: Include links to source-code references whenever possible

## Documentation Workflows

### Workflow 1: Updating Existing Documentation

Use this workflow when updating docs after version changes or to fix inaccuracies.

1. **Identify scope**: Determine which docs sections are affected using the REFERENCE annotations in the architecture section above
2. **Update submodules** (if needed): `git submodule update --remote`
3. **Review source changes**:
   ```bash
   cd src/<relevant-submodule>
   git log --oneline -20  # See recent changes
   git diff HEAD~10 -- <relevant-files>  # See what changed
   ```
4. **Load source context**: Read the relevant src/ code to understand current behavior
5. **Compare with docs**: Read the existing documentation and identify discrepancies
6. **Make targeted edits**: Update only what's changed; preserve correct existing content
7. **Verify**: Run `pnpm run build` and check for broken links

### Workflow 2: Writing New Documentation

Use this workflow when creating new pages or sections.

1. **Determine page type**: Using Diátaxis (see `spec/page-types.md`):
   - Tutorial: Teaching a concept through building something
   - How-to: Solving a specific problem
   - Reference: API/CLI specifications
   - Explanation: Conceptual understanding

2. **Gather source material**:
   - For framework docs: Read `src/framework/dojo` and `src/starters`
   - For toolchain docs: Read `src/toolchain/<tool>`
   - For SDK docs: Read `src/sdks/<sdk>`
   - For library docs: Read `src/libraries/<library>`

3. **Study existing patterns**: Read 2-3 similar pages in the same section to match style and depth

4. **Draft content**: Follow the template from `spec/page-types.md` for your chosen type

5. **Add code examples**: Extract real examples from src/ or adapt from existing games in `src/games`

6. **Update navigation**: Add the new page to `routes.ts`

7. **Verify**: Run `pnpm run build`

### Code Verification Workflow

All Cairo/Dojo code examples must be verified before inclusion.

**For model definitions:**
1. Check `src/framework/dojo/crates/dojo/core` for current trait names and derive macros
2. Verify required attributes (`#[dojo::model]`, `#[key]`, etc.)
3. Confirm field types match what's supported

**For system implementations:**
1. Check `src/framework/dojo/crates/dojo/core` for system traits and interfaces
2. Verify world interaction patterns (get/set model syntax)
3. Confirm event emission patterns

**For CLI commands:**
```bash
# Verify command exists and syntax is correct
sozo --help
katana --help
torii --help

# For detailed options
<command> <subcommand> --help
```

**For configuration:**
1. Check `src/framework/dojo` for Scarb.toml patterns
2. Verify against working examples in `src/starters` or `src/games`

### Domain Knowledge Acquisition

When unfamiliar with a Dojo concept, follow this process:

1. **Start with existing docs**: Read the current documentation for context and terminology
2. **Read source code**: The src/ submodules are the source of truth
   - Core concepts: `src/framework/dojo/crates/dojo/core`
   - Working examples: `src/starters`, `src/games`
3. **Study tests**: Test files often demonstrate correct usage patterns
4. **Check examples**: `src/games` contains full game implementations

**Key Dojo concepts to understand:**
- **World**: The root contract that manages all state
- **Models**: Data structures with `#[dojo::model]` that define game state
- **Systems**: Functions that modify models, implementing game logic
- **Events**: On-chain events for client synchronization
- **Torii**: Indexer that makes World state queryable
- **Katana**: Local Starknet sequencer for development

### Quality Checklist

Before considering documentation complete:

- [ ] One sentence per line (non-negotiable)
- [ ] No generic "best practices" sections
- [ ] All code examples verified against src/
- [ ] Code examples use realistic game scenarios
- [ ] Cross-references to related pages included
- [ ] Page type matches content (Tutorial/How-to/Reference/Explanation)
- [ ] Navigation updated in `routes.ts` if new page
- [ ] Build passes: `pnpm run build`
- [ ] No broken internal links

---

This documentation project serves as the central hub for the Dojo ecosystem, providing comprehensive guidance for developers building on-chain games and autonomous worlds.
The multi-repository architecture via submodules ensures documentation stays current with rapid development across the entire toolchain.
