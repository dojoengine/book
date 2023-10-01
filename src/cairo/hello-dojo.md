# Hello Dojo

> This section assumes that you have already installed the Dojo toolchain and are familiar with Cairo. If not, please refer to the [Getting Started](../getting-started/quick-start.md) section.

## Dojo as an ECS in 15 Minutes

Although Dojo isn't exclusively an Entity Component System (ECS) framework, we recommend adopting this robust design pattern. In this context, systems shape the environment's logic, while components ([models](./models.md)) mirror the state of the world. By taking this route, you'll benefit from a structured and modular framework that promises both flexibility and scalability in a continuously evolving world. If this seems a bit intricate at first, hang tight; we'll delve into the details shortly.

To start, let's set up a project to run locally on your machine. From an empty directory, execute:

```console
sozo init
```

Congratulations! You now have a local Dojo project. This command creates a `dojo-starter` project in your current directory. It's the ideal starting point for a new project and equips you with everything you need to begin.

#### Anatomy of a Dojo Project

Inspect the contents of the `dojo-starter` project, and you'll notice the following structure (excluding the non-cairo files):

```bash
src
  - components.cairo
  - systems.cairo
  - lib.cairo
Scarb.toml
```

Dojo projects bear a strong resemblance to typical Cairo projects. The primary difference is the inclusion of a special attribute tag used to define your data models. In this context, we'll refer to these models as components.

As we're crafting an ECS, we'll adhere to the specific terminology associated with Entity Component Systems.

Open the `src/components.cairo` file to continue.

```rust,ignore
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}

#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Position {
    #[key]
    player: ContractAddress,
    x: u32,
    y: u32
}

...rest of code
```

Notice the `#[derive(Model, Copy, Drop, Serde, SerdeLen)]` attributes. For a model to be recognized, we *must* include `Model`. This signals to the Dojo compiler that this struct should be treated as a model.

Our `Moves` component houses a `remaining` value in its state. The `#[key]` attribute informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this component using the `player` field.

In a similar vein, we possess a `Position` component that holds `x` and `y` values. Once again, this component is indexed by the `player` field.

Now, let's examine the `src/systems.cairo` file:

```rust,ignore
#[starknet::contract]
mod player_actions_external {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo_examples::components::{Position, Moves, Direction, Vec2};
    use dojo_examples::utils::next_position;
    use super::IPlayerActions;

    #[storage]
    struct Storage {}

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
    }

    #[derive(Drop, starknet::Event)]
    struct Moved {
        player: ContractAddress,
        direction: Direction
    }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        fn spawn(self: @ContractState, world: IWorldDispatcher) {
            let player = get_caller_address();
            let position = get!(world, player, (Position));
            set!(
                world,
                (
                    Moves { player, remaining: 10, last_direction: Direction::None(()) },
                    Position { player, vec: Vec2 { x: 10, y: 10 } },
                )
            );
        }

        fn move(self: @ContractState, world: IWorldDispatcher, direction: Direction) {
            let player = get_caller_address();
            let (mut position, mut moves) = get!(world, player, (Position, Moves));
            moves.remaining -= 1;
            moves.last_direction = direction;
            let next = next_position(position, direction);
            set!(world, (moves, next));
            emit!(world, Moved { player, direction });
            return ();
        }
    }
}
```

### Breaking it down

#### System is a contract

As you can see a System is like a regular Starknet contract. It imports the Models we defined earlier and exposes two functions `spawn` and `move`. These functions are called when a player spawns into the world and when they move respectively.

```rust,ignore
let position = get!(world, caller, (Position));
```

Here we use `get!` [command](./commands.md) to retrieve the `Position` model for the `caller` entity, which in this case is the caller.

Now the next line:

```rust,ignore
set!(
    world,
    (
        Moves { player, remaining: 10, last_direction: Direction::None(()) },
        Position { player, vec: Vec2 { x: 10, y: 10 } },
    )
);
```

Here we use the `set!` [command](./commands.md) to set the `Moves` and `Position` models for the `caller` entity.

We covered a lot here in a short time. Let's recap:

-   Explained the anatomy of a Dojo project
-   Explained the importance of the `#[derive(Model)]`attribute
-   Explained the `execute` function
-   Explained the `Context` struct
-   Touched on the `get!` and `set!` commands


### Run it locally!

Now that we have some theory out of the way, lets build the Dojo project!

```bash
sozo build
```

That compiled the components and system into an artifact that can be deployed! Simple as that!

Now lets deploy it to [Katana](../toolchain/katana/overview.md)! First we need to get Katana running:

```bash
katana --disable-fee
```

Success! [Katana](../toolchain/katana/overview.md) should now be running locally on your machine. Now lets deploy!

```bash
sozo migrate --name test
```

This will deploy the artifact to [Katana](../toolchain/katana/overview.md). You should see terminal output similar to this:

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

-   Built a Dojo world
-   Deployed the project to Katana
-   Ran the spawn system locally
-   Indexed the world with Torii

### Next Steps

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and models, Dojo is equipped for expansive creativity. So, what will you craft next?