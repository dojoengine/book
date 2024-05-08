## Architecture

Dojo provides an advanced abstraction layer over Cairo, mirroring React's relationship with JavaScript. Its specialized architecture simplifies game design and development.

By leveraging Dojo, developers can use succinct [macros](/toolchain/framework/macros.md) that transform into comprehensive queries at compile time.

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

// dojo data models
#[derive(Model, Copy, Drop, Serde)]
struct Position {
    #[key] // primary key
    player: ContractAddress,
    vec: Vec2,
}

// regular cairo struct
#[derive(Copy, Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

// interface
#[starknet::interface]
trait IPlayerActions {
    fn spawn();
}

// contract
#[dojo::contract]
mod player_actions {
    use starknet::{ContractAddress, get_caller_address};
    use super::{Position, Vec2};
    use super::IPlayerActions;

    #[abi(embed_v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        //
        // This is how we interact with the world contract.
        //
        fn spawn(world: IWorldDispatcher) {
            // get player address
            let player = get_caller_address();

            // dojo command - get player position
            let position = get!(world, player, (Position));

            // dojo command - set player position
            set!(world, (Position { player, vec: Vec2 { x: 10, y: 10 } }));
        }
    }
}
```

### Breakdown

Dojo contract is just a regular Cairo contract, with some dojo specifics.

#### `Position` struct - the dojo model

In a Dojo world, state is defined using models. These are structs marked with the `#[derive(Model)]` attribute, functioning similarly to a key-pair store. The primary key for a model is indicated using the `#[key]` attribute; for instance, the `player` field serves as the primary key in this context.

Read more about models [here](/toolchain/framework/models.md).

#### `spawn` function - a dojo system

In the `spawn` function, we just call `self.world_dispatcher`. This provides a gateway to the world contract. This facilitates the effortless utilization of the get! and set! macros, allowing seamless interaction with the world contract.

Macros, a significant innovation in Dojo, are further explored [here](/toolchain/framework/macros.md).
