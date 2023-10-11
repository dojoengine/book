## Testing

Testing is a crucial part of any software development process. Dojo provides a testing framework that allows you to write tests for your smart contracts. Since Dojo uses a custom compiler, you need to use `sozo` to test your contracts.

From your project directory, simply:

```shell
sozo test
```

This will search for all tests within your project and run them.


### Writing Unit Tests

It is best practise to include unit tests in the same file as the model/System you are writing.

Lets show a `model` test example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`models.cairo`
```rust,ignore

...rest of code

#[cfg(test)]
mod tests {
    use debug::PrintTrait;
    use super::{Position, PositionTrait};

    #[test]
    #[available_gas(100000)]
    fn test_position_is_zero() {
        let player = starknet::contract_address_const::<0x0>();
        assert(PositionTrait::is_zero(Position { player, x: 0, y: 0 }), 'not zero');
    }

    #[test]
    #[available_gas(100000)]
    fn test_position_is_equal() {
        let player = starknet::contract_address_const::<0x0>();
        let position = Position { player, x: 420, y: 0 };
        position.print();
        assert(PositionTrait::is_equal(position, Position { player, x: 420, y: 0 }), 'not equal');
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
    
    use super::{
        IPlayerActionsDispatcher, IPlayerActionsDispatcherTrait,
        player_actions_external as player_actions
    };

    //OFFSET is defined in constants.cairo
    use dojo_examples::constants::OFFSET;

    //{Event and Moved are defined in events.cairo}
    #[event]
    use dojo_examples::events::{Event, Moved};

    // helper setup function
    // reusable function for tests
    fn setup_world() -> IPlayerActionsDispatcher {
        // components
        let mut models = array![position::TEST_CLASS_HASH, moves::TEST_CLASS_HASH];

         // deploy world with models
        let world = spawn_test_world(models);
        
        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', player_actions::TEST_CLASS_HASH.try_into().unwrap());
        let player_actions_system = IPlayerActionsDispatcher { contract_address };

        player_actions_system
    }


    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        let player_actions_system = setup_world();
        
         // System calls
        player_actions_system.spawn();
        player_actions_system.move(Direction::Right(()));

        // check moves
        let moves = get!(world, caller, (Moves));
        assert(moves.remaining == 99, 'moves is wrong');

        // check position
        let new_position = get!(world, caller, (Position));
        assert(new_position.x == (OFFSET + 1).try_into().unwrap(), 'position x is wrong');
        assert(new_position.y == OFFSET.try_into().unwrap(), 'position y is wrong');
    }
}
```

#### Useful Dojo Test Functions

`spawn_test_world(models, systems)` - This function will create a test world with the models and systems you pass in. It will also deploy the world and register the models and systems.
