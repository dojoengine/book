# 1. Actions

This chapter will address implementing `actions.cairo`, which spawns the game & squares containing pieces and also allow players to move pieces.

## What is `actions` contract?

To play chess, you need, to start game, spawn the pieces, and move around the board. The `actions` contract has two dominant functions `spawn` function which spawns the game entity, places each piece in its proper position on the board and returns the game_id, and the `move` funtion which allows pieces to be moved around the board.

<p align="center">
<img src="/images/board.png" alt="image" width="300" height="auto">

## Requirements

1. Write an interface for the `actions` contract on top of your code. In this case, `move` and `spawn`

```rust
    use starknet::ContractAddress;
    use chess::models::piece::Vec2;
    #[starknet::interface]
    trait IActions<ContractState> {
        fn move(
            self: @ContractState,
            curr_position: Vec2,
            next_position: Vec2,
            caller: ContractAddress, //player
            game_id: u32
        );
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) -> u32;
    }
```

2. Bring in required imports into the contract like this :

```rust
    #[dojo::contract]
    mod actions {
        use chess::models::player::{Player, Color, PlayerTrait};
        use chess::models::piece::{Piece, PieceType, PieceTrait};
        use chess::models::game::{Game, GameTurn, GameTurnTrait};
        use super::{ContractAddress, IActions, Vec2};
    }
```

Should be noted that `actions` is the contract name.

3. Write a `spawn` function that accepts the `white address`, and `black address` as input and set necessary states using `set!(...)`. Implement the `player` entity from player model. Implement the game entity, comprised of the `Game` model and `GameTurn` model we created in the `game.cairo` and implement the piece entities from a1 to h8 containing the correct `PieceType` in the `spawn` fn.

```rust
    #[abi(embed_v0)]
    impl IActionsImpl of IActions<ContractState> {
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) -> u32 {
            let world = self.world_dispatcher.read();
            let game_id = world.uuid();

            // set Players
            set!(
                world,
                (
                    Player { game_id, address: black_address, color: Color::Black },
                    Player { game_id, address: white_address, color: Color::White },
                )
            );

            // set Game and GameTurn
            set!(
                world,
                (
                    Game {
                        game_id, winner: Color::None, white: white_address, black: black_address
                    },
                    GameTurn { game_id, player_color: Color::White },
                )
            );

            // set Pieces
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::White,
                    position: Vec2 { x: 0, y: 0 },
                    piece_type: PieceType::Rook
                })
            );
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::White,
                    position: Vec2 { x: 0, y: 1 },
                    piece_type: PieceType::Pawn
                })
            );
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::Black,
                    position: Vec2 { x: 1, y: 6 },
                    piece_type: PieceType::Pawn
                })
            );
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::White,
                    position: Vec2 { x: 1, y: 0 },
                    piece_type: PieceType::Knight
                })
            );
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::None,
                    position: Vec2 { x: 0, y: 2 },
                    piece_type: PieceType::None
                })
            );

            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::None,
                    position: Vec2 { x: 0, y: 3 },
                    piece_type: PieceType::None
                })
            );
            set!(
                world,
                (Piece {
                    game_id,
                    color: Color::None,
                    position: Vec2 { x: 1, y: 4 },
                    piece_type: PieceType::None
                })
            );

            //the rest of the positions on the board goes here....

            game_id
        }
        fn move(
            self: @ContractState,
            curr_position: Vec2,
            next_position: Vec2,
            caller: ContractAddress, //player
            game_id: u32
        )  {
            // Upcoming code
        }
    }
```
