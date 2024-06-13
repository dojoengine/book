# Dojo Framework

Dojo provides an advanced abstraction layer over Cairo, mirroring React's relationship with JavaScript. Its specialized architecture simplifies game design and development.

By having it's very own Cairo compiler plugin, Dojo proposes to developers a set of [macros](/framework/contracts/macros.md) that transform into comprehensive queries at compile time.

![overview](/world-map.png)

In Dojo, there are three major pieces:

- **World**: The [world](/framework/world/index.md) contract is the single source of truth. It is responsible for maintaining the game state.
- **Models**: Models are the data structures that compose the game state. They are defined using the `#[dojo::model]` attribute on the top of a Cairo struct.
- **Systems**: Systems are the functions that update the game state, interacting with the world contract. They are functions defined inside a Cairo module with the `#[dojo::contract]` attribute.

When you write code with Dojo, the interaction with the world is abstracted away. You just write your logic, using the Dojo specific [macros](/framework/contracts/macros.md) to read and write to the world.
