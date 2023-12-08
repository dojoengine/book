# 3 Move function

1. Write a `move` function that accepts the `current position`, `next position`, `caller address`, and `game id`. The `move` function should look like this:

```c
    #[external(v0)]
    impl PlayerActionsImpl of IActions<ContractState> {
        fn spawn(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) {
            // Rest of code
        }
        fn move(
            self: @ContractState,
            curr_position: (u32, u32),
            next_position: (u32, u32),
            caller: ContractAddress, //player
            game_id: felt252
        ) {
            let world = self.world_dispatcher.read();

            let (current_x, current_y) = curr_position;
            let (next_x, next_y) = next_position;
            current_x.print();
            current_y.print();

            next_x.print();
            next_y.print();

            let mut current_square = get!(world, (game_id, current_x, current_y), (Square));

            // check if next_position is out of board or not
            assert(is_out_of_board(next_position), 'Should be inside board');

            // check if this is the right piece type move
            assert(
                is_right_piece_move(current_square.piece, curr_position, next_position),
                'Should be right piece move'
            );
            let target_piece = current_square.piece;
            // make current_square piece none and move piece to next_square
            current_square.piece = PieceType::None(());
            let mut next_square = get!(world, (game_id, next_x, next_y), (Square));

            // check the piece already in next_suqare
            let maybe_next_square_piece = next_square.piece;

            if maybe_next_square_piece == PieceType::None(()) {
                next_square.piece = target_piece;
            } else {
                if is_piece_is_mine(maybe_next_square_piece) {
                    panic(array!['Already same color piece exist'])
                } else {
                    next_square.piece = target_piece;
                }
            }

            set!(world, (next_square));
            set!(world, (current_square));
        }
    }
```

2. Run `sozo build` to compile the code.

   Great, Now we can start testing our functions

## Test Flow

- Spawn the test world (`spawn_test_world`) that imports the models in testing.
- deploy actions contract
- interact with `spawn` function in the `actions` contract by providing white and black player's wallet addresses as inputs.
- Retrieve the game entity and piece entity created in `actions` contract.
- Ensure the game has been correctly created.
- Verify that each `Piece` is located in the correct `Square`.

## Unit Tests

```c
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo_chess::models::{Game, game, GameTurn, game_turn, Square, square, PieceType};
    use dojo_chess::actions::actions;
    use dojo_chess::actions::{IActionsDispatcher, IActionsDispatcherTrait};

    // helper setup function
    fn setup_world() -> (IWorldDispatcher, IActionsDispatcher) {
        // models
        let mut models = array![
            game::TEST_CLASS_HASH, game_turn::TEST_CLASS_HASH, square::TEST_CLASS_HASH
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
    fn test_initiate() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        let (world, actions_system) = setup_world();

        //system calls
        let game_id = actions_system.spawn(white, black);

        //get game
        let game = get!(world, game_id, (Game));
        assert(game.white == white, 'white address is incorrect');
        assert(game.black == black, 'black address is incorrect');

        //get a1 square
        let a1 = get!(world, (game_id, 0, 0), (Square));
        assert(a1.piece == PieceType::WhiteRook, 'should be White Rook');
        assert(a1.piece != PieceType::None, 'should have piece');
    }


    #[test]
    #[available_gas(3000000000000000)]
    fn test_move() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();

        let (world, actions_system) = setup_world();
        actions_system.spawn(white, black);

        let game_id = world.uuid();

        let a2 = get!(world, (game_id, 0, 1), (Square));
        assert(a2.piece == PieceType::WhitePawn, 'should be White Pawn');
        assert(a2.piece != PieceType::None, 'should have piece');

        actions_system.move((0, 1), (0, 2), white.into(), game_id);

        let c3 = get!(world, (game_id, 0, 2), (Square));
        assert(c3.piece == PieceType::WhitePawn, 'should be White Pawn');
        assert(c3.piece != PieceType::None, 'should have piece');
    }
}
```

## Diving into the Code

### setup_world

We should list both models with each having CLASS_HASH as elements and then we deploy world to models with `spawn_test_world`

```rust,ignore
    //models
    let mut models = array![game::TEST_CLASS_HASH, game_turn::TEST_CLASS_HASH, square::TEST_CLASS_HASH];
    let world = spawn_test_world(models);
```

We then deploy our system contracts, then we return our `world` and `actions_systems` dispatcher

```rust,ignore
    let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
    let actions_system = IActionsDispatcher { contract_address };
    (world, actions_system)
```

### test_initiate

First, we'll set up the players address and their colors.

```rust,ignore
   let white = starknet::contract_address_const::<0x01>();
   let black = starknet::contract_address_const::<0x02>();
```

We use `spawn` function in `actions.cairo` to put our Square pieces on the board. Each Square holds a piece. The system's `spawn` function needs some input i.e the addresses of the players.

```rust,ignore
    // spawn
    let game_id = actions_system.spawn(white, black);
```

Then we check if the players got their setup address. After that we check if a White rook is at (0,0). Remember, to get a piece that exists on the square, you need to use the keys of the `Square` model, which are `game_id`, `x`, and `y`.

```c
    //get a1 square
    let a1 = get!(world, (game_id, 0, 0), (Square));
    assert(a1.piece == PieceType::WhiteRook, 'should be White Rook');
    assert(a1.piece != PieceType::None, 'should have piece');
```

### test_move

Here, after setting up the board, we use `move` function in the contract to make moves. Provide the current position, the next position, the player's address, and the game id.

```rust,ignore
    //Move White Pawn to (0,2)
    actions_system.move((0, 1), (0, 2), white.into(), game_id);
```

Then we check if a White Pawn is at the new position.

```c
    let c3 = get!(world, (game_id, 0, 2), (Square));
    assert(c3.piece == PieceType::WhitePawn, 'should be White Pawn');
    assert(c3.piece != PieceType::None, 'should have piece');
```

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!
