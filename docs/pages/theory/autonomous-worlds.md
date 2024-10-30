## Onchain games to provable games

Onchain games promise us freedom of expression and sovereignty over our information. They possess these properties because they run on a blockchain verified by consensus. Provable games, using zk proofs, allow for the verification of game state and computations without large consensus schemes. Written in languages like Cairo, Noir or running RISC-Zero, these games can operate independently on an isolated zkVM like a browser, with verifiable outputs ensuring truthful execution. This broadens our possibilities in the onchain gaming industry.

An illustrative example is a game like Donkey Kong. Currently, to have your high score recognized on the leaderboard, you must play on a certified machine to prevent cheating, while recording your gameplay. However, if Donkey Kong were a provable game, players could compete in isolation. Achieving a high score would simply require submitting a proof to the Donkey Kong organization for verification. This method allows players to establish themselves as the King of Kong from the comfort of their home, without the need to record their gameplay!

It's important to note that the approach isn't binary. For instance, you could operate an onchain game on an EVM and then layer a Cairo-based game on top, enhancing the core game while broadening its capabilities.

For more information about Starknet, Cairo and its tech stack, check out the [Starknet & Cairo book](https://book.starknet.io/).

## Autonomous Worlds

> "Autonomous worlds represent persistent, permissionless, and decentralized open environments that users can freely interact with and contribute to."

The precise definition of Autonomous Worlds (AWs) remains somewhat elusive, as it is more of an abstract concept that has yet to be fully crystallized. Lattice first [introduced](https://0xparc.org/blog/autonomous-worlds) the terminology in 2022, but the notion of open worlds operating on the blockchain has been around for a while. The abstraction introduced by MUD served as a catalyst for the market to recognize the potential of these worlds.

Autonomous Worlds share notable similarities with blockchains in their fundamental nature. Once established, they persist, maintaining their state throughout the lifespan of the chain. Players can join or leave, and developers can expand these worlds by deploying features in a permissionless manner, much like how contracts are added to a chain. While there is no universally accepted definition for an Autonomous World, we believe that a game must possess at least the following two essential features to be considered as such:

1. Decentralized data availability layer: While the state execution may reside on a centralized layer, it is crucial that the state can be reconstructed if the execution layer ceases to exist. Rollups offer a solution, providing increased capacity execution layers while ensuring data is permanently settled on Ethereum. This guarantees the world's perpetual persistence.

2. Permissionless entry point for expanding the world: The World contract must be capable of accepting new systems and components without requiring permission. While this doesn't imply that every component and system will be utilized, they must adhere to this pattern, ensuring open and unrestricted access for potential enhancements.

We're firm believers in the potential for Autonomous Worlds to catalyze the exploration of novel forms in the medium provided by zk proofs and blockchain technology. This is not only about games, but also about new forms of artwork, coordination, fun, emerging from tinkering and radical innovation, eventually questioning the very notion of "play" in this brave new decentralized and trustless world.

### Homework

-   [Wired - Autonomous Worlds Primer](https://www.wired.com/story/autonomous-worlds-aim-to-free-online-games-from-corporate-control/)
-   [0xParc - Autonomous Worlds (Part 1)](https://0xparc.org/blog/autonomous-worlds)
-   [Gubsheep - The Strongest Crypto Gaming Thesis](https://gubsheep.substack.com/p/the-strongest-crypto-gaming-thesis)
-   [Lattice - MUD: An engine for Autonomous Worlds](https://lattice.xyz/blog/mud-an-engine-for-autonomous-worlds)
-   [Guiltygyoza - Game 2.0](https://www.guiltygyoza.xyz/2022/07/game2)
-   [Guiltygyoza - Composable Engineering](https://www.guiltygyoza.xyz/2023/05/composable-engineering)
-   [Jay Springett - Wind-up Worlds](https://www.thejaymo.net/2022/05/06/wind-up-worlds/)
-   [Are.na collection on Autonomous Worlds](https://www.are.na/sylve-chevet/on-chain-realities-and-autonomous-worlds)
-   [Tarrence - Provable Games](https://www.dojoengine.org/en/articles/provable-games/)
-   [Loaf - Provable Goblins](https://loaf.coffee/posts/provable-goblins)
