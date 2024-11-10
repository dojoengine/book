# Torii configuration file

Torii configuration file is a TOML file that contains the configuration for the Torii server.

```toml
# The world to index. Can be passed here, or using contracts entry.
world_address = "0x1234"

# The sequencer rpc endpoint to index.
rpc = ":5050"

# Database filepath. Empty string defaults to in-memory database.
database = ""

# Server configuration for API endpoints of Torii.
[server]
http_addr = "0.0.0.0"
http_port = 8080
http_cors_origins = ["*"]

# Ports for different Libp2p transport protocols.
relay_port = 9090            # TCP & UDP Quic
relay_webrtc_port = 9091     # WebRTC
relay_websocket_port = 9092  # WebSocket

# Path to identity and certificate files (optional).
relay_local_key_path = ""    # If not set, new identity will be generated.
relay_cert_path = ""         # If not set, new certificate will be generated for WebRTC.

# Comma-separated list of allowed origins for API endpoints.
# Use "*" to allow all origins.
allowed_origins = []

# External URL of the server for GraphQL Playground in hosted environments.
external_url = ""  # Optional

# Prometheus metrics configuration.
[metrics]
# This one is required to enable metrics without arguments.
metrics = true
# Configure metrics address and port for the metrics server to start. Doesn't start by default.
metrics_addr = "0.0.0.0"
metrics_port = 9000

# Whether to open World Explorer in browser on start.
explorer = false

# Indexing configuration.
events_chunk_size = 1024     # Size of events page when indexing.
blocks_chunk_size = 10240    # Number of blocks to process before DB commit.
index_pending = true         # Enable indexing pending blocks.
polling_interval = 500       # Polling interval in milliseconds.
max_concurrent_tasks = 100   # Maximum number of concurrent tasks.

# Indexing features, that can be disabled to save resources.
index_transactions = false   # Whether to index world transactions
index_raw_events = true     # Whether to index raw events

# ERC contract addresses to index (comma-separated).
# TYPE:address.
# TYPE can be world,erc20,erc721.
# For example: ["erc20:0x1234", "erc721:0x5678"]
contracts = []

# Event messages to be treated as historical
# List of model tags (namespace-name)
# For example: ["ns-MyEvent"].
historical_events = []
```

Currently, this is what you should pass to slot for deployments, using the `--config` flag.
