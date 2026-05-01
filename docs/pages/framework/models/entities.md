---
title: Entities in Dojo
description: Understand how entities work in Dojo's ECS architecture and how they relate to models through primary keys.
---

# Entities

**Entities are the primary keys to which models are attached.**

An entity is described by a `felt252` identifier that serves as a common key across models, allowing you to group related data together.

## ECS Theory

Entities in Dojo follow the Entity-Component-System (ECS) architectural pattern:

- **Entities**: Unique identifiers that group related components
- **Components**: Data containers (your Dojo models) that store entity state
- **Systems**: Functions that operate on entities with specific component combinations

This separation allows for:

- **Composition over inheritance**: Build complex entities from simple components
- **Performance**: Efficient data access and cache-friendly operations
- **Flexibility**: Easy to add, remove, or modify entity behaviors

> For deeper understanding of ECS concepts, read the [ECS-FAQ](https://github.com/SanderMertens/ecs-faq)

## Entity Concepts

### Entity as Primary Key

Entities in Dojo are not objects themselves (they have no state), but rather unique identifiers that models use as storage keys.
Multiple models can share the same entity ID, effectively creating a collection of components for that entity.

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    entity_id: u32,
    x: u32,
    y: u32,
}

#[derive(Drop, Serde)]
#[dojo::model]
struct Health {
    #[key]
    entity_id: u32,
    current: u32,
    max: u32,
}
```

### Entity ID Generation

Entity IDs in Dojo are automatically generated from model keys through a deterministic process:

**How Keys Become Entity IDs:**

1. **Key Serialization**: All `#[key]` fields are serialized using Cairo's `Serde` trait
2. **Poseidon Hashing**: The serialized keys are hashed using `poseidon_hash_span()`
3. **Entity ID Result**: The hash becomes the unique `felt252` entity ID

```cairo
// For a single key model:
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    pub address: ContractAddress,
    pub name: ByteArray,
}

// Entity ID is computed as:
// poseidon_hash_span([address.into()].span())
```

```cairo
// For multiple key models:
#[derive(Drop, Serde)]
#[dojo::model]
struct ServerProfile {
    #[key]
    pub player: ContractAddress,
    #[key]
    pub server_id: u32,
    pub name: ByteArray,
}

// Entity ID is computed as:
// poseidon_hash_span([player.into(), server_id.into()].span())
```

:::info
You can learn more about Cairo's Poseidon hash function [here](https://www.starknet.io/cairo-book/ch204-02-07-poseidon.html).
:::

**Manual Entity ID Generation:**

For cases where you need to generate entity IDs manually:

```cairo
use dojo::utils::entity_id_from_serialized_keys;

// Direct computation from serialized keys
let player_felt: felt252 = player_address.into();
let entity_id = entity_id_from_serialized_keys([player_felt].span());

// For composite keys
let keys = [player_address.into(), server_id.into()];
let entity_id = entity_id_from_serialized_keys(keys.span());

// Use the World's sequential unique ID generator
let unique_id: u32 = world.uuid();

// Use predictable IDs for specific entities
const GAME_CONFIG_ENTITY: u32 = 999999;
```

**Key Properties:**

- **Deterministic**: Same keys always produce the same entity ID
- **Collision Resistant**: Poseidon hash ensures unique IDs for different key combinations
- **Order Sensitive**: Key order in the struct determines the serialization order

### Player-Based Entities

A common pattern is using player addresses as entity identifiers:

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct PlayerStats {
    #[key]
    player: ContractAddress,
    level: u32,
    experience: u64,
}

// Use the caller address as model key
let player = get_caller_address();
let stats: PlayerStats = world.read_model(player);
```

## Entity Relationships

### One-to-One Relationships

Each entity has exactly one instance of a model:

```cairo
// Each player maps to exactly one Character

#[derive(Drop, Serde)]
#[dojo::model]
struct Character {
    #[key]
    player: u32,
    name: ByteArray,
    class: u8,
}
```

### One-to-Many Relationships

Use composite keys for one-to-many relationships:

```cairo
// One player can have many inventory slots

#[derive(Drop, Serde)]
#[dojo::model]
struct Inventory {
    #[key]
    player: u32,
    #[key]
    slot: u32,
    item_id: u32,
    quantity: u32,
}
```

### Many-to-Many Relationships

Use junction models for many-to-many relationships:

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Guild {
    #[key]
    guild_id: u32,
    name: ByteArray,
    leader: ContractAddress,
}

#[derive(Drop, Serde)]
#[dojo::model]
struct GuildMembership {
    #[key]
    guild_id: u32,
    #[key]
    player: ContractAddress,
    role: u8,
    joined_at: u64,
}
```

