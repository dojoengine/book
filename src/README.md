## Dojo: The provable games engine

This guide is dedicated to familiarizing you with the Dojo engine and the transformative potential of Provable games. A special section on the [Theory](./theory/autonomous-worlds.md) elucidates this emergent concept of autonomous worlds and Provable games.

## What is Dojo?
Dojo is a provable game engine with an integrated toolchain, designed for creating onchain games and autonomous worlds using [Cairo 1.0](https://github.com/starkware-libs/cairo). It employs an [entity component system](https://en.wikipedia.org/wiki/Entity_component_system) and a [diamond pattern](https://eips.ethereum.org/EIPS/eip-2535), facilitating a modular, scalable world. Worlds grow via the addition of Components (state) and Systems (logic). Our architectural design is greatly influenced by the brilliant [Bevy](https://bevyengine.org/) engine.

#### Key Features
- Entity Component System (ECS) built on [Cairo 1.0](https://github.com/starkware-libs/cairo)
- [Sozu](./framework/sozo/overview.md) world migration planner
- [Torii](./framework/torii/overview.md) networking and indexing stack
- [Katana](./framework/katana/overview.md) RPC development network
- Typed SDKs

> Dojo is an open-source project, currently in its early development phase, and warmly welcomes contributors. For additional resources, find the book on [Github](https://github.com/dojoengine/book).


### Why Dojo?

Dojo is the culmination of lessons learned from attempts at building onchain games, an emerging sector in the gaming industry. Any developer who has endeavored to build an onchain game appreciates the inherent engineering hurdles - a realization that drove us to create Dojo. Just as you wouldn't recreate Unity every time you develop a new game, the same principle applies here. Dojo is designed to handle the complex infrastructure, allowing developers to focus on the unique aspects of their games.


### Why Cairo & Starknet?

Provable games demand zero-knowledge properties for efficient scaling and verification of computations. Cairo addresses this need by providing a generalized language, eliminating the complexity of creating circuits to incorporate SNARKs. Simply program in Cairo and your applications become automatically provable. Moreover, you can deploy your programs on the Cairo Virtual Machine (CVM), which is compatible with Starknet's Layer 2, Starknet appchains, and even in-browser through WebAssembly (WASM)! Dojo aims to supply straightforward ZK primitives to fuel your game development.



### Vision
Dojo is a bold work in progress, aimed at empowering developers to construct onchain games and Autonomous Worlds (AWs) within hours, not weeks.

### Organizational Structure
Dojo is an open-source initiative, licensed under MIT, dedicated to promoting and advancing the concept of Autonomous Worlds (AWs).
