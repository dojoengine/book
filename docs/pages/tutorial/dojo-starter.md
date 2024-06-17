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

The scarb manifest (`Scarb.toml`) is a configuration file where project dependencies, metadata and other configurations are defined.

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
}

// ...
```

Notice the `#[dojo::model]` attribute. For a model to be recognized, we _must_ add this attribute to a Cairo struct. This signals to the Dojo compiler that this struct should be treated as a model.

<!-- Here we don't show the dojo::event, as first the user must understand that dojo already emit events that are processed by Torii when a model is set. -->

Our `Moves` model houses a `player` field. At the same time, we have the `#[key]` attribute, it informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you must provide the `player` field to query this model. Our `Moves` model also contains the `remaining` and `last_direction` fields.

:::warning
A model **must** have at least **one** key.
:::

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

Similarly, we have a `Position` model that is also indexed by the `player` field and includes a `Vec2` data structure. The `Vec2` structure holds `x` and `y` values. It is important to note that a model can contain any Cairo struct, provided the [`Introspect`](/framework/models/introspect) trait is derived. This trait informs the Dojo storage engine on how to handle the struct.

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

That compiled the models and systems into artifacts that can be deployed. Simple as that!

Now, let's deploy it to [Katana](/toolchain/katana)! First, we need to get Katana running. Open a second terminal and execute:

```bash
katana --disable-fee  --allowed-origins "*"
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
  > Total diffs found: 5
[3] 📦 Preparing for migration....
  > Total items to be migrated (5): New 5 Update 0
[4] 🛠 Migrating....

# Base Contract
  > Class Hash: 0x22f3e55b61d86c2ac5239fa3b3b8761f26b9a5c0b5f61ddbd5d756ced498b46
# World
  > Contract address: 0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18
# Models (3)
dojo_starter::models::moves::directions_available
  > Class hash: 0x13fc796dd2d767ca4051ee20d673074f74b6e6b072bef1926ba429e427c8080
dojo_starter::models::moves::moves
  > Class hash: 0x4cccc308e899b0db11f3e47bcc3bf555d348102e1d89c85e8ba72f5f1098107
dojo_starter::models::position::position
  > Class hash: 0x4312e0e9fa6d912c293311798591e5022744a5fbebefc5ddfcfcc9b7c0c9be1
All models are registered at: 0x5e70615c3c6ab984233cd1c6164640edff183965d684ea24e134d5c45558c83
# Contracts (1)
dojo_starter::systems::actions::actions
  > Contract address: 0x3610b797baec740e2fa25ae90b4a57d92b04f48a1fdbae1ae203eaf9723c1a0

🎉 Successfully migrated World on block #3 at address 0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18 // [!code focus]

[5] ✨ Updating manifests....

✨ Done.

[6] 🖋️ Authorizing Models to Systems (based on overlay)....

  > Authorizing dojo_starter::systems::actions::actions for Models: ["Position", "Moves"]
Transaction hash: 0x1c6bb2f6f7978d32751c42d527b94b4f6644c34404cf8faeedfa4efe25da73
  > Auto authorize completed successfully

[7] 🌐 Uploading metadata....

  > world: ipfs://QmPVJzGEcj9Buy1mxTaXf43Fsv8CAzAwLNrjAN8JbigNQE
  > dojo_starter::models::moves::moves: ipfs://QmeEbEAi3yr8Rxzi5TWc3MBncj295waxgeftQwbhNzrWnz
  > dojo_starter::models::moves::directions_available: ipfs://QmbfMea3hDYMsS4gKpHjWW1h7RTPZv86Ua9BwEsHGzoZiH
  > dojo_starter::systems::actions::actions: ipfs://Qmb9xTtZ7seVpmBj3vMdv4ox9PJMypAzzXdYgm9TpXR5cX
  > dojo_starter::models::position::position: ipfs://QmV3jymZLP6HJe26m9JchTogDY6xNedmT4h88xAvPfAroT
> All IPFS artifacts have been successfully uploaded.
> All metadata have been registered in the resource registry (tx hash: 0x3335da62b94248264c220035f6fadee728328a181a9bdb2caad851f3da247ac)

✨ Done.
```

Your 🌎 is now deployed at `0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18`!

This establishes the world address for your project.

Let's discuss the `Scarb.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze (read more about it [here](/framework/config.md)). On this file, you have to update the value of `world_address` with the address we got from the output of `sozo migrate`.

```toml
[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
world_address = "0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18"
```

