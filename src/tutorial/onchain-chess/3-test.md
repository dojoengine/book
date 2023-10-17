 # 4 Test Contract

In this chapter, we'll use everything we've learned to run a full chess game scenario.

Here's what we'll do in our test:

1. Spawn `white_pawn_1` to (0,1)
2. Move `white_pawn_1` to (0,3)
3. Move `black_pawn_2` to (1,6)
4. Move `white_pawn_1` to (0,4)
5. Move `black_pawn_2` to (1,4)
6. Move `white_pawn_1` to (1,4)
7. Capture `black_pawn_2`

To place the pieces, use our `spawn_game` function in our `actions` contract. For moving them, use the `move_system` contract. Remember to check if a piece can be captured when using `move_system`.

Before we get to the code, set up your integration test like this:

- Copy the test below and add it to your `src/tests.cairo` file.
- Make a `test.cairo` in your src and update `lib.cairo` by adding the `mod tests;` line.

## Full Code

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::models::{Game, game, GameTurn, game_turn, Square, square, PieceType};

    use dojo_chess::actions_contract::actions;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;
    use dojo_chess::actions_contract::tests::setup_world;
    use dojo_chess::actions_contract::{IActionsDispatcher, IActionsDispatcherTrait};


    #[test]
    #[available_gas(3000000000000000)]
    fn integration() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        let (world, actions_system) = setup_world();

        //system calls
        actions_system.spawn_game(white, black);
        let game_id = pedersen::pedersen(white.into(), black.into());

        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        assert(a2.piece == PieceType::WhitePawn, 'should be White Pawn in (0,1)');
        assert(a2.piece != PieceType::None, 'should have piece in (0,1)');

        //Black pawn is now in (1,6)
        let b7 = get!(world, (game_id, 1, 6), (Square));
        assert(b7.piece == PieceType::BlackPawn, 'should be Black Pawn in (1,6)');
        assert(b7.piece != PieceType::None, 'should have piece in (1,6)');

        //Move White Pawn to (0,3)
        actions_system.move((0, 1), (0, 3), white.into(), game_id);

        //White pawn is now in (0,3)
        let a4 = get!(world, (game_id, 0, 3), (Square));
        assert(a4.piece == PieceType::WhitePawn, 'should be White Pawn in (0,3)');
        assert(a4.piece != PieceType::None, 'should have piece in (0,3)');

        //Move black Pawn to (1,4)
        actions_system.move((1, 6), (1, 4), white.into(), game_id);

        //Black pawn is now in (1,4)
        let b5 = get!(world, (game_id, 1, 4), (Square));
        assert(b5.piece == PieceType::BlackPawn, 'should be Black Pawn in (1,4)');
        assert(b5.piece != PieceType::None, 'should have piece in (1,4)');

        // Move White Pawn to (1,4)
        // Capture black pawn
        actions_system.move((0, 3), (1, 4), white.into(), game_id);

        let b5 = get!(world, (game_id, 1, 4), (Square));
        assert(b5.piece == PieceType::WhitePawn, 'should be White Pawn in (1,4)');
        assert(b5.piece != PieceType::None, 'should have piece in (1,4)');
    }
}

```

## Diving into the Code
First, we'll set up the players and their colors.

```rust,ignore
   let white = starknet::contract_address_const::<0x01>();
   let black = starknet::contract_address_const::<0x02>();
```

We should list both models with each having CLASS_HASH as elements and then we deploy world to models with `spawn_test_world`

```rust,ignore
//models
 let mut models = array![game::TEST_CLASS_HASH, game_turn::TEST_CLASS_HASH, square::TEST_CLASS_HASH];
 let world = spawn_test_world(models);
```
We then deploy our system contracts in our helper function in `action_contract` file. we only imported it in our test file.
```rust,ignore
    let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };
```

We use `spawn_game` function in `actions_contract.cairo` to put our Square pieces on the board. Each Square holds a piece. The system's `spawn_game` function needs some input i.e the addresses of the players.

```rust,ignore
        // spawn
         actions_system.spawn_game(white, black);
```

Let's check if a White pawn is at (0,1). Remember, to get a piece that exists on the square, you need to use the keys of the `Square` model, which are `game_id`, `x`, and `y`. Do the same check for the Black Pawn.

```rust,ignore
        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        assert(a2.piece == PieceType::WhitePawn, 'should be White Pawn in (0,1)');
        assert(a2.piece != PieceType::None, 'should have piece in (0,1)');
```

After setting up the board, use `move` function in the contract to make moves. Provide the current position, the next position, the player's address, and the game id.

```rust,ignore
 //Move White Pawn to (0,3)
        actions_system.move((0, 1), (0, 3), white.into(), game_id);
```

Keep moving pieces and checking if they're in the right places.

## Congratulations!

You've made the basic contracts for a chess game using the Dojo engine! This tutorial was just the beginning. There are many ways to make the game better, like optimizing parts, adding checks, or considering special cases. If you want to do more with this chess game, try these challenges:

- Add a checkmate feature. Our game doesn't end now, so decide when it should!
- Include special moves like castling, En Passant Capture, or Pawn Promotion.
- Make your own chess rules! You could even create your own version of the [immortal game](https://immortal.game/)

Lastly, share your project with others in the [Dojo community](https://discord.gg/akd2yfuRS3)!
