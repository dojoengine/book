# Storage

The `StorageKey` struct in Dojo smart contracts is designed to organize and access data within a Worlds storage. It consists of two main fields, `partition` and `keys`, which represent a storage section and its identifiers, respectively.

## Structure
The StorageKey struct has two main fields:

```rust
partition: A felt252 number representing a section in the contract's storage.
keys: An array of felt252 numbers used as identifiers within the storage.
```

## Traits

`StorageKeyTrait`
This trait provides methods for creating and interacting with StorageKey:

```rust
new(partition: felt252, keys: Array<felt252>) -> StorageKey: Constructs a new StorageKey.
new_from_id(id: felt252) -> StorageKey: Constructs a new StorageKey from an identifier.
id(self: @StorageKey) -> felt252: Returns the identifier of the StorageKey.
table(self: @StorageKey, component: felt252) -> felt252: Returns the table identifier in the contract's storage.
keys(self: @StorageKey) -> Span<felt252>: Returns a span of the keys.
```

## Utility Functions

```rust
inner_id(state: felt252, keys: Span<felt252>, remain: usize) -> felt252: 
```
Computes a hash by recursively applying the Pedersen hash function on the provided keys array. This function is used by the id method to calculate a unique identifier for the storage key.

## Conversion Traits
Several conversion traits are implemented for the StorageKey struct to allow for easier integration with the rest of the contract code:

```rust
ContractAddressIntoStorageKey: Converts a starknet::ContractAddress into a StorageKey.
Felt252IntoStorageKey: Converts a felt252 number into a StorageKey.
TupleSize1IntoStorageKey: Converts a tuple with a single felt252 element into a StorageKey.
TupleSize2IntoStorageKey: Converts a tuple with two felt252 elements into a StorageKey.
TupleSize3IntoStorageKey: Converts a tuple with three felt252 elements into a StorageKey.
```
