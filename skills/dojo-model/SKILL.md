---
name: dojo-model
description: Create Dojo models for storing game state with proper key definitions, trait derivations, and ECS patterns. Use when defining game entities, components, or state structures.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo Model Generation

Create Dojo models that define your game's state using Entity Component System (ECS) patterns.

## When to Use This Skill

- "Add a Position model"
- "Create a Player entity with health and level"
- "Generate an Inventory model"
- "Define a model for [game concept]"

## What This Skill Does

Generates Cairo model structs with:
- `#[dojo::model]` attribute
- Proper trait derivations (Drop, Serde, Copy)
- Key field configuration (#[key])
- Field types appropriate to your data
- Optional: Model tests

## Quick Start

**Interactive mode:**
```
"Add a model for player positions"
```

I'll ask about:
- Model name
- Key fields (what makes it unique)
- Data fields and their types
- Whether to generate tests

**Direct mode:**
```
"Create a Position model with player as key and x, y coordinates"
```

## Model Patterns

### Entity Component
Small, focused models for specific aspects:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Position {
    #[key]
    pub entity_id: u32,
    pub x: u32,
    pub y: u32,
}
```

### Player-Owned
Models keyed by player address:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Inventory {
    #[key]
    pub player: ContractAddress,
    pub gold: u32,
    pub items: u8,
}
```

### Composite Keys
Multiple keys for relationships:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Tile {
    #[key]
    pub x: u32,
    #[key]
    pub y: u32,
    pub terrain_type: u8,
}
```

### Global Singleton
Constant key for global state:
```cairo
const GAME_CONFIG: u128 = 999999;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Config {
    #[key]
    pub config_id: u128,
    pub max_players: u8,
}
```

## Key Concepts

**#[key] Attribute:**
- Defines how models are indexed
- At least one key required
- Keys must come before data fields
- Keys not stored, used for lookup only

**Required Traits:**
- `Drop` - Cairo ownership
- `Serde` - Serialization
- `Copy` - For copyable types (optional)

**Field Types:**
- `u8`, `u32`, `u128` - Unsigned integers
- `felt252` - Field elements
- `bool` - Booleans
- `ContractAddress` - Addresses
- Custom enums (with Introspect)

## Model API

### Write a Model
```cairo
world.write_model(@Position { entity_id: 1, x: 10, y: 20 });
```

### Read a Model
```cairo
let position: Position = world.read_model(entity_id);
```

### Update a Model
```cairo
let mut position: Position = world.read_model(entity_id);
position.x += 1;
world.write_model(@position);
```

## Best Practices

- Keep models small and focused (one concern per model)
- Use appropriate key patterns (single, composite, constant)
- Choose smallest sufficient type (u8 vs u32 vs u128)
- Name fields clearly
- Add doc comments for complex models

## Next Steps

After creating models:
1. Use `dojo-system` skill to create systems that use your models
2. Use `dojo-test` skill to test model read/write operations
3. Use `dojo-config` skill to ensure models are registered

## Related Skills

- **dojo-system**: Create systems that use these models
- **dojo-test**: Test your models
- **dojo-init**: Initialize project first
- **dojo-review**: Review model design
