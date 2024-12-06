# Execution sharding on Starknet

## Overview of execution sharding

Execution sharding on Starknet is an approach that allows isolated transaction execution within a shard environment. A shard in this context represents an independent sequencer that branches from the Starknet mainnet network to handle a specific subset of transactions and then merges onto mainnet. This architecture enables parallel processing across multiple shards while ensuring all activity remains anchored to Starknet mainnet, maximizing throughput without fragmenting the network's unified state and value.

The sharding mechanism is triggered by sending a transaction to Starknet that specifies the shard details. Based on these details, a new shard is initiated, providing a sandboxed environment with low latency and high throughput for executing a series of transactions independently. Once the shard completes its operations, only the final state changes need to be settled back onto Starknet, significantly reducing costs by avoiding the need to process a whole state update on the main network.

In the context of Dojo, execution sharding involved the following actors:

1. Starknet Mainnet: The settlement layer where games live.
2. World Contract: The contract on Starknet mainnet that will receive the state changes from the shard and incorporate them.
3. Katana: The sequencer to run the shard.
4. Saya: The proving service to generate the proof of the shard's execution and submit it to the world contract on Starknet.
5. DojoOS: The Cairo program that will generate the trace of the correct execution of the shard.

![Sharding execution overview](https://hackmd.io/_uploads/HyF9QoVX1g.png)


## Shard Initialization

The execution of a shard begins with the initiation of a specific transaction containing shard details, such as the shard ID, the set of initial state conditions and which data to settle back onto Starknet mainnet. This transaction is processed on Starknet targetting the World Contract, after which an operator specified in the transaction spins up a Katana and branches the Starknet mainnet network to create a dedicated shard. The shard operates as a gasless environment, allowing transactions to be processed without incurring the usual gas costs associated with Starknet mainnet operations. This makes shards particularly cost-effective for executing complex or high-volume transaction sequences that would be prohibitively expensive on mainnet.

```rust
struct ShardStartData {
    // Unique identifier for the shard.
    shard_id: felt252,
    // Address of the shard operator running the sequencer.
    operator: felt252,
    // Initial state of the shard.
    initial_state: ShardInitialState {
        // List of contracts the sequencer may be whitelisting to execute.
        contracts: Span<felt252>,
        // Event to be emitted when the shard has completed execution.
        end_event: EventSelector {
            // Address of the contract emitting the event.
            from: felt252,
            // Selector of the event to be emitted.
            selector: felt252, 
        },
    },
    // Configuration for the settlement of the shard in the world contract.
    settlement_config: SettlementConfig {
        // Addresses of storage addresses to update on the world contract.
        storage_addresses: Span<felt252>,
    },
}
```

The shard is initialized by branching mainnet at the block where the initialization transaction is included. From this point forward, the shard will operate independently, and since all the logic has been defined on Starknet mainnet, the shard will be able to execute this logic without additional classes to be declared on the shard. This is an important aspect of execution sharding, as it allows better control over the execution environment within the shard.

## Shard Execution Flow

Once the shard has been initialized, the shard (sequencer) will begin processing transactions. At this point, there's several possible designs (not exhaustive) for controlling the execution flow:

1. Whitelisting a set of contracts to be executed within the shard.
2. Whitelisting accounts that are allowed to send transactions to the shard.
3. Restrict the shard to never declare new contracts.
4. No restrictions since the logic is already defined on Starknet mainnet, and permissions are already defined in the Cairo code.

We may want to restrict the execution flow to only allow the execution of a specific set of contracts or accounts to prevent the shard from being targeted by DoS attacks.

![Sharing execution flow](https://hackmd.io/_uploads/Sk6WByV7yg.png)


## Detecting Shard Completion

A critical part of the execution sharding process is the detection of when a shard has completed its task. A specific event emitted by a specific Cairo contract signals the end of its execution lifecycle. This event acts as a flag, allowing the system to recognize that all intended transactions within the shard have been processed or that a fullfillment of the shard's purpose has been reached. Once this event is detected, the sharding process transitions to the proving and settlement stages.

**Proving and Settlement Pipeline**

Upon detecting the completion event, the Saya service initiates the proving and settlement pipeline.

1. DojoOS is executed to generate the trace attesting of the correct execution of the shard. At this point, DojoOS is similar to SNOS, where transactions are re-executed to attest they are valid. However, the DojoOS is not block based as SNOS is. It's rather a sequence of transactions that are being validated and where some whitelisting may be applied, or extra checks based on conditions that may be defined in the shard initialization.

   An other difference is that DojoOS will output a list of storage addresses that were modified during the execution of the shard and must be settled back onto Starknet (based on the settlement config defined in the shard initialization). Where SNOS outputs the entire state update (contracts nonces, classes, etc).

2. The trace is then submitted to Atlantic (or other proving service) by Saya to generate a proof.
3. Since re-execution of transactions currently requires dynamic layout, this proof must then be submitted again for a layout bridge, which will output a new proof with `recursive_with_poseidon` layout which is verifiable on Starknet.
4. Finally, the DojoOS output with the storage addresses to be updated will be sent as a calldata to the world contract on Starknet to incorporate the shard's state changes back into the main Starknet network.


## Concurrency Management with CRDTs

One of the challenges of concurrent execution across shards is maintaining consistent state on Starknet. For instance, if shards modify balances independently, concurrent execution without safeguards could lead to inconsistencies on Starknet mainnet. To address this, we are exploring the integration of Conflict-Free Replicated Data Types (CRDTs) into our concurrency model. CRDTs are a class of data structures designed to enable concurrent updates across distributed systems without requiring complex locking mechanisms.

Using CRDTs could allow each shard to make state updates independently, with the assurance that these changes will converge to a valid global state when settled on Starknet. This approach mitigates the risk of issues such as invalid storage updates while preserving the benefits of parallel execution.

For example, consider a dungeon game where players earn both gold and experience points (XP). When multiple players enter the same dungeon in different shards:

- Experience Points (Grow-Only Counter CRDT): XP can only increase, making it a perfect candidate for a grow-only counter CRDT. Each shard can independently award XP to players, and when merging back to mainnet, the final XP will be the sum of all gains across shards.

- Gold (Escrow-based CRDT): Gold requires more careful handling since it can both increase and decrease. When a player enters a dungeon shard, a portion of their gold is "escrowed" - locked on mainnet and made available to that specific shard. This prevents the same gold from being spent multiple times across different shards.

- Unique Items (Lock-based CRDT): For unique items like legendary weapons, a lock-based CRDT ensures that only one shard can modify the item's state at a time. When a unique item is being used or traded in a shard, it becomes temporarily locked on mainnet until that shard's execution completes.

The following CRDT types are being considered for a first MVP implementation:

1. Grow-Only Counters: For metrics that can only increase (experience points, achievement counts)
2. Escrow Mechanisms: For resources that need controlled spending across shards (gold, consumable items)
3. Lock-based Controls: For unique assets that cannot be simultaneously modified (special equipment, territory ownership)

![Sharing execution CRDT](https://hackmd.io/_uploads/r1_3r1E7Jg.png)


## Current limitations

While sharding offers significant advantages for scaling and parallel execution, there are several current limitations to consider:

1. Proving Time Bottleneck: The process of generating and verifying proofs for shard execution is computationally intensive and time-consuming. This can lead to delays in settlement, potentially creating a backlog of state updates waiting to be incorporated into the main network.

2. All-or-Nothing Proof Validation: If a proof for a shard's execution is found to be invalid, the entire shard's execution must be discarded. This means that even if only a small portion of the transactions were problematic, all valid transactions within that shard will also be rejected.

3. Limited Cross-Shard Communication: Direct communication between shards is currently not supported, which can restrict certain types of complex interactions that require immediate state awareness across multiple shards.
