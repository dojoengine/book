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

Inspect the contents of the `dojo-starter` project, and you'll notice the following structure (excluding the non-Cairo files):

```bash
src
  systems
    - raw_contract.cairo
    - with_decorator.cairo
  - lib.cairo
  - models.cairo
  - utils.cairo
Scarb.toml
```

Dojo projects bear a strong resemblance to typical Cairo projects. The primary difference is the inclusion of a special attribute tag used to define your data models. In this context, we'll refer to these models as components.

As we're crafting an ECS, we'll adhere to the specific terminology associated with Entity Component Systems.

Open the `src/models.cairo` file to continue.

```rust,ignore
#[derive(Model, Copy, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction
}

#[derive(Copy, Drop, Serde, Print, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

...rest of code
```

Notice the `#[derive(Model, Copy, Drop, Serde)]` attributes. For a model to be recognized, we _must_ include `Model`. This signals to the Dojo compiler that this struct should be treated as a model.

Our `Moves` model houses a `remaining` value in its state. The `#[key]` attribute informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this component using the `player` field.

In a similar vein, we have a `Position` component that have a Vec2 data structure. Vec holds `x` and `y` values. Once again, this component is indexed by the `player` field.

Now, let's examine the `src/systems/raw_contract.cairo` file:

```rust,ignore
#[starknet::contract]
mod player_actions_external {
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo_examples::models::{Position, Moves, Direction, Vec2};
    use dojo_examples::utils::next_position;
    use super::IPlayerActions;

    #[storage]
    struct Storage {
        world_dispatcher: IWorldDispatcher,
    }

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
        fn spawn(self: @ContractState) {
            let world = self.world_dispatcher.read();
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

        fn move(self: @ContractState, direction: Direction) {
            let world = self.world_dispatcher.read();
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
let position = get!(world, player, (Position));
```

Here we use `get!` [command](./commands.md) to retrieve the `Position` model for the `caller` entity, which in this case is the player.

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

- Explained the anatomy of a Dojo project
- Explained the importance of the `#[derive(Model)]`attribute
- Explained the `execute` function
- Explained the `Context` struct
- Touched on the `get!` and `set!` commands

### Run it locally!

Now that we've covered some theory, let's build the Dojo project! In your primary terminal:

```bash
sozo build
```

That compiled the components and system into an artifact that can be deployed! Simple as that!

Now, let's deploy it to [Katana](../toolchain/katana/overview.md)! First, we need to get Katana running. Open a second terminal and execute:

```bash
katana --disable-fee
```

Success! [Katana](../toolchain/katana/overview.md) should now be running locally on your machine. Now, let's deploy! In your primary terminal, execute:

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

With your local world address established, let's delve into indexing. You can index the entire world. Open a new terminal and input this simple command:

```bash
torii --world 0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16
```

Running the command mentioned above starts a Torii server on your local machine. This server uses SQLite as its database and is accessible at http://0.0.0.0:8080/graphql. Torii will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:

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

You can observe that our `Moves` and `Position` models have been successfully registered.
Next, let's use the GraphiQL IDE to retrieve data from the `Moves` model. In your web browser, navigate to `http://0.0.0.0:8080/graphql`, and enter the following query:

```graphql
query {
  movesModels(id: "moves") {
    id
    name
    classHash
    transactionHash
    createdAt
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "model": {
      "id": "moves",
      "name": "Moves",
      "classHash": "0x3240ca67c41c5ae5557f87f44cca2b590f40407082dd390d893a514cfb2b8cd",
      "transactionHash": "",
      "createdAt": "2023-09-28 02:48:24"
    }
  }
}
```

Awesome, now let's work with subscriptions to get real-time updates. Let's clean up your workspace on the GraphiQL IDE and input the following subscription:

```graphql
subscription {
  entityUpdated {
    id
    keys
    modelNames
    createdAt
    updatedAt
  }
}
```

Once you execute the subscription, you will receive notifications whenever new entities are updated or created. For now, don't make any changes to it and proceed to create a new entity.

In your main local terminal, run the following command:

```bash
sozo execute --0x71b95a2c000545624c51813444b57dbcdcc153dfc79b6b0e3a9a536168d1e16 spawn
```

By running this command, you've activated the spawn system, resulting in the creation of a new entity. This action establishes a local world that you can interact with.

Now, go back to your GraphiQL IDE, and you will notice that you have received the subscription's results, which should look something like this:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20",
      "keys": [
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
      ],
      "modelNames": "Moves,Position",
      "createdAt": "2023-09-28 03:25:50",
      "updatedAt": "2023-09-28 03:25:50"
    }
  }
}
```

In the GraphiQL IDE, you can find the `Documentation Explorer` section to provide you with more information about all kinds of query and subscription operations we provide.

We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Ran the spawn system locally

### Next Steps

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and models, Dojo is equipped for expansive creativity. So, what will you craft next?
