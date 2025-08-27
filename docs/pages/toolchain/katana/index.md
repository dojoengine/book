---
title: Katana Overview
description: A high-performance Starknet sequencer designed for rapid development and production appchain deployments, featuring instant mining, state forking, and Cairo Native compilation.
---

![katana](/toolchain/katana/katana-icon-word.png)

# Katana

Katana is a **blazingly fast Starknet sequencer** built for onchain game developers and appchain builders, focusing on **rapid iteration** and **flexible deployment models**.

:::info
Unlike **miners** (who compete to solve puzzles) or **validators** (who verify blocks in consensus), a **sequencer** has singular authority over transaction ordering and block production.
This enables fast finality and predictable performance, making it ideal for appchains and dev environments.
:::

## Architecture Overview

Katana follows a **modular, layered architecture** with key components:

**Backend**: Manages block processing and sequencer state coordination.

**Block Producer**: Handles block creation with configurable mining strategies.

**Executor Factory**: Creates Cairo executors using Starknet's **Blockifier**.

**Storage Provider**: Abstracts database access using **Merkle Patricia Tries** via [Bonsai](https://github.com/dojoengine/bonsai-trie).

**Transaction Pool**: Multi-stage validation pipeline from submission to block inclusion.

**RPC Server**: Provides standard Starknet APIs plus dev-specific endpoints.

### Why Katana?

**Developer-First**: Tooling, flexible configuration, extensive APIs, and hot reloading.

**State Forking**: Fork existing networks at any block for testing against live contracts.

**Multi-Settlement**: Designed for Starknet settlement (L3 model) or sovereign operation.

**Cairo Native**: Optional ahead-of-time compilation for significant performance gains.

:::info
Cairo Native compiles Cairo programs to native machine code via MLIR and LLVM, offering large performance improvements over vanilla VM interpretation.
This feature must be enabled at compile time with the `native` feature flag and creates additional dependencies.
:::

## Getting Started

:::note
Katana requires glibc version 2.33 or higher.
It is not available on Ubuntu 20.04 LTS, Debian 10 Buster, CentOS 7, or below.
:::

### Quick Start

Start a local development sequencer with pre-funded accounts and instant mining:

```bash
katana --dev --dev.no-fee
```

This launches Katana in development mode with:

- An RPC server at `http://localhost:5050`
- 10 pre-funded accounts
- Instant block mining
- Gas fees disabled

### Production Configuration

For production appchain deployments, use persistent storage and custom configuration:

```bash
katana --db-dir ./katana-db --config katana_prod.toml
```

Common production scenarios:

```bash
# Fork from Starknet mainnet at block 1000000
katana --fork.provider https://api.cartridge.gg/x/starknet/mainnet --fork.block 1000000

# Custom mining interval (every 10 seconds)
katana --block-time 10000 --db-dir ./katana-db
```

## Installation

Katana can be installed via [`dojoup`](/installation.mdx), our dedicated package manager:

```bash
curl -L https://install.dojoengine.org | bash

# Restart your terminal

dojoup install
```

:::note
This will install the `katana` binary at `~/.dojo/bin`
:::

:::tip
Dojoup automatically synchronizes compatible versions of Dojo, Katana, and Torii
:::

### Installing with `asdf`

If you prefer to install with the `asdf` version manager:

```bash
asdf plugin add katana https://github.com/dojoengine/asdf-katana.git

asdf install katana latest
```

:::note
This will install the `katana` binary at `~/.asdf/shims`
:::

### Building from Source

If you prefer to build from source:

```bash
git clone https://github.com/dojoengine/katana

cargo install --path ./katana/bin/katana --locked --force
```

:::note
This will install the `katana` binary at `~/.cargo/bin`
:::

## Next Steps

- **[Development Features](/toolchain/katana/development)**: Explore mining, storage, forking, and contract deployment
- **[Configuration Guide](/toolchain/katana/configuration)**: Learn about TOML configuration files and advanced options
- **[CLI and RPC Reference](/toolchain/katana/reference)**: Complete reference for commands and API endpoints
- **[Advanced Features](/toolchain/katana/advanced)**: Understand execution, messaging, and settlement
