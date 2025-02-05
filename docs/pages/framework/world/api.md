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

The `read_model` command is used to retrieve a model from the world state:

```rust
let player = get_caller_address();
// One model retrieved.
let mut position: Position = world.read_model(player);
```

Here we are retrieving the `Position` model from the world state. We are also using the `caller` to retrieve the models for the current entity.

:::warning
As a recall, a model must have at least one [key](/framework/models#the-key-attribute) to be retrievable. In this example, the model `Position` has exactly one key, `caller`.
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

The `write_model` command is used to update a model's state.

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

## `read_member` and `read_member_of_models`

The `read_member` and `read_member_of_models` commands are used to read a member from model(s).

```rust
// The `ptr_from_keys` function is used to get the pointer to the model in the storage, for the given keys.
// Then the `selector!` macro is used to get the member to target.
let vec: Vec2 = world.read_member(Model::<Position>::ptr_from_keys(player), selector!("vec"));

// In this case, several entities are trageted, which will return an array of the member values.
// This function call could be read in english by: "Read the member `vec` from the models `Position` for the entities `player1` and `player2`."
let vecs: Array<Vec2> = world.read_member_of_models(Model::<Position>::ptr_from_keys([player1, player2].span()), selector!("vec"));
```

## `write_member` and `write_member_of_models`

The `write_member` and `write_member_of_models` commands are used to write a member to a model.

```rust
let vec = Vec2{x: 1, y: 2};
let vec_b = Vec2{x: 3, y: 4}
// Same logic as the `read_member` command.
world.write_member(Model::<Position>::ptr_from_keys(player), selector!("vec"), vec);

// In this case, several entities are trageted, which will write the member to the models for the given entities.
// This function call could be read in english by: "Write the member `vec` to the model `Position` for the entities `player1` and `player2`."
let vecs = [vec, vec_b].span();
world.write_member_of_models(Model::<Position>::ptr_from_keys([player1, player2].span()), selector!("vec"), vecs);
```

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

## `read_schema` and `read_schemas`

The `read_schema` command allows for effient reading of parts of models. To define a schema the members name and type need to match the model, it needs to have `Serde` and `Introspect` derived and the model cannot be packed. If you plan to only read/write one member, `read_member` and `write_member` are more efficient. When two or more members are read, `read_schema` is more efficient.

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
struct MySchema {
    // Name and type must match the model.
    v0: u256,
    // Name and type must match the model.
    v3: AStruct,
}

fn something(){
    let id: felt252 = 12;
    let schema: MySchema = world.read_schema(Model::<Foo4>::ptr_from_keys(id));

    // If an other struct has `v0` and `v3` as members (with the same types), you can read it like this:
    // (The id could be something different, it is just an example)
    let schema: MySchema = world.read_schema(Model::<FooOther>::ptr_from_keys(id));

    // If you want to read multiple schemas, you can use the `read_schemas` command.
    let ids: Span<felt252> = [12, 13].span();
    let schemas: Array<MySchema> = world.read_schemas(Model::<Foo4>::ptrs_from_keys(ids));
}
```

## World Interface

The world exposes an interface which can be interacted with by any client. It is worth noting here that as a developer you don't deploy this world, it is deployed when you [migrate](/toolchain/sozo) your project as it is part of the `dojo-core` library.

However, you can interact with the world contract directly if you need to for instance to use the `uuid` function as it is often useful to generate unique IDs for entities.

```rust
let game_id = world.uuid();
```

Here's the full [world's API](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/world/iworld.cairo) for low level access:

```rust
#[starknet::interface]
pub trait IWorld<T> {
    /// Returns the resource from its selector.
    ///
    /// # Arguments
    ///   * `selector` - the resource selector
    ///
    /// # Returns
    ///   * `Resource` - the resource data associated with the selector.
    fn resource(self: @T, selector: felt252) -> Resource;

    /// Issues an autoincremented id to the caller.
    /// This functionalities is useful to generate unique, but sequential ids.
    ///
    /// Note: This functionalities may impact performances since transaction paralellisation can't
    /// be achieved since the same storage slot is being written.
    fn uuid(ref self: T) -> usize;

    /// Returns the metadata of the resource.
    ///
    /// # Arguments
    ///
    /// `resource_selector` - The resource selector.
    fn metadata(self: @T, resource_selector: felt252) -> ResourceMetadata;

    /// Sets the metadata of the resource.
    ///
    /// # Arguments
    ///
    /// `metadata` - The metadata content for the resource.
    fn set_metadata(ref self: T, metadata: ResourceMetadata);

    /// Registers a namespace in the world.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The name of the namespace to be registered.
    fn register_namespace(ref self: T, namespace: ByteArray);

    /// Registers an event in the world.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The namespace of the event to be registered.
    /// * `class_hash` - The class hash of the event to be registered.
    fn register_event(ref self: T, namespace: ByteArray, class_hash: ClassHash);

    /// Registers a model in the world.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The namespace of the model to be registered.
    /// * `class_hash` - The class hash of the model to be registered.
    fn register_model(ref self: T, namespace: ByteArray, class_hash: ClassHash);

    /// Registers and deploys a contract associated with the world and returns the address of newly
    /// deployed contract.
    ///
    /// # Arguments
    ///
    /// * `salt` - The salt use for contract deployment.
    /// * `namespace` - The namespace of the contract to be registered.
    /// * `class_hash` - The class hash of the contract.
    fn register_contract(
        ref self: T, salt: felt252, namespace: ByteArray, class_hash: ClassHash,
    ) -> ContractAddress;

    /// Initializes a contract associated registered in the world.
    ///
    /// As a constructor call, the initialization function can be called only once, and only
    /// callable by the world itself.
    ///
    /// Also, the caller of this function must have the writer owner permission for the contract
    /// resource.
    fn init_contract(ref self: T, selector: felt252, init_calldata: Span<felt252>);

    /// Upgrades an event in the world.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The namespace of the event to be upgraded.
    /// * `class_hash` - The class hash of the event to be upgraded.
    fn upgrade_event(ref self: T, namespace: ByteArray, class_hash: ClassHash);

    /// Upgrades a model in the world.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The namespace of the model to be upgraded.
    /// * `class_hash` - The class hash of the model to be upgraded.
    fn upgrade_model(ref self: T, namespace: ByteArray, class_hash: ClassHash);

    /// Upgrades an already deployed contract associated with the world and returns the new class
    /// hash.
    ///
    /// # Arguments
    ///
    /// * `namespace` - The namespace of the contract to be upgraded.
    /// * `class_hash` - The class hash of the contract.
    fn upgrade_contract(ref self: T, namespace: ByteArray, class_hash: ClassHash) -> ClassHash;

    /// Emits a custom event that was previously registered in the world.
    /// The dojo event emission is permissioned, since data are collected by
    /// Torii and served to clients.
    ///
    /// # Arguments
    ///
    /// * `event_selector` - The selector of the event.
    /// * `keys` - The keys of the event.
    /// * `values` - The data to be logged by the event.
    fn emit_event(ref self: T, event_selector: felt252, keys: Span<felt252>, values: Span<felt252>);

    /// Emits multiple events.
    /// Permissions are only checked once, then the events are batched.
    ///
    /// # Arguments
    ///
    /// * `event_selector` - The selector of the event.
    /// * `keys` - The keys of the event.
    /// * `values` - The data to be logged by the event.
    fn emit_events(
        ref self: T,
        event_selector: felt252,
        keys: Span<Span<felt252>>,
        values: Span<Span<felt252>>,
    );

    /// Gets the values of a model entity/member.
    /// Returns a zero initialized model value if the entity/member has not been set.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be retrieved.
    /// * `index` - The index of the entity/member to read.
    /// * `layout` - The memory layout of the model.
    ///
    /// # Returns
    ///
    /// * `Span<felt252>` - The serialized value of the model, zero initialized if not set.
    fn entity(
        self: @T, model_selector: felt252, index: ModelIndex, layout: Layout,
    ) -> Span<felt252>;

    /// Gets the model values for the given entities.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be retrieved.
    /// * `indices` - The indexes of the entities/members to read.
    /// * `layout` - The memory layout of the model.
    fn entities(
        self: @T, model_selector: felt252, indexes: Span<ModelIndex>, layout: Layout,
    ) -> Span<Span<felt252>>;

    /// Sets the model value for the given entity/member.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be set.
    /// * `index` - The index of the entity/member to write.
    /// * `values` - The value to be set, serialized using the model layout format.
    /// * `layout` - The memory layout of the model.
    fn set_entity(
        ref self: T,
        model_selector: felt252,
        index: ModelIndex,
        values: Span<felt252>,
        layout: Layout,
    );

    /// Sets the model values for the given entities.
    /// The permissions are only checked once, then the writes are batched.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be set.
    /// * `indexes` - The indexes of the entities/members to write.
    /// * `values` - The values to be set, serialized using the model layout format.
    /// * `layout` - The memory layout of the model.
    fn set_entities(
        ref self: T,
        model_selector: felt252,
        indexes: Span<ModelIndex>,
        values: Span<Span<felt252>>,
        layout: Layout,
    );

    /// Deletes a model value for the given entity/member.
    /// Deleting is setting all the values to 0 in the given layout.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be deleted.
    /// * `index` - The index of the entity/member to delete.
    /// * `layout` - The memory layout of the model.
    fn delete_entity(ref self: T, model_selector: felt252, index: ModelIndex, layout: Layout);

    /// Deletes the model values for the given entities.
    /// The permissions are only checked once, then the deletes are batched.
    ///
    /// # Arguments
    ///
    /// * `model_selector` - The selector of the model to be deleted.
    /// * `indexes` - The indexes of the entities/members to delete.
    /// * `layout` - The memory layout of the model.
    fn delete_entities(
        ref self: T, model_selector: felt252, indexes: Span<ModelIndex>, layout: Layout,
    );

    /// Returns true if the provided account has owner permission for the resource, false otherwise.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `address` - The address of the contract.
    fn is_owner(self: @T, resource: felt252, address: ContractAddress) -> bool;

    /// Grants owner permission to the address.
    /// Can only be called by an existing owner or the world admin.
    ///
    /// Note that this resource must have been registered to the world first.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `address` - The address of the contract to grant owner permission to.
    fn grant_owner(ref self: T, resource: felt252, address: ContractAddress);

    /// Revokes owner permission to the contract for the resource.
    /// Can only be called by an existing owner or the world admin.
    ///
    /// Note that this resource must have been registered to the world first.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `address` - The address of the contract to revoke owner permission from.
    fn revoke_owner(ref self: T, resource: felt252, address: ContractAddress);


    /// Returns true if the provided contract has writer permission for the resource, false
    /// otherwise.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `contract` - The address of the contract.
    fn is_writer(self: @T, resource: felt252, contract: ContractAddress) -> bool;

    /// Grants writer permission to the contract for the resource.
    /// Can only be called by an existing resource owner or the world admin.
    ///
    /// Note that this resource must have been registered to the world first.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `contract` - The address of the contract to grant writer permission to.
    fn grant_writer(ref self: T, resource: felt252, contract: ContractAddress);

    /// Revokes writer permission to the contract for the resource.
    /// Can only be called by an existing resource owner or the world admin.
    ///
    /// Note that this resource must have been registered to the world first.
    ///
    /// # Arguments
    ///
    /// * `resource` - The selector of the resource.
    /// * `contract` - The address of the contract to revoke writer permission from.
    fn revoke_writer(ref self: T, resource: felt252, contract: ContractAddress);
}
```