At the same time, make sure your file specifies the version of Dojo you have installed! In this case version `0.7.0`.

```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v0.7.0" }
```

### Indexing

With your local world address established, let's delve into indexing. You can index the entire world. To accomplish this we have to copy your `world address` from the output of `sozo migrate`. Now Open a new terminal and input this simple command that includes your own world address:

```bash
torii --world 0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18 --allowed-origins "*"
```

Running the command mentioned above starts a [Torii](/toolchain/torii) server on your local machine. This server uses SQLite as its database and is accessible at http://0.0.0.0:8080/graphql. `Torii` will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:

```console
2024-06-14T04:38:33.450886Z  INFO torii::relay::server: Relay peer id. peer_id=12D3KooWNJYDBVvnrWgi6QeVaQr6TZMEgJNni51UhZVGw1is4i9P
2024-06-14T04:38:33.451533Z  INFO libp2p_swarm: local_peer_id=12D3KooWNJYDBVvnrWgi6QeVaQr6TZMEgJNni51UhZVGw1is4i9P
2024-06-14T04:38:33.452284Z  INFO torii::cli: Starting torii endpoint. endpoint=http://127.0.0.1:8080
2024-06-14T04:38:33.452289Z  INFO torii::cli: Serving Graphql playground. endpoint=http://127.0.0.1:8080/graphql
2024-06-14T04:38:33.452292Z  INFO torii::cli: Serving World Explorer. url=https://worlds.dev/torii?url=http%3A%2F%2F127.0.0.1%3A8080%2Fgraphql
2024-06-14T04:38:33.452388Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/tcp/9090
2024-06-14T04:38:33.452405Z  INFO torii::relay::server: New listen address. address=/ip4/192.168.1.249/tcp/9090
2024-06-14T04:38:33.452417Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/udp/9090/quic-v1
2024-06-14T04:38:33.452422Z  INFO torii::relay::server: New listen address. address=/ip4/192.168.1.249/udp/9090/quic-v1
2024-06-14T04:38:33.452441Z  INFO torii::relay::server: New listen address. address=/ip4/127.0.0.1/udp/9091/webrtc-direct/certhash/uEiCGVkq8QLf7zYLTYj389DZOcEjPOlTTj0D8VdFWb8qg9w
2024-06-14T04:38:33.452451Z  INFO torii::relay::server: New listen address. address=/ip4/192.168.1.249/udp/9091/webrtc-direct/certhash/uEiCGVkq8QLf7zYLTYj389DZOcEjPOlTTj0D8VdFWb8qg9w
2024-06-14T04:38:33.455849Z  INFO tori_core::engine: Processed block. block_number=3
2024-06-14T04:38:33.455857Z  INFO tori_core::engine: Processed block. block_number=7
2024-06-14T04:38:33.455860Z  INFO tori_core::engine: Processed block. block_number=9
2024-06-14T04:38:33.455862Z  INFO tori_core::engine: Processed block. block_number=10
2024-06-14T04:38:33.455864Z  INFO tori_core::engine: Processed block. block_number=11
2024-06-14T04:38:33.466242Z  INFO torii_core::processors::register_model: Registered model. name=DirectionsAvailable
2024-06-14T04:38:33.474421Z  INFO torii_core::processors::register_model: Registered model. name=Moves // [!code focus]
2024-06-14T04:38:33.481562Z  INFO torii_core::processors::register_model: Registered model. name=Position // [!code focus]
2024-06-14T04:38:33.483915Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x0 uri=ipfs://QmPVJzGEcj9Buy1mxTaXf43Fsv8CAzAwLNrjAN8JbigNQE/
2024-06-14T04:38:33.483953Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x2491b781c4270f3f07a935b043ba8e1adf26afff83a3de3c6d5b87f1d0e23a5 uri=ipfs://QmbfMea3hDYMsS4gKpHjWW1h7RTPZv86Ua9BwEsHGzoZiH/
2024-06-14T04:38:33.483989Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x23a5929b01fe8ac7a5c4ac078445d94c81ecdc23ae2c5c8555b3a4e0280964a uri=ipfs://QmeEbEAi3yr8Rxzi5TWc3MBncj295waxgeftQwbhNzrWnz/
2024-06-14T04:38:33.484024Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x19a4478427ad87dac878352f7b5c33354395e17e7041e759f9581174962fe72 uri=ipfs://QmV3jymZLP6HJe26m9JchTogDY6xNedmT4h88xAvPfAroT/
2024-06-14T04:38:33.484059Z  INFO torii_core::processors::metadata_update: Resource metadata set. resource=0x3610b797baec740e2fa25ae90b4a57d92b04f48a1fdbae1ae203eaf9723c1a0 uri=ipfs://Qmb9xTtZ7seVpmBj3vMdv4ox9PJMypAzzXdYgm9TpXR5cX/
2024-06-14T04:38:34.061939Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x19a4478427ad87dac878352f7b5c33354395e17e7041e759f9581174962fe72
2024-06-14T04:38:34.066134Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x2491b781c4270f3f07a935b043ba8e1adf26afff83a3de3c6d5b87f1d0e23a5
2024-06-14T04:38:34.077085Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x23a5929b01fe8ac7a5c4ac078445d94c81ecdc23ae2c5c8555b3a4e0280964a
2024-06-14T04:38:34.091113Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x3610b797baec740e2fa25ae90b4a57d92b04f48a1fdbae1ae203eaf9723c1a0
2024-06-14T04:38:34.776025Z  INFO torii_core::processors::metadata_update: Updated resource metadata from ipfs. resource=0x0
```

