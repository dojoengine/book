# 1. Initiate System

This chapter will address implementing `initiate_system`, which spawns the game and squares containing pieces.

## What is `initiate_system`?

To play chess, you need to start the game and spawn the pieces. `initiate_system` will spawn the game entity and then place each piece in its proper position. Ensure the game status matches the correct piece type, and the right piece color is in its designated position on the board.

<p align="center">
<img src="../../images/board.png" alt="image" width="300" height="auto">

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/initiate.cairo` file._

1. Write an `execute` function in the system that accepts the world context, white address, and black address as input.
2. Implement the game entity, comprised of the `Game` component and `GameTurn` component we created in the previous step.
3. Implement square entities by `Square` component, from a1 to h8 containing the correct `PieceType`.
4. Run `sozo test` and pass all the tests.

## Test Flow

- Spawn the test world that imports the components and systems used in testing.
- Execute `initiate_system` by providing white and black player's wallet addresses as inputs.
- Retrieve the game entity and piece entity created during `initiate_system`.
- Ensure the game has been correctly created.
- Verify that each `Piece` is located in the correct `Square`.

## Unit Tests

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Game, game, GameTurn, game_turn, Square, square, PieceType};

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
        components.append(game::TEST_CLASS_HASH);
        components.append(game_turn::TEST_CLASS_HASH);
        components.append(square::TEST_CLASS_HASH);

        //systems
        let mut systems = array::ArrayTrait::new();
        systems.append(initiate_system::TEST_CLASS_HASH);
        let world = spawn_test_world(components, systems);

        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);

        let game_id = pedersen(white.into(), black.into());

        //get game
        let game = get!(world, (game_id), (Game));
        assert(game.white == white, 'white address is incorrect');
        assert(game.black == black, 'black address is incorrect');

        //get a1 square
        let a1 = get!(world, (game_id, 0, 0), (Square));
        match a1.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhiteRook, 'should be White Rook');
            },
            Option::None(_) => assert(false, 'should have piece'),
        };
    }
}
```

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!

You can find the [answer](https://github.com/rkdud007/chess-dojo/blob/tutorialv2/src/systems/initiate.cairo) for chapter 1 here.
