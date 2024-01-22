## Entities

> Entities are the primary key value within the world, to which models can be attached.

Different ECS systems handle entities in various ways. In Dojo, entities are treated as a primary key value within the world, to which models can be attached. To illustrate this concept, consider a simple example of a character in a game that has a `Moves` and a `Position` model.

When defining the models for this entity, it is important to note that we do not reference the entity directly. Instead, we simply provide two structs that the entity will contain.

```rust
#[derive(Models, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}

#[derive(Models, Drop, Serde)]
struct Health {
    #[key]
    player: ContractAddress,
    x: u32,
    y: u32
}
```

> ECS Theory: Plenty has been written on ECS systems, to go deeper read [ECS-FAQ](https://github.com/SanderMertens/ecs-faq)
