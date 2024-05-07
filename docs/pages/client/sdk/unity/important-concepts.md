# Dojo Unity Concepts

To dive into the exciting world of onchain games and worlds with Unity, let's explore some essential concepts:

## World Manager

The World Manager is the central hub for organizing and controlling entities within your Dojo world in Unity.

![world-manager](/unity/world-manager.png)

During initialization, the World Manager receives WorldManagerData, which defines essential settings like your Torii URL, RPC URL, and world address. While these settings are initially provided, you have the flexibility to adjust them by creating different scriptable objects.

![world-manager-data](/unity/world-manager-data.png)

In Unity, entities are represented by GameObject instances. The World Manager simplifies their management by offering methods to:

- Add and remove entities
- Access entities by name or list all entities

## Synchronization Master

The Synchronization Master acts as the bridge between Unity and your Dojo world, seamlessly synchronizing and managing entities.

![sync-master](/unity/sync-master.png)

Key Features:

- Control synchronization: Set the maximum number of entities to synchronize.
- Event-driven communication:

  - OnSynchronized: Notifies you when entities were successfully synchronized from Dojo world to Unity.
  - OnEntitySpawned: Triggered whenever a new entity is spawned in the Unity environment.

- Dynamic entity management:
  - SynchronizeEntities: Asynchronously retrieves and spawns entities from the Dojo world in the Unity environment.
  - HandleEntityUpdate: Dynamically updates existing entities or spawns new ones based on changes received from the Dojo world, ensuring seamless synchronization.

## Models

Models serve as the bridge between the Unity environment and the Dojo world, ensuring seamless synchronization of data. Changes or interactions occurring in Unity are mirrored accurately in the Dojo world, and vice versa.
While you have the flexibility to incorporate as many models as necessary, it's vital to ensure that these models align with those present in your Dojo world for effective synchronization.

⚠️ Before embarking on game development with Dojo in Unity, it's essential to grasp the fundamentals of **models** within the Dojo environment.

> 💡 Explore the following sections to gain insights:

- [Models Definition](/toolchain/framework/models.md): Understand the structure and functionality of models within Dojo.

- [Entity Definition](/toolchain/framework/entities.md): Learn about entities in the context of Dojo.

- [Dojo as an ECS in 15 Minutes](/tutorial/dojo-starter.md): Dive into a quick overview of Dojo's Entity-Component-System (ECS) architecture.

### Bingen

📖 A codegen plugin is available to automate the creation of C# bindings (components and contracts) for your Unity world.

To use this feature, execute the following command within your Cairo project:

```rust
  sozo build --unity
```

Once executed, you can proceed by either moving the files generated in the `bindings/unity` directory to your Unity project, or specify a custom output directory using:

```rust
  sozo build --unity --output-bindings ./your/unity/project/folder
```

> ⚠️ The version of dojo must be >= `0.6.0`. To install it run:

```rust
  dojoup --version v0.6.0
```

### Example

> Model in Dojo:

```rust
#[derive(Model, Drop, Serde)]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction
}

#[derive(Serde, Copy, Drop, Introspect)]
enum Direction {
    None,
    Left,
    Right,
    Up,
    Down,
}

```

> Representation in Unity:

```cs
using System.Numerics;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;

public enum Direction
{
    None,
    Left,
    Right,
    Up,
    Down,

}

public class Moves : ModelInstance
{
    [ModelField("player")]
    public FieldElement player;
    [ModelField("remaining")]
    public byte remaining;
    [ModelField("last_direction")]
    public Direction lastDirection;

    void Start() {}

    void Update() {}
}
```
