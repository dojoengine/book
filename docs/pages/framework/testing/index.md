---
title: Testing in Dojo
description: Learn how to write and run unit tests and integration tests for your Dojo smart contracts and models.
---

# Testing

Testing is a crucial part of any software development process.
Dojo provides a testing framework that allows you to write tests for your smart contracts.
Since Dojo uses a custom compiler, you need to use [Sozo](/toolchain/sozo/) to test your contracts.

From your project directory, run:

```bash
sozo test
```

This will search for all tests within your project and run them.

## Writing Unit Tests

It is best practise to include unit tests in the same file as the [model](/framework/models/) / [system](/framework/systems/) you are writing.
Lets show a `model` test example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

```cairo
// models.cairo

// ...

#[cfg(test)]
mod tests {
    use super::{Position, Vec2, Vec2Trait};

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_zero() {
        assert!(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), "not zero");
    }

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert!(position.is_equal(Vec2 { x: 420, y: 0 }), "not equal");
    }
}
```

In this test we are testing the `is_zero` and `is_equal` functions of the `Position` model.

:::tip
It is good practise to test all functions of your models.
:::

## Writing Integration Tests

Integration tests are e2e tests that test the entire [system](/framework/systems/).
You can write integration tests for your world by creating a `tests` directory in your project root.
Then create a file for each integration test you want to write.

This is the example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

```rust
// move.cairo

#[cfg(test)]
mod tests {
    use dojo::model::{ModelStorage, ModelValueStorage, ModelStorageTest};
    use dojo::world::WorldStorageTrait;
    use dojo_cairo_test::{spawn_test_world, NamespaceDef, TestResource, ContractDefTrait};

    use dojo_starter::systems::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};
    use dojo_starter::models::{Position, m_Position, Moves, m_Moves, Direction};

    fn namespace_def() -> NamespaceDef {
        NamespaceDef {
            namespace: "dojo_starter", resources: [
                TestResource::Model(m_Position::TEST_CLASS_HASH),
                TestResource::Model(m_Moves::TEST_CLASS_HASH),
                TestResource::Event(actions::e_Moved::TEST_CLASS_HASH),
                TestResource::Contract(actions::TEST_CLASS_HASH)
            ].span()
        }
    }

    fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"dojo_starter", @"actions")
                .with_writer_of([dojo::utils::bytearray_hash(@"dojo_starter")].span())
        ].span()
    }

    #[test]
    fn test_world_test_set() {
        // Initialize test environment
        let caller = starknet::contract_address_const::<0x0>();
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());

        // Test initial position
        let mut position: Position = world.read_model(caller);
        assert(position.vec.x == 0 && position.vec.y == 0, "initial position wrong");

        // Test write_model_test
        position.vec.x = 122;
        position.vec.y = 88;

        world.write_model_test(@position);

        let mut position: Position = world.read_model(caller);
        assert(position.vec.y == 88, "write_value_from_id failed");

        // Test model deletion
        world.erase_model(@position);
        let position: Position = world.read_model(caller);
        assert(position.vec.x == 0 && position.vec.y == 0, "erase_model failed");
    }

    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        let caller = starknet::contract_address_const::<0x0>();

        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        // Ensures permissions and initializations are synced.
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"actions").unwrap();
        let actions_system = IActionsDispatcher { contract_address };

        actions_system.spawn();
        let initial_moves: Moves = world.read_model(caller);
        let initial_position: Position = world.read_model(caller);

        assert(
            initial_position.vec.x == 10 && initial_position.vec.y == 10, "wrong initial position"
        );

        actions_system.move(Direction::Right(()));

        let moves: Moves = world.read_model(caller);
        let right_dir_felt: felt252 = Direction::Right(()).into();

        assert(moves.remaining == initial_moves.remaining - 1, "moves is wrong");
        assert(moves.last_direction.into() == right_dir_felt, "last direction is wrong");

        let new_position: Position = world.read_model(caller);
        assert(new_position.vec.x == initial_position.vec.x + 1, "position x is wrong");
        assert(new_position.vec.y == initial_position.vec.y, "position y is wrong");
    }
}
```

## Testing Framework Details

Currently, Dojo is still only supporting the `cairo-test` test runner.
Soon `starknet-foundry` will be unlocked once `scarb` and `cairo-lang` merge some missing features.

In the meantime, here's how you can test your contracts.
As we've seen, resources like contracts, models and events are namespaced, so you have to specify the namespace you want to use when testing.

Before starting to test, here's the flow that `Sozo` follows to migrate a world:

