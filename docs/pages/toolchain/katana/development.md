---
title: Katana Development Features
description: Guide to Katana's development features including mining modes, storage options, network forking, and RPC interfaces for local blockchain development.
---

# Development Features

This page covers Katana's key development features that make it ideal for local blockchain development and testing.

## Mining Modes

**Source: mining.md**

In Katana, mining modes determine how frequent blocks are produced. By default, a new block is automatically created as soon as a transaction is received.

### Interval Mining

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <MILLISECONDS>` flag, as demonstrated in the following example.

```sh
# Produces a new block for every 10 seconds
katana --block-time 10000
```

### On-demand Mining

On-demand mining is another mode of mining that allows users to manually create a new block. This mode is useful for testing purposes or when you want to create a block at a specific time. New blocks can only be created by calling the [`generateBlock`](/toolchain/katana/reference#dev-namespace) RPC method of the `dev` namespace.

In on-demand mining mode, transactions will be executed after receiving them but blocks will not be mined until you have called the `generateBlock` RPC method. Upon calling it, a new block will be created and all the pending transactions will be included in it.

To enable on-demand mining, use the `--no-mining` flag.

```sh
katana --no-mining
```

## Storage Modes

**Source: storage.md**

Katana offers different storage modes to cater to various use cases and requirements. There are two primary storage modes: **in-memory** storage and **persistent** storage.

By default, Katana operates in an **ephemeral mode**, where all data is stored in memory and is not persisted when the process is terminated. Running Katana using in-memory storage offers the fastest performance, as it eliminates the overhead of performing disk I/O operations. Ephemeral mode is suitable for quick testing and experimentation of your Dojo game.

However, Katana also supports persistent storage, allowing the state of the chain to be saved and restored across process restarts. This is particularly useful for scenarios where maintaining the state of the chain is crucial, such as in production environments or performing long-running playtests.

### Persistent Storage

To enable persistent storage, you can use the `--db-dir <PATH>` command-line flag when running Katana. This flag specifies the directory where the database files will be stored. If the specified path points to an empty directory, Katana will create a new database. On the other hand, if the path points to a directory with a previously initialized Katana database, Katana will use the existing database, allowing you to resume from the previous state.

::::note
💡 **NOTE**  
When Katana is running in "forked" mode, the storage mode currently defaults to in-memory. Persistent storage support for forked mode is not yet available.
::::

#### Usage Examples

```sh
# Initialize a new database in the specified directory
katana --db-dir ./katana-db
```

```sh
# Resume from a previously saved state
katana --db-dir ./existing-katana-db
```

## State Forking

**Source: forking.md**

Katana offers a powerful feature called "_forking_," which allows you to interact with the state of another Starknet network as if it were a local network. This feature enables developers to test and interact with smart contracts deployed on live networks without the need to deploy their own contracts or set up test accounts on those networks.

To enable the forking feature, you can configure your Katana node by providing a valid RPC provider using the `--rpc-url <URL>` flag. By default, Katana will fork the latest block of the specified network. However, if you wish to fork from a specific block, you can use the `--fork-block-number <BLOCK_NUMBER>` flag to specify the desired block number.

Once the forking feature is enabled, you can interact with the forked network through Katana as if it were a separate, isolated environment. You can deploy your own smart contracts to the local Katana node and have them interact with the contracts that exist on the forked network. You can then use the accounts predeployed by Katana to simulate interactions with the external network, making it convenient for testing and development purposes.

The forking feature is particularly useful for smart contract developers who want to perform end-to-end tests against contracts already deployed on mainnet or testnet. It eliminates the need to deploy your own contracts on those networks and avoids the hassle of setting up test accounts and funding them, especially when working with the mainnet. By forking the state of the desired network, you can create a local testing environment that closely mimics the live network, allowing you to test your contracts and interactions with confidence.

With Katana's forking feature, developers can streamline their testing and development process, saving time and resources while ensuring the integrity and compatibility of their smart contracts with existing networks.

:::note
💡 **NOTE**  
Currently, the forking feature is limited to only the blockchain states (ie, storage, class definitions, nonces, etc). Support for fetching non-state data (eg., block, transaction, receipt, events) of the forked network through the RPC will be added in the future.
:::

### Forking Examples

The following command forks the Starknet mainnet at exactly the 1200th block. All the states of the mainnet up until block 1200 will be accessible on your local Katana node. It will then start producing new blocks starting from block 1201.

```sh
# Forks the network at block 1200
katana --rpc-url https://starknet-mainnet.infura.io/v3/<YOUR_API_KEY> --fork-block-number 1200
```

## JSON-RPC Interface

**Source: rpc/index.md**

### Supported Transport Layers

JSON-RPC is provided on multiple transports. Katana supports HTTP, and WebSocket. Both transports are enabled by default.

### Supported RPC Methods

#### Namespaces

The RPC methods are categorized into the following namespaces:

| Namespace                                    | Description |
| -------------------------------------------- | ----------- |
| [`starknet`](/toolchain/katana/reference#starknet-namespace) | Standard Starknet RPC methods |
| [`katana`](/toolchain/katana/reference#katana-namespace)     | Katana-specific endpoints     |
| [`torii`](/toolchain/katana/reference#torii-namespace)       | Torii integration methods    |
| [`dev`](/toolchain/katana/reference#dev-namespace)           | Development utilities         |

Each RPC methods can be invoked by prefixing the method name with the namespace name and an underscore. For example, the `getTransactions` method in the `torii` namespace can be invoked as `torii_getTransactions`.

## Supported Transaction Types

**Source: transactions.md**

Katana aims to follow the Starknet specifications as closely as possible, and mimics the features that is currently supported on the mainnet. As such, Katana currently supports the following Starknet transaction types:

| Type           | Version |
| -------------- | ------- |
| INVOKE         | 1, 3    |
| DECLARE        | 1, 2, 3 |
| DEPLOY_ACCOUNT | 1, 3    |

To learn more about the different transaction types, you can refer to the [Starknet documentation](https://docs.starknet.io/documentation/framework_and_concepts/Network_Architecture/transactions).

## Working with Standard Starknet Tools

**Source: interact.md**

Katana is a full Starknet sequencer, compatible with all standard Starknet development tools. This section demonstrates deploying and interacting with Cairo contracts using starkli, showing Katana's compatibility beyond the Dojo ecosystem.

:::note
For Dojo projects, use [Sozo](/toolchain/sozo) for deployment and interaction. This tutorial is for deploying standard Cairo contracts or testing non-Dojo contracts on Katana.
:::

### Prerequisites

Before starting, ensure you have the required tools installed:

- **Katana**: Available via [`dojoup`](/installation.mdx)
- **Starkli**: Install with `curl https://get.starkli.sh | sh && starkliup`
- **Scarb**: Install with `curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh`

