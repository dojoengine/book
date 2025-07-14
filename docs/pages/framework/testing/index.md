---
title: Testing in Dojo
description: Learn how to write and run unit tests and integration tests for your Dojo smart contracts and models.
---

# Testing

Testing is a crucial part of any software development process. Dojo provides a testing framework that allows you to write tests for your smart contracts. Since Dojo uses a custom compiler, you need to use [Sozo](/toolchain/sozo/) to test your contracts.

From your project directory, simply:

```shell
sozo test
```

This will search for all tests within your project and run them.

## Writing Unit Tests

It is best practise to include unit tests in the same file as the [model](/framework/models/) / [system](/framework/world/systems/) you are writing.

Lets show a `model` test example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

```rust
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

In this test we are testing the `is_zero` and `is_equal` functions of the `Position` model. It is good practise to test all functions of your models.

## Writing Integration Tests

Integration tests are e2e tests that test the entire [system](/framework/world/systems/). You can write integration tests for your world by creating a `tests` directory in your project root. Then create a file for each integration test you want to write.

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

<!-- TODO update -->

## Useful Dojo Test Functions

- [`spawn_test_world`](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/test_utils.cairo#L43) - This function will deploy a new world and register the models passed in.
- [`deploy_contract`](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/test_utils.cairo#L24) - This function will deploy a new contract and return the contract address.
