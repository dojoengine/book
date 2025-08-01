---
title: Advanced Katana Features
description: Guide to advanced Katana features including execution engines, cross-layer messaging, settlement, and architecture concepts.
---

# Advanced Features

This page covers advanced Katana features and concepts for production deployments and complex development scenarios.

## Execution Engines

**Source: execution.md**

Execution engine is the transaction-executing component in the Katana sequencer. It is responsible for processing transactions and updating the state of the Starknet contracts. Currently, Katana only supports the `blockifier` execution engine.

## Cross-Layer Messaging

**Source: messaging.md**

Katana also allows users to perform L1 <-> L2 integration using the messaging feature. There are two types of messaging service supported by Katana:

1. _Ethereum_
2. _Starknet_ (**experimental**)

If configured to _Ethereum_ messaging, Katana will listen/send messages on an Ethereum chain. This type of messaging behaves similar to the canonical Starknet sequencer with the exception that messages from L2 -> L1 will be sent directly to the settlement chain for consumption, instead of having to wait for the corresponding blocks of the messages to be proven on the settlement chain (which in reality would be a very time consuming process).

The _Starknet_ messaging, however, is an experimental feature that allows Katana to listen/send messages on a Starknet chain. It attempts to replicate the behaviour of Ethereum messaging but with a Starknet chain as the settlement layer. This is achieved by having Katana listen to the Starknet chain for new blocks and then sending the messages to the settlement chain for consumption. This is an experimental and opinionated feature, and is not recommended for production use.

### Messaging Configuration

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

For a comprehensive example demonstrating how to implement and test message passing between Starknet and Ethereum in a local development environment, please refer to the code and setup instructions provided in the [starknet-messaging-dev](https://github.com/glihm/starknet-messaging-dev) repository.

## Settlement

**Source: settlement.md**

_Coming soon_

## Working with Standard Starknet Tools

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
katana --dev --dev.no-fee
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