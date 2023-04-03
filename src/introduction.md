# Introduction

Dojo is an engine for building Autonomous Worlds. It is designed to simplify the process of creating, managing, and scaling these ever expanding onchain universes.

Dojo leverages an [entity component system](https://en.wikipedia.org/wiki/Entity_component_system) and [diamond](https://eips.ethereum.org/EIPS/eip-2535) pattern to provide a modular, extensible world. Worlds are expanded through the introduction of Components (state) and Systems (logic).

> Contributing
Dojo is open-source and encourages contribution. It is in the early stage of development. Find the book on [Github](https://github.com/dojoengine/book).


## Autonomous Worlds

> Autonomous worlds represent persistent, permissionless, and decentralized open environments that users can freely interact with and contribute to. - anon

The precise definition of Autonomous Worlds (AWs) remains somewhat elusive, as it is more of an abstract concept that has yet to be fully crystallized. Lattice Labs first introduced the terminology in 2022, but the notion of open worlds operating on the blockchain has been around for a while. The abstraction introduced by MUD served as a catalyst for the market to recognize the potential of these worlds.

Autonomous Worlds share notable similarities with blockchains in their fundamental nature. Once established, they persist, maintaining their state throughout the lifespan of the chain. Players can join or leave, and developers can expand these worlds by deploying features in a permissionless manner, much like how contracts are added to a chain. While there is no universally accepted definition for an Autonomous World, we believe that a game must possess at least the following two essential features to be considered as such:

1. Decentralized data availability layer: While the state execution may reside on a centralized layer, it is crucial that the state can be reconstructed if the execution layer ceases to exist. Rollups offer a solution, providing increased capacity execution layers while ensuring data is permanently settled on Ethereum. This guarantees the world's perpetual persistence.

2. Permissionless entry point for expanding the world: The World contract must be capable of accepting new systems and components without requiring permission. While this doesn't imply that every component and system will be utilized, they must adhere to this pattern, ensuring open and unrestricted access for potential enhancements.

### ECS

Dojo stores and manages all the world state via an ECS (Entity-Component System), and patterns are inspired by the Rust ECS engine [Bevy](https://bevy-cheatbook.github.io/programming/ecs-intro.html).

### Cairo lang

Cairo is an open-source, Turing-complete smart contract language created by Starkware that powers the Validity Rollup Starknet. It facilitates highly expressive and verifiable computation. Dojo builds on Cairo to create a framework that significantly reduces boilerplate code when developing Autonomous Worlds (AWs) by utilizing `commands`.

### Dojo Aspirations

Dojo is an ambitious work in progress with the goal of enabling developers to build games or Autonomous Worlds (AWs) in a matter of hours, rather than weeks.

### Organisational Structure

Dojo is an open-source, MIT-licensed project dedicated to advancing the concept of Autonomous Worlds (AWs).
