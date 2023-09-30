## Models

> Models = Data

Models are structs that are annotated with the `#[derive(Model)]` attribute. Think of these models as a keypair store. The `#[key]` attribute is used to define the primary key of the model.

### Models are Structs

Models are defined as structs in Cairo. They can contain any number of fields, however it is best practice in ECS to have small isolated components. This promotes modularity and composability, allowing you to reuse models across multiple entity types.

```rust,ignore
#[derive(Model, Copy, Drop, Serde, SerdeLen)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
}
```