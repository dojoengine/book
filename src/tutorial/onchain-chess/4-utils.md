# 4. Modularize functions
In order to keep our code has dry as possible, you can modularize your functions. To do this, we'll create an `utils.cairo` file and add the below:
```rust,ignore
use dojo_chess::models::PieceType;
use starknet::ContractAddress;

fn is_piece_is_mine(maybe_piece: PieceType) -> bool {
     //rest of the code here
}

fn is_correct_turn(maybe_piece: PieceType, caller: ContractAddress, game_id: felt252) -> bool {
    //rest of the code here
}

fn is_out_of_board(next_position: (u32, u32)) -> bool {
    //rest of the code here
}

fn is_right_piece_move(
    maybe_piece: PieceType, curr_position: (u32, u32), next_position: (u32, u32)
) -> bool {
    //rest of the code here
    
}
```
In your, `action_contracts`, these functions can be imported for use as follows 
```rust,ignore
    use dojo_chess::utils::{is_out_of_board, is_right_piece_move, is_piece_is_mine};
```
That's right! you have successfully modularized your functions.
