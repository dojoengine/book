# Hello Dojo

> This section assumes you have already installed the Dojo toolchain and have a familiarity with Cairo. If you haven't, please refer to the [Getting Started](../getting-started/quick-start.md) section.

## Dojo in 15 minutes

Think of Dojo as an abstraction on top of Cairo (similar to how React is to JS). It allows you to write shorthand commands which expand out at compile time to complex queries. Dojo is built around the well-known architecture called Entity Component System (ECS).

You design your Dojo worlds with Systems and Components. Systems define the logic of your world, while components represent the state. This is a potent pattern that facilitates writing your logic in a highly modular manner.

With this in mind, let's delve into the simplest possible Dojo world; comprising 1 system and 2 components. We'll start by creating the components.

```rust,ignore
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Position {
    #[key]
    player: ContractAddress,
    x: u32,
    y: u32
}
```

Here, we have a `Moves` component that stores a `remaining` value in its state. The `#[key]` attribute indicates to Dojo that this component is indexed by the `player` field. If you're uncertain about this, we'll cover its significance later in the chapter. Essentially, this means we can query this component using the `player` field.

Similarly, we have a `Position` component that stores an `x` and `y` value. Again, we've indexed this component by the `player` field.

Next, let's design a `spawn` system for the character. 

```rust,ignore
#[system]
mod spawn {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    fn execute(ctx: Context) {
        let position = get!(ctx.world, ctx.origin, (Position));
        set!(
            ctx.world,
            (
                Moves {
                    player: ctx.origin, remaining: 10
                    }, Position {
                    player: ctx.origin, x: position.x + 10, y: position.y + 10
                },
            )
        );
        return ();
    }
}
```

Let us break this down:

```rust,ignore
fn execute(ctx: Context)
```

You will notice that the system has an `execute` function - this is important to remember, all Dojo systems require an `execute` function. The `execute` function takes a `Context` as an argument. The `Context` is a special struct that contains information about the world and the caller.

Note - you can have more than just the execute function in a system. You can have as many functions as you like, but you must have an `execute` function as this is what is called when you system is executed.


Now lets look at the next line:

```rust,ignore
let position = get!(ctx.world, ctx.origin, (Position));
```

Here we use `get!` command to retrieve the `Position` component for the `ctx.origin` entity. `ctx.origin` is the address of the caller. It will return:

```rust,ignore
Moves { remaining: 10 }
```

Now the next line:

```rust,ignore
set!(
    ctx.world,
    (
        Moves {
            player: ctx.origin, remaining: 10
            }, Position {
            player: ctx.origin, x: position.x + 10, y: position.y + 10
        },
    )
);
```

Here we use the `set!` command to set the `Moves` and `Position` components for the `ctx.origin` entity.

We covered a lot here in a short time. Let's recap:

-   We created 2 components: `Moves` and `Position`.
-   We created a `spawn` system that sets the `Moves` and `Position` components for the `ctx.origin` entity.


### Run it locally!

Now that we have some theory out of the way, lets get this locally on your machine! Luckily we have a `dojo-starter` project that can be installed all from the `sozo` cli!

Navigate to an **empty** directory on your machine and:

```bash
sozo init
```

This will create a `dojo-starter` project in your current directory. You will notice it contains the same systems and components we just created.

Now lets build the project:

```bash
sozo build
```

That compiled the components and system into an artifact that can be deployed to Katana! Simply as that.

Now lets deploy it to Katana! First we need to get Katana running:

```bash
katana --disable-fee
```

Success! Katana should now be running locally on your machine. Now lets deploy!

```bash
sozo migrate --name test
```

This will deploy the artifact to Katana. You should see terminal output similar to this:

```bash
Migration account: 0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c

[1] 🌎 Building World state....
  > No remote World found
[2] 🧰 Evaluating Worlds diff....
  > Total diffs found: 7
[3] 📦 Preparing for migration....
  > Total items to be migrated (7): New 7 Update 0
  
# Executor
  > Contract address: 0x1a8cc7a653543337be184d21ceeb5cfc7e97af5ab7da5e4be77f373124d7e48
# World
  > Contract address: 0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16
# Components (2)
Moves
  > class hash: 0x3240ca67c41c5ae5557f87f44cca2b590f40407082dd390d893a514cfb2b8cd
Position
  > class hash: 0x4caa1806451739b6fb470652b8066a11f80e847d49003b43cca75a2fd7647b6
# Systems (3)
spawn
  > class hash: 0x1b949b00d5776c8ba13c2fdada38d4b196f3717c93c5c254c4909ed0eb249f7
move
  > class hash: 0x2534c514efeab524f24cd4b03add904eb540391e9966ebc96f8ce98453a4e1e
library_call
  > class hash: 0xabfd55d9bb6552aac17d78b33a6e18b06b1b95d4f684637e661dd83053fd45

🎉 Successfully migrated World on block #4 at address 0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16
```

Your 🌎 is now deployed at `0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16`!

Let's discuss the `Scarb.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze. (Read more about it [here](./config.md)).

Add the world address to the bottom of the file:

```toml
world_address = "0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16"
```

This establishes the world address for your project. You can then run commands like:

```bash
sozo execute spawn
```

By doing so, you've just activated the spawn system. You now have a local world that you can interact with.

### Indexing

With your local world set up, let's delve into indexing. You can index the entire world with this simple command:

```bash
torii
```

Executing the above activates a local torii server using SQLite as its database, which is exposed at `http://0.0.0.0:8080`. It will automatically index your world into tables, allowing you to query them using GraphQL.

We've covered quite a bit! Here's a recap:

-   Created a `dojo-starter` project.
-   Built the project.
-   Deployed the project to Katana.
-   Ran the spawn system locally.
-   Indexed the world with Torii.

### Next Steps

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?