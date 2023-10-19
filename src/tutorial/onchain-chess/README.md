# Building a Chess Game

_"I just finished reading The Dojo Book. What should I do next?"_

The answers to this question are always "Make something!", sometimes followed by a list of cool projects. This is a great answer for some people, but others might be looking for a little more direction.

This guide is intended to fill the gap between heavily directed beginner tutorials and working on your projects. The primary goal here is to get you to write code. The secondary goal is to get you reading documentation.

If you haven't read the Dojo Book yet, it is highly encouraged for you to do so before starting this project.

## What are we building?

We're building an on-chain chess game contract that lets you start a new game and play chess. This guide does not cover every rules of the chess game. You will build step by step as follows:

1. A system contract to spawn all the chess pieces
2. A system contract to make pieces move
3. Add some functions to check a legal move
4. Play chess ♟♙ - integration test!

The full code of tutorial is based on [this repo](https://github.com/dojoengine/dojo-examples/tree/main/examples/dojo-chess).

If this seems too hard, don't worry! This guide is for beginners. If you know some basics about Cairo and Dojo, you're good. We won't make a full chess game with all the rules. We're keeping it simple.

## What after this guide?

We're making another guide to help design the frontend. This will make our chess game complete.

After you finish all the four chapters, we can move on to the frontend guide.
