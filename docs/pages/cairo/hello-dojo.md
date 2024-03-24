# Hello Dojo

> This section assumes that you have already installed the Dojo toolchain and are familiar with Cairo. If not, please refer to the [Getting Started](/getting-started/quick-start.md) section.

## Dojo as an ECS in 15 Minutes

Although Dojo isn't exclusively an Entity Component System (ECS) framework, we recommend adopting this robust design pattern. In this context, systems shape the environment's logic, while components ([models](/cairo/models.md)) mirror the state of the world. By taking this route, you'll benefit from a structured and modular framework. This framework promises both flexibility and scalability in a continuously evolving world. If this seems a bit intricate at first, hang tight; we'll delve into the details shortly.

To start, let's set up a project to run locally on your machine. From an empty directory, execute:

```bash
sozo init
```

Congratulations! You now have a local Dojo project. This command creates a `dojo-starter` project in your current directory. It's the ideal starting point for a new project and equips you with everything you need to begin.

#### Anatomy of a Dojo Project

Inspect the contents of the `dojo-starter` project, and you'll notice the following structure (excluding the non-Cairo files):

```bash
src
  - models
    - position.cairo
    - moves.cairo
  - systems
    - actions.cairo
  - tests
    - test_world.cairo
  - lib.cairo
Scarb.toml
```

As Dojo projects bear a strong resemblance to typical Cairo projects, the primary difference lies in the inclusion of a special attribute tag used to define data models, which we refer to as `components` in this context.

Since we're crafting an ECS, it's essential to adhere to the specific terminology associated with Entity Component Systems.

Next, open the `src/models/moves.cairo` file to continue."

```rust
#[derive(Model, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction
}
...rest of code
```

Notice the `#[derive(Model, Drop, Serde)]` attributes. For a model to be recognized, we _must_ include `Model`. This signals to the Dojo compiler that this struct should be treated as a model.

Our `Moves` model houses a `player` field. At the same time, we have the `#[key]` attribute, it informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this model using the `player` field. Our `Moves` model also contains the `remaining` and `last_direction` fields

Next, open the `src/models/position.cairo` file to continue.

```rust
#[derive(Model, Copy, Drop, Serde)]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Copy, Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}
...rest of code
```

In a similar vein, we have a `Position` model that have a Vec2 data structure. Vec holds `x` and `y` values. Once again, this model is indexed by the `player` field.

Now, let's examine the contents of the `src/systems/actions.cairo` file.

```rust
use dojo_starter::models::moves::Direction;
use dojo_starter::models::position::Position;

// define the interface
#[dojo::interface]
trait IActions {
    fn spawn();
    fn move(direction: Direction);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions, next_position};

    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{position::{Position, Vec2}, moves::{Moves, Direction}};

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
    }

    // declaring custom event struct
    #[derive(starknet::Event, Model, Copy, Drop, Serde)]
    struct Moved {
        #[key]
        player: ContractAddress,
        direction: Direction
    }

    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(world: IWorldDispatcher) {
            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();
            // Retrieve the player's current position from the world.
            let position = get!(world, player, (Position));
            // Retrieve the player's move data, e.g., how many moves they have left.
            let moves = get!(world, player, (Moves));

            // Update the world state with the new data.
            // 1. Set players moves to 100
            // 2. Initialize player's position to (10,10)
            set!(
                world,
                (
                    Moves {
                        player, remaining: moves.remaining + 1, last_direction: Direction::None(())
                    },
                    Position {
                        player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
                    },
                )
            );
        }

        // Implementation of the move function for the ContractState struct.
        fn move(world: IWorldDispatcher, direction: Direction) {
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

            // // Update the world state with the new moves data and position.
            set!(world, (moves, next));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Moved { player, direction });
        }
    }
}

// Define function like this:
fn next_position(mut position: Position, direction: Direction) -> Position {
    match direction {
        Direction::None => { return position; },
        Direction::Left => { position.vec.x -= 1; },
        Direction::Right => { position.vec.x += 1; },
        Direction::Up => { position.vec.y -= 1; },
        Direction::Down => { position.vec.y += 1; },
    };
    position
}
```

