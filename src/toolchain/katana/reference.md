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

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <MILLISECONDS>` flag, as demonstrated in the following example.

```sh
# Produces a new block every 10 seconds
katana --block-time 10000
```

#### Forking

Katana supports forking from a Starknet RPC provider. You can configure your node to enable the forking feature by providing a valid RPC provider using the `--rpc-url <URL>` flag., which would initiate Katana to fork the latest block of the provided network. If you would like to fork from a specific block, you can do so using `--fork-block-number <BLOCK_NUMBER>`.

NOTE: This does not allow fetching of historical blocks but only blocks that are mined by Katana. However, support for fetching historical blocks will be added in the future.

```sh
# Forks the network at block 1200
katana --rpc-url http://your-rpc-provider.com --fork-block-number 1200
```

#### Messaging

Katana also allows users to perform L1 <-> L2 integration using the messaging feature. There are two types of messaging service supported by Katana:

1. _Ethereum_
2. _Starknet_ (**experimental**)

If configured to _Ethereum_ messaging, Katana will listen/send messages on an Ethereum chain. This type of messaging behaves similar to the canonical Starknet sequencer with the exception that messages from L2 -> L1 will be sent directly to the settlement chain for consumption, instead of having to wait for the corresponding blocks of the messages to be proven on the settlement chain (which in reality would be a very time consuming process).

The _Starknet_ messaging, however, is an experimental feature that allows Katana to listen/send messages on a Starknet chain. It attempts to replicate the behaviour of Ethereum messaging but with a Starknet chain as the settlement layer. This is achieved by having Katana listen to the Starknet chain for new blocks and then sending the messages to the settlement chain for consumption. This is an experimental and opinionated feature, and is not recommended for production use.

```sh
katana --messaging path/to/messaging/config.json
```

The messaging config file is a JSON file that contains the following fields:

```json
{
  /// The type of messaging service to use. Can be either "ethereum" or "starknet".
  "chain": "ethereum",
  /// The RPC-URL of the settlement chain.
  "rpc_url": "http://127.0.0.1:8545",
  /// The messaging-contract address on the settlement chain.
  "contract_address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  /// The address to use for settling messages. It should be a valid address that
  /// can be used to send a transaction on the settlement chain.
  "sender_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  /// The private key associated to `sender_address`.
  "private_key": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  /// The interval, in seconds, at which the messaging service will fetch and settle messages
  /// from/to the settlement chain.
  "interval": 2,
  /// The block on settlement chain from where Katana will start fetching messages.
  "from_block": 0
}
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

- `starknet_blockNumber`
- `starknet_blockHashAndNumber`
- `starknet_getBlockWithTxs`
- `starknet_getBlockWithTxHashes`
- `starknet_getBlockTransactionCount`
- `starknet_getTransactionByHash`
- `starknet_getTransactionByBlockIdAndIndex`
- `starknet_getTransactionReceipt`
- `starknet_pendingTransactions`
- `starknet_getStateUpdate`

- `starknet_call`
- `starknet_estimateFee`

- `starknet_chainId`

- `starknet_getNonce`
- `starknet_getEvents`
- `starknet_getStorageAt`
- `starknet_getClassHashAt`
- `starknet_getClass`
- **`starknet_getClassAt`**

- `starknet_addInvokeTransaction`
- `starknet_addDeclareTransaction`
- `starknet_addDeployAccountTransaction`

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

`-b, --block-time <MILLISECONDS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Block time in milliseconds for interval mining.

`--dump-state <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Dump the state of chain on exit to the given file.  
&nbsp;&nbsp;&nbsp;&nbsp; If the value is a directory, the state will be written to `<PATH>/state.bin`.

`--load-state <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Initialize the chain from a previously saved state snapshot.

`--rpc-url <URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; The Starknet RPC provider to fork the network from.

`--json-log`  
&nbsp;&nbsp;&nbsp;&nbsp; Output logs in JSON format.

`--fork-block-number <BLOCK_NUMBER>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fork the network at a specific block.

`--messaging <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Configure the messaging service to allow Katana to listen/send messages on a settlement chain that can be either Ethereum or another Starknet sequencer (experimental).

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

- bash
- elvish
- fish
- powershell
- zsh

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
