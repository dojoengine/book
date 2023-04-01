# Entities

A common misconception for those new to ECS systems is the way entities exist within the World. Different ECS systems handle entities in various ways. In Dojo, entities are treated as a primary key value within the world, to which components can be attached. To illustrate this concept, consider a simple example of a character in a game that has a position and a health component.

When defining the components for this entity, it is important to note that we do not reference the entity directly. Instead, we simply provide two structs that the entity will contain. This approach emphasizes the flexibility and composability of the ECS system, allowing for the easy creation and modification of entities with various combinations of components.

```rust
#[derive(Component)]
struct Position {
    x: u32,
    y: u32
}

#[derive(Component)]
struct Health {
    value: u32,
}

```

Now, let's create a `SpawnSystem` for the character. It is important to note that we have not explicitly defined an Entity anywhere. Instead, the system will assign a primary key ID to the entity when this system is executed. 

```rust
// The most basic system that creates a new player entity with a given name and 100 health.

#[system]
mod SpawnSystem {
    // The execute function takes a name as input and creates a new player entity with the specified name and 100 health.
    fn execute(name: String) {
        // Using a command generate a new player ID and create the player entity with the Health and Name components.
        let player_id = commands::create((
            Health::new(100_u8),
            Name::new(name),
        ));
        // The system has no return value.
        return ();
    }
}
```

Finally, lets move the character with the `MoveSystem`.

```rust
#[system]
mod MoveSystem {
    fn execute(player_id: usize) {
        let player = commands<(Health, Name)>::get(player_id);
        let positions = commands<(Position, Health)>::entities();

        // @NOTE: Loops are not available in Cairo 1.0 yet.
        for (position, health) in positions {
            let is_zero = position.is_zero();
        }
        return ();
    }
}
```