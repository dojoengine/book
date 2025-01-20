---
title: "World API Reference"
description: "Complete reference for the Dojo World API, including model operations and event handling"
---

# World API

**_TL;DR_**

-   The World API is the interface to interact with the World contract.
-   The World API provides a set of functions to interact with the world state.
-   Avoid writing long hand queries - just use the API.

Let's consider the following models:

```rust
#[derive(Drop, Copy, Serde)]
#[dojo::model]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

## `read_model`

The `read_model` command is used to retrieve models from the world state:

```rust
let player = get_caller_address();
// One model retrieved.
let mut position: Position = world.read_model(player);
```

Here we are retrieving the `Position` model from the world state. We are also using the `caller` to retrieve the models for the current entity.

:::warning
As a recall, a model must have at least one [key](/framework/models#the-key-attribute) to be retrievable. In this example, we assume that `Position` model has exactly one key, `caller`.
:::

You can then use `position` as you would as any other Cairo struct.

In the case that your model defines several [keys](/framework/models#the-key-attribute), you must provide a value for each key.

```rust
let player = get_caller_address();
let location = 0x1234;

let mut position: Position = world.read_model((player, location));
```

If you use the `read_model` command on a model that has never been set before, all the fields that are not `#[key]` are equal to 0 in the returned model, which is the default value in the storage. As you provide the keys, even if the model has never been written, the returned struct will contain the keys you provided.

## `write_model`

The `write_model` command is used to update models state.

```rust
let player = get_caller_address();
let location = 0x1234;

// Read the model from the world state.
let mut position: Position = world.read_model((player, location));

// Update the model.
position.vec.x = 10;
position.vec.y = 10;

// Write the model back to the world state.
world.write_model(@position);
```

Here we are updating the `Position` model in the world state using the `player` as the entity id.

## `emit_event`

The `emit_event` command is used to emit [custom events](/framework/world/events.md#custom-events). These events are indexed by [Torii](/toolchain/torii).

```rust
world.emit_event(@Moved { address, direction });
```

This will emit these values which could be captured by a client or you could query these via [Torii](/toolchain/torii).

## `erase_model`

The `erase_model` command deletes a model from the db, which consists at writing the default value for all the model's fields (which are not keys).

```rust
let player = get_caller_address();

// Read the model from the world state.
let moves = world.read_model(player);

// Erase the model from the world state.
world.erase_model(@moves);
```

## `read_schema`

The `read_schema` command allows for effient reading of parts of models. To define a schema the members name and type need to match the model, it needs to have `Serde` and `Introspect` derived and the model cannot be packed.

```rust
#[derive(Copy, Drop, Serde, Debug, Introspect)]
struct AStruct {
    a: u8,
    b: u8,
    c: u8,
    d: u8,
}

#[dojo::model]
#[derive(Copy, Drop, Serde, Debug)]
struct Foo4 {
    #[key]
    id: felt252,
    v0: u256,
    v1: felt252,
    v2: u128,
    v3: AStruct,
}

#[derive(Copy, Drop, Serde, Debug, Introspect)]
struct Oo {
    v0: u256,
    v3: AStruct,
}

fn something(){
  let id: felt252 = 12;
  let values: Oo = world.read_schema(Model::<Foo4>::ptr_from_keys(id));
  ...
}
```

## World Interface

The world exposes an interface which can be interacted with by any client. It is worth noting here that as a developer you don't deploy this world, it is deployed when you [migrate](/toolchain/sozo) your project as it is part of the `dojo-core` library.

However, you can interact with the world contract directly if you need to for instance to use the `uuid` function as it is often useful to generate unique IDs for entities.

```rust
let game_id = world.uuid();
```

Here's the full [world's API](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/world/iworld.cairo):

```rust
#[starknet::interface]
trait IWorld<T> {
    fn metadata(self: @T, resource_id: felt252) -> ResourceMetadata;
    fn set_metadata(ref self: T, metadata: ResourceMetadata);
    fn model(self: @T, selector: felt252) -> (ClassHash, ContractAddress);
    fn register_model(ref self: T, class_hash: ClassHash);
    fn deploy_contract(
        ref self: T, salt: felt252, class_hash: ClassHash, init_calldata: Span<felt252>
    ) -> ContractAddress;
    fn upgrade_contract(ref self: T, address: ContractAddress, class_hash: ClassHash) -> ClassHash;
    fn uuid(ref self: T) -> usize;
    fn emit(self: @T, keys: Array<felt252>, values: Span<felt252>);
    fn entity(
        self: @T, model: felt252, keys: Span<felt252>, layout: dojo::database::introspect::Layout
    ) -> Span<felt252>;
    fn set_entity(
        ref self: T,
        model: felt252,
        keys: Span<felt252>,
        values: Span<felt252>,
        layout: dojo::database::introspect::Layout
    );
    fn delete_entity(
        ref self: T, model: felt252, keys: Span<felt252>, layout: dojo::database::introspect::Layout
    );
    fn base(self: @T) -> ClassHash;
    fn is_owner(self: @T, address: ContractAddress, resource: felt252) -> bool;
    fn grant_owner(ref self: T, address: ContractAddress, resource: felt252);
    fn revoke_owner(ref self: T, address: ContractAddress, resource: felt252);

    fn is_writer(self: @T, model: felt252, contract: ContractAddress) -> bool;
    fn grant_writer(ref self: T, model: felt252, contract: ContractAddress);
    fn revoke_writer(ref self: T, model: felt252, contract: ContractAddress);
}
```
