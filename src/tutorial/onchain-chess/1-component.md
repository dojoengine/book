# 1. Create Piece

_Before you start, make sure you followed [0. Initial Setting](./tutorial/onchain-chess/0-setting.md) chaper_

We will make components that contruct `Piece Entity`. This entity is compose with two components : `Piece` and `Position`.

### Piece Component

First lets contruct component using minimum elements. We need to define `kind` and `color` for assign what type is piece is, and `is_alive` field for track piece status. ( For now, lets ignore concept about the game. Imagine that we have just only one game.)

```rust
struct Piece {
    /// Define the type of piece
    kind: PieceKind,
    /// Define the color of piece : black or white
    color: PieceColor,
    /// Define the piece status
    is_alive: bool,
}
```

`PieceKind` and `PieceColor` would be enum like this:

```rust
enum PieceKind {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
}

enum PieceColor {
    White,
    Black,
}
```
