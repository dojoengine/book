---
title: Configuration Guide
description: Comprehensive guide to configuring Torii for production deployments using TOML configuration files.
---

# Configuration Guide

Torii supports TOML configuration files for complex deployments. Configuration provides structured control over indexing, performance, security, and monitoring settings.

## Configuration Priority

1. **Command-line arguments** (highest)
2. **Configuration file** (via `--config`)
3. **Environment variables**
4. **Default values** (lowest)

## Configuration Sections

### Basic Configuration

Essential settings for getting Torii running:

```toml
# Required: World contract to index
world_address = "0x01b2e..."

# Required: Starknet RPC endpoint
rpc = "https://api.cartridge.gg/x/starknet/mainnet"

# Optional: Persistent database (omit for in-memory)
db_dir = "torii.db"

# Optional: Open the World Explorer in browser
explorer = true
```

### Server Configuration

HTTP API and network settings:

```toml
[server]
http_addr = "0.0.0.0"        # Listen address (0.0.0.0 for all interfaces)
http_port = 8080             # API port
http_cors_origins = [ "*" ]  # CORS allowed origins

# Optional: HTTPS with TLS certificates
tls_cert_path = "/etc/ssl/torii.crt"
tls_key_path = "/etc/ssl/torii.key"
```

### Indexing Configuration

Control what data to index and how:

```toml
[indexing]
# Performance tuning
events_chunk_size = 1024        # Events per RPC request (default: 1024)
blocks_chunk_size = 10240       # Blocks per DB commit (default: 10240)
polling_interval = 500          # Check interval in ms (default: 500)
max_concurrent_tasks = 100      # Parallel processing (default: 100)

# Content selection
index_pending = false           # Include pending transactions
index_transactions = true       # Store transaction data
namespaces = ["game", "market"] # Specific namespaces only (empty = all)

# ERC token contracts to index
contracts = [
    "erc20:0x049d3...",         # Tokens
    "erc721:0x05dbd..."         # NFTs
]
```

### Database Optimization

SQLite performance and indexing settings:

```toml
[sql]
page_size = 32768              # Page size in bytes (default: 32768, range: 512-65536)
cache_size = -500000           # Cache size: negative = KiB, positive = pages (default: -500MB)
all_model_indices = false      # Auto-create all indices (resource intensive)

# Database performance tuning
wal_autocheckpoint = 10000     # Pages interval for autocheckpoint (default: 10000)
busy_timeout = 60000           # Database busy timeout in ms (default: 60000)

# Optional: Custom migrations directory
migrations = "/path/to/migrations"

# Historical data retention
historical = ["game-Battle", "market-Trade"]

# Custom indices for specific model queries
# Spatial queries
[[sql.model_indices]]
model_tag = "game-Position"
fields = ["external_x", "external_y"]
# Leaderboards
[[sql.model_indices]]
model_tag = "game-Player"
fields = ["external_score", "external_level"]
```

### Monitoring & Metrics

Prometheus metrics and observability:

```toml
[metrics]
metrics = true                # Enable Prometheus endpoint
addr = "0.0.0.0"              # Metrics server address
port = 9200                   # Metrics port

[events]
raw = false                   # Store raw blockchain events (development only)
```

:::info
[Prometheus](https://prometheus.io/) is an open-source monitoring and alerting system that collects metrics from applications and stores them in a time-series database.
When enabled, Torii exposes metrics like indexing performance, database query times, and system resource usage at the `/metrics` endpoint.
:::

### P2P Relay

Multi-region synchronization and relay:

```toml
[relay]
port = 9090                   # TCP/UDP QUIC port
webrtc_port = 9091            # WebRTC port
websocket_port = 9092         # WebSocket port

# Identity and certificates
local_key_path = "/etc/torii/identity.key"
cert_path = "/etc/torii/webrtc.cert"
```

:::info
P2P relay enables Torii instances to communicate directly with each other for data synchronization across regions or networks.
This is useful for distributed deployments where multiple Torii instances need to share indexed data or coordinate processing without going through centralized infrastructure.
:::

## Environment Examples

### Development

Fast iteration with local Katana:

```toml
world_address = "0x1234..."
rpc = "http://localhost:5050"
# No db_dir = in-memory database

[indexing]
polling_interval = 100        # Fast updates (vs default 500ms)
index_pending = true          # Include pending txs

[server]
http_cors_origins = ["*"]     # Allow all origins
```

### Production

Optimized for stability and performance:

```toml
world_address = "0x9abc..."
rpc = "https://api.cartridge.gg/x/starknet/mainnet"
db_dir = "/var/lib/torii/production"

[indexing]
polling_interval = 1000       # Conservative polling (vs default 500ms)
max_concurrent_tasks = 200    # Scale for load (vs default 100)
index_pending = false         # Stability over speed

[sql]
cache_size = -2000000         # 2GB cache in KiB (vs default -500MB)
page_size = 65536             # Large pages (vs default 32768)

[metrics]
metrics = true                # Essential monitoring
```

## Best Practices

**Performance**:
- Use persistent storage (`db_dir`) in production
- Tune chunk sizes based on RPC performance
- Enable indices only for frequently queried fields
- Monitor memory usage with high concurrency

**Security**:
- Bind to `127.0.0.1` for local-only access
- Use specific CORS origins in production
- Enable TLS for external-facing deployments
- Secure P2P relay certificates

**Monitoring**:
- Always enable metrics in production
- Set up Prometheus scraping and alerting
- Monitor database growth and query performance
- Track indexing lag and error rates
