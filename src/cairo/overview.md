> **To think about:** Consider Autonomous Worlds as sovereign blockchains residing within another blockchain - a nested blockchain, so to speak. Just as you can deploy contracts onto Ethereum to enhance its functionality, you can similarly introduce systems into the World contract to enrich its features. While anyone can contribute to the World, akin to Ethereum, authorization is required to interact with model state. There is a dedicated topic to [Authorisation](./authorization.md).

## Architecture overview

Dojo serves as an elegant abstraction layer over Cairo, akin to how React relates to JavaScript. Through Dojo, developers can utilize shorthand commands which, during compile time, unfurl into intricate queries. Here are some of Dojo's core features:

- **Standard Data Storage:** Provides consistent and efficient data management via an ORM-like onchain storage
- **Standard Framework (ECS):** Grounded in the well-established Entity Component System, offering a familiar architecture for developers.
- **Rustesk Macros:** Enables the use of shorthand commands, simplifying complex tasks and promoting efficient coding practices."

### High level transaction flow of a world

To call a Dojo world you invoke a system, which then calls the [world](./world.md) and does the necessary state changes.

![Dojo World](../images/world_flow.png)

### The simplest possible Dojo World

This is the simplest possible Dojo World. It has 1 model and one contract.

Directory structure:

```rust,ignore
- src
- - main.cairo
- - lib.cairo
- scarb.toml
```

Lets take a look at the `main.cairo`:

```rust,ignore
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Print, Serde)]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Copy, Drop, Serde, Print, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

#[starknet::interface]
trait IPlayerActions<TContractState> {
    fn spawn(self: @TContractState, world: IWorldDispatcher);
}

#[starknet::contract]
mod player_actions {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use super::{Position, Vec2};
    use super::IPlayerActions;

    #[storage]
    struct Storage {}

    #[external(v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        // 
        // NOTICE: we pass the world dispatcher as an argument to every function
        //
        fn spawn(self: @ContractState, world: IWorldDispatcher) {
            // get player address
            let player = get_caller_address();

            // get player position
            let position = get!(world, player, (Position));

            // set player position
            set!(world, (Position { player, vec: Vec2 { x: 10, y: 10 } }));
        }
    }
}
```

### Breakdown

This just a regular Cairo contract, with some specifics.

#### `Position` struct
This is how you define state in a dojo world. Models are structs that are annotated with the `#[derive(Model)]` attribute. Think of these models as a keypair store. The `#[key]` attribute is used to define the primary key of the model. In this case it's the `player` field.

Models are a key part of every dojo world read more here [here](./models.md).

#### `spawn` function

Notice the second parameter of the `spawn` function. It's a `IWorldDispatcher` interface. This is the interface to the world contract. You pass this into the function which then allows the macros `get!` and `set!` to work on the world contract!

Commands are one of the biggest innovations in dojo and read more about them [here](./commands.md).


#### `#[storage]` attribute

You will notice there is no storage in the contract. This is because the storage is in the world contract. You can however use this attribute to store data in the contract itself, but we suggest you use the world contract for storage.