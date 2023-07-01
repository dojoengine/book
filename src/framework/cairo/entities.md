## Entities

A common misconception for those new to ECS systems is the way entities exist within the World. Different ECS systems handle entities in various ways. In Dojo, entities are treated as a primary key value within the world, to which components can be attached. To illustrate this concept, consider a simple example of a character in a game that has a position and a health component.

When defining the components for this entity, it is important to note that we do not reference the entity directly. Instead, we simply provide two structs that the entity will contain. This approach emphasizes the flexibility and composability of the ECS system, allowing for the easy creation and modification of entities with various combinations of components.

```rust,ignore
#[component]
struct Position {
    x: u32,
    y: u32
}

#[component]
struct Health {
    value: u32,
}

```

Now, let's create a `SpawnSystem` for the character. It is important to note that we have not explicitly defined an Entity anywhere. Instead, the system will assign a primary key ID to the entity when this system is executed.

```rust,ignore
// The most basic system that creates a new player entity with a given name and 100 health.

#[system]
mod Spawn {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Health;

    fn execute(ctx: Context) {
        set !(
            ctx.world, ctx.origin.into(), (Moves { remaining: 10 }, Position { x: 0, y: 0 }, )
        );
        return ();
    }
}
```

Finally, lets move the character with the `MoveSystem`.

```rust,ignore
#[system]
mod Move {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    #[derive(Serde, Drop)]
    enum Direction {
        Left: (),
        Right: (),
        Up: (),
        Down: (),
    }

    impl DirectionIntoFelt252 of Into<Direction, felt252> {
        fn into(self: Direction) -> felt252 {
            match self {
                Direction::Left(()) => 0,
                Direction::Right(()) => 1,
                Direction::Up(()) => 2,
                Direction::Down(()) => 3,
            }
        }
    }

    fn execute(ctx: Context, direction: Direction) {
        let (position, moves) = get !(ctx.world, ctx.origin.into(), (Position, Moves));
        let next = next_position(position, direction);
        set !(
            ctx.world,
            ctx.origin.into(),
            (Moves { remaining: moves.remaining - 1 }, Position { x: next.x, y: next.y }, )
        );
        return ();
    }

    fn next_position(position: Position, direction: Direction) -> Position {
        match direction {
            Direction::Left(()) => {
                Position { x: position.x - 1, y: position.y }
            },
            Direction::Right(()) => {
                Position { x: position.x + 1, y: position.y }
            },
            Direction::Up(()) => {
                Position { x: position.x, y: position.y - 1 }
            },
            Direction::Down(()) => {
                Position { x: position.x, y: position.y + 1 }
            },
        }
    }
}
```
