# katana

### NAME

`katana` - Create a local Starknet sequencer for deploying and developing Starknet smart contracts.

### USAGE

```sh
katana [OPTIONS] [COMMAND]
```

### OPTIONS

#### General Options

`--silent`      Don't print anything on startup.

`--no-mining`      Disable auto and interval mining, and mine on demand instead.

`-b, --block-time <MILLISECONDS>`      Block time in milliseconds for interval mining.

`--db-dir <PATH>`      Directory path of the database to initialize from. The path must either be an empty directory or a directory which already contains a previously initialized Katana database.

`--json-log`      Output logs in JSON format.

`--rpc-url <URL>`      The Starknet RPC provider to fork the network from.

`--fork-block-number <BLOCK_NUMBER>`      Fork the network at a specific block.

`--messaging <PATH>`      Configure the messaging service to allow Katana to listen/send messages on a settlement chain that can be either Ethereum or another Starknet sequencer (experimental).

`-h, --help`      Print help (see a summary with '-h').

`-V, --version`      Print version information.

#### Server Options

`-p, --port <PORT>`      Port number to listen on. \[default: 5050]

`--host <HOST>`      The IP address the server will listen on.

`--max-connections <MAX_CONNECTIONS>`      Maximum number of concurrent connections allowed. \[default: 100]

#### Starknet Options

`--seed <SEED>`      Specify the seed for randomness of accounts to be predeployed.

`--accounts <NUM>`      Number of pre-funded accounts to generate. \[default: 10]

`--disable-fee`      Disable charging fee for transactions.

`--disable-validate`      Disable validation when executing transactions. Allowing transaction to be executed even with invalid signature.

**Environment Options**

`--chain-id <CHAIN_ID>`      The chain ID. \[default: KATANA]

`--gas-price <GAS_PRICE>`      The gas price.

`--validate-max-steps <VALIDATE_MAX_STEPS>`      The maximum number of steps available for the account validation logic.

`--invoke-max-steps <INVOKE_MAX_STEPS>`      The maximum number of steps available for the account execution logic.

`--genesis <GENESIS>`      The genesis configuration file.
