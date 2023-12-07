## Testing

Testing is a crucial part of any software development process. Dojo provides a testing framework that allows you to write tests for your smart contracts. Since Dojo uses a custom compiler, you need to use `sozo` to test your contracts.

From your project directory, simply:

```shell
sozo test
```

This will search for all tests within your project and run them.

### Writing Unit Tests

It is best practise to include unit tests in the same file as the Model/System you are writing.

Lets show a `model` test example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`models.cairo`

```rust,ignore

...//rest of code

#[cfg(test)]
mod tests {
    use super::{Position, Vec2, Vec2Trait};

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_zero() {
        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    }

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }
}
```

In this test we are testing the `is_zero` and `is_equal` functions of the `Position` model. It is good practise to test all functions of your models.

### Writing Integration Tests

Integration tests are e2e tests that test the entire system. You can write integration tests for your world by creating a `tests` directory in your project root. Then create a file for each integration test you want to write.

This is the example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`move.cairo`

```rust,ignore
#[cfg(test)]
mod tests {
    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo_examples::models::{position, moves};
    use dojo_examples::models::{Position, Moves, Direction};

    use super::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    // helper setup function
    // reusable function for tests
    fn setup_world() -> IActionsDispatcher {
        // components
        let mut models = array![position::TEST_CLASS_HASH, moves::TEST_CLASS_HASH];

         // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        actions_system
    }


    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        let actions_system = setup_world();

         // System calls
        actions_system.spawn();
        actions_system.move(Direction::Right(()));

        // check moves
        let moves = get!(world, caller, (Moves));
        assert(moves.remaining == 99, 'moves is wrong');

        // get new_position
        let new_position = get!(world, caller, Position);

        // check new position x
        assert(new_position.vec.x == 11, 'position x is wrong');

        // check new position y
        assert(new_position.vec.y == 10, 'position y is wrong');
    }
}
```

#### Useful Dojo Test Functions

`spawn_test_world(models)` - This function will create a test world with the models and systems you pass in. It will also deploy the world and register the models and systems.
