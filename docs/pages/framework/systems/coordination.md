---
title: "System Coordination"
description: "How systems interact, coordinate, and collaborate in Dojo applications"
---

# System Coordination

System coordination is the art of making multiple systems work together harmoniously to create complex, emergent behaviors in your application.
While individual systems handle specific responsibilities, coordination ensures they collaborate effectively to deliver seamless user experiences.

## Coordination Fundamentals

All systems coordinate through the shared world state.
This creates a natural mechanism where systems communicate through data rather than direct calls.

```cairo
use starknet::{ContractAddress, get_caller_address};
use dojo::model::{ModelStorage};
use dojo::world::{WorldStorage, WorldStorageTrait};

// Systems coordinate through shared models
// Movement system updates position
fn move(ref self: ContractState, direction: Direction) {
    let mut world = self.world(@"game");
    let player = get_caller_address();

    let mut position: Position = world.read_model(player);

    // Update position based on direction enum
    match direction {
        Direction::Up => position.vec.y -= 1,
        Direction::Down => position.vec.y += 1,
        Direction::Left => position.vec.x -= 1,
        Direction::Right => position.vec.x += 1,
    }

    world.write_model(@position);  // Other systems can read this
}

// Combat system reads position for range calculations
fn attack(ref self: ContractState, target: ContractAddress) {
    let mut world = self.world(@"game");
    let attacker = get_caller_address();

    let attacker_pos: Position = world.read_model(attacker);
    let target_pos: Position = world.read_model(target);

    let distance = calculate_distance(attacker_pos.vec, target_pos.vec);
    assert(distance <= ATTACK_RANGE, 'Target out of range');

    // Combat logic
}
```

## Coordination Patterns

### Temporal Coordination

Systems coordinate across time through timestamps and sequence numbers.

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct ActionHistory {
    #[key]
    player: ContractAddress,
    last_action: u64,
    action_count: u32,
}

fn coordinated_action(ref self: ContractState) {
    let mut world = self.world(@"game");
    let player = get_caller_address();

    let mut history: ActionHistory = world.read_model(player);
    let current_time = get_block_timestamp();

    // Enforce cooldown coordination
    assert(current_time >= history.last_action + COOLDOWN_DURATION, 'Action on cooldown');

    history.last_action = current_time;
    history.action_count += 1;
    world.write_model(@history);
}
```

### Producer-Consumer Pattern

One system produces data that other systems consume.

```cairo
// Resource system produces resources
#[dojo::contract]
mod resource_system {
    fn generate_resources(ref self: ContractState) {
        let mut world = self.world(@"game");

        // Produce resources at regular intervals
        let mut resource_node: ResourceNode = world.read_model(NODE_ID);
        resource_node.available_resources += GENERATION_RATE;
        world.write_model(@resource_node);
    }
}

// Crafting system consumes resources
#[dojo::contract]
mod crafting_system {
    fn craft_item(ref self: ContractState, recipe: Recipe) {
        let mut world = self.world(@"game");

        // Consume resources for crafting
        let mut resource_node: ResourceNode = world.read_model(NODE_ID);
        assert(resource_node.available_resources >= recipe.required_resources, 'Insufficient resources');

        resource_node.available_resources -= recipe.required_resources;
        world.write_model(@resource_node);

        // Create item
        let item = Item { id: world.uuid(), recipe_id: recipe.id };
        world.write_model(@item);
    }
}
```

### Observer Pattern

Systems observe and react to changes made by other systems.

```cairo
// Health system manages health changes
#[dojo::contract]
mod health_system {
    fn take_damage(ref self: ContractState, amount: u32) {
        let mut world = self.world(@"game");
        let player = get_caller_address();

        let mut health: Health = world.read_model(player);
        health.current = health.current.saturating_sub(amount);

        world.write_model(@health);

        // Emit event for observers
        world.emit_event(@HealthChanged { player, new_health: health.current });
    }
}

// Achievement system observes health changes
#[dojo::contract]
mod achievement_system {
    fn check_survival_achievements(ref self: ContractState, player: ContractAddress) {
        let mut world = self.world(@"game");

        let health: Health = world.read_model(player);
        let mut achievements: PlayerAchievements = world.read_model(player);

        // React to low health
        if health.current <= 1 && !achievements.near_death_unlocked {
            achievements.near_death_unlocked = true;
            world.write_model(@achievements);
        }
    }
}
```

### Coordinator Pattern

A central system coordinates multiple subsystems.

```cairo
#[dojo::contract]
mod turn_coordinator {
    fn process_turn(ref self: ContractState, player: ContractAddress) {
        let mut world = self.world(@"game");

        // Coordinate multiple subsystems in order
        self.process_movement(player);
        self.process_combat(player);
        self.process_resource_generation(player);
        self.process_status_effects(player);

        // Update turn counter
        let mut game_state: GameState = world.read_model(0);
        game_state.current_turn += 1;
        world.write_model(@game_state);
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn process_movement(self: @ContractState, player: ContractAddress) {
            // Movement coordination logic
        }

        fn process_combat(self: @ContractState, player: ContractAddress) {
            // Combat coordination logic
        }

        fn process_resource_generation(self: @ContractState, player: ContractAddress) {
            // Resource coordination logic
        }

        fn process_status_effects(self: @ContractState, player: ContractAddress) {
            // Status effect coordination logic
        }
    }
}
```

### State Machine Pattern

Systems coordinate through well-defined state transitions.

```cairo
#[derive(Copy, Drop, Serde, PartialEq)]
enum GamePhase {
    Setup,
    Playing,
    Paused,
    Ended,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameState {
    #[key]
    game_id: u32,
    phase: GamePhase,
    turn_count: u32,
}

// Systems coordinate through game phase
fn player_action(ref self: ContractState, action: PlayerAction) {
    let mut world = self.world(@"game");
    let game_state: GameState = world.read_model(GAME_ID);

    match game_state.phase {
        GamePhase::Setup => {
            assert(matches!(action, PlayerAction::Join(_)), 'Only join allowed in setup');
            self.handle_join(action);
        },
        GamePhase::Playing => {
            self.handle_gameplay_action(action);
        },
        GamePhase::Paused => {
            assert(matches!(action, PlayerAction::Resume), 'Only resume allowed when paused');
            self.handle_resume();
        },
        GamePhase::Ended => {
            panic!('Game has ended');
        },
    }
}
```

## Best Practices

1. **Design for Coordination**: Consider how systems will interact from the beginning
2. **Use Shared Models**: Design models that multiple systems can use for coordination
3. **Test Coordination Scenarios**: Write tests that verify systems work together correctly

Effective system coordination is essential for creating complex, engaging applications.
By understanding these patterns, you can build systems that work together seamlessly to create emergent behaviors and rich user experiences.
