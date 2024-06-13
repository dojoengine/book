# World's API

The world exposes an interface which can be interacted with by any client. It is worth noting here that as a developer you don't deploy this world, it is deployed when you [migrate](/toolchain/sozo) your project as it is part of the `dojo-core` library.

Most of the functions of the world contract are called under the hood by the Dojo [macros](/framework/contracts/macros.md).

However, you can interact with the world contract directly if you need to for instance to use the `uuid` function as it is often useful to generate unique IDs for entities.

```rust
let game_id = world.uuid();
```

Here's the full [world's API](https://github.com/dojoengine/dojo/blob/main/crates/dojo-core/src/world.cairo):
```rust
#[starknet::interface]
trait IWorld<T> {
    fn metadata(self: @T, resource_id: felt252) -> ResourceMetadata;
    fn set_metadata(ref self: T, metadata: ResourceMetadata);
    fn model(self: @T, selector: felt252) -> (ClassHash, ContractAddress);
    fn register_model(ref self: T, class_hash: ClassHash);
    fn deploy_contract(
        ref self: T, salt: felt252, class_hash: ClassHash, init_calldata: Span<felt252>
    ) -> ContractAddress;
    fn upgrade_contract(ref self: T, address: ContractAddress, class_hash: ClassHash) -> ClassHash;
    fn uuid(ref self: T) -> usize;
    fn emit(self: @T, keys: Array<felt252>, values: Span<felt252>);
    fn entity(
        self: @T, model: felt252, keys: Span<felt252>, layout: dojo::database::introspect::Layout
    ) -> Span<felt252>;
    fn set_entity(
        ref self: T,
        model: felt252,
        keys: Span<felt252>,
        values: Span<felt252>,
        layout: dojo::database::introspect::Layout
    );
    fn delete_entity(
        ref self: T, model: felt252, keys: Span<felt252>, layout: dojo::database::introspect::Layout
    );
    fn base(self: @T) -> ClassHash;
    fn is_owner(self: @T, address: ContractAddress, resource: felt252) -> bool;
    fn grant_owner(ref self: T, address: ContractAddress, resource: felt252);
    fn revoke_owner(ref self: T, address: ContractAddress, resource: felt252);

    fn is_writer(self: @T, model: felt252, contract: ContractAddress) -> bool;
    fn grant_writer(ref self: T, model: felt252, contract: ContractAddress);
    fn revoke_writer(ref self: T, model: felt252, contract: ContractAddress);
}
```
