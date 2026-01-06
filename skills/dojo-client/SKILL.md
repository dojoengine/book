---
name: dojo-client
description: Integrate Dojo with game clients for JavaScript, Unity, Unreal, Rust, and other platforms. Generate typed bindings and connection code. Use when connecting frontends or game engines to your Dojo world.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Dojo Client Integration

Connect your game client or frontend to your deployed Dojo world across multiple platforms.

## When to Use This Skill

- "Set up JavaScript SDK for my Dojo game"
- "Integrate Dojo with Unity"
- "Generate TypeScript bindings"
- "Connect Unreal Engine to my world"

## What This Skill Does

Handles client integration for:
- JavaScript/TypeScript SDK
- Unity (C#)
- Unreal Engine (C++)
- Rust client
- Godot, Bevy, and other platforms
- Typed binding generation
- Connection code
- Query/subscription patterns

## Quick Start

**JavaScript:**
```
"Set up the Dojo JavaScript SDK"
```

**Unity:**
```
"Integrate my Dojo world with Unity"
```

**Unreal:**
```
"Connect Unreal Engine to my deployed world"
```

## Supported Platforms

| Platform | Language | Package |
|----------|----------|---------|
| JavaScript/TypeScript | JS/TS | `@dojoengine/sdk` |
| Unity | C# | `dojo.unity` |
| Unreal Engine | C++ | `dojo.unreal` |
| Rust | Rust | `dojo::client` |
| Godot | GDScript | `dojo.godot` |
| Bevy | Rust | `dojo.bevy` |
| C/C++ | C/C++ | `dojo.c` |

## JavaScript/TypeScript Integration

### Installation

```bash
npm install @dojoengine/sdk
# or
pnpm add @dojoengine/sdk
```

### Generate Bindings

```bash
sozo build --typescript-output ./src/generated
```

### Basic Setup

```typescript
import { DojoProvider } from "@dojoengine/sdk";
import manifest from "./manifest.json";

// Create provider
const provider = new DojoProvider(
    manifest,
    "http://localhost:5050"  // Katana RPC
);

// Read a model
const position = await provider.getEntity("Position", playerId);
console.log(position.x, position.y);

// Execute a system
await provider.execute("actions", "spawn", []);
```

### Query Patterns

```typescript
// Get single entity
const player = await provider.getEntity("Player", address);

// Get multiple entities
const positions = await provider.getEntities("Position");

// Query with filters
const positions = await provider.query("Position", {
    where: { x: { $gt: 10 } }
});
```

### Subscriptions

```typescript
// Subscribe to entity changes
const unsubscribe = provider.subscribe(
    "Position",
    playerId,
    (position) => {
        console.log("Position updated:", position);
    }
);

// Unsubscribe later
unsubscribe();
```

### Transaction Signing

```typescript
import { Account } from "starknet";

// Create account
const account = new Account(
    provider.provider,
    accountAddress,
    privateKey
);

// Execute with account
await provider.execute(
    "actions",
    "move",
    [Direction.Up],
    { account }
);
```

## Unity Integration

### Installation

Add to `manifest.json`:
```json
{
  "dependencies": {
    "com.dojoengine.sdk": "https://github.com/dojoengine/dojo.unity.git"
  }
}
```

### Generate Bindings

```bash
sozo build --unity-output ./Assets/Generated
```

### Basic Setup

```csharp
using Dojo;
using Dojo.Starknet;

public class DojoManager : MonoBehaviour
{
    private DojoConnection connection;

    async void Start()
    {
        // Connect to world
        connection = new DojoConnection(
            "http://localhost:5050",
            worldAddress
        );

        await connection.Connect();

        // Read model
        var position = await connection.GetEntity<Position>(playerId);
        Debug.Log($"Position: {position.x}, {position.y}");

        // Execute system
        await connection.Execute("actions", "spawn");
    }
}
```

### Entity Synchronization

```csharp
public class PlayerController : MonoBehaviour
{
    private Position position;

    async void Start()
    {
        // Subscribe to position updates
        await connection.Subscribe<Position>(playerId, OnPositionUpdate);
    }

    void OnPositionUpdate(Position newPosition)
    {
        position = newPosition;
        transform.position = new Vector3(position.x, 0, position.y);
    }

    public async void Move(Direction direction)
    {
        await connection.Execute("actions", "move", direction);
    }
}
```

## Unreal Engine Integration

### Installation

1. Clone `dojo.unreal` plugin
2. Add to `Plugins/` folder
3. Enable in project settings

### Generate Bindings

```bash
sozo build --cpp-output ./Source/MyGame/Generated
```

### Basic Setup

```cpp
#include "DojoClient.h"

void AGameMode::BeginPlay()
{
    Super::BeginPlay();

    // Create client
    DojoClient = NewObject<UDojoClient>();
    DojoClient->Initialize(
        TEXT("http://localhost:5050"),
        WorldAddress
    );

    // Read model
    FPosition Position = DojoClient->GetEntity<FPosition>(PlayerId);
    UE_LOG(LogTemp, Log, TEXT("Position: %d, %d"), Position.X, Position.Y);

    // Execute system
    DojoClient->Execute(TEXT("actions"), TEXT("spawn"));
}
```

### Blueprint Integration

```cpp
UCLASS(BlueprintType)
class UDojoFunctionLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

    UFUNCTION(BlueprintCallable, Category = "Dojo")
    static void ExecuteSpawn(UDojoClient* Client)
    {
        Client->Execute(TEXT("actions"), TEXT("spawn"));
    }

    UFUNCTION(BlueprintCallable, Category = "Dojo")
    static FPosition GetPlayerPosition(UDojoClient* Client, FString PlayerId)
    {
        return Client->GetEntity<FPosition>(PlayerId);
    }
};
```

## Rust Integration

### Installation

```toml
[dependencies]
dojo-client = { git = "https://github.com/dojoengine/dojo" }
tokio = { version = "1", features = ["full"] }
```

### Basic Setup

```rust
use dojo_client::{DojoClient, WorldReader};

#[tokio::main]
async fn main() {
    // Create client
    let client = DojoClient::new(
        "http://localhost:5050",
        world_address
    ).await.unwrap();

    // Read model
    let position: Position = client
        .read_model(player_id)
        .await
        .unwrap();

    println!("Position: {}, {}", position.x, position.y);

    // Execute system
    client
        .execute("actions", "spawn", vec![])
        .await
        .unwrap();
}
```

## Common Integration Patterns

### Connecting to Deployed World

```typescript
// Get world address from manifest
import manifest from "./manifest.json";
const worldAddress = manifest.world.address;

// Create provider
const provider = new DojoProvider(manifest, rpcUrl);
```

### Polling vs Subscriptions

**Polling (simple):**
```typescript
setInterval(async () => {
    const position = await provider.getEntity("Position", playerId);
    updateUI(position);
}, 1000);
```

**Subscriptions (efficient):**
```typescript
provider.subscribe("Position", playerId, (position) => {
    updateUI(position);
});
```

### Handling Transactions

```typescript
try {
    // Execute transaction
    const tx = await provider.execute("actions", "move", [Direction.Up]);

    // Wait for confirmation
    await provider.waitForTransaction(tx.transaction_hash);

    // Update UI
    console.log("Move successful!");
} catch (error) {
    console.error("Move failed:", error);
}
```

### Batch Operations

```typescript
// Execute multiple actions
const txs = await Promise.all([
    provider.execute("actions", "move", [Direction.Up]),
    provider.execute("actions", "attack", [targetId]),
    provider.execute("actions", "heal", []),
]);

// Wait for all
await Promise.all(
    txs.map(tx => provider.waitForTransaction(tx.transaction_hash))
);
```

## Client Integration Checklist

### Pre-Integration
- [ ] World deployed (`dojo-deploy` skill)
- [ ] Torii indexer running (`dojo-indexer` skill)
- [ ] World address recorded
- [ ] RPC endpoint accessible

### Setup
- [ ] SDK/package installed
- [ ] Bindings generated (`sozo build --<platform>-output`)
- [ ] Manifest imported
- [ ] Connection code added
- [ ] Test queries work

### Integration
- [ ] Entity reads working
- [ ] System executions working
- [ ] Subscriptions configured (if using)
- [ ] Transaction handling implemented
- [ ] Error handling added

### Testing
- [ ] Test on local Katana
- [ ] Test on testnet
- [ ] Test subscriptions
- [ ] Test error cases
- [ ] Performance test queries

## Best Practices

- Use subscriptions instead of polling when possible
- Generate typed bindings for type safety
- Handle transaction failures gracefully
- Cache frequently accessed data
- Use Torii for complex queries (don't query RPC directly)
- Implement connection retry logic
- Validate data from chain
- Use account abstraction when available

## Troubleshooting

### "Cannot connect to RPC"
- Verify RPC URL is correct
- Check Katana/Torii is running
- Verify network is reachable

### "World not found"
- Check world address is correct
- Verify world is deployed
- Check RPC is pointing to correct network

### "Model not found"
- Ensure model is deployed
- Check model name spelling
- Verify entity exists with that key

### "Transaction failed"
- Check account has funds
- Verify system parameters are correct
- Check authorization/permissions

## Next Steps

After client integration:
1. Test end-to-end workflow
2. Optimize query patterns
3. Add error handling
4. Implement UI updates
5. Test with real users

## Related Skills

- **dojo-deploy**: Deploy world first
- **dojo-indexer**: Set up Torii for queries
- **dojo-world**: Configure permissions
- **dojo-migrate**: Update client after migrations
