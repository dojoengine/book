:::note

Dojo provides an advanced abstraction layer over Cairo. We highly suggest understanding Cairo before diving into this book.
:::

# The Cairo Framework

## Introduction

This section covers the three core components essential for building onchain apps:

- **Models**: Define your application's state using the `#[dojo::model]` attribute. Models act like structured database entries, managing and organizing your onchain data.

- **Systems**: Implement business logic and state changes with systems. Using the `#[dojo::contract]` attribute, systems handle operations that modify your models seamlessly.

- **World**: The central hub that connects all models and systems. The World contract ensures consistency, manages authorization, and orchestrates interactions between different parts of your application.

Mastering these components will enable you to create scalable and maintainable onchain applications.

## Simplifying State

Dojo simplifies onchain application development by providing a standardized approach to state management, similar to a regular database.

In dojo you write state like this:

```rust
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Moves {
    #[key]
    pub player: ContractAddress,
    pub remaining: u8,
    pub last_direction: Direction,
    pub can_move: bool,
}
```

Once deployed, these models will then be reflected in your indexer, allowing you to query them in your language of choice via gRPC or GraphQL!

### Breaking it down

Think of the model here as an entry into your onchain database and the `#[key]` is the primary key to reference it. You use this key to query your state onchain within contracts and off-chain in your clients.

```rust
#[derive(Copy, Drop, Serde)]
// This defines the model attribute. Indicating to the compile that this struct is a Model.
#[dojo::model]
pub struct Moves {
    // Define a Key. This acts like a primary key does in a regular ORM
    #[key]
    pub player: ContractAddress,
    // These are the fields you define for your application state
    pub remaining: u8,
    pub last_direction: Direction,
    pub can_move: bool,
}
```

## Composing Contracts

Once you have your state designed, you want it to be effectively mutated via contracts. Dojo simplifies this by injecting macros into your code, allowing fast queries and mutations. (It does this by extending the Cairo compiler!)

```rust
// the dojo decorator indicating to the compiler that this is a dojo contract
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address};

    // import the model like a normal Cairo Struct
    use dojo_starter::models::{Moves};

    #[abi(embed_v0)]
    impl ActionsImpl of super::IActions<ContractState> {

        // You have to pass in the world as the first param, which then allows you to set the models state.
        fn spawn(ref world: IWorldDispatcher) {

            // [command] Set the the models state using the macro
            set!(
                world,
                (
                    Moves {
                        player: get_caller_address(), remaining: 100, last_direction: Direction::None(()), can_move: true
                    },
                )
            );
        }
    }
}
```

By having it's very own Cairo compiler plugin, Dojo proposes to developers a set of [macros](/framework/contracts/macros.md) that transform into comprehensive queries at compile time.

## The World

<!-- TODO: This needs work -->

Models and contracts are the foundation of your application. We encapsulate them within the **World** contract, which serves as a container for all models, systems, and authorization management.

![overview](/world-map.png)

## Takeaways

- **Models**: Utilize the `#[dojo::model]` attribute to define structured data representing your application's state. Models function similarly to database entries, organizing and managing onchain data effectively.

- **Systems**: Implement business logic and state transitions using the `#[dojo::contract]` attribute. Systems handle operations that modify models, ensuring seamless and reliable updates to your application's state.

- **World**: Acts as the central orchestrator connecting all models and systems. The World contract maintains consistency, manages authorization, and coordinates interactions between different components, serving as the single source of truth for your application.
