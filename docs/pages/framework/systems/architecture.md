---
title: "System Architecture"
description: "Structural patterns and organizational strategies for building scalable Dojo systems"
---

# System Architecture

System architecture defines how you structure and organize your systems to create maintainable, scalable, and coherent applications.
Good architecture makes your codebase easier to understand, modify, and extend as your application grows in complexity.

## Architectural Principles

### Separation of Concerns

Each system should have a clear, distinct responsibility that doesn't overlap with other systems.
This makes your codebase more modular and easier to maintain.

```cairo
// Good: Separated concerns
#[dojo::contract]
mod movement_system {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::{ModelStorage};
    use dojo::world::{WorldStorage, WorldStorageTrait};

    fn move(ref self: ContractState, direction: Direction) { /* ... */ }
    fn teleport(ref self: ContractState, target: Vec2) { /* ... */ }
}

#[dojo::contract]
mod combat_system {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::{ModelStorage};
    use dojo::world::{WorldStorage, WorldStorageTrait};

    fn attack(ref self: ContractState, target: ContractAddress) { /* ... */ }
    fn defend(ref self: ContractState) { /* ... */ }
}

#[dojo::contract]
mod inventory_system {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::{ModelStorage};
    use dojo::world::{WorldStorage, WorldStorageTrait};

    fn pickup_item(ref self: ContractState, item_id: u32) { /* ... */ }
    fn drop_item(ref self: ContractState, item_id: u32) { /* ... */ }
}
```

### Dependency Direction

Systems should depend on abstractions (models and world interface) rather than concrete implementations.
This creates a clean dependency flow and makes testing easier.

```
┌─────────────────────────────────────────────────┐
│                 Dependency Flow                 │
├─────────────────────────────────────────────────┤
│  Systems  →  World Contract  →  Models/Events   │
│  (Logic)     (Interface)         (Data)         │
└─────────────────────────────────────────────────┘
```

### Interface Segregation

Design focused interfaces that expose only what's necessary.
Large, monolithic interfaces become difficult to implement and maintain.

```cairo
// Good: Focused interfaces
#[starknet::interface]
trait IMovement<T> {
    fn move(ref self: T, direction: Direction);
    fn get_position(self: @T) -> Vec2;
}

#[starknet::interface]
trait ICombat<T> {
    fn attack(ref self: T, target: ContractAddress);
    fn defend(ref self: T);
}

// Bad: Monolithic interface
#[starknet::interface]
trait IGameActions<T> {
    fn move(ref self: T, direction: Direction);
    fn attack(ref self: T, target: ContractAddress);
    fn craft_item(ref self: T, recipe: Recipe);
    fn trade(ref self: T, other: ContractAddress);
    // ... 20+ functions
}
```

## Structural Patterns

### Single System Per Contract

The simplest pattern: one system per contract.
This provides maximum isolation and permission granularity.

```cairo
// movement.cairo
#[dojo::contract]
mod movement {
    use super::IMovement;

    #[abi(embed_v0)]
    impl MovementImpl of IMovement<ContractState> {
        fn move(ref self: ContractState, direction: Direction) {
            let mut world = self.world(@"game");
            // Movement logic
        }
    }
}

// combat.cairo
#[dojo::contract]
mod combat {
    use super::ICombat;

    #[abi(embed_v0)]
    impl CombatImpl of ICombat<ContractState> {
        fn attack(ref self: ContractState, target: ContractAddress) {
            let mut world = self.world(@"game");
            // Combat logic
        }
    }
}
```

**Benefits:**
- Clear permission boundaries
- Easy to test and deploy independently
- Minimal complexity

**Drawbacks:**
- More contracts to manage
- Potential gas overhead for cross-system operations

### Grouped Systems

Related systems grouped within a single contract.
This pattern balances modularity with operational efficiency.

```cairo
// player_actions.cairo
#[dojo::contract]
mod player_actions {
    use super::{IMovement, ICombat, IInventory};

    #[abi(embed_v0)]
    impl MovementImpl of IMovement<ContractState> {
        fn move(ref self: ContractState, direction: Direction) { /* ... */ }
    }

    #[abi(embed_v0)]
    impl CombatImpl of ICombat<ContractState> {
        fn attack(ref self: ContractState, target: ContractAddress) { /* ... */ }
    }

    #[abi(embed_v0)]
    impl InventoryImpl of IInventory<ContractState> {
        fn pickup_item(ref self: ContractState, item_id: u32) { /* ... */ }
    }
}
```

**Benefits:**
- Shared permissions and internal helpers
- Fewer contracts to manage
- Efficient cross-system operations

**Drawbacks:**
- Larger contract size
- More complex testing
- Potential for tight coupling

### Hierarchical Systems

Systems organized in a hierarchy, where higher-level systems coordinate lower-level ones.

