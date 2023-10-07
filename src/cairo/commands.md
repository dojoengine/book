## Commands

Understanding commands is key to understanding Dojo. You will leverage them heavily within the systems you design.

Commands in Dojo are generalized functions that are expanded at compile time to facilitate system execution. They provide a convenient way for systems to interact with the world state by abstracting common operations, such as retrieving or updating models, and generating unique IDs. By leveraging these commands, developers can streamline their system implementations and improve code readability.


### Using commands

Commands are used within systems to interact with the world state. They are called using the following syntax:

```rust,ignore
let (position, moves) = get!(world, caller, (Position, Moves));
```

### The `get!` command

The `get!` command is used to retrieve models from the world state.

Use it like this:

```rust,ignore
let (position, moves) = get!(world, caller, (Position, Moves));
```

Here we are retrieving the `Position` and `Moves` models from the world state. We are also using the `caller` to retrieve the models for the current entity.

You can then use `position` and `moves` as you would as any other Cairo struct.

### The `set!` command

The `set!` command is used to update models state.

Use it like this:

```rust,ignore
set !(world, (
    Moves {
        player: caller, remaining: 10
    }, 
    Position {
        player: caller, x: position.x + 10, y: position.y + 10
    },
));

// If the structs are already defined it can also be written as:
set!(world, (moves, position));
```

Here we are updating the `Moves` and `Position` models in the world state using the `caller` as the entity id.

### The `emit!` command

The `emit!` command is used to emit custom events.

Use it like this:

```rust,ignore
emit !(world, Moved { address: caller, direction });
```
