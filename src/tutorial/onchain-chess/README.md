# Building a Chess Game

_"I just finished reading The Dojo Book. What should I do next?"_

The answers to this question are always "Make something!", sometimes followed by a list of cool projects. This is a great answer for some people, but others might be looking for a little more direction.

This guide is intended to fill the gap between heavily directed beginner tutorials and working on your own projects. The primary goal here is to get you to write code. The secondary goal is to get you reading documentation.

If you haven't read Dojo Book yet, I highly encourage you to do so before attempting this project. This guide does not cover every feature.

## What are we making?

We're making an on-chain chess game that lets you start a new game and play chess. Your game will have 3 systems:

1. Spawn all the chess pieces [initiate.system]
2. Make pieces to move [move.system]
3. Make pieces to take other pieces [occupy.system]
4. Play chess ♟♙ - integration test!

If that sounds scary and beyond your ability then this guide is definitely for you. If you know how to write Cairo and you know your Dojo basics, you can totally do this. We're not going to implement any sort of checkmate or full chess rules. The part of the Chess implementation we're tackling is surprisingly simple.
