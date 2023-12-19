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

The project comes with a lot of boilerplate codes. Clear it all. Make sure both `actions.cairo`, `models.cairo` and `utils.cairo` files are empty. Then create a new empty `tests.cairo` file in your `/src` directory.

Remodel your`lib.cairo`, to look like this :

```rust,ignore
mod actions;
mod models;
mod utils;
mod tests;
```

Make sure your `Scarb.toml` looks like this:

```toml
[package]
cairo-version = "2.3.0"
name = "dojo_chess"
version = "0.3.15"

[cairo]
sierra-replace-ids = true

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", version = "0.3.15" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0xbeef"

[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"

```

Compile your project with:

```sh
sozo build
```

## Basic Models

While there are many ways to design a chess game using the ECS model, we'll follow this approach:

> Every square of the chess board (e.g., A1) will be treated as an entity. If a piece exists on a square, the square entity will hold that piece.

First, add this basic model to `models.cairo` file. If you are not familar with model syntax in Dojo engine, go back to this [chapter](../../cairo/models.md).

```rust,ignore
#[derive(Model, Drop, Serde)]
struct Square {
    #[key]
    game_id: u32,
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

## Basic systems

Starting from the next chapter, you will implement the `actions.cairo` file. This is where our game logic/contract will reside.

For now, `actions.cairo` should look like this:

```rust,ignore
#[dojo::contract]
mod actions {
}
```

It should be noted that Systems function are contract methods, by implication, rather than implementing the game logic in systems, we are implementing it in a contract.

## Compile your project

Now try `sozo build` to build.

Complied? Great! then let's move on. If not fix try issues, so that you can run the `sozo build` command successfully.

## Add more models

Before you move on, add more models so we can use them in the next chapter when creating the action contract.

### Requirements

- `Color` enum with values: White,Black & None

- `Game` model with fields: game_id, winner, white, black.

- `GameTurn` model with fields: game_id, turn.

Try to implement this code by yourself, Otherwise

<details>
<summary>Click to see full `models.cairo` code</summary>

```rust,ignore
use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Square {
    #[key]
    game_id: u32,
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
    #[key]
    game_id: u32,
    winner: Color,
    white: ContractAddress,
    black: ContractAddress
}

#[derive(Model, Drop, Serde)]
struct GameTurn {
    #[key]
    game_id: u32,
    turn: Color
}
```

</details>

This tutorial is extracted from [here](https://github.com/dojoengine/origami/tree/main/examples/chess)

Congratulations! You've completed the basic setup for building an on-chain chess game 🎉
