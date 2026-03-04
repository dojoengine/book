---
title: "Bindings Generation"
description: "Generate type-safe client bindings for your Dojo world across multiple platforms"
---

# Binding Generation

Client bindings bridge the gap between your Cairo smart contracts and client applications.
Sozo's `bindgen` generates type-safe, platform-specific code that enables native interaction with your Dojo world.

## What are Bindings?

**Language bindings** are code libraries that allow programs written in one language to interact with systems written in another language.
In blockchain development, smart contracts are often written in specialized languages (like Cairo or Solidity), while client applications use general-purpose languages (like Rust or TypeScript).

Bindings solve this integration challenge by:

- **Translating function calls** from the client language to the contract's native format
- **Converting data types** between different language type systems
- **Handling serialization** to transform data for network transmission
- **Providing type safety** to catch errors at compile-time rather than runtime

For example, without bindings, calling a Cairo contract from Rust would require manually:

```rust
// Manual contract interaction (error-prone)
let calldata = vec![
    Felt::from_hex("0x123...")?,  // What does this represent?
    Felt::from(42_u32),           // Raw numeric conversion
    // ... more manual serialization
];
let result = provider.call(contract_address, "mystery_function", calldata).await?;
// Result is raw Felt values - what do they mean?
```

With generated bindings, the same interaction becomes:

```rust
// Type-safe binding (clear and safe)
let result = contract.transfer_tokens(recipient_address, amount).call().await?;
// Result is a strongly-typed struct with meaningful fields
```

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
