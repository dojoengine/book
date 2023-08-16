# 2. Move System

This chapter will handle implementing `move_system`.

## What is move_system?

To Play chess, you need to move your pieces on the board. `move_system` will move pieces in a certain position that you input. You need to make sure the `Position` of the Piece has changed correctly to the one that you wanted. To make sure this movement is correct, you need to check additional stuff, but we will handle it in the next chapter.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/move.cairo` file._

1. Write a `execute` function in the system that gets inputs as follows:

```rust,ignore
 fn execute(
        ctx: Context,
        curr_position: (u32, u32),
        next_position: (u32, u32),
        caller: ContractAddress,
        game_id: felt252
    )
```

2. Update Square with next_position with the new piece, and update square with curr_position with no piece.
3. run `sozo test` and pass all the test

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
    use dojo_chess::components::{Game, game, GameTurn, game_turn, Square, square, PieceType};

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
        components.append(game::TEST_CLASS_HASH);
        components.append(game_turn::TEST_CLASS_HASH);
        components.append(square::TEST_CLASS_HASH);

        //systems
        let mut systems = array::ArrayTrait::new();
        systems.append(initiate_system::TEST_CLASS_HASH);
        systems.append(move_system::TEST_CLASS_HASH);
        let world = spawn_test_world(components, systems);

        // initiate
        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);

        let game_id = pedersen(white.into(), black.into());

         //White Knight is in (1,0)
        let b1 = get!(world, (game_id, 1, 0), (Square));
        match b1.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhiteKnight, 'should be White Knight in (1,0)');
            },
            Option::None(_) => assert(false, 'should have piece in (1,0)'),
        };

        // Move White Knight (1,0) -> (2,2)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(2);
        move_calldata.append(2);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        //White Knight is in (2,2)
        let c3 = get!(world, (game_id, 2, 2), (Square));
        match c3.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhiteKnight, 'should be White Knight in (2,2)');
            },
            Option::None(_) => assert(false, 'should have piece in (2,2)'),
        };
    }
}
```

## Need help?

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoral/src/systems/move.cairo) for chapter 2.
