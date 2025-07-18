---
title: Model API Reference
description: Comprehensive guide to Dojo's Model API, including storage operations, field access, and performance optimizations.
---

# Model API Reference

This reference covers the complete Model API in Dojo, including storage operations, field access patterns, and performance optimizations.

## Core Model Trait

Every model in Dojo implements the [`Model<M>` trait](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/model/model.cairo), which provides comprehensive functionality for model operations.

The following examples are based on the following simple `Position` model:

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    id: u32,
    x: u32,
    y: u32
}
```

#### Model Identity
```cairo
use dojo::model::Model;

// Get the entity ID for this model instance
let entity_id: felt252 = model.entity_id();

// Get model name
let name: ByteArray = Model::<Position>::name();

// Get model selector for a namespace
let selector: felt252 = Model::<Position>::selector(namespace_hash);

// Get model definition
let definition: ModelDef = Model::<Position>::definition();

// Get model schema information
let schema: Struct = Model::<Position>::schema();

// Get model layout information
let layout: Layout = Model::<Position>::layout();

// Get specific field layout
let field_layout: Option<Layout> = Model::<Position>::field_layout(selector!("x"));

// Get model size information
let unpacked_size: Option<usize> = Model::<Position>::unpacked_size();
let packed_size: Option<usize> = Model::<Position>::packed_size();

// Get instance layout from model
let instance_layout: Layout = model.instance_layout();
```

#### Model Serialization
```cairo
use dojo::model::Model;

// Serialize keys and values
let keys: Span<felt252> = model.serialized_keys();
let values: Span<felt252> = model.serialized_values();

// Reconstruct model from serialized data
let model: Option<Position> = Model::<Position>::from_serialized(keys, values);
```

#### Model Pointers
```cairo
use dojo::model::{Model, ModelPtr};

// Create pointer from keys (advanced usage)
let ptr: ModelPtr<Position> = Model::<Position>::ptr_from_keys(player_address);

// Create pointers from multiple keys (advanced usage)
let ptrs: Span<ModelPtr<Position>> = Model::<Position>::ptrs_from_keys(
    array![player1, player2, player3].span()
);

// Create pointer from entity ID (advanced usage)
let ptr: ModelPtr<Position> = Model::<Position>::ptr_from_id(entity_id);

// Get pointer from model instance (advanced usage)
let ptr: ModelPtr<Position> = model.ptr();
```

:::note
Model pointers are primarily used internally for advanced operations like field-level access.
For most use cases, prefer the simpler `world.read_model()` and `world.write_model()` methods.
:::

## Model Storage Operations

The [`ModelStorage` trait](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/model/storage.cairo) provides all storage operations for models:

```cairo
use dojo::model::{ModelStorage};
use dojo::world::{WorldStorage, WorldStorageTrait};
use starknet::get_caller_address;

let mut world: WorldStorage = self.world(@"my_game");
```

### Basic Storage Operations

#### Writing Models
```cairo
// Write single model
let player = get_caller_address();
let position = Position { player, x: 10, y: 20 };
world.write_model(@position);

// Write multiple models
let positions = array![
    @Position { player: player1, x: 10, y: 20 },
    @Position { player: player2, x: 30, y: 40 }
];
world.write_models(positions.span());
```

#### Reading Models
```cairo
// Read single model
let player = get_caller_address();
let position: Position = world.read_model(player);

// Read multiple models
let players = array![player1, player2, player3];
let positions: Array<Position> = world.read_models(players.span());
```

#### Erasing Models
```cairo
// Erase single model
world.erase_model(@position);

// Erase multiple models
world.erase_models(positions.span());

// Erase by model pointer
let ptr = Model::<Position>::ptr_from_keys(player_address);
world.erase_model_ptr(ptr);

// Erase multiple models by pointers
let ptrs = Model::<Position>::ptrs_from_keys(players.span());
world.erase_models_ptrs(ptrs);
```

### Field-Level Operations

Field operations are more efficient when you only need to update specific fields:

:::warning
Field-level operations are advanced features that require careful use. For most applications,
use the simpler `world.read_model()` and `world.write_model()` methods.
:::

#### Reading Fields
```cairo
// Read specific field (advanced usage)
let player = get_caller_address();
let x_coord: u32 = world.read_member(
    Model::<Position>::ptr_from_keys(player),
    selector!("x")
);

