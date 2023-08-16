# 3. Check Legal Move

This chapter will handle implementing additional functions to check

- Is the next move out of board?
- Is there is piece that needs to be occupied?
- Is the next move legal (based on piece type)?
- Is caller can execute the next move (based on color)?
- ... And you can add your custom checker functions

## Add check helper functions

You need to make multiple check functions in move_system. And assert that the next move is the correct move that be executed.

1. Check next position is legal based on the piece type

```rust,ignore
  fn is_right_piece_move(
        maybe_piece: Option<PieceType>, curr_position: (u32, u32), next_position: (u32, u32)
    ) -> bool {}
```

2. Check next position is out of the board or not

```rust,ignore
  fn is_out_of_board(next_position: (u32, u32)) -> bool{}
```

3. Check the caller is in the correct turn and is moving the correct piece that they own

```rust,ignore
 fn is_correct_turn(maybe_piece: PieceType, caller: ContractAddress, game_id: felt252) -> bool{}
```

4. You can add your check functions to make sure this next position is a legal move.

Then let's modify the original move_system function using this helper function. It's pretty flexable on how you would want to align the check functions and how you would check in the logic gate, here is the example :

```rust,ignore
    fn execute(
        ctx: Context,
        curr_position: (u32, u32),
        next_position: (u32, u32),
        caller: ContractAddress,
        game_id: felt252
    ) {
        //... upper code is the same
        //Check if next_position is out of board or not
        assert(is_out_of_board(next_position), 'Should be inside board');

        //Check if this is the right piece type move

        assert(
            is_right_piece_move(current_square.piece, curr_position, next_position),
            'Should be right piece move'
        );

        let target_piece = current_square.piece;

        // make current_square piece none and move piece to next_square
        current_square.piece = Option::None(());
        let mut next_square = get!(ctx.world, (game_id, next_x, next_y), (Square));

        //Check the piece already in next_suqare
        let maybe_next_square_piece = next_square.piece;
        match maybe_next_square_piece {
            Option::Some(maybe_piece) => {
                if is_piece_is_mine(maybe_piece) {
                    panic(array!['Already same color piece exist'])
                } else {
                    //Occupy the piece
                    next_square.piece = target_piece;
                }
            },
            //if not exist, then just move the original piece
            Option::None(_) => {
                next_square.piece = target_piece;
            },
        };
        // ... below code is the same

    }
```

## Unit Tests per each function

Because we need several test functions to check each checker function are working fine, we need to modulize common part like init world.

First, let's make a helper function call `init_world_test` that returns `IWorldDispatcher` that can be used in multiple tests in the move system.

```rust,ignore
    #[test]
    #[available_gas(3000000000000000)]
    fn init_world_test() -> IWorldDispatcher {
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

        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);
        world
    }
```

Then our original test_move function can be simply implemented as this.

```rust,ignore
    #[test]
    #[available_gas(3000000000000000)]
    fn test_move() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();
        let world = init_world_test();
        let game_id = pedersen(white.into(), black.into());
        // other codes are same
    }
```

Great! then we can able to make each test that is expected to fail if we pass nonlegal moves. As an example, let's try to make `test_piecetype_ilegal` test function that checks the function `is_right_piece_move` function in the move system is working as expected.

```rust,ignore
    #[test]
    #[should_panic]
    fn test_piecetype_ilegal() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();
        let world = init_world_test();
        let game_id = pedersen(white.into(), black.into());

        let b1 = get!(world, (game_id, 1, 0), (Square));
        match b1.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhiteKnight, 'should be White Knight');
            },
            Option::None(_) => assert(false, 'should have piece'),
        };

        // Knight cannot move to that square
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(2);
        move_calldata.append(3);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);
    }
```

Now implement your test functions that check invalid moves and can be able to return errors.

## Need help?

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoralv2/src/systems/move.cairo) for chapter 3.
