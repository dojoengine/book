## Enum

Enums are very useful in game design, as they simplify the creation of clean, complex logic.

You can define an enum as follows:

```rust,ignore

// This enum simply defines the states of a game.
#[derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]
enum GameStatus {
    NotStarted: (),
    Lobby: (),
    InProgress: (),
    Finished: (),
}

// We define an into trait
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

Then within a trait you can create something like this:

```rust,ignore
#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: u32,
    status: GameStatus,
}

#[generate_trait]
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

> Read more about Cairo enums [here](https://book.cairo-lang.org/ch06-00-enums-and-pattern-matching.html)
