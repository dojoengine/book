---
title: Katana CLI and RPC Reference
description: Complete reference documentation for all Katana command-line options, subcommands, and JSON-RPC methods.
---

# CLI and RPC Reference

This page provides complete reference documentation for Katana's command-line interface and JSON-RPC API.

## Main Command

**Source: cli/katana.md**

### NAME

`katana` - Create a local Starknet sequencer for deploying and developing Starknet smart contracts.

### USAGE

```sh
katana [OPTIONS] [COMMAND]
```

### OPTIONS

#### General Options

`--silent`
&nbsp;&nbsp;&nbsp;&nbsp; Don't print anything on startup.

`--no-mining`
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead via an endpoint.

`-b, --block-time <MILLISECONDS>`
&nbsp;&nbsp;&nbsp;&nbsp; Block time in milliseconds for interval mining.

`--db-dir <PATH>`
&nbsp;&nbsp;&nbsp;&nbsp; Directory path of the database to initialize from.

`--messaging <PATH>`
&nbsp;&nbsp;&nbsp;&nbsp; Configure the messaging with an other chain.

`-V, --version`
&nbsp;&nbsp;&nbsp;&nbsp; Print version information.

`-h, --help`
&nbsp;&nbsp;&nbsp;&nbsp; Print help (see more with '--help').

#### Server Options

`--http.addr <ADDRESS>`
&nbsp;&nbsp;&nbsp;&nbsp; HTTP-RPC server listening interface. [default: 127.0.0.1]

`--http.port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; HTTP-RPC server listening port. [default: 5050]

`--http.corsdomain <HTTP_CORS_ORIGINS>`
&nbsp;&nbsp;&nbsp;&nbsp; Comma separated list of domains from which to accept cross origin requests.

`--rpc.max-connections <COUNT>`
&nbsp;&nbsp;&nbsp;&nbsp; Maximum number of concurrent connections allowed. [default: 100]

#### Logging Options

`--log.format <FORMAT>`
&nbsp;&nbsp;&nbsp;&nbsp; Log format to use. [default: full] [possible values: json, full]

#### Metrics Options

`--metrics`
&nbsp;&nbsp;&nbsp;&nbsp; Enable metrics.

`--metrics.addr <ADDRESS>`
&nbsp;&nbsp;&nbsp;&nbsp; The metrics will be served at the given address. [default: 127.0.0.1]

`--metrics.port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; The metrics will be served at the given port. [default: 9100]

#### Environment Options

`--chain-id <CHAIN_ID>`
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID.

`--validate-max-steps <VALIDATE_MAX_STEPS>`
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account validation logic. [default: 1000000]

`--invoke-max-steps <INVOKE_MAX_STEPS>`
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account execution logic. [default: 10000000]

`--genesis <GENESIS>`
&nbsp;&nbsp;&nbsp;&nbsp; The genesis configuration file.

#### Gas Price Oracle Options

`--gpo.l1-eth-gas-price <WEI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 ETH gas price (denominated in wei). [default: 0]

`--gpo.l1-strk-gas-price <FRI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 STRK gas price (denominated in fri). [default: 0]

`--gpo.l1-eth-data-gas-price <WEI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 ETH data gas price (denominated in wei). [default: 0]

`--gpo.l1-strk-data-gas-price <FRI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 STRK data gas price (denominated in fri). [default: 0]

#### Forking Options

`--fork.provider <URL>`
&nbsp;&nbsp;&nbsp;&nbsp; The RPC URL of the network to fork from.

`--fork.block <BLOCK>`
&nbsp;&nbsp;&nbsp;&nbsp; Fork the network at a specific block id, can either be a hash (0x-prefixed) or a block number.

#### Explorer Options

`--explorer`
&nbsp;&nbsp;&nbsp;&nbsp; An explorer will be served for your katana node.

`--explorer.addr <ADDRESS>`
&nbsp;&nbsp;&nbsp;&nbsp; The address to run the explorer frontedn on. [default: 127.0.0.1] 

