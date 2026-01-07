---
title: Upgrades models in Dojo
description: Learn how to upgrade models in Dojo.
---

# Model Upgrades

In Dojo, all models are upgradeable.
When their code changes, the contracts are redeployed to the same address -- preserving the existing model storage and data.

Upgrading is safe as long as the changes do not affect the existing data layout and schema.
If the layout or the schema has changed, however, the upgrade will fail.

Suppose we have a model called `Player` that represents player information:

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    player_id: u64,
    username: ByteArray,
    score: u32,
}
```

Now, let's say we want to enhance our system by adding a new field called `level`.

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    player_id: u64,
    username: ByteArray,
    score: u32,
    level: u8, // New field
}
```

When we re-deploy the contract using Sozo, our data remains intact.
Retrieving player information using the original fields works seamlessly.
For example, querying `player_id = 123` with `username = "Alice"` and `score = 100` still provides accurate results.

In addition, post-upgrade, we can now store the `level` value for the `Player`.

:::info
When you upgrade a model, Dojo checks that the new model definition is compatible with the existing data layout.
If the upgrade would break existing data, the upgrade will fail.
:::

## General rules

- To be upgradeable, the layout of a model must not be packed (using `IntrospectPacked`).

- For composite data structures like `struct`, `enum`, `tuple` and `array`:

    - they are upgreadable as long as all their elements are upgreadable
    - existing elements cannot be removed, only modified
    - new elements can be freely added.

- Each element of a data structure must keep the same type (i.e a `tuple` must remain a `tuple`), the same name and
  the same attributes if any (such as `#[key]` for model members).

- A primitive type can be upgraded to a larger primitive type as long as its `felt252` representation does not change
  (`u8` to `u128`, but not `u128` to `u256`).

- A key model member is upgradeable only if its type is an upgreadable primitive or an enum with new variants only (existing variants cannot be
  modified for a key member).

- The new fields must be added at the end of the model to ease the upgrade checks in Cairo.

## Primitive upgrades

This table lists the allowed upgrades for every primitive type.

:::note
The type `usize` is not supported since it is a architecture-dependent type.
:::

| Current         | Allowed upgrades                                |
| --------------- | ----------------------------------------------- |
| bool            | bool, felt252                                   |
| u8              | u8 to u128, felt252                             |
| u16             | u16 to u128, felt252                            |
| u32             | u32 to u128, felt252                            |
| u64             | u64 and u128, felt252                           |
| u128            | u128, felt252                                   |
| u256            | u256                                            |
| i8              | i8 to i128, felt252                             |
| i16             | i16 to i128, felt252                            |
| i32             | i32 to i128, felt252                            |
| i64             | i64 and i128, felt252                           |
| i128            | i128, felt252                                   |
| felt252         | felt252, ClassHash, ContractAddress             |
| ClassHash       | felt252, ClassHash, ContractAddress             |
| ContractAddress | felt252, ClassHash, ContractAddress             |
| EthAddress      | felt252, ClassHash, ContractAddress, EthAddress |

## Upgrade Examples

### Safe Upgrades

These upgrades preserve existing data and are allowed:

```cairo
// Version 1
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u32,
}

// Version 2 - Adding new fields (safe)
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u32,
    level: u8,       // New field
    experience: u64, // New field
}

// Version 3 - Expanding primitive types (safe)
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u64,      // Expanded from u32 to u64
    level: u8,
    experience: u64,
}
```

### Unsafe Upgrades

These upgrades would break existing data and are not allowed:

```cairo
// Version 1
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u32,
}

// UNSAFE: Removing fields
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    // name: ByteArray,  // Removed - would break upgrade
    score: u32,
}

// UNSAFE: Changing field types incompatibly
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u256,    // Changed from u32 to u256 - incompatible
}

// UNSAFE: Reordering fields
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    score: u32,     // Moved before name
    name: ByteArray, // Moved after score
}
```

### Enum Upgrades

Enums can be upgraded by adding new variants:

```cairo
// Version 1
#[derive(Drop, Serde, Introspect)]
enum PlayerClass {
    Warrior,
    Mage,
}

// Version 2 - Adding new variants (safe)
#[derive(Drop, Serde, Introspect)]
enum PlayerClass {
    Warrior,
    Mage,
    Archer,     // New variant
    Rogue,      // New variant
}

// UNSAFE: Removing or reordering variants
#[derive(Drop, Serde, Introspect)]
enum PlayerClass {
    Mage,       // Reordered - would break upgrade
    Warrior,    // Reordered - would break upgrade
}
```

## Migration Strategies

### Planning for Upgrades

1. **Design for evolution**: Plan your model structure to accommodate future changes
2. **Use versioning**: Include version fields in models that may need complex upgrades
3. **Separate concerns**: Keep stable data separate from frequently changing data

```cairo
// Good: Separate stable and changeable data
#[derive(Drop, Serde)]
#[dojo::model]
struct PlayerCore {
    #[key]
    id: u32,
    name: ByteArray,
    created_at: u64,
}

#[derive(Drop, Serde)]
#[dojo::model]
struct PlayerStats {
    #[key]
    player_id: u32,
    version: u8,    // For future migrations
    level: u32,
    experience: u64,
    health: u32,
}
```

### Handling Breaking Changes

When you need to make breaking changes, consider these strategies:

#### 1. Create New Models

```cairo
// Create new v2 model going forward
#[derive(Drop, Serde)]
#[dojo::model]
struct PlayerV2 {
    #[key]
    id: u32,
    // New structure
    profile: PlayerProfile,
    stats: PlayerStats,
}

// Keep old model for backward compatibility
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    id: u32,
    name: ByteArray,
    score: u32,
}
```

#### 2. Use Migration Systems

Create systems to migrate data from old to new models:

```cairo
#[dojo::contract]
mod migration {
    use super::{Player, PlayerV2};

    #[abi(embed_v0)]
    impl MigrationImpl of IMigration<ContractState> {
        fn migrate_player(ref self: ContractState, player_id: u32) {
            let mut world = self.world(@"my_game");

            // Read old model
            let old_player: Player = world.read_model(player_id);

            // Create new model
            let new_player = PlayerV2 {
                id: old_player.id,
                profile: PlayerProfile {
                    name: old_player.name,
                    // ... other fields
                },
                stats: PlayerStats {
                    score: old_player.score,
                    // ... other fields
                },
            };

            // Write new model
            world.write_model(@new_player);

            // Optionally remove old model
            world.erase_model(@old_player);
        }
    }
}
```

## Best Practices

### Model Design

1. **Start with unpacked models**: Use `Introspect` for new models to maintain flexibility
2. **Group stable fields**: Keep frequently changing fields separate from stable ones
3. **Use appropriate types**: Don't over-size fields, but leave room for growth
4. **Document constraints**: Clearly document which fields can be changed

### Upgrade Process

1. **Test upgrades locally**: Always test model upgrades in a development environment
2. **Gradual rollout**: Consider phased upgrades for critical systems
3. **Monitor compatibility**: Use tools to validate upgrade compatibility
4. **Backup data**: Ensure you can recover if an upgrade fails

### Common Upgrade Failures

1. **Layout conflicts**: Changing from packed to unpacked layout
2. **Type incompatibility**: Upgrading to incompatible types
3. **Field removal**: Trying to remove existing fields
4. **Key changes**: Modifying key field types or order

By following these guidelines and understanding the upgrade constraints, you can design models that evolve safely with your application while preserving existing data.
