# 3. Check Legal Move

This chapter will handle implementing additional functions to check

- Is next move is out of board?
- Is there is piece need to occupy?
- Is next move is legal (base on piece type)?
- Is caller can execute next move (base on color)?
- ... And you can add your custom checker functions

## Requirements

_Copy the tests code lines below and paste them inside at the bottom of your `test_move` function._

1. Write a `execute` function in the system that gets `world context`, `piece_id`, and `piece_id` as input
2. Update Piece entity is_alive field
3. run `sozo test` and pass all the test

## Test Flow

- Same logic as `test_initiate` in the previous chapter.
- Check the target piece is alive.
- Execute `occupy_system` with piece_id and piece_id.
- Check the target piece is occupied.

## Unit Tests

```rust,ignore

    fn test_move() {
       //... until here you moved White Knight.
}

```

If you are stuck? don't hesitate to ask questions at [Dojo community](https://discord.gg/akd2yfuRS3)!

Here is the [answer](https://github.com/rkdud007/chess-dojo/blob/tutoral/src/systems/occupy.cairo) for chapter 2.
