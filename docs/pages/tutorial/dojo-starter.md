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
├── dojo_dev.toml
├── Scarb.toml
└── src
    ├── lib.cairo
    ├── models.cairo
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
pub struct Moves {
    #[key]
    pub player: ContractAddress,
    pub remaining: u8,
    pub last_direction: Direction,
    pub can_move: bool,
}

// ...
```

Notice the `#[dojo::model]` attribute. For a model to be recognized, we _must_ add this attribute to a Cairo struct. This signals to the Dojo compiler that this struct should be treated as a model.

<!-- Here we don't show the dojo::event, as first the user must understand that dojo already emit events that are processed by Torii when a model is set. -->

Our `Moves` model houses a `player` field. At the same time, we have the `#[key]` attribute, it informs Dojo that this model is indexed by the `player` field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you must provide the `player` field to query this model. Our `Moves` model also contains the `remaining`, `last_direction` and `can_move` fields.

:::warning
A model **must** have at least **one** key.
:::

Next, we check out the `Position` model.

```rust
// ...
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Position {
    #[key]
    pub player: ContractAddress,
    pub vec: Vec2,
}

#[derive(Copy, Drop, Serde, Introspect)]
pub struct Vec2 {
    pub x: u32,
    pub y: u32
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
    // Get the address of the current caller, possibly the player's address.
    let player = get_caller_address();
    // Retrieve the player's current position from the world.
    let position = get!(world, player, (Position));
    // Update the world state with the new data.
    // 1. Set the player's remaining moves to 100.
    // 2. Move the player's position 10 units in both the x and y direction.

    set!(
        world,
        (
            Moves {
                player, remaining: 100, last_direction: Direction::None(()), can_move: true
            },
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
        Moves {
            player, remaining: 100, last_direction: Direction::None(()), can_move: true
        },
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
  > Total diffs found: 6
[3] 📦 Preparing for migration....
  > Total items to be migrated (6): New 6 Update 0
  > Declarers: 10
[4] 🛠 Migrating....

# Base Contract
  > Class Hash: 0x2427dd10a58850ac9a5ca6ce04b7771b05330fd18f2e481831ad903b969e6b2
# World
  > Contract address: 0x403b5f047b8c4797139e30801e310473d99ca6877d19e0f27506f353f8f70f7
# Namespaces (1)
dojo_starter
All namespaces are registered at: 0x37c6e486c0760f1dadb8de1470fd5ae05a1e5db0bee933c1bcab60dfc103f8d

# Models (4)
dojo_starter-Position
  > Selector: 0x02ac8b4c190f7031b9fc44312e6b047a1dce0b3f2957c33a935ca7846a46dd5b
dojo_starter-Moves
  > Selector: 0x02a29373f1af8348bd366a990eb3a342ef2cbe5e85160539eaca3441a673f468
dojo_starter-DirectionsAvailable
  > Selector: 0x077844f1facb51e60e546a9832d56c6bd04fa23be4fd5b57290caae5e9a3c1e4
dojo_starter-Moved
  > Selector: 0x0504403e5c02b6442527721fc464d9ea5fc8f1ee600ab5ccd5c0845d36fd45f1
All models are registered at: 0xf917a6f806fc45547b77d7a3a2e0bc2ea6c034643c0dfd5b46635e8a7638eb

# Contracts (1)
dojo_starter-actions
  > Selector: 0x07a1c71029f2d0b38e3ac89b09931d08b6e48417e079c289ff19a8698d0cba33
dojo_starter-actions
  > dojo_starter-actions deployed at 0x0036e4506b35e6dfb301d437c95f74b3e1f4f82da5d8841bec894bb8de29ec13
All contracts are deployed at: 0x105cb76624c56a6ba339f350ef667d317e75a7fd78dba2d66f3b74e907aebb1


🎉 Successfully migrated World on block #3 at address 0x403b5f047b8c4797139e30801e310473d99ca6877d19e0f27506f353f8f70f7

[5] ✨ Updating manifests....

✨ Done.

[6] 🖋️ Authorizing systems based on overlay....
  > Granting write access to dojo_starter-actions for resources: [Model("dojo_starter-Moves"), Model("dojo_starter-Position"), Model("dojo_starter-DirectionsAvailable")]

  > Transaction hash: 0x0472b776a712c422ae390860ae7b77aa126706635c99a0794b76a84c84279015
  > Auto authorize completed successfully

[7] 🏗️ Initializing contracts....
  > All contracts are initialized at: 0x40d181fd3668dcba8ec2837eb17f934f2e23e69abf09b403b3406d9ca1d7484


[8] 🌐 Uploading metadata....

  > world: ipfs://QmQ9Diuy7pdRSGe7PpyWKBCSaWyUhmQ3tdbZqAGTXt745S
  > dojo_starter-Position: ipfs://QmfLHkZsRaacbjJu9RavwCXHKSEB4Noxu688pSg4ahmnke
  > dojo_starter-DirectionsAvailable: ipfs://QmXWVb9fseGjEsn61XGV8rZk7Kat8MCUiMFEebjkpb388D
  > dojo_starter-Moves: ipfs://QmefijvZRxY1rPc8DXaghjLxnhVYJ4etQmXNwrvM2iiVX6
  > dojo_starter-actions: ipfs://QmQeXiUNhLgwoBjXiV6wk8FECYsa3s11Ek9WABeDabhom4
  > dojo_starter-Moved: ipfs://QmZLVkYkeHwfCaQCkuU8j8Deejfaoi71Uo4rq3WjamuzRd
> All IPFS artifacts have been successfully uploaded.
> All metadata have been registered in the resource registry (tx hash: 0x2e8e98a20736b0cecf86c2cfdc47d4ade45bf30bbd8c933fdc7b465dc2aacf)

✨ Done.
```

