# CLAUDE.md - Dojo Book Documentation Project

## Project Overview

This repository contains the official documentation for the **Dojo** ecosystem - a comprehensive toolchain for building provable games and autonomous worlds on Starknet. Dojo provides a complete framework for developing fully on-chain games using Cairo smart contracts with Entity Component System (ECS) architecture.

### Project Type
- **Type**: Technical documentation website built with Vocs (Vue-based documentation framework)
- **Primary Technology**: TypeScript/JavaScript with React components
- **Content Format**: Markdown/MDX files with interactive examples
- **Deployment**: Vercel hosting with automatic builds
- **Architecture**: Multi-repository documentation aggregation via Git submodules

## Core Technologies & Stack

### Frontend Framework
- **Vocs**: Modern documentation framework (latest version)
- **React**: Component library for interactive elements
- **TypeScript**: Type-safe development with strict configuration
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Vite**: Fast build tool and development server

### Content Management
- **Markdown/MDX**: Documentation content with JSX components
- **Git Submodules**: Source code integration from multiple repositories
- **Structured Navigation**: Hierarchical routing with collapsible sections

### Package Management
- **pnpm**: Fast, disk space efficient package manager (v10.6.4)
- **Node.js**: v18+ required for development

## Build & Development Commands

### Installation & Setup
```bash
# Install dependencies (first time setup)
npm install -g pnpm
nvm install --lts && nvm use --lts
pnpm install

# Initialize git submodules (source code repositories)
./scripts/add-submodules.sh
```

### Development Workflow
```bash
# Start development server (http://localhost:5173/)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Code Quality & Formatting
```bash
# Check code formatting
pnpm run prettier-check

# Fix formatting issues
pnpm run prettier

# Format specific files
npx prettier --write <file-path>
```

### Content Management
```bash
# Update all submodules to latest versions
git submodule update --remote

# Update specific submodule
git submodule update --remote src/dojo

# Check submodule status
git submodule status
```

## Test Setup & Commands

### Current Test Configuration
- **No formal test suite**: Documentation project relies on build validation
- **Manual Testing**: Live preview and content verification
- **CI/CD Pipeline**: Automated formatting, linting, and build checks

### Validation Commands
```bash
# Validate build integrity
pnpm run build

# Check for broken links and formatting
pnpm run prettier-check

# Verify development server
pnpm run dev && curl http://localhost:5173/
```

## High-Level Architecture

### Repository Structure
```
/Users/kronosapiens/code/cartridge/book/
├── docs/                     # Documentation content
│   ├── components/          # React components for docs
│   ├── pages/              # MDX content files
│   └── public/             # Static assets
├── src/                    # Git submodules (source repositories)
│   ├── dojo/              # Core Dojo framework
│   ├── katana/            # Starknet sequencer
│   ├── torii/             # Indexing engine
│   ├── saya/              # Proving system
│   ├── origami/           # Cairo library collection
│   ├── dojo.js/           # JavaScript SDK
│   ├── dojo.unity/        # Unity integration
│   ├── dojo.unreal/       # Unreal Engine integration
│   ├── dojo.c/            # C language bindings
│   └── dojo.bevy/         # Bevy engine integration
├── spec/                  # Documentation standards
│   ├── docs-process.md    # Content update workflow
│   ├── style-guide.md     # Writing standards
│   ├── best-practices.md  # Quality guidelines
│   └── contents.md        # Architecture overview
├── scripts/               # Automation scripts
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
- **Rust Projects**: Dojo core, Katana, Torii, Saya (Cargo workspaces)
- **JavaScript**: dojo.js with TypeScript and examples
- **Game Engine Integrations**: Unity, Unreal, Bevy, Godot
- **Language Bindings**: C/C++ bindings for cross-platform support

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

#### Quality Standards (from `spec/best-practices.md`)
- **Documentation as Code**: Treat docs as first-class deliverables
- **Audience-Driven**: Content tailored to user skill levels
- **Visual Integration**: Diagrams, screenshots, and examples
- **Accessibility**: Global audience, screen-reader friendly
- **Continuous Improvement**: Regular audits and updates

### Development Rules
- **Never commit without testing**: Run `pnpm run build` before commits
- **Format before commits**: Use `pnpm run prettier` for consistency
- **Update submodules regularly**: Keep source code references current
- **Follow navigation structure**: Use existing routing patterns in `routes.ts`
- **Maintain cross-references**: Link related content appropriately

## Key Configuration Files

### Core Configuration
- **`vocs.config.ts`**: Documentation site configuration, theming, navigation
- **`package.json`**: Dependencies, scripts, project metadata
- **`routes.ts`**: Navigation structure and page hierarchy
- **`tsconfig.json`**: TypeScript compiler configuration
- **`tailwind.config.cjs`**: CSS framework customization

### Development Tools
- **`prettier.config.cjs`**: Code formatting rules
- **`vercel.json`**: Deployment configuration and redirects
- **`.github/actions/`**: CI/CD pipeline definitions

### Content Management
- **`scripts/add-submodules.sh`**: Automated submodule setup
- **`spec/docs-process.md`**: Comprehensive update procedures

## Build System & Dependencies

### Production Dependencies
- **@cartridge/presets**: Custom Cartridge configuration
- **@dojoengine/sdk**: Dojo SDK integration (v1.4.0)
- **vocs**: Documentation framework (latest)
- **react**: Component library (latest)
- **prettier**: Code formatting

### Development Dependencies
- **@types/react**: TypeScript definitions
- **vite-plugin-svgr**: SVG component support
- **vite-tsconfig-paths**: Path resolution

### Submodule Repositories
Each submodule is an independent project with its own build system:
- **Rust Projects**: Cargo workspace with multiple crates
- **JavaScript**: pnpm workspace with multiple packages
- **Unity**: Unity package with C# scripts and assets
- **Unreal**: Unreal Engine plugin with C++ code

## Deployment & CI/CD

### Automated Deployment
- **Platform**: Vercel with GitHub integration
- **Trigger**: Automatic deployment on main branch commits
- **Build Command**: `pnpm run build`
- **Output Directory**: Auto-detected by Vocs

### CI/CD Pipeline (`.github/actions/ci.yaml`)
- **Linting**: Misspell checking with reviewdog
- **Formatting**: Prettier validation
- **Build**: Production build verification
- **TODO Management**: Automatic issue creation

### Content Update Process
1. **Update submodules**: `git submodule update --remote`
2. **Review changes**: Check for breaking changes in source code
3. **Update documentation**: Modify relevant MDX files
4. **Test locally**: `pnpm run dev` and verify changes
5. **Format code**: `pnpm run prettier`
6. **Build verification**: `pnpm run build`
7. **Commit and deploy**: Push to trigger automatic deployment

## Special Features

### Interactive Components
- **Live code examples**: Embedded demos and snippets
- **Component showcase**: Interactive SDK demonstrations
- **Architecture diagrams**: SVG-based technical illustrations

### Multi-Platform Support
- **Responsive design**: Mobile-optimized documentation
- **Dark theme**: Built-in dark mode support
- **Search optimization**: SEO-friendly with proper meta tags

### Community Features
- **Edit links**: Direct GitHub editing for community contributions
- **Social integration**: Discord and GitHub links
- **Version management**: Release notes and changelog integration

---

This documentation project serves as the central hub for the Dojo ecosystem, providing comprehensive guidance for developers building on-chain games and autonomous worlds. The multi-repository architecture via submodules ensures documentation stays current with rapid development across the entire toolchain.