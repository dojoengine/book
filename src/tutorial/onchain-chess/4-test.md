# 4. Test Contract

This chapter will recap the lessons from previous chapters by running one chess play scenario.

Now let's run a full integration test. In this example, will test flow as follows:

1. Spawn `white_pawn_1` to (0,1)
2. Move `white_pawn_1` to (0,3)
3. Move `black_pawn_2` to (1,6)
4. Move `white_pawn_1` to (0,4)
5. Move `black_pawn_2` to (1,5)
6. Move `white_pawn_1` to (1,5)
7. Occupy `black_pawn_2`

To spawn the piece, use `initiate_system` that we created. To move the piece, use `move_system` that we created. Need to check while running `move_system`, if we can able to occupy the right piece if chance.

Before you jump on the code, Do this as followings to make integration test as seperate from original unit tests :

- Copy the tests below and paste them at the bottom of your `src/tests.cairo` file.
- Create `test.cairo` at your src and update `lib.cairo` while adding `mod tests;` line.

## Full Code

```rust
#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::spawn_test_world;
    use dojo_chess::components::{Game, game, GameTurn, game_turn, Square, square, PieceType};

    use dojo_chess::systems::initiate_system;
    use dojo_chess::systems::move_system;
    use array::ArrayTrait;
    use core::traits::Into;
    use dojo::world::IWorldDispatcherTrait;
    use core::array::SpanTrait;


    #[test]
    #[available_gas(3000000000000000)]
    fn integration() {
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

        // initiate
        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);

        let game_id = pedersen(white.into(), black.into());

        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        match a2.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, 'should be White Pawn in (0,1)');
            },
            Option::None(_) => assert(false, 'should have piece in (0,1)'),
        };

        //Black pawn is now in (1,6)
        let b7 = get!(world, (game_id, 1, 6), (Square));
        match b7.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::BlackPawn, 'should be Black Pawn in (1,6)');
            },
            Option::None(_) => assert(false, 'should have piece in (1,6)'),
        };

        //Move White Pawn to (0,3)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        //White pawn is now in (0,3)
        let a4 = get!(world, (game_id, 0, 3), (Square));
        match a4.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, 'should be White Pawn in (0,3)');
            },
            Option::None(_) => assert(false, 'should have piece in (0,3)'),
        };

        //Move black Pawn to (1,4)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(1);
        move_calldata.append(6);
        move_calldata.append(1);
        move_calldata.append(4);
        move_calldata.append(black.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        //Black pawn is now in (1,4)
        let b5 = get!(world, (game_id, 1, 4), (Square));
        match b5.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::BlackPawn, 'should be Black Pawn  in (1,4)');
            },
            Option::None(_) => assert(false, 'should have piece  in (1,4)'),
        };

        // Move White Pawn to (1,4)
        // Capture black pawn
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(1);
        move_calldata.append(4);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);

        let b5 = get!(world, (game_id, 1, 4), (Square));
        match b5.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, 'should be WhitePawn  in (1,4)');
            },
            Option::None(_) => assert(false, 'should have piece in (1,4)'),
        };
    }
}
```

We first define the players addresses and assigned the color.

```rust
   let white = starknet::contract_address_const::<0x01>();
   let black = starknet::contract_address_const::<0x02>();
```

Components and Systems both should be define as array that contains all the CLASS_HASH as a elements.

```rust
// components
let mut components = array::ArrayTrait::new();
components.append(game::TEST_CLASS_HASH);
components.append(game_turn::TEST_CLASS_HASH);
components.append(square::TEST_CLASS_HASH);

//systems
let mut systems = array::ArrayTrait::new();
systems.append(initiate_system::TEST_CLASS_HASH);
systems.append(move_system::TEST_CLASS_HASH);
```

Then we define the world.

```rust
     let world = spawn_test_world(components, systems);
```

First to spawn the Square pieces before we make a move, we execute `initiate_system` that spawn all the `Square` entity that contains Piece. System's execute function gets input and this input will be deliver as a calldata which datatype is array.

```rust
        // initiate
        let mut calldata = array::ArrayTrait::<core::felt252>::new();
        calldata.append(white.into());
        calldata.append(black.into());
        world.execute('initiate_system'.into(), calldata);
```

We check if there is White pawn exist in (0,1). First get the entity by keys or components. quick reminder, Square component's keys are `game_id` and `x` and `y`. We do it same with Black pawn.

```rust
        //White pawn is now in (0,1)
        let a2 = get!(world, (game_id, 0, 1), (Square));
        match a2.piece {
            Option::Some(piece) => {
                assert(piece == PieceType::WhitePawn, 'should be White Pawn in (0,1)');
            },
            Option::None(_) => assert(false, 'should have piece in (0,1)'),
        };
```

As we call our initiate_system, we also calling move_system while generating inputs as a calldata. First two (0,1) is current position, (0,3) is next position , then caller address and game id that will be use in move_system to check if it's valid move.

```rust
 //Move White Pawn to (0,3)
        let mut move_calldata = array::ArrayTrait::<core::felt252>::new();
        move_calldata.append(0);
        move_calldata.append(1);
        move_calldata.append(0);
        move_calldata.append(3);
        move_calldata.append(white.into());
        move_calldata.append(game_id);
        world.execute('move_system'.into(), move_calldata);
```

And then we repeating moving and checking that is correct. :)
Base on that you can able to create your own play scenario!

## Need help?

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoral/src/systems/occupy.cairo) for chapter 2.