`--explorer.port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; The port to run the explorer frontend on. [default: 3001] 

#### Development Options

`--dev`
&nbsp;&nbsp;&nbsp;&nbsp; Enable development mode.

`--dev.seed <SEED>`
&nbsp;&nbsp;&nbsp;&nbsp; Specify the seed for randomness of accounts to be predeployed. [default: 0]

`--dev.accounts <NUM>`
&nbsp;&nbsp;&nbsp;&nbsp; Number of pre-funded accounts to generate. [default: 10]

`--dev.no-fee`
&nbsp;&nbsp;&nbsp;&nbsp; Disable charging fee when executing transactions.

`--dev.no-account-validation`
&nbsp;&nbsp;&nbsp;&nbsp; Disable account validation when executing transactions.

#### Slot Options

`--config <CONFIG>`
&nbsp;&nbsp;&nbsp;&nbsp; Configuration file.

## Subcommands

### `katana completions`

**Source: cli/completions.md**

Generates a shell completions script for the `katana` cli for the given supported shells:

-   bash
-   elvish
-   fish
-   powershell
-   zsh

#### USAGE

```sh
katana completions [OPTIONS]
```

#### EXAMPLES

Generate shell completions script for `bash` and appends it to a `.bashrc` file:

```bash
katana completions bash >> ~/.bashrc
```

### `katana db`

**Source: cli/db/index.md**

Utility commands for managing the Katana database:

-   [`katana db stats`](/toolchain/katana/cli/db/stats.md)

#### `katana db stats`

**Source: cli/db/stats.md**

Dispays database tables information.

##### Usage

```sh
katana db stats [OPTIONS]
```

##### Options

`-p, --path <PATH>`
&nbsp;&nbsp;&nbsp;&nbsp;Path to the database directory [default: ~/.katana/db]

## JSON-RPC API

**Source: rpc/index.md**

### Supported Transport Layers

JSON-RPC is provided on multiple transports. Katana supports HTTP, and WebSocket. Both transports are enabled by default.

### Supported RPC Methods

#### Namespaces

The RPC methods are categorized into the following namespaces:

| Namespace                                    | Description |
| -------------------------------------------- | ----------- |
| [`starknet`](/toolchain/katana/rpc/starknet) | -           |
| [`katana`](/toolchain/katana/rpc/katana)     | -           |
| [`torii`](/toolchain/katana/rpc/torii)       | -           |
| [`dev`](/toolchain/katana/rpc/dev)           | -           |

Each RPC methods can be invoked by prefixing the method name with the namespace name and an underscore. For example, the `getTransactions` method in the `torii` namespace can be invoked as `torii_getTransactions`.

### `starknet` Namespace

**Source: rpc/starknet.md**

Katana supports version **v0.7.1** of the Starknet JSON-RPC specifications. The full documentations for the RPC methods can be found [here](https://github.com/starkware-libs/starknet-specs/tree/v0.7.1).

#### Read API

-   `starknet_blockNumber`
-   `starknet_blockHashAndNumber`
-   `starknet_getBlockWithTxs`
-   `starknet_getBlockWithTxHashes`
-   `starknet_getBlockTransactionCount`
-   `starknet_getBlockWithReceipts`
-   `starknet_getStateUpdate`
-   `starknet_getTransactionByHash`
-   `starknet_getTransactionStatus`
-   `starknet_getTransactionReceipt`
-   `starknet_getTransactionByBlockIdAndIndex`

-   `starknet_call`
-   `starknet_estimateFee`
-   `starknet_estimateMessageFee`

-   `starknet_chainId`
-   `starknet_syncStatus`

-   `starknet_getNonce`
-   `starknet_getEvents`
-   `starknet_getStorageAt`
-   `starknet_getClassHashAt`
-   `starknet_getClass`
-   `starknet_getClassAt`

#### Write API

-   `starknet_addInvokeTransaction`
-   `starknet_addDeclareTransaction`
-   `starknet_addDeployAccountTransaction`

#### Trace API

-   `starknet_traceTransaction`
-   `starknet_simulateTransactions`
-   `starknet_traceBlockTransactions`

### `katana` Namespace

**Source: rpc/katana.md**

#### `predeployedAccounts`

Get the info for all of the predeployed accounts.

| Method invocation                                          |
| ---------------------------------------------------------- |
| `{ "method": "katana_predeployedAccounts", "params": [] }` |

### `dev` Namespace

**Source: rpc/dev.md**

The `dev` API provides a way to manipulate the blockchain state at runtime. This namespace is only accessible when the `--dev` flag is enabled.

#### `generateBlock`

Mines a new block which includes all currently pending transactions.

| Method invocation                                 |
| ------------------------------------------------- |
| `{ "method": "dev_generateBlock", "params": [] }` |

#### `nextBlockTimestamp`

Get the timestamp for the next block.

| Method invocation                                      |
| ------------------------------------------------------ |
| `{ "method": "dev_nextBlockTimestamp", "params": [] }` |

#### `increaseNextBlockTimestamp`

Increase the time for the block by a given amount of time, in seconds.

| Method invocation                                                      |
| ---------------------------------------------------------------------- |
| `{ "method": "dev_increaseNextBlockTimestamp", "params": [ amount ] }` |

#### `setNextBlockTimestamp`

Similar to `dev_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block.

| Method invocation                                                    |
| -------------------------------------------------------------------- |
| `{ "method": "dev_setNextBlockTimestamp", "params": [ timestamp ] }` |

### `torii` Namespace

**Source: rpc/torii.md**

#### `getTransactions`

Get a list of transaction in a range.

| Method invocation                                             |
| ------------------------------------------------------------- |
| `{ "method": "torii_getTransactions", "params": [ cursor ] }` |

## Supported Transaction Types

**Source: transactions.md**

Katana aims to follow the Starknet specifications as closely as possible, and mimics the features that is currently supported on the mainnet. As such, Katana currently supports the following Starknet transaction types:

| Type           | Version |
| -------------- | ------- |
| INVOKE         | 1, 3    |
| DECLARE        | 1, 2, 3 |
| DEPLOY_ACCOUNT | 1, 3    |

To learn more about the different transaction types, you can refer to the [Starknet documentation](https://docs.starknet.io/documentation/framework_and_concepts/Network_Architecture/transactions).