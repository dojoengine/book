# What is Dojo?

Dojo is the culmination of lessons learned from attempts at building [onchain games](https://naavik.co/digest/primer-fully-on-chain-gaming), an emerging sector in the gaming industry. Any developer who has endeavored to build an on-chain game recognizes the inherent engineering hurdles - a realization that drove us to create Dojo. Just as you wouldn't recreate Unity every time you develop a new game, the same principle applies here. Dojo is designed to handle the complex infrastructure, allowing developers to focus on the unique aspects of their games.

Dojo aspires to be the go-to tool for building provable games. It is radically open-source, and all contributions are welcome.

---

## Stop building infrastructure; start building games

Dojo's suite of tools takes the infrastructure complexity out of building on-chain games. It includes:

### Entity Component System (ECS)

Dojo offers a standardized approach to building games on smart contracts. Recognizing the intricacies of game design, Dojo simplifies the development process, allowing creators to focus on gameplay logic. This standardization paves the way for an interconnected network of worlds, streamlining developer expertise and promoting game integration.

Utilizing the ECS (Entity Component System) as its core architecture, Dojo effectively manages the state and behavior of Autonomous Worlds (AWs). This model revolves around systems acting on entities, which are collections of pure data components. Systems efficiently determine which entities to process based on persistent queries over these components.

Read detailed information about the [Dojo ECS](../cairo/overview.md).

### [Torii](/crates/torii/README.md) - Starknet Indexer

Building on-chain games often involves grappling with the challenge of indexing on-chain state. However, Dojo standardizes contract states to mirror traditional relational databases. This setup enables the [Torii Indexer](../toolchain/torii/overview.md) to auto-index all contract states, ensuring efficient and streamlined queries. Torii then exposes these states via a GraphQL API or gRPC, allowing developers to easily query and retrieve data.

Using Torii drastically reduces the time and effort required to build on-chain games. It also eliminates the need to manually create indexers, which can be a tedious and error-prone process.

### [Katana](/crates/katana/README.md) - Blazingly fast development network

Katana is a customizable Starknet development network. It is blazingly fast and allows you to iterate on your game logic swiftly.

### [Sozo CLI](/crates/sozo/README.md) - CLI Management Tool

Dojo worlds are poised to become some of the largest contracts. Sozo is a CLI tool that assists you in managing your worlds. It enables you to create, build, test, and deploy your worlds. Additionally, you can craft new components and systems and register them with your world.

### What Dojo doesn't give you

1. Visual graphics - While Dojo provides networking and contracts, it doesn't offer graphical engines. You can bring your graphics of choice! Integrate your Dojo world with Unreal, Godot, or Unity.
