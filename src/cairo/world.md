> **To think about:** Consider Autonomous Worlds as sovereign blockchains residing within another blockchain - a nested blockchain, so to speak. Just as you can deploy contracts onto Ethereum to enhance its functionality, you can similarly introduce systems into the World contract to enrich its features. While anyone can contribute to the World, akin to Ethereum, authorization is required to interact with model state. There is a dedicated topic to [Authorisation](./authorization.md).

## The World Contract

The world contract functions as a central store for the world models and systems. Every contract that interacts with the world, must use the world contract address as the first parameter. This is how the world contract is able to manage the state of the world.

Although we suggest strongly to structure your world around an ECS pattern you are not required to do so. You can simply use the dojo-models as a keypair store along with the supporting infrastructure.

> NOTE: Dojo core abstracts the world contract away, you do not write it and it is not meant to be altered when building a world. However, it's important to understand how it works and how it interacts with the rest of the system.

### The `uuid()` command

It is often useful to generate unique IDs for entities. The `uuid()` fn can be used to generate a unique ID.

Use it like this:

```rust,ignore
let game_id = world.uuid();
```

### Full World API

The world exposes an interface which can be interacted with by any client.

```rust,ignore
// World interface
#[starknet::interface]
trait IWorld<T> {
    fn metadata_uri(self: @T, resource: felt252) -> Span<felt252>;
    fn set_metadata_uri(ref self: T, resource: felt252, uri: Span<felt252>);
    fn model(self: @T, name: felt252) -> ClassHash;
    fn register_model(ref self: T, class_hash: ClassHash);
    fn deploy_contract(ref self: T, salt: felt252, class_hash: ClassHash) -> ContractAddress;
    fn upgrade_contract(ref self: T, address: ContractAddress, class_hash: ClassHash) -> ClassHash;
    fn uuid(ref self: T) -> usize;
    fn emit(self: @T, keys: Array<felt252>, values: Span<felt252>);
    fn entity(
        self: @T, model: felt252, keys: Span<felt252>, offset: u8, length: usize, layout: Span<u8>
    ) -> Span<felt252>;
    fn set_entity(
        ref self: T,
        model: felt252,
        keys: Span<felt252>,
        offset: u8,
        values: Span<felt252>,
        layout: Span<u8>
    );
    fn entities(
        self: @T,
        model: felt252,
        index: Option<felt252>,
        values: Span<felt252>,
        values_length: usize,
        values_layout: Span<u8>
    ) -> (Span<felt252>, Span<Span<felt252>>);
    fn entity_ids(self: @T, model: felt252) -> Span<felt252>;
    fn set_executor(ref self: T, contract_address: ContractAddress);
    fn executor(self: @T) -> ContractAddress;
    fn base(self: @T) -> ClassHash;
    fn delete_entity(ref self: T, model: felt252, keys: Span<felt252>, layout: Span<u8>);
    fn is_owner(self: @T, address: ContractAddress, resource: felt252) -> bool;
    fn grant_owner(ref self: T, address: ContractAddress, resource: felt252);
    fn revoke_owner(ref self: T, address: ContractAddress, resource: felt252);

    fn is_writer(self: @T, model: felt252, system: ContractAddress) -> bool;
    fn grant_writer(ref self: T, model: felt252, system: ContractAddress);
    fn revoke_writer(ref self: T, model: felt252, system: ContractAddress);
}
```
