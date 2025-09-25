---
title: "Dojo Systems"
description: "Understanding system design philosophy and principles in Dojo's ECS architecture"
---

# Systems

> Systems = Business Logic in ECS

Systems are the behavioral layer of Dojo's Entity Component System (ECS) architecture.
They encapsulate business logic, orchestrate state changes, and define how your application evolves over time.

## What are Systems?

In Dojo's ECS paradigm, systems represent the **logic** that operates on data stored in models.
While models define **what** your world contains, systems define **how** it behaves.

```
┌─────────────────────────────────────────────────┐
│                    ECS Trinity                  │
├─────────────────────────────────────────────────┤
│  Entities  │  Components  │      Systems        │
│  (Who)     │  (What)      │       (How)         │
├─────────────────────────────────────────────────┤
│  Players   │  Position    │   Movement Logic    │
│  Monsters  │  Health      │   Combat Logic      │
│  Items     │  Inventory   │   Trading Logic     │
└─────────────────────────────────────────────────┘
```

Systems are **stateless functions** that:

- Read current world state from models
- Apply business logic and rules
- Write updated state back to models
- Emit events for external observation

:::warning
In order to write data to the world, a system needs explicit permission from the model owner.
Permissions are defined at the contract (address) level, which means that all the systems inside the same contract will inherit the same permissions.
:::

## System Design Philosophy

### Single Responsibility Principle

Each system should have one clear, focused responsibility.
This promotes modularity, testability, and maintainability.

**Good Examples:**

- `MovementSystem`: Handles player/entity movement
- `CombatSystem`: Manages battles and damage
- `InventorySystem`: Manages item collection and usage
- `TradingSystem`: Handles marketplace transactions

**Poor Examples:**

- `GameSystem`: Handles everything (too broad)
- `PlayerSystem`: Manages movement, combat, and inventory (mixed concerns)

### Stateless Design

Systems should be stateless, deriving all necessary information from the world state.
This ensures predictable behavior and easier testing.

```cairo
// Good: Stateless system
fn attack(ref self: ContractState, target: ContractAddress) {
    let mut world = self.world(@"game");
    let attacker = get_caller_address();

    // Read current state
    let attacker_stats: Combat = world.read_model(attacker);
    let mut target_stats: Combat = world.read_model(target);

    // Apply business logic
    target_stats.health -= attacker_stats.damage;

    // Write updated state
    world.write_model(@target_stats);
}
```

### Minimal Surface Area

Systems should expose only the necessary functions to external callers.
Internal helper functions should be private and focused.

```cairo
#[starknet::interface]
trait IActions<T> {
    // Public interface - minimal and focused
    fn spawn(ref self: T);
    fn move(ref self: T, direction: Direction);
    fn attack(ref self: T, target: ContractAddress);
}

#[generate_trait]
impl InternalImpl of InternalTrait {
    // Private helpers - implementation details
    fn validate_move(self: @ContractState, from: Vec2, to: Vec2) -> bool;
    fn calculate_damage(self: @ContractState, attacker: ContractAddress) -> u32;
}
```

## System Boundaries

### What Systems Should Do

1. **Business Logic**: Implement game rules and mechanics
2. **State Transitions**: Orchestrate changes between valid states
3. **Validation**: Ensure actions comply with game rules
4. **Coordination**: Manage interactions between different models
5. **Event Emission**: Signal important state changes

### What Systems Should Not Do

1. **Data Storage**: Systems don't store persistent state
2. **UI Logic**: Keep presentation concerns separate
3. **External Integration**: Avoid direct external service calls
4. **Complex Calculations**: Delegate to specialized libraries when possible

## System Interaction Models

### Direct Model Access

Systems directly read and write models through the world contract.
This is the most common and efficient pattern.

```cairo
fn spawn(ref self: ContractState) {
    let mut world = self.world(@"game");
    let player = get_caller_address();

    // Direct model access
    let position = Position { player, vec: Vec2 { x: 0, y: 0 } };
    let health = Health { player, value: 100 };

    world.write_model(@position);
    world.write_model(@health);
}
```

### System Composition

Systems can be composed within contracts to create logical groupings.
This allows for shared permissions and coordinated operations.

```cairo
#[dojo::contract]
mod game_actions {
    // Multiple related systems in one contract
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        fn move(ref self: ContractState, direction: Direction) { /* ... */ }
        fn rest(ref self: ContractState) { /* ... */ }
    }

    impl CombatActionsImpl of ICombatActions<ContractState> {
        fn attack(ref self: ContractState, target: ContractAddress) { /* ... */ }
        fn defend(ref self: ContractState) { /* ... */ }
    }
}
```

## System Lifecycle

### Initialization

Systems don't require explicit initialization - they're stateless functions.
However, systems may need to initialize world state on first use.

### Execution

Systems execute in response to external calls or internal triggers.
Each execution should be atomic and leave the world in a valid state.

### Validation

Systems should validate inputs and world state before making changes.
Use Cairo's `assert` mechanism for clear error reporting.

```cairo
fn move(ref self: ContractState, direction: Direction) {
    let mut world = self.world(@"game");
    let player = get_caller_address();

    let moves: Moves = world.read_model(player);
    assert(moves.remaining > 0, 'No moves remaining');
    assert(moves.can_move, 'Movement disabled');

    // Proceed with movement logic
}
```

## Design Patterns

### Command Pattern

Systems often implement the command pattern, where each public function represents a discrete action.

```cairo
// Each function is a command
fn spawn(ref self: ContractState) { /* ... */ }
fn move(ref self: ContractState, direction: Direction) { /* ... */ }
fn attack(ref self: ContractState, target: ContractAddress) { /* ... */ }
```

### State Machine Pattern

Systems can implement state machines for complex entity behaviors.

```cairo
fn process_turn(ref self: ContractState, player: ContractAddress) {
    let mut world = self.world(@"game");
    let mut game_state: GameState = world.read_model(player);

    match game_state.phase {
        GamePhase::Setup => self.handle_setup(player),
        GamePhase::Playing => self.handle_playing(player),
        GamePhase::Ended => self.handle_ended(player),
    }
}
```

## System Testing Philosophy

Systems should be designed for testability:

1. **Pure Functions**: Business logic should be extractable as pure functions
2. **Dependency Injection**: Use world storage abstraction for mocking
3. **Isolated Testing**: Each system should be testable in isolation
4. **Integration Testing**: Test system interactions through the world contract

## Best Practices

1. **Keep Systems Small**: A system should fit in your head
2. **Use Descriptive Names**: Function names should clearly indicate their purpose
3. **Validate Early**: Check preconditions before making changes
4. **Handle Errors Gracefully**: Use meaningful error messages
5. **Document Assumptions**: Make implicit requirements explicit
6. **Test Thoroughly**: Systems are critical paths in your application

## Next Steps

Understanding system design philosophy is crucial for building robust Dojo applications.
Explore the deeper aspects of system implementation:

- **[System Architecture](/framework/systems/architecture)** - Structural patterns and organization
- **[System Coordination](/framework/systems/coordination)** - How systems interact and coordinate

Systems are the heart of your application - design them thoughtfully and they'll serve you well.
