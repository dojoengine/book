# Systems

Systems represent functions that operate on the world state. They take input from the user, retrieve the current state from the world, compute a state transition, and apply it. Each system has a single entry point, the execute function. To streamline interaction with the world, systems can utilize 
commands.

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

