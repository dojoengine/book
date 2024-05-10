## Events

Events play a pivotal role in decoding the dynamics of a Dojo world. Every time there's an update to a `Model`, the `World` contract emits these events. What's even more exciting is that you can craft your own custom events to fit specific needs! Moreover, thanks to [Torii](/toolchain/torii), all these events are seamlessly indexed, ensuring easy and efficient querying.


### Core Events

-  Model Events: to synchronize torii state with on-chain state
-  World Events: world lifecycle events 

#### Model Events

Consider this example of a `Moves` model:

```rust
struct Moves {
    #[key]
    player: Address,
    remaining: u32,
}
```

When this model is updated, the `World` contract will emit an event with the following structure:

```rust
#[derive(Drop, starknet::Event)]
struct StoreSetRecord {
    table: felt252,        // Moves
    keys: Span<felt252>,   // [player]
    values: Span<felt252>, // [remaining]
}
```

This will then be captured by [Torii](/toolchain/torii) and indexed for querying. This will allow you to then reconstruct the state of your world.

Similarly, when a model is deleted, the `World` contract will emit an event with the following structure:

```rust
#[derive(Drop, starknet::Event)]
struct StoreDelRecord {
    table: felt252,      // Moves
    keys: Span<felt252>, // [player]
}
```

#### World Events

The `World` contract also emits events when it's initialized and when new models and contracts are registered. These events are emitted with the following structures:

```rust
#[derive(Drop, starknet::Event)]
struct WorldSpawned {
    address: ContractAddress,
    creator: ContractAddress
}

#[derive(Drop, starknet::Event)]
struct ModelRegistered {
    name: felt252,
    class_hash: ClassHash,
    prev_class_hash: ClassHash,
    address: ContractAddress,
    prev_address: ContractAddress,
}

#[derive(Drop, starknet::Event)]
struct ContractDeployed {
    salt: felt252,
    class_hash: ClassHash,
    address: ContractAddress,
}

#[derive(Drop, starknet::Event)]
struct ContractUpgraded {
    class_hash: ClassHash,
    address: ContractAddress,
}
```

These events are also captured by [Torii](/toolchain/torii) and indexed for querying.

You can find all the world events in [world.cairo](https://github.com/dojoengine/dojo/blob/94fbe540de31f0ba7f59685aeffef2c695fb170d/crates/dojo-core/src/world.cairo#L93)

### Custom Events

Within your game, emitting custom events can be highly beneficial. Fortunately, there's a handy `emit!` command that lets you release events directly from your world. These events are indexed by [Torii](/toolchain/torii).

There is two kind of Custom Events with different use-cases.

#### with #[dojo::Event]

This events are acting like 'off-chain' storage and derive [Model](/framework/models) which allow Torii to easily parse this events.
Since it's a [Model](/framework/models) it must have a least a #[key]

How to use : 

For example we will declare a PlayerStatus struct to keep track of player mood. 

-We don't need this information on-chain.

-We don't want to historize PlayerMood changes, just keep track of the current/latest PlayerMood

```rust
#[derive(Model, Copy, Drop, Serde)]
#[dojo::event]
struct PlayerMood {
    #[key]
    player: ContractAddress,
    mood: Mood,
 }
```

Emit the `PlayerMood` event

```rust
emit!(world, ( PlayerMood { player, mood: Mood::Happy } ));
```

Each time a PlayerMood event is emitted, the PlayerMood Model indexed by Torii will reflect the lasted mood.


#### with starknet::Event

This events are acting like classic starknet events, allowing historization.

Torii index this events in a raw format ( ex : [here](/toolchain/torii/graphql#susbcription-to-events))

How to use : 

Declare the starknet Event enum for you contract with a `Moved` variant

```rust
#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    Moved: Moved,
}
```

Declare the `Moved` struct 

```rust
#[derive(Drop, Serde, starknet::Event)]
struct Moved {
    address: felt252,
    direction: felt252,
}
```

Emit the `Moved` event

```rust
emit!(world, (Event::Moved( Moved { address, direction } )) );
```

Now a full example using a custom event:

```rust
fn move(world: IWorldDispatcher, direction: Direction) {
    let player = get_caller_address();
    let (mut position, mut moves) = get!(world, player, (Position, Moves));
    moves.remaining -= 1;
    moves.last_direction = direction;
    let next = next_position(position, direction);
    set!(world, (moves, next));
    emit!(world, (Event::Moved( Moved { player, direction } )) );
}
```
