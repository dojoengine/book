## katana

### NAME

katana - Create a local testnet node for deploying and testing Starknet smart contracts.

### SYNOPSIS

`katana` [*options*]

### DESCRIPTION

Create a local testnet node for deploying and testing Starknet smart contracts. Katana supports deployment and execution of version 0 and 1 of Cairo contracts.

This section covers an extensive list of information about Mining Modes, Supported RPC Methods, Katana flags and their usages. You can run multiple flags at the same time.

#### Mining Modes

Mining modes refer to how frequent blocks are mined using Katana. By default, it automatically generates a new block as soon as a transaction is submitted.

You can change this setting to interval mining if you will, which means that a new block will be generated in a given period of time selected by the user. If you want to go for this type of mining, you can do it by adding the `--block-time <block-time-in-seconds>` flag, like in the following example.

```sh
# Produces a new block every 10 seconds
katana --block-time 10
```

#### Supported Transport Layers

Only HTTP connection is supported at the moment. The server listens on port 5050 by default, but it can be changed by running the following command:

```sh
katana --port <PORT>
```

#### Starknet Feature Compatibility

##### Supported Transaction Type

| Type           | Version |
| -------------- | ------- |
| INVOKE         | 1       |
| DECLARE        | 1, 2    |
| DEPLOY_ACCOUNT |         |

#### Supported RPC Methods

##### Starknet Methods

Katana supports version **v0.3.0** of the Starknet JSON-RPC specifications. The standard methods are based on [this](https://github.com/starkware-libs/starknet-specs/tree/v0.3.0) reference.

-   `starknet_blockNumber`
-   `starknet_blockHashAndNumber`
-   `starknet_getBlockWithTxs`
-   `starknet_getBlockWithTxHashes`
-   `starknet_getBlockTransactionCount`
-   `starknet_getTransactionByHash`
-   `starknet_getTransactionByBlockIdAndIndex`
-   `starknet_getTransactionReceipt`
-   `starknet_pendingTransactions`
-   `starknet_getStateUpdate`

-   `starknet_call`
-   `starknet_estimateFee`

-   `starknet_chainId`

-   `starknet_getNonce`
-   `starknet_getEvents`
-   `starknet_getStorageAt`
-   `starknet_getClassHashAt`
-   `starknet_getClass`
-   `starknet_getClassAt`

-   `starknet_syncing`

-   `starknet_addInvokeTransaction`
-   `starknet_addDeclareTransaction`
-   `starknet_addDeployAccountTransaction`

##### Custom Methods

Katana provides a convenient set of custom RPC methods to quickly and easily configure the node to suit your testing environment.

`katana_generateBlock`  
Mine a new block which includes all currently pending transactions

`katana_nextBlockTimestamp`  
Get the time for the next block

`katana_increaseNextBlockTimestamp`  
Increase the time for the block by a given amount of time, in seconds

`katana_setNextBlockTimestamp`  
Similar to `katana_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block

`katana_predeployedAccounts`  
Get the info for all of the predeployed accounts

### OPTIONS

#### General Options

`--silent`  
&nbsp;&nbsp;&nbsp;&nbsp; Don't print anything on startup

`--no-mining`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead

`-b, --block-time <SECONDS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Block time in seconds for interval mining

`-h, --help`  
&nbsp;&nbsp;&nbsp;&nbsp; Print help (see a summary with '-h')

`-V, --version`  
&nbsp;&nbsp;&nbsp;&nbsp; Print version information

#### Server Options

`-p, --port <PORT>`  
&nbsp;&nbsp;&nbsp;&nbsp; Port number to listen on [default: 5050]

`--host <HOST>`  
&nbsp;&nbsp;&nbsp;&nbsp; The IP address the server will listen on

#### Starknet Options

`--seed <SEED>`  
&nbsp;&nbsp;&nbsp;&nbsp; Specify the seed for randomness of accounts to be predeployed

`--accounts <NUM>`  
&nbsp;&nbsp;&nbsp;&nbsp; Number of pre-funded accounts to generate [default: 10]

`--allow-zero-max-fee`  
&nbsp;&nbsp;&nbsp;&nbsp; Allow transaction max fee to be zero

#### Environment Options

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID [default: KATANA]

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The gas price

### EXAMPLES

1. Set the number of accounts to 15 and allow zero fee transaction

```sh
katana --accounts 15 --disable-fee
```

2. Set the chain id SN_GOERLI and run the server on port 8545

```sh
katana --chain-id SN_GOERLI --port 8545
```
