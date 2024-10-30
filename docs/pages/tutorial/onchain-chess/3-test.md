# 3 Test Contract

In this chapter, we'll use everything we've learned to run a full chess game scenario.

Here's what we'll do in our test:

1. Call spawn to setup `white_pawn` to (0,1) and `black_pawn` to (1,6)
2. Move `white_pawn` to (0,3)
3. Move `black_pawn` to (1,4)
4. Move `white_pawn` to (1,4)
5. Capture `black_pawn`

To place the pieces, use our `spawn` function in our `actions` contract. For moving them, use the `move` contract. Remember to check if a piece can be captured when using `move`.

Before we get to the code, set up your integration test like this:

-   Copy the test below and add it to your `tests/integration.cairo` file.

## Full Code

```rust
mod tests {
    use chess::models::piece::{Piece, PieceType, Vec2};
    use dojo::world::IWorldDispatcherTrait;
    use chess::tests::units::tests::setup_world;
    use chess::actions::{IActionsDispatcher, IActionsDispatcherTrait};
    use chess::models::player::{Color};

    #[test]
    #[available_gas(3000000000000000)]
    fn integration() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        let (world, actions_system) = setup_world();

        //system calls
        let game_id = actions_system.spawn(white, black);

        //White pawn is setup in (0,1)
        let wp_curr_pos = Vec2 { x: 0, y: 1 };
        let a2 = get!(world, (game_id, wp_curr_pos), (Piece));
        assert!(a2.piece_type == PieceType::Pawn, "should be Pawn in (0,1)");
        assert!(a2.color == Color::White, "should be white color");
        assert!(a2.piece_type != PieceType::None, "should have piece in (0,1)");

        //Black pawn is setup in (1,6)
        let bp_curr_pos = Vec2 { x: 1, y: 6 };
        let b7 = get!(world, (game_id, bp_curr_pos), (Piece));
        assert!(b7.piece_type == PieceType::Pawn, "should be Pawn in (1,6)");
        assert!(b7.color == Color::Black, "should be black color");
        assert!(b7.piece_type != PieceType::None, "should have piece in (1,6)");

        //Move White Pawn to (0,3)
        let wp_next_pos = Vec2 { x: 0, y: 3 };
        actions_system.move(wp_curr_pos, wp_next_pos, white.into(), game_id);

        //White pawn is now in (0,3)
        let wp_curr_pos = wp_next_pos;
        let a4 = get!(world, (game_id, wp_curr_pos), (Piece));
        assert!(a4.piece_type == PieceType::Pawn, "should be Pawn in (0,3)");
        assert!(a4.color == Color::White, "should be white color");
        assert!(a4.piece_type != PieceType::None, "should have piece in (0,3)");

        //Move black Pawn to (1,4)
        let bp_next_pos = Vec2 { x: 1, y: 4 };
        actions_system.move(bp_curr_pos, bp_next_pos, black.into(), game_id);

        //Black pawn is now in (1,4)
        let bp_curr_pos = bp_next_pos;
        let b5 = get!(world, (game_id, bp_curr_pos), (Piece));
        assert!(b5.piece_type == PieceType::Pawn, "should be Pawn in (1,4)");
        assert!(b5.color == Color::Black, "should be black color");
        assert!(b5.piece_type != PieceType::None, "should have piece in (1,4)");

        // Move White Pawn to (1,4) and capture black pawn
        actions_system.move(wp_curr_pos, bp_curr_pos, white.into(), game_id);

        let wp_curr_pos = bp_curr_pos;
        let b5 = get!(world, (game_id, wp_curr_pos), (Piece));
        assert!(b5.piece_type == PieceType::Pawn, "should be Pawn in (1,4)");
        assert!(b5.color == Color::White, "should be white color");
        assert!(b5.piece_type != PieceType::None, "should have piece in (1,4)");
    }
}
```

Keep moving pieces and checking if they're in the right places.

## Congratulations!

You've made the basic contracts for a chess game using the Dojo engine! This tutorial was just the beginning. There are many ways to make the game better, like optimizing parts, adding checks, or considering special cases. If you want to do more with this chess game, try these challenges:

-   Add a checkmate feature. Our game doesn't end now, so decide when it should!
-   Include special moves like castling, En Passant Capture, or Pawn Promotion.
-   Make your own chess rules! You could even create your own version of the [immortal game](https://immortal.game/)

Lastly, share your project with others in the [Dojo community](https://discord.gg/akd2yfuRS3)!
