# World Contract

The World contract acts as a central database that stores all models and systems while managing permissions. Think of it as a global store for your application's state.

:::tip[Resource]
In the Dojo world, we define the term `resource` to refer to any model or system that can be registered in the world. The world itself is a special resource, with the value `0`.

The type used to define a resource is `felt252`, the most basic type in Starknet.
:::

By abstracting these details with the World [API](/framework/world/api.md), developers can focus on building rich, interactive systems without worrying about the underlying data management intricacies.

Each project utilizing the same version of Dojo employs an identical world contract, which is part of the [dojo-core](https://github.com/dojoengine/dojo/tree/main/crates/dojo-core) library.

Dive into the world contract details:

-   [API](/framework/world/api) the full API of the world contract and some utilities functions.
-   [Events](/framework/world/events) emitted by the world to notify the indexer about state changes of the world.
-   [Authorization](/framework/authorization) how to grant and revoke permissions to define who can write and read to the world's models.
-   [Metadata](/framework/world/metadata) how to set and get metadata for the world.
