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

The project comes with a lot of boilerplate codes. Clear it all. Make sure both `models.cairo` and `systems.cairo` files are empty. In this tutorial, we won't be creating a `systems.cairo` nor the `src/systems` folder, you can delete both (highly optional, folder structure is entirely up to you). instead, we'll be creating a file named `actions_contract.cairo`, this is where our game logic/contract will reside.

Remodel your`lib.cairo`, to look like this :

```rust,ignore
mod models;
mod actions_contract;
mod tests;
```

Compile your project with:

```sh
sozo build
```

## Basic components

While there are many ways to design a chess game using the ECS model, we'll follow this approach:

> Every square of the chess board (e.g., A1) will be treated as an entity. If a piece exists on a square, the square entity will hold that piece.

First, add this basic model to `models.cairo` file. If you are not familar with model syntax in Dojo engine, go back to this [chapter](../../cairo/models.md).

```rust,ignore
#[derive(Model)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: PieceType,
}

enum PieceType {
    WhitePawn : (),
    WhiteKnight: (),
    WhiteBishop: (),
    WhiteRook: (),
    WhiteQueen: (),
    WhiteKing: (),
    BlackPawn: (),
    BlackKnight: (),
    BlackBishop: (),
    BlackRook: (),
    BlackQueen: (),
    BlackKing: (),
    None: ()
}
```

## Basic systems

Starting from the next chapter, you will implement the `actions_contract.cairo` logic.

Create `actions_contract.cairo` inside the src folder. the file should contain a basic contract.

For example, `actions_contract.cairo` should look like this:

```rust,ignore
#[dojo::contract]
mod actions {

    #[storage]
    struct Storage {}
}
```

It should be noted that systems are cairo contracts, by implication, rather than implementing the game logic in systems, we are implementing it in a contract.

## Compile your project

Now try `sozo build` to build. Faced some errors?

```sh
error: Trait has no implementation in context:
```

You would probably faced some trait implementation errors, which you can implement as a derive like:

```rust,ignore

#[derive(Model, Drop, Serde)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: PieceType,
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum PieceType {
    WhitePawn: (),
    WhiteKnight: (),
    WhiteBishop: (),
    WhiteRook: (),
    WhiteQueen: (),
    WhiteKing: (),
    BlackPawn: (),
    BlackKnight: (),
    BlackBishop: (),
    BlackRook: (),
    BlackQueen: (),
    BlackKing: (),
    None: (),
}
```

Complied? Great! then let's move on. If not fix other issues as above, so that you can run the `sozo build` command successfully.

## Run test

Before proceeding to the next chapter, remember that `sozo build` and `sozo test` are important steps to ensure your code is correct.

Run sozo test. Did you face any errors?

```sh
error: Trait has no implementation in context:
```

```sh
error: Variable not dropped. Trait has no implementation in context:
```

For the no implementation error, implement the PrintTrait to run `sozo test` successfully. For the not dropped error, add the Drop trait. Address other errors by adding derives or implementing them on a case-by-case basis.

## Add more models

Before you move on, add more models so we can use them in the next chapter when creating the action contract.

### Requirements

- `Color` enum with values White,Black & None

```rust,ignore
    White: (),
    Black: (),
    None: (),
```

- `Game` model:

```rust,ignore
    game_id: felt252,
    winner: Color,
    white: ContractAddress,
    black: ContractAddress
```

- `GameTurn` model:

```rust,ignore
    game_id: felt252,
    turn: Color
```

- Run `sozo build` to see if your code compiles, we'll handle `test` implementiation in the subsequent chapters.

This tutorial is extracted from [here](https://github.com/Akinbola247/chess-dojo/tree/tutorialv3)

<details>
<summary>Click to see full `models.cairo` code</summary>

```rust,ignore
use array::ArrayTrait;
use debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{SchemaIntrospection, Ty, Enum, serialize_member_type};


#[derive(Model, Drop, Serde)]
struct Square {
    #[key]
    game_id: felt252,
    #[key]
    x: u32,
    #[key]
    y: u32,
    piece: PieceType,
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum PieceType {
    WhitePawn: (),
    WhiteKnight: (),
    WhiteBishop: (),
    WhiteRook: (),
    WhiteQueen: (),
    WhiteKing: (),
    BlackPawn: (),
    BlackKnight: (),
    BlackBishop: (),
    BlackRook: (),
    BlackQueen: (),
    BlackKing: (),
    None: (),
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum Color {
    White: (),
    Black: (),
    None: (),
}

#[derive(Model, Drop, Serde)]
struct Game {
    /// game id, computed as follows pedersen_hash(player1_address, player2_address)
    #[key]
    game_id: felt252,
    winner: Color,
    white: ContractAddress,
    black: ContractAddress
}

#[derive(Model, Drop, Serde)]
struct GameTurn {
    #[key]
    game_id: felt252,
    turn: Color
}


//printing trait for debug
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
            Color::None(_) => {
                'None'.print();
            },
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
            PieceType::None(_) => {
                'None'.print();
            },
        }
    }
}

```

</details>

Congratulations! You've completed the basic setup for building an on-chain chess game 🎉
