## Authorization

> Authorization is crucial to a world, just like how authorization is crucial to any smart contract.

As discussed in the [World](./world.md) chapter, Autonomous Worlds (AWs) function as sovereign chains nested within a public blockchain. These Worlds are also open to the public. This structure allows anyone to enhance a World by deploying models or systems. However, this openness also introduces security considerations. Similar to Ethereum, interacting with a model's state within a System requires the appropriate authorization from the model owner.

### Auth Architecture

Every time a `set!` is called in a `System`, the world checks if the `System` has authorization to update the model state. Only when the `System` possesses the necessary authorization, the `set!` is executed. The following diagram illustrates the authorization architecture.

![Authorization Architecture](/dojo-auth.png)

### Providing Authorization

> The deployer of the model is its initial owner. A model owner is able to grant the `owner` and `writer` roles. Only owners can grant a System the `writer` role which allows it to update the model.

`sozo` offers a convenient tool to authorize systems.

```shell
sozo auth writer Moves spawn
```

This command will generate a `writer` authorization for the `spawn` system to update the `Moves` model.
