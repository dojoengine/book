# Events emitted by the world

Anytime a state change occurs, the world emits an event to notify the [Torii indexer](/toolchain/torii) about the change.

Here's a breakdown of the events emitted by the world:

```rust
enum Event {
    WorldSpawned: WorldSpawned,
    ContractDeployed: ContractDeployed,
    ContractUpgraded: ContractUpgraded,
    WorldUpgraded: WorldUpgraded,
    MetadataUpdate: MetadataUpdate,
    ModelRegistered: ModelRegistered,
    StoreSetRecord: StoreSetRecord,
    StoreDelRecord: StoreDelRecord,
    WriterUpdated: WriterUpdated,
    OwnerUpdated: OwnerUpdated,
    ConfigEvent: Config::Event,
    StateUpdated: StateUpdated
}
```

## WorldSpawned

The `WorldSpawned` event is emitted when the world is spawned (deployed).

## WorldUpgraded

The `WorldUpgraded` event is emitted when the world is upgraded to a new class hash (the address of the world remains the same).

## ContractDeployed

The `ContractDeployed` event is emitted when a Dojo contract is deployed. The deployment is managed by the world itself.

## ContractUpgraded

The `ContractUpgraded` event is emitted when a Dojo contract is upgraded to a new class hash (the address of such Dojo contract remains the same).

## MetadataUpdate

The `MetadataUpdate` event is emitted when the metadata of a resource (world, Dojo contract, Dojo model) is updated.

## ModelRegistered

The `ModelRegistered` event is emitted when a model is registered in the world, which contains all the information about the model including it's type layout.

## StoreSetRecord

The `StoreSetRecord` event is emitted when a model is updated in the world's store using the `set!` [macro](/framework/contracts/macros.md).

## StoreDelRecord

The `StoreDelRecord` event is emitted when a model is deleted from the world's store using the `del!` [macro](/framework/contracts/macros.md).

## WriterUpdated

The `WriterUpdated` event is emitted when the writer permission on a model has changed.

## OwnerUpdated

The `OwnerUpdated` event is emitted when the owner permission on a model has changed.

## ConfigEvent

The `ConfigEvent` event is emitted when the configuration related to Saya settlement is updated.

## StateUpdated

The `StateUpdated` event is emitted when the state from a shard execution is settled on the world after proof verification using Saya.
