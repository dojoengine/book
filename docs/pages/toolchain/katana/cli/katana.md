## NAME

`katana` - Create a local Starknet sequencer for deploying and developing Starknet smart contracts.

## USAGE

```sh
katana [OPTIONS] [COMMAND]
```

## OPTIONS

### General Options

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

### Server Options

`--http.addr <ADDRESS>`
&nbsp;&nbsp;&nbsp;&nbsp; HTTP-RPC server listening interface. [default: 127.0.0.1]

`--http.port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; HTTP-RPC server listening port. [default: 5050]

`--http.corsdomain <HTTP_CORS_ORIGINS>`
&nbsp;&nbsp;&nbsp;&nbsp; Comma separated list of domains from which to accept cross origin requests.

`--rpc.max-connections <COUNT>`
&nbsp;&nbsp;&nbsp;&nbsp; Maximum number of concurrent connections allowed. [default: 100]

### Logging Options

`--log.format <FORMAT>`
&nbsp;&nbsp;&nbsp;&nbsp; Log format to use. [default: full] [possible values: json, full]

### Metrics Options

`--metrics`
&nbsp;&nbsp;&nbsp;&nbsp; Enable metrics.

`--metrics.addr <ADDRESS>`
&nbsp;&nbsp;&nbsp;&nbsp; The metrics will be served at the given address. [default: 127.0.0.1]

`--metrics.port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; The metrics will be served at the given port. [default: 9100]

### Environment Options

`--chain-id <CHAIN_ID>`
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID.

`--validate-max-steps <VALIDATE_MAX_STEPS>`
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account validation logic. [default: 1000000]

`--invoke-max-steps <INVOKE_MAX_STEPS>`
&nbsp;&nbsp;&nbsp;&nbsp; The maximum number of steps available for the account execution logic. [default: 10000000]

`--genesis <GENESIS>`
&nbsp;&nbsp;&nbsp;&nbsp; The genesis configuration file.

### Gas Price Oracle Options

`--gpo.l1-eth-gas-price <WEI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 ETH gas price (denominated in wei). [default: 0]

`--gpo.l1-strk-gas-price <FRI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 STRK gas price (denominated in fri). [default: 0]

`--gpo.l1-eth-data-gas-price <WEI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 ETH data gas price (denominated in wei). [default: 0]

`--gpo.l1-strk-data-gas-price <FRI>`
&nbsp;&nbsp;&nbsp;&nbsp; The L1 STRK data gas price (denominated in fri). [default: 0]

### Forking Options

`--fork.provider <URL>`
&nbsp;&nbsp;&nbsp;&nbsp; The RPC URL of the network to fork from.

`--fork.block <BLOCK>`
&nbsp;&nbsp;&nbsp;&nbsp; Fork the network at a specific block id, can either be a hash (0x-prefixed) or a block number.

### Development Options

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

### Slot Options

`--config <CONFIG>`
&nbsp;&nbsp;&nbsp;&nbsp; Configuration file.
