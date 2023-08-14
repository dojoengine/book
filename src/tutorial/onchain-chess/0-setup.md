# 0. Setup

_Before you start, I recommend you to follow `hello-dojo` chaper to get a brief understanding of dojo game._

## sozo init

Create a new Dojo project using `sozo init`. Check if you already installed `sozo`. (If not, check out installation [page](../../getting-started/installation.md) )

Open your empty game folder and open the terminal.

```sh
sozo init
```

## setup

There are lots of boilerplate codes. We don't need it, so remove all the codes for now. Make `components.cairo` and `systmems.cairo` files blank.

Keep `lib.cairo` only the following codes:

```rust
mod components;
mod systems;
```

Build your initial setup project using `sozo build`.

## Basic components

Based on ECS design, we need `Piece` Entity. In this project, we will design `Piece` Entity composed of `Piece` Component and `Position` Component. If you are not familiar with ECS yet, go back to this [chapter](../../framework/cairo/overview.md).

First, add basic components to `components.cairo` file. If you are not familar with component syntax in dojo engine, go back to this [chapter](../../framework/cairo/components.md).

```rust
#[derive(Component)]
struct Piece {
    #[key]
    piece_id: felt252,
    kind: PieceKind,
    color: PieceColor,
    is_alive: bool,
}

#[derive(Component)]
struct Position {
    #[key]
    piece_id: felt252,
    x: u32,
    y: u32
}

enum PieceColor {
    White,
    Black,
}

enum PieceKind {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
}
```

Then try `sozo build` to build. Faced some errors?

```sh
error: Trait has no implementation in context: core::serde::Serde::<dojo_chess::components::PieceKind>
 --> Piece:28:35
                    serde::Serde::serialize(self.kind, ref serialized);serde::Serde::serialize(self.color, ref serialized);serde::Serde::serialize(self.is_alive, ref serialized);
                                  ^*******^
```

enum `PieceColor` and `PieceKind` are used as a Component struct's field. Need to implement `Serde` to be built.

Update both enums as follows:

```rust
#[derive(Serde)]
enum PieceColor {
    White,
    Black,
}

#[derive(Serde)]
enum PieceKind {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
}
```

Great! then let's solve this error.

```sh
error: Trait has no implementation in context: dojo::serde::SerdeLen::<dojo_chess::components::Piece>
 --> Piece:62:46
                    dojo::SerdeLen::<Piece>::len()
```

Basically, we need to also implement `SerdeLen` with `len()` method in Component. And if we implement it in a struct, we also need to implement the same with the enum that is used in that struct.

Update the code into the following:

```rust
#[derive(Component, SerdeLen)]
struct Piece {
    #[key]
    piece_id: felt252,
    kind: PieceKind,
    color: PieceColor,
    is_alive: bool,
}

#[derive(Component, SerdeLen)]
struct Position {
    #[key]
    piece_id: felt252,
    x: u32,
    y: u32
}

#[derive(Serde)]
enum PieceColor {
    White,
    Black,
}

#[derive(Serde)]
enum PieceKind {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
}

impl PieceKindSerdeLen of dojo::SerdeLen<PieceKind> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}

impl PieceColorSerdeLen of dojo::SerdeLen<PieceColor> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}
```

Now try `sozo build` again! Congrats you finished your basic setup for building an onchain chess game.
