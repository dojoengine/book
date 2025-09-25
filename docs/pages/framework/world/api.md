---
title: "World API Reference"
description: "Complete reference for the Dojo World API with examples and best practices"
---

# World API Reference

The World API provides a comprehensive interface for interacting with your Dojo world.
This guide covers the most commonly used developer functions with practical examples and best practices.

## Quick Reference

The World API is organized into these main categories:

- **[Model Operations](#model-operations)** - Read, write, and manage model data
- **[Event System](#event-system)** - Emit and handle events
- **[Permission Management](#permission-management)** - Control access to resources
- **[Resource Management](#resource-management)** - Manage models, systems, and contracts
- **[Utility Functions](#utility-functions)** - Helper functions and tools
- **[Advanced Functions](#advanced-functions)** - System-level operations for framework developers

## Model Operations

### Reading Models

#### `read_model<T>`

Reads a model from the world state.

```cairo
// Read model with single key
let player = get_caller_address();
let position: Position = world.read_model(player);

// Read model with multiple keys
let resource: GameResource = world.read_model((player, location));
```

:::note
Cairo's strong typing allows it to infer that the `Position` model is being read.
:::

**Key Points:**

- Model must have at least one `#[key]` field
- Returns default values (0, false, etc.) for unset fields

#### `read_member<T>`

Reads a specific member from a model without loading the entire model.

```cairo
// Read a specific member
let vec: Vec2 = world.read_member(
    Model::<Position>::ptr_from_keys(player),
    selector!("vec")
);
```

:::note
The `ptr_from_keys` function is used to get the pointer to the model in storage, as type inference is not possible.
The `selector!` macro is used to get the member to target.
:::

**When to Use:**

- When you only need one field from a large model
- For gas optimization in read-heavy operations
- When working with frequently accessed fields

#### `read_member_of_models<T>`

Reads a specific member from multiple models in a single call.

```cairo
// Read the same member from multiple entities
let players = [player1, player2, player3];
let positions: Array<Vec2> = world.read_member_of_models(
    Model::<Position>::ptr_from_keys(players.span()),
    selector!("vec")
);
```

**Use Cases:**

- Batch reading for dashboards
- Leaderboard calculations
- Mass updates based on conditions

#### `read_schema<T>`

Efficiently reads a subset of a model using a custom schema.

```cairo
// Original model
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    player: ContractAddress,
    strength: u8,
    dexterity: u8,
    charisma: u8,
    wisdom: u8,
}

// Query schema
#[derive(Serde, Introspect)]
struct PlayerSchema {
    strength: u8,
    dexterity: u8,
}

// Will return only the strength and dexterity members
let schema: PlayerSchema = world.read_schema(
    Model::<Player>::ptr_from_keys(player)
);
```

**Requirements:**

- Schema fields must match model fields exactly (name and type)
- Schema must derive `Serde` and `Introspect`
- More efficient than `read_member` for 2+ fields

### Writing Models

#### `write_model<T>`

Writes a complete model to the world state.

```cairo
let mut position: Position = world.read_model(player);
position.vec.x += 1;
world.write_model(@position);
```

**Best Practices:**

- Use `@` (snapshot) when passing to `write_model`
- Consider using `write_member` for single field updates

#### `write_member<T>`

Updates a specific field in a model without loading the entire model.

```cairo
let position = Vec2 { x: 10, y: 20 };

world.write_member(
    Model::<Position>::ptr_from_keys(player),
    selector!("vec"),
    position
);
```

**Advantages:**

- More gas efficient for single field updates
- Reduces transaction size
- Prevents race conditions on concurrent updates

#### `write_member_of_models<T>`

Updates the same field across multiple models.

```cairo
let players = [player1, player2, player3];
let new_scores = [100, 200, 300];

world.write_member_of_models(
    Model::<Player>::ptr_from_keys(players.span()),
    selector!("score"),
    new_scores.span()
);
```

#### `erase_model<T>`

Resets a model to its default state (all non-key fields become 0/false/empty).

```cairo
let moves: Moves = world.read_model(player);
world.erase_model(@moves);
```

### Batch Operations

For better gas efficiency, use batch operations when working with multiple models of the same type:

```cairo
let position1 = Position { player1, vec: Vec2 { x: 10, y: 10 } };
let position2 = Position { player2, vec: Vec2 { x: 10, y: 10 } };

world.write_models([@position1, @position2].span());
```

## Custom Events

#### `emit_event<T>`

Emits a custom event that gets indexed by [Torii](/toolchain/torii).

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct PlayerMoved {
    #[key]
    pub player: ContractAddress,
    pub from: Vec2,
    pub to: Vec2,
}

// Emit the event
world.emit_event(@PlayerMoved {
    player,
    from: old_position.vec,
    to: new_position.vec,
});
```

**Event Requirements:**

- Must be annotated with `#[dojo::event]`
- Must have at least one `#[key]` field
- All types must derive `Introspect`

## Permission Management

### Checking Permissions

#### `is_owner`

Checks if an address has owner permission for a resource.

```cairo
let resource_selector = selector_from_tag!("my_game-Position");
let is_owner = world.is_owner(resource_selector, user_address);
```

#### `is_writer`

Checks if a contract has writer permission for a resource.

```cairo
let can_write = world.is_writer(resource_selector, contract_address);
```

### Granting Permissions

#### `grant_owner`

Grants owner permission to an address.

```cairo
// Only existing owners or world admin can grant ownership
world.grant_owner(resource_selector, new_owner_address);
```

#### `grant_writer`

Grants writer permission to a contract.

```cairo
// Only resource owners can grant writer permission
world.grant_writer(resource_selector, contract_address);
```

### Revoking Permissions

#### `revoke_owner`

Revokes owner permission from an address.

```cairo
world.revoke_owner(resource_selector, owner_address);
```

#### `revoke_writer`

Revokes writer permission from a contract.

```cairo
world.revoke_writer(resource_selector, contract_address);
```

## Resource Management

### Resource Information

#### `resource`

Gets information about a resource.

```cairo
let resource_info = world.resource(selector_from_tag!("my_game-Position"));
```

#### `metadata`

Gets metadata for a resource.

```cairo
let metadata = world.metadata(selector_from_tag!("my_game-Position"));
```

#### `set_metadata`

Sets metadata for a resource.

```cairo
let metadata = ResourceMetadata {
    resource_id: selector_from_tag!("my_game-Position"),
    metadata_uri: "ipfs://...",
    metadata_hash: 0x...,
};

world.set_metadata(metadata);
```

## Utility Functions

### `uuid`

Generates a unique, sequential identifier.

```cairo
let game_id = world.uuid();
let match_id = world.uuid();
```

:::warning
This impacts transaction parallelization since it writes to the same storage slot.
Use sparingly in high-throughput scenarios.
:::

### DNS Functions

The DNS (Dojo Name System) functions allow you to resolve contract names to their addresses and class hashes.

#### `dns`

Resolves a contract name to its address and class hash.

```cairo
// Get both address and class hash
if let Option::Some((contract_address, class_hash)) = world.dns(@"my_contract") {
    // Use the contract address and class hash
    let my_contract = IMyContractDispatcher { contract_address };
}
```

#### `dns_address`

Gets just the contract address from a contract name.

```cairo
// Get only the address
if let Option::Some(address) = world.dns_address(@"my_contract") {
    let my_contract = IMyContractDispatcher { contract_address: address };
}
```

#### `dns_class_hash`

Gets just the class hash from a contract name.

```cairo
// Get only the class hash
if let Option::Some(class_hash) = world.dns_class_hash(@"my_contract") {
    // Use class hash for library calls or upgrades
}
```

**Key Points:**

- DNS lookups resolve contract names to deployed contracts and libraries
- Returns `Option::None` if the contract name is not found
- Works with both deployed contracts and libraries
- DNS lookups use the contract name without the namespace prefix

## Advanced Functions

The following functions are primarily used by framework developers, tooling, and migration scripts.
Most application developers won't touch these directly:

### Entity Operations

Low-level functions for direct entity manipulation:

- **`entity`** - Gets values of a model entity/member
- **`entities`** - Gets model values for multiple entities
- **`set_entity`** - Sets model value for an entity/member
- **`set_entities`** - Sets model values for multiple entities
- **`delete_entity`** - Deletes a model value for an entity/member
- **`delete_entities`** - Deletes model values for multiple entities

### System Management

Functions for registering and upgrading system resources:

- **`register_namespace`** - Registers a namespace in the world
- **`register_event`** - Registers an event in the world
- **`register_model`** - Registers a new model in the world
- **`register_contract`** - Registers and deploys a new contract
- **`register_library`** - Registers and declares a library
- **`init_contract`** - Initializes a registered contract
- **`upgrade_event`** - Upgrades an event in the world
- **`upgrade_model`** - Upgrades a model in the world
- **`upgrade_contract`** - Upgrades a deployed contract
- **`upgrade`** - Upgrades the world with new class hash

### Permission Utilities

Additional permission management functions:

- **`owners_count`** - Gets the number of owners for a resource

## Performance Tips

1. **Use batch operations** for multiple model updates
2. **Use `read_member`** for single field access
3. **Use `write_member`** for single field updates
4. **Cache frequently accessed data** in local variables
5. **Use `read_schema`** for partial model reads (2+ fields)
6. **Minimize `uuid()` calls** to maintain parallelization

## Common Pitfalls

1. **Forgetting to make world mutable** when writing
2. **Not using `@` when passing models to write functions**
3. **Reading entire models when only one field is needed**
4. **Not checking permissions before operations**
5. **Emitting events without proper key fields**
