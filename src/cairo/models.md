## Models

> Models = Data

Models are structs that are annotated with the `#[derive(Model)]` attribute. Think of these models as a keypair store. The `#[key]` attribute is used to define the primary key of the model.

### Models are Structs

Models are defined as structs in Cairo. They can contain any number of fields, however it is best practice in ECS to have small isolated models. This promotes modularity and composability, allowing you to reuse models across multiple entity types.

```rust,ignore
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

#### The #[key] attribute

The `#[key]` attribute indicates to Dojo that this model is indexed by the `player` field. You need to define a key for each model, as this is how you query the model. However, you can create composite keys by defining multiple fields as keys. 

```rust,ignore
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Resource {
    #[key]
    player: ContractAddress,
    #[key]
    location: ContractAddress,
    balance: u8,
}
```

In this case you then would set the model with both the player and location fields:

```rust,ignore
set!(
    world,
    (
        Resource {
            player: caller,
            location: 12,
            balance: 10
        },
    )
);
```

#### Implementing Traits

Models can implement traits. This is useful for defining common functionality across models. For example, you may want to define a `Position` model that implements a `PositionTrait` trait. This trait could define functions such as `is_zero` and `is_equal` which could be used when accessing the model.

```rust,ignore
trait PositionTrait {
    fn is_zero(self: Position) -> bool;
    fn is_equal(self: Position, b: Position) -> bool;
}

impl PositionImpl of PositionTrait {
    fn is_zero(self: Position) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Position, b: Position) -> bool {
        self.x == b.x && self.y == b.y
    }
}
```

#### Custom Setting models

Suppose we need a place to keep a global value with the flexibility to modify it in the future. Take, for instance, a global `combat_cool_down` parameter that defines the duration required for an entity to be primed for another attack. To achieve this, we can craft a model dedicated to storing this value, while also allowing for its modification via a decentralized governance model.

To establish these models, you'd follow the usual creation method. However, when initializing them, employ a constant identifier, such as GAME_SETTINGS_ID.

```rust,ignore
const GAME_SETTINGS_ID: u32 = 9999999999999;

#[derive(model, Copy, Drop, Serde, SerdeLen)]
struct GameSettings {
    #[key]
    game_settings_id: u32,
    combat_cool_down: u32,
}
``` 

#### Types

Support model types:

-   `u8`
-   `u16`
-   `u32`
-   `u64`
-   `u128`
-   `u256`
-   `ContractAddress`

It is currently not possible to use Arrays.


### In practice with modularity in mind

Consider a tangible analogy: Humans and Goblins. While they possess intrinsic differences, they share common traits, such as having a position and health. However, humans possess an additional model. Furthermore, we introduce a Counter model, a distinct feature that tallies the numbers of humans and goblins.

```rust,ignore
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Potions {
    #[key]
    entity_id: u32,
    quantity: u8,
}

#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Health {
    #[key]
    entity_id: u32,
    health: u8,
}

#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Position {
    #[key]
    entity_id: u32,
    x: u32,
    y: u32
}

// Special counter model
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Counter {
    #[key]
    counter: u32,
    goblin_count: u32,
    human_count: u32,
}
```

So the Human will have a `Potions`, `Health` and `Position` model, and the Goblin will have a `Health` and `Position` model. By doing we save having to create Health and Position models for each entity type.

So then a system would look like this:

```rust,ignore
#[system]
mod spawnHuman {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::models::Position;
    use dojo_examples::models::Health;
    use dojo_examples::models::Potions;
    use dojo_examples::models::Counter;

    // we can set the counter value as a const, then query it easily! This pattern is useful for settins.
    const COUNTER_ID: u32 = 9999999999999;

    fn execute(ctx: Context, entity_id: u32) {

        let counter = get!(world, COUNTER_ID, (Counter));

        let human_count = counter.human_count + 1;
        let goblin_count = counter.goblin_count + 1;

        // spawn a human
        set!(
            world,
            (
                Health {
                    entity_id: human_count, health: 100
                    }, 
                Position {
                    entity_id: human_count, x: position.x + 10, y: position.y + 10,
                    }, 
                Potions {
                    entity_id: human_count, quantity: 10
                    
                },
            )
        );

        // spawn a goblin
        set!(
            world,
            (
                Health {
                    entity_id: goblin_count, health: 100
                    }, 
                Position {
                    entity_id: goblin_count, x: position.x + 10, y: position.y + 10,
                    },
            )
        );

        // increment the counter
        set!(
            world,
            (
                Counter {
                    counter: COUNTER_ID, human_count: human_count, goblin_count: goblin_count
                },
            )
        );
        
        return ();
    }
}
```

> A complete example can be found in the [Dojo Starter](https://github.com/dojoengine/dojo-starter)