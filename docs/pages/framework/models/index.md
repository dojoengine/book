---
title: Dojo Models
description: Learn about Dojo models, their role in data storage, key attributes, and best practices for model design and upgrades.
---

# Models

> Models = Data

**_TL;DR_**

-   Models store structured data in your world.
-   Models are Cairo structs with automatic on-chain introspection.
-   Use the `#[dojo::model]` attribute to define them.
-   Custom enums and types are supported if they implement [`Introspect` trait](/framework/models/introspect).
-   Define the key(s) using the `#[key]` attribute.
-   Models must have at least one key.

## What are models?

Models are Cairo structs annotated with the `#[dojo::model]` attribute. Consider these models as a key-value store, where the `#[key]` attribute is utilized to define the key. While models can contain any number of fields, adhering to best practices in Entity-Component-System (ECS) design involves maintaining small, isolated models.

This approach fosters modularity and composability, enabling you to reuse models across various entity types.

```rust
#[derive(Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

:::tip
The `#[derive(Drop, Serde)]` traits are required, respectively used by [cairo ownership system](https://book.cairo-lang.org/ch04-01-what-is-ownership.html) then for [serializing](https://book.cairo-lang.org/appendix-03-derivable-traits.html?#serializing-with-serde) model. Missing them will automatically lead to a compilation error. You can add additional traits as needed, for example, the `Copy` trait.
:::

## The #[key] attribute

The `#[key]` attribute indicates to Dojo which fields must be used to index the model. In the previous example, the model is indexed by the `player` field. A field that is identified as a `#[key]` is not stored. It is used by the Dojo database system to uniquely identify the storage location of the model.

**You need to define at least one key for each model**, as this is how you query the model. However, you can create composite keys by defining multiple fields as keys. If you define multiple keys, they must **all** be provided to query the model. **All keys must come before any non-key members in the struct**

```rust
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Resource {
    #[key] // [!code hl]
    player: ContractAddress,
    #[key] // [!code hl]
    location: ContractAddress,
    balance: u8,
}
```

In this case you would then use the [`read_model` command](/framework/world/api.md#read_model) with both the player and location fields:

```rust
let player = get_caller_address();
let location = 0x1234;

world.read_model((player, location));
```

## Example Game Setting models

Suppose we need a place to keep a global value with the flexibility to modify it in the future. Take, for instance, a global `combat_cool_down` parameter that defines the duration required for an entity to be primed for another attack. To achieve this, we can craft a model dedicated to storing this value, while also allowing for its modification via a decentralized governance model.

To establish these models, you'd follow the usual creation method. However, when initializing them, employ a constant identifier, such as GAME_SETTINGS_ID.

```rust
const GAME_SETTINGS_ID: u32 = 9999999999999;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameSettings {
    #[key]
    game_settings_id: u32,
    combat_cool_down: u32,
}
```

### In practice with modularity in mind

Consider a tangible analogy: Humans and Goblins. While they possess intrinsic differences, they share common traits, such as having a position and health. However, humans possess an additional model. Furthermore, we introduce a Counter model, a distinct feature that tallies the numbers of humans and goblins.

```rust
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Potions {
    #[key]
    id: u32,
    quantity: u8,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Health {
    #[key]
    id: u32,
    health: u8,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    id: u32,
    x: u32,
    y: u32
}

// Special counter model
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Counter {
    #[key]
    counter: u32,
    goblin_count: u32,
    human_count: u32,
}
```

So the Human will have a `Potions`, `Health` and `Position` model, and the Goblin will have a `Health` and `Position` model. By doing we save having to create Health and Position models for each entity type.

So then a contract would look like this:

```rust
#[dojo::contract]
mod spawnHuman {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use core::poseidon::poseidon_hash_span;
    use dojo::world::Context;

    use dojo_examples::models::Position;
    use dojo_examples::models::Health;
    use dojo_examples::models::Potions;
    use dojo_examples::models::Counter;

    // we can set the counter value as a const, then query it easily!
    // This pattern is useful for settings.
    const COUNTER_ID: u32 = 9999999999999;

    // As `human_count` and `goblin_count` may have the same value, 
    // we can have a same id for models like `Health` and `Position`, 
    // leading to a same storage location for both goblin and human.
    // To avoid this storage location conflict, we compute an unique
    // id by hashing the id with one of these constants.
    const HUMAN : felt252 = 'HUMAN';
    const GOBLIN : felt252 = 'GOBLIN';

    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl GoblinActionsImpl of IGoblinActions<ContractState> {
        fn goblin_actions(ref self: ContractState, id: u32) {
            let mut world = self.world(@"dojo_starter");

            let counter: Counter = world.read_model(COUNTER_ID);

            let human_count = counter.human_count + 1;
            let goblin_count = counter.goblin_count + 1;

            // spawn a human
            let human_id = poseidon_hash_span([id, HUMAN].span());
            world.write_model(@Health { id: human_id, health: 100 });
            world.write_model(@Position { id: human_id, x: 0, y: 0 });
            world.write_model(@Potions { id: human_id, quantity: 10 });

            // spawn a goblin
            let goblin_id = poseidon_hash_span(
                [goblin_count, GOBLIN].span()
            );
            world.write_model(
                @Health { id: goblin_id, health: 100 }
            );
            world.write_model(
                @Position {
                    id: goblin_id,
                    x: position.x + 10,
                    y: position.y + 10
                }
            );

            // increment the counter
            world.write_model(
                @Counter {
                    counter: COUNTER_ID, human_count, goblin_count
                }
            );
        }
    }
}
```

> A complete example can be found in the [Dojo Starter](https://github.com/dojoengine/dojo-starter)

# Upgrading Models and Data Migration

Upgrading a model is safe from a storage perspective as soon as the changes do not affect the existing data layout and schema. If the layout or the schema has changed, the upgrade will fail.

Suppose we have a basic model called `Player` that represents player information:

```rust
#[dojo::model]
struct Player {
    #[key]
    player_id: u64,
    username: String,
    score: u32,
}
```

In this model: `player_id`, serves as the primary key. We store the player’s `username` and their `score`.
Now, let’s say we want to enhance our system by adding a new field called level to the `Player` model. We’ll do this without modifying the existing fields (player_id, username, and score).

```rust
#[dojo::model]
struct Player {
    #[key]
    player_id: u64,
    username: String,
    score: u32,
    level: u8, // New field
}
```

Our existing data remains intact. Retrieving player information using the original fields (player_id, username, and score) continues to work seamlessly.
For example, querying Player 1 (ID: 123) with username “Alice” and score 100 still provides accurate results.
so this is for risk free upgrade.
