# 0. Setup

_Before starting recommend following the [`hello-dojo`](/cairo/hello-dojo.md) chapter to gain a basic understanding of the Dojo game._

## Initializing the Project

Create a new Dojo project folder. You can name your project what you want.

```sh
mkdir chess
```

Open the project folder.

```sh
cd chess
```

And initialize the project using sozo init.

```sh
sozo init
```

## Cleaning Up the Boilerplate

The project comes with a lot of boilerplate codes. Clear it all. Make sure your directory looks like this

```shell
├── README.md
├── Scarb.toml
└── src
    ├── actions.cairo
    ├── lib.cairo
    ├── models
    │   ├── game.cairo
    │   ├── piece.cairo
    │   └── player.cairo
    ├── models.cairo
    ├── tests
    │   ├── integration.cairo
    │   └── units.cairo
    └── tests.cairo
```

Remodel your `lib.cairo`, to look like this :

```rust
mod actions;
mod models;
mod tests;
```

Remodel your `models.cairo`, to look like this :

```rust
mod game;
mod piece;
mod player;
```

Remodel your `tests.cairo`, to look like this :

```rust
mod integration;
mod units;
```

Make sure your `Scarb.toml` looks like this:

```toml
[package]
cairo-version = "2.4.0"
name = "chess"
version = "0.4.0"

[cairo]
sierra-replace-ids = true

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", version = "0.4.2" }

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

> Every square of the chess board (e.g., A1) will be treated as an entity. If a piece exists on a square position, that position will hold that piece.

First, add this basic `player` model to `models/player.cairo` file. If you are not familar with model syntax in Dojo engine, go back to this [chapter](/cairo/models.md).

```rust
use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Player {
    #[key]
    game_id: u32,
    #[key]
    address: ContractAddress,
    color: Color
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum Color {
    White,
    Black,
    None,
}
```

Second, we do the same for `game` model. Edit your `models/game.cairo` file and add this content.

```rust
use chess::models::player::Color;
use starknet::ContractAddress;

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
    player_color: Color
}
```

Lastly we create `piece` model in our `models/piece.cairo` file.

```rust
use chess::models::player::Color;
use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Piece {
    #[key]
    game_id: u32,
    #[key]
    position: Vec2,
    color: Color,
    piece_type: PieceType,
}

#[derive(Copy, Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

#[derive(Serde, Drop, Copy, PartialEq, Introspect)]
enum PieceType {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King,
    None,
}
```

## Basic systems

Starting from the next chapter, you will implement the `actions.cairo` file. This is where our game logic/contract will reside.

For now, `actions.cairo` should look like this:

```rust
#[dojo::contract]
mod actions {
}
```

It should be noted that Systems function are contract methods, by implication, rather than implementing the game logic in systems, we are implementing it in a contract.

## Compile your project

Now try `sozo build` to build.

Complied? Great! then let's move on. If not fix the issues, so that you can run the `sozo build` command successfully.

## Implement Traits for models

Before you move on, implement traits for models so we can use them in the next chapter when creating the action contract.

### Requirements

Firt we have to define the following traits for `Game`, `Player`, `Piece` models respectively.

```rust
trait GameTurnTrait {
    fn next_turn(self: @GameTurn) -> Color;
}

trait PlayerTrait {
fn is_not_my_piece(self: @Player, piece_color: Color) -> bool;
}

trait PieceTrait {
fn is_out_of_board(next_position: Vec2) -> bool;
fn is_right_piece_move(self: @Piece, next_position: Vec2) -> bool;
}
```

Try to implement this code by yourself, Otherwise

<details>
<summary>Click to see full `models.cairo` code</summary>

```c
// code for player.cairo file
trait PlayerTrait {
    fn is_not_my_piece(self: @Player, piece_color: Color) -> bool;
}

impl PalyerImpl of PlayerTrait {
    fn is_not_my_piece(self: @Player, piece_color: Color) -> bool {
        *self.color != piece_color
    }
}

// code for game.cairo file
trait GameTurnTrait {
    fn next_turn(self: @GameTurn) -> Color;
}
impl GameTurnImpl of GameTurnTrait {
    fn next_turn(self: @GameTurn) -> Color {
        match self.player_color {
            Color::White => Color::Black,
            Color::Black => Color::White,
            Color::None => panic(array!['Illegal turn'])
        }
    }
}

// code for piece.cairo file
trait PieceTrait {
    fn is_out_of_board(next_position: Vec2) -> bool;
    fn is_right_piece_move(self: @Piece, next_position: Vec2) -> bool;
}

impl PieceImpl of PieceTrait {
    fn is_out_of_board(next_position: Vec2) -> bool {
        next_position.x > 7 || next_position.y > 7
    }

    fn is_right_piece_move(self: @Piece, next_position: Vec2) -> bool {
        let n_x = next_position.x;
        let n_y = next_position.y;
        assert(!(n_x == *self.position.x && n_y == *self.position.y), 'Cannot move same position');
        match self.piece_type {
            PieceType::Pawn => {
                match self.color {
                    Color::White => {
                        (n_x == *self.position.x && n_y == *self.position.y + 1)
                            || (n_x == *self.position.x && n_y == *self.position.y + 2)
                            || (n_x == *self.position.x + 1 && n_y == *self.position.y + 1)
                            || (n_x == *self.position.x - 1 && n_y == *self.position.y + 1)
                    },
                    Color::Black => {
                        (n_x == *self.position.x && n_y == *self.position.y - 1)
                            || (n_x == *self.position.x && n_y == *self.position.y - 2)
                            || (n_x == *self.position.x + 1 && n_y == *self.position.y - 1)
                            || (n_x == *self.position.x - 1 && n_y == *self.position.y - 1)
                    },
                    Color::None => panic(array!['Should not move empty piece']),
                }
            },
            PieceType::Knight => { n_x == *self.position.x + 2 && n_y == *self.position.y + 1 },
            PieceType::Bishop => {
                (n_x <= *self.position.x && n_y <= *self.position.y && *self.position.y
                    - n_y == *self.position.x
                    - n_x)
                    || (n_x <= *self.position.x && n_y >= *self.position.y && *self.position.y
                        - n_y == *self.position.x
                        - n_x)
                    || (n_x >= *self.position.x && n_y <= *self.position.y && *self.position.y
                        - n_y == *self.position.x
                        - n_x)
                    || (n_x >= *self.position.x && n_y >= *self.position.y && *self.position.y
                        - n_y == *self.position.x
                        - n_x)
            },
            PieceType::Rook => {
                (n_x == *self.position.x || n_y != *self.position.y)
                    || (n_x != *self.position.x || n_y == *self.position.y)
            },
            PieceType::Queen => {
                (n_x == *self.position.x || n_y != *self.position.y)
                    || (n_x != *self.position.x || n_y == *self.position.y)
                    || (n_x != *self.position.x || n_y != *self.position.y)
            },
            PieceType::King => {
                (n_x <= *self.position.x + 1 && n_y <= *self.position.y + 1)
                    || (n_x <= *self.position.x + 1 && n_y <= *self.position.y - 1)
                    || (n_x <= *self.position.x - 1 && n_y <= *self.position.y + 1)
                    || (n_x <= *self.position.x - 1 && n_y <= *self.position.y - 1)
            },
            PieceType::None => panic(array!['Should not move empty piece']),
        }
    }
}
```

</details>

This tutorial is extracted from [here](https://github.com/dojoengine/origami/tree/main/examples/chess)

Congratulations! You've completed the basic setup for building an on-chain chess game 🎉
