## Dojo: The Provable Game Engine

Dojo is a provable game engine with an integrated toolchain, designed for creating onchain games and autonomous worlds using [Cairo 1.0](https://github.com/starkware-libs/cairo). 

It employs an [entity component system](https://en.wikipedia.org/wiki/Entity_component_system) and a [diamond pattern](https://eips.ethereum.org/EIPS/eip-2535), facilitating a modular, scalable world. Worlds grow via the addition of Components (state) and Systems (logic). Our architectural design is greatly influenced by the brilliant [Bevy](https://bevyengine.org/) engine.

> This book is dedicated to familiarizing you with the Dojo engine and the potential of Provable games. A special section on the [Theory](./theory/autonomous-worlds.md) elucidates this emergent concept of autonomous worlds and Provable games.

### Key Features

1. **Entity Component System (ECS)**: Crafted in [Cairo](https://github.com/starkware-libs/cairo), it provides a solid foundation to structure your game.
2. **[Torii Indexer](/crates/torii/README.md)**: Say goodbye to manually creating indexers. Torii does it automatically for you!
3. **[Katana Network](/crates/katana/README.md)**: An RPC development network to streamline and expedite your game's iterative processes.
4. **[Sozo CLI](/crates/sozo/README.md)**: Your trusty CLI tool to oversee and upkeep your worlds.
5. **Typed SDKs**: For a smoother, error-free coding experience.

Here's a video of [Cartridge](https://cartridge.gg/)'s [Tarrence](https://twitter.com/tarrenceva) explaining how Dojo works at the 2023 [Autonomous Anonymous Summit](https://twitter.com/pet3rpan_/status/1666764726427353091):

<video controls poster="https://gf326cjag4w6pdpc42qp22enfhxsywmq6sgs7mkxbn6el7aioyxa.arweave.net/MXevCSA3LeeN4uag_WiNKe8sWZD0jS-xVwt8RfwIdi4">
  <source src="https://sfx25btazqz62pajxecorlp4exskwgokakub44rxmpnsosep5iqa.arweave.net/kW-uhmDMM-08CbkE6K38JeSrGcoCqB5yN2PbJ0iP6iA" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Why Dojo?

Dojo is the culmination of lessons learned from attempts at building [onchain games](https://naavik.co/digest/primer-fully-on-chain-gaming), an emerging sector in the gaming industry. Any developer who has endeavored to build an onchain game appreciates the inherent engineering hurdles - a realization that drove us to create Dojo. Just as you wouldn't recreate Unity every time you develop a new game, the same principle applies here. Dojo is designed to handle the complex infrastructure, allowing developers to focus on the unique aspects of their games.


> Dojo is an open-source project, currently in its early development phase, and warmly welcomes contributors. For additional resources, find the book on [Github](https://github.com/dojoengine/book).

### Organizational Structure
Dojo is an open-source initiative, licensed under MIT, dedicated to promoting and advancing the concept of Autonomous Worlds (AWs). It is spearheaded by [Cartridge](https://cartridge.gg/), [Realms & BibliothecaDAO](https://bibliothecadao.xyz/), [briq](https://briq.construction/) and many more [contributors](https://github.com/orgs/dojoengine/people).

### How do I get involved?

Check out our [Github](https://github.com/dojoengine), our [Twitter](https://twitter.com/dojostarknet), [Discord](https://discord.gg/vUN4Xq9Qv6) and [contribution guide](https://book.dojoengine.org/misc/contributors.html!)
