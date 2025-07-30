---
title: Torii CLI Reference
description: Complete command-line reference for Torii, including all configuration options organized by functional area.
---

# Torii CLI Reference

Torii is an automatic indexer and API server for Dojo worlds.
It monitors the sequencer for world-related transactions, processes ECS state changes, and provides GraphQL/gRPC APIs for client access.

The indexer continuously polls the specified RPC endpoint for new blocks, extracts world-related events (model updates, system calls, token transfers), and stores the processed data in a SQLite database.
The API servers run concurrently, providing real-time access to the indexed data.

:::info
These is the reference for [Torii v1.6.0](https://github.com/dojoengine/torii/releases/tag/v1.6.0).
Other versions may have different options.
:::

## Usage

```sh
torii [OPTIONS]
```

## Core Options

### General Options

**`-h, --help`**

Display help information.

**`-V, --version`**

Display version information.

### World Configuration

**`-w, --world <WORLD_ADDRESS>`**

The world contract address to index.
This is the primary World contract deployed by your Dojo project.

*Environment variable: `DOJO_WORLD_ADDRESS`*

**`--rpc <URL>`**

Starknet RPC endpoint URL for blockchain data fetching.

*Default: `http://0.0.0.0:5050`*

### Database Configuration

**`--db-dir <PATH>`**

SQLite database file path.
If the directory doesn't exist, it will be created.
Without this option, Torii uses an in-memory database.

*Example: `--db-dir ./indexer.db`*

**`--config <CONFIG>`**

Path to TOML configuration file. See [Configuration Guide](/toolchain/torii/config_file.md) for details.

**`--dump-config <DUMP_CONFIG>`**

Optional path to dump the current configuration to a file.

## Runner Options

**`--runner.explorer`**

Automatically open the World Explorer in your default browser when Torii starts.

**`--runner.check_contracts`**

Check if contracts are deployed before starting Torii.

## Indexing Options

### Event Processing

**`--indexing.events_chunk_size <SIZE>`**

Number of events to fetch from the sequencer in each request.

*Default: 1024*

**`--indexing.blocks_chunk_size <SIZE>`**

Number of blocks to process before committing changes to the database.

*Default: 10240*

**`--indexing.polling_interval <MS>`**

Polling interval in milliseconds for checking new events.

*Default: 500*

**`--indexing.max_concurrent_tasks <COUNT>`**

Maximum number of concurrent tasks for processing parallelizable events.

*Default: 100*

### Content Selection

**`--indexing.pending`**

Whether to index pending blocks (not yet finalized).

**`--indexing.transactions`**

Whether to index and store world transactions in the database.

**`--indexing.namespaces <NAMESPACES>`**

Comma-separated list of world namespaces to index.
If empty, all namespaces are indexed.

**`--indexing.world_block <BLOCK_NUMBER>`**

Block number to start indexing from.

*Default: 0*

:::warning
Starting from a later block may break token indexing, which requires full chain history.
:::

**`--indexing.contracts <CONTRACTS>`**

ERC contract addresses to index (ERC20, ERC721, ERC1155 only).

*Format: `erc20:0x1234,erc721:0x5678`*

**`--indexing.controllers`**

Whether to index Cartridge controller contracts.

**`--indexing.models <MODELS>`**

The models of the world that Torii should index.
If empty, all models will be indexed.

**`--indexing.strict_model_reader`**

Read models only from their registration block onwards, ensuring strict consistency.

**`--indexing.batch_chunk_size <BATCH_CHUNK_SIZE>`**

The chunk size to use for batch requests.
This is used to split requests into smaller chunks to avoid overwhelming the provider.

*Default: 1024*

## Server Options

### HTTP Server

**`--http.addr <ADDRESS>`**

HTTP server listening interface.

*Default: `127.0.0.1`*

**`--http.port <PORT>`**

HTTP server listening port.

*Default: 8080*

**`--http.cors_origins <ORIGINS>`**

Comma-separated list of allowed CORS origins.

*Example: `"http://localhost:3000,https://app.example.com"`*

## Database Optimization

### SQL Configuration

**`--sql.page_size <SIZE>`**

SQLite page size in bytes.
Must be a power of two between 512 and 65536.

*Default: 32768*

**`--sql.cache_size <SIZE>`**

SQLite cache size.
Positive values specify pages, negative values specify KiB.

*Default: -500000 (500MB)*

**`--sql.all_model_indices`**

Create indices on all model table columns by default.
If false, only key fields are indexed.

**`--sql.model_indices <INDICES>`**

Specify custom indices for specific models.

*Example: `"model_name:field1,field2;another_model:field3,field4"`*

**`--sql.historical <MODELS>`**

Models to treat as historical during indexing (comma-separated).

**`--sql.hooks <HOOKS>`**

A set of SQL statements to execute after specific events.

**`--sql.migrations <PATH>`**

A directory containing custom migrations to run.

**`--sql.wal_autocheckpoint <WAL_AUTOCHECKPOINT>`**

The pages interval to autocheckpoint for SQLite WAL mode.

*Default: 10000*

**`--sql.busy_timeout <BUSY_TIMEOUT>`**

The timeout in milliseconds before the database is considered busy.
Helpful when the database is locked for extended periods.

*Default: 60000*

## Event Processing

**`--events.raw`**

Whether to store raw blockchain events in the database.

## ERC Token Options

**`--erc.max_metadata_tasks <COUNT>`**

Maximum concurrent tasks for indexing ERC721/ERC1155 token metadata.

*Default: 100*

**`--artifacts-path <PATH>`**

Directory path for storing ERC token artifacts.

## P2P Relay Options

### Network Ports

**`--relay.port <PORT>`**

Port for Libp2p TCP & UDP QUIC transports.

*Default: 9090*

**`--relay.webrtc_port <PORT>`**

Port for Libp2p WebRTC transport.

*Default: 9091*

**`--relay.websocket_port <PORT>`**

Port for Libp2p WebSocket transport.

*Default: 9092*

### Identity and Security

**`--relay.local_key_path <PATH>`**

Path to local identity key file.
If not specified, a new identity is generated.

**`--relay.cert_path <PATH>`**

Path to certificate file for WebRTC connections.
Auto-generated if not provided.

**`--relay.peers <PEERS>`**

Comma-separated list of other Torii relays to connect and sync with.

## Snapshot Options

**`--snapshot.url <URL>`**

The snapshot URL to download for bootstrapping the database.

**`--snapshot.version <VERSION>`**

Optional version of the Torii the snapshot was made from.
Used to warn about version mismatches.

## HTTPS/TLS Options

**`--http.tls_cert_path <PATH>`**

Path to the SSL certificate file (.pem).
If provided, the server will use HTTPS instead of HTTP.

**`--http.tls_key_path <PATH>`**

Path to the SSL private key file (.pem).
Required when tls_cert_path is provided.

**`--http.mkcert`**

Use mkcert to automatically generate and install local development certificates for HTTPS.
Creates certificates for `localhost` and `127.0.0.1`.

## gRPC Advanced Options

**`--grpc.subscription_buffer_size <SUBSCRIPTION_BUFFER_SIZE>`**

The buffer size for the subscription channel.

*Default: 256*

**`--grpc.optimistic`**

Whether to broadcast optimistic updates to subscribers.
If enabled, subscribers receive updates for events not yet committed to the database.

**`--grpc.tcp_keepalive_interval <TCP_KEEPALIVE_INTERVAL>`**

TCP keepalive interval in seconds for gRPC connections.
Set to 0 to disable.

*Default: 60*

**`--grpc.http2_keepalive_interval <HTTP2_KEEPALIVE_INTERVAL>`**

HTTP/2 keepalive interval in seconds for gRPC connections.
Set to 0 to disable.

*Default: 30*

**`--grpc.http2_keepalive_timeout <HTTP2_KEEPALIVE_TIMEOUT>`**

HTTP/2 keepalive timeout in seconds.
How long to wait for keepalive ping responses.

*Default: 10*

## Monitoring Options

**`--metrics`**

Enable Prometheus metrics server.

**`--metrics.addr <ADDRESS>`**

Metrics server listening address.

*Default: `127.0.0.1`*

**`--metrics.port <PORT>`**

Metrics server listening port.

*Default: 9200*

## Database Storage

Torii uses SQLite for data storage with two deployment modes:

### In-Memory Database (Development)

- **Usage**: Default mode when no `--db-dir` is specified
- **Pros**: Fast startup, no disk I/O overhead
- **Cons**: Data lost on restart, memory garbage collection issues
- **Best for**: Development, testing, temporary indexing

### Persistent Database (Production)

```sh
torii --world <WORLD_ADDRESS> --db-dir ./torii.db
```

- **Usage**: Specify `--db-dir <PATH>` for persistent storage
- **Pros**: Data survives restarts, better for production
- **Cons**: Disk I/O overhead, requires filesystem access
- **Best for**: Production deployments, long-running indexers

## Examples

### Development Setup

```sh
# Basic development indexer with in-memory database
torii --world 0x1234...abcd

# Development with persistent database and explorer
torii --world 0x1234...abcd --db-dir ./dev-db --explorer
```

### Production Configuration

```sh
# Production indexer with optimized settings
torii --world 0x1234...abcd \
  --db-dir ./production-db \
  --config production.toml \
  --metrics \
  --http.cors_origins "https://app.example.com"
```

### Custom Indexing Scope

```sh
# Index specific namespaces and ERC contracts
torii --world 0x1234...abcd \
  --indexing.namespaces "game,marketplace" \
  --indexing.contracts "erc20:0x5678...,erc721:0x9abc..."
```