```cairo
// game_coordinator.cairo
#[dojo::contract]
mod game_coordinator {
    use super::IGameCoordinator;

    #[abi(embed_v0)]
    impl CoordinatorImpl of IGameCoordinator<ContractState> {
        fn process_turn(ref self: ContractState, player: ContractAddress) {
            let mut world = self.world(@"game");

            // Coordinate multiple subsystems
            self.handle_movement(player);
            self.handle_combat(player);
            self.handle_resource_generation(player);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn handle_movement(self: @ContractState, player: ContractAddress) { /* ... */ }
        fn handle_combat(self: @ContractState, player: ContractAddress) { /* ... */ }
        fn handle_resource_generation(self: @ContractState, player: ContractAddress) { /* ... */ }
    }
}
```

**Benefits:**
- Clear system orchestration
- Simplified external interface
- Coordinated operations

**Drawbacks:**
- Potential single point of failure
- Complex internal logic
- Harder to extend independently

## Permission Architecture

### Granular Permissions

Assign permissions at the finest grain possible while maintaining operational efficiency.

```cairo
// Each system gets specific permissions
[writers]
"game-Position" = ["game-movement"]
"game-Health" = ["game-combat"]
"game-Inventory" = ["game-inventory"]

// Avoid overly broad permissions
# Bad: Too broad
# "game" = ["game-player_actions"]
```

### Permission Inheritance

Use namespace-level permissions for systems that need broad access.

```cairo
// For systems that coordinate multiple models
[writers]
"game" = ["game-coordinator"]  // Can write to all models in namespace

// For systems with specific access
"game-PlayerStats" = ["game-character_system"]
"game-MarketData" = ["game-trading_system"]
```

### Permission Hierarchies

Design permission hierarchies that reflect your system architecture.

```
World Owner (Admin)
├── Namespace Owner (Game Admin)
│   ├── Coordinator System (Full namespace access)
│   ├── Movement System (Position models)
│   ├── Combat System (Health, Combat models)
│   └── Trading System (Inventory, Market models)
```

## Modular Design

### Core Systems

Identify and implement core systems that provide fundamental functionality.

```cairo
// Core systems that most games need
mod core_systems {
    pub mod identity;      // Player registration and identity
    pub mod movement;      // Position and movement mechanics
    pub mod ownership;     // Asset and item ownership
    pub mod permissions;   // Access control and authorization
}
```

### Domain Systems

Implement domain-specific systems that provide specialized functionality.

```cairo
// Domain-specific systems
mod game_systems {
    pub mod combat;        // Fighting mechanics
    pub mod crafting;      // Item creation
    pub mod trading;       // Marketplace functionality
    pub mod guilds;        // Social organization
}
```

### Extension Systems

Design extension points for adding new functionality without modifying core systems.

```cairo
// Extension system interface
#[starknet::interface]
trait IExtension<T> {
    fn process_event(ref self: T, event: GameEvent);
    fn get_name(self: @T) -> ByteArray;
}

// Extensions can be added without modifying core systems
#[dojo::contract]
mod achievement_extension {
    impl AchievementExtension of IExtension<ContractState> {
        fn process_event(ref self: ContractState, event: GameEvent) {
            // Handle achievement triggers
        }

        fn get_name(self: @ContractState) -> ByteArray {
            "achievements"
        }
    }
}
```

## Composability Patterns

### Mixin Pattern

Use internal traits to compose functionality across systems.

```cairo
#[generate_trait]
impl ValidationMixin of ValidationTrait {
    fn validate_player_exists(self: @ContractState, player: ContractAddress) -> bool {
        let mut world = self.world(@"game");
        let player_data: Player = world.read_model(player);
        player_data.exists
    }

    fn validate_position_in_bounds(self: @ContractState, pos: Vec2) -> bool {
        pos.x < MAX_X && pos.y < MAX_Y
    }
}

// Use in multiple systems
#[dojo::contract]
mod movement {
    impl MovementImpl of IMovement<ContractState> {
        fn move(ref self: ContractState, direction: Direction) {
            let player = get_caller_address();
            assert(self.validate_player_exists(player), 'Player not found');
            // Movement logic
        }
    }
}
```

### Trait Composition

Compose system behavior through trait implementations. Traits allow you to share common functionality across multiple systems.

```cairo
// Define reusable utility traits
#[generate_trait]
impl ValidationMixin of ValidationTrait {
    fn validate_player_exists(self: @ContractState, player: ContractAddress) -> bool {
        let mut world = self.world(@"game");
        let player_data: Player = world.read_model(player);
        player_data.exists
    }

    fn validate_cooldown(self: @ContractState, last_action: u64, cooldown: u64) -> bool {
        get_block_timestamp() >= last_action + cooldown
    }
}

// Systems compose traits for shared functionality
#[dojo::contract]
mod movement {
    impl MovementImpl of IMovement<ContractState> {
        fn move(ref self: ContractState, direction: Direction) {
            let player = get_caller_address();

            // Use trait methods directly
            assert(self.validate_player_exists(player), 'Player not found');

            let mut player_data: Player = world.read_model(player);
            assert(self.validate_cooldown(player_data.last_move, COOLDOWN), 'Move on cooldown');

            // Movement logic...
        }
    }
}

#[dojo::contract]
mod combat {
    impl CombatImpl of ICombat<ContractState> {
        fn attack(ref self: ContractState, target: ContractAddress) {
            let attacker = get_caller_address();

            // Reuse the same validation logic
            assert(self.validate_player_exists(attacker), 'Invalid attacker');
            assert(self.validate_player_exists(target), 'Invalid target');

            // Combat logic...
        }
    }
}
```

