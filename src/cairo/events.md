## Events

Events play a pivotal role in decoding the dynamics of a Dojo world. Every time there's an update to a `Model`, the `World` contract emits these events. What's even more exciting is that you can craft your own custom events to fit specific needs! Moreover, thanks to [Torii](../toolchain/torii/overview.md), all these events are seamlessly indexed, ensuring easy and efficient querying.


### Component Events

Consider this example of a `Moves` model:

```rust,ignore
struct Moves {
    #[key]
    player: Address,
    remaining: u32,
}
```

When this component is updated, the `World` contract will emit an event with the following structure:

```rust,ignore
#[derive(Drop, starknet::Event)]
struct StoreSetRecord {
    table: felt252, // Moves
    keys: Span<felt252>, // [player]
    offset: u8, // offset for the value in the table
    value: Span<felt252>, // [remaining]
}
```

This will then be captured by [Torii](../toolchain/torii/overview.md) and indexed for querying. This will allow you to then reconstruct the state of your world.

Similarly, when a component is deleted, the `World` contract will emit an event with the following structure:

```rust,ignore
#[derive(Drop, starknet::Event)]
struct StoreDelRecord {
    table: felt252,
    keys: Span<felt252>,
}
```

### World Events

The `World` contract also emits events when it's initialized and when new components and systems are registered. These events are emitted with the following structures:

```rust,ignore
#[derive(Drop, starknet::Event)]
struct WorldSpawned {
    address: ContractAddress,
    caller: ContractAddress
}
```

```rust,ignore
#[derive(Drop, starknet::Event)]
struct ComponentRegistered {
    name: felt252,
    class_hash: ClassHash
}
```

```rust,ignore
#[derive(Drop, starknet::Event)]
struct SystemRegistered {
    name: felt252,
    class_hash: ClassHash
}
```

These events are also captured by [Torii](../toolchain/torii/overview.md) and indexed for querying.


### Custom Events

Within your systems, emitting custom events can be highly beneficial. Fortunately, there's a handy `emit!` macro that lets you release events directly from your world. These events are indexed by [torii](../toolchain/torii/overview.md)

Use it like so:

```rust,ignore
emit!(world, Moved { address, direction });
```

Include this in your system and it will emit an event with the following structure:

```rust,ignore
#[derive(Drop, starknet::Event)]
struct Moved {
    address: felt252,
    direction: felt252,
}
```

Now a full example using a custom event: 

```rust,ignore
fn move(ctx: Context, direction: Direction) {
    let (mut position, mut moves) = get !(world, caller, (Position, Moves));
    moves.remaining -= 1;

    let next = next_position(position, direction);
    
    set !(world, (moves, next));
    emit !(world, Moved { address: caller, direction });
    return ();
}
```

> Note: Read about the `get!` and `set!` macros in [Commands](./commands.md).