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
