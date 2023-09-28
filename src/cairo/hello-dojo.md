# Hello Dojo

> This section assumes that you have already installed the Dojo toolchain and are familiar with Cairo. If not, please refer to the [Getting Started](../getting-started/quick-start.md) section.

## Dojo in 15 Minutes

Think of Dojo as an abstraction over Cairo, similar to how React is to JavaScript. It enables you to write shorthand commands that expand into complex queries during compile time. Dojo is grounded in the well-known architecture known as the Entity Component System (ECS).

In Dojo, you design your worlds using Systems and Components. Systems outline the logic of your world, while components signify the state. This powerful pattern allows you to structure your logic in a highly modular way. If you don't understand this yet, don't fret; we'll delve into it in detail below.

To start, let's set up a project to run locally on your machine. From an empty directory, open a terminal and execute:

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

Dojo projects largely resemble standard Cairo projects, with the distinction being some special attribute tags you use when creating `Components` and `Systems`. Let's explore this next.

Open the `src/components.cairo` file to continue.

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

...rest of code
```

Notice the `#[derive(Component, Copy, Drop, Serde, SerdeLen)]` attributes. For a component to be recognized, we _must_ include `Component`. This signals to the Dojo compiler that this struct should be treated as a component.

Our `Moves` component houses a `remaining` value in its state. The `#[key]` attribute informs Dojo that this component is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this component using the `player` field.

In a similar vein, we possess a `Position` component that holds `x` and `y` values. Once again, this component is indexed by the `player` field.

Now, let's examine the `src/systems.cairo` file:

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
                },
                Position {
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
#[system]
```

Just as we use the `#[derive(Component)]` attribute, the `#[system]` attribute informs the Dojo compiler that this struct is a system, instructing it to compile accordingly.

```rust,ignore
fn execute(ctx: Context)
```

You'll observe that the system features an `execute` function. It's crucial to note that all Dojo systems necessitate an `execute` function. This function accepts a `Context` as its parameter. The `Context` is a distinct struct that provides information about the world and the caller.

It's worth mentioning that a system can contain more than just the `execute` function. You're free to include numerous functions as needed. However, the `execute` function is mandatory since it's invoked when your system is executed.

Now lets look at the next line:

```rust,ignore
let position = get!(ctx.world, ctx.origin, (Position));
```

Here we use `get!` [command](./commands.md) to retrieve the `Position` component for the `ctx.origin` entity. `ctx.origin` is the address of the caller. When called for the first time, it will return:

```rust,ignore
Position {
  player: 0x0, // zero address
  x: 0,
  y: 0
}
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

Here we use the `set!` [command](./commands.md) to set the `Moves` and `Position` components for the `ctx.origin` entity.

We covered a lot here in a short time. Let's recap:

- Explained the anatomy of a Dojo project
- Explained the importace of the `#[derive(Component)]` and `#[system]` attribute
- Explained the `execute` function
- Explained the `Context` struct
- Touched on the `get!` and `set!` commands

### Run it locally!

Now that we have some theory out of the way, lets build the Dojo project!. In your primary terminal input:

```bash
sozo build
```

That compiled the components and system into an artifact that can be deployed! Simple as that!

Now lets deploy it to [Katana](../toolchain/katana/overview.md)! First we need to get Katana running, open a second terminal and input:

```bash
katana --disable-fee
```

Success! [Katana](../toolchain/katana/overview.md) should now be running locally on your machine. Now lets deploy! In your primary terminal

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

This establishes the world address for your project.

### Indexing

With your local world set up, let's delve into indexing. You can index the entire world. Open a new terminal and input this simple command:

```bash
torii
```

Executing the above activates a local torii server using SQLite as its database, which is exposed at `http://0.0.0.0:8080`. It will automatically index your world into tables, allowing you to query them using GraphQL.

You should see terminal output similar to this:

```bash
2023-09-28T02:06:37.423726Z  INFO torii::indexer: starting indexer
Open GraphiQL IDE: http://0.0.0.0:8080
2023-09-28T02:06:37.427823Z  INFO poem::server: listening addr=socket://0.0.0.0:8080
2023-09-28T02:06:37.427835Z  INFO poem::server: server started
2023-09-28T02:06:38.428916Z  INFO torii::engine: processed block: 0
2023-09-28T02:06:38.429976Z  INFO torii::engine: processed block: 1
2023-09-28T02:06:38.430706Z  INFO torii::engine: processed block: 2
2023-09-28T02:06:38.431319Z  INFO torii::engine: processed block: 3
2023-09-28T02:06:38.432875Z  INFO torii::engine: processed block: 4
2023-09-28T02:06:38.433582Z  INFO torii::engine: processed block: 5
2023-09-28T02:06:38.434662Z  INFO torii::engine: processed block: 6
2023-09-28T02:06:38.435572Z  INFO torii_core::processors::register_component: registered component: Moves
2023-09-28T02:06:38.435699Z  INFO torii_core::processors::register_component: registered component: Position
2023-09-28T02:06:38.435813Z  INFO torii::engine: processed block: 7
2023-09-28T02:06:38.436727Z  INFO torii::engine: processed block: 8
2023-09-28T02:06:38.437289Z  INFO torii::engine: processed block: 9
2023-09-28T02:06:38.437985Z  INFO torii::engine: processed block: 10
2023-09-28T02:06:38.438841Z  INFO torii_core::processors::register_system: registered system: spawn
2023-09-28T02:06:38.438861Z  INFO torii_core::processors::register_system: registered system: move
2023-09-28T02:06:38.438871Z  INFO torii_core::processors::register_system: registered system: library_call
2023-09-28T02:06:38.438882Z  INFO torii::engine: processed block: 11
```

We can see Our `Moves` and `Position` component has been registered, as well our `spawn` and `move` component.

Now let's use GraphiQL IDE to fetch data about `Moves` component. In our browser you have to open the localhost `http://0.0.0.0:8080`, then input the the following query:

```json
query {
	component(id: "moves") {
		id
		name
		classHash
		transactionHash
		createdAt
	}
}
```

After you run the query you will receive an output like this:

```json
{
  "data": {
    "component": {
      "id": "moves",
      "name": "Moves",
      "classHash": "0x3240ca67c41c5ae5557f87f44cca2b590f40407082dd390d893a514cfb2b8cd",
      "transactionHash": "",
      "createdAt": "2023-09-28 02:48:24"
    }
  }
}
```

Awesome, now lets work with subscription to get real-time updates. Lets clean our workspace on GraphiQL IDE and input the following subscription.

```json
subscription {
  entityUpdated {
    id
    keys
    componentNames
    createdAt
    updatedAt
  }
}
```

After you run the subcription you will listening for new entities to been updated(or created). For now just leave like this, and lets go create a new entity.

In our primary local terminal. You can then run commands like:

```bash
sozo execute spawn
```

By doing so, you've just activated the spawn system and a new entity has been created. You now have a local world that you can interact with.

Now you can check your GraphiQL IDE, you have received the subscription's result:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20",
      "keys": [
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
      ],
      "componentNames": "Moves,Position",
      "createdAt": "2023-09-28 03:25:50",
      "updatedAt": "2023-09-28 03:25:50"
    }
  }
}
```

In the GraphiQL IDE you can find the `Documentation Explorer` section to give you more information about all kinds of query and subscription operations we provide.

We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Ran the spawn system locally

### Next Steps

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?

```

```
