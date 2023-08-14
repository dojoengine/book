# Building Onchain Chess Game

In this chapter, we'll construct a complete project together to illustrate various concepts and to revisit some of the lessons from earlier chapters.

For our final project, we'll create a chess game using the Dojo engine.

Here's our plan for building the chess game:

- Initialize the Dojo game and design based on ECS.
- Create pieces as basic components.
- Implement movement for the pieces using basic systems.
- Add functionality to capture enemy pieces – incorporate additional systems.
- Check valid moves by caching the board.
- Incorporate a game component to make it scalable.
- Test the game's contract through a full integration test.

Before we begin, we won't be implementing checkmate or additional techniques like castling in this game. We will only implement the fundamental logic and structure to showcase how Dojo works while building a classic game, chess.
