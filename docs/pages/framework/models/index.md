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

In this case you would then use [`read_model`](/framework/world/api#read_model) with both the player and location fields:

```cairo
let player = get_caller_address();
let location = 0x1234;

world.read_model((player, location));
```

:::warning
If you define multiple keys, they must **all** be provided to query the model.
:::

For detailed model operations and usage patterns, see the [Model API reference](/framework/models/api).
