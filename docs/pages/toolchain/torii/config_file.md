---
title: Torii Configuration Guide
description: Comprehensive guide to configuring Torii using TOML configuration files, including server, relay, indexing, and event options.
---

# Torii configuration file

Torii configuration file is a TOML file that contains the configuration for the Torii server.

```toml
# The World address to index.
world_address = "0x01b2e50266b9b673eb82e68249a1babde860f6414737b4a36ff7b29411a64666"

# Default RPC URL configuration
rpc = "http://0.0.0.0:5050"

# Database configuration
# Optional: If not specified, uses in-memory database
db_dir = "/tmp/torii"

# External URL for GraphQL Playground
# Optional: Used in hosted environments
# external_url = ""

# Whether to open World Explorer in browser
# Optional: Defaults to false
# explorer = false

# Server Options
[server]
http_addr = "127.0.0.1"
http_port = 8080
http_cors_origins = ["*"]

# Relay Options
[relay]
port = 9090                   # TCP & UDP Quic transport
webrtc_port = 9091            # WebRTC transport
websocket_port = 9092         # WebSocket transport
# relay.local_key_path = ""   # Optional: Path to identity key file, generated if none.
# relay.cert_path = ""        # Optional: Path to certificate file for WebRTC

# Indexing Options
[indexing]
events_chunk_size = 1024     # Size of events page to fetch
blocks_chunk_size = 10240    # Blocks to process before DB commit
index_pending = true         # Enable indexing pending blocks
polling_interval = 500       # Polling interval in milliseconds
max_concurrent_tasks = 100   # Maximum concurrent indexing tasks
index_transactions = false   # Whether to index world transactions
contracts = [                # ERC contracts to index
    "erc20:0x1234",
    "erc721:0x5678"
]

# Events Options
[events]
raw = true                  # Whether to index raw events
historical = [              # Historical event message tags
    "ns-E",
    "ns-EH"
]

# Metrics Options
[metrics]
metrics = true            # Enable metrics server
addr = "127.0.0.1"        # Metrics server address
port = 9200               # Metrics server port
```

Currently, this is what you should pass to slot for deployments, using the `--config` flag.