## Entity Lifecycle Management

### Creating Entities

```cairo
fn spawn(ref world: WorldStorage, name: ByteArray) {
    let player = get_caller_address();

    world.write_model(@Character { player, name, class: 1 }); // Warrior
    world.write_model(@Position { player, x: 0, y: 0 });
    world.write_model(@Health { player, current: 100, max: 100 });
}
```

### Updating Entities

```cairo
fn move_character(ref world: WorldStorage, entity_id: u32, new_x: u32, new_y: u32) {
    let mut position: Position = world.read_model(entity_id);
    position.x = new_x;
    position.y = new_y;
    world.write_model(@position);
}
```

### Deleting Entities

```cairo
fn destroy_character(ref world: WorldStorage, entity_id: u32) {
    // Remove all components using the key
    world.erase_model_ptr(Model::<Character>::ptr_from_keys(entity_id));
    world.erase_model_ptr(Model::<Position>::ptr_from_keys(entity_id));
    world.erase_model_ptr(Model::<Health>::ptr_from_keys(entity_id));
}

// You can alternatively pass in a model instance to `erase_model`
let character: Character = world.read_model(entity_id);
world.erase_model(@character);
```

## Entity Queries and Operations

### Bulk Entity Operations

```cairo
fn heal_multiple_entities(ref world: WorldStorage, entity_ids: Span<u32>, amount: u32) {
    let healths: Array<Health> = world.read_models(entity_ids);
    let mut healed_entities = array![];

    let mut i = 0;
    while i < healths.len() {
        let mut health = *healths.at(i);
        health.current = core::cmp::min(health.current + amount, health.max);
        healed_entities.append(@health);
        i += 1;
    };

    world.write_models(healed_entities.span());
}
```

## Entity Patterns

### Archetype Pattern

Group entities by their component combinations:

```cairo
// Player archetype: has Position, Health, Inventory
fn create_player(ref world: WorldStorage, player: ContractAddress) {
    world.write_model(@Position { entity_id: player.into(), x: 0, y: 0 });
    world.write_model(@Health { entity_id: player.into(), current: 100, max: 100 });
    world.write_model(@Inventory { entity_id: player.into(), slots: 20 });
}

// Enemy archetype: has Position, Health, AI
fn create_enemy(ref world: WorldStorage, entity_id: u32) {
    world.write_model(@Position { entity_id, x: 10, y: 10 });
    world.write_model(@Health { entity_id, current: 50, max: 50 });
    world.write_model(@AI { entity_id, behavior: 1 });
}
```

### Prefab Pattern

Create reusable entity templates:

```cairo
#[generate_trait]
impl EntityFactory of EntityFactoryTrait {
    fn create_warrior(ref world: WorldStorage, entity_id: u32) -> u32 {
        world.write_model(@Character { entity_id, name: "Warrior", class: 1 });
        world.write_model(@Position { entity_id, x: 0, y: 0 });
        world.write_model(@Health { entity_id, current: 150, max: 150 });
        world.write_model(@Combat { entity_id, attack: 20, defense: 15 });
        entity_id
    }

    fn create_mage(ref world: WorldStorage, entity_id: u32) -> u32 {
        world.write_model(@Character { entity_id, name: "Mage", class: 2 });
        world.write_model(@Position { entity_id, x: 0, y: 0 });
        world.write_model(@Health { entity_id, current: 80, max: 80 });
        world.write_model(@Combat { entity_id, attack: 30, defense: 8 });
        world.write_model(@Mana { entity_id, current: 100, max: 100 });
        entity_id
    }
}
```

## Best Practices

### Entity ID Management

1. **Use consistent types**: Stick to `u32` or `felt252` for entity IDs
2. **Avoid ID collisions**: Use UUID generation or proper namespacing
3. **Document ID schemes**: Make it clear how IDs are generated and used

### Component Design

1. **Single responsibility**: Each model should represent one aspect of an entity
2. **Avoid deep nesting**: Keep models flat for better performance
3. **Use appropriate keys**: Choose between entity-based and composite keys wisely

### Performance Considerations

1. **Batch operations**: Use bulk read/write for multiple entities
2. **Avoid unnecessary queries**: Check component existence before operations
3. **Use field operations**: Update specific fields rather than entire models

### Code Organization

1. **Group related models**: Keep entity-related models together
2. **Use traits for common operations**: Create traits for entity lifecycle management
3. **Document relationships**: Make entity relationships clear in code comments
