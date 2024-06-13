# Dojo Contract

Dojo contracts is where you define your game logic into functions, called [systems](/framework/contracts/systems).

To define a Dojo contract, simply add the `#[dojo::contract]` to a Cairo module:

```rust
#[dojo::contract]
mod my_contract {
    // ...
}
```