// Read same field from multiple models (advanced usage)
let ptrs = Model::<Position>::ptrs_from_keys(players.span());
let x_coords: Array<u32> = world.read_member_of_models(ptrs, selector!("x"));
```

#### Writing Fields
```cairo
// Write specific field (advanced usage)
let player = get_caller_address();
world.write_member(
    Model::<Position>::ptr_from_keys(player),
    selector!("x"),
    42_u32
);

// Write same field for multiple models (advanced usage)
let ptrs = Model::<Position>::ptrs_from_keys(players.span());
let new_x_values = array![10, 20, 30];
world.write_member_of_models(ptrs, selector!("x"), new_x_values.span());
```

### Schema Reading

You can read models using custom schemas that implement the `Introspect` trait:

```cairo
#[derive(Drop, Serde, Introspect)]
struct PositionSummary {
    x: u32,
    y: u32,
}

// Read using custom schema
let player = get_caller_address();
let ptr = Model::<Position>::ptr_from_keys(player);
let summary: PositionSummary = world.read_schema(ptr);

// Read multiple with custom schema
let ptrs = Model::<Position>::ptrs_from_keys(players.span());
let summaries: Array<PositionSummary> = world.read_schemas(ptrs);
```

## Model Values

Model values contain only the non-key fields of a model:

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    player_id: ContractAddress,
    name: ByteArray,
    score: u32,
    level: u8,
}

// Dojo automatically generates PlayerValue:
// struct PlayerValue {
//     name: ByteArray,
//     score: u32,
//     level: u8,
// }
```

:::info
Under-the-hood, the `*Value` structs are what actually get stored onchain.
The `key` fields are stripped out, and are used only for storage addressing.
:::

### Model Value Operations

The `ModelValue<V>` trait provides operations for value-only access:

```cairo
use dojo::model::{ModelValue};

// Get value serialization
let values: Span<felt252> = player_value.serialized_values();

// Reconstruct from serialized values
let player_value: Option<PlayerValue> = ModelValue::<PlayerValue>::from_serialized(values);

// Get value name and layout
let name: ByteArray = ModelValue::<PlayerValue>::name();
let layout: Layout = ModelValue::<PlayerValue>::layout();

// Get value selector, i.e. poseidon(namespace_hash, model_name)
let selector: felt252 = ModelValue::<PlayerValue>::selector(namespace_hash);

// Get instance layout from value
let instance_layout: Layout = player_value.instance_layout();
```

:::info
Under the hood, Dojo addresses models as `poseidon(selector, entity_id)`
:::

### Model Value Storage Operations

The `ModelValueStorage` trait provides value-only storage operations that work with just the non-key fields:

```cairo
use dojo::model::{ModelValueStorage};

// Read value from entity ID
let player = get_caller_address();
let player_felt: felt252 = player.into();
let entity_id = dojo::utils::entity_id_from_serialized_keys([player_felt].span());
let player_value: PlayerValue = world.read_value_from_id(entity_id);

// Write value to entity ID
let new_value = PlayerValue { name: "Alice", score: 100, level: 5 };
world.write_value_from_id(entity_id, @new_value);

// Read multiple values from entity IDs
let entity_ids = array![id1, id2, id3];
let values: Array<PlayerValue> = world.read_values_from_ids(entity_ids.span());

// Write multiple values to entity IDs
let values = array![@value1, @value2, @value3];
world.write_values_from_ids(entity_ids.span(), values.span());

// Erase value from entity ID
world.erase_value_from_id(entity_id);

// Erase multiple values from entity IDs
world.erase_values_from_ids(entity_ids.span());
```

## Performance Optimizations

### Batch Operations

Use batch operations when working with multiple models:

```cairo
// Efficient: batch read
let players = array![player1, player2, player3];
let positions: Array<Position> = world.read_models(players.span());

// Inefficient: individual reads
let pos1: Position = world.read_model(player1);
let pos2: Position = world.read_model(player2);
let pos3: Position = world.read_model(player3);
```

### Field Access Patterns

Use field operations for partial updates:

```cairo
// Efficient: update only needed field (advanced usage)
let player = get_caller_address();
world.write_member(
    Model::<Position>::ptr_from_keys(player),
    selector!("x"),
    new_x_value
);

// Ergonomic: read full model, update, write back
let mut position: Position = world.read_model(player);
position.x = new_x_value;
world.write_model(@position);
```

