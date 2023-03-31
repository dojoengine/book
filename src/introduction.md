# Introduction

Dojo is an engine for building Autonomous Worlds. It is designed to simplify the process of creating, managing, and scaling these ever expanding onchain universes.

Dojo leverages an [entity component system](https://en.wikipedia.org/wiki/Entity_component_system) and [diamond](https://eips.ethereum.org/EIPS/eip-2535) pattern to provide a modular, extensible world. Worlds are expanded through the introduction of Components (state) and Systems (logic).

## Autonomous Worlds

Autonomous worlds bear a remarkable resemblance to blockchains in their nature. Once established, they endure, with their state persisting for the duration of the chain. Players can join or leave, and developers can build upon these worlds by deploying features in a permissionless way, akin to how contracts are deployed onto a chain. There is no universally accepted definition for an Autonomous World; however, our criteria for labeling a game as such requires at least these two essential features:

1. Decentralized data availability layer: While the state execution may reside on a centralized layer, it is crucial that the state can be reconstructed if the execution layer ceases to exist. Rollups offer a solution, providing increased capacity execution layers while ensuring data is permanently settled on Ethereum. This guarantees the world's perpetual persistence.

2. Permissionless entry point for expanding the world: The World contract must be capable of accepting new systems and components without requiring permission. While this doesn't imply that every component and system will be utilized, they must adhere to this pattern, ensuring open and unrestricted access for potential enhancements.


## Motivation

### ECS

### Cairo lang


### Dojo Aspirations

### Organisational Structure