You can observe that our `Moves` and `Position` models have been successfully registered.
Next, let's use the GraphQL IDE to retrieve data from all the models that have been registered. In your web browser, navigate to `http://localhost:8080/graphql`, and enter the following query:

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
            "name": "Moves", // [!code focus]
            "classHash": "0x4d6f766573",
            "contractAddress": "0x4cccc308e899b0db11f3e47bcc3bf555d348102e1d89c85e8ba72f5f1098107"
          }
        },
        {
          "node": {
            "id": "0x3b87b389f49db996832881ced84132a8ebeae71459c96a65b85deb95710e14d",
            "name": "DirectionsAvailable", // [!code focus]
            "classHash": "0x446972656374696f6e73417661696c61626c65",
            "contractAddress": "0x13fc796dd2d767ca4051ee20d673074f74b6e6b072bef1926ba429e427c8080"
          }
        },
        {
          "node": {
            "id": "0x28b9aeb6b19af1454b16ce28c1ee6909e3946e4552ed09886a06ebe1e158fc",
            "name": "Position", // [!code focus]
            "classHash": "0x506f736974696f6e",
            "contractAddress": "0x4312e0e9fa6d912c293311798591e5022744a5fbebefc5ddfcfcc9b7c0c9be1"
          }
        }
      ],
      "totalCount": 3
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
  > Contract address: 0x3610b797baec740e2fa25ae90b4a57d92b04f48a1fdbae1ae203eaf9723c1a0
```

We have to use `actions` contract address to start to create entities. In your main local terminal, run the following command:

```bash
sozo execute dojo_starter::systems::actions::actions spawn
```

By running this command, you've executed the spawn system, resulting in the creation of a new entity.

Now, go back to your GraphQL IDE, and you will notice that you have received the subscription's results, which should look something like this:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666",
      "keys": [
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
      ],
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000f:0x6b2680bb8a14ca0d1ba05131069dfec2c0e9525c8d3c4773f345c9ad5ebf198:0x00",
      "createdAt": "2024-06-14T04:46:44Z",
      "updatedAt": "2024-06-14T04:46:44Z"
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
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000f:0x6b2680bb8a14ca0d1ba05131069dfec2c0e9525c8d3c4773f345c9ad5ebf198:0x01",
      "createdAt": "2024-06-14T04:46:44Z",
      "updatedAt": "2024-06-14T04:46:44Z"
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
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000f:0x6b2680bb8a14ca0d1ba05131069dfec2c0e9525c8d3c4773f345c9ad5ebf198:0x02",
      "createdAt": "2024-06-14T04:46:44Z",
      "updatedAt": "2024-06-14T04:46:44Z"
    }
  }
}
```

In the GraphQL IDE, by clicking the `DOCS`-button on the right, you can open the API documentation. This documentation is auto-generated based on our schema definition and displays all API operations and data types of our schema. In order to know more about query and subscription, you can jump to [GraphQL](/toolchain/torii/graphql.md) section.

We've covered quite a bit! Here's a recap:

- Built a Dojo world
- Deployed the project to Katana
- Indexed the world with Torii
- Executed the `spawn` system locally
- Interacted with GraphQL

### Next Steps

This overview provides a rapid end-to-end glimpse of Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and models, Dojo is equipped for expansive creativity. So, what will you craft next?
