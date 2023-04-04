# Components

Components serve as the foundation for defining the world's structure, encapsulating state for systems to mutate. For instance, a Position component can be implemented as a struct, exposing `is_zero` and `is_equal` methods. Dojo compiles these components into contracts that can be declared and installed within a world, enabling the creation of diverse and customizable environments.

When designing a world's components, it is crucial to carefully consider the abstractions you create, always keeping composability in mind.

Suppose you plan to create two entities that move around the map and are fundamentally different from each other, except for the fact that they both exist within the world. In this case, you could create a shared Position component for both entities. This demonstrates the power of the Entity Component System (ECS) abstraction: by writing a single component, you can reuse it across multiple diverse entities, promoting modularity and flexibility within your world design.

```rust
#[component]
struct Position {
    x: u32,
    y: u32
}

trait PositionTrait {
    fn is_equal(self: Position, b: Position) -> bool;
}

impl PositionImpl of PositionTrait {
    fn is_equal(self: Position, b: Position) -> bool {
        self.x == b.x & self.y == b.y
    }
}
```