## Evolution Strategies

### Migration Patterns

Plan for system upgrades and data migration.

```cairo
#[dojo::contract]
mod migration_system {
    fn migrate_player_data(ref self: ContractState, player: ContractAddress) {
        let mut world = self.world(@"game");

        // Read old format
        let old_data: PlayerV1 = world.read_model(player);

        // Convert to new format
        let new_data = PlayerV2 {
            player: old_data.player,
            level: old_data.level,
            experience: old_data.experience,
            // New fields with defaults
            class: Class::Warrior,
            specialization: Specialization::None,
        };

        // Save new state
        world.erase_model(@old_data);
        world.write_model(@new_data);
    }
}
```

### Backward Compatibility

Maintain compatibility with existing clients during upgrades.

```cairo
#[starknet::interface]
trait IMovementV1<T> {
    fn move(ref self: T, direction: Direction);
}

#[starknet::interface]
trait IMovementV2<T> {
    fn move(ref self: T, direction: Direction);
    fn move_with_modifiers(ref self: T, direction: Direction, modifiers: Span<Modifier>);
}

// Implement both interfaces for backward compatibility
#[dojo::contract]
mod movement_v2 {
    #[abi(embed_v0)]
    impl MovementV1 of IMovementV1<ContractState> {
        fn move(ref self: ContractState, direction: Direction) {
            // Call v2 implementation with empty modifiers
            self.move_with_modifiers(direction, [].span());
        }
    }

    #[abi(embed_v0)]
    impl MovementV2 of IMovementV2<ContractState> {
        fn move(ref self: ContractState, direction: Direction) {
            self.move_with_modifiers(direction, [].span());
        }

        fn move_with_modifiers(ref self: ContractState, direction: Direction, modifiers: Span<Modifier>) {
            // Full v2 implementation
        }
    }
}
```

## Anti-Patterns

### God Systems

Avoid systems that handle too many responsibilities.

```cairo
// Bad: God system
#[dojo::contract]
mod game_system {
    fn handle_everything(ref self: ContractState, action: GameAction) {
        match action {
            GameAction::Move(_) => { /* movement logic */ },
            GameAction::Attack(_) => { /* combat logic */ },
            GameAction::Craft(_) => { /* crafting logic */ },
            GameAction::Trade(_) => { /* trading logic */ },
            // ... 50+ different actions
        }
    }
}
```

### Tight Coupling

Avoid systems that directly depend on each other's implementation details.

```cairo
// Bad: Tight coupling
#[dojo::contract]
mod movement_system {
    fn move(ref self: ContractState, direction: Direction) {
        // Direct dependency on combat system internals
        let combat_system = ICombatDispatcher { contract_address: COMBAT_ADDRESS };
        combat_system.internal_update_position(new_position);
    }
}
```

### Shared Mutable State

Avoid systems that share mutable state outside of the world contract.

```cairo
// Bad: Shared mutable state
static mut GAME_STATE: GameState = GameState::new();

#[dojo::contract]
mod system_a {
    fn action_a(ref self: ContractState) {
        unsafe {
            GAME_STATE.modify();  // Dangerous shared state
        }
    }
}
```

## System Discovery

Systems can be discovered through the world's DNS (Dojo Name System).

```cairo
// Register a system with the world
fn register_system(ref self: ContractState, system_name: ByteArray, class_hash: ClassHash) {
    let mut world = self.world(@"game");

    // Register the system contract
    world.register_contract(0, system_name, class_hash);
}

// Discover systems through DNS
fn find_system(self: @ContractState, system_name: ByteArray) -> Option<ContractAddress> {
    let mut world = self.world(@"game");

    if let Some((address, _)) = world.dns(@system_name) {
        Option::Some(address)
    } else {
        Option::None
    }
}
```

## Best Practices

1. **Start Simple**: Begin with single-system contracts and evolve as needed
2. **Plan Permissions**: Design your permission model before implementing systems
3. **Test Boundaries**: Ensure each system can be tested in isolation
4. **Document Interfaces**: Clearly document what each system does and expects
5. **Version Thoughtfully**: Plan for system evolution from the beginning
6. **Measure Performance**: Monitor gas usage and optimize based on real data

Good system architecture is the foundation of maintainable Dojo applications.
Take time to design your architecture thoughtfully - it will pay dividends as your world grows in complexity.

## Next Steps

- **[System Coordination](/framework/systems/coordination)** - Learn how systems interact and coordinate
