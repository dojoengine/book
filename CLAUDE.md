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
- **Framework**: Core Dojo concepts (World, Models, Systems)
- **Toolchain**: Tool-specific documentation (Katana, Torii, Sozo, Saya)
- **Tutorials**: Step-by-step learning guides
- **Client/SDK**: Integration guides for various platforms
- **Architecture**: Scaling and technical deep-dives
- **Libraries**: Ecosystem libraries (Origami, Alexandria)

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
- **Ensure code correctness**: Query the Sensei MCP and source code in src/ for guidance when producing Dojo code samples
- **Maintain cross-references**: Link related content appropriately
- **Follow navigation structure**: Use existing routing patterns in `routes.ts`
- **Never commit without testing**: Run `pnpm run build` before commits

### Code Example Requirements
- **Accuracy**: All Cairo code must be verified against src/ references or Sensei MCP results
- **Realism**: Use realistic game scenarios, not abstract examples
- **References**: Include links to source-code references whenever possible

### Sensei MCP Command Reference
- **mcp__sensei-mcp__dojo_101**: At the beginning of a new project, To initialize the project structure, introduce Dojo development, and handle boilerplate.
- **mcp__sensei-mcp__dojo_model**: After project setup, for defining the game's state, To create and manage Dojo models, ensuring correct trait derivation and key fields.
- **mcp__sensei-mcp__dojo_logic**: After defining models, for implementing game mechanics, To create system contracts, implement game logic, and handle state changes.
- **mcp__sensei-mcp__dojo_config**: During project setup and as needed for configuration changes, To manage Scarb.toml, configure Dojo profiles, and handle dependencies.
- **mcp__sensei-mcp__dojo_test**: After implementing models and systems, To write comprehensive tests and verify game logic.
- **mcp__sensei-mcp__dojo_token**: When implementing token standards, For detailed guidance on implementing token standards in Dojo.

### Content Update Process
1. **Update submodules**: `git submodule update --remote` if needed (should not need to be run frequently)
2. **Check references**: Look at the references indicated in "Repository Structure" to identify the most relevant references for any given section
3. **Load context**: load src/* into context for source code and code samples, according to the references in the previous section
4. **Review changes**: Check for breaking changes in source code, or the deletion of existing correct content
5. **Update documentation**: Modify relevant MDX files with updates content and code samples
6. **Build verification**: `pnpm run build`, ensure all internal links are functional

---

This documentation project serves as the central hub for the Dojo ecosystem, providing comprehensive guidance for developers building on-chain games and autonomous worlds.
The multi-repository architecture via submodules ensures documentation stays current with rapid development across the entire toolchain.
