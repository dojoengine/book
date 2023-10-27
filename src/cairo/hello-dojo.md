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
  - actions.cairo
  - lib.cairo
  - models.cairo
  - utils.cairo
Scarb.toml
```

Dojo projects bear a strong resemblance to typical Cairo projects. The primary difference is the inclusion of a special attribute tag used to define your data models. In this context, we'll refer to these models as components.

As we're crafting an ECS, we'll adhere to the specific terminology associated with Entity Component Systems.

Open the `src/models.cairo` file to continue.

```rust,ignore
#[derive(Model, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction
}

#[derive(Copy, Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

#[derive(Model, Copy, Drop, Serde)]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

...rest of code
```

Notice the `#[derive(Model, Drop, Serde)]` attributes. For a model to be recognized, we _must_ include `Model`. This signals to the Dojo compiler that this struct should be treated as a model.

Our `Moves` model houses a `player` field. At the same time, we have the `#[key]` attribute, it informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this component using the `player` field. Our `Moves` model also contains the `remaining` and `last_direction` fields

In a similar vein, we have a `Position` component that have a Vec2 data structure. Vec holds `x` and `y` values. Once again, this component is indexed by the `player` field.

Now, let's examine the `src/actions.cairo` file:

```rust,ignore
// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address};
    use dojo_examples::models::{Position, Moves, Direction, Vec2};
    use dojo_examples::utils::next_position;
    use super::IActions;

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
    }

    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Moved {
        player: ContractAddress,
        direction: Direction
    }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionsImpl of IActions<ContractState> {
        // ContractState is defined by system decorator expansion
        fn spawn(self: @ContractState) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // Retrieve the player's current position from the world.
            let position = get!(world, player, (Position));

            // Retrieve the player's move data, e.g., how many moves they have left.
            let moves = get!(world, player, (Moves));

            // Update the world state with the new data.
            // 1. Increase the player's remaining moves by 10.
            // 2. Move the player's position 10 units in both the x and y direction.
            set!(
                world,
                (
                    Moves {
                        player, remaining: moves.remaining + 10, last_direction: Direction::None(())
                    },
                    Position {
                        player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
                    },
                )
            );
        }

        // Implementation of the move function for the ContractState struct.
        fn move(self: @ContractState, direction: Direction) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // Retrieve the player's current position and moves data from the world.
            let (mut position, mut moves) = get!(world, player, (Position, Moves));

            // Deduct one from the player's remaining moves.
            moves.remaining -= 1;

            // Update the last direction the player moved in.
            moves.last_direction = direction;

            // Calculate the player's next position based on the provided direction.
            let next = next_position(position, direction);

            // Update the world state with the new moves data and position.
            set!(world, (moves, next));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Moved { player, direction });
        }
    }
}
```

### Breaking it down

#### System is a contract

As you can see a `System` is like a dojo(starknet) contract. It imports the Models we defined earlier and exposes two functions `spawn` and `move`. These functions are called when a player spawns into the world and when they move respectively.

```rust,ignore
// Retrieve the player's current position from the world.
let position = get!(world, player, (Position));

// Retrieve the player's move data, e.g., how many moves they have left.
let moves = get!(world, player, (Moves));
```

Here we use `get!` [command](./commands.md) to retrieve the `Position` and `Moves` model for the `player` entity, which is the address of the caller.

Now the next line:

```rust,ignore
// Update the world state with the new data.
// 1. Increase the player's remaining moves by 10.
// 2. Move the player's position 10 units in both the x and y direction.
set!(
    world,
    (
        Moves {
            player, remaining: moves.remaining + 10, last_direction: Direction::None(())
        },
        Position {
            player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10}
        },
    )
);
```

Here we use the `set!` [command](./commands.md) to set the `Moves` and `Position` models for the `player` entity.

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
Migration account: 0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973

World name: test

[1] 🌎 Building World state....
  > No remote World found
[2] 🧰 Evaluating Worlds diff....
  > Total diffs found: 5
[3] 📦 Preparing for migration....
  > Total items to be migrated (5): New 5 Update 0

# Executor
  > Contract address: 0x5c3494b21bc92d40abdc40cdc54af66f22fb92bf876665d982c765a2cc0e06a
# Base Contract
  > Class Hash: 0x7aec2b7d7064c1294a339cd90060331ff704ab573e4ee9a1b699be2215c11c9
# World
  > Contract address: 0x1af130f7b9027f3748c1e3b10ca4a82ac836a30ac4f2f84025e83a99a922a0c
# Models (2)
Moves
  > Class hash: 0xb37482a660983dfbf65968caa26eab260d3e1077986454b52ac06e58ae20c4
Position
  > Class hash: 0x6ffc643cbc4b2fb9c424242b18175a5e142269b45f4463d1cd4dddb7a2e5095
  > Registered at: 0x3e74b09d320ceb5d4401842bec805489019c04202bc23bc67a385f6e537dce0
