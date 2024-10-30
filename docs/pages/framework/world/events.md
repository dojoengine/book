<!-- TODO: @ghilm -->

# Events

Events play a pivotal role in decoding the dynamics of a Dojo world. Every time there's an update to a model, the world contract emits [events](/framework/world/events).

What's even more exciting is that you can craft your own custom events to fit specific needs! Moreover, thanks to model's [introspection](/framework/models/introspect) and [Torii](/toolchain/torii), all these events are seamlessly indexed, ensuring easy and efficient querying.

## Custom Events

Within your game, emitting custom events can be highly beneficial. Fortunately, there's a handy `emit!` command that lets you release events directly from your world. These events are indexed by [Torii](/toolchain/torii).

There are two kind of Custom Events with different use-cases.

## Using `dojo::event`

These events are acting like 'off-chain' storage and derive [Model](/framework/models) which allows [Torii](/toolchain/torii) to easily parse them.
Since it's a [Model](/framework/models) it must have a least a `#[key]` and any type used inside the model must derive `Introspect`.

For example we will declare a `PlayerStatus` struct to keep track of player mood.

-   We don't need this information onchain.
-   We don't want to historize `PlayerStatus` changes, just keep track of the current/latest `PlayerStatus`.

```rust
#[derive(Copy, Drop, Introspect)]
struct Mood {
    Happy,
    Angry,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
struct PlayerMood {
    #[key]
    player: ContractAddress,
    mood: Mood,
 }
```

Emit the `PlayerMood` event:

```rust
world.emit_event(@PlayerMood { player, mood: Mood::Happy });
```

Each time a `PlayerMood` event is emitted, the `PlayerMood` Model indexed by [Torii](/toolchain/torii) will reflect the lasted mood.

## Using `starknet::Event`

These events are acting like classic starknet events, allowing historization.

Torii index this events in a raw format (ex : [here](/toolchain/torii/graphql#susbcription-to-events)).

Declare the starknet Event enum for you contract with a `Moved` variant:

```rust
#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    Moved: Moved,
}
```

Declare the `Moved` struct (you can have zero, one or more `#[key]`):

```rust
#[derive(Drop, Serde, starknet::Event)]
struct Moved {
    address: felt252,
    direction: felt252,
}
```

Emit the `Moved` event:

```rust
world.emit_event(@Moved { address, direction });
```

:::warning[Starknet event keys modified]
On Starknet, when a contract emits an event, the contract address is registered as the event origin. However, in Dojo, this will always be the world's address.

To circumvent this, Dojo always adds a key to the Starknet event keys: the address of the system using the `emit!` macro.

For this reason, you should be aware that the key(s) of the Starknet events you define will always have an extra key at the end.
:::

## Example

Now a full example using a custom event:

```rust
fn move(world: IWorldDispatcher, direction: Direction) {
    let player = get_caller_address();
    let (mut position, mut moves) = get!(world, player, (Position, Moves));

    moves.remaining -= 1;
    moves.last_direction = direction;
    let next = next_position(position, direction);

    set!(world, (moves, next));

    emit!(world, (Event::Moved( Moved { player, direction } )));
}
```

:::tip
Keep in mind that the world already [emits a core event](/framework/world/events) anytime a model is updated. So you don't need to emit events to keep track of the same information.
:::

# Events emitted by the world

Anytime a state change occurs, the world emits an event to notify the [Torii indexer](/toolchain/torii) about the change.

Consider this example of a `Moves` model:

```rust
struct Moves {
    #[key]
    player: Address,
    remaining: u32,
}
```

When this model is updated with the `set!` [macro](/framework/world/api.md#set), the world contract will emit an event with the following structure:

```rust
#[derive(Drop, starknet::Event)]
struct StoreSetRecord {
    table: felt252,        // Moves
    keys: Span<felt252>,   // [player]
    values: Span<felt252>, // [remaining]
}
```

This will then be captured by [Torii](/toolchain/torii) and indexed for querying. This will allow you to then reconstruct the state of your world.

Similarly, when a model is deleted with the `delete!` [macro](/framework/world/api.md#delete), the world contract will emit an event with the following structure:

```rust
#[derive(Drop, starknet::Event)]
struct StoreDelRecord {
    table: felt252,      // Moves
    keys: Span<felt252>, // [player]
}
```

Here's a breakdown of the events emitted by the world:

```rust
enum Event {
    WorldSpawned: WorldSpawned,
    ContractDeployed: ContractDeployed,
    ContractUpgraded: ContractUpgraded,
    WorldUpgraded: WorldUpgraded,
    MetadataUpdate: MetadataUpdate,
    ModelRegistered: ModelRegistered,
    StoreSetRecord: StoreSetRecord,
    StoreDelRecord: StoreDelRecord,
    WriterUpdated: WriterUpdated,
    OwnerUpdated: OwnerUpdated,
    ConfigEvent: Config::Event,
    StateUpdated: StateUpdated
}
```

## WorldSpawned

The `WorldSpawned` event is emitted when the world is spawned (deployed).

## WorldUpgraded

The `WorldUpgraded` event is emitted when the world is upgraded to a new class hash (the address of the world remains the same).

## ContractDeployed

The `ContractDeployed` event is emitted when a Dojo contract is deployed. The deployment is managed by the world itself.

## ContractUpgraded

The `ContractUpgraded` event is emitted when a Dojo contract is upgraded to a new class hash (the address of such Dojo contract remains the same).

## MetadataUpdate

The `MetadataUpdate` event is emitted when the metadata of a resource (world, Dojo contract, Dojo model) is updated.

## ModelRegistered

The `ModelRegistered` event is emitted when a model is registered in the world, which contains all the information about the model including it's type layout.

## StoreSetRecord

The `StoreSetRecord` event is emitted when a model is updated in the world's store using the `set!` [macro](/framework/world/api.md).

## StoreDelRecord

The `StoreDelRecord` event is emitted when a model is deleted from the world's store using the `delete!` [macro](/framework/world/api.md).

## WriterUpdated

The `WriterUpdated` event is emitted when the writer permission on a model has changed.

## OwnerUpdated

The `OwnerUpdated` event is emitted when the owner permission on a model has changed.

## ConfigEvent

The `ConfigEvent` event is emitted when the configuration related to Saya settlement is updated.

## StateUpdated

The `StateUpdated` event is emitted when the state from a shard execution is settled on the world after proof verification using Saya.