### Storage Layout Considerations

Choose the right introspection trait based on your needs:

```cairo
// For upgradeable models (flexible but less efficient)
#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct FlexibleModel {
    #[key]
    id: u32,
    data: ByteArray,
}

// For stable models (efficient but not upgradeable)
#[derive(Drop, Serde, IntrospectPacked)]
#[dojo::model]
struct StableModel {
    #[key]
    id: u32,
    x: u32,
    y: u32,
}
```

## Common Patterns

### Singleton Models

For global settings or counters:

```cairo
const GAME_CONFIG_ID: u32 = 999999;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameConfig {
    #[key]
    id: u32,
    max_players: u32,
    game_duration: u64,
}

// Usage
let config: GameConfig = world.read_model(GAME_CONFIG_ID);
```

### Composite Key Models

For relationships between entities:

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Ownership {
    #[key]
    owner: ContractAddress,
    #[key]
    item_id: u32,
    quantity: u32,
}

// Usage
let ownership: Ownership = world.read_model((owner_address, item_id));
```

### Entity Component Pattern

Following ECS principles:

```cairo
// Components
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    entity_id: u32,
    x: u32,
    y: u32,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Health {
    #[key]
    entity_id: u32,
    current: u32,
    max: u32,
}

// Systems operate on entities with specific components
fn heal_entity(ref world: WorldStorage, entity_id: u32, amount: u32) {
    let mut health: Health = world.read_model(entity_id);
    health.current = core::cmp::min(health.current + amount, health.max);
    world.write_model(@health);
}
```

## Nonexistent Models

When reading non-existent models, the API returns default values (all fields set to 0) rather than failing:

```cairo
// Reading a non-existent model returns default values
let player: ContractAddress = 0.try_into().unwrap();
let position: Position = world.read_model(player);
// If model doesn't exist: position.vec.x = 0, position.vec.y = 0

// For optional model reading, check if all fields are default
let position: Position = world.read_model(player);
let is_default = position.vec.x == 0 && position.vec.y == 0;
if is_default {
    // Handle case where model might not exist
}
```

## Best Practices

1. **Use appropriate traits**: Choose between `Introspect` and `IntrospectPacked` based on your needs
2. **Batch operations**: Use bulk read/write methods when working with multiple models
3. **Field access**: Use field operations for partial updates
4. **Model design**: Keep models small and focused (ECS principle)
5. **Key design**: Use meaningful, collision-resistant keys
6. **Performance**: Consider storage layout and access patterns

For more advanced usage and examples, see the [Model Examples](https://github.com/dojoengine/dojo/tree/main/examples) in the Dojo repository.

## Complete Real-World Example

Here's a complete example from a typical Dojo game showing common patterns:

```cairo
use dojo::model::{ModelStorage};
use dojo::world::{WorldStorage, WorldStorageTrait};
use starknet::{ContractAddress, get_caller_address};

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
struct Player {
    #[key]
    pub owner: ContractAddress,
    pub experience: u32,
    pub health: u32,
    pub coins: u32,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
struct Position {
    #[key]
    pub player: ContractAddress,
    pub x: u32,
    pub y: u32,
}

#[dojo::contract]
mod game_actions {
    use super::{Player, Position};
    use dojo::model::{ModelStorage};
    use dojo::world::{WorldStorage};
    use starknet::get_caller_address;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn_player(ref self: ContractState) {
            let mut world = self.world(@"my_game");
            let playerAddress = get_caller_address();

            // Create new player
            let player = Player { owner: player, experience: 0, health: 100, coins: 0 };

            // Set starting position
            let position = Position { player, x: 0, y: 0 };

            // Write both models
            world.write_model(@player);
            world.write_model(@position);
        }

        fn move_player(ref self: ContractState, x: u32, y: u32) {
            let mut world = self.world(@"my_game");
            let playerAddress = get_caller_address();

            // Read current position
            let mut position: Position = world.read_model(playerAddress);

            // Update position
            position.x = x;
            position.y = y;

            // Write updated position
            world.write_model(@position);
        }

        fn add_experience(ref self: ContractState, amount: u32) {
            let mut world = self.world(@"my_game");
            let playerAddress = get_caller_address();

            // Read current player state
            let mut player: Player = world.read_model(playerAddress);

            // Update experience
            player.experience += amount;

            // Write updated player
            world.write_model(@player);
        }
    }
}
```
