---
title: Execution Sharding on Starknet
description: A comprehensive guide to execution sharding on Starknet, including shard initialization, execution flow, completion detection, and concurrency management with CRDTs.
---

# Execution Sharding on Starknet

:::note
The execution sharding architecture described in this document represents **planned functionality** currently under development.
While the design is established, the implementation is not yet available in production.
See the [Saya docs](/toolchain/saya/persistent) for more information.
:::

## Overview

Execution sharding enables isolated transaction execution within independent shard environments ("Layer 3"s).
Shards are independent sequencers that branch from Starknet mainnet, process transactions, then merge final state back to mainnet.

This enables parallel processing across multiple shards while maintaining unified state anchored to Starknet mainnet.

:::info
Execution sharding differs from sovereign chains, in that sovereign chains are long-lived and **do not** commit state back to Starknet.
:::

### Key Benefits

- **Parallel Execution**: Multiple shards process transactions simultaneously
- **Cost Efficiency**: Only final state changes settle on mainnet
- **Low Latency**: Gasless, high-throughput execution environments
- **Unified State**: All shards merge back to single Starknet state

## Planned Architecture

The proposed execution sharding system involves five key components:

1. **Starknet Mainnet**: The settlement layer where Dojo worlds are deployed
2. **World Contract**: Receives and incorporates state changes from completed shards
3. **Katana**: Acts as the sequencer running individual shards
4. **Saya**: Generates proofs of shard execution and submits them to the World Contract
5. **DojoOS**: A specialized Cairo program generating execution traces for validation

![Sharding execution overview](https://hackmd.io/_uploads/HyF9QoVX1g.png)


## Proposed Shard Initialization

A shard begins when an initialization transaction is submitted to the World Contract, specifying:
- Unique shard identifier
- Designated operator address
- Initial state conditions
- Settlement configuration for mainnet data merging

The operator then spins up a Katana instance, branching from Starknet mainnet to create the shard environment.

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

The shard branches from mainnet at the initialization block, then operates independently as a gasless environment.
Since contract logic is already defined on mainnet, shards execute without additional contract declarations while maintaining mainnet compatibility.

## Planned Execution Flow

Once initialized, the shard sequencer processes transactions within the isolated environment.

### Access Control Options

1. **Contract Whitelisting**: Restrict execution to predefined contracts
2. **Account Whitelisting**: Allow only specific accounts to submit transactions
3. **Declaration Restrictions**: Prevent new contract declarations
4. **Permissionless Execution**: Rely on existing mainnet permissions

Access restrictions may be necessary to prevent DoS attacks, depending on use case and security requirements.

![Shard execution flow](https://hackmd.io/_uploads/Sk6WByV7yg.png)


## Planned Completion Detection and Settlement

### Completion Detection

A specific event emitted by a designated Cairo contract signals shard completion, indicating all intended transactions are processed and the shard is ready for settlement.

### Proposed Settlement Pipeline

Once the completion event is detected, Saya would initiate the settlement process:

1. **Execution Trace Generation**: DojoOS generates an execution trace similar to SNOS but optimized for shard validation:
   - Validates transaction sequences rather than blocks
   - Outputs only modified storage addresses per settlement config
   - Supports shard-specific validation rules

2. **Proof Generation**: Saya submits the trace to a proving service (e.g., Atlantic) for cryptographic proof generation

3. **Layout Bridge**: Proof conversion to `recursive_with_poseidon` layout for Starknet verification

4. **Settlement**: Final proof and storage updates submitted to the World Contract

:::note
The DojoOS component and shard settlement pipeline are currently in development.
The existing Saya proving service supports SNOS-based proving for standard Starknet blocks.
:::


## Proposed Concurrency Management with CRDTs

Concurrent shard execution requires managing consistent state across Starknet to prevent inconsistencies during settlement.

### CRDT Integration

The Dojo team is exploring Conflict-Free Replicated Data Types (CRDTs) for concurrency management.
CRDTs enable concurrent updates across distributed systems without complex locking, with mathematical guarantees that changes converge to a valid global state during settlement.

### Game Example: Dungeon Adventures

Consider a dungeon game where multiple players participate across different shards:

#### Experience Points (Grow-Only Counter)
XP can only increase, ideal for grow-only counter CRDTs.
Each shard independently awards XP; final XP is the sum across all shards.

#### Gold (Escrow-based System)
Gold can increase/decrease, requiring careful handling.
Player gold is "escrowed" (locked on mainnet) when entering a shard, preventing double-spending.

#### Unique Items (Lock-based Control)
Legendary items require exclusive access.
Items lock on mainnet when used in a shard, releasing when execution completes.

### Planned CRDT Types

The research focuses on three CRDT patterns for initial implementation:

1. **Grow-Only Counters**: For monotonically increasing values
2. **Escrow Mechanisms**: For controlled resource spending
3. **Lock-based Controls**: For unique assets requiring exclusive access

![CRDT execution model](https://hackmd.io/_uploads/r1_3r1E7Jg.png)

## Current Limitations and Challenges

While execution sharding offers significant potential for scaling and parallel execution, several technical challenges must be addressed:

### 1. Proving Time Bottleneck

Proof generation and verification is computationally intensive, potentially creating settlement delays and state update backlogs.

### 2. All-or-Nothing Proof Validation

Invalid proofs require discarding entire shard execution, even if only a small portion of transactions were problematic.

### 3. Limited Cross-Shard Communication

No direct communication between active shards restricts complex interactions requiring immediate state awareness across parallel executions.

### 4. Implementation Status

The complete system remains in development:
- DojoOS Cairo program for shard validation
- CRDT integration for concurrency management
- Shard initialization and completion mechanisms
- Integration testing across all components

:::note
Current development focuses on the core proving infrastructure through Saya and SNOS integration.
The specialized DojoOS and shard management components are planned for future releases.
:::
