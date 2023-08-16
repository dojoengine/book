# 0. Setup

_Before you start, I recommend you to follow `hello-dojo` chaper to get a brief understanding of Dojo game._

## sozo init

Create a new Dojo project using `sozo init`. Check if you already installed `sozo`. (If not, check out installation [page](../../getting-started/installation.md) )

Open your empty game folder and open the terminal.

```sh
sozo init
```

## setup

The project comes with a lot of boilerplate codes. Clear them all. Make sure both `components.cairo` and `systems.cairo` files are empty.

In `lib.cairo`, retain only:

```rust,ignore
mod components;
mod systems;
```

Build your initial setup project using `sozo build`.

## Basic components

While there are many ways to design a chess game using the ECS model, we'll follow this approach: every board square (e.g., A1) will be treated as an entity. If a piece exists on a square, the square entity will hold that piece.

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

First, add this basic component to `components.cairo` file. If you are not familar with component syntax in Dojo engine, go back to this [chapter](../../framework/cairo/components.md).

## Basic systems

Starting from the next chapter, you will implement `initiate` and `move` systems one by each chapter. Let's make each system per file so that it can be more modularized.

Create `systems` folder at `src`. Create `initiate.cairo`and `move.cairo` two files inside the folder. Each file should contain a basic system structure.

For example, `initiate.cairo` would be looks like this:

```rust
#[system]
mod initiate_system {

}
```

and in `systems.cairo` we will use initiate_system like this:

```rust
mod initiate;

use initiate::initiate_system;
```

Do the same with the other three systems. And make update `systems.cairo` like :

```rust
mod initiate;
mod move;

use initiate::initiate_system;
use move::move_system;
```

## sozo build

Now try `sozo build` to build. Faced some errors?

```sh
error: Trait has no implementation in context:
```

You would probably faced some trait implementation errors, which you can implement as a derive like this:

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

One thing you have to make sure is, that `<Option<PieceType>>` is the type that we created. So this type does not implement basic traits like SerdeLen. You need to define the implementation you own.

```rust,ignore
impl PieceOptionSerdeLen of dojo::SerdeLen<Option<PieceType>> {
    #[inline(always)]
    fn len() -> usize {
        2
    }
}
```

Try to fix everything so that `sozo build` command can run successfully.

## sozo test

Before you move on to the next chapter you always have to remember that `sozo build` and then `sozo test` are must-do steps to make sure your code is all fine.

try `sozo test`. Faced errors?

```sh
error: Trait has no implementation in context:
```

```sh
error: Variable not dropped. Trait has no implementation in context:
```

As `no implementation` error, you can implement `PrintTrait` for running sozo test successfully.

And for not dropped error, you need to add `Drop` trait. Fix other errors as well by trying to add on derive or implement on your own per case by case.

## Before you move on

Add more components so that we can use them from the next chapter while creating systems.

### Requirements

- `Color` enum have White and Black
- `Game` component :

```
    game_id: felt252,
    winner: Option<Color>,
    white: ContractAddress,
    black: ContractAddress
```

- `GameTurn` component :

```
    game_id: felt252,
    turn: Color
```

- we will later set `Game` entity composed of `Game` and `GameTurn` component
- Run `sozo build` and `sozo test` and pass everything.

Try to solve on your own, and before you move on check the answer below.

<details>
<summary>Click to see full `components.cairo`code</summary>

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

Congrats! Finished all basic setup for building an on-chain chess game🎉
