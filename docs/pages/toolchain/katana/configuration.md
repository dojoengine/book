---
title: Katana Configuration
description: Complete guide to configuring Katana using TOML files and command-line options for development and production deployments.
---

# Configuration Guide

Katana supports flexible configuration through TOML files and command-line options.
This enables you to customize everything from network settings to gas prices for both development and production deployments.

### Configuration Priority

1. **Command-line arguments** (highest)
2. **Configuration file** (via `--config`)
3. **Environment variables**
4. **Default values** (lowest)

## TOML Configuration

Use a TOML configuration file to define persistent settings for your Katana instance.
Pass the configuration file using the `--config` flag:

```bash
katana --config katana_prod.toml
```

### Key Configuration Sections

- **Core**: Node behavior (`silent`, `no_mining`, `block_time`, `db_dir`)
- **Server**: HTTP server settings (`http_addr`, `http_port`, CORS)
- **Starknet**: Chain configuration (`chain_id`, execution limits)
- **Gas Oracle**: Gas price settings for L1/L2 tokens
- **Forking**: Network forking configuration
- **Development**: Developer-friendly features
- **Metrics**: Monitoring and observability

### Complete Configuration Reference

```toml
# Core node settings
silent = false                    # Don't print anything on startup (default: false)
no_mining = false                 # Disable auto/interval mining (default: false)
block_time = 6000                 # Block time in milliseconds (default: none)
db_dir = "./katana-db"            # Database dir for non-Slot deployments (default: none)

[logging]
log_format = "full"               # Log format: "full" or "json" (default: full)

[server]
http_addr = "127.0.0.1"           # HTTP-RPC server interface (default: 127.0.0.1)
http_port = 5050                  # HTTP-RPC server port (default: 5050)
http_cors_origins = ["*"]         # CORS allowed origins (default: none)
max_connections = 100             # Max concurrent connections (default: none)
max_request_body_size = 33554432  # Max request body size in bytes (default: none)
max_response_body_size = 33554432 # Max response body size in bytes (default: none)
timeout = 60                      # RPC server request timeout in seconds (default: none)
max_event_page_size = 1024        # Max page size for event queries (default: 1024)
max_proof_keys = 100              # Max keys for storage proofs (default: 100)
max_call_gas = 1000000000         # Max gas for starknet_call RPC (default: 1000000000)

[dev]
dev = true                        # Enable development mode (default: true)
seed = "0"                        # Seed for account generation (default: 0)
total_accounts = 10               # Number of pre-funded accounts (default: 10)
no_fee = false                    # Disable transaction fees (default: false)
no_account_validation = false     # Skip account validation (default: false)

[starknet.env]
chain_id = "KATANA"               # Chain ID (default: KATANA)
validate_max_steps = 1000000      # Max steps for validation (default: 1000000)
invoke_max_steps = 10000000       # Max steps for execution (default: 10000000)

[forking]
fork_provider = "https://api.cartridge.gg/x/starknet/mainnet"  # Fork provider URL
fork_block = 1000000              # Fork at specific block number/hash

[metrics]
metrics = false                   # Enable metrics server (default: false)
metrics_addr = "127.0.0.1"        # Metrics server address (default: 127.0.0.1)
metrics_port = 9100               # Metrics server port (default: 9100)

[gpo]  # Gas Price Oracle - all values are u128 strings (hex/decimal)
l2_eth_gas_price = "100000000000"       # L2 ETH gas price in wei
l2_strk_gas_price = "1000000000000000"  # L2 STRK gas price in fri
l1_eth_gas_price = "100000000000"       # L1 ETH gas price in wei
l1_strk_gas_price = "1000000000000000"  # L1 STRK gas price in fri
l1_eth_data_gas_price = "100000000"     # L1 ETH data gas price in wei
l1_strk_data_gas_price = "10000000000"  # L1 STRK data gas price in fri

[cartridge]
controllers = false               # Declare Controller classes at genesis (default: false)
paymaster = false                 # Use Cartridge paymaster (default: false)
api = "https://api.cartridge.gg"  # Cartridge API URL (default: https://api.cartridge.gg)

[explorer]
explorer = false                  # Enable explorer frontend (default: false)
```

## Command-Line Options

All TOML configuration options can be overridden using command-line flags.
Command-line arguments take precedence over configuration file settings.

### CLI Usage

Most configuration options can be passed as command-line arguments:

```bash
# Basic usage
katana [OPTIONS] [COMMAND]

# Development with custom settings
katana --dev --http.port 3000 --dev.no-fee

# Production with configuration file
katana --config prod.toml --db-dir ./katana-db

# Fork from mainnet at specific block
katana --fork.provider https://api.cartridge.gg/x/starknet/mainnet --fork.block 1000000

# Advanced execution limits
katana --validate-max-steps 2000000 --invoke-max-steps 20000000
```

:::tip
Use `katana --help` for a full command reference.
:::

### Subcommands

Katana provides several subcommands for specialized operations beyond running the sequencer.

#### `katana completions <SHELL>`

Generate shell completion scripts for improved command-line experience with tab completion and argument suggestions.

**Supported shells:** `bash`, `elvish`, `fish`, `powershell`, `zsh`

**Usage:**
```bash
katana completions <SHELL>
```

**Setup Examples:**
```bash
# Bash - add to ~/.bashrc or ~/.bash_profile
katana completions bash >> ~/.bashrc

# Zsh - add to ~/.zshrc
katana completions zsh >> ~/.zshrc

# Fish - install to completions directory
katana completions fish > ~/.config/fish/completions/katana.fish
```

