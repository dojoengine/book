# 3. Check Legal Move

In this chapter, we'll make functions to check:

- If the next move goes outside the board.
- If there's a piece that can be captured.
- If the next move is allowed for the type of piece.
- If the person trying the move can do it (based on the piece's color).
- ... You can also add other custom check functions.

## Make Check Functions

We need to add some check functions in `move_system`. These will help make sure the next move is okay.

1. See if the next spot is okay for the type of piece moving.

```rust,ignore
  fn is_right_piece_move(
        maybe_piece: Option<PieceType>, curr_position: (u32, u32), next_position: (u32, u32)
    ) -> bool {}
```

2. See if the next spot is still on the board.

```rust,ignore
  fn is_out_of_board(next_position: (u32, u32)) -> bool{}
```

3. See if the person trying the move is doing it at the right time and with their piece.

```rust,ignore
 fn is_correct_turn(maybe_piece: PieceType, caller: ContractAddress, game_id: felt252) -> bool{}
```

4. You can also add other check functions to be extra sure the move is okay.

Once you've made these check functions, you can use them in the main `move_system` function. You can decide how to set them up and which ones to use. We'll give an example to help:

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

## Testing Each Function

Since we have different check functions, we need to test each one. To make this easier, let's use parts that are the same for many tests.

First, make a helper function called `init_world_test`. This will give back an `IWorldDispatcher` that we can use many times in the move system tests.

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

Then, our main `test_move` function will be simpler.

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

Now we can make tests that show errors if we try moves that aren't allowed. For a start, let's make a `test_piecetype_illegal` function. This will check if the `is_right_piece_move` function in the move system works right.

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

Finish by making your tests. These should find wrong moves and give back errors.

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!

You can find the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoralv2/src/systems/move.cairo) for chapter 3 here.
