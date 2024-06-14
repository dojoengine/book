# World Contract

The World in Dojo acts as a comprehensive database, maintaining a registry of all models and systems, while also managing permissions. This centralized contract ensures that every interaction within the Dojo ecosystem is consistent and secure, providing a reliable foundation for game state management and operations.

:::tip[Resource]
In the Dojo world, we define the term `resource` to refer to any model or system that can be registered in the world. The world itself is a special resource, with the value `0`.

The type used to define a resource is `felt252`, the most basic type in Starknet.
:::

By abstracting these details with the Dojo [macros](/framework/contracts/macros.md), developers can focus on building rich, interactive systems without worrying about the underlying data management intricacies.

Each project utilizing the same version of Dojo employs an identical world contract, which is part of the [dojo-core](https://github.com/dojoengine/dojo/tree/main/crates/dojo-core) library.

Although we suggest strongly to structure your world around an ECS pattern you are not required to do so. You can simply use the dojo-models as a keypair store along with the supporting infrastructure.

Dive into the world contract details:

- [Events](/framework/world/events) emitted by the world to notify the indexer about state changes of the world.
- [Authorization](/framework/world/authorization) how to grant and revoke permissions to define who can write and read to the world's models.
- [Metadata](/framework/world/metadata) how to set and get metadata for the world.
- [API](/framework/world/api) the full API of the world contract and some utilities functions.
