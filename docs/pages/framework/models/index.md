## Models

> Models = Data

**_TL;DR_**

- Models store structured data in your world.
- Models are Cairo structs with additional features.
- Models can implement traits.
- Use the `#[derive(Model)]` decorator to define them.
- Custom enums and types are supported.
- Define the primary key using the `#[key]` attribute.

### Models are Structs

Models are structs annotated with the `#[derive(Model)]` attribute. Consider these models as a key-value store, where the `#[key]` attribute is utilized to define the primary key. While models can contain any number of fields, adhering to best practices in Entity-Component-System (ECS) design involves maintaining small, isolated models.

This approach fosters modularity and composability, enabling you to reuse models across various entity types.

```rust
#[derive(Model, Copy, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```

#### The #[key] attribute

The `#[key]` attribute indicates to Dojo that this model is indexed by the `player` field. A field that is identified as a `#[key]` is not stored. It is used by the dojo database system to uniquely identify the storage location that contains your model.

You need to define at least one key for each model, as this is how you query the model. However, you can create composite keys by defining multiple fields as keys. If you define multiple keys, they must **all** be provided to query the model.

```rust
#[derive(Model, Copy, Drop, Serde)]
struct Resource {
    #[key]
    player: ContractAddress,
    #[key]
    location: ContractAddress,
    balance: u8,
}
```

In this case you then would set the model with both the player and location fields:

```rust
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

To retrieve a model with a composite key using the [get!](/framework/contracts/macros.md#the-get-command) command, you must provide a value for each key as follow:

```rust
let player = get_caller_address();
let location = 0x1234;

let resource = get!(world, (player, location), (Resource));
```

#### Implementing Traits

Models can implement traits. This is useful for defining common functionality across models. For example, you may want to define a `Position` model that implements a `PositionTrait` trait. This trait could define functions such as `is_zero` and `is_equal` which could be used when accessing the model.

```rust
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

```rust
const GAME_SETTINGS_ID: u32 = 9999999999999;

#[derive(model, Copy, Drop, Serde)]
struct GameSettings {
    #[key]
    game_settings_id: u32,
    combat_cool_down: u32,
}
```

#### Types

Support model types:

- `u8`
- `u16`
- `u32`
- `u64`
- `u128`
- `u256`
- `ContractAddress`
- Enums
- Custom Types

It is currently not possible to use Arrays.

#### Custom Types + Enums

For models containing complex types, it's crucial to implement the `SchemaIntrospection` trait.

Consider the model below:

```rust
struct Card {
    #[key]
    token_id: u256,
    /// The card's designated role.
    role: Roles,
}
```

For complex types, like `Roles` in the above example, you need to implement `SchemaIntrospection`. Here's how:

```rust
impl RolesSchemaIntrospectionImpl for SchemaIntrospection<Roles> {
    #[inline(always)]
    fn size() -> usize {
        1 // Represents the byte size of the enum.
    }

    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8); // Specifies the layout byte size;
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'Roles',
                attrs: array![].span(),
                children: array![
                    ('Goalkeeper', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Defender', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Midfielder', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Attacker', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                .span()
            }
        )
    }
}
```

### In practice with modularity in mind

Consider a tangible analogy: Humans and Goblins. While they possess intrinsic differences, they share common traits, such as having a position and health. However, humans possess an additional model. Furthermore, we introduce a Counter model, a distinct feature that tallies the numbers of humans and goblins.

```rust
#[derive(Model, Copy, Drop, Serde)]
struct Potions {
    #[key]
    entity_id: u32,
    quantity: u8,
}

#[derive(Model, Copy, Drop, Serde)]
struct Health {
    #[key]
    entity_id: u32,
    health: u8,
}

#[derive(Model, Copy, Drop, Serde)]
struct Position {
    #[key]
    entity_id: u32,
    x: u32,
    y: u32
}

// Special counter model
#[derive(Model, Copy, Drop, Serde)]
struct Counter {
    #[key]
    counter: u32,
    goblin_count: u32,
    human_count: u32,
}
```

So the Human will have a `Potions`, `Health` and `Position` model, and the Goblin will have a `Health` and `Position` model. By doing we save having to create Health and Position models for each entity type.

So then a contract would look like this:

```rust
#[dojo::contract]
mod spawnHuman {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::models::Position;
    use dojo_examples::models::Health;
    use dojo_examples::models::Potions;
    use dojo_examples::models::Counter;

    // we can set the counter value as a const, then query it easily! This pattern is useful for settings.
    const COUNTER_ID: u32 = 9999999999999;

    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl GoblinActionsImpl of IGoblinActions<ContractState> {
        fn goblin_actions(world: IWorldDispatcher, entity_id: u32) {
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
        }
    }
}
```

> A complete example can be found in the [Dojo Starter](https://github.com/dojoengine/dojo-starter)

# Upgrading Models and Data Migration

When upgrading a system, especially one that involves data storage, it’s essential to consider the impact on existing models. Here are some key points to keep in mind:

# Risk-Free Upgrades:

Upgrading a system is generally safe from a storage perspective if the changes do not affect the existing data layout.
For example, adding new fields to a model (without modifying existing fields) won’t disrupt the stored data. Retrieving existing data remains straightforward.

Suppose we have a basic model called Player that represents player information:

```rust
#[derive(Model)]
struct Player {
    #[key]
    player_id: u64,
    username: String,
    score: u32,
}
```

In this model: `player_id`, serves as the primary key. We store the player’s `username` and their `score`.
Now, let’s say we want to enhance our system by adding a new field called level to the Player model. We’ll do this without modifying the existing fields (player_id, username, and score).

```rust
#[derive(Model)]
struct Player {
    #[key]
    player_id: u64,
    username: String,
    score: u32,
    level: u8, // New field
}
```

Our existing data remains intact. Retrieving player information using the original fields (player_id, username, and score) continues to work seamlessly.
For example, querying Player 1 (ID: 123) with username “Alice” and score 100 still provides accurate results.
so this is for risk free upgrade.

# Risk of Data Corruption

You have a User model with three fields: user_id, username, and age. The age field is initially stored as an integer (e.g., 30).

```rust
struct User {
    user_id: u64,
    username: String,
    age: u32, // Now a string
}

```

Later, you decide to modify the age field and store it as a string instead of an integer:

```rust
struct User {
    user_id: u64,
    username: String,
    age: String, // Now a string
}
```

This change involves altering the data type of the age field from numeric (integer) to textual (string).

When you modify the data type of an existing field, you introduce the risk of data corruption.
In our example, the existing data `(e.g., age 30)` stored in the age field will no longer fit the new format (string).
Retrieving ages as integers won’t work directly because they are now stored as strings.
To handle this situation, you’ll need to convert the string representation of age back to integers when necessary.

# Conversion Process:

When retrieving the age, you’ll need to parse the string value `(e.g., "30")` and convert it back to an integer `(e.g., 30)` for any calculations or comparisons.
This conversion process ensures that the data remains consistent despite the change in data type.
In summary, data corruption occurs when existing data doesn’t align with the new data type after modifying a field. Proper handling, such as converting values during retrieval, is essential to maintain data integrity.
