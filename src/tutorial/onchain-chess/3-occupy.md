# 3. Occupy System

This chapter will handle implementing `occupy_system`.

## What is occupy_system?

After you move your piece on the board, if it's the case you need to occupy the opponent's piece. `occupy_system` will kill the piece. Your piece entity no longer exists on the board.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/occupy.cairo` file._

1. Write a `execute` function in the system that gets `world context`, `piece_id`, and `piece_id` as input
2. Update Piece entity is_alive field
3. run `sozo test` and pass all the test

## Test Flow

- Same logic as `test_initiate` in the previous chapter.
- Check the target piece is alive.
- Execute `occupy_system` with piece_id and piece_id.
- Check the target piece is occupied.

## Unit Tests

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Piece, piece};
    use dojo_chess::systems::initiate_system;
    use dojo_chess::systems::occupy_system;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;

    #[test]
    #[available_gas(3000000000000000)]
    fn test_occupy() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        // components
        let mut components = array::ArrayTrait::new();
        components.append(piece::TEST_CLASS_HASH);

        //systems
        let mut systems = array::ArrayTrait::new();
        systems.append(initiate_system::TEST_CLASS_HASH);
        systems.append(occupy_system::TEST_CLASS_HASH);
        let world = spawn_test_world(components, systems);

        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);

        let game_id = pedersen(white.into(), black.into());

        let occupied_piece_id: felt252 = 'white_pawn_1'.into();

        let white_pawn_1 = get!(world, (game_id, occupied_piece_id), (Piece));
        assert(white_pawn_1.is_alive == true, 'Should be alive');

        let mut kill_piece_calldata = array::ArrayTrait::<core::felt252>::new();
        kill_piece_calldata.append(occupied_piece_id);
        kill_piece_calldata.append(game_id);
        world.execute('occupy_system'.into(), kill_piece_calldata);

        let white_pawn_1 = get!(world, (game_id, occupied_piece_id), (Piece));
        assert(white_pawn_1.is_alive == false, 'Should be occupied');
    }
}

```

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoral/src/systems/occupy.cairo) for chapter 2.
