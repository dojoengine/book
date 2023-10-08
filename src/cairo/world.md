> **To think about:** Consider Autonomous Worlds as sovereign blockchains residing within another blockchain - a nested blockchain, so to speak. Just as you can deploy contracts onto Ethereum to enhance its functionality, you can similarly introduce systems into the World contract to enrich its features. While anyone can contribute to the World, akin to Ethereum, authorization is required to interact with model state. There is a dedicated topic to [Authorisation](./authorization.md).

## The World Contract

The world contract functions as a central store for the world models and systems. Every contract that interacts with the world, must use the world contract address as the first parameter. This is how the world contract is able to manage the state of the world.

Although we suggest strongly to structure your world around an ECS pattern you are not required to do so. You can simply use the dojo-models as a keypair store along with the supporting infrastructure.

> Dojo core abstracts the world contract away, you do not write it and it is not meant to be altered when building a world. However, it's important to understand how it works and how it interacts with the rest of the system.

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
    fn component(self: @T, name: felt252) -> ClassHash;
    fn register_component(ref self: T, class_hash: ClassHash);
    fn system(self: @T, name: felt252) -> ClassHash;
    fn register_system(ref self: T, class_hash: ClassHash);
    fn uuid(ref self: T) -> usize;
    fn emit(self: @T, keys: Array<felt252>, values: Span<felt252>);
    fn entity(
        self: @T, component: felt252, keys: Span<felt252>, offset: u8, length: usize
    ) -> Span<felt252>;
    fn set_entity(
        ref self: T, component: felt252, keys: Span<felt252>, offset: u8, value: Span<felt252>
    );
    fn entities(
        self: @T, component: felt252, index: felt252, length: usize
    ) -> (Span<felt252>, Span<Span<felt252>>);
    fn set_executor(ref self: T, contract_address: ContractAddress);
    fn executor(self: @T) -> ContractAddress;
    fn delete_entity(ref self: T, component: felt252, keys: Span<felt252>);
    fn origin(self: @T) -> ContractAddress;

    fn is_owner(self: @T, account: ContractAddress, target: felt252) -> bool;
    fn grant_owner(ref self: T, account: ContractAddress, target: felt252);
    fn revoke_owner(ref self: T, account: ContractAddress, target: felt252);

    fn is_writer(self: @T, component: felt252, system: felt252) -> bool;
    fn grant_writer(ref self: T, component: felt252, system: felt252);
    fn revoke_writer(ref self: T, component: felt252, system: felt252);
}
```