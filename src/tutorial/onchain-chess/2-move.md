# 2. Move System

This chapter will handle implementing `move_system`.

## What is move_system?

To Play chess, you need to move your pieces on the board. `move_system` will move pieces in a certain position that you input. You need to make sure the `Position` of the Piece has changed correctly to the one that you wanted.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/move.cairo` file._

1. Write a `execute` function in the system that gets `world context`, `new_position`, and `caller` as input
2. Check if this is the caller's turn to move
3. Check if this is the right piece type to move
4. ... You can add Check if it's a legal move that checks everything (optional)
5. Update Piece entity with the new position
6. run `sozo test` and pass all the test

## Test Flow

- Same logic as `test_initiate` in the previous chapter.
- Execute `move_system` with piece_id and new position.
- Get the updated Position again and check the position has been updated to a new position.

## Unit Tests

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Piece, piece, Game, game, Position, position};
    use dojo_chess::systems::initiate_system;
    use dojo_chess::systems::move_system;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;


    #[test]
    #[available_gas(3000000000000000)]
    fn test_move() {
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
        systems.append(move_system::TEST_CLASS_HASH);

        let world = spawn_test_world(components, systems);

        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);

        let game_id = pedersen(white.into(), black.into());

        let mut keys_game = array::ArrayTrait::new();
        keys_game.append(game_id);

        let mut keys_piece = array::ArrayTrait::new();
        keys_piece.append(game_id);
        keys_piece.append('white_pawn_1'.into());

        let mut keys_piece2 = array::ArrayTrait::new();
        keys_piece2.append(game_id);
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
        move_calldata.append(game_id);
        move_calldata.append('white_pawn_1');
        move_calldata.append(0);
        move_calldata.append(2);
        move_calldata.append(white.into());
        world.execute('move_system'.into(), move_calldata);

        let mut keys_piece = array::ArrayTrait::new();
        keys_piece.append(game_id);
        keys_piece.append('white_pawn_1'.into());
        let white_pawn_1_position_again = world
            .entity('Position', keys_piece.span(), 0, dojo::SerdeLen::<Position>::len());

        //White pawn is now in (0,1)
        assert(*white_pawn_1_position_again.at(0_usize) == 0, 'pawn1 position x is wrong');
        assert(*white_pawn_1_position_again.at(1_usize) == 2, 'pawn1 position y is wrong');
    }
}

```

## Need help?

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoral/src/systems/move.cairo) for chapter 2.
