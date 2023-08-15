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

### System Authentication

Systems must be given permission to write to components. By default they have no permissions. With `sozo` we can however give them permissions to write to components.

```console
sozo auth writer Moves Spawn 
```

Here we have authorised the `Spawn` system to write to the `Moves` component. 

Read more in the [sozo](../toolchain/sozo/overview.md) docs.