### Contract Deployment Workflow

#### 1. Start Katana

Launch Katana with fees disabled for development:

```bash
katana --disable-fee
```

After starting, Katana automatically generates and deploys pre-funded accounts that can be used with starkli.

#### 2. Configure Starkli Environment

Starkli supports built-in accounts for Katana. Set up environment variables for easier command execution:

```bash
export STARKNET_ACCOUNT=katana-0        # Pre-funded account
export STARKNET_RPC=http://0.0.0.0:5050 # Local Katana endpoint
```

#### 3. Create and Compile Contract

Create a simple storage contract for testing:

```bash
scarb new simple_storage
cd simple_storage
```

Add Starknet dependencies to `Scarb.toml`:

```toml
[dependencies]
starknet = "2.5.4"

[[target.starknet-contract]]
```

Replace `src/lib.cairo` with a simple storage contract:

```rust
#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, x: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        stored_data: u128
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, x: u128) {
            self.stored_data.write(x);
        }
        fn get(self: @ContractState) -> u128 {
            self.stored_data.read()
        }
    }
}
```

Compile the contract:

```bash
scarb build
```

#### 4. Declare Contract

Declare the contract on Katana to register the class:

```bash
starkli declare target/dev/simple_storage_SimpleStorage.contract_class.json
```

This returns a class hash that uniquely identifies your contract class:

```console
Class hash declared:
0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306
```

#### 5. Deploy Contract Instance

Deploy an instance of the contract using the class hash:

```bash
starkli deploy 0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306
```

This returns the deployed contract address:

```console
Contract deployed:
0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e
```

#### 6. Interact with Contract

Call the contract to read state (no transaction required):

```bash
starkli call 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e get
```

Returns the current stored value (initially zero):

```console
[
    "0x0000000000000000000000000000000000000000000000000000000000000000"
]
```

Invoke the contract to modify state (creates a transaction):

```bash
starkli invoke 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e set 42
```

Verify the state change:

```bash
starkli call 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e get
```

Returns the updated value:

```console
[
    "0x000000000000000000000000000000000000000000000000000000000000002a"
]
```

### Key Benefits

- **Full Starknet Compatibility**: Use any standard Starknet tool with Katana
- **Rapid Testing**: Deploy and test contracts instantly with pre-funded accounts
- **Mainnet Preparation**: Validate contract behavior before costly mainnet deployment
- **Non-Dojo Contracts**: Test contracts that don't use the Dojo framework

### When to Use This Approach

- Testing standard Cairo contracts outside the Dojo ecosystem
- Validating contract interactions before mainnet deployment  
- Learning Starknet development fundamentals
- Integrating with existing Starknet tooling and workflows

For Dojo game development, use [Sozo's deployment commands](/toolchain/sozo) instead, which provide specialized functionality for ECS worlds and game contracts.