1. First of all, `Sozo` will migrate the world itself.
2. Then, `Sozo` will register all the resources. Registering the resources means that all models/events/contracts will be declared and deployed onchain. None of those contracts are using constructor calldata, hence `Sozo` can deploy them without prior inputs. All resources are registered to the world and deployed through the world contract.
3. Once all the resources are registered, `Sozo` will synchronize the permissions that are given in the `dojo_<profile>.json` file.
4. Finally, `Sozo` will initialize all the contracts. Since the contracts initialization function is very likely to interact with models, at this point all permissions are synchronized and the world is ready to use.

This is important to keep this in mind, since the testing flow must be similar to the migration flow.

## Profile Configuration in Testing

When working with tests, you can leverage different [profiles](/framework/configuration/) for different testing scenarios.
This allows you to configure specific settings for your test environment, including different model configurations, permissions, and initialization data.

Test profiles can be defined in your project configuration and selected when running tests to match your specific testing needs.

Now, let's move on to testing.
First, you have to use the `dojo_cairo_test` crate to use dojo utilities in your tests.

```toml
# Scarb.toml
[dev-dependencies]
dojo_cairo_test = { git = "https://github.com/dojoengine/dojo.git", tag = "v1.0.0" }
```

To define some namespace configurations you will use the [NamespaceDef](https://github.com/dojoengine/dojo/blob/ab081b9fb8444d84aecaba848126f8c64db45eb8/crates/dojo/core-cairo-test/src/world.cairo#L51) and associated definitions:

```rust
use dojo::model::{ModelStorage, ModelValueStorage, ModelStorageTest};
use dojo::world::WorldStorageTrait;
use dojo_cairo_test::{
    spawn_test_world, NamespaceDef, TestResource, ContractDefTrait,
    ContractDef, WorldStorageTestTrait
};

// First to note here, Dojo is generating contracts for each model
// and event.
// The name of this generated contract is always the resource name,
// prefixed by "m_" or "e_" respectively.
use dojo_starter::models::{
    Position, m_Position, Moves, m_Moves, Direction
};
```

Then, for each resource, you can add them to a specific namespace.
Once again, the same model or event type can be registered multiple times into different namespaces, which will yield different resources.

```rust
// Here we map the resource to the namespace "ns".
// They will be used to register the resources to the world.
fn namespace_def() -> NamespaceDef {
    let ndef = NamespaceDef {
        namespace: "ns", resources: [
            TestResource::Model(m_Position::TEST_CLASS_HASH),
            TestResource::Model(m_Moves::TEST_CLASS_HASH),
            TestResource::Event(actions::e_Moved::TEST_CLASS_HASH),
            TestResource::Contract(actions::TEST_CLASS_HASH),
        ].span()
    };

    ndef
}
```

Let's then prepare some contracts definitions [defined here](https://github.com/dojoengine/dojo/blob/ab081b9fb8444d84aecaba848126f8c64db45eb8/crates/dojo/core-cairo-test/src/world.cairo#L57):

```rust
// Here, we have one contract, and we define at this step
// the permission of the contract and initialization data (if any).
fn contract_defs() -> Span<ContractDef> {
    [
        ContractDefTrait::new(@"ns", @"actions")
            .with_writer_of([dojo::utils::bytearray_hash(@"ns")].span())
            // .with_init_calldata
            // .with_owner_of
    ].span()
}
```

Once you have a namespace definition and contracts definitions, you can spawn a test world with it.
The function `spawn_test_world` will register all the resources and return a world instance we've seen previously.

```rust
#[test]
fn test_world_test_set() {
    let ndef = namespace_def();
    let mut world = spawn_test_world([ndef].span());

    // At this point, the resources are registered, but permissions
    // are not set and contracts are not initialized
    // (dojo_init has not be called).

    world.sync_perms_and_inits(contract_defs());

    // At this point, permissions are synchronized and
    // contracts are initialized.
}
```

By having the registration of the resources and the synchronization of the permissions/init separated, you can easily separate tests functions to setup the world at your will to test different scenarios.

As you remember, the resources are also permissioned.
In some occasions, you may want to interact with the world bypassing the permission check.
For this, you can use the `test_only` world:

```rust
let m = MyModel { id: 1, value: 123 };
// Bypass any permission check, and will write into the world's storage.
world.write_model_test(@m);
```

## Dojo Test Utilities

Dojo includes some helpful utilities to make testing easier:

- [`spawn_test_world`](https://github.com/dojoengine/dojo/blob/main/crates/dojo/dojo-snf-test/src/world.cairo#L140) - Deploy a new world and register the models passed in.

- [`deploy_contract`](https://github.com/dojoengine/dojo/blob/main/crates/dojo/dojo-snf-test/src/world.cairo#L106) - Deploy a new contract and return the contract address.
