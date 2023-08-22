# 0. Setup

_Before starting recommend following the [`hello-dojo`](../../cairo/hello-dojo.md) chapter to gain a basic understanding of the Dojo game._

## Initializing the Project

Create a new Dojo project folder. You can name your project what you want.

```sh
mkdir dojo-chess
```

Open the project folder.

```sh
cd dojo-chess
```

And initialize the project using sozo init.

```sh
sozo init
```

## Cleaning Up the Boilerplate

The project comes with a lot of boilerplate codes. Clear it all. Make sure both `components.cairo` and `systems.cairo` files are empty.

In `lib.cairo`, retain only:

```rust,ignore
mod components;
mod systems;
```

Compile your project with:

```sh
sozo build
```

## Basic components

While there are many ways to design a chess game using the ECS model, we'll follow this approach:

> Every square of the chess board (e.g., A1) will be treated as an entity. If a piece exists on a square, the square entity will hold that piece.

First, add this basic component to `components.cairo` file. If you are not familar with component syntax in Dojo engine, go back to this [chapter](../../framework/cairo/components.md).

```rust,ignore
#[derive(Component)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: Option<PieceType>,
}

enum PieceType {
    WhitePawn,
    WhiteKnight,
    WhiteBishop,
    WhiteRook,
    WhiteQueen,
    WhiteKing,
    BlackPawn,
    BlackKnight,
    BlackBishop,
    BlackRook,
    BlackQueen,
    BlackKing,
}
```

## Basic systems

Starting from the next chapter, you will implement `initiate` and `move` systems one in each chapter. Let's create each system in its own file for better modularity.

Create a `systems` folder at `src`. Create `initiate.cairo`and `move.cairo` two files inside the folder. Each file should contain a basic system structure.

For example, `initiate.cairo` look like this:

```rust,ignore
#[system]
mod initiate_system {

}
```

and in `systems.cairo` we will use `initiate_system` like this:

```rust,ignore
mod initiate;

use initiate::initiate_system;
```

Do the same with the other systems. Update `systems.cairo` to:

```rust,ignore
mod initiate;
mod move;

use initiate::initiate_system;
use move::move_system;
```

## Compile your project

Now try `sozo build` to build. Faced some errors?

```sh
error: Trait has no implementation in context:
```

You would probably faced some trait implementation errors, which you can implement as a derive like:

```rust,ignore

#[derive(Component, Drop, SerdeLen, Serde)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: Option<PieceType>,
}

#[derive(Serde, Drop, Copy, PartialEq)]
enum PieceType {
    WhitePawn,
    WhiteKnight,
    WhiteBishop,
    WhiteRook,
    WhiteQueen,
    WhiteKing,
    BlackPawn,
    BlackKnight,
    BlackBishop,
    BlackRook,
    BlackQueen,
    BlackKing,
}
```

Great! then let's solve this error.

```sh
error: Trait has no implementation in context: dojo::serde::SerdeLen::<core::option::Option::<dojo_chess::components::PieceType>>
 --> Square:80:54
                dojo::SerdeLen::<Option<PieceType>>::len()
                                                     ^*^
```

One thing you have to make sure is, that `<Option<PieceType>>` is the type that we created. So this type does not implement basic traits like SerdeLen. You need to define the implementation by your own.

```rust,ignore
impl PieceOptionSerdeLen of dojo::SerdeLen<Option<PieceType>> {
    #[inline(always)]
    fn len() -> usize {
        2
    }
}
```

Fix other issues as above, so that you can run the `sozo build` command runs successfully.

## Run test

Before proceeding to the next chapter, remember that `sozo build` and `sozo test` are important steps to ensure your code is correct.

Run sozo test. Did you face any errors?

```sh
error: Trait has no implementation in context:
```

```sh
error: Variable not dropped. Trait has no implementation in context:
```

For the no implementation error, implement the PrintTrait to run sozo test successfully. For the not dropped error, add the Drop trait. Address other errors by adding derives or implementing them on a case-by-case basis.

## Add more components

Before you move on, add more components so we can use them in the next chapter when creating systems.

### Requirements

- `Color` enum enum with values White and Black
- `Game` component:

