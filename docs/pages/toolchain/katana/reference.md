## katana reference

### NAME

katana - Create a local Starknet sequencer for deploying and developing Starknet smart contracts.

### USAGE

```sh
katana [OPTIONS] [COMMAND]
```

### DESCRIPTION

Create a local Starknet sequencer for deploying and developing Starknet smart contracts. Katana supports deployment and execution of the **new** as well as the **legacy** (Cairo 0) Cairo contracts.

This section covers an extensive list of information about mining modes, supported RPC methods, the available storage modes, Katana flags, and their usages.

#### Mining Modes

In Katana, mining modes determine how frequent blocks are mined. By default, a new block is automatically mined as soon as a transaction is submitted.

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <MILLISECONDS>` flag, as demonstrated in the following example.

```sh
# Produces a new block every 10 seconds
katana --block-time 10000
```

### Supported Transport Layers

Only HTTP connection is supported at the moment. The server listens on port 5050 by default, but it can be changed by running the following command:

```sh
katana --port <PORT>
```

### Starknet Feature Compatibility

#### Supported Transaction Type

As the currently supported version of the Starknet JSON-RPC specifications is **v0.6.0**, Katana supports the following transaction types. The full list of all supported transaction types is listed below:

| Type           | Version  |
| -------------- | -------- |
| INVOKE         | 1, 3     |
| DECLARE        | 1, 2, 3  |
| DEPLOY_ACCOUNT | 1, 3     |

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
