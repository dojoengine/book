---
title: "World Events"
description: "Understanding and working with events in Dojo worlds - from built-in world events to custom event emission"
---

# World Events

Events are the backbone of real-time updates and indexing in Dojo worlds. The World contract automatically emits events for all state changes, and you can create custom events for your specific use cases.

## Overview

Dojo uses a two-tier event system:

1. **Built-in World Events**: Automatically emitted by the World contract for all operations
2. **Custom Events**: Developer-defined events for specific application needs

All events are automatically indexed by [Torii](/toolchain/torii), making them queryable from your frontend applications.

## Built-in World Events

The World contract emits comprehensive events for all operations, providing a complete audit trail of your world's state changes.

:::info
For the definitive list of world events and their signatures, see the [world contract source code](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/world/world_contract.cairo).
:::

### Model Events

#### `StoreSetRecord`

Emitted when a model is written to the world.

```cairo
#[derive(Drop, starknet::Event)]
pub struct StoreSetRecord {
    #[key]
    pub selector: felt252,     // Model selector
    #[key]
    pub entity_id: felt252,    // Entity identifier
    pub keys: Span<felt252>,   // Entity keys
    pub values: Span<felt252>, // Model data
}
```

**When emitted**: Every time `world.write_model()` is called.

#### `StoreUpdateRecord`

Emitted when a model is updated.

```cairo
#[derive(Drop, starknet::Event)]
pub struct StoreUpdateRecord {
    #[key]
    pub selector: felt252,     // Model selector
    #[key]
    pub entity_id: felt252,    // Entity identifier
    pub values: Span<felt252>, // Updated values
}
```

**When emitted**: When existing model data is modified.

#### `StoreUpdateMember`

Emitted when a specific model member is updated.

```cairo
#[derive(Drop, starknet::Event)]
pub struct StoreUpdateMember {
    #[key]
    pub selector: felt252,        // Model selector
    #[key]
    pub entity_id: felt252,       // Entity identifier
    #[key]
    pub member_selector: felt252, // Member being updated
    pub values: Span<felt252>,    // New values
}
```

**When emitted**: When using `world.write_member()`.

#### `StoreDelRecord`

Emitted when a model is deleted from the world.

```cairo
#[derive(Drop, starknet::Event)]
pub struct StoreDelRecord {
    #[key]
    pub selector: felt252,   // Model selector
    #[key]
    pub entity_id: felt252,  // Entity identifier
}
```

**When emitted**: When `world.erase_model()` is called.

### Resource Management Events

#### `ModelRegistered`

**When emitted**: When a new model is registered with the world

**Key fields**: `name`, `namespace`, `class_hash`, `address`

#### `EventRegistered`

**When emitted**: When a new event is registered with the world

**Key fields**: `name`, `namespace`, `class_hash`, `address`

#### `ContractRegistered`

**When emitted**: When a new contract is registered with the world

**Key fields**: `name`, `namespace`, `address`, `class_hash`, `salt`

#### `NamespaceRegistered`

**When emitted**: When a new namespace is registered

**Key fields**: `namespace`, `hash`

#### `LibraryRegistered`

**When emitted**: When a new library is registered with the world

**Key fields**: `name`, `namespace`, `class_hash`

### Upgrade Events

#### `ModelUpgraded`

**When emitted**: When a model is upgraded to a new class hash

**Key fields**: `selector`, `class_hash`, `address`, `prev_address`

#### `EventUpgraded`

**When emitted**: When an event is upgraded to a new class hash

**Key fields**: `selector`, `class_hash`, `address`, `prev_address`

#### `ContractUpgraded`

**When emitted**: When a contract is upgraded to a new class hash

**Key fields**: `selector`, `class_hash`

#### `WorldUpgraded`

**When emitted**: When the world contract itself is upgraded

**Key fields**: `class_hash`

### Permission Events

#### `OwnerUpdated`

Emitted when owner permissions change.

**When emitted**: When owner permissions change.

**Key fields**: `resource`, `contract`, `value`

#### `WriterUpdated`

**When emitted**: When writer permissions change.

**Key fields**: `resource`, `contract`, `value`

### System Events

#### `WorldSpawned`

**When emitted**: When the world contract is deployed

**Key fields**: `creator`, `class_hash`

#### `EventEmitted`

**When emitted**: When calling the `emit_event()` function.

**Key fields**: `selector`, `system_address`, `keys`, `values`

**Full signature** (this is the most commonly used system event):

```cairo
#[derive(Drop, starknet::Event)]
pub struct EventEmitted {
    #[key]
    pub selector: felt252,         // Event selector
    #[key]
    pub system_address: ContractAddress, // Emitting system
    pub keys: Span<felt252>,       // Event keys
    pub values: Span<felt252>,     // Event values
}
```

#### `ContractInitialized`

**When emitted**: When a contract's `dojo_init` function is called

**Key fields**: `selector`, `init_calldata`

#### `MetadataUpdate`

**When emitted**: When resource metadata is updated

**Key fields**: `resource`, `uri`

## Custom Events

Custom events allow you to emit domain-specific events for your application. They're particularly useful for:

- Game-specific UI updates
- Non-historical data
- Off-chain analytics

Custom events are defined similarly to models, but with the `#[dojo::event]` attribute:

```cairo
#[derive(Copy, Drop, Introspect)]
struct Emote {
    Smile,
    Smirk,
    Frown,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct PlayerEmote {
    #[key]
    player: ContractAddress,
    emote: Emote,
 }
```

The event can then be emitted by calling:

```cairo
world.emit_event(@PlayerEmote { player, mood: Mood::Smile });
```

**Event Requirements**:

- Must be annotated with `#[dojo::event]`
- Must have at least one `#[key]` field
- All interior types must derive `Introspect`
- Must derive `Copy`, `Drop`, and `Serde`

### Examples

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct BattleStarted {
    #[key]
    pub battle_id: u64,
    pub attacker: ContractAddress,
    pub defender: ContractAddress,
    pub location: Vec2,
    pub timestamp: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct ItemCrafted {
    #[key]
    pub player: ContractAddress,
    #[key]
    pub item_id: u64,
    pub item_type: ItemType,
    pub rarity: Rarity,
    pub materials_used: Span<felt252>,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct TradeExecuted {
    #[key]
    pub trade_id: u64,
    pub seller: ContractAddress,
    pub buyer: ContractAddress,
    pub item_id: u64,
    pub price: u256,
    pub currency: ContractAddress,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct MarketListingCreated {
    #[key]
    pub listing_id: u64,
    pub seller: ContractAddress,
    pub item_id: u64,
    pub price: u256,
    pub expiration: u64,
}
```

Custom events are a powerful tool for building responsive, real-time applications on top of Dojo.
Use them thoughtfully to create engaging user experiences while maintaining performance and efficiency.
