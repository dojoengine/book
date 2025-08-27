---
title: "World Contract"
description: "The World contract - your application's central database and orchestrator for models, systems, and permissions in Dojo"
---

# World Contract

The [World contract](https://github.com/dojoengine/dojo/tree/main/crates/dojo/core/src/world) is the beating heart of every Dojo application. Think of it as a sophisticated database and orchestrator that manages all your models, systems, and permissions while providing a unified interface for your autonomous world.

![World Contract Overview](/framework/world/world-map.png)

## What is the World Contract?

The World contract serves as:

- **Central Database**: Stores all your application's models and their data
- **Permission Manager**: Controls who can write to your models
- **Event Hub**: Emits events for state changes and custom events
- **Resource Registry**: Manages models, systems, and contracts within namespaces
- **Upgrade Coordinator**: Handles safe upgrades of your application components

```cairo
// Every Dojo system gets access to the world
let mut world = self.world(@"my_namespace");

// Read a model
let position: Position = world.read_model(player);

// Write a model
world.write_model(@position);

// Emit an event
world.emit_event(@Moved { player, direction });
```

## Core Concepts

### Resources and Namespaces

In Dojo, everything is a **resource** - models, systems, events, and even the world itself. Resources are organized within **namespaces** to prevent conflicts and enable modular development.

```cairo
// Resources are identified by their namespace and name
let world = self.world(@"my_namespace");

// Cairo's type system infers we want the Position model
let position: Position = world.read_model(player);
```

#### Resource Tags and Selectors

Resources in Dojo are identified by **tags**, which follow the `namespace-resource` format.
Tags provide a human-readable way to reference resources in code.

```cairo
// Resource tags follow the "namespace-resource" format
// Examples:
// - "dojo_starter-Position" (Position model in dojo_starter namespace)
// - "my_game-PlayerStats" (PlayerStats model in my_game namespace)
// - "dojo_starter-actions" (actions contract in dojo_starter namespace)

// Use tags with selector_from_tag! for permissions
world.grant_writer(selector_from_tag!("my_game-Position"), address);
world.grant_owner(selector_from_tag!("my_game-PlayerStats"), address);
```

**Tag Structure:**
- **Namespace**: The logical grouping (e.g., `"my_game"`, `"dojo_starter"`)
- **Separator**: Always a hyphen (`-`)
- **Resource Name**: The specific resource (e.g., `"Position"`, `"PlayerStats"`)

**Common Tag Patterns:**
```cairo
// Namespace tag (for namespace-level permissions)
"namespace"               // e.g., "my_game"

// Model tags
"namespace-ModelName"     // e.g., "my_game-Position"

// System tags (contract names)
"namespace-ContractName"  // e.g., "my_game-actions"

// Event tags
"namespace-EventName"     // e.g., "my_game-PlayerMoved"
```

**Selectors:**

Tags are converted to `felt252` **selectors** using `selector_from_tag!`, which computes:
```
resource_selector = poseidon_hash(
    poseidon_string_hash(resource_namespace),
    poseidon_string_hash(resource_name)
)
```

:::tip
The world itself is a special resource, with the resource selector `0`.
:::

### Entity-Component-System (ECS) Architecture

The World contract implements the ECS pattern:

- **Entities**: Unique identifiers (often player addresses or generated IDs)
- **Components**: Your models (Position, Health, Inventory, etc.)
- **Systems**: Functions that operate on components

```cairo
// Entity: player address
let player = get_caller_address();

// Components: models attached to the entity
let position: Position = world.read_model(player);
let health: Health = world.read_model(player);

// Systems: functions that modify components
world.write_model(@updated_position);
```

### Permissions and Security

The World contract implements a resource-based permission system with two permission types:

- **Owner**: Can manage resources, grant permissions, and upgrade resources
- **Writer**: Can write data into resource storage

**Resource Hierarchy** (order of precedence):
1. **World** → Can access all resources
2. **Namespace** → Can access all resources in that namespace
3. **Model/Contract/Event** → Can access the specific resource

**Key Points**:
- Reading is always permissionless
- Writing requires Writer permission on the resource or its namespace
- When you deploy to a world, you automatically become owner of your namespace

## Getting Started

### Basic World Access

Every Dojo system gets access to the world through the namespace-specific `world()` function:

```cairo
#[dojo::contract]
mod actions {
    use super::IActions;
    use dojo::model::ModelStorage;
    use dojo::world::WorldStorage;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            // Access world with your namespace
            let mut world = self.world(@"my_game");

            // Now you can read models (always allowed) and write models (requires permission)
            let player = get_caller_address();
            let position = Position {
                player,
                vec: Vec2 { x: 0, y: 0 }
            };

            world.write_model(@position);
        }
    }
}
```

### Common Usage Patterns

**Reading Models**:
```cairo
// Single key
let position: Position = world.read_model(player);

// Multiple keys
let resource: GameResource = world.read_model((player, location));
```

**Writing Models**:
```cairo
let mut position: Position = world.read_model(player);
position.vec.x += 1;
world.write_model(@position);
```

**Emitting Events**:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct Moved {
    #[key]
    pub player: ContractAddress,
    pub direction: Direction,
}

world.emit_event(@Moved { player, direction });
```

## Key Benefits

### Unified Interface

Instead of managing multiple contracts and their interactions, you have one consistent interface:

```cairo
// All operations go through the world
world.read_model(keys);
world.write_model(@model);
world.emit_event(@event);
```

### Automatic Indexing

The World contract automatically emits events for all state changes, enabling automatic indexing by [Torii](/toolchain/torii) for your frontend applications.

### Upgradeable Architecture

Components can be upgraded safely without breaking existing functionality or losing data:

```bash
# Make changes to your models or systems, then build
sozo build

# Run migrate - automatically detects and upgrades changed resources
sozo migrate
```

The `sozo migrate` command automatically detects which resources have changed and calls the appropriate upgrade functions on the world contract.

### Gas Optimization

The World contract includes several optimizations:

- **Batch Operations**: Write multiple models in one transaction
- **Efficient Storage**: Optimized storage layouts for different data types
- **Permission Caching**: Hierarchical permission checks reduce gas costs

## The World Interface

The World contract exposes a complete interface for external interactions. While you typically use the high-level API in your systems, understanding the full interface helps with advanced use cases:

```cairo
// Generate unique IDs
let new_id = world.uuid();

// Check permissions
let can_write = world.is_writer(resource_selector, address);

// Manage permissions
world.grant_writer(resource_selector, address);
```

## Next Steps

Now that you understand the World contract's role, dive deeper into specific areas:

- **[API Reference](/framework/world/api)** - Complete API documentation with examples
- **[Permissions](/framework/world/permissions)** - Understanding and managing permissions
- **[Events](/framework/world/events)** - Working with the event system
- **[Metadata](/framework/world/metadata)** - Configuring world and resource metadata

## Integration with Other Components

The World contract integrates seamlessly with other Dojo components:

- **[Models](/framework/models)** - Define your data structures
- **[Systems](/framework/systems)** - Implement your game logic
- **[Sozo](/toolchain/sozo)** - Deploy and manage your world
- **[Torii](/toolchain/torii)** - Index and query your world's data

The World contract is your application's foundation - everything else builds on top of it.
