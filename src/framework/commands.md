## Commands

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
