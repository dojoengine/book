# Macros

**_TL;DR_**

- Macros abstract complex queries into shorthands
- Macros in Dojo expand code that interacts with the world

Understanding macros is key to understand Dojo. You will leverage them heavily within the systems you design.

Macros in Dojo are generalized functions that are expanded at compile time to facilitate system execution. They provide a convenient way for systems to interact with the world state by abstracting common operations, such as retrieving or updating models. By leveraging these macros, developers can streamline their system implementations and improve code readability.

:::tip
Macros can be use anywhere in your code that is compiled with the Dojo compiler, even in functions that are indirectly called from systems.
:::

For the examples, consider the following models:
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

## The `get!` macro

The `get!` macro is used to retrieve models from the world state:

```rust
let player = get_caller_address();
// One model retrieved.
let position = get!(world, player, (Position));
// You can retrieve multiple models at once.
let (position, moves) = get!(world, player, (Position, Moves));
```

Here we are retrieving the `Position` and `Moves` models from the world state. We are also using the `caller` to retrieve the models for the current entity.

:::note
As a recall, a model must have at least one [key](/framework/models#the-key-attribute) to be retrievable. In this example, we assume that `Position` and `Moves` model have both exactly one key, `caller`.
:::

You can then use `position` and `moves` as you would as any other Cairo struct.

In the case that your model defines several [keys](/framework/models#the-key-attribute), you must provide a value for each key.

```rust
let player = get_caller_address();
let location = 0x1234;

let resource = get!(world, (player, location), (Resource));
```

If you use the `get!` macro on a model that has never been set before, all the fields that are not `#[key]` are equal to 0 in the returned model, which is the default value in the storage. As you provide the keys, even if the model has never been written, the returned struct will contain the keys you provided.

## The `set!` macro

The `set!` macro is used to update models state.

```rust
let player = get_caller_address();

// You can update multiple models at once.
set !(world, (
    Moves {
        player: player, remaining: 10
    },
    Position {
        player: player, x: position.x + 10, y: position.y + 10
    },
));

// If the structs are already defined in variables, it can also be written as:
set!(world, (moves, position));
```

Here we are updating the `Moves` and `Position` models in the world state using the `player` as the entity id.

## The `emit!` macro

The `emit!` macro is used to emit [custom events](/framework/contracts/events.md#custom-events). These events are indexed by [Torii](/toolchain/torii).

```rust
emit!(world, (Moved { address: caller, direction })); // dojo::event
emit!(world, (Event::Moved (Moved { address: caller, direction } ))); // starknet::Event

// emit multiple events
emit!(world, (
    Moved { address: caller, direction },
    AnotherEvent { address: caller, value1, value2 }
    )
);
```

This will emit these values which could be captured by a client or you could query these via [Torii](/toolchain/torii).

## The `delete!` macro

The `delete!` macro deletes a model from the db, which consists at writing the default value for all the model's fields (which are not keys).

```rust
let player = get_caller_address();
let moves = get!(world, player, (Moves));
delete!(world, (moves));
```
