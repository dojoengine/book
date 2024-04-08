## Enum

## What is Enum
Enums, short for "enumerations," are a way to define a custom data type that consists of a fixed set of named values, called variants. Enums are useful for representing a collection of related values where each value is distinct and has a specific meaning. Enums are particularly useful in game development for representing game states, player actions, or any other set of related constants that a game might need to track.
```rust
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
enum PlayerCharacter {
    Godzilla
    Dragon
    Fox
    Rhyno

}

```
In this example, we've defined an enum called PlayerCharacter with four variants: `Godzilla`, `Dragon`, `Fox`, and `Rhyno`. The naming convention is to use PascalCase for enum variants. Each variant represents a distinct value of the PlayerCharacter type. In this particular example, variants don't have any associated value. 
Now let's imagine that our variants have associated values, We can define a new PlayerCharacter enum:

```rust
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
enum PlayerCharacter {
    Godzilla :u128,
    Dragon : u128,
    Fox : u128,
    Rhyno : u128
}

```

In the next example, we will see that it is also possible to associate different data types with each variant. The PlayerCharacter enum we will define serves as a blueprint for creating various types of characters, each with their unique attributes. This design choice is particularly useful in game development, where you often need to manage different types of entities (like characters, items, or enemies) that share some common properties but also have unique characteristics.

``` rust 
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
enum PlayerCharacter {
    Godzilla ,
    Fox  : felt252,
}

    // Instantiate some characters with associated values
let godzilla = PlayerCharacter::Godzilla;
let fox = PlayerCharacter::Fox(90);
```

In this example, the PlayerCharacter enum has three variants: `Godzilla`, `Fox`, and `Rhyno`, all with different types:
`Godzilla` doesn't have any associated value.
`Fox ` is a single felt252.
`Rhyno` is a tuple of two u128 values.
You could even use a Struct or another enum you defined inside one of your enum variants.

## Trait Implementations for Enums

 traits are a way to define shared behavior across types. By defining traits and implementing them for your custom enums, you can encapsulate common behaviors and methods that are relevant to the enum. This approach enhances code reusability and maintainability, especially in complex systems like game development.

Consider the GameStatus enum, which represents the various states a game can be in. This enum is a simple yet powerful example of how enums can be used to model game states.

 ``` rust
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
enum GameStatus {
    NotStarted: (),
    Lobby: (),
    InProgress: (),
    Finished: (),
}
```

<!-- We define an into trait -->
 ``` rust
impl GameStatusFelt252 of Into<GameStatus, felt252> {
    fn into(self: GameStatus) -> felt252 {
        match self {
            GameStatus::NotStarted => 0,
            GameStatus::Lobby => 1,
            GameStatus::InProgress => 2,
            GameStatus::Finished => 3,
        }
    }
}
```

# Structuring Game Logic with Traits and enum
Building upon the GameStatus enum, we can define a Game struct that includes a GameStatus field. By implementing a custom trait for the Game struct, we can encapsulate game-specific logic and assertions.
```rust
#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: u32,
    status: GameStatus,
}

# [generate_trait]
impl GameImpl of GameTrait {
    fn assert_in_progress(self: Game) {
        assert(self.status == GameStatus::InProgress, "Game not started");
    }
    fn assert_lobby(self: Game) {
        assert(self.status == GameStatus::Lobby, "Game not in lobby");
    }
    fn assert_not_started(self: Game) {
        assert(self.status == GameStatus::NotStarted, "Game already started");
    }
}
```

## Enum Placement
Regarding the placement of the enum, it's generally best practice to define enums in the same file or module where they are used, especially if they are closely tied to the functionality of that system. This makes the code easier to understand and maintain, as the enum is defined in context. However, if the enum is used across multiple systems or components, it might make sense to define it in a common module that can be imported wherever needed. This approach helps to avoid duplication and keeps the codebase organized.

Given that Eternum has one enum in each system, it suggests a design where each system is self-contained and has its own set of related events or states. This design can help to encapsulate the logic of each system, making the codebase easier to navigate and understand.

## Important Of Enums 
1 Semantic Clarity:
Enums provide semantic clarity by giving meaningful names to specific values. Instead of using arbitrary integers or strings, you can use descriptive identifiers.
For example, consider an enum representing different player states: `IDLE`, `RUNNING`, `JUMPING`, and `ATTACKING`. These names convey the purpose of each state more effectively than raw numeric values.

2 Avoiding Magic Numbers:
Magic numbers (hard-coded numeric values) in your code can be confusing and error-prone. Enums help you avoid this pitfall.
Suppose you have an event system where different events trigger specific actions. Instead of using 0, 1, 2, etc., you can define an enum like this:

``` rust 
enum Event {
    PlayerSpawned,
    EnemyDefeated,
    ItemCollected,
}
Now, when handling events, you can use Event::PlayerSpawned instead of an arbitrary number.
```

3 Type Safety:
Enums provide type safety. Each enum variant has a distinct type, preventing accidental mixing of incompatible values.
For instance, if you have an enum representing different power-ups:

```rust
enum PowerUp {
    Health,
    SpeedBoost,
    Invincibility,
}
You can’t mistakenly assign a PowerUp value to a variable expecting a different type.
```
4 Pattern Matching:
Enums shine when used in pattern matching (also known as switch/case statements).
You can handle different cases based on the enum variant, making your code more expressive and concise. example

``` rust 
fn handle_power_up(power_up: PowerUp) {
    match power_up {
        PowerUp::Health => println!("Restored health!"),
        PowerUp::SpeedBoost => println!("Zooming ahead!"),
        PowerUp::Invincibility => println!("Invincible!"),
    }
}

```

5 Extensibility:
Enums allow you to add new variants without breaking existing code.
Suppose you later introduce a DoubleDamage power-up. You can simply extend the PowerUp enum:

```Rust
enum PowerUp {
    Health,
    SpeedBoost,
    Invincibility,
    DoubleDamage,
}
```
 enums serve as powerful tools for creating expressive, self-documenting code. They enhance readability, prevent errors, and facilitate better software design.

> Read more about Cairo enums [here](https://book.cairo-lang.org/ch06-00-enums-and-pattern-matching.html)




