## Katana CLI References

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
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead.

`-b, --block-time <MILLISECONDS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Block time in milliseconds for interval mining.

`--db-dir <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Directory path of the database to initialize from. The path must either be an empty directory or a directory which already contains a previously initialized Katana database.

`--json-log`  
&nbsp;&nbsp;&nbsp;&nbsp; Output logs in JSON format.

`--rpc-url <URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; The Starknet RPC provider to fork the network from.

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

`--max-connections <MAX_CONNECTIONS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Maximum number of concurrent connections allowed. [default: 100]

#### Starknet Options

`--seed <SEED>`  
&nbsp;&nbsp;&nbsp;&nbsp; Specify the seed for randomness of accounts to be predeployed.

`--accounts <NUM>`  
&nbsp;&nbsp;&nbsp;&nbsp; Number of pre-funded accounts to generate. [default: 10]

`--disable-fee`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable charging fee for transactions.

`--disable-validate`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable validation when executing transactions. Allowing transaction to be executed even with invalid signature.

#### Environment Options

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID. [default: KATANA]

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The gas price.

`--validate-max-steps <VALIDATE_MAX_STEPS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account validation logic.

`--invoke-max-steps <INVOKE_MAX_STEPS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account execution logic.

`--genesis <GENESIS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The genesis configuration file.

### SUBCOMMANDS

#### `completions`

Generates a shell completions script for the given supported shells:

- bash
- elvish
- fish
- powershell
- zsh

##### EXAMPLES

Generate shell completions script for `bash` and appends it to a `.bashrc` file:

```bash
katana completions bash >> ~/.bashrc
```

### USAGE EXAMPLES

1. Create 15 dev accounts and disable transaction fee mechanism

```sh
katana --accounts 15 --disable-fee
```

2. Set the chain id to `SN_GOERLI` and run the server on port 8545

```sh
katana --chain-id SN_GOERLI --port 8545
```
