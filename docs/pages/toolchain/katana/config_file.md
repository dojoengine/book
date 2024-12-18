---
title: Katana Configuration Guide
description: Comprehensive guide to configuring Katana using TOML configuration files, including server, Starknet, gas oracle, forking, and development options.
---

# Katana configuration file

Katana has now the possibility to be initialized with a configuration file. This file is a TOML file that contains the configuration for the Katana sequencer.

Currently, this is what should be passed to slot for deployments:

```toml
# Don't print anything to the console
# Default is false.
silent = true

# Disable auto and interval mining, and mine on demand instead via an endpoint.
# Default is false.
no_mining = true

# Block time in milliseconds for interval mining.
# Default is none.
block_time = 1000

# Directory for the database.
# This is never used when deployed on slot.
# Default none.
db_dir = "/tmp/katana"

# Log format, default to "full".
[logging]
log_format = "Json"

# Server options to configure the HTTP server of katana.
[server]
http_addr = "0.0.0.0"
http_port = 5050
http_cors_origins = ["*"]
max_connections = 100

# Starknet options
[starknet]
# On slot, the chain id is set by default to the project's name.
env.chain_id.Named = "Mainnet"
# env.chain_id.Id = "0x1234"
env.validate_max_steps = 10_000_000
env.invoke_max_steps = 10_000_000

# Gas oracle options
# All the values here are u128, and must be provided inside a string (hex or dec).
[gpo]
l1_eth_gas_price = "0x1234"
l1_strk_gas_price = "0xff"
l1_eth_data_gas_price = "0x1234"
l1_strk_data_gas_price = "0xff"

# Forking options.
[forking]
fork_provider = "https://api.cartridge.gg/x/starknet/sepolia"
fork_block.Num = 800_000

# Development options

# To enable dev if you don't use any options, you must use this one below.
[dev]
dev = true
seed = "0"
total_accounts = 10
no_fee = false
no_account_validation = false

# Metrics.
[metrics]
# This one is required to enable metrics without arguments.
metrics = true
# Configure metrics address and port for the metrics server to start. Doesn't start by default.
metrics_addr = "0.0.0.0"
metrics_port = 9000

# Slot options.
[slot]
controller = true
```

The genesis file is recommended to be passed in it's own `--genesis` argument at the moment, which is still supported.