### Breaking it down

#### System is a function in a contract

As you can see a `System` is like a regular function of a Dojo(Starknet) contract. It imports the Models we defined earlier and exposes two functions `spawn` and `move`. These functions are called when a player spawns into the world and when they move respectively.

```rust
// Retrieve the player's current position from the world.
let position = get!(world, player, (Position));

// Retrieve the player's move data, e.g., how many moves they have left.
let moves = get!(world, player, (Moves));
```

Here we use `get!` [command](/cairo/commands.md) to retrieve the `Position` and `Moves` model for the `player` entity, which is the address of the caller.

Now the next line:

```rust
// Update the world state with the new data.
// 1. Increase the player's remaining moves by 1.
// 2. Move the player's position 10 units in both the x and y direction.
set!(
    world,
    (
        Moves {
            player, remaining: moves.remaining + 1, last_direction: Direction::None
        },
        Position {
            player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10}
        },
    )
);
```

Here we use the `set!` [command](/cairo/commands.md) to set the `Moves` and `Position` models for the `player` entity.

We covered a lot here in a short time. Let's recap:

- Explained the anatomy of a Dojo project
- Explained the importance of the `#[derive(Model)]`attribute
- Explained the `spawn` and `move` functions
- Explained the `Moves` and `Position` struct
- Touched on the `get!` and `set!` commands

### Run it locally!

Now that we've covered some theory, let's build the Dojo project! In your primary terminal:

```bash
sozo build
```

That compiled the models and system into an artifact that can be deployed! Simple as that!

Now, let's deploy it to [Katana](/toolchain/katana/overview.md)! First, we need to get Katana running. Open a second terminal and execute:

```bash
katana --disable-fee
```

Success! [Katana](/toolchain/katana/overview.md) should now be running locally on your machine. Now, let's deploy! In your primary terminal, execute:

```bash
sozo migrate
```

This command will deploy the artifact to [Katana](/toolchain/katana/overview.md). You should see terminal output similar to this:

```console
Migration account: 0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03

World name: dojo_starter

Chain ID: KATANA

[1] 🌎 Building World state....
  > No remote World found
[2] 🧰 Evaluating Worlds diff....
  > Total diffs found: 5
[3] 📦 Preparing for migration....
  > Total items to be migrated (5): New 5 Update 0

# Base Contract
  > Class Hash: 0x679177a2cb757694ac4f326d01052ff0963eac0bc2a17116a2b87badcdf6f76
# World
  > Contract address: 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8
  > Set Metadata transaction: 0x2acbbe239dae2d122c18b3efb0698c00ceb25d7ef9103e63879dce593f8afee
  > Metadata uri: ipfs://QmcgVv9FGthd1TSm7fUh2dzyQ9Son8EBmntRC1UmKsFuTx
# Models (3)
dojo_starter::systems::actions::actions::moved
  > Class hash: 0xf00737ffe57c5c931bfec9a7ea66f76d5eaae12cacca6952dcee0c2e3d8038
dojo_starter::models::moves::moves
  > Class hash: 0x23c28dcfad6be01ca6509fdb35fd2bed6622238397613c60da5d387a43c38d0
dojo_starter::models::position::position
  > Class hash: 0x2e9c42b868b520d54bff1b7f4c9b91f39bb2e2ad1c39d6484fb5d8a95382e01
All models are registered at: 0x2c8998d162d40e9313fd2f7d3e0a8898db1ceb25bb9de1ec463686286c010cd
# Contracts (1)
dojo_starter::systems::actions::actions
  > Contract address: 0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3

🎉 Successfully migrated World on block #3 at address 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8

✨ Updating manifests...

✨ Done.
```

