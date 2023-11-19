## Testing

Testing is a crucial part of any software development process. Dojo provides a testing framework that allows you to write tests for your smart contracts. Since Dojo uses a custom compiler, you need to use `sozo` to test your contracts.

From your project directory, simply:

```shell
sozo test
```

This will search for all tests within your project and run them.


### Writing Unit Tests

It is best practise to include unit tests in the same file as the Component/System you are writing.

Lets show a `Component` test example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`components.cairo`
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

In this test we are testing the `is_zero` and `is_equal` functions of the `Position` component. It is good practice to test all functions of your components.


### Writing Integration Tests

Integration tests are e2e tests that test the entire system. You can write integration tests for your world by creating a `tests` directory in your project root. Then create a file for each integration test you want to write.

This is the example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`systems.cairo`
```rust,ignore
#[cfg(test)]
mod tests {
    use core::traits::Into;
    use array::ArrayTrait;

    use dojo::world::IWorldDispatcherTrait;

    use dojo::test_utils::spawn_test_world;

    use dojo_examples::components::position;
    use dojo_examples::components::Position;
    use dojo_examples::components::moves;
    use dojo_examples::components::Moves;
    use dojo_examples::systems::spawn;
    use dojo_examples::systems::move;

    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components = array::ArrayTrait::new();
        components.append(position::TEST_CLASS_HASH);
        components.append(moves::TEST_CLASS_HASH);

        // systems
        let mut systems = array::ArrayTrait::new();
        systems.append(spawn::TEST_CLASS_HASH);
        systems.append(move::TEST_CLASS_HASH);

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let spawn_call_data = array::ArrayTrait::new();
        world.execute('spawn', spawn_call_data);

        let mut move_calldata = array::ArrayTrait::new();
        move_calldata.append(move::Direction::Right(()).into());
        world.execute('move', move_calldata);
        let mut keys = array::ArrayTrait::new();
        keys.append(caller.into());

        let moves = world.entity('Moves', keys.span(), 0, dojo::SerdeLen::<Moves>::len());
        assert(*moves[0] == 9, 'moves is wrong');
        let new_position = world
            .entity('Position', keys.span(), 0, dojo::SerdeLen::<Position>::len());
        assert(*new_position[0] == 11, 'position x is wrong');
        assert(*new_position[1] == 10, 'position y is wrong');
    }
}
```

#### Useful Dojo Test Functions

`spawn_test_world(components, systems)` - This function will create a test world with the components and systems you pass in. It will also deploy the world and register the components and systems.
