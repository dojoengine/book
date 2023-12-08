# 2. Utils and Legal Moves

In order to keep our code has dry as possible, we decide to modularize some functions. Those functions are the ones we import from `utils.cairo` into `actions.cairo`.

```rust,ignore
    use dojo_chess::utils::{is_out_of_board, is_right_piece_move, is_piece_is_mine};
```

This functions will check:

- If the next move goes outside the board.
- If there's a piece that can be captured.
- If the next move is allowed for the type of piece.
- If the user can allow to make a action (based on the piece's color).
- ... You can also add other custom check functions.

## Make Check Functions

We need to add some check functions in `actions` contract. These will help make sure the next move is allowed. Fill the following code in your `utils.cairo` file

1. See if player is moving the right piece

```rust,ignore
    use dojo_chess::models::PieceType;
    use starknet::ContractAddress;
    fn is_piece_is_mine(maybe_piece: PieceType) -> bool {
        false
    }
```

2. See if the next spot is still on the board.

```rust,ignore
    fn is_out_of_board(next_position: (u32, u32)) -> bool {
        let (n_x, n_y) = next_position;
        if n_x > 7 || n_x < 0 {
            return false;
        }
        if n_y > 7 || n_y < 0 {
            return false;
        }
        true
    }
```

3. See if the person trying the move is doing it at the right time and with their piece color.

```rust,ignore
    fn is_correct_turn(maybe_piece: PieceType, caller: ContractAddress, game_id: felt252) -> bool {
        true
    }
```

4. see if it's the right move

```c
    fn is_right_piece_move(
        maybe_piece: PieceType, curr_position: (u32, u32), next_position: (u32, u32)
    ) -> bool {
        let (c_x, c_y) = curr_position;
        let (n_x, n_y) = next_position;
        match maybe_piece {
            PieceType::WhitePawn => {
                true
            },
            PieceType::WhiteKnight => {
                if n_x == c_x + 2 && n_y == c_x + 1 {
                    return true;
                }

                panic(array!['Knight illegal move'])
            },
            PieceType::WhiteBishop => {
                true
            },
            PieceType::WhiteRook => {
                true
            },
            PieceType::WhiteQueen => {
                true
            },
            PieceType::WhiteKing => {
                true
            },
            PieceType::BlackPawn => {
                true
            },
            PieceType::BlackKnight => {
                true
            },
            PieceType::BlackBishop => {
                true
            },
            PieceType::BlackRook => {
                true
            },
            PieceType::BlackQueen => {
                true
            },
            PieceType::BlackKing => {
                true
            },
            PieceType::None(_) => panic(array!['Should not move empty square']),
        }
    }
```

5. You can also add other check functions to be extra sure the move is allowed.

   We will use these check functions to implement the `move()` function in the contract on our next chapter. You can decide how to set them up and which ones to use.
