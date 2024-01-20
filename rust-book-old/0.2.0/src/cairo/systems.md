## Systems

> Systems = Logic

Systems underpin the logic of your world. While systems are inherently stateless, their primary role is to modify the state of components. Every system features an 'execute' function that's called upon during interactions within the world.

Let's look at the simplest possible system which mutates the state of the `Moves` component.

```rust,ignore
#[system]
mod Spawn {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    fn execute(ctx: Context) {
        set !(
            ctx.world, ctx.origin, (
                Moves { player: ctx.origin, remaining: 10 }
            )
        );
        return ();
    }
}
```

### The Execute function

The `execute` function is mandatory in a system and runs when called, taking `Context` as its first parameter. See more in [Context](./world.md).

### Other functions in a System

You are free to add other functions to your system, but they will not be callable from the world. This is useful for breaking up your logic into smaller chunks.

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

Here we have authorized the `Spawn` system to write to the `Moves` component.

Read more in the [sozo](../toolchain/sozo/overview.md) docs.
