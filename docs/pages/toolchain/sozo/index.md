---
title: Sozo Overview
description: The comprehensive command-line interface for Dojo world development, providing project management, deployment, and world interaction capabilities.
---

![sozo](/toolchain/sozo-icon-word.png)

# Sozo

Sozo is the **comprehensive command-line interface** for Dojo world development, covering the entire lifecycle from project development to production deployment.
It provides a unified interface that abstracts blockchain complexity while maintaining full control over your Dojo worlds.

Sozo's key capabilities include **automatic world introspection** (discovering and working with any deployed world), **intelligent migration management** (reconciling local changes with deployed state), and **tag-based contract resolution** (using human-readable names instead of addresses).

## Core Functionality

Sozo's functionality spans two primary domains:

**Project Management**: Development lifecycle tools including project scaffolding, contract compilation, testing, and deployment to any Starknet-compatible network.

**World Interaction**: Runtime operations for deployed worlds including system execution, data querying, permission management, and world state inspection.

### Resource Types

Sozo manages five core resource types that form the building blocks of Dojo worlds:

**Models**: Data structures that define the ECS components of your world state (e.g., `Position`, `Health`, `Inventory`).

**Systems**: Smart contracts containing the game logic that operates on models (e.g., `MovementSystem`, `CombatSystem`).

**Events**: Structured notifications emitted by systems to communicate state changes and enable efficient indexing.

**Libraries**: Reusable Cairo code that can be shared across multiple systems within the world.

**External Contracts**: Non-Dojo contracts that integrate with your world but exist outside the ECS framework.

For more information about working with these resources, see the [Framework documentation](/framework).

### World Introspection

Sozo can automatically discover and work with any deployed Dojo world through blockchain introspection, without requiring local build artifacts.

**Automatic Discovery**: Given a world address, Sozo queries the World contract to discover all registered resources (models, systems, events, libraries) along with their metadata, ABIs, and permissions.

**Universal Compatibility**: You can use Sozo to interact with worlds deployed by others, inspect unfamiliar world state, or recover from lost local artifacts by rebuilding complete world understanding from chain state.

**Dynamic Schema Detection**: Sozo reconstructs model schemas, system interfaces, and event definitions from on-chain registrations, enabling type-aware interactions with any world.

### Migration System

Sozo's migration system automatically reconciles local world state with deployed blockchain state through precise diff analysis and ordered execution.

**State Diffing**: `sozo migrate` compares local world configuration against deployed state by examining class hashes, resource registrations, and permissions to identify changes.

**Ordered Execution**: Migration follows a strict sequence:

1. Sync namespaces (all resources are namespaced)
2. Declare new classes and register/upgrade resources (models, systems, events, libraries)
3. Apply permission changes (writers and owners)
4. Initialize newly deployed contracts

**Transaction Optimization**: Operations are batched into multicall transactions to reduce gas costs and improve atomicity, with fallback to sequential execution.

**Multi-Account Parallelization**: Class declarations can be parallelized across multiple accounts to speed up large world deployments.

### Manifest Integration

Sozo automatically generates and maintains deployment manifests that eliminate manual address management.

**Generated Manifests**: After each `sozo migrate`, Sozo writes a `manifest_{profile}.json` file containing complete deployment state: contract addresses, class hashes, ABIs, and metadata for all resources.

**Tag-Based Contract Resolution**: Commands like `sozo execute` and `sozo call` accept human-readable contract tags (e.g., `Actions`, `dojo_examples-actions`) instead of raw addresses.
Sozo resolves tags by consulting the local manifest first, then falling back to live chain introspection.

**Fallback to Chain State**: When manifests are missing or `--diff` is used, Sozo rebuilds contract mappings by querying deployed world state directly.

**Cross-Environment Consistency**: Each profile maintains its own manifest file, enabling seamless switching between local development, testnet, and mainnet deployments.

## Getting Started

### Quick Start

Initialize a new Dojo project and deploy to local [Katana](/toolchain/katana):

```bash
# Start `katana --dev --dev.no-fee` in a separate terminal

sozo build && sozo migrate
```

## Installation

For installation instructions, see the [Toolchain Installation Guide](/toolchain#installation) which covers all Dojo toolchain components.

For detailed data format specifications when executing commands, see the [Project Management](/toolchain/sozo/project-management#data-format-reference) guide.

## Next Steps

- **[Project Management](/toolchain/sozo/project-management)**: Learn the development workflow from init to deploy
- **[World Interaction](/toolchain/sozo/world-interaction)**: Master runtime operations for deployed worlds
- **[Binding Generation](/toolchain/sozo/binding-generation)**: Generate type-safe client bindings
