## Framework

Dojo provides an advanced abstraction layer over Cairo, mirroring React's relationship with JavaScript. Its specialized architecture simplifies game design and development.

By having it's very own Cairo compiler plugin, Dojo proposes to developers a set of [macros](/framework/contracts/macros.md) that transform into comprehensive queries at compile time.

#### Delving into the Architecture

Dojo efficiently encapsulates boilerplate contracts within the compiler, letting developers concentrate on the distinct aspects of their game or app.

Consider this as the most basic Dojo world setup:

```rust
- src
  - main.cairo
  - lib.cairo
- Scarb.toml
```

While seemingly simple, behind the scenes Dojo compiler generates foundational contracts, setting the stage for you to focus purely on data and logic.

Lets take a look at the `main.cairo`:

```rust
use starknet::ContractAddress;

// Dojo model.
#[derive(Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

// A regular cairo struct, deriving Introspect
// to be usable inside a dojo model.
#[derive(Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

// Dojo interface.
#[dojo::interface]
trait IPlayerActions {
    fn spawn(ref world: IWorldDispatcher);
}

// Dojo contract.
#[dojo::contract]
mod player_actions {
    use starknet::{ContractAddress, get_caller_address};
    use super::{IPlayerActions, Position, Vec2};

    #[abi(embed_v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        // The world is injected by dojo at compile time.
        // All the data are stored inside the world's storage.
        fn spawn(ref world: IWorldDispatcher) {
            let player = get_caller_address();

            // Dojo macro to set the player position in the world.
            set!(world, (Position { player, vec: Vec2 { x: 10, y: 10 } }));

            // Dojo macro to get the player position from the world.
            let position = get!(world, player, (Position));
        }
    }
}
```

### Breakdown

Dojo contract is just a regular Cairo contract, with some Dojo specifics.

#### `Position` - a Dojo model

In a Dojo world, state is defined using models. These are structs marked with the `#[derive(Model)]` attribute, functioning similarly to a key-pair store. The primary key for a model is indicated using the `#[key]` attribute; for instance, the `player` field serves as the primary key in this context.

Read more about models [here](/framework/models).

#### `spawn` function - a dojo system

In the `spawn` function, we just call `self.world_dispatcher`. This provides a gateway to the world contract. This facilitates the effortless utilization of the get! and set! macros, allowing seamless interaction with the world contract.

Macros, a significant innovation in Dojo, are further explored [here](/framework/contracts/macros.md).
