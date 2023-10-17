# 2. Check Legal Move

In this chapter, we'll make functions to check:

- If the next move goes outside the board.
- If there's a piece that can be captured.
- If the next move is allowed for the type of piece.
- If the user can allow to make a action (based on the piece's color).
- ... You can also add other custom check functions.

## Make Check Functions

We need to add some check functions in `actions` contract. These will help make sure the next move is allowed.

1. See if player is moving the right piece

```rust,ignore
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
```rust,ignore
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

Once you've made these check functions, you can use them in the `move` function in the contract as illustrated in the previous chapter [here](1-action.md). You can decide how to set them up and which ones to use. We'll give an example to help:

## Testing Each Function

Since we have different check functions, we need to test each one. To make this easier, let's use parts that are the same for many tests.

First, make a helper function called `setup_world`. This will give back an `IWorldDispatcher` and `IActionsDispatcher` that we can use many times in the tests.

```rust,ignore
    #[test]
    #[available_gas(3000000000000000)]
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
```

Then, our main `test_move` function will be simpler.

```rust,ignore
    #[test]
    #[available_gas(3000000000000000)]
    fn test_move() {
        let white = starknet::contract_address_const::<0x01>();
        let black = starknet::contract_address_const::<0x02>();
        let (move_system, initate_system) = setup_world();
        let game_id = pedersen(white.into(), black.into());
        // other codes are same
    }
```

Now we can make tests that show errors if we try moves that aren't allowed. Let's make a `test_piecetype_illegal` function. This will check if the `is_right_piece_move` function, that you implemented in the move system, works right.

```rust,ignore
    #[test]
    #[should_panic]
    fn test_piecetype_ilegal() {    
    let white = starknet::contract_address_const::<0x01>();
    let black = starknet::contract_address_const::<0x02>();
    let (world, actions_system) = setup_world();
    let game_id = pedersen::pedersen(white.into(), black.into());

    let b1 = get!(world, (game_id, 1, 0), (Square));
    assert(b1.piece == PieceType::WhiteKnight, 'should be White Knight');

    // Knight cannot move to that square
    actions_system.move((1,0),(2,3),white.into(), game_id);
    }
```

Finish by making your tests. These should find wrong moves and give back errors.

## Need help?

If you're stuck, don't hesitate to ask questions at the [Dojo community](https://discord.gg/akd2yfuRS3)!

