# 1. Action_Contract

This chapter will address implementing `action_contract.cairo`, which spawns the game & squares containing pieces and also allow players to move pieces.

## What is `action_contract`?

To play chess, you need, to start game, spawn the pieces, and move around the board. the `action_contract` has two dominant functions `spawn_game` function which spawns the game entity and places each
piece in its proper position on the board and the `move` funtion which allows pieces to be moved around the board.

<p align="center">
<img src="../../images/board.png" alt="image" width="300" height="auto">

## Requirements

_Copy the unit tests below and paste them at the bottom of your `action_contract.cairo` file._

1. Write an interface for the `initiate_system` contract and define your functions. In this case, `move` and `spawn_game`

```shell
    #[starknet::interface]
    trait IActions<ContractState> {
        fn move(
            self: @ContractState,
            curr_position: (u32, u32),
            next_position: (u32, u32),
            caller: ContractAddress, //player
            game_id: felt252
        );
        fn spawn_game(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress,
        );
    }
```

2. Bring in required imports into the contract and initialize storage with the `world_dispatcher` in it like this :

```shell
    #[starknet::contract]
        mod actions {
        use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
        use debug::PrintTrait;
        use starknet::ContractAddress;
        use dojo_chess::models::{Color, Square, PieceType, Game, GameTurn};
        use super::IActions;

        #[storage]
        struct Storage {
            world_dispatcher: IWorldDispatcher,
        }
    }
```

should be noted that `actions` is the contract name.

3. Write a `spawn_game` function that accepts the `white address`, and `black address` as input and set necessary states using `set!(...)`.Implement the game entity, comprised of the `Game` model and `GameTurn` model we created in the `models.cairo` and Implement the square entities from a1 to h8 containing the correct `PieceType` in the `spawn_game` fn.

```shell
        #[external(v0)]
    impl PlayerActionsImpl of IActions<ContractState> {
        fn spawn_game(
            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress
        ) {
            let world = self.world_dispatcher.read();
            let game_id = pedersen::pedersen(white_address.into(), black_address.into());
            set!(
                world,
                (
                    Game {
                        game_id: game_id,
                        winner: Color::None(()),
                        white: white_address,
                        black: black_address,
                        }, GameTurn {
                        game_id: game_id, turn: Color::White(()),
                    },
                )
            );

            set!(world, (Square { game_id: game_id, x: 0, y: 0, piece: PieceType::WhiteRook }));

            set!(world, (Square { game_id: game_id, x: 0, y: 1, piece: PieceType::WhitePawn }));

            set!(world, (Square { game_id: game_id, x: 1, y: 6, piece: PieceType::BlackPawn }));

            set!(world, (Square { game_id: game_id, x: 1, y: 0, piece: PieceType::WhiteKnight }));

            //the rest of the positions on the board goes here....
        }
```

4. Write a `move` function that accepts the `current position`, `next position`, `caller address`, and `game id`. The `move` function should look like this:

```shell
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
        //helper functions within the fn move. don't worry, we'll address logic content in the next chapter
        fn is_piece_is_mine(maybe_piece: PieceType) -> bool {
            //the rest of the code ....
        }
        fn is_correct_turn(maybe_piece: PieceType, caller: ContractAddress, game_id: felt252) -> bool {
            //the rest of the code ....
        }
        fn is_out_of_board(next_position: (u32, u32)) -> bool {
            //the rest of the code ....
        }
        fn is_right_piece_move(maybe_piece: PieceType, curr_position: (u32, u32), next_position: (u32, u32)) -> bool {
            //the rest of the code ....
        }
    }
```

7. Run `sozo test` and pass all the tests.

## Test Flow

- Spawn the test world (`spawn_test_world`) that imports the models in testing.
- deploy actions contract
- interact with `spawn_game` function in the `actions` contract by providing white and black player's wallet addresses as inputs.
- Retrieve the game entity and piece entity created in `actions` contract.
- Ensure the game has been correctly created.
- Verify that each `Piece` is located in the correct `Square`.

## Unit Tests

```rust,ignore
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo_chess::models::{Game, game, GameTurn, game_turn, Square, square, PieceType};

    use dojo_chess::actions_contract::actions;
    use starknet::class_hash::Felt252TryIntoClassHash;
    use dojo::world::IWorldDispatcherTrait;
    use dojo::world::IWorldDispatcher;
    use core::array::SpanTrait;
    use super::{IActionsDispatcher, IActionsDispatcherTrait};

    // helper setup function
    // reusable function for tests
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
        actions_system.spawn_game(white, black);
        let game_id = pedersen::pedersen(white.into(), black.into());

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
        actions_system.spawn_game(white, black);

        let game_id = pedersen::pedersen(white.into(), black.into());

        let a2 = get!(world, (game_id, 0, 1), (Square));
        assert(a2.piece == PieceType::WhitePawn, 'should be White Pawn');
        assert(a2.piece != PieceType::None, 'should have piece');

        actions_system.move((0, 1), (0, 2), white.into(), game_id);

        let c3 = get!(world, (game_id, 0, 2), (Square));
        assert(c3.piece == PieceType::WhitePawn, 'should be White Pawn');
        assert(c3.piece != PieceType::None, 'should have piece');
    }
```

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!

You can find the [answer](https://github.com/rkdud007/chess-dojo/blob/tutorialv3/src/actions_contract.cairo) for chapter 1 here.
