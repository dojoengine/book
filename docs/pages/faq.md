---
title: Frequently Asked Questions
description: Find answers to common questions about Dojo, onchain games, Autonomous Worlds, and how to get involved.
---

# FAQ

#### Why Dojo?

Dojo was created to solve problems the founders faced when building onchain games. It standardizes the process of building such games and provides a suite of tools to make it easier.

#### What is the Dojo roadmap?

Dojo is rapidly evolving. You can find open issues on the [Dojo Github](https://github.com/dojoengine/dojo/issues) and join the [Discord](https://discord.gg/vUN4Xq9Qv6) to get involved. If you have ideas for the project, please open an issue.

#### What is an onchain game?

Onchain games are games that exist entirely on a public blockchain network; all states and logic are onchain. Clients (like web browsers) do not exist on the chain but exist purely to interact with and interpret the onchain state.

#### What is an Autonomous World?

An autonomous world is one that exists entirely onchain. It's not controlled by any single entity but is instead governed by the rules set within that world. Dive deeper into the topic here: [Autonomous Worlds](/theory/autonomous-worlds.md).

#### What is Cairo?

Cairo is an opensource programming language invented by Starkware. It's a Turing-complete language meant for general-purpose computation. It's a low-level language designed to compile to the Cairo Virtual Machine. Learn more about it here: [Cairo](https://www.cairo-lang.org/).

#### What is a provable game?

Thanks to the magic of zero-knowledge proofs, we can ensure a game is fair by verifying a zk proof created off-chain. But what does that entail? Consider a game of chess. We aim for an experience where players trust each other's moves. In a straightforward approach — and given the simple rules of chess — if this were in a blockchain environment, every move would be a transaction on the blockchain. This is costly. We just want to know the winner, not every move.

With zk proofs and client communications, players can establish a state channel, sharing moves off-chain and ensuring their validity. At the end, a zk proof can be submitted to the blockchain to confirm the game's fairness. This constitutes a provable game.

#### Can dojo implement client side proofs?

The ability to execute Dojo programs in the browser is entirely plausible and is on our roadmap. Expect Q2 in 2024, or if you are a specalist in this jump into the code and help out!

#### Can I deploy Dojo on Starknet?

Yes! Dojo can run on any StarknetVM including the public blockchains. Within the dojo toolchain exists [Katana](/toolchain/katana) which is a gaming specific sequencer, which is perfectly suited to Dojo games.

## Who maintains Dojo?

Dojo is an open-source initiative, licensed under Apache 2.0, dedicated to promoting and advancing the concept of Autonomous Worlds (AWs). It is developement is led by [Cartridge](https://cartridge.gg/), with significant contributions from [Realms & BibliothecaDAO](https://bibliothecadao.xyz/) and many more [contributors](https://github.com/orgs/dojoengine/people).

## How do I get involved?

Check out our [Github](https://github.com/dojoengine), our [Twitter](https://x.com/ohayo_dojo), [Discord](https://discord.gg/vUN4Xq9Qv6) and [contribution guide](https://github.com/dojoengine/dojo/blob/main/CONTRIBUTING.md)