Your 🌎 is now deployed at `0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8`!

This establishes the world address for your project.

Let's discuss the `Scarb.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze (read more about it [here](/cairo/config.md)). On this file, you have to update the value of `world_address` with the address we got from the output of `sozo migrate`.

```toml
[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"
world_address = "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8" # Update this line with your world address
```

At the same time, make sure your file specifies the version of Dojo you have installed! In this case version `0.6.0-alpha.7`.

```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v0.6.0-alpha.7" }
```

### Indexing

With your local world address established, let's delve into indexing. You can index the entire world. To accomplish this we have to copy your `world address` from the output of `sozo migrate`. Now Open a new terminal and input this simple command that includes your own world address:

```bash
torii --world 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8
```

Running the command mentioned above starts a [Torii](/toolchain/torii/overview.md) server on your local machine. This server uses SQLite as its database and is accessible at http://0.0.0.0:8080/graphql. `Torii` will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:

```console
2024-03-24T07:01:07.305489Z  INFO torii::relay::server: Relay peer id peer_id=12D3KooWF2CrpqMsHveDqVLtuiGfQur5zTwSFXgu4izK4gFVoCJX
2024-03-24T07:01:07.311246Z  INFO libp2p_swarm: local_peer_id=12D3KooWF2CrpqMsHveDqVLtuiGfQur5zTwSFXgu4izK4gFVoCJX
2024-03-24T07:01:07.314052Z  INFO torii::cli: Starting torii endpoint: http://0.0.0.0:8080
2024-03-24T07:01:07.314065Z  INFO torii::cli: Serving Graphql playground: http://0.0.0.0:8080/graphql
2024-03-24T07:01:07.314070Z  INFO torii::cli: World Explorer is available on: https://worlds.dev/torii?url=http%3A%2F%2Flocalhost%3A8080%2Fgraphql

2024-03-24T07:01:07.315318Z  INFO torii::relay::server: New listen address address=/ip4/127.0.0.1/tcp/9090
2024-03-24T07:01:07.315336Z  INFO torii::relay::server: New listen address address=/ip4/192.168.100.28/tcp/9090
2024-03-24T07:01:07.315340Z  INFO torii::relay::server: New listen address address=/ip4/172.17.0.1/tcp/9090
2024-03-24T07:01:07.315374Z  INFO torii::relay::server: New listen address address=/ip4/127.0.0.1/udp/9090/quic-v1
2024-03-24T07:01:07.315379Z  INFO torii::relay::server: New listen address address=/ip4/192.168.100.28/udp/9090/quic-v1
2024-03-24T07:01:07.315383Z  INFO torii::relay::server: New listen address address=/ip4/172.17.0.1/udp/9090/quic-v1
2024-03-24T07:01:07.315555Z  INFO torii::relay::server: New listen address address=/ip4/127.0.0.1/udp/9091/webrtc-direct/certhash/uEiBNe_o7CBNfrOrx0yDPdKlGN8ODgfdG6VcJnNUGt5EXKQ
2024-03-24T07:01:07.315563Z  INFO torii::relay::server: New listen address address=/ip4/192.168.100.28/udp/9091/webrtc-direct/certhash/uEiBNe_o7CBNfrOrx0yDPdKlGN8ODgfdG6VcJnNUGt5EXKQ
2024-03-24T07:01:07.315746Z  INFO torii::relay::server: New listen address address=/ip4/172.17.0.1/udp/9091/webrtc-direct/certhash/uEiBNe_o7CBNfrOrx0yDPdKlGN8ODgfdG6VcJnNUGt5EXKQ
2024-03-24T07:01:07.321750Z  INFO torii_core::engine: processed block: 0
2024-03-24T07:01:07.323093Z  INFO torii_core::engine: processed block: 1
2024-03-24T07:01:07.323538Z  INFO torii_core::engine: processed block: 2
2024-03-24T07:01:07.324375Z  INFO torii_core::engine: processed block: 3
2024-03-24T07:01:07.325597Z  INFO torii_core::processors::metadata_update: Resource 0x0 metadata set: ipfs://QmcgVv9FGthd1TSm7fUh2dzyQ9Son8EBmntRC1UmKsFuTx/
2024-03-24T07:01:07.325648Z  INFO torii_core::engine: processed block: 4
2024-03-24T07:01:07.326382Z  INFO torii_core::engine: processed block: 5
2024-03-24T07:01:07.326812Z  INFO torii_core::engine: processed block: 6
2024-03-24T07:01:07.327265Z  INFO torii_core::engine: processed block: 7
2024-03-24T07:01:07.332613Z  INFO torii_core::processors::register_model: Registered model name="Moved"
2024-03-24T07:01:07.339471Z  INFO torii_core::processors::register_model: Registered model name="Moves"
2024-03-24T07:01:07.346717Z  INFO torii_core::processors::register_model: Registered model name="Position"
2024-03-24T07:01:07.348367Z  INFO torii_core::engine: processed block: 8
2024-03-24T07:01:07.349451Z  INFO torii_core::engine: processed block: 9
2024-03-24T07:01:07.350306Z  INFO torii_core::engine: processed block: 10
2024-03-24T07:01:11.359573Z  INFO torii_core::processors::metadata_update: Updated resource 0x0 metadata from ipfs
```

