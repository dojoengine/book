## Authorization

> Authorization is crucial to a world, just like how authorization is crucial to any smart contract.

As discussed in the [World](./world.md) chapter, Autonomous Worlds (AWs) function as sovereign chains nested within a public blockchain. These Worlds are also open to the public. This structure allows anyone to enhance a World by deploying components or systems. However, this openness also introduces security considerations. Similar to Ethereum, interacting with a component's state within a System requires the appropriate authorization from the component owner.

### Auth Architecture

Every time a `set!` is called in a `System`, the world checks if the `System` has authorization to update the component state. Only when the `System` possesses the necessary authorization, the `set!` is executed. The following diagram illustrates the authorization architecture.

![Authorization Architecture](../images/dojo-auth.png)

### Providing Authorization

> It is essential to remember that the deployer of the Component is its owner, and only they can authorize Systems to update the Component.

`sozo` offers a convenient tool to authorize systems.

```shell
sozo auth writer Moves spawn
```

This command will generate a `writer` authorization for the `spawn` system to update the `Moves` component.