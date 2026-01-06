---
name: dojo-review
description: Review Dojo code for best practices, common mistakes, security issues, and optimization opportunities. Use when auditing models, systems, tests, or preparing for deployment.
allowed-tools: Read, Grep, Glob
---

# Dojo Code Review

Review your Dojo code for best practices, potential issues, security concerns, and optimization opportunities.

## When to Use This Skill

- "Review my Dojo code"
- "Check this system for issues"
- "Audit my models"
- "Review before deploying"

## What This Skill Does

Analyzes your code for:
- Model design patterns
- System implementation issues
- Security vulnerabilities
- Gas optimization opportunities
- Test coverage gaps
- Common mistakes

## Quick Start

**Interactive mode:**
```
"Review my Dojo project"
```

I'll ask about:
- What to review (models, systems, tests, all)
- Focus areas (security, performance, best practices)

**Direct mode:**
```
"Review the combat system for security issues"
"Check if my models follow ECS patterns"
```

## Review Categories

### Model Review

**Checks:**
- ✓ Proper trait derivations (Drop, Serde)
- ✓ Key fields defined correctly
- ✓ Appropriate field types
- ✓ Small, focused models (ECS principle)
- ✓ Key patterns match use case

**Common issues:**
```cairo
// ❌ Missing required traits
#[dojo::model]
struct Position { ... }

// ✅ Proper traits
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position { ... }

// ❌ Keys after data fields
struct Example {
    data: u32,
    #[key]
    id: u32,  // Must come first!
}

// ✅ Keys first
struct Example {
    #[key]
    id: u32,
    data: u32,
}
```

### System Review

**Checks:**
- ✓ Proper authorization checks
- ✓ Input validation
- ✓ Correct model read/write patterns
- ✓ Event emissions
- ✓ Error messages
- ✓ Gas efficiency

**Common issues:**
```cairo
// ❌ No authorization check
fn admin_function(ref self: ContractState) {
    // Anyone can call!
}

// ✅ Authorization check
fn admin_function(ref self: ContractState) {
    let world = self.world_default();
    world.assert_owner(get_caller_address());
}

// ❌ No input validation
fn set_health(ref self: ContractState, health: u8) {
    // Could be zero or invalid!
}

// ✅ Input validation
fn set_health(ref self: ContractState, health: u8) {
    assert(health > 0 && health <= 100, 'invalid health');
}
```

### Security Review

**Checks:**
- ✓ Authorization on sensitive functions
- ✓ Reentrancy protection
- ✓ Integer overflow/underflow
- ✓ Access control
- ✓ State consistency

**Common vulnerabilities:**
```cairo
// ❌ Integer underflow
health.current -= damage;  // Could underflow!

// ✅ Safe subtraction
health.current = if health.current > damage {
    health.current - damage
} else {
    0
};

// ❌ Missing permission check
fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
    // Anyone can call!
}

// ✅ Permission check
fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
    let world = self.world_default();
    world.assert_owner(get_caller_address());
}
```

### Gas Optimization

**Checks:**
- ✓ Minimal model reads/writes
- ✓ Efficient data types
- ✓ Unnecessary computations
- ✓ Storage patterns

**Optimization opportunities:**
```cairo
// ❌ Multiple reads
let pos: Position = world.read_model(player);
let x = pos.x;
let pos2: Position = world.read_model(player);  // Duplicate read!
let y = pos2.y;

// ✅ Single read
let pos: Position = world.read_model(player);
let x = pos.x;
let y = pos.y;

// ❌ Oversized types
struct Position {
    #[key]
    player: ContractAddress,
    x: u128,  // Overkill for coordinates!
    y: u128,
}

// ✅ Appropriate types
struct Position {
    #[key]
    player: ContractAddress,
    x: u32,  // Sufficient for most games
    y: u32,
}
```

### Test Coverage

**Checks:**
- ✓ Unit tests for models
- ✓ Unit tests for systems
- ✓ Integration tests
- ✓ Edge case coverage
- ✓ Failure case testing

**Coverage gaps:**
```cairo
// Missing tests:
- ✗ No test for boundary values (max health, zero health)
- ✗ No test for unauthorized access
- ✗ No test for invalid inputs
- ✗ No integration test for full workflow

// Add:
#[test]
fn test_health_bounds() { ... }

#[test]
#[should_panic]
fn test_unauthorized_attack() { ... }

#[test]
fn test_spawn_move_attack_flow() { ... }
```

## Review Checklist

### Models
- [ ] All models have required traits (Drop, Serde)
- [ ] Key fields defined with #[key]
- [ ] Keys come before data fields
- [ ] Models are small and focused (single concern)
- [ ] Field types are appropriate (u8 vs u32 vs u128)
- [ ] Composite keys used correctly (all provided when reading)

### Systems
- [ ] Authorization checks on sensitive functions
- [ ] Input validation for all parameters
- [ ] Clear error messages
- [ ] Events emitted for important actions
- [ ] Model reads minimized
- [ ] State changes are atomic
- [ ] Caller identity verified (get_caller_address)

### Security
- [ ] No public admin functions
- [ ] Integer overflow/underflow handled
- [ ] Access control implemented
- [ ] State changes validated
- [ ] Reentrancy considered

### Performance
- [ ] Minimal storage operations
- [ ] Efficient data types
- [ ] No unnecessary computations
- [ ] Batch operations where possible

### Tests
- [ ] Unit tests for all models
- [ ] Unit tests for all systems
- [ ] Integration tests for workflows
- [ ] Edge cases tested
- [ ] Failure cases tested with #[should_panic]
- [ ] Cheat codes used appropriately

## Best Practices

### Model Design
- Keep models small (ECS principle)
- One model per concept
- Use appropriate key patterns
- Choose smallest sufficient types

### System Implementation
- Validate all inputs
- Check authorization early
- Emit events for tracking
- Write clear error messages
- Keep functions atomic

### Testing
- Test happy paths first
- Add edge case tests
- Test authorization failures
- Use descriptive test names
- Add assertion messages

### Security
- Always check permissions
- Validate user input
- Handle integer math carefully
- Test failure scenarios
- Review before deploying

## Common Anti-Patterns

### God Models
```cairo
// ❌ Everything in one model
#[dojo::model]
struct Player {
    #[key] player: ContractAddress,
    x: u32, y: u32,  // Position
    health: u8, mana: u8,  // Stats
    gold: u32, items: u8,  // Inventory
    level: u8, xp: u32,  // Progress
}

// ✅ Separate concerns
Position { player, x, y }
Stats { player, health, mana }
Inventory { player, gold, items }
Progress { player, level, xp }
```

### Missing Authorization
```cairo
// ❌ No checks
fn set_admin(ref self: ContractState, new_admin: ContractAddress) {
    // Anyone can become admin!
}

// ✅ Check permissions
fn set_admin(ref self: ContractState, new_admin: ContractAddress) {
    let world = self.world_default();
    world.assert_owner(get_caller_address());
}
```

### Inefficient Storage
```cairo
// ❌ Reading same model multiple times
let pos = world.read_model(player);
let health = world.read_model(player);
let mana = world.read_model(player);

// ✅ Read once if possible, or use separate models
let stats = world.read_model(player);  // Single read
```

## Next Steps

After code review:
1. Fix identified issues
2. Add missing tests
3. Re-run review to verify fixes
4. Use `dojo-test` skill to ensure tests pass
5. Use `dojo-deploy` skill when ready

## Related Skills

- **dojo-model**: Fix model issues
- **dojo-system**: Fix system issues
- **dojo-test**: Add missing tests
- **dojo-deploy**: Deploy after review
