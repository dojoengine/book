---
title: Torii
description: Comprehensive indexing engine for Dojo worlds, providing real-time ECS data synchronization and multiple API interfaces for game clients.
---

![torii](/toolchain/torii-icon-word.png)

# Torii

Torii is the official indexing engine for Dojo worlds, designed to provide real-time synchronization between on-chain game state and client applications.
Built in Rust for performance and reliability, Torii automatically tracks all changes to your game's Entity Component System (ECS) data and makes it accessible through multiple API interfaces.

## Architecture Overview

### Core Components

Torii operates as a multi-layered system that bridges the gap between Starknet blockchain data and client applications:

**Indexing Engine**: The core component that continuously monitors the blockchain for events related to your Dojo world.
It processes transactions, extracts ECS state changes, and maintains a synchronized local database.

**Storage Layer**: A high-performance SQLite database that stores indexed world state, including entities, models, events, and metadata.
The database schema is dynamically generated based on your world's model definitions.

**API Layer**: Multiple interfaces for accessing indexed data:

- **[GraphQL API](/toolchain/torii/graphql.md)**: Provides a flexible, typed interface with real-time subscriptions
- **[gRPC API](/toolchain/torii/grpc.md)**: High-performance binary protocol for efficient data fetching
- **[SQL Endpoint](/toolchain/torii/sql.md)**: Direct database access for custom queries

### Data Flow

1. **World Introspection**: Torii automatically discovers your world's structure by reading model and system registrations from the World contract
2. **Event Processing**: Monitors for Dojo-specific events (`StoreSetRecord`, `StoreUpdateRecord`, `StoreDelRecord`, etc.) and ERC token transfers
3. **ECS Synchronization**: Translates blockchain events into ECS entity and component updates
4. **Real-time Broadcasting**: Propagates changes to connected clients via GraphQL subscriptions

### Scaling and Performance

Torii is designed for production deployment with several performance optimizations:

- **Parallel Processing**: Events are processed concurrently using a task manager system
- **Efficient Batching**: Blockchain data is fetched in configurable chunks to optimize RPC usage
- **Caching Layer**: In-memory caches reduce database load and improve query performance
- **Database Optimization**: Configurable indices and query optimization for large datasets

## Getting Started

### Quick Start

Torii leverages world introspection to bootstrap directly from an on-chain deployment:

```sh
torii --world <WORLD_ADDRESS>
```

This starts Torii with default settings:

- GraphQL API at `http://localhost:8080/graphql`
- gRPC API at `http://localhost:8080`
- In-memory database (for development)

### Production Configuration

For production deployments, use persistent storage and custom configuration:

```sh
torii --world <WORLD_ADDRESS> --db-dir ./torii-db --config torii_prod.toml
```

## Installation

Torii can be installed via [`dojoup`](/installation.mdx), our dedicated package manager:

```sh
curl -L https://install.dojoengine.org | bash

# Restart your terminal

dojoup install
```

:::note
This will install the `torii` binary at `~/.dojo/bin`
:::

:::tip
Dojoup automatically synchronizes compatible versions of Dojo, Katana, and Torii
:::

### Installing with `asdf`

If you prefer to install with the `asdf` version manager:

```sh
asdf plugin add torii https://github.com/dojoengine/asdf-torii.git

asdf install torii latest
```

:::note
This will install the `torii` binary at `~/.asdf/shims`
:::

### Building from Source

If you prefer to build from the source code:

```sh
git clone https://github.com/dojoengine/torii.git

cargo install --path ./torii/bin/torii --profile local --force
```

:::note
This will install the `torii` binary at `~/.cargo/bin`
:::

## Next Steps

- **[Configuration Guide](/toolchain/katana/configuration.md)**: Learn how to configure Torii with TOML files and CLI arguments
- **[GraphQL API](/toolchain/torii/graphql.md)**: Explore the GraphQL interface for flexible data queries
- **[gRPC API](/toolchain/torii/grpc.md)**: Use the high-performance gRPC interface
