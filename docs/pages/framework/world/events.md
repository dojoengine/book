<!-- TODO: @ghilm -->

# Events

Events play a pivotal role in decoding the dynamics of a Dojo world. Every time there's an update to a model, the world contract emits [events](/framework/world/events).

What's even more exciting is that you can craft your own custom events to fit specific needs! Moreover, thanks to model's [introspection](/framework/models/introspect) and [Torii](/toolchain/torii), all these events are seamlessly indexed, ensuring easy and efficient querying.

## Custom Events

Within your game, emitting custom events can be highly beneficial. Fortunately, there's a handy `emit_event` api that lets you release events directly from your world. These events are indexed by [Torii](/toolchain/torii).

There are two kind of Custom Events with different use-cases.

## Using `dojo::event`

These events are acting like 'off-chain' storage and behave like [models](/framework/models) which allows [Torii](/toolchain/torii) to easily parse them.
Since it mimics [models](/framework/models) behaviour, a Dojo event must have a least a `#[key]` and any type used inside it must derive `Introspect`.

For example we will declare a `PlayerMood` struct to keep track of player mood.

-   We don't need this information onchain.
-   We don't want to historize `PlayerMood` changes, just keep track of the current/latest `PlayerMood`.

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

Each time a `PlayerMood` event is emitted, the `PlayerMood` event indexed by [Torii](/toolchain/torii) will reflect the lasted mood.

## Example

Now a full example using a custom event:

```rust
fn move(ref self: ContractState, direction: Direction) {

    let player = get_caller_address();
    let mut position: Position = world.read_model(player);
    let mut moves: Moves = world.read_model(player);

    moves.remaining -= 1;
    moves.last_direction = direction;
    let next = next_position(position, direction);

    world.write_model(@moves);
    world.write_model(@next);

    world.emit_event(@Moved { address, direction });
}
```

:::tip
Keep in mind that the world already [emits a core event](/framework/world/events) anytime a model is updated. So you don't need to emit events to keep track of the same information.
:::

# Events emitted by the world

Here's a breakdown of the events emitted by the world:

```rust
enum Event {
    WorldSpawned: WorldSpawned,
    WorldUpgraded: WorldUpgraded,
    NamespaceRegistered: NamespaceRegistered,
    ModelRegistered: ModelRegistered,
    EventRegistered: EventRegistered,
    ContractRegistered: ContractRegistered,
    ModelUpgraded: ModelUpgraded,
    EventUpgraded: EventUpgraded,
    ContractUpgraded: ContractUpgraded,
    ContractInitialized: ContractInitialized,
    EventEmitted: EventEmitted,
    MetadataUpdate: MetadataUpdate,
    StoreSetRecord: StoreSetRecord,
    StoreUpdateRecord: StoreUpdateRecord,
    StoreUpdateMember: StoreUpdateMember,
    StoreDelRecord: StoreDelRecord,
    WriterUpdated: WriterUpdated,
    OwnerUpdated: OwnerUpdated,
}
```

## WorldSpawned

The `WorldSpawned` event is emitted when the world is spawned (deployed).

## WorldUpgraded

The `WorldUpgraded` event is emitted when the world is upgraded to a new class hash (the address of the world remains the same).

## NamespaceRegistered

The `NamespaceRegistered` event is emitted when a new namespace is registered in the world, with its name and its hash.

## ModelRegistered

The `ModelRegistered` event is emitted when a model is registered in the world, which contains all the information about the model including it's type layout.

## EventRegistered

The `EventRegistered` event is emitted when an event is registered in the world, which contains all the information about the event including it's type layout.

## ContractRegistered

The `ContractRegistered` event is emitted when a Dojo contract is registered (deployed). The deployment is managed by the world itself.

## ModelUpgraded

The `ModelUpgraded` event is emitted when an existing model is upgraded to a new class hash. Note that the model contract gets a new address when upgraded.

## EventUpgraded

The `EventUpgraded` event is emitted when an existing event is upgraded to a new class hash. Note that the event contract gets a new address when upgraded.

## ContractUpgraded

The `ContractUpgraded` event is emitted when a Dojo contract is upgraded to a new class hash (the address of such Dojo contract remains the same).

## ContractInitialized

The `ContractInitialized` event is emitted when a Dojo contract is initialized with some specific call data. The provided call data are attached to the event.

## EventEmitted

The `EventEmitted` event is emitted when a Dojo event is emitted with the `emit_event` world function. This event contains the data of the Dojo emitted event such as its selector, its keys and values.

## MetadataUpdate

The `MetadataUpdate` event is emitted when the metadata of a resource (world, Dojo contract, Dojo model) is updated.

## StoreSetRecord

The `StoreSetRecord` event is emitted when a model identified by its keys is updated in the world's store.

## StoreUpdateRecord

The `StoreUpdateRecord` event is emitted when a model identified by its entity_id is updated in the world's store.

## StoreUpdateMember

The `StoreUpdateMember` event is emitted when a model member is updated in the world's store.

## StoreDelRecord

The `StoreDelRecord` event is emitted when a model is deleted from the world's store.

## WriterUpdated

The `WriterUpdated` event is emitted when the writer permission on a model has changed.

## OwnerUpdated

The `OwnerUpdated` event is emitted when the owner permission on a model has changed.
