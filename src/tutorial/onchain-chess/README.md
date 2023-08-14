# Building a Chess Game

In this chapter, we're going to put together a chess game that runs on the blockchain, using the Dojo engine. We'll dive into how it all works, recap some lessons we've learned, and get hands-on with the project.

## Step-by-Step Plan

Let's break down how we're going to create our chess game:

1. Start the game with Dojo engine.
2. List out all the chess pieces we need.
3. Make piece to move.
4. Add a way for pieces to take other pieces.
5. Make sure pieces move correctly by keeping track of the board.
6. Add game as component so it can handle more games.
7. Test the game thoroughly to ensure it works as expected.

**Quick Note:** We're keeping things basic for now. So, moves like checkmate or special ones like castling won't be in this version. We want to showcase what the Dojo engine can do by building a straightforward chess game.

## How We Design with Dojo's ECS

The Dojo engine uses something called the ECS design. If "ECS" sounds new or confusing, don't worry! Check out this [chapter](../../framework/cairo/overview.md) for a refresher.

This will be our tutorial chess game's ECS design. If you have any other creative or efficient design in mind, feel free to share to Dojo community!

### Components & Entities

- **Chess Pieces (Entities)**

  - _For example:_ The White Pawn
    - Part: Chess Piece
    - Part: Where it stands on the board

- **The Game Itself (Entity)**

  - _For example:_ A single round of chess
    - Part: The game round
    - Part: Whose turn is it?
    - Part: Who are the players?

- **Board Squares (Entity)**
  - _For example:_ Square A1
    - Part: Board Space

### Systems

- **Getting Started (Initialization System)**

  - Lay the groundwork: Set up a round of chess
  - Get all the pieces ready
  - Keep a close eye on the board's layout

- **Making Moves (Move Execution System)**

  - Think about all possible moves
    - If a piece can take another, let it
  - Make sure a move is okay before doing it
  - Double-check who owns the piece
  - Ensure it's the right player's turn
  - Move the piece to its new spot

- **Ending the Game (Concession System)**
  - Decide who won and wrap things up.
