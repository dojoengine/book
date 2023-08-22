# 4. Test Contract

In this chapter, we'll use everything we've learned to run a full chess game scenario.

Here's what we'll do in our test:

1. Spawn `white_pawn_1` to (0,1)
2. Move `white_pawn_1` to (0,3)
3. Move `black_pawn_2` to (1,6)
4. Move `white_pawn_1` to (0,4)
5. Move `black_pawn_2` to (1,5)
6. Move `white_pawn_1` to (1,5)
7. Capture `black_pawn_2`

To place the pieces, use our `initiate_system`. For moving them, use the `move_system`. Remember to check if a piece can be captured when using `move_system`.

Before we get to the code, set up your integration test like this:

- Copy the test below and add it to your `src/tests.cairo` file.
- Make a `test.cairo` in your src and update `lib.cairo` by adding the `mod tests;` line.

## Full Code

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
    fn integration() {
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

        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        match a2.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, "should be White Pawn in (0,1)");
            },
            Option::None(_) => assert(false, 'should have piece in (0,1)),
        };

        //Black pawn is now in (1,6)
        let b7 = get!(world, (game_id, 1, 6), (Square));
        match b7.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::BlackPawn, "should be Black Pawn in (1,6)");
            },
            Option::None(_) => assert(false, 'should have piece in (1,6)),
        };

        //Move White Pawn to (0,3)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        //White pawn is now in (0,3)
        let a4 = get!(world, (game_id, 0, 3), (Square));
        match a4.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, "should be White Pawn in (0,3)");
            },
            Option::None(_) => assert(false, 'should have piece in (0,3)),
        };

        //Move black Pawn to (1,4)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(1);
        move_calldata.append(6);
        move_calldata.append(1);
        move_calldata.append(4);
        move_calldata.append(black.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        //Black pawn is now in (1,4)
        let b5 = get!(world, (game_id, 1, 4), (Square));
        match b5.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::BlackPawn, "should be Black Pawn  in (1,4)");
            },
            Option::None(_) => assert(false, 'should have piece  in (1,4)),
        };

        // Move White Pawn to (1,4)
        // Capture black pawn
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(1);
        move_calldata.append(4);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        let b5 = get!(world, (game_id, 1, 4), (Square));
        match b5.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, "should be WhitePawn  in (1,4)");
            },
            Option::None(_) => assert(false, 'should have piece in (1,4)),
        };
    }
}
```

## Diving into the Code

First, we'll set up the players and their colors.

```rust,ignore
   let white = starknet::contract_address_const::<0x01>();
   let black = starknet::contract_address_const::<0x02>();
```

We should list both Components and Systems in arrays, with each having CLASS_HASH as elements.

```rust,ignore
// components
let mut components = array::ArrayTrait::new();
components.append(game::TEST_CLASS_HASH);
components.append(game_turn::TEST_CLASS_HASH);
components.append(square::TEST_CLASS_HASH);

//systems
let mut systems = array::ArrayTrait::new();
systems.append(initiate_system::TEST_CLASS_HASH);
systems.append(move_system::TEST_CLASS_HASH);
```

Next, we'll create our game world.

```rust,ignore
     let world = spawn_test_world(components, systems);
```

We use `initiate_system` to put our Square pieces on the board. Each Square holds a piece. The system's execute function needs some input, which we give it as calldata.

```rust,ignore
        // initiate
        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);
```

Let's check if a White pawn is at (0,1). Remember, to get a piece that exists on the square, you need to use the keys of the `Square` component, which are `game_id`, `x`, and `y`. Do the same check for the Black Pawn.

```rust,ignore
        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        match a2.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, "should be White Pawn in (0,1)");
            },
            Option::None(_) => assert(false, 'should have piece in (0,1)),
        };
```

After setting up the board, use `move_system` to make moves. Provide the current position, the next position, the player's address, and the game id.

```rust,ignore
 //Move White Pawn to (0,3)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);
```

Keep moving pieces and checking if they're in the right places.

## Congratulations!

You've made the basic contracts for a chess game using the Dojo engine! This tutorial was just the beginning. There are many ways to make the game better, like optimizing parts, adding checks, or considering special cases. If you want to do more with this chess game, try these challenges:

- Make an `initiate_system` that uses lazy init. If you're unsure about lazy init, [read up on it](https://en.wikipedia.org/wiki/Lazy_initialization). This can help make your game actions more efficient.
- Add a checkmate feature. Our game doesn't end now, so decide when it should!
- Include special moves like castling, En Passant Capture, or Pawn Promotion.
- Make your own chess rules! You could even create your own version of the [immortal game](https://immortal.game/)

Lastly, share your project with others in the [Dojo community](https://discord.gg/akd2yfuRS3)!
