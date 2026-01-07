---
name: dojo-test
description: Write tests for Dojo models and systems using spawn_test_world, cheat codes, and assertions. Use when testing game logic, verifying state changes, or ensuring system correctness.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo Test Generation

Write comprehensive tests for your Dojo models and systems using Cairo's test framework and Dojo's cheat codes.

## When to Use This Skill

- "Write tests for the move system"
- "Test the Position model"
- "Add unit tests for combat logic"
- "Create integration tests"

## What This Skill Does

Generates test files with:
- `spawn_test_world()` setup
- Model and system registration
- Test functions with assertions
- Cheat code usage (warp, prank, etc.)
- State verification

## Quick Start

**Interactive mode:**
```
"Write tests for the spawn system"
```

I'll ask about:
- What to test (models, systems, or both)
- Test scenarios (happy path, edge cases)
- State assertions needed

**Direct mode:**
```
"Test that the move system correctly updates Position"
```

## Test Structure

### Basic Test Pattern

```cairo
#[cfg(test)]
mod tests {
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::world::WorldStorageTrait;
    use dojo_cairo_test::{spawn_test_world, NamespaceDef, TestResource};
    use super::{Position, IActionsDispatcher, IActionsDispatcherTrait};

    #[test]
    fn test_spawn() {
        // 1. Set up test world
        let ndef = NamespaceDef {
            namespace: "dojo",
            resources: [
                TestResource::Model(m_Position::TEST_CLASS_HASH),
                TestResource::Contract(actions::TEST_CLASS_HASH),
            ].span()
        };
        let mut world = spawn_test_world([ndef].span());

        // 2. Deploy system
        let actions_address = world.deploy_contract("actions", actions::TEST_CLASS_HASH);
        let actions = IActionsDispatcher { contract_address: actions_address };

        // 3. Execute action
        actions.spawn();

        // 4. Verify results
        let player = starknet::get_caller_address();
        let position: Position = world.read_model(player);
        assert(position.x == 0, 'wrong x');
        assert(position.y == 0, 'wrong y');
    }
}
```

## Test Types

### Unit Tests
Test individual functions:
```cairo
#[test]
fn test_model_creation() {
    let position = Position { player: 0x123.try_into().unwrap(), x: 5, y: 10 };
    assert(position.x == 5, 'x should be 5');
}
```

### Integration Tests
Test systems with models:
```cairo
#[test]
fn test_spawn_and_move() {
    // Setup world
    let mut world = spawn_test_world(...);

    // Test spawn
    actions.spawn();
    let pos: Position = world.read_model(player);
    assert(pos.x == 0, 'spawn at origin');

    // Test move
    actions.move(Direction::Right);
    let pos: Position = world.read_model(player);
    assert(pos.x == 1, 'moved right');
}
```

### Edge Case Tests
Test boundaries and limits:
```cairo
#[test]
fn test_health_cannot_go_negative() {
    // Attack with more damage than health
    actions.attack(target, 9999);

    let health: Health = world.read_model(target);
    assert(health.current == 0, 'health floored at 0');
}
```

## Cheat Codes

### Time Manipulation

**warp:** Set block timestamp
```cairo
use dojo_cairo_test::warp;

warp(world, 1000); // Set timestamp to 1000
actions.process_tick();
```

**roll:** Set block number
```cairo
use dojo_cairo_test::roll;

roll(world, 100); // Set block number to 100
```

### Identity Manipulation

**prank:** Impersonate caller
```cairo
use dojo_cairo_test::prank;

let player1 = starknet::contract_address_const::<0x123>();
prank(world, player1); // Next call from player1

actions.spawn();
```

**start_prank / stop_prank:** Multiple calls
```cairo
start_prank(world, player1);
actions.spawn();
actions.move(Direction::Up);
stop_prank(world);
```

### Contract Calls

**spawn:** Deploy contract
```cairo
let contract_addr = world.deploy_contract("name", class_hash);
```

## Common Test Patterns

### Test Model Read/Write
```cairo
#[test]
fn test_position_persistence() {
    let mut world = spawn_test_world(...);

    // Write
    world.write_model(@Position { player: 0x123.try_into().unwrap(), x: 5, y: 10 });

    // Read
    let pos: Position = world.read_model(0x123.try_into().unwrap());
    assert(pos.x == 5, 'x persisted');
    assert(pos.y == 10, 'y persisted');
}
```

### Test System Authorization
```cairo
#[test]
#[should_panic(expected: ('not authorized',))]
fn test_only_owner_can_call() {
    let mut world = spawn_test_world(...);

    let unauthorized = starknet::contract_address_const::<0x999>();
    prank(world, unauthorized);

    actions.admin_function(); // Should panic
}
```

### Test State Transitions
```cairo
#[test]
fn test_level_up() {
    let mut world = spawn_test_world(...);

    // Initial state
    let xp: Experience = world.read_model(player);
    assert(xp.level == 1, 'starts at level 1');

    // Gain XP
    actions.gain_xp(1000);

    // Verify level up
    let xp: Experience = world.read_model(player);
    assert(xp.level == 2, 'leveled up');
}
```

### Test Multiple Players
```cairo
#[test]
fn test_combat_between_players() {
    let mut world = spawn_test_world(...);

    let player1 = starknet::contract_address_const::<0x111>();
    let player2 = starknet::contract_address_const::<0x222>();

    // Player 1 spawns
    prank(world, player1);
    actions.spawn();

    // Player 2 spawns
    prank(world, player2);
    actions.spawn();

    // Player 1 attacks Player 2
    prank(world, player1);
    actions.attack(player2);

    // Verify damage
    let health: Health = world.read_model(player2);
    assert(health.current < 100, 'took damage');
}
```

## Best Practices

- Test happy paths first, then edge cases
- Use descriptive test names (`test_spawn_places_player_at_origin`)
- Add clear assertion messages ('wrong x', 'health not updated')
- Test state before and after actions
- Use cheat codes to set up test scenarios
- Group related tests in modules
- Test failure cases with `#[should_panic]`

## Test Organization

```
src/
└── tests/
    ├── test_models.cairo      # Model unit tests
    ├── test_spawn.cairo       # Spawn system tests
    ├── test_movement.cairo    # Movement system tests
    ├── test_combat.cairo      # Combat system tests
    └── test_integration.cairo # Full workflow tests
```

## Running Tests

```bash
# Run all tests
sozo test

# Run specific test
sozo test test_spawn

# Run with output
sozo test -- --nocapture
```

## Next Steps

After writing tests:
1. Use `dojo-review` skill to verify test coverage
2. Run tests before deploying with `dojo-deploy`
3. Add tests when making changes to ensure no regressions

## Related Skills

- **dojo-model**: Create models to test
- **dojo-system**: Create systems to test
- **dojo-review**: Review test coverage
- **dojo-deploy**: Deploy after tests pass
