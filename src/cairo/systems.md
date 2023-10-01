## Systems

> **IMPORTANT:** Before defining your systems, prioritize permissions. Systems require specific permissions to write to models. Plan carefully to ensure proper access and security.

_tldr;_
-  Systems are just contract functions
-  Contracts which contain Systems are given permissions to write to models
-  Systems pass a `world`` address as their first parameter
-  Systems invoke the world contract to mutate the state of models

### What are Systems?

Within dojo we define systems as functions within a Contract that act on the world. The contracts that hold systems are given permissions to write to models, so you must be careful when defining systems.

Systems play a pivotal role in your world's logic, directly mutating its component states. It's important to understand that to enact these mutations, a system needs explicit permission from the [`models`](./models.md) owner. This permission is established when the Contract, defining the system, is provided write access to the model.

### System Structure

Every system function starts with a [`world`](./world.md) address as its initial parameter. This design permits these functions to alter the world's state. Notably, this structure also makes systems adaptable and reusable across multiple worlds!

Let's look at the simplest possible system which mutates the state of the `Moves` component.

```rust,ignore
#[starknet::contract]
mod player_actions {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo_examples::components::{Position, Moves, Direction, Vec2};
    use dojo_examples::utils::next_position;
    use super::IPlayerActions;

    // no storage
    #[storage]
    struct Storage {}

    // implementation of the PlayerActions interface
    #[external(v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        fn spawn(self: @ContractState, world: IWorldDispatcher) {
            let player = get_caller_address();
            let position = get!(world, player, (Position));
            set!(
                world,
                (
                    Moves { 
                        player, 
                        remaining: 10, 
                        last_direction: Direction::None(()) 
                    }
                )
            );
        }
    }
}
```

### Breaking it down

#### System is a contract

As you can see a System is like a regular Starknet contract. It can include storage, and it can implement interfaces.

#### `Spawn` function

The spawn function is currently the only function that exists in a system. It is called when a player spawns into the world. It is responsible for setting up the player's initial state.


<!-- 
### Using View Functions

There are times when we need to compute the value of a component dynamically, rather than fetching its static state. For instance, in the context of a VRGDA, if you want to ascertain the current price, merely querying the component state won't suffice. Instead, you'd need to compute the price based on certain parameters and the current state.

This is where view functions come into play.

**What are View Functions?**

View functions are a way to derive or compute values from the existing state of a component. They are invoked by the world and receive the current state of the component as an argument. Subsequently, these functions return a computed value based on this state.

**Example from VRGDA**:

The below snippet, taken from the VRGDA example available on [this link](https://github.com/dojoengine/dojo-examples), illustrates how to implement a view function:

```rust,ignore
#[system]
mod view_price {
    //... other code ...

    fn execute(ctx: Context, game_id: u64, item_id: u128, amount: u128) -> Fixed {
        let mut auction = get!(ctx.world, (game_id, item_id), Auction);

        // Convert auction to VRGDA
        let VRGDA = auction.to_LogisticVRGDA();

        // Calculate time since the auction began
        let time_since_start: u128 = get_block_timestamp().into() - auction.start_time.into();

        // Compute the current price
        VRGDA.get_vrgda_price(
            FixedTrait::new(time_since_start, false), // Time elapsed since auction start
            FixedTrait::new(auction.sold, false)      // Quantity sold
        )
    }
}
```

In this example, the function computes and returns the current price of the VRGDA based on the ongoing state of the auction.

**How to Invoke View Functions?**

- **Using Dojo Core**: If you are working within the [Dojo Core](../client/npm/core.md), utilize the `call` function. 
  
- **For Rust Users**: The [Starkli](https://book.starkli.rs/) library provides a handy method to invoke view functions in Rust.

I hope this revised version enhances the clarity and flow of the information you want to convey!

### System Authentication

Systems must be given permission to write to components. By default they have no permissions. With `sozo` we can however give them permissions to write to components.

```console
sozo auth writer Moves Spawn 
```

Here we have authorised the `Spawn` system to write to the `Moves` component. 

Read more in the [sozo](../toolchain/sozo/overview.md) docs. -->