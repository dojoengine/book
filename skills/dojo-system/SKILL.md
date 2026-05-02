---
name: dojo-system
description: "Create Dojo systems in Cairo that implement game logic, read and write model state, emit events, and handle player actions. Use when building game mechanics, implementing combat or movement systems, creating player commands, or adding automated game logic."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo System Generation

Create Dojo systems (smart contracts) that implement game logic and modify model state.

## Import Reference

| You want to use | Import this |
|----------------|-------------|
| `world.read_model()` / `world.write_model()` | `use dojo::model::{ModelStorage, ModelValueStorage};` |
| `world.emit_event()` | `use dojo::event::EventStorage;` |
| `self.world_default()` | Nothing — provided by `#[dojo::contract]` |
| `get_caller_address()` | `use starknet::get_caller_address;` |

## Complete System Example

```cairo
use dojo_starter::models::{Direction, Position};

// Define the interface
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
    fn move(ref self: T, direction: Direction);
}

// Dojo contract
#[dojo::contract]
pub mod actions {
    use super::{IActions, Direction, Position};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{Vec2, Moves};
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct Moved {
        #[key]
        pub player: ContractAddress,
        pub direction: Direction,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            let mut world = self.world_default();
            let player = get_caller_address();

            let position: Position = world.read_model(player);

            let new_position = Position {
                player,
                vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
            };
            world.write_model(@new_position);

            let moves = Moves {
                player,
                remaining: 100,
                last_direction: Direction::None(()),
                can_move: true
            };
            world.write_model(@moves);
        }

        fn move(ref self: ContractState, direction: Direction) {
            let mut world = self.world_default();
            let player = get_caller_address();

            let position: Position = world.read_model(player);
            let mut moves: Moves = world.read_model(player);

            moves.remaining -= 1;
            moves.last_direction = direction;

            let next = next_position(position, direction);

            world.write_model(@next);
            world.write_model(@moves);
            world.emit_event(@Moved { player, direction });
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    }
}

fn next_position(mut position: Position, direction: Direction) -> Position {
    match direction {
        Direction::None => { return position; },
        Direction::Left => { position.vec.x -= 1; },
        Direction::Right => { position.vec.x += 1; },
        Direction::Up => { position.vec.y -= 1; },
        Direction::Down => { position.vec.y += 1; },
    };
    position
}
```

## System Design Patterns

### Input Validation
Validate inputs before modifying state:
```cairo
fn move(ref self: ContractState, direction: Direction) {
    let mut world = self.world_default();
    let player = get_caller_address();

    let moves: Moves = world.read_model(player);
    assert(moves.remaining > 0, 'No moves remaining');
    assert(moves.can_move, 'Movement disabled');

    // Proceed with movement
}
```

### Event Emission
Define events with `#[dojo::event]` and emit after state changes:
```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct PlayerMoved {
    #[key]
    pub player: ContractAddress,
    pub from: Vec2,
    pub to: Vec2,
}

// Inside a function
world.emit_event(@PlayerMoved { player, from: old_pos, to: new_pos });
```

### Single Responsibility
Each system should have one clear purpose:
- `MovementSystem`: Handles player/entity movement
- `CombatSystem`: Manages battles and damage
- `InventorySystem`: Manages items

### Stateless Design
Systems read state from models, apply logic, write back:
```cairo
fn attack(ref self: ContractState, target: ContractAddress) {
    let mut world = self.world_default();
    let attacker = get_caller_address();

    let attacker_stats: Combat = world.read_model(attacker);
    let mut target_stats: Combat = world.read_model(target);

    target_stats.health = if target_stats.health > attacker_stats.damage {
        target_stats.health - attacker_stats.damage
    } else {
        0
    };

    world.write_model(@target_stats);
}
```

## Permissions

Systems need writer permission to modify models. Configure in `dojo_dev.toml`:
```toml
[writers]
# Namespace-level access
"my_namespace" = ["my_namespace-actions"]

# Or specific model access
"my_namespace-Position" = ["my_namespace-actions"]
"my_namespace-Moves" = ["my_namespace-actions"]
```

## Verification

After creating a system, verify it compiles:

```bash
sozo build
sozo test
```

## Related Skills

- **dojo-model**: Define models used by systems
- **dojo-test**: Test system logic
- **dojo-review**: Review system implementation
- **dojo-deploy**: Deploy systems to network
