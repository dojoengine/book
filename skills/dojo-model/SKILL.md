---
name: dojo-model
description: "Create Dojo models in Cairo for storing game state with key definitions, trait derivations, and ECS composition patterns. Define player-owned entities, composite keys, singletons, and nested structs. Use when defining game entities, components, state structures, or data schemas."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo Model Generation

Create Dojo models that define game state using Entity Component System (ECS) patterns.

## Model Structure

Models are Cairo structs annotated with `#[dojo::model]`, acting as a key-value store where `#[key]` fields define the lookup key.

```cairo
use starknet::ContractAddress;

#[derive(Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

**Required traits:** `Drop`, `Serde`
**Optional traits:** `Copy` (for primitive types that need copying)

## Model Patterns

### Player-Owned Model
```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Drop, Copy, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32,
}
```

Custom nested structs must derive `Introspect` for Dojo to understand their structure.

### Composite Keys
Multiple keys for relationships — all keys must be provided when reading:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameResource {
    #[key]
    player: ContractAddress,
    #[key]
    location: ContractAddress,
    balance: u8,
}

// Read with tuple of all keys
let resource: GameResource = world.read_model((player, location));
```

### Global Singleton
Constant key for global settings:
```cairo
const RESPAWN_DELAY: u128 = 9999999999999;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameSetting {
    #[key]
    setting_id: u128,
    setting_value: felt252,
}

world.write_model(@GameSetting {
    setting_id: RESPAWN_DELAY,
    setting_value: (10 * 60).into()
});
```

### ECS Composition
Small, focused models that can be combined on entities:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position { #[key] id: u32, x: u32, y: u32 }

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Health { #[key] id: u32, health: u8 }

// Human has Position + Health + Potions
// Orc has Position + Health (no Potions)
```

## Key Rules

1. **At least one key required** — every model needs a `#[key]` field
2. **Keys must come first** — all key fields before data fields
3. **Keys are not stored** — used only for indexing/lookup
4. **All keys required for read** — composite keys must all be provided

## Model API

```cairo
use dojo::model::{ModelStorage, ModelValueStorage};

let mut world = self.world_default();

// Write
world.write_model(@Position { player, vec: Vec2 { x: 0, y: 0 } });

// Read
let position: Position = world.read_model(player);

// Read with composite key
let resource: GameResource = world.read_model((player, location));

// Generate unique ID
let entity_id = world.uuid();
world.write_model(@Health { id: entity_id, health: 100 });
```

## Field Types

| Type | Use for |
|------|---------|
| `u8`, `u16`, `u32`, `u64`, `u128`, `u256` | Unsigned integers |
| `felt252` | Field elements, hashes |
| `bool` | Flags, toggles |
| `ContractAddress` | Starknet addresses |
| Custom structs | Must derive `Introspect` |
| Custom enums | Must derive `Introspect` |

## Verification

After creating models, verify they compile:

```bash
sozo build
```

## Related Skills

- **dojo-system**: Create systems that read and write these models
- **dojo-test**: Test model read/write operations
- **dojo-init**: Initialize project structure first
- **dojo-review**: Review model design patterns
