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
        assert(PositionTrait::is_equal(position, Position { player, x: 420, y: 0 }), 'not equal');
    }
}

```

In this test we are testing the `is_zero` and `is_equal` functions of the `Position` component. It is good practise to test all functions of your components.


### Writing Integration Tests

Integration tests are e2e tests that test the entire system. You can write integration tests for your world by creating a `tests` directory in your project root. Then create a file for each integration test you want to write.

This is the example from the [dojo-starter](https://github.com/dojoengine/dojo-starter):

`move.cairo`
```rust,ignore
#[cfg(test)]
mod tests {
    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::test_utils::spawn_test_world;
    use dojo_examples::components::{position, Position};
    use dojo_examples::components::{moves, Moves};
    use dojo_examples::systems::spawn;
    use dojo_examples::systems::move;

    //OFFSET is defined in constants.cairo
    use dojo_examples::constants::OFFSET;

    //{Event and Moved are defined in events.cairo}
    #[event]
    use dojo_examples::events::{Event, Moved};

    // helper setup function
    // reusable function for tests
    fn setup_world() -> IWorldDispatcher {
        // components
        let mut components = array![position::TEST_CLASS_HASH, moves::TEST_CLASS_HASH];

        // systems
        let mut systems = array![spawn::TEST_CLASS_HASH, move::TEST_CLASS_HASH];

        // deploy executor, world and register components/systems
        spawn_test_world(components, systems)
    }


    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        let world = setup_world();

        // spawn entity
        world.execute('spawn', array![]);

        // move entity
        world.execute('move', array![move::Direction::Right(()).into()]);

        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // check moves
        let moves = get!(world, caller, (Moves));
        assert(moves.remaining == 99, 'moves is wrong');

        // check position
        let new_position = get!(world, caller, (Position));
        assert(new_position.x == (OFFSET + 1).try_into().unwrap(), 'position x is wrong');
        assert(new_position.y == OFFSET.try_into().unwrap(), 'position y is wrong');

        //check events
        // unpop world creation events
        let mut events_to_unpop = 1; // WorldSpawned
        events_to_unpop += 2; // 2x ComponentRegistered
        events_to_unpop += 2; // 2x SystemRegistered
        loop {
            if events_to_unpop == 0 {
                break;
            };

            starknet::testing::pop_log_raw(world.contract_address);
            events_to_unpop -= 1;
        };

        starknet::testing::pop_log_raw(world.contract_address); // unpop StoreSetRecord Moves
        starknet::testing::pop_log_raw(world.contract_address); // unpop StoreSetRecord Position
        // player spawns at x:OFFSET, y:OFFSET
        assert(
            @starknet::testing::pop_log(world.contract_address)
                .unwrap() == @Event::Moved(
                    Moved {
                        player: caller, x: OFFSET.try_into().unwrap(), y: OFFSET.try_into().unwrap()
                    }
                ),
            'invalid Moved event 0'
        );

        starknet::testing::pop_log_raw(world.contract_address); // unpop StoreSetRecord Moves
        starknet::testing::pop_log_raw(world.contract_address); // unpop StoreSetRecord Position
        // player move at x:OFFSET+1, y:OFFSET
        assert(
            @starknet::testing::pop_log(world.contract_address)
                .unwrap() == @Event::Moved(
                    Moved {
                        player: caller,
                        x: (OFFSET + 1).try_into().unwrap(),
                        y: OFFSET.try_into().unwrap()
                    }
                ),
            'invalid Moved event 1'
        );
}
```

#### Useful Dojo Test Functions

`spawn_test_world(components, systems)` - This function will create a test world with the components and systems you pass in. It will also deploy the world and register the components and systems.
