---
title: Katana Configuration Guide
description: Comprehensive guide to configuring Katana using TOML configuration files, command-line options, and genesis settings including server, Starknet, gas oracle, forking, and development options.
---

# Katana Configuration

This page covers all aspects of configuring Katana, including command-line options, TOML configuration files, and genesis configuration.

## Configuration File

**Source: config_file.md**

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

## Genesis Configuration

**Source: genesis.md**

Katana's genesis configuration feature allows you to define the **initial state** and settings of your blockchain network. This feature enables you to **customize** the chain's starting point and set up some aspects of the network according to your specific requirements. With this feature, you can:

1. Specify the **token** used for network fees
2. **Allocate** initial token balances to accounts
3. **Pre-declare classes** at the start of the chain
4. **Pre-deploy smart contracts** at the start of the chain

The genesis configuration provides a convenient way to customize the chain's starting point, **reduce manual setup** efforts, and ensure a **consistent** and predictable initial state for your applications and smart contracts.

### Configuration File Format

The genesis config file is a JSON file that contains the following fields:

-   `number`  
    _The block number of the genesis block._
-   `parentHash`  
    _The parent hash of the genesis block._
-   `timestamp`  
    _The timestamp of the genesis block._
-   `stateRoot`  
    _The state root of the genesis block._
-   `sequencerAddress`  
    _The sequencer address._
-   `gasPrices` _The gas prices for the L1 tokens at the genesis block._
    -   `ETH`  
        _The price of ETH in wei._
    -   `STRK`  
        _The price of STRK in fri._
-   `feeToken` _The network fee token configuration. (optional)_
    -   `name`  
        _The name of the fee token._
    -   `symbol`  
        _The symbol of the fee token._
    -   `decimals`  
        _The number of decimal places for the fee token._
    -   `address` (optional)  
        _The fee token contract address._
    -   `class` (optional)  
        _The class of the fee token. It is has a value of either a `classHash` or a `name`._
        -   `classHash` (option)  
             _The hash of the fee token class hash (`0x` prefixed hex value)._
        -   `name` (option)  
             _The name of the fee token class defined in `classes`._
    -   `storage` (optional)  
        _Key-value pairs for the fee token's storage._
-   `universalDeployer` _The universal deployer configuration. (optional)_
    -   `address` (optional)  
        _The universal deployer contract address._
    -   `storage` (optional)  
        _Key-value pairs for the universal deployer's storage._
-   `accounts` _The genesis allocations._
    -   <CONTRACT*ADDRESS> \_The address of the account contract.*
        -   `publicKey`  
            _The public key associated with the account._
        -   `privateKey` (optional)  
            _The private key associated with publicKey._
        -   `balance` (optional)  
            _The initial balance of the account._
        -   `nonce` (optional)  
            _The nonce of the account._
        -   `class` (optional)  
            _The class to be used for the account contract. It is has a value of either a `classHash` or a `name`._
            -   `classHash` (option)  
                _The hash of the contract class (`0x` prefixed hex value)._
            -   `name` (option)  
                _The name of contract class defined in `classes`._
        -   `storage` (optional)  
            _Key-value pairs for the account's storage._
-   `contracts` _Genesis contract deployments._
    -   <CONTRACT*ADDRESS> \_The address of the contract.*
        -   `class`  
            _The class of the contract. It is has a value of either a `classHash` or a `name`._
            -   `classHash` (option)  
                _The hash of the contract class (`0x` prefixed hex value)._
            -   `name` (option)  
                _The name of the contract class defined in `classes`._
        -   `balance` (optional)  
            _The balance allocated to the contract._
        -   `storage` (optional)  
            _Key-value pairs for the contract's storage._
-   `classes` _Classes to declare at genesis._
    -   `class`  
        _The path to the class artifact file relative to the genesis config file, or the full class artifact object._
    -   `classHash` (optional)  
        _The hash of the class. To override the actual class hash that will be computed from the class definition itself._
    -   `name` (optional)  
        _The name of the class to be used as a reference for the class hash._

### Genesis Example

```jsonc
{
	"number": 0,
	"parentHash": "0x999",
	"timestamp": 5123512314,
	"stateRoot": "0x99",
	"sequencerAddress": "0x100",
	"gasPrices": {
		"ETH": 1111,
		"STRK": 2222
	},
	"feeToken": {
		"address": "0x55",
		"name": "ETHER",
		"symbol": "ETH",
		"decimals": 18,
		"class": "0x8",
		"storage": {
			"0x111": "0x1",
			"0x222": "0x2"
		}
	},
	"universalDeployer": {
		"address": "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
		"storage": {
			"0x10": "0x100"
		}
	},
	"accounts": {
		"0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a": {
			"publicKey": "0x1",
			"balance": "0xD3C21BCECCEDA1000000",
			"nonce": "0x1",
			"class": "0x444",
			"storage": {
				"0x1": "0x1",
				"0x2": "0x2"
			}
		},
		"0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114": {
			"publicKey": "0x2",
			"balance": "0xD3C21BCECCEDA1000000"
		},
		"0x79156ecb3d8f084001bb498c95e37fa1c4b40dbb35a3ae47b77b1ad535edcb9": {
			"publicKey": "0x3"
		},
		"0x053a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf": {
			"publicKey": "0x4",
			"balance": "0xD3C21BCECCEDA1000000",
			"privateKey": "0x115"
		}
	},
	"contracts": {
		"0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af": {
			"balance": "0xD3C21BCECCEDA1000000",
			"class": "MyERC20",
			"storage": {
				"0x1": "0x1",
				"0x2": "0x2"
			}
		},
		"0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a": {
			"balance": "0xD3C21BCECCEDA1000000"
		},
		"0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c": {
			"storage": {
				"0x1": "0x1"
			}
		}
	},
	"classes": [
		{
			"class": "path/to/file/erc20.json",
			"name": "MyERC20"
		},
		{
			"class": "path/to/file/universal_deployer.json",
			"classHash": "0x444"
		},
		{
			"class": {
				"abi": [
					{
						"members": [
							{ "name": "to", "offset": 0, "type": "felt" },
							{ "name": "selector", "offset": 1, "type": "felt" },
							{ "name": "data_offset", "offset": 2, "type": "felt" },
							{ "name": "data_len", "offset": 3, "type": "felt" }
						],
						"name": "AccountCallArray",
						"size": 4,
						"type": "struct"
					}
				],
                ...
			}
		}
	]
}
```