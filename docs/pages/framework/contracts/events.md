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

-   We don't need this information on-chain.
-   We don't want to historize `PlayerStatus` changes, just keep track of the current/latest `PlayerStatus`.

```rust
#[derive(Copy, Drop, Introspect)]
struct Mood {
    Happy,
    Angry,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct PlayerMood {
    #[key]
    player: ContractAddress,
    mood: Mood,
 }
```

Emit the `PlayerMood` event:

```rust
emit!(world, (PlayerMood { player, mood: Mood::Happy }));
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
emit!(world, (Event::Moved( Moved { address, direction } )));
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