#### `katana db`

Database utilities for managing persistent Katana storage and diagnostics.

Display database storage information including table sizes, row counts, and storage usage.
Useful for monitoring database growth and identifying performance bottlenecks.

**Usage:**
```bash
katana db stats [--path <PATH>]
```

**Examples:**
```bash
# Check default database location
katana db stats

# Check specific database path
katana db stats --path ./my-katana-db

# Monitor production database
katana db stats --path /var/lib/katana/production
```

#### `katana init`

Initialize chain configuration for rollup or sovereign blockchain deployment.
Creates genesis files, chain specifications, and settlement configurations.

**Usage:**
```bash
katana init [OPTIONS]
```

**Common Use Cases:**
- **Rollup Setup**: Initialize a new rollup that settles to Starknet
- **Sovereign Chain**: Create an independent blockchain with DA layer
- **Testing Networks**: Set up reproducible test environments

**Quick Examples:**
```bash
# Initialize a rollup settling to Starknet Sepolia
katana init --id my-rollup --settlement-chain sepolia

# Create a sovereign chain
katana init --sovereign --id my-chain --output-path ./chain-config
```

For detailed chain initialization examples and configuration options, see the [Chain Initialization](/toolchain/katana/advanced#chain-initialization-and-settlement) section in the Advanced Features guide.

## Genesis Configuration

Genesis configuration allows you to define the initial state of your blockchain network, including:

- **Fee token configuration** and initial balances
- **Pre-funded accounts** with custom settings
- **Pre-declared classes** for immediate use
- **Pre-deployed contracts** with initial storage

Use genesis configuration to create consistent, repeatable network states for testing and development:

```bash
katana --genesis genesis.json
```

:::tip
Most users will not need to define a custom genesis configuration.
:::

### Genesis JSON Structure

Genesis configuration is defined in a JSON file with the following structure:

**`number`** - Genesis block number

**`parentHash`** - Parent block hash

**`timestamp`** - Block timestamp

**`stateRoot`** - Initial state root

**`sequencerAddress`** - Sequencer address

**`gasPrices`** - Initial gas prices (`ETH`, `STRK`)

**`feeToken`** - Network fee tokens (optional)

- `name`, `symbol`, `decimals` - Token metadata
- `address` - Token contract address (optional)
- `class` - Token class reference (`classHash` or `name`, optional)
	- `classHash` - The hash of the fee token class
	- `name` - The name of the fee token class (defined in `classes`)
- `storage` - Key-value pairs for the fee token's storage

**`universalDeployer`** - The universal deployer configuration (optional)

- `address` - The universal deployer contract address (optional)
- `storage` - Key-value pairs for the deployer's storage (optional)

**`accounts`** - Pre-funded accounts

For every `<CONTRACT_ADDRESS>`, provide:

- `publicKey`, `privateKey` - Account key pair (private key optional)
- `balance` - Initial token balance (optional)
- `nonce` - Account nonce (optional)
- `class` - Account contract class (`classHash` or `name`, optional)
	- `classHash` - The hash of the contract class
	- `name` - The name of the contract class (defined in `classes`)
- `storage` - Key-value pairs for the account's storage (optional)

:::note
Katana in `--dev` mode comes with 10 pre-funded accounts.
:::

**`contracts`** - Pre-deployed contracts

For every `<CONTRACT_ADDRESS>`, provide:

- `class` - Contract class reference (`classHash` or `name`)
	- `classHash` - The hash of the contract class
	- `name` - The name of the contract class (defined in `classes`)
- `balance` - Contract balance (optional)
- `storage` - Key-value pairs for the contract's storage (optional)

**`classes`** - Class declarations

- `class` - Path to class artifact file or full class object
- `classHash` - Overrides computed class hash (optional)
- `name` - Reference name for `classHash` (optional)

### Example Genesis Configuration

```jsonc
{
	"number": 0,
	"parentHash": "0x07b4a...",
	"timestamp": 1703875200,
	"stateRoot": "0x02a5c...",
	"sequencerAddress": "0x04f8b...",
	"gasPrices": {
		"ETH": 100000000000,
		"STRK": 1000000000000000
	},
	"feeToken": {
		"name": "ETHER",
		"symbol": "ETH",
		"decimals": 18,
		"class": "0x02d56...",
		"storage": {
			"0x11": "0x111",
		}
	},
	"universalDeployer": {
		"address": "0x041a7...",
		"storage": {
			"0x10": "0x100"
		}
	},
	"accounts": {
		"0x66efb...": {
			"publicKey": "0x07d82...",
			"balance": "0xD3C21BCECCEDA1000000",
			"class": "0x029927..."
		},
		"0x6b86e...": {
			"publicKey": "0x04c12...",
			"balance": "0xD3C21BCECCEDA1000000"
		}
	},
	"contracts": {
		"0x29873...": {
			"class": "MyERC20",
			"balance": "0xD3C21BCECCEDA1000000",
			"storage": {
				"0x1": "0x1",
				"0x2": "0x2"
			}
		}
	},
	"classes": [
		{
			"class": "path/to/file/erc20.json",
			"name": "MyERC20"
		},
		{
			"class": {
				"abi": [
					{
						"name": "AccountCallArray",
						"type": "struct",
						"size": 4,
						"members": [
							{ "name": "to", "offset": 0, "type": "felt" },
							{ "name": "selector", "offset": 1, "type": "felt" },
							{ "name": "data_offset", "offset": 2, "type": "felt" },
							{ "name": "data_len", "offset": 3, "type": "felt" }
						]
					}
				]
			}
		}
	]
}
```