Your 🌎 is now deployed at `0x403b5f047b8c4797139e30801e310473d99ca6877d19e0f27506f353f8f70f7`!

This establishes the world address for your project.

Let's discuss the `dojo_dev.toml` file in the project. This file contains environment variables that make running CLI commands in your project a breeze (read more about it [here](/framework/config.md)). On this file, you have to update the value of `world_address` with the address we got from the output of `sozo migrate`.

```toml
[namespace]
default = "dojo_starter"

[env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
world_address = "0x403b5f047b8c4797139e30801e310473d99ca6877d19e0f27506f353f8f70f7"
```

At the same time, make sure your `Scarb.toml` specifies the version of Dojo you have installed! In this case version `1.0.0-alpha.6`.

```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.0.0-alpha.6" }
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
            "id": "0x77844f1facb51e60e546a9832d56c6bd04fa23be4fd5b57290caae5e9a3c1e4",
            "name": "DirectionsAvailable",
            "classHash": "0x72c6666cfeebc41544f502cfe9c32ad7b91fce12881709420335794dfcb324a",
            "contractAddress": "0x22b8e785874a484dfd2c7f0d8cf4022f83437a4b487b0770325141306fa8aa5"
          }
        },
        {
          "node": {
            "id": "0x504403e5c02b6442527721fc464d9ea5fc8f1ee600ab5ccd5c0845d36fd45f1",
            "name": "Moved",
            "classHash": "0x2e06be7cf406eb3161fedf460a47faca68855eb9dad7d505c1b1f1875192ccd",
            "contractAddress": "0x41fca6e3b33c7f7c56fdb195b089539cdd192398d42e4f9d8d92ac43cf6fb9f"
          }
        },
        {
          "node": {
            "id": "0x2ac8b4c190f7031b9fc44312e6b047a1dce0b3f2957c33a935ca7846a46dd5b",
            "name": "Position",
            "classHash": "0x6531637b0bbd741f8823b127d8958ed10a483dd1f2d7654975c1d7d7cbdab65",
            "contractAddress": "0x285c5c04f1481b5cbe099b4468ede734afc6e0a3573a29509ebbf84b1b5a6f3"
          }
        },
        {
          "node": {
            "id": "0x2a29373f1af8348bd366a990eb3a342ef2cbe5e85160539eaca3441a673f468",
            "name": "Moves",
            "classHash": "0x4eac0db062821cc05485ba088b0bb748de83e901116216da171744dfc5ec6fa",
            "contractAddress": "0x6412c0cca558376ca4cf39e7ee5424fee5318af0ea4d7b3e8b79eee83949bf1"
          }
        }
      ],
      "totalCount": 4
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
dojo_starter-actions
  > Selector: 0x07a1c71029f2d0b38e3ac89b09931d08b6e48417e079c289ff19a8698d0cba33
dojo_starter-actions
  > dojo_starter-actions deployed at 0x0036e4506b35e6dfb301d437c95f74b3e1f4f82da5d8841bec894bb8de29ec13
All contracts are deployed at: 0x105cb76624c56a6ba339f350ef667d317e75a7fd78dba2d66f3b74e907aebb1
```

We have to use `actions` contract address to start to create entities. In your main local terminal, run the following command:

```bash
sozo execute dojo_starter-actions spawn
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
      "eventId": "0x00000000000000000000000000000000000000000000000000000000000012:0x1d2f2786ed8b6df578b7c8320a84373d53cd55ffe9a7e3417ec9bbf38ddf455:0x01",
      "createdAt": "2024-08-19T02:30:28Z",
      "updatedAt": "2024-08-19T02:31:45Z"
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
      "eventId": "0x00000000000000000000000000000000000000000000000000000000000013:0x3979232585d8e560506f9bc5d4242e8d54843d4b99515ebbf57fddcc7528a5f:0x01",
      "createdAt": "2024-08-19T02:30:28Z",
      "updatedAt": "2024-08-19T02:32:02Z"
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
      "eventId": "0x00000000000000000000000000000000000000000000000000000000000014:0x5c1d9f4c6e594a96084dc39053691aa529a23a415388020871e46b662e4ff81:0x01",
      "createdAt": "2024-08-19T02:30:28Z",
      "updatedAt": "2024-08-19T02:32:59Z"
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
