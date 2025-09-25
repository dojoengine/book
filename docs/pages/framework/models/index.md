---
title: Dojo Models
description: Learn about Dojo models, their role in data storage, key attributes, and best practices for model design and upgrades.
---

# Models

> Models = Data

**_TL;DR_**

- Models store structured data in your world.
- Use the `#[dojo::model]` attribute to define them.
- Models must have at least one key.
- Define the key(s) using the `#[key]` attribute.
- Models are Cairo structs with automatic on-chain introspection.
- Custom enums and types are supported if they implement [`Introspect`](/framework/models/introspection).

## What are models?

Models are Cairo structs annotated with the `#[dojo::model]` attribute.
Consider these models as a key-value store, where the `#[key]` attribute defines the key.
While models can contain any number of fields, adhering to best practices in Entity-Component-System (ECS) design involves maintaining small, isolated models.

This approach fosters modularity and composability, enabling you to reuse models across various entity types.

```cairo
#[derive(Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

:::tip
The `#[derive(Drop, Serde)]` traits are required, respectively used by Cairo's [ownership](https://book.cairo-lang.org/ch04-01-what-is-ownership.html) system and [serializing](https://book.cairo-lang.org/appendix-03-derivable-traits.html?#serializing-with-serde) model.
Omitting them will lead to a compilation error.
You can add additional traits, such as `Copy`, as needed.
:::

## The `#[key]` attribute

The `#[key]` attribute indicates to Dojo which fields will be used to index the model.
In the previous example, the model is indexed by the `player` field.
A field that is identified as a `#[key]` is not itself stored.
Rather, it is used by the Dojo database system to uniquely identify the storage location of the model.

**You need to define at least one key for each model**.
However, you can create composite keys by defining multiple fields as keys.

:::info
All keys must come before any non-key members in the struct.
:::

```rust
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameResource {
    #[key]
    player: ContractAddress,
    #[key]
    location: ContractAddress,
    balance: u8,
}
```

In this case you would then use [`read_model`](/framework/world/api.md#read_model) with both the player and location fields:

```cairo
let player = get_caller_address();
let location = 0x1234;

world.read_model((player, location));
```

:::warning
If you define multiple keys, they must **all** be provided to query the model.
:::

## Models in Practice

### Model Composition

Let's explore ECS composition through a concrete gaming analogy: Orcs and Humans.
While they possess intrinsic differences, they share common traits, such as having a position and health.
Humans, however, possess an additional model - potions.

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    id: u32,
    x: u32,
    y: u32
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
struct Potions {
    #[key]
    id: u32,
    quantity: u8,
}
```

Human entities will have `Health`, `Position`, and `Potions` models, while Orcs will have only `Health` and `Position`.
This let's us re-use models to create a variety of different entities.

The game contract would look like this:

```cairo
#[dojo::contract]
mod spawnHuman {
    use dojo::model::{ModelStorage};
    use dojo::world::{WorldStorage, WorldStorageTrait};

    use dojo_examples::models::{Position, Health, Potions};

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn_entities(ref self: ContractState) {
            let mut world = self.world(@"dojo_starter");

            // spawn a human
            let human_id = world.uuid()
            world.write_model(@Health { id: human_id, health: 100 });
            world.write_model(@Position { id: human_id, x: 0, y: 0 });
            world.write_model(@Potions { id: human_id, quantity: 10 });

            // spawn an orc
            let orc_id = world.uuid()
            world.write_model(@Health { id: orc_id, health: 100 });
            world.write_model(@Position { id: orc_id, x: 10, y: 10 });
        }
    }
}
```

### Global Settings

Suppose we want to store a global game value, which we may want to modify in the future.
To achieve this, we can create a model to store this value, while also allowing for its future modification.
The key difference is that, instead of a variable key, we would use a **constant identifie**r.

```cairo
const RESPAWN_DELAY: u128 = 9999999999999;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct GameSetting {
    #[key]
    setting_id: u128,
    setting_value: felt252,
}

// Set respawn delay to 10 minutes
world.write_model(@GameSetting {
    setting_id: RESPAWN_DELAY,
    setting_value: (10 * 60).into()
});
```
