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


### Commands

Commands in Dojo are generalized functions that are expanded at compile time to facilitate system execution. They provide a convenient way for systems to interact with the world state by abstracting common operations, such as retrieving or updating components, and generating unique IDs. By leveraging these commands, developers can streamline their system implementations and improve code readability.

Understanding commands is key to understanding Dojo. You will leverage them heavily within the systems you design.

```rust
// Retrieve a unique ID from the world, which is helpful when creating a new entity.
// This function returns a globally unique identifier that can be used as an entity ID.
fn commands::uuid() -> felt252;

// Update an existing entity by setting its components with the provided values.
// This function takes a storage key representing the entity and a generic type T for the components to be updated.
fn commands::set(storage_key: StorageKey, components: T);

// Retrieve the components of a specific type T for an entity identified by the storage key.
// This function returns the components as an instance of the generic type T.
fn commands::<T>::get(storage_key: StorageKey) -> T;

// Retrieve all entity IDs that have components matching the provided type T.
// This function returns an array of entity IDs (felt252) containing the specified components.
fn commands::<T>::entities() -> Array<felt252>;
```
