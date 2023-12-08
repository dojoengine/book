# 1. Actions

This chapter will address implementing `actions.cairo`, which spawns the game & squares containing pieces and also allow players to move pieces.

## What is `actions` contract?

To play chess, you need, to start game, spawn the pieces, and move around the board. the `actions` contract has two dominant functions `spawn` function which spawns the game entity, places each piece in its proper position on the board and returns the game_id, and the `move` funtion which allows pieces to be moved around the board.

<p align="center">
<img src="../../images/board.png" alt="image" width="300" height="auto">

## Requirements

1. Write an interface for the `actions` contract on top of your code. In this case, `move` and `spawn`

```rust,ignore
    use starknet::ContractAddress;

    #[starknet::interface]
    trait IActions<ContractState> {
        fn move(
            self: @ContractState,
            curr_position: (u32, u32),
            next_position: (u32, u32),
            caller: ContractAddress, //player
            game_id: u32
        );
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) -> u32;
    }
```

2. Bring in required imports into the contract like this :

```rust,ignore
    #[dojo::contract]
    mod actions {
        use dojo_chess::models::{Color, Square, PieceType, Game, GameTurn};
        use super::{ContractAddress, IActions};
        use dojo_chess::utils::{is_out_of_board, is_right_piece_move, is_piece_is_mine};
    }
```

Should be noted that `actions` is the contract name.

3. Write a `spawn` function that accepts the `white address`, and `black address` as input and set necessary states using `set!(...)`.Implement the game entity, comprised of the `Game` model and `GameTurn` model we created in the `models.cairo` and Implement the square entities from a1 to h8 containing the correct `PieceType` in the `spawn` fn.

```rust,ignore
    #[external(v0)]
    impl IActionsImpl of IActions<ContractState> {
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) -> u32 {
            let world = self.world_dispatcher.read();
            let game_id = world.uuid();
            set!(
                world,
                (
                    Game {
                        game_id,
                        winner: Color::None(()),
                        white: white_address,
                        black: black_address
                    },
                    GameTurn { game_id, turn: Color::White(())},
                )
            );

            set!(world, (Square { game_id, x: 0, y: 0, piece: PieceType::WhiteRook }));
            set!(world, (Square { game_id, x: 0, y: 1, piece: PieceType::WhitePawn }));
            set!(world, (Square { game_id, x: 1, y: 6, piece: PieceType::BlackPawn }));
            set!(world, (Square { game_id, x: 1, y: 0, piece: PieceType::WhiteKnight }));

            //the rest of the positions on the board goes here....

            game_id
        }
        fn move(self: @ContractState, curr_position: (u32, u32),
            next_position: (u32, u32), caller: ContractAddress,
            game_id: u32
        ) {
            // Upcoming code
        }
    }
```

Before we implement the `move()` function, we are going to setup some helper function in our `utils.cairo` file
