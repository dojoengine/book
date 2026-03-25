---
name: dojo-review
description: "Review Dojo Cairo code for security vulnerabilities, ECS anti-patterns, gas optimization, and test coverage gaps. Audit models, systems, and permissions before deployment. Use when reviewing code, auditing contracts, checking for common mistakes, or preparing for mainnet."
allowed-tools: Read, Grep, Glob
---

# Dojo Code Review

Analyze Dojo projects for security issues, anti-patterns, gas optimization, and test coverage gaps.

## Review Workflow

1. Read the project's models, systems, and tests
2. Check each category below
3. Report findings with specific file locations and fixes
4. Verify fixes compile: `sozo build`

## Model Review

**Check for:**
- Required trait derivations (`Drop`, `Serde`)
- `#[key]` fields defined and placed before data fields
- Small, focused models following ECS principles
- Custom nested structs derive `Introspect`
- Appropriate field type sizes

```cairo
// ❌ Keys after data fields
struct Example {
    data: u32,
    #[key]
    id: u32,
}

// ✅ Keys first, required traits
#[derive(Drop, Serde)]
#[dojo::model]
struct Example {
    #[key]
    id: u32,
    data: u32,
}
```

## System Review

**Check for:**
- `#[starknet::interface]` and `#[dojo::contract]` attributes
- World access uses correct namespace via `self.world_default()`
- Input validation on all parameters
- Events emitted for state changes
- Clear error messages in assertions

```cairo
// ❌ No input validation, no authorization
fn set_health(ref self: ContractState, health: u8) {
    // Anyone can call with any value
}

// ✅ Validated and authorized
fn set_health(ref self: ContractState, health: u8) {
    assert(health > 0 && health <= 100, 'invalid health');
    let caller = get_caller_address();
    assert(
        world.is_owner(selector_from_tag!("my_game"), caller),
        'not authorized'
    );
}
```

## Security Review

**Check for:**
- Authorization on sensitive functions
- Integer overflow/underflow protection
- Ownership verification before transfers
- Atomic state consistency

```cairo
// ❌ Integer underflow risk
health.current -= damage;

// ✅ Safe subtraction
health.current = if health.current > damage {
    health.current - damage
} else {
    0
};

// ❌ Missing ownership check on transfer
fn transfer_nft(ref self: ContractState, token_id: u256, to: ContractAddress) {
    let mut nft: NFT = world.read_model(token_id);
    nft.owner = to;
    world.write_model(@nft);
}

// ✅ Ownership verified
fn transfer_nft(ref self: ContractState, token_id: u256, to: ContractAddress) {
    let mut world = self.world_default();
    let caller = get_caller_address();
    let mut nft: NFT = world.read_model(token_id);
    assert(nft.owner == caller, 'not owner');
    nft.owner = to;
    world.write_model(@nft);
}
```

## Gas Optimization

```cairo
// ❌ Duplicate model reads
let pos: Position = world.read_model(player);
let x = pos.x;
let pos2: Position = world.read_model(player);
let y = pos2.y;

// ✅ Single read
let pos: Position = world.read_model(player);
let (x, y) = (pos.x, pos.y);

// ❌ Oversized types for coordinates
x: u128, y: u128

// ✅ Appropriate sizes
x: u32, y: u32
```

## Common Anti-Patterns

### God Models
```cairo
// ❌ Everything in one model
#[dojo::model]
struct Player {
    #[key] player: ContractAddress,
    x: u32, y: u32, health: u8, mana: u8, gold: u32, level: u8, xp: u32,
}

// ✅ Separate concerns (ECS pattern)
Position { player, x, y }
Stats { player, health, mana }
Inventory { player, gold, items }
Progress { player, level, xp }
```

### Missing Events
```cairo
// ❌ State change without event
fn transfer(ref self: ContractState, to: ContractAddress, amount: u256) {
    // Transfer logic but no event — Torii can't index this
}

// ✅ Emit events for indexing
fn transfer(ref self: ContractState, to: ContractAddress, amount: u256) {
    // Transfer logic
    world.emit_event(@Transferred { from, to, amount });
}
```

## Review Checklist

### Models
- [ ] All models derive `Drop` and `Serde`
- [ ] `#[key]` fields come before data fields
- [ ] Models are small and focused (ECS)
- [ ] Custom types derive `Introspect`

### Systems
- [ ] Uses `#[dojo::contract]` and `#[starknet::interface]`
- [ ] Input validation on all parameters
- [ ] Events emitted for important state changes
- [ ] Caller identity verified where needed

### Security
- [ ] Sensitive functions check permissions
- [ ] Integer math handles over/underflow
- [ ] Ownership verified before transfers

### Tests
- [ ] Integration tests for systems
- [ ] Edge cases and boundary values tested
- [ ] Failure cases tested with `#[should_panic]`

## Verification

After fixing issues, confirm the build passes:

```bash
sozo build
sozo test
```

## Related Skills

- **dojo-model**: Fix model design issues
- **dojo-system**: Fix system implementation issues
- **dojo-test**: Add missing test coverage
- **dojo-deploy**: Deploy after review passes