```rust,ignore
    game_id: felt252,
    winner: Option<Color>,
    white: ContractAddress,
    black: ContractAddress
```

- `GameTurn` component:

```rust,ignore
    game_id: felt252,
    turn: Color
```

- We will later set game entity composed of the `Game` and `GameTurn` components.
- Run `sozo build` and `sozo test` and ensure all tests pass.

Try to solve on your own, and before you move on check the answer below.

<details>
<summary>Click to see full `components.cairo` code</summary>

```rust,ignore
use debug::PrintTrait;
use starknet::ContractAddress;

#[derive(Component, Drop, SerdeLen, Serde)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: Option<PieceType>,
}

#[derive(Serde, Drop, Copy, PartialEq)]
enum PieceType {
    WhitePawn,
    WhiteKnight,
    WhiteBishop,
    WhiteRook,
    WhiteQueen,
    WhiteKing,
    BlackPawn,
    BlackKnight,
    BlackBishop,
    BlackRook,
    BlackQueen,
    BlackKing,
}

#[derive(Serde, Drop, Copy, PartialEq)]
enum Color {
    White,
    Black,
}


impl PieceOptionSerdeLen of dojo::SerdeLen<Option<PieceType>> {
    #[inline(always)]
    fn len() -> usize {
        2
    }
}

impl ColorPrintTrait of PrintTrait<Color> {
    #[inline(always)]
    fn print(self: Color) {
        match self {
            Color::White(_) => {
                'White'.print();
            },
            Color::Black(_) => {
                'Black'.print();
            },
        }
    }
}

impl ColorOptionPrintTrait of PrintTrait<Option<Color>> {
    #[inline(always)]
    fn print(self: Option<Color>) {
        match self {
            Option::Some(color) => {
                color.print();
            },
            Option::None(_) => {
                'None'.print();
            }
        }
    }
}


impl BoardPrintTrait of PrintTrait<(u32, u32)> {
    #[inline(always)]
    fn print(self: (u32, u32)) {
        let (x, y): (u32, u32) = self;
        x.print();
        y.print();
    }
}


impl PieceTypeOptionPrintTrait of PrintTrait<Option<PieceType>> {
    #[inline(always)]
    fn print(self: Option<PieceType>) {
        match self {
            Option::Some(piece_type) => {
                piece_type.print();
            },
            Option::None(_) => {
                'None'.print();
            }
        }
    }
}


impl PieceTypePrintTrait of PrintTrait<PieceType> {
    #[inline(always)]
    fn print(self: PieceType) {
        match self {
            PieceType::WhitePawn(_) => {
                'WhitePawn'.print();
            },
            PieceType::WhiteKnight(_) => {
                'WhiteKnight'.print();
            },
            PieceType::WhiteBishop(_) => {
                'WhiteBishop'.print();
            },
            PieceType::WhiteRook(_) => {
                'WhiteRook'.print();
            },
            PieceType::WhiteQueen(_) => {
                'WhiteQueen'.print();
            },
            PieceType::WhiteKing(_) => {
                'WhiteKing'.print();
            },
            PieceType::BlackPawn(_) => {
                'BlackPawn'.print();
            },
            PieceType::BlackKnight(_) => {
                'BlackKnight'.print();
            },
            PieceType::BlackBishop(_) => {
                'BlackBishop'.print();
            },
            PieceType::BlackRook(_) => {
                'BlackRook'.print();
            },
            PieceType::BlackQueen(_) => {
                'BlackQueen'.print();
            },
            PieceType::BlackKing(_) => {
                'BlackKing'.print();
            },
        }
    }
}

impl ColorSerdeLen of dojo::SerdeLen<Color> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}

#[derive(Component, Drop, SerdeLen, Serde)]
struct Game {
    /// game id, computed as follows pedersen_hash(player1_address, player2_address)
    #[key]
    game_id: felt252,
    winner: Option<Color>,
    white: ContractAddress,
    black: ContractAddress
}


#[derive(Component, Drop, SerdeLen, Serde)]
struct GameTurn {
    #[key]
    game_id: felt252,
    turn: Color,
}

impl OptionPieceColorSerdeLen of dojo::SerdeLen<Option<Color>> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}

```

</details>

Congratulations! You've completed the basic setup for building an on-chain chess game 🎉