You can observe that our `Moves` and `Position` models have been successfully registered.
Next, let's use the GraphiQL IDE to retrieve data from the `Moves` model. In your web browser, navigate to `http://0.0.0.0:8080/graphql`, and enter the following query:

```graphql
query {
  model(id: "Moves") {
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
      "id": "Moves",
      "name": "Moves",
      "classHash": "0x23c28dcfad6be01ca6509fdb35fd2bed6622238397613c60da5d387a43c38d0",
      "transactionHash": "",
      "createdAt": "2024-03-24T07:01:07+00:00"
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
    eventId
    createdAt
    updatedAt
  }
}
```

Once you execute the subscription, you will receive notifications whenever new entities are updated or created. For now, don't make any changes to it, and proceed to create a new entity.

To accomplish this, we have to go back to our primary terminal and check the contracts section.

```bash
# Contracts (1)
dojo_starter::systems::actions::actions
  > Contract address: 0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3
```

We have to use `actions` contract address to start to create entities. In your main local terminal, run the following command:

```bash
sozo execute 0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3 spawn
```

By running this command, you've activated the spawn system, resulting in the creation of a new entity. This action establishes a local world that you can interact with.

Now, go back to your GraphiQL IDE, and you will notice that you have received the subscription's results, which should look something like this:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x2038e0daba5c3948a6289e91e2a68dfc28e734a281c753933b8bd331e6d3dae",
      "keys": [
        "0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03"
      ],
      "eventId": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0000",
      "createdAt": "2024-03-24T07:06:52Z",
      "updatedAt": "2024-03-24T07:06:52Z"
    }
  }
}
--------------------------------------------------------------------------------------------------------
{
  "data": {
    "entityUpdated": {
      "id": "0x2038e0daba5c3948a6289e91e2a68dfc28e734a281c753933b8bd331e6d3dae",
      "keys": [
        "0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03"
      ],
      "eventId": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0001",
      "createdAt": "2024-03-24T07:06:52Z",
      "updatedAt": "2024-03-24T07:06:52Z"
    }
  }
}
```

In the GraphiQL IDE, by clicking the `DOCS`-button on the right, you can open the API documentation. This documentation is auto-generated based on our schema definition and displays all API operations and data types of our schema.. In order to know more about query and subscription, you can jump to [GraphQL](/toolchain/torii/graphql.md) section.
We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Ran the spawn system locally
- Interacted with GraphQL

### Next Steps

This overview provides a rapid end-to-end glimpse of Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?
