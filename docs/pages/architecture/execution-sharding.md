---
title: Execution Sharding on Starknet
description: A comprehensive guide to execution sharding on Starknet, including shard initialization, execution flow, completion detection, and concurrency management with CRDTs.
---

# Execution Sharding on Starknet

:::info
The execution sharding architecture described in this document represents **planned functionality** currently under development.
While the core concepts and design are established, the implementation is not yet available in production.
:::

## Overview

Execution sharding is a scaling approach that enables isolated transaction execution within independent shard environments, known as "Layer 3"s.
In this architecture, a shard represents an independent sequencer that branches from Starknet mainnet to handle a specific subset of transactions, then merges the final state back to mainnet.

This design enables parallel processing across multiple shards while keeping all activity anchored to Starknet mainnet.
The result is maximized throughput without fragmenting the network's unified state and value.

:::info
Execution sharding differs from sovereign chains, in that sovereign chains are long-lived and **do not** commit state back to Starknet.
:::

### Key Benefits

- **Parallel Execution**: Multiple shards can process transactions simultaneously
- **Cost Efficiency**: Only final state changes are settled on mainnet
- **Low Latency**: Shard environments provide gasless, high-throughput execution
- **Unified State**: All shards ultimately merge back to a single Starknet state

## Planned Architecture

The proposed execution sharding system involves five key components:

1. **Starknet Mainnet**: The settlement layer where Dojo worlds are deployed
2. **World Contract**: Receives and incorporates state changes from completed shards
3. **Katana**: Acts as the sequencer running individual shards
4. **Saya**: Generates proofs of shard execution and submits them to the World Contract
5. **DojoOS**: A specialized Cairo program generating execution traces for validation

