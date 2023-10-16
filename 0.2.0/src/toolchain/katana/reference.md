## katana reference

### NAME

katana - Create a local testnet node for deploying and testing Starknet smart contracts.

### USAGE

```sh
katana [OPTIONS]
```

### DESCRIPTION

Create a local testnet node for deploying and testing Starknet smart contracts. Katana supports deployment and execution of the **new** as well as the **legacy** (Cairo 0) Cairo contracts.

This section covers an extensive list of information about Mining Modes, Supported RPC Methods, Katana flags and their usages. You can run multiple flags at the same time.

#### Mining Modes

In Katana, mining modes determine how frequent blocks are mined. By default, a new block is automatically mined as soon as a transaction is submitted.

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <SECONDS>` flag, as demonstrated in the following example.

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
Mine a new block which includes all currently pending transactions.

`katana_nextBlockTimestamp`  
Get the time for the next block.

`katana_increaseNextBlockTimestamp`  
Increase the time for the block by a given amount of time, in seconds.

`katana_setNextBlockTimestamp`  
Similar to `katana_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block.

`katana_predeployedAccounts`  
Get the info for all of the predeployed accounts.

`katana_setStorageAt`  
Set an exact value of a contract's storage slot.

### OPTIONS

#### General Options

`--silent`  
&nbsp;&nbsp;&nbsp;&nbsp; Don't print anything on startup.

`--no-mining`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead.

`-b, --block-time <SECONDS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Block time in seconds for interval mining.

`--dump-state <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Dump the state of chain on exit to the given file.  
&nbsp;&nbsp;&nbsp;&nbsp; If the value is a directory, the state will be written to `<PATH>/state.bin`.

`--load-state <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Initialize the chain from a previously saved state snapshot.

`-h, --help`  
&nbsp;&nbsp;&nbsp;&nbsp; Print help (see a summary with '-h').

`-V, --version`  
&nbsp;&nbsp;&nbsp;&nbsp; Print version information.

#### Server Options

`-p, --port <PORT>`  
&nbsp;&nbsp;&nbsp;&nbsp; Port number to listen on. [default: 5050]

`--host <HOST>`  
&nbsp;&nbsp;&nbsp;&nbsp; The IP address the server will listen on.

#### Starknet Options

`--seed <SEED>`  
&nbsp;&nbsp;&nbsp;&nbsp; Specify the seed for randomness of accounts to be predeployed.

`--accounts <NUM>`  
&nbsp;&nbsp;&nbsp;&nbsp; Number of pre-funded accounts to generate. [default: 10]

`--disable-fee`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable charging fee for transactions.

#### Environment Options

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID. [default: KATANA]

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The gas price.

`--validate-max-steps <VALIDATE_MAX_STEPS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account validation logic.

`--invoke-max-steps <INVOKE_MAX_STEPS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account execution logic.

### Shell Completions

`katana` completions shell

Generates a shell completions script for the given shell.

Supported shells are:

-   bash
-   elvish
-   fish
-   powershell
-   zsh

#### EXAMPLES

Generate shell completions script for `bash` and appends it to a `.bashrc` file:

```bash
katana completions bash >> ~/.bashrc
```

### EXAMPLES

1. Create 15 dev accounts and disable transaction fee mechanism

```sh
katana --accounts 15 --disable-fee
```

2. Set the chain id to `SN_GOERLI` and run the server on port 8545

```sh
katana --chain-id SN_GOERLI --port 8545
```

3. Load previously stored state and dump the state of this session to a file on shutdown

```sh
katana --load-state ./dump-state.bin --dump-state ./dump-state.bin
```
