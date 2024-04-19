## Enum

## What is Enum
Enums, short for "enumerations," are a way to define a custom data type that consists of a fixed set of named values, called variants. Enums are useful for representing a collection of related values where each value is distinct and has a specific meaning. Enums are particularly useful in game development for representing game states, player actions, or any other set of related constants that a game might need to track.

In this example, we've defined an enum called PlayerCharacter with four variants: `Godzilla`, `Dragon`, `Fox`, and `Rhyno`. The naming convention is to use `PascalCase` for enum variants. Each variant represents a distinct value of the `PlayerCharacter` type. In this particular example, variants don't have any associated value. 
Now let's imagine that our variants have associated values, We can define a new PlayerCharacter enum:
```rust
// PlayerCharacter enum representing different characters with associated u128 values.
enum PlayerCharacter {
    Godzilla: u128,
    Dragon:   u128,
    Fox:      u128,
    Rhyno:    u128
}
```
[Explore more about enums, including variants with associated values. Click here for detailed examples and insights](https://book.cairo-lang.org/ch06-01-enums.html)

However, in Dojo, all enum variants must share the same type. This limitation poses a challenge when we want to associate different data types with each variant, as is often the case in game development where characters, items, or enemies may have unique attributes.
To work around this limitation, we can use a struct to encapsulate the attributes of each character type. This allows us to maintain the unique characteristics of each character while adhering to the constraints.

```rust
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
// Define an enum representing different player characters
enum PlayerCharacter {
    Godzilla(CharacterAttributes),
    Fox(CharacterAttributes),
    Rhyno(CharacterAttributes),
}

# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
// Define a struct representing the attributes of a character
struct CharacterAttributes {
    is_godzilla: bool,
    fox_value: Option<u32>, // Assuming felt252 is represented as u32 for simplicity
    rhyno_values: Option<(u128, u128)>,
}

// Create an instance of the Godzilla character
let godzilla = PlayerCharacter::Godzilla(CharacterAttributes {
    is_godzilla: true,
    fox_value: None,
    rhyno_values: None,
})

// Create an instance of the Fox character
let fox = PlayerCharacter::Fox(CharacterAttributes {
    is_godzilla: false,
    fox_value: Some(90), // Assuming felt252 is represented as u32 for simplicity
    rhyno_values: None,
});
```
For the `Godzilla` variant, since it doesn't require any additional data, you would instantiate it with a `CharacterAttributes` struct, where the `is_godzilla` flag is set to true, and the other fields are set to `None` or their default values. This approach effectively addresses the limitation where enum variants must share the same type.
The `PlayerCharacter` enum has three variants: `Godzilla`, `Fox`, and `Rhyno`. Each variant takes a `CharacterAttributes` struct as its associated value. The `CharacterAttributes` struct contains fields to represent the unique attributes of each character type:

`is_godzilla`: A boolean flag to indicate if the character is Godzilla.      
`fox_value`:  An optional `u32` value to represent the `felt252` value for Fox.  
`rhyno_values`: An optional tuple of two  `u128` values to represent the two `u128` values for `Rhyno`.

## Trait Implementations for Enums

 Traits are a way to define shared behavior across types. By defining traits and implementing them for your custom enums, you can encapsulate common behaviors and methods that are relevant to the enum. This approach enhances code reusability and maintainability, especially in complex systems like game development.

Consider the GameStatus enum, which represents the various states a game can be in. This enum is a simple yet powerful example of how enums can be used to model game states.

 ``` rust
# [derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
// Define an enum representing different states of a game
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

// Converts a GameStatus variant to its corresponding `felt252` value
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

``` rust
#[derive(Model, Copy, Drop, Serde)]
// Define the Game struct to represent a game object
struct Game {
    status: GameStatus,
}


// Implement the trait for the Game struct
#[generate_trait]
impl GameImpl of GameTrait{

    // Asserts that the game is in progress
    fn assert_in_progress(self: Game) {	
            assert(self.status == GameStatus::InProgress, "Game not started");
    }

    // Asserts that the game is in the lobby
    fn assert_lobby(self: Game) {	  
        assert(self.status == GameStatus::Lobby, "Game not in lobby");	        
    }
}   
```

## Enum Placement
Regarding the placement of the enum, it's generally best practice to define enums in the same file or module where they are used, especially if they are closely tied to the functionality of that system. This makes the code easier to understand and maintain, as the enum is defined in context. However, if the enum is used across multiple systems or components, it might make sense to define it in a common module that can be imported wherever needed. This approach helps to avoid duplication and keeps the codebase organized.

Given that Eternum has one enum in each system, it suggests a design where each system is self-contained and has its own set of related events or states. This design can help to encapsulate the logic of each system, making the codebase easier to navigate and understand.

## Important Of Enums 
1. Semantic Clarity:
Enums provide semantic clarity by giving meaningful names to specific values. Instead of using arbitrary integers or strings, you can use descriptive identifiers.
For example, consider an enum representing different player states: `IDLE`, `RUNNING`, `JUMPING`, and `ATTACKING`. These names convey the purpose of each state more effectively than raw numeric values.

2. Avoiding Magic Numbers:
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

3. Type Safety:
Enums provide type safety. Each enum variant has a distinct type, preventing accidental mixing of incompatible values.
For instance, if you have an enum representing different power-ups. you can’t mistakenly assign a PowerUp value to a variable expecting a different type.

```rust
enum PowerUp {
    Health,
    SpeedBoost,
    Invincibility,
}
```
4. Pattern Matching:
Enums shine when used in pattern matching (also known as switch/case statements).
You can handle different cases based on the enum variant, making your code more expressive and concise. Example:
``` rust 
fn handle_power_up(power_up: PowerUp) {
    match power_up {
        PowerUp::Health => println!("Restored health!"),
        PowerUp::SpeedBoost => println!("Zooming ahead!"),
        PowerUp::Invincibility => println!("Invincible!"),
    }
}

```

5. Extensibility:
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
 
Read more about Cairo enums [here](https://book.cairo-lang.org/ch06-00-enums-and-pattern-matching.html)