![Sharding execution overview](https://hackmd.io/_uploads/HyF9QoVX1g.png)


## Proposed Shard Initialization

The planned shard initialization process would work as follows:

A shard begins execution when a specific transaction containing shard details is submitted to Starknet.
This initialization transaction targets the World Contract and specifies parameters such as:
- Unique shard identifier
- Designated operator address
- Initial state conditions
- Settlement configuration defining which data to merge back to mainnet

After processing this transaction, the specified operator would spin up a Katana instance and branch from Starknet mainnet to create a dedicated shard environment.

### Planned Data Structure

The shard initialization would use a data structure similar to:

```rust
struct ShardStartData {
    // Unique identifier for the shard
    shard_id: felt252,
    // Address of the shard operator running the sequencer
    operator: felt252,
    // Initial state configuration
    initial_state: ShardInitialState {
        // Contracts authorized for execution within the shard
        contracts: Span<felt252>,
        // Event indicating shard completion
        end_event: EventSelector {
            // Contract address that will emit the completion event
            from: felt252,
            // Event selector to monitor
            selector: felt252,
        },
    },
    // Settlement configuration
    settlement_config: SettlementConfig {
        // Storage addresses to update on the World Contract
        storage_addresses: Span<felt252>,
    },
}
```

### Execution Environment

The shard would branch from mainnet at the block containing the initialization transaction.
From this point, the shard operates independently as a gasless environment, processing transactions without the usual Starknet gas costs.

Since all contract logic is already defined on mainnet, the shard can execute this logic without requiring additional contract declarations.
This design provides better control over the shard execution environment while maintaining compatibility with existing mainnet contracts.

## Planned Execution Flow

Once a shard is initialized, the sequencer would begin processing transactions within the isolated environment.
Several design patterns are under consideration for controlling execution flow:

### Access Control Options

1. **Contract Whitelisting**: Restrict execution to a predefined set of contracts
2. **Account Whitelisting**: Allow only specific accounts to submit transactions
3. **Declaration Restrictions**: Prevent new contract declarations within the shard
4. **Permissionless Execution**: Rely on existing mainnet permissions and contract logic

### Security Considerations

Access restrictions may be necessary to prevent DoS attacks against shard infrastructure.
The specific approach would depend on the use case and security requirements of each shard deployment.

![Shard execution flow](https://hackmd.io/_uploads/Sk6WByV7yg.png)


## Planned Completion Detection and Settlement

The proposed system would detect shard completion through event monitoring and execute a multi-stage settlement process.

### Completion Detection

A specific event emitted by a designated Cairo contract would signal the end of a shard's execution lifecycle.
This completion event serves as a trigger, indicating that all intended transactions have been processed and the shard is ready for settlement.

### Proposed Settlement Pipeline

Once the completion event is detected, Saya would initiate the settlement process:

1. **Execution Trace Generation**: DojoOS would generate an execution trace to attest the correctness of the shard's execution.
   DojoOS would be similar to SNOS (Starknet OS) but optimized for shard validation:
   - **Transaction-based**: Validates sequences of transactions rather than entire blocks
   - **Selective Output**: Outputs only modified storage addresses (as defined in settlement config) rather than complete state updates
   - **Custom Validation**: Supports shard-specific whitelisting and validation rules

2. **Proof Generation**: Saya submits the execution trace to a proving service (such as Herodotus'   Atlantic) to generate a cryptographic proof

3. **Layout Bridge**: Due to current proving constraints, the proof would undergo layout bridging to convert it to `recursive_with_poseidon` layout for Starknet verification

4. **Settlement**: The final proof and storage updates are submitted to the World Contract on Starknet, incorporating the shard's state changes into the main network

:::note
The DojoOS component and shard settlement pipeline are currently in development.
The existing Saya proving service supports SNOS-based proving for standard Starknet blocks.
:::


## Proposed Concurrency Management with CRDTs

One of the key challenges in concurrent shard execution is maintaining consistent state across Starknet.
Without proper safeguards, parallel shards modifying the same resources could create inconsistencies when settling back to mainnet.

### CRDT Integration

The Dojo team is exploring the integration of Conflict-Free Replicated Data Types (CRDTs) to address concurrency challenges.
CRDTs are data structures designed for distributed systems that enable concurrent updates without complex locking mechanisms.

The proposed CRDT approach would allow each shard to make state updates independently, with mathematical guarantees that changes will converge to a valid global state during settlement.

### Game Example: Dungeon Adventures

Consider a dungeon game where multiple players participate across different shards:

#### Experience Points (Grow-Only Counter)
- XP can only increase, making it ideal for grow-only counter CRDTs
- Each shard independently awards XP to players
- During settlement, final XP becomes the sum of all gains across shards

#### Gold (Escrow-based System)
- Gold can increase or decrease, requiring careful handling
- When entering a shard, player gold is "escrowed" (locked on mainnet)
- Prevents double-spending the same gold across multiple shards
- Final gold balance reflects all shard activities

#### Unique Items (Lock-based Control)
- Legendary weapons and unique items require exclusive access
- Items become locked on mainnet when used in a shard
- Only one shard can modify a unique item's state at a time
- Lock releases when shard execution completes

### Planned CRDT Types

The research focuses on three CRDT patterns for initial implementation:

1. **Grow-Only Counters**: For monotonically increasing values
2. **Escrow Mechanisms**: For controlled resource spending
3. **Lock-based Controls**: For unique assets requiring exclusive access

![CRDT execution model](https://hackmd.io/_uploads/r1_3r1E7Jg.png)

## Current Limitations and Challenges

While execution sharding offers significant potential for scaling and parallel execution, several technical challenges must be addressed:

### 1. Proving Time Bottleneck

Generating and verifying proofs for shard execution is computationally intensive and time-consuming.
This creates potential delays in settlement and could lead to backlogs of state updates awaiting incorporation into mainnet.

### 2. All-or-Nothing Proof Validation

If a proof for shard execution is invalid, the entire shard's execution must be discarded.
Even if only a small portion of transactions were problematic, all valid transactions within that shard would be rejected.

### 3. Limited Cross-Shard Communication

The proposed architecture does not support direct communication between active shards.
This restricts complex interactions that require immediate state awareness across multiple parallel executions.

### 4. Implementation Status

The complete execution sharding system remains in development:
- DojoOS Cairo program for shard validation
- CRDT integration for concurrency management
- Shard initialization and completion mechanisms
- Integration testing across all system components

:::info
Current development focuses on the core proving infrastructure through Saya and SNOS integration.
The specialized DojoOS and shard management components are planned for future releases.
:::
