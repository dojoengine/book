# 3. Occupy System

This chapter will handle implementing `occupy_system`.

## What is occupy_system?

After you move your piece on the board, if it's case you need to occupy oponent's piece. `occupy_system` will kill piece. You piece entity is nolonger exist anymore at the board.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/occupy.cairo` file._

1. Write a `execute` function in the system that gets `world context`, `new_position` and `caller` as input
2. Check if this is caller's turn to move
3. Check if this is right piece type to move
4. ... You can add Check if it's legal move that checks everything (optional)
5. Update Piece entity with new position
6. run `sozo test` and pass all the test

## Unit Tests

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Piece, piece, Game, game, Position, position};
    use dojo_chess::systems::initiate_system;
    use dojo_chess::systems::execute_move_system;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;


    #[test]
    #[available_gas(3000000000000000)]
    fn init() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        // components
        let mut components = array::ArrayTrait::new();
        components.append(piece::TEST_CLASS_HASH);
        components.append(game::TEST_CLASS_HASH);
        components.append(position::TEST_CLASS_HASH);

        //systems
        let mut systems = array::ArrayTrait::new();
        systems.append(initiate_system::TEST_CLASS_HASH);
        systems.append(execute_move_system::TEST_CLASS_HASH);

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

        let mut keys_piece2 = array::ArrayTrait::new();
        keys_piece2.append(white.into());
        keys_piece2.append('black_pawn_1'.into());

        let game = world
            .entity('Game'.into(), keys_game.span(), 0_u8, dojo::SerdeLen::<Game>::len());
        let white_pawn_1 = world
            .entity('Piece'.into(), keys_piece.span(), 0_u8, dojo::SerdeLen::<Piece>::len());

        let black_pawn_1 = world
            .entity('Piece'.into(), keys_piece2.span(), 0_u8, dojo::SerdeLen::<Piece>::len());

        let white_pawn_1_position = world
            .entity('Position', keys_piece.span(), 0, dojo::SerdeLen::<Position>::len());

        //White pawn is now in (0,1)
        assert(*white_pawn_1_position.at(0_usize) == 0, 'pawn1 position x is wrong');
        assert(*white_pawn_1_position.at(1_usize) == 1, 'pawn1 position y is wrong');

        //Move White Pawn to (0,2)
        let mut move_calldata = array::ArrayTrait::new();
        move_calldata.append(white.into());
        move_calldata.append('white_pawn_1');
        move_calldata.append(0);
        move_calldata.append(2);
        move_calldata.append(white.into());
        world.execute('execute_move_system'.into(), move_calldata.span());
        let mut keys_piece = array::ArrayTrait::new();
        keys_piece.append(white.into());
        keys_piece.append('white_pawn_1'.into());
        let white_pawn_1_position_again = world
            .entity('Position', keys_piece.span(), 0, dojo::SerdeLen::<Position>::len());

        //White pawn is now in (0,1)
        assert(*white_pawn_1_position_again.at(0_usize) == 0, 'pawn1 position x is wrong');
        assert(*white_pawn_1_position_again.at(1_usize) == 2, 'pawn1 position y is wrong');
    }
}
```
