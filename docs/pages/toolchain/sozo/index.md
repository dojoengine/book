---
title: Sozo Overview
description: The comprehensive command-line interface for Dojo world development, providing project management, deployment, and world interaction capabilities.
---

![sozo](/toolchain/sozo/sozo-icon-word.png)

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

**Tag-Based Contract Resolution**: Commands like `sozo execute` and `sozo call` accept human-readable contract tags (e.g., `Actions`, `dojo_examples-actions`) instead of raw addresses. Sozo resolves tags by consulting the local manifest first, then falling back to live chain introspection.

**Fallback to Chain State**: When manifests are missing or `--diff` is used, Sozo rebuilds contract mappings by querying deployed world state directly.

**Cross-Environment Consistency**: Each profile maintains its own manifest file, enabling seamless switching between local development, testnet, and mainnet deployments.

## Getting Started

### Quick Start

Initialize a new Dojo project and deploy to local Katana:

```bash
# Start `katana --dev --dev.no-fee` in a separate terminal

sozo build && sozo migrate
```

## Installation

Sozo can be installed via [`dojoup`](/installation.mdx), our dedicated package manager:

```bash
curl -L https://install.dojoengine.org | bash

# Restart your terminal

dojoup install
```

:::note
This will install the `sozo` binary at `~/.dojo/bin`
:::

:::tip
Dojoup automatically synchronizes compatible versions of Dojo, Katana, and Torii
:::

### Installing with `asdf`

If you prefer to install with the `asdf` version manager:

```bash
asdf plugin add sozo https://github.com/dojoengine/asdf-sozo.git

asdf install sozo latest
```

:::note
This will install the `sozo` binary at `~/.asdf/shims`
:::

### Building from Source

If you prefer to build from source:

```bash
git clone https://github.com/dojoengine/dojo

cargo install --path .dojo/bin/sozo --locked --force
```

:::note
This will install the `sozo` binary at `~/.cargo/bin`
:::

## Data Format Reference

When interacting with Dojo systems through Sozo, you'll need to provide calldata in the proper format.
Sozo uses a prefixed format that allows explicit type specification for Cairo values.

By default, calldata values are treated as a `felt252` or any type that fits into one felt:

```bash
sozo execute Actions move 10 20  # Two felt252 values
```

For complex Cairo types, use these prefixes to ensure proper encoding:

| Prefix          | Description      | Example |
| --------------- | ---------------- | ------- |
| `u256`          | a 256-bit unsigned integer | `u256:0x1234` |
| `str`           | a Cairo string (ByteArray) | `str:hello` or `str:'hello world'` |
| `sstr`          | a Cairo short string       | `sstr:hello` or `sstr:'hello world'` |
| `int`           | a signed integer that fits into an `i128` | `int:-1234` |
| `arr`           | a dynamic array of values that fits into one felt | `arr:0x01,0x02,0x03` |
| `u256arr`       | a dynamic array of 256-bit unsigned integers | `u256arr:0x01,0x02,0x03` |
| `farr`          | a fixed-size array of values that fits into one felt | `farr:0x01,0x02,0x03` |
| `u256farr`      | a fixed-size array of 256-bit unsigned integers | `u256farr:0x01,0x02,0x03` |

### Usage Examples

```bash
# Execute a system with mixed types
sozo execute Actions create_player str:Alice u256:1000 arr:1,2,3

# Call a view function with complex parameters
sozo call GameSystem get_player_stats str:Alice int:-50
```

## Next Steps

- **[Project Management](/toolchain/sozo/project-management)**: Learn the development workflow from init to deploy
- **[World Interaction](/toolchain/sozo/world-interaction)**: Master runtime operations for deployed worlds
