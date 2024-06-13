# Dojo starter guide

> This section assumes that you have already installed the Dojo toolchain and are familiar with Cairo. If not, please refer to the [Getting Started](/getting-started.md) section and the [Cairo book](https://book.cairo-lang.org).

## Dojo as an ECS in 15 Minutes

Although Dojo isn't exclusively an Entity Component System (ECS) framework, we recommend adopting this robust design pattern. In this context, systems shape the environment's logic, while components (called [models](/framework/models) in Dojo) mirror the state of the world. By taking this route, you'll benefit from a structured and modular framework. This framework promises both flexibility and scalability in a continuously evolving world. If this seems a bit intricate at first, hang tight; we'll delve into the details shortly.

To start, let's create a new project to run locally on your machine.

```bash
sozo init dojo-starter
```

Congratulations! You now have a local Dojo project. This command creates a `dojo-starter` project in your current directory from the [Dojo starter template](https://github.com/dojoengine/dojo-starter). It's the ideal starting point for a new project and equips you with everything you need to begin.

### Anatomy of a Dojo Project

Inspect the contents of the `dojo-starter` project, and you'll notice the following structure (excluding the non-Cairo files):

```bash
.
├── Scarb.toml
└── src
    ├── lib.cairo
    ├── models
    │   ├── moves.cairo
    │   └── position.cairo
    ├── systems
    │   └── actions.cairo
    └── tests
        └── test_world.cairo
```

As Dojo projects bear a strong resemblance to typical Cairo projects, the primary difference lies in the inclusion of a Dojo specific macros.

### Models

Since we're crafting an ECS, it's essential to adhere to the specific terminology associated with Entity Component Systems. In the context of Dojo, `Component` is named `Model`, to not conflict with existing Cairo terminology.

Next, open the `src/models/moves.cairo` file to continue.

```rust
// ...

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction
}

// ...
```

Notice the `#[dojo::model]` attribute. For a model to be recognized, we _must_ add this attribute to a Cairo struct. This signals to the Dojo compiler that this struct should be treated as a model.

<!-- Here we don't show the dojo::event, as first the user must understand that dojo already emit events that are processed by Torii when a model is set. -->

Our `Moves` model houses a `player` field. At the same time, we have the `#[key]` attribute, it informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you must provide the `player` field to query this model. Our `Moves` model also contains the `remaining` and `last_direction` fields.

Next, open the `src/models/position.cairo` file to continue.

```rust
// ...
#[derive(Drop, Copy, Serde)]
#[dojo::model]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Drop, Copy, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

// ...
```

Similarly, we have a `Position` model that is also indexed by the `player` field and includes a `Vec2` data structure. The `Vec2` structure holds `x` and `y` values. It is important to note that a model can contain any Cairo struct, provided the `Introspect` trait is derived. This trait informs the Dojo storage engine on how to handle the struct.

### Systems

A `system` is a function in a Dojo contract, which is defined with the `#[dojo::contract]` attribute.

First, a contract must define one (or more) Dojo interface that defines the systems it exposes.

```rust
#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher);
    fn move(ref world: IWorldDispatcher, direction: Direction);
}
```

The `world` parameter is a special parameter to inject the world into the system.
<!-- Add link to the page dedicated to the world injection. -->

Now, let's examine a `system` implementation of the `src/systems/actions.cairo` file.

```rust
/// Spawn system, in which the world is injected.
fn spawn(ref world: IWorldDispatcher) {
    let player = get_caller_address();

    // Retrieve the player's current position from the world.
    let position = get!(world, player, (Position));

    // Update the world state with the new data.
    set!(
        world,
        (
            Moves { player, remaining: 100, last_direction: Direction::None },
            Position {
                player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
            },
        )
    );
}
```

As you can see a `system` is like a regular function of a Dojo contract. It uses the Models we defined earlier. This `system` is called when a player spawns into the world.
In a `system`, you can inject the world by using the `world` parameter.

<!-- TODO: add a link to the injection detailed page. -->

```rust
// Retrieve the player's current position from the world.
let position = get!(world, player, (Position));
```

Here we use `get!` [macro](/framework/contracts/macros.md) to retrieve the `Position` model for the `player` entity, which is the address of the caller.

Now the next line:

```rust
// Update the world state with the new data.
set!(
    world,
    (
        Moves { player, remaining: 100, last_direction: Direction::None },
        Position {
            player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
        },
    )
);
```

Here we use the `set!` [macro](/framework/contracts/macros.md) to set the `Moves` and `Position` models for the `player` entity.
As you've seen, like the `get!` macro, you can pass several model in the tuple to interact with several models in an atomic manner.

:::tip[Systems are stateless]
The systems are the only way to interact with the world. They can read and write to the world, where data is stored.
Systems are expected to be stateless.
:::

We covered a lot here in a short time. Let's recap:

- Explained the anatomy of a Dojo project
- Explained the importance of the `#[dojo::model]`attribute and how models are defined
- Explained how systems are defined and implemented inside a Dojo contract
- Explained how to inject the world into a system
- Touched on the `get!` and `set!` macros to interact with the world

### Run it locally!

Now that we've covered some theory, let's build the Dojo project! In your primary terminal:

```bash
sozo build
```

That compiled the models and system into an artifact that can be deployed! Simple as that!

Now, let's deploy it to [Katana](/toolchain/katana)! First, we need to get Katana running. Open a second terminal and execute:

```bash
katana --disable-fee
```

Success! [Katana](/toolchain/katana) should now be running locally on your machine. Now, let's deploy! In your primary terminal, execute:

```bash
sozo migrate apply
```

This command will deploy the artifact to `Katana`. You should see terminal output similar to this:

```console
Migration account: 0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca

World name: dojo_starter

Chain ID: KATANA

[1] 🌎 Building World state....
  > No remote World found
[2] 🧰 Evaluating Worlds diff....
  > Total diffs found: 4
[3] 📦 Preparing for migration....
  > Total items to be migrated (4): New 4 Update 0

# Base Contract
  > Class Hash: 0x679177a2cb757694ac4f326d01052ff0963eac0bc2a17116a2b87badcdf6f76
# World
  > Contract address: 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8
  > Set Metadata transaction: 0x5cab33effb796861b5624a392c6c9e77beb7b6d6867a9169d9cd87d4117bd05
  > Metadata uri: ipfs://Qmbx6D7ERFjF8q6zBpoJnvcBHfh8qRvyzxwNghDi9eegGR
# Models (2)
dojo_starter::models::moves::moves
  > Class hash: 0x23c28dcfad6be01ca6509fdb35fd2bed6622238397613c60da5d387a43c38d0
dojo_starter::models::position::position
  > Class hash: 0x2e9c42b868b520d54bff1b7f4c9b91f39bb2e2ad1c39d6484fb5d8a95382e01
All models are registered at: 0x1125a469633da39a5c1ec4d1e4735fa82c6c0fd906b46724ac4b43fec81e46e
# Contracts (1)
dojo_starter::systems::actions::actions
  > Contract address: 0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3

🎉 Successfully migrated World on block #3 at address 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8

✨ Updating manifests...

✨ Done.
```

Your 🌎 is now deployed at `0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8`!

This establishes the world address for your project.

Let's discuss the `Scarb.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze (read more about it [here](/framework/config.md)). On this file, you have to update the value of `world_address` with the address we got from the output of `sozo migrate`.

```toml
[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
world_address = "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8" # Update this line with your world address
```

At the same time, make sure your file specifies the version of Dojo you have installed! In this case version `0.6.0`.

```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v0.6.0" }
```

By default the systems don't have write permission to the models, you can run `scripts/default_auth.sh` to grant those permission. From version
`0.7.0-alpha.1` this can be automatically done using overlay system.

### Indexing

With your local world address established, let's delve into indexing. You can index the entire world. To accomplish this we have to copy your `world address` from the output of `sozo migrate`. Now Open a new terminal and input this simple command that includes your own world address:

```bash
torii --world 0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8
```

Running the command mentioned above starts a [Torii](/toolchain/torii) server on your local machine. This server uses SQLite as its database and is accessible at http://0.0.0.0:8080/graphql. `Torii` will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:

```console
2024-04-08T04:59:51.165468Z  INFO torii::relay::server: Relay peer id. peer_id=12D3KooWQuidwFrvRrhzZ78UG6hTqUHh1TwzeR4J33M9qmJhMKeG
2024-04-08T04:59:51.170245Z  INFO libp2p_swarm: local_peer_id=12D3KooWQuidwFrvRrhzZ78UG6hTqUHh1TwzeR4J33M9qmJhMKeG
2024-04-08T04:59:51.172485Z  INFO torii::cli: Starting torii endpoint. endpoint=http://0.0.0.0:8080
2024-04-08T04:59:51.172496Z  INFO torii::cli: Serving Graphql playground. endpoint=http://0.0.0.0:8080/graphql
2024-04-08T04:59:51.172498Z  INFO torii::cli: Serving World Explorer. url=https://worlds.dev/torii?url=http%3A%2F%2Flocalhost%3A8080%2Fgraphql
2024-04-08T04:59:51.174014Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/tcp/9090
2024-04-08T04:59:51.174029Z  INFO torii::relay::server: New listen address. address=/ip4/10.0.43.105/tcp/9090
2024-04-08T04:59:51.174032Z  INFO torii::relay::server: New listen address. address=/ip4/172.17.0.1/tcp/9090
2024-04-08T04:59:51.174053Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/udp/9090/quic-v1
2024-04-08T04:59:51.174059Z  INFO torii::relay::server: New listen address. address=/ip4/10.0.43.105/udp/9090/quic-v1
2024-04-08T04:59:51.174064Z  INFO torii::relay::server: New listen address. address=/ip4/172.17.0.1/udp/9090/quic-v1
2024-04-08T04:59:51.174307Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/udp/9091/webrtc-direct/certhash/uEiAEYOqrpEJc3g77i_aR295QUNiTK9bJZSrjmDYKsV8O7g
2024-04-08T04:59:51.174319Z  INFO torii::relay::server: New listen address. address=/ip4/10.0.43.105/udp/9091/webrtc-direct/certhash/uEiAEYOqrpEJc3g77i_aR295QUNiTK9bJZSrjmDYKsV8O7g
2024-04-08T04:59:51.174325Z  INFO torii::relay::server: New listen address. address=/ip4/172.17.0.1/udp/9091/webrtc-direct/certhash/uEiAEYOqrpEJc3g77i_aR295QUNiTK9bJZSrjmDYKsV8O7g
2024-04-08T04:59:51.180017Z  INFO tori_core::engine: Processed block. block_number=3
2024-04-08T04:59:51.181230Z  INFO tori_core::engine: Processed block. block_number=4
2024-04-08T04:59:51.182020Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x0 uri=ipfs://Qmbx6D7ERFjF8q6zBpoJnvcBHfh8qRvyzxwNghDi9eegGR/
2024-04-08T04:59:51.182244Z  INFO tori_core::engine: Processed block. block_number=7
2024-04-08T04:59:51.192041Z  INFO torii_core::processors::register_model: Registered model. name=Moves
2024-04-08T04:59:51.198165Z  INFO torii_core::processors::register_model: Registered model. name=Position
2024-04-08T04:59:51.200032Z  INFO tori_core::engine: Processed block. block_number=9
2024-04-08T04:59:55.302098Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x0

```

You can observe that our `Moves` and `Position` models have been successfully registered.
Next, let's use the GraphQL IDE to retrieve data from all the models that have been registered. In your web browser, navigate to `http://0.0.0.0:8080/graphql`, and enter the following query:

```graphql
query {
  models {
    edges {
      node {
        id
        name
        classHash
        contractAddress
      }
    }
    totalCount
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "models": {
      "edges": [
        {
          "node": {
            "id": "0xfca8c67c1565ba003e0b460c4707b70c7e3179689528a0b502a6dd5df7d5a7",
            "name": "Moves",
            "classHash": "0x23c28dcfad6be01ca6509fdb35fd2bed6622238397613c60da5d387a43c38d0",
            "contractAddress": "0x4715b03ad3b22f6e078c3bddeb3e53ba431cd5648811ed7f4bb1aeda2fa6a82"
          }
        },
        {
          "node": {
            "id": "0x28b9aeb6b19af1454b16ce28c1ee6909e3946e4552ed09886a06ebe1e158fc",
            "name": "Position",
            "classHash": "0x2e9c42b868b520d54bff1b7f4c9b91f39bb2e2ad1c39d6484fb5d8a95382e01",
            "contractAddress": "0x77a78d8f32a65518588dd26cea8ef5355eb46aeae505f9a93f7cc437e122cd1"
          }
        }
      ],
      "totalCount": 2
    }
  }
}
```

Awesome, now let's work with subscriptions to get real-time updates. Let's clean up your workspace on the GraphQL IDE and input the following subscription:

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

Now, go back to your GraphQL IDE, and you will notice that you have received the subscription's results, which should look something like this:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666",
      "keys": [
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
      ],
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000a:0x4b26441ad51e51517c45c703579bd41e99401815d5dd12eadb7b1ef65242f2a:0x00",
      "createdAt": "2024-04-08T09:00:41Z",
      "updatedAt": "2024-04-08T09:00:41Z"
    }
  }
}
--------------------------------------------------------------------------------------------------------
{
  "data": {
    "entityUpdated": {
      "id": "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666",
      "keys": [
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
      ],
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000a:0x4b26441ad51e51517c45c703579bd41e99401815d5dd12eadb7b1ef65242f2a:0x01",
      "createdAt": "2024-04-08T09:00:41Z",
      "updatedAt": "2024-04-08T09:00:41Z"
    }
  }
}
```

In the GraphQL IDE, by clicking the `DOCS`-button on the right, you can open the API documentation. This documentation is auto-generated based on our schema definition and displays all API operations and data types of our schema. In order to know more about query and subscription, you can jump to [GraphQL](../toolchain/torii/graphql.md) section.
We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Ran the spawn system locally
- Interacted with GraphQL

### Next Steps

This overview provides a rapid end-to-end glimpse of Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?
