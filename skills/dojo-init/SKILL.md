---
name: dojo-init
description: Initialize new Dojo projects with proper directory structure, configuration files, and dependencies. Use when starting a new Dojo game project or setting up the initial project structure.
allowed-tools: Read, Write, Bash, Glob
---

# Dojo Project Initialization

Initialize new Dojo projects with the complete directory structure, configuration files, and dependencies.

## When to Use This Skill

- "Create a new Dojo project"
- "Initialize a Dojo game called [name]"
- "Set up a new Dojo application"
- "Start a new provable game project"

## What This Skill Does

Creates a complete Dojo project with:
- `Scarb.toml` with Dojo dependencies
- `dojo_dev.toml` for local development
- `dojo_release.toml` for deployment
- Source directory structure: `src/models/`, `src/systems/`, `src/tests/`
- `src/lib.cairo` with module exports
- `.gitignore` configured for Dojo projects

## Quick Start

**Interactive mode:**
```
"Create a new Dojo project"
```

I'll ask for:
- Project name
- Optional: Starter template preference

**Direct mode:**
```
"Create a Dojo project called 'dungeon-crawler'"
```

## Project Structure

```
my-game/
├── Scarb.toml              # Package config and dependencies
├── dojo_dev.toml           # Local development settings
├── dojo_release.toml       # Production deployment settings
├── .gitignore              # Git ignore rules
└── src/
    ├── lib.cairo           # Module exports
    ├── models/             # Game state models
    ├── systems/            # Game logic systems
    └── tests/              # Test files
```

## Configuration Files

### Scarb.toml
Package manager configuration with Dojo dependencies:
- Project name and version
- Dojo framework dependency
- Cairo edition (2024_07)
- Build targets

### dojo_dev.toml
Local development configuration:
- Katana RPC URL (http://localhost:5050)
- Development account credentials
- World address placeholder

### dojo_release.toml
Production deployment configuration:
- Testnet/Mainnet RPC URLs
- Account configuration
- Deployment settings

## Next Steps

After initialization:
1. Use `dojo-model` skill to add game state models
2. Use `dojo-system` skill to implement game logic
3. Use `dojo-test` skill to write tests
4. Use `dojo-deploy` skill to deploy your world

## Related Skills

- **dojo-model**: Add models to your project
- **dojo-system**: Add systems to your project
- **dojo-config**: Modify configuration later
- **dojo-deploy**: Deploy your project
