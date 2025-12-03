---
title: Advanced Katana Features
description: Guide to advanced Katana features including execution engines, cross-layer messaging, settlement, and architecture concepts.
---

# Advanced Features

This page explores advanced Katana capabilities for production deployments, complex integration scenarios, and sophisticated development workflows.
These features enable enterprise-grade blockchain infrastructure and cross-chain interoperability.

## Execution Architecture

Katana's execution engine handles transaction processing and state management through a modular architecture built on the Blockifier library.
This system provides high-performance Cairo contract execution with configurable validation and invocation limits.

### Blockifier Integration

Katana uses Starknet's **Blockifier** library as its core execution engine.
The Blockifier provides:

- **Cairo VM execution** for contract logic processing
- **State transition management** with Merkle tree updates
- **Fee calculation and validation** for transaction costs
- **Resource tracking** for gas usage and execution steps

### Execution Configuration

Configure execution parameters for different environments:

```bash
# Production limits
katana --validate-max-steps 1000000 --invoke-max-steps 10000000

# Development with relaxed limits
katana --dev --validate-max-steps 5000000 --invoke-max-steps 50000000
```

### Performance Considerations

**Validation Steps**: Control computational limits for account validation logic.
Higher limits allow more complex validation but increase resource usage.

**Invocation Steps**: Set maximum Cairo steps for contract function execution.
Production environments should use conservative limits to prevent DoS attacks.

**Memory Management**: The execution engine uses LRU caching for compiled contract classes.
Native compilation can significantly improve execution performance for compute-intensive contracts.

:::tip
Monitor execution metrics to optimize step limits for your specific workload.
Use `--metrics` to track Cairo steps processed and execution times.
:::

## Optimistic Katana

Optimistic Katana provides a pre-confirmed execution layer on top of Starknet by combining Katana's forking feature with transaction forwarding and strict whitelisting.

It allows us to:

- Execute and serve transactions locally, almost instantly
- Forward those transactions to Starknet for canonical inclusion
- Ensure state consistency through infrastructure-level control, not by reconciliation (shortcut that typically Sharding execution will solve)

Optimistic Katana does not need to roll back any state.
Thanks to the operator whitelisting strategy, only authorized executors can modify the Starknet state of a specified world, ensuring that no conflicts arise between the local optimistic execution and the canonical on-chain result.

This approach delivers near-instant feedback for users while maintaining trust and state consistency across the network.

### Architecture

#### Fork-Based Execution

Optimistic Katana builds upon Katana's fork mode.

In this setup:

- Katana forks a live Starknet network
- All user transactions are sent to the forked Katana instance
- Katana executes these transactions locally, producing immediate state updates and events
- In parallel, Katana forwards the same transactions to a real Starknet node for canonical inclusion

Since Katana executes transactions faster than the actual network, it can serve "pre-confirmed" results almost instantly — enabling frontends and clients to interact with what feels like a live, responsive chain.

Importantly, Optimistic Katana does not produce blocks itself.
Instead, it maintains a local view of pre-confirmed transactions (executed locally) and exposes them as part of its state until the corresponding Starknet confirmations arrive.

Every block mined on Starknet is still reflected in Optimistic Katana (only block number, the state is fetched lazily).

#### State Integrity and Whitelisting

To prevent state contention and ensure consistency with the canonical Starknet state, Optimistic Katana is combined with strict operator whitelisting.

