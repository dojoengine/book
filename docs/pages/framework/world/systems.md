---
title: "Dojo Systems"
description: "Understanding and implementing systems in Dojo contracts for world state management"
---

# Systems

> Systems = Functions in a Dojo contract

**_TL;DR_**

- Systems are Dojo contract functions.
- Systems can access to the world using the `self.world(<NAMESPACE>)` function.
- Systems engage the world contract to alter models' state.
- Systems ought to be concise and specific.
- In most scenarios, systems are stateless.

## What are systems?

Within Dojo we define systems as functions within a Dojo contract that act on the world.

Systems play a pivotal role in your world's logic, directly mutating its component states. It's important to understand that to enact these mutations, a system needs explicit permission from the [`models`](/framework/models) owner.

## Permissions

In order to write data to the world, a system needs explicit permission from the [`models`](/framework/models) owner.

:::warning[Permissions defined contract level]
Permissions are defined at Dojo contract level. Which means that all the systems inside the same contract will inherit the same permissions.

Before defining your systems, prioritize permissions. Plan carefully to ensure proper access and security.
:::

A simple way to think about system design for permissions:

![System Permissions](/permissions.png)

## Dojo interface

In a Dojo contract, you must first define a Dojo interface to declare the systems that your contract will expose.

```rust
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
    fn move(ref self: T, direction: Direction);
}
```

## System implementation

To implement the code related to the system, you must be placed inside a `#[dojo::contract]` and implement the interface you've defined.

```rust
#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::world::{WorldStorage, WorldStorageTrait};
    use dojo::event::EventStorage;

    use dojo_starter::models::{Position, Moves, Direction, Vec2};

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct Moved {
        #[key]
        pub player: ContractAddress,
        pub direction: Direction,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            // Get the default world.
            let mut world = self.world(@"dojo_starter");

            // Get the address of the current caller, possibly
            // the player's address.
            let player = get_caller_address();

            // Retrieve the player's current position from the world.
            let position: Position = world.read_model(player);

            // Update the world state with the new data.

            // 1. Move the player's position 10 units in both
            // the x and y direction.
            let new_position = Position {
                player,
                vec: Vec2 {
                    x: position.vec.x + 10,
                    y: position.vec.y + 10
                }
            };

            // Write the new position to the world.
            world.write_model(@new_position);

            // 2. Set the player's remaining moves to 100.
            let moves = Moves {
                player, remaining: 100,
                last_direction: Direction::None, can_move: true
            };

            // Write the new moves to the world.
            world.write_model(@moves);
        }

        fn move(ref self: ContractState, direction: Direction) {

            // Get the default world.
            let mut world = self.world(@"dojo_starter");

            // Get the address of the current caller, possibly
            // the player's address.
            let player = get_caller_address();

            // Retrieve the player's current position and moves data
            // from the world.
            let position: Position = world.read_model(player);
            let mut moves: Moves = world.read_model(player);

            // Check if the player can move
            if !moves.can_move {
                return;
            }

            // Deduct one from the player's remaining moves.
            moves.remaining -= 1;

            // Update the last direction the player moved in.
            moves.last_direction = direction;

            // Calculate the player's next position based on
            // the provided direction.
            let next = next_position(position, direction);

            // Write the new position to the world.
            world.write_model(@next);

            // Write the new moves to the world.
            world.write_model(@moves);

            // Emit an event to the world to notify about
            // the player's move.
            world.emit_event(@Moved { player, direction });
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "dojo_starter". This function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> WorldStorage {
            self.world(@"dojo_starter")
        }
    }
}

// Helper function to calculate next position
fn next_position(mut position: Position, direction: Direction) -> Position {
    match direction {
        Direction::Left => { position.vec.x -= 1; },
        Direction::Right => { position.vec.x += 1; },
        Direction::Up => { position.vec.y -= 1; },
        Direction::Down => { position.vec.y += 1; },
        Direction::None => { /* no movement */ },
    };
    position
}
```

Inside the system's implementation, you can use the Dojo [api](/framework/world/api) to easily interact with the world.
