# FAQs


#### Who owns Dojo?

Dojo is strictly open-source and use the Apache 2.0 license. Anyone can use Dojo for free, and anyone can contribute to the project.

#### Why Dojo?

Dojo was created so solve the Dojo founders problems when building onchain games. It standardizes the process of building onchain games, and provides a suite of tools to make it easier to build onchain games.

#### What is the Dojo roadmap?

Dojo is rapdidly evolving. Find open issues on the [Dojo Github](https://github.com/dojoengine/dojo/issues) and join the [Discord](https://discord.gg/vUN4Xq9Qv6) to get involved. If you have ideas for the project open issues.

#### What is an onchain game?

Onchain games are types of games that exist entierly on a public blockchain network, all state and logic exists onchain. Clients (web browser etc) do not exist on chain, these exist purely to interact with and interpret the onchain state.

#### What is an autonomous world?

An autonomous world is a world that exists entierly onchain. It is a world that is not controlled by any one entity, and is instead controlled by the rules of the world. Read deeply here [Autonomous Worlds](../theory/autonomous-worlds.md)


#### What is Cairo?

Cairo is a programming language designed for Starkware's StarkNet. It is a Turing-complete language that is designed to be used for general-purpose computation on StarkNet. It is a low-level language that is designed to be compiled to StarkNet's native virtual machine. Read more here [Cairo](../theory/cairo.md)

#### What is a provable game?

Thanks to the magic of zero-knowledge proofs, we can prove a game is fair by verifying a zk proof that was created off-chain. So, what does that mean? Imagine a game of chess. We aim to create a user experience where both players can trust that each other's moves are truthful. This is a straightforward approach, and of course, the rules of chess are quite simple. If we were to implement this in a blockchain environment, players would submit every move to the blockchain as a transaction. This isn't practical from a cost perspective since transaction costs add up. All we really want to know is who won the game; the blockchain doesn't need details of every move.

Using zk proofs and client communications, we can establish a state channel between the players, allowing them to share moves with each other off-chain and verify that the moves are truthful. Once the game concludes, we can submit a zk proof to the blockchain, proving the game was played fairly. This is a provable game.