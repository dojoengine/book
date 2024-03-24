# 2 Move function

1. Write a `move` function that accepts the `current position`, `next position`, `caller address`, and `game_id`. The `move` function should look like this:

```c
    #[abi(embed_v0)]
    impl PlayerActionsImpl of IActions<ContractState> {
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) -> u32 {
            // Rest of code
        }
        fn move(
            self: @ContractState,
            curr_position: Vec2,
            next_position: Vec2,
            caller: ContractAddress, //player
            game_id: u32
        ) {
            let world = self.world_dispatcher.read();
            let mut current_piece = get!(world, (game_id, curr_position), (Piece));
            // check if next_position is out of board or not
            assert(!PieceTrait::is_out_of_board(next_position), 'Should be inside board');

            // check if this is the right move for this piece type
            assert(
                current_piece.is_right_piece_move(next_position), 'Illegal move for type of piece'
            );
            // Get piece data from to next_position in the board
            let mut next_position_piece = get!(world, (game_id, next_position), (Piece));

            let player = get!(world, (game_id, caller), (Player));
            // check if there is already a piece in next_position
            assert(
                next_position_piece.piece_type == PieceType::None
                    || player.is_not_my_piece(next_position_piece.color),
                'Already same color piece exist'
            );

            next_position_piece.piece_type = current_piece.piece_type;
            next_position_piece.color = player.color;
            // make current_piece piece none
            current_piece.piece_type = PieceType::None;
            current_piece.color = Color::None;
            set!(world, (next_position_piece));
            set!(world, (current_piece));

            // change turn
            let mut game_turn = get!(world, game_id, (GameTurn));
            game_turn.player_color = game_turn.next_turn();
            set!(world, (game_turn));
        }
    }
```

2. Run `sozo build` to compile the code.

   Great, Now we can start testing our functions

## Test Flow

- Spawn the test world (`spawn_test_world`) that imports the models in testing.
- Deploy actions contract
- Interact with `spawn` function in the `actions` contract by providing white and black player's wallet addresses as inputs.
- Retrieve the game entity and piece entity created in `actions` contract.
- Ensure the game has been correctly created.
- Verify that each `Piece` is located in the correct position.

## Unit Tests

- Copy the test below and add it to your `tests/units.cairo` file.

```c
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use chess::models::player::{Player, Color, player};
    use chess::models::piece::{Piece, PieceType, Vec2, piece};
    use chess::models::game::{Game, GameTurn, game, game_turn};
    use chess::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    // helper setup function
    fn setup_world() -> (IWorldDispatcher, IActionsDispatcher) {
        // models
        let mut models = array![
            game::TEST_CLASS_HASH,
            player::TEST_CLASS_HASH,
            game_turn::TEST_CLASS_HASH,
            piece::TEST_CLASS_HASH
        ];
        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        (world, actions_system)
    }

    #[test]
    #[available_gas(3000000000000000)]
    fn test_spawn() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();
        let (world, actions_system) = setup_world();

        //system calls
        let game_id = actions_system.spawn(white, black);

        //get game
        let game = get!(world, game_id, (Game));
        let game_turn = get!(world, game_id, (GameTurn));
        assert(game_turn.player_color == Color::White, 'should be white turn');
        assert(game.white == white, 'white address is incorrect');
        assert(game.black == black, 'black address is incorrect');

        //get a1 piece
        let curr_pos = Vec2 { x: 0, y: 0 };
        let a1 = get!(world, (game_id, curr_pos), (Piece));
        assert(a1.piece_type == PieceType::Rook, 'should be Rook');
        assert(a1.color == Color::White, 'should be white color');
        assert(a1.piece_type != PieceType::None, 'should have piece');
    }

    #[test]
    #[available_gas(3000000000000000)]
    fn test_move() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        let (world, actions_system) = setup_world();
        let game_id = actions_system.spawn(white, black);
        let curr_pos = Vec2 { x: 0, y: 1 };
        let a2 = get!(world, (game_id, curr_pos), (Piece));
        assert(a2.piece_type == PieceType::Pawn, 'should be Pawn');
        assert(a2.color == Color::White, 'should be white color piece 1');
        assert(a2.piece_type != PieceType::None, 'should have piece');

        let next_pos = Vec2 { x: 0, y: 2 };
        let game_turn = get!(world, game_id, (GameTurn));
        assert(game_turn.player_color == Color::White, 'should be white player turn');
        actions_system.move(curr_pos, next_pos, white.into(), game_id);

        let curr_pos = next_pos;
        let c3 = get!(world, (game_id, curr_pos), (Piece));
        assert(c3.piece_type == PieceType::Pawn, 'should be Pawn');
        assert(c3.color == Color::White, 'should be white color piece 2');
        assert(c3.piece_type != PieceType::None, 'should have piece');

        let game_turn = get!(world, game_id, (GameTurn));
        assert(game_turn.player_color == Color::Black, 'should be black player turn');
    }
}
```

## Diving into the Code

### setup_world

We should list all models with each having CLASS_HASH as elements and then we deploy world to models with `spawn_test_world`

```rust
    //models
    let mut models = array![
            game::TEST_CLASS_HASH,
            player::TEST_CLASS_HASH,
            game_turn::TEST_CLASS_HASH,
            piece::TEST_CLASS_HASH
        ];
    // deploy world with models
    let world = spawn_test_world(models);
```

After that, we deploy our system contracts, then we return our `world` and `actions_systems` dispatchers.

```rust
    let contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
    let actions_system = IActionsDispatcher { contract_address };

    (world, actions_system)
```

### test_spawn

First, we'll set up the players address and their colors.

```rust
    let white = starknet::contract_address_const::<0x01>();
    let black = starknet::contract_address_const::<0x02>();
```

We use `spawn` function in `actions.cairo` to put our pieces on the board. Each square position holds a piece. The system's `spawn` function needs some input i.e the addresses of the players.

```rust
    // spawn
    let game_id = actions_system.spawn(white, black);
```

Then we check if the players got their setup address. After that we check if a White rook is at (0,0). Remember, to get a piece that exists on the position, you need to use the keys of the `Piece` model, which are `game_id`, and `curr_pos`.

```c
    //get a1 square
    let curr_pos = Vec2 { x: 0, y: 0 };
    let a1 = get!(world, (game_id, curr_pos), (Piece));
    assert(a1.piece_type == PieceType::Rook, 'should be Rook');
    assert(a1.color == Color::White, 'should be white color');
    assert(a1.piece_type != PieceType::None, 'should have piece');
```

### test_move

Here, after setting up the board, we use `move` function in the contract to make moves. Provide the current position, the next position, the player's address, and the game id.

```rust
    //Move White Pawn to (0,2)
    actions_system.move(curr_pos, next_pos, white.into(), game_id);
```

Then we check if a White Pawn is at the new position.

```c
    let curr_pos = next_pos;
    let c3 = get!(world, (game_id, curr_pos), (Piece));
    assert(c3.piece_type == PieceType::Pawn, 'should be Pawn');
    assert(c3.color == Color::White, 'should be white color piece 2');
    assert(c3.piece_type != PieceType::None, 'should have piece');
```

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!
