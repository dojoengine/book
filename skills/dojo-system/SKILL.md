---
name: dojo-system
description: Create Dojo systems that implement game logic, modify model state, and handle player actions. Use when implementing game mechanics, player commands, or automated logic.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo System Generation

Create Dojo systems (smart contracts) that implement your game's logic and modify model state.

## When to Use This Skill

- "Create a spawn system"
- "Add a move system that updates position"
- "Implement combat logic"
- "Generate a system for [game action]"

## What This Skill Does

Generates Cairo system contracts with:
- `#[dojo::contract]` attribute
- Interface definition with `#[dojo::interface]`
- System implementation
- World access (`world.read_model()`, `world.write_model()`)
- Optional: Event emissions
- Optional: Authorization checks
- Optional: System tests

## Quick Start

**Interactive mode:**
```
"Create a system for player movement"
```

I'll ask about:
- System name
- Functions and their parameters
- Models used
- Authorization requirements

**Direct mode:**
```
"Create a move system that updates Position based on Direction"
```

## System Pattern

### Basic System Structure

```cairo
use dojo::model::{ModelStorage, ModelValueStorage};
use dojo::event::EventStorage;

#[dojo::interface]
pub trait IActions {
    fn spawn(ref self: ContractState);
    fn move(ref self: ContractState, direction: Direction);
}

#[dojo::contract]
pub mod actions {
    use super::IActions;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            let mut world = self.world_default();
            let player = get_caller_address();

            // Create initial state
            world.write_model(@Position {
                player,
                x: 0,
                y: 0
            });
        }

        fn move(ref self: ContractState, direction: Direction) {
            let mut world = self.world_default();
            let player = get_caller_address();

            // Read current state
            let mut position: Position = world.read_model(player);

            // Modify state
            match direction {
                Direction::Up => position.y += 1,
                Direction::Down => position.y -= 1,
                Direction::Left => position.x -= 1,
                Direction::Right => position.x += 1,
            }

            // Write updated state
            world.write_model(@position);

            // Emit event
            world.emit_event(@Moved { player, direction });
        }
    }
}
```

## System Types

### Action Systems
Handle player actions:
- spawn, move, attack
- craft, trade, use_item
- Player-triggered logic

### Lifecycle Systems
Manage entity lifecycle:
- spawn_entity, despawn_entity
- initialize, cleanup
- Creation and destruction

### Automated Systems
Time-based or conditional:
- process_turn, tick
- auto_regen, decay
- Background processing

## Core Patterns

### Reading Models
```cairo
let position: Position = world.read_model(player);
```

### Writing Models
```cairo
world.write_model(@Position { player, x: 10, y: 20 });
```

### Updating Models
```cairo
let mut health: Health = world.read_model(entity_id);
health.current -= damage;
world.write_model(@health);
```

### Emitting Events
```cairo
world.emit_event(@PlayerMoved {
    player,
    from: old_pos,
    to: new_pos
});
```

### Authorization
```cairo
// Only owner can call
world.assert_owner(player);

// Only writer can call
world.assert_writer(get_caller_address());
```

## Best Practices

- One system per logical group of actions
- Validate inputs before state changes
- Use `get_caller_address()` for player identity
- Emit events for off-chain tracking
- Keep functions atomic (one clear purpose)
- Add clear error messages with `assert!`

## Common Patterns

### Movement System
```cairo
fn move(ref self: ContractState, direction: Direction) {
    let player = get_caller_address();
    let mut pos: Position = world.read_model(player);

    // Update based on direction
    match direction {
        Direction::Up => pos.y += 1,
        _ => // ...
    }

    world.write_model(@pos);
}
```

### Combat System
```cairo
fn attack(ref self: ContractState, target: u32) {
    let attacker = get_caller_address();

    // Get attacker and target stats
    let atk_stats: Stats = world.read_model(attacker);
    let mut def_health: Health = world.read_model(target);

    // Calculate damage
    let damage = calculate_damage(atk_stats.strength);
    def_health.current -= damage;

    // Update and emit
    world.write_model(@def_health);
    world.emit_event(@AttackEvent { attacker, target, damage });
}
```

### Resource Gathering
```cairo
fn gather(ref self: ContractState, x: u32, y: u32) {
    let player = get_caller_address();

    // Check tile
    let tile: Tile = world.read_model((x, y));
    assert(tile.has_resource, 'no resource here');

    // Update inventory
    let mut inventory: Inventory = world.read_model(player);
    inventory.resources += tile.resource_amount;

    world.write_model(@inventory);
}
```

## Next Steps

After creating systems:
1. Use `dojo-test` skill to test system logic
2. Use `dojo-review` skill to check for issues
3. Use `dojo-deploy` skill to deploy your world
4. Use `dojo-client` skill to call systems from frontend

## Related Skills

- **dojo-model**: Define models used by systems
- **dojo-test**: Test system logic
- **dojo-review**: Review system implementation
- **dojo-deploy**: Deploy systems to network
