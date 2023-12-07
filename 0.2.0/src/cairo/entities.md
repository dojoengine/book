## Entities

> Entities are the primary key value within the world, to which components can be attached.

Different ECS systems handle entities in various ways. In Dojo, entities are treated as a primary key value within the world, to which components can be attached. To illustrate this concept, consider a simple example of a character in a game that has a `Moves` and a `Position` component.

When defining the components for this entity, it is important to note that we do not reference the entity directly. Instead, we simply provide two structs that the entity will contain.

```rust,ignore
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Health {
    #[key]
    player: ContractAddress,
    x: u32,
    y: u32
}
```

Now, let's create a `Spawn` for the character. It is important to note that we have not explicitly defined an Entity anywhere. Instead, we use the `ctx.origin` to reference the current entity.

In this example we are using the `ctx.origin` to reference the current entity.

```rust,ignore
#[system]
mod spawn {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    fn execute(ctx: Context) {
        let position = get!(ctx.world, ctx.origin, (Position));
        set!(
            ctx.world,
            (
                Moves {
                    player: ctx.origin, remaining: 10
                    }, Position {
                    player: ctx.origin, x: position.x + 10, y: position.y + 10
                },
            )
        );
        return ();
    }
}
```

> ECS Theory: Plenty has been written on ECS systems, to go deeper read [ECS-FAQ](https://github.com/SanderMertens/ecs-faq)