Only designated operator accounts (typically Cartridge's paymaster executors) are permitted to modify the on-chain state of the world.
This guarantees that:

- Only transactions forwarded from Katana are authorized by infrastructure to land on Starknet for this world
- No external actor can submit conflicting transactions to the same contract state on Starknet
- The optimistic state served by Katana will always converge with the canonical one without rollback or reconciliation logic

At the infrastructure level, it ensures that only transactions originating from the authorized Optimistic Katana instance are propagated downstream to Starknet nodes.
This prevents race conditions and ensures deterministic state updates across both layers.

#### World Layer: Operator Component

At the smart contract level, the World contract implements the on-chain enforcement of the operator whitelist through the Operator component.

This component defines a simple but flexible interface for managing authorized executors, controlling who can mutate world entities on-chain.

```cairo
#[derive(Default, Serde, Drop, starknet::Store)]
pub enum OperatorMode {
    #[default]
    Disabled,
    NeverExpire,
    ExpireAt: u64,
}

#[starknet::interface]
pub trait IOperator<T> {
    /// Changes the mode of the operator component.
    fn change_mode(ref self: T, mode: OperatorMode);

    /// Grants an operator to the contract.
    fn grant_operator(ref self: T, operator: ContractAddress);

    /// Revokes an operator from the contract.
    fn revoke_operator(ref self: T, operator: ContractAddress);
}
```

The `OperatorMode` allows dynamic control over when and how operators can act (e.g., permanent or time-limited authorization).
Only the creator of the world can change the mode.

More importantly, the `set_entity` function within the world contract is gated by this operator check.

This means that no contract state or world entity can be mutated unless the sender is a whitelisted operator.

In practice:

- Katana instances executing optimistically are assigned authorized operator addresses
- The infrastructure ensures that only these operators can push mutations to Starknet
- Any unauthorized attempt to modify entities is rejected at the contract level

This mechanism establishes a trust boundary: Katana can optimistically execute and stage updates, but only the approved executors have authority to finalize them on-chain.

It is the contract-level foundation that enables Optimistic Katana to function safely without reconciliation or rollback logic.

#### Torii Integration (Indexer)

On the Torii side, a caching layer has been added to handle optimistic execution correctly.
Specifically:

- Torii now maintains a cache of processed transactions (instead of only a cursor to latest processed transaction), ensuring that pre-confirmed events are not re-processed multiple times
- It is resistant to missed transactions — cases where a transaction was forwarded to Starknet before Torii fetched the corresponding pre-confirmed state (for example, if a block is very long to process)
- When such cases occur, Torii will backfill the missing events once the canonical Starknet state includes them, ensuring complete and consistent indexing

This design ensures that Torii's view of the world remains consistent across both the optimistic and canonical layers without duplication or event loss.

:::note
A possible latency can be observed if blocks are too long for Torii to process, which will cause Torii to fallback in range mode.
Since Katana is in forking mode, syncing historical events may take additional time since they are lazily fetched from the Starknet network.
:::

## Cross-Layer Messaging

Cross-layer messaging enables communication between Katana and external blockchain networks, supporting L1 ↔ L2 message passing for complex multi-chain applications.
This system allows contracts on Katana to interact with Ethereum mainnet or other Starknet networks.

### Supported Settlement Chains

**Ethereum Integration**: Production-ready messaging with Ethereum mainnet or testnets.
Messages are sent directly to L1 contracts without requiring block proof verification, enabling faster development cycles.

**Starknet Integration**: Experimental feature for Starknet-to-Starknet messaging.
This creates a hierarchical Starknet architecture where Katana acts as an L3 settling to another Starknet L2.

:::warning
Starknet messaging is experimental and not recommended for production use.
Use Ethereum messaging for production deployments.
:::

### Configuration Setup

Enable messaging by providing a configuration file:

```bash
katana --messaging messaging_config.json
```

**Configuration Structure**:

```json
{
    "chain": "ethereum",
    "rpc_url": "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY",
    "contract_address": "0x5FbDB...",
    "sender_address": "0xf39Fd...",
    "private_key": "0xac097...",
    "interval": 5,
    "from_block": 18500000
}
```

**Configuration Parameters**:

- **`chain`**: Settlement chain type (`"ethereum"` or `"starknet"`)
- **`rpc_url`**: RPC endpoint for the settlement chain
- **`contract_address`**: Messaging contract address on settlement chain
- **`sender_address`**: Account address for sending settlement transactions
- **`private_key`**: Private key for the sender account (keep secure!)
- **`interval`**: Message polling interval in seconds
- **`from_block`**: Starting block for message synchronization

### Message Flow Architecture

**L2 → L1 Messages**:

1. Contract calls `send_message_to_l1()` on Katana
2. Message is queued in Katana's message pool
3. Messaging service polls for new messages
4. Messages are relayed to L1 messaging contract
5. L1 contract can consume messages immediately

**L1 → L2 Messages**:

1. L1 contract calls messaging bridge
2. Katana polls L1 for new messages
3. Messages are delivered to target L2 contracts
4. L2 contracts process messages via `l1_handler` functions

### Example Implementation

See the [starknet-messaging-dev](https://github.com/glihm/starknet-messaging-dev) repository for a complete example demonstrating:

- L1 ↔ L2 message passing implementation
- Local development setup with Anvil and Katana
- Contract examples for both layers
- Testing workflows for cross-chain interactions

## Chain Initialization and Settlement

Katana provides `katana init` for initializing new blockchain networks with configurable settlement layers.
This enables deployment of rollup chains that settle to Starknet networks or sovereign chains with data availability layers.

### Settlement Models

**Rollup Settlement**: Deploy a rollup chain that settles to Starknet mainnet or testnet.
State commitments and proofs are verified on the settlement layer using fact registry contracts.

**Sovereign Chain**: Initialize an independent blockchain that publishes state updates to a data availability layer without settlement verification.

### Chain Initialization

Initialize a new rollup settling to Starknet mainnet:

```bash
katana init \
  --id "my_rollup" \
  --settlement-chain mainnet \
  --settlement-account-address 0x123... \
  --settlement-account-private-key 0xabc... \
  --output-path ./chain-config
```

Initialize a sovereign chain:

```bash
katana init \
  --sovereign \
  --id "my_sovereign_chain" \
  --output-path ./chain-config
```

### Configuration Parameters

**Chain Identity**:

- `--id`: Unique chain identifier (required, must be valid ASCII)
- `--output-path`: Directory for generated configuration files

**Settlement Configuration**:

- `--settlement-chain`: Target settlement network (`mainnet`, `sepolia`, or custom)
- `--settlement-account-address`: Account address for settlement operations
- `--settlement-account-private-key`: Private key for settlement account
- `--settlement-facts-registry`: Custom fact registry contract address

**Contract Deployment**:

- `--settlement-contract`: Pre-deployed settlement contract address (optional)
- `--settlement-contract-deployed-block`: Block number of contract deployment
- If no contract address provided, init will deploy a new settlement contract

### Settlement Chain Options

**Starknet Mainnet**: Production settlement with maximum security.
Uses Herodotus Atlantic Fact Registry for proof verification.

**Starknet Sepolia**: Testnet settlement for development and testing.
Lower cost alternative with same security model.

**Custom Settlement**: Specify custom RPC endpoint and fact registry.
Requires `--settlement-facts-registry` parameter.

### Generated Configuration

The init process creates configuration files in the specified output directory:

```
chain-config/
├── genesis.json          # Genesis state and allocations
├── config.toml           # Chain configuration parameters
└── messaging.json        # Cross-layer messaging setup
```

### Example Workflow

1. **Prepare Settlement Account**: Create and fund an account on the settlement chain
2. **Initialize Chain**: Run `katana init` with appropriate parameters
3. **Review Configuration**: Examine generated config files and adjust as needed
4. **Launch Network**: Start Katana using the generated configuration
5. **Monitor Settlement**: Track settlement transactions and proof submissions

:::tip
Use Sepolia testnet for initial development and testing before moving to mainnet settlement.
This allows you to validate your rollup configuration without mainnet costs.
:::

## Starknet Toolchain Integration

Katana provides full compatibility with the standard Starknet development ecosystem, enabling seamless integration with existing workflows and tooling.
This allows developers to use familiar tools like Starkli for contract deployment and interaction on local Katana networks.

### Starkli Integration

Starkli includes built-in support for Katana networks with pre-configured account integration.

**Installing Starkli**:

```bash
curl https://get.starkli.sh | sh && starkliup
```

**Environment Setup**:

```bash
# Start Katana with development accounts
katana --dev --dev.no-fee

# Configure Starkli environment
export STARKNET_ACCOUNT=katana-0 # Pre-funded account
export STARKNET_RPC=http://127.0.0.1:5050
```

**Contract Interaction**:

```bash
# Deploy a Scarb build artifact
starkli declare contract.sierra.json

# Deploy contract instance
starkli deploy <CLASS_HASH> <CONSTRUCTOR_ARGS>

# Call contract functions
starkli call <CONTRACT_ADDRESS> <FUNCTION_NAME> <ARGS>
starkli invoke <CONTRACT_ADDRESS> <FUNCTION_NAME> <ARGS>
```

:::note
[Sozo](/toolchain/sozo) is the preferred build and deployment for Dojo development.
Starkli integration is useful for standard Cairo contracts and production validation workflows.
:::
