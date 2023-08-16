# 1. Initiate System

This chapter will handle implementing `initiate_system`, that spawn game and squares that contain pieces

## What is initiate_system?

To play chess, you need to start the game, and then spawn pieces. `initiate_system` will spawn the game entity and then spawn every piece in the right position. You need to make sure the game status is the correct piece type and the right piece color is in the right position on the board.

## Requirements

_Copy the unit tests below and paste them at the bottom of your `systems/initiate.cairo` file._

1. Write an `execute` function in the system that gets world context and white address and black address as input.
2. Implement `Game` Entity, composed of `Game` Component and `GameTurn` component that we created in the previous step
3. Implement `Square` Entities from a1 to h8 containing right `PieceType`
4. run `sozo test` and pass all the test

## Test Flow

- Spawn the test world that imports components and systems that are used in testing.
- Execute `initiate_system` by getting white/black address as calldata input
- Get the game entity and piece entity created during initiate_system.
- Check if the game is created correctly
- Check if the Piece has pieces located in the correct Square.

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

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutorialv2/src/systems/initiate.cairo) for chapter 1.
