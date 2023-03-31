# World

The world functions as a central system kernel, serving as the foundation for initiating and resolving all interactions. Within this kernel, contracts are deployed, registered, and executed, streamlining the process for downstream systems by enabling them to engage with a single contract rather than managing hundreds.

```rust
trait World {
    // Event emitted when a record is set in the store.
    #[event]
    fn StoreSetRecord(table_id: felt252, key: Span<felt252>, value: Span<felt252>) {}

    // Event emitted when a field is set in the store.
    #[event]
    fn StoreSetField(table_id: felt252, key: Span<felt252>, offset: u8, value: Span<felt252>) {}

    // Event emitted when a component is registered.
    #[event]
    fn ComponentRegistered(name: felt252, class_hash: ClassHash) {}

    // Event emitted when a system is registered.
    #[event]
    fn SystemRegistered(name: felt252, class_hash: ClassHash) {}

    // Returns a globally unique identifier.
    #[view]
    fn uuid() -> felt252;

    // Returns a globally unique identifier.
    #[view]
    fn get(component: felt252, key: StorageKey, offset: u8, length: usize) -> Span<felt252>;

    // Returns all entities that contain the component.
    #[view]
    fn entities(component: felt252, partition: felt252) -> Array<StorageKey>;

    // Sets a components value.
    #[external]
    fn set(component: felt252, key: StorageKey, offset: u8, value: Span<felt252>);

    // Registers a new component.
    #[external]
    fn register_component(name: felt252, class_hash: ClassHash);

    // Registers a new system.
    #[external]
    fn register_system(name: felt252, class_hash: ClassHash);
}
```