# Contracts (1)
actions
  > Contract address: 0x69a474a39b11d05c07bb9090fd1961b8e1c87aa5643e7b97087cb0c7620356a

🎉 Successfully migrated World at address 0x1af130f7b9027f3748c1e3b10ca4a82ac836a30ac4f2f84025e83a99a922a0c

✨ Updating manifest.json...

✨ Done.

```

Your 🌎 is now deployed at `0x1af130f7b9027f3748c1e3b10ca4a82ac836a30ac4f2f84025e83a99a922a0c`!

This establishes the world address for your project.

Let's discuss the `Scarb.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze. (Read more about it [here](./config.md)). Make sure your file specifies the version of Dojo you have installed!. In this case version `v0.3.1`

```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", rev = "v0.3.1" }
```

### Indexing

With your local world address established, let's delve into indexing. You can index the entire world. Open a new terminal and input this simple command:

```bash
torii --world 0x1af130f7b9027f3748c1e3b10ca4a82ac836a30ac4f2f84025e83a99a922a0c
```

Running the command mentioned above starts a Torii server on your local machine. This server uses SQLite as its database and is accessible at http://0.0.0.0:8080/graphql. Torii will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:

```bash
2023-10-18T06:49:48.184233Z  INFO torii::server: 🚀 Torii listening at http://0.0.0.0:8080
2023-10-18T06:49:48.184244Z  INFO torii::server: Graphql playground: http://0.0.0.0:8080/graphql

2023-10-18T06:49:48.185648Z  INFO torii_core::engine: processed block: 0
2023-10-18T06:49:48.186129Z  INFO torii_core::engine: processed block: 1
2023-10-18T06:49:48.186720Z  INFO torii_core::engine: processed block: 2
2023-10-18T06:49:48.187202Z  INFO torii_core::engine: processed block: 3
2023-10-18T06:49:48.187674Z  INFO torii_core::engine: processed block: 4
2023-10-18T06:49:48.188215Z  INFO torii_core::engine: processed block: 5
2023-10-18T06:49:48.188611Z  INFO torii_core::engine: processed block: 6
2023-10-18T06:49:48.188985Z  INFO torii_core::engine: processed block: 7
2023-10-18T06:49:48.199592Z  INFO torii_core::processors::register_model: Registered model: Moves
2023-10-18T06:49:48.210032Z  INFO torii_core::processors::register_model: Registered model: Position
2023-10-18T06:49:48.210571Z  INFO torii_core::engine: processed block: 8
2023-10-18T06:49:48.211678Z  INFO torii_core::engine: processed block: 9
2023-10-18T06:49:48.212335Z  INFO torii_core::engine: processed block: 10

```

You can observe that our `Moves` and `Position` models have been successfully registered.
Next, let's use the GraphiQL IDE to retrieve data from the `Moves` model. In your web browser, navigate to `http://0.0.0.0:8080/graphql`, and enter the following query:

```graphql
query {
  model(id: "Moves") {
    id
    name
    class_hash
    transaction_hash
    created_at
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "model": {
      "id": "Moves",
      "name": "Moves",
      "class_hash": "0xb37482a660983dfbf65968caa26eab260d3e1077986454b52ac06e58ae20c4",
      "transaction_hash": "",
      "created_at": "2023-10-18 06:49:48"
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
    model_names
    event_id
    created_at
    updated_at
  }
}
```

Once you execute the subscription, you will receive notifications whenever new entities are updated or created. For now, don't make any changes to it and proceed to create a new entity.

To accomplish this, we have to go back to our primary terminal and check the contracts section.

```bash
# Contracts (1)
actions
  > Contract address: 0x69a474a39b11d05c07bb9090fd1961b8e1c87aa5643e7b97087cb0c7620356a
```

We have to use `actions` contract address to start to create entities. In your main local terminal, run the following command:

```bash
sozo execute 0x69a474a39b11d05c07bb9090fd1961b8e1c87aa5643e7b97087cb0c7620356a spawn
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
      "model_names": "Moves",
      "event_id": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0000",
      "created_at": "2023-10-18 06:53:12",
      "updated_at": "2023-10-18 06:53:12"
    }
  }
}
--------------------------------------------------------------------------------------------------------
{
  "data": {
    "entityUpdated": {
      "id": "0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20",
      "keys": [
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
      ],
      "model_names": "Moves,Position",
      "event_id": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0001",
      "created_at": "2023-10-18 06:53:12",
      "updated_at": "2023-10-18 06:53:12"
    }
  }
}
```

In the GraphiQL IDE, by clicking the `DOCS`-button on the right, you can open the API documentation. This documentation is auto-generated based on our schema definition and displays all API operations and data types of our schema.. In order to know more about query and subscription, you can jump to [GraphQL](../toolchain/torii/graphql.md) section.
We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Ran the spawn system locally
- Interacted with GraphQL

### Next Steps

This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?
