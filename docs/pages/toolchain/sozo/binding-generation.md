---
title: "Bindings Generation"
description: "Generate type-safe client bindings for your Dojo world across multiple platforms"
---

# Binding Generation

Client bindings bridge the gap between your Cairo smart contracts and client applications.
Sozo's `bindgen` generates type-safe, platform-specific code that enables native interaction with your Dojo world.

## Basic Workflow

```bash
sozo build                                # Compile contracts
sozo bindgen --binding-target typescript  # Generate TypeScript bindings

# Use generated bindings in your client app
```

Sozo provides a shorthand for compiling contracts and generating bindings in one command:

```bash
sozo build --typescript     # Compile contracts + generate bindings
```

Bindings are saved to the `bindings/` directory by default.

**What gets generated:**

- **Type-safe interfaces** for all your models and systems
- **Serialization/deserialization** handling
- **Contract interaction methods** with proper typing
- **Integration helpers** for each platform

:::tip
For the architectural details of binding generation, see the [Cainome documentation](/toolchain/cainome).
:::

## Supported Platforms

### TypeScript

Starting with your Cairo contracts, generate and use type-safe TypeScript definitions:

**1. Your Cairo models:**

```cairo
use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Position {
    #[key]
    player: ContractAddress,
    vec: Vec2,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Moves {
    #[key]
    player: ContractAddress,
    remaining: u8,
    last_direction: Direction,
}

#[derive(Copy, Drop, Serde)]
enum Direction {
    None,
    Left,
    Right,
    Up,
    Down,
}
```

**2. Generate TypeScript bindings:**

```bash
sozo build --typescript
```

Bindings will be saved as `bindings/typescript/{contracts, models}.gen.ts`.

**3. Use in your TypeScript application:**

```typescript
// Import your Cairo types - now available as TypeScript interfaces
import { Position, Moves, Direction } from "./bindings/typescript/models.ts";
import { Client, createClient } from "@dojoengine/torii-client";

const client = await createClient({
    toriiUrl: "http://localhost:8080",
    worldAddress: worldAddress,
});

// Query entities with full type safety
const entities = await client.getEntities({
    clause: {
        Keys: {
            keys: [playerId],
            pattern_matching: "FixedLen",
            models: ["Position", "Moves"],
        },
    },
});

// Your Cairo models are now typed TypeScript objects
const position = entities[0].models.find(
    (m) => m.name === "Position"
) as Position;
const moves = entities[0].models.find((m) => m.name === "Moves") as Moves;

// TypeScript knows about your Cairo enum values
if (moves.last_direction.type === "Left") {
    console.log("Player moved left");
}
```

### Unity

Starting with the same Cairo contracts, generate C# classes for Unity:

**1. Your Cairo models** (same as above)

**2. Generate C# bindings:**

```bash
sozo build --unity
```

**3. Use in Unity:**

```csharp
using Dojo.Starknet;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    void Start()
    {
        // Your Cairo models are now available as C# classes
        var playerPosition = new Position
        {
            player = new FieldElement("0x123..."),
            x = 10,
            y = 5
        };

        // Use your Cairo types in Unity
        UpdatePlayerTransform(playerPosition);
    }

    void UpdatePlayerTransform(Position position)
    {
        // Type-safe usage of your Cairo structs
        transform.position = new Vector3(
            (float)position.x,  // Cairo u32 -> C# uint -> float
            0f,
            (float)position.y
        );

        Debug.Log($"Player {position.player} moved to ({position.x}, {position.y})");
    }
}
```

:::note
Ensure your generated bindings are in the `Assets/` folder of your Unity project.
:::

### Additional Targets

- `typescript-v2` - Alternative TypeScript format
- `unrealengine` - C++ bindings for Unreal Engine
- `recs` - RECS framework integration
