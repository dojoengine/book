# 1. Initiate System

This chapter will handle implementing `initiate_system`.

## What is initiate_system?

To play chess, you need to spawn pieces first. `initiate_system` will spawn every piece in the right position. You need to make sure the right piece type and the right piece color are in the right position on the board.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/initiate.cairo` file._

1. Write a `execute` function in the system that gets context as input
2. Implement Entity that gets 'white_pawn_1' as a key(piece_id) using `set!`
3. Do the same with other Entities for different piece types and colors ( recommend using AI )
4. run `sozo test` and pass all the test

## Unit Tests

```rust
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Piece, piece, Game, game, GameTurn, game_turn};
    use dojo_chess::systems::initiate_system;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;

    #[test]
    #[available_gas(3000000000000000)]
    fn test_initiate() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        // components
        let mut components = array::ArrayTrait::new();
        components.append(piece::TEST_CLASS_HASH);
        components.append(game::TEST_CLASS_HASH);
        components.append(game_turn::TEST_CLASS_HASH);

        //systems
        let mut systems = array::ArrayTrait::new();
        systems.append(initiate_system::TEST_CLASS_HASH);

        let world = spawn_test_world(components, systems);

        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata.span());

        let mut keys_game = array::ArrayTrait::new();
        keys_game.append(white.into());

        let mut keys_piece = array::ArrayTrait::new();
        keys_piece.append(white.into());
        keys_piece.append('white_pawn_1'.into());

        let game = world
            .entity('Game'.into(), keys_game.span(), 0_u8, dojo::SerdeLen::<Game>::len());
        let white_pawn_1 = world
            .entity('Piece'.into(), keys_piece.span(), 0_u8, dojo::SerdeLen::<Piece>::len());

        assert(*game.at(0_usize) == 1_felt252, 'status is not true');
        assert(*white_pawn_1.at(0_usize) == 0_felt252, 'piece kind is not pawn');
    }
}
```
