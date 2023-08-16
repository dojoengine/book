## Commands

Understanding commands is key to understanding Dojo. You will leverage them heavily within the systems you design.

Commands in Dojo are generalized functions that are expanded at compile time to facilitate system execution. They provide a convenient way for systems to interact with the world state by abstracting common operations, such as retrieving or updating components, and generating unique IDs. By leveraging these commands, developers can streamline their system implementations and improve code readability.


### Using commands

Commands are used within systems to interact with the world state. They are called using the following syntax:

```rust,ignore
let (position, moves) = get!(ctx.world, ctx.origin, (Position, Moves));
```

### The `get!` command

The `get!` command is used to retrieve components from the world state.

Use it like this:

```rust,ignore
let (position, moves) = get!(ctx.world, ctx.origin, (Position, Moves));
```

Here we are retrieving the `Position` and `Moves` components from the world state. We are also using the `ctx.origin` to retrieve the components for the current entity.

You can then use `position` and `moves` as you would as any other Cairo struct.

### The `set!` command

The `set!` command is used to update components state.

Use it like this:

```rust,ignore
set !(ctx.world, (
    Moves {
        player: ctx.origin, remaining: 10
    }, 
    Position {
        player: ctx.origin, x: position.x + 10, y: position.y + 10
    },
));

// If the structs are already defined it can also be written as:
set!(ctx.world, (moves, position));
```

Here we are updating the `Moves` and `Position` components in the world state using the `ctx.origin` as the entity id.

### The `emit!` command

The `emit!` command is used to emit custom events.

Use it like this:

```rust,ignore
emit !(ctx.world, Moved { address: ctx.origin, direction });
```
