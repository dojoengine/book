---
title: "Dojo.js Overview"
description: "Comprehensive guide to using the Dojo.js for building onchain applications"
---

# Dojo.js

The Dojo.js SDK provides a powerful, intuitive interface for interacting with onchain state in JavaScript.
It streamlines data fetching and subscriptions, supporting both simple and complex queries.

## Key Features

- **Type Safety**: Leverage TypeScript for robust, error-resistant code.
- **Intuitive query syntax**: Write ORM-like queries that feel natural.
- **Flexible subscriptions**: Subscribe to granular state changes in your world.
- **Built-in Zustand support**: Reactive state management.
- **Signed messages**: Sign off-chain state and send to Torii.
- **Optimistic Client Rendering**: Update state before a transaction has finalized.

:::note
dojo.js is a wrapper around [dojo.c](https://github.com/dojoengine/dojo.c) that exposes Torii client features via WASM.
For more information about the Torii gRPC client, check out [this documentation](/toolchain/torii/grpc).
:::

## Getting Started

### Quickstart Wizard

The fastest way to get started is using our quickstart wizard.

```bash
pnpx @dojoengine/create-dojo start
```

This will guide you through a series of prompts to configure your project.

### Manual Setup

For full control over your project structure, follow these steps:

::::steps

#### Create Your Project

Pick any JavaScript framework.
We recommend [pnpm](https://pnpm.io/) as your package manager.

#### Install Dependencies

```bash
mkdir {project_name} && cd {project_name} && pnpm init

# Essential packages
pnpm add @dojoengine/core @dojoengine/sdk @dojoengine/torii-client

# For React integration
pnpm add @dojoengine/create-burner @dojoengine/utils

# For state management (v1.6+)
pnpm add @dojoengine/state

# Build tools for WASM support
pnpm add -D vite-plugin-wasm vite-plugin-top-level-await

# Additional dependencies (if using React)
pnpm add zustand immer
```

#### Create `dojoConfig.ts`

Create a `dojoConfig.ts` file and pass in your project's manifest:

```typescript
import { createDojoConfig } from "@dojoengine/core";
import manifest from "../path/to/manifest_dev.json";

export const dojoConfig = createDojoConfig({ manifest });
```

#### Generate TypeScript Bindings

[Generate code bindings](/toolchain/sozo/binding-generation) with Sozo, letting you import Dojo models into TypeScript:

```bash
DOJO_MANIFEST_PATH="../path/to/Scarb.toml" sozo build --typescript
```

:::note
These instructions assume you have Dojo contracts relative to your client root.
:::

#### Initialize the SDK

With your bindings generated, you can now link Dojo models to your UI.

```typescript
// main.tsx

// React imports
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Dojo imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";

// Local imports
import { dojoConfig } from "./dojoConfig.ts";
import { setupWorld } from "./bindings/typescript/contracts.gen.ts";
import type { SchemaType } from "./bindings/typescript/models.gen.ts";

async function main() {
    // Initialize the SDK with configuration options
    const sdk = await init<SchemaType>({
        client: {
            // Required: Address of the deployed World contract
            worldAddress: dojoConfig.manifest.world.address,
            // Optional: Torii indexer URL (defaults to http://localhost:8080)
            toriiUrl: dojoConfig.toriiUrl || "http://localhost:8080",
            // Optional: Relay URL for real-time messaging
            relayUrl: dojoConfig.relayUrl || "/ip4/127.0.0.1/tcp/9090",
        },
        // Domain configuration for typed message signing (SNIP-12)
        domain: {
            name: "MyDojoProject",
            version: "1.0",
            chainId: "KATANA", // or "SN_MAIN", "SN_SEPOLIA"
            revision: "1",
        },
    });

    createRoot(document.getElementById("root")!).render(
        <DojoSdkProvider sdk={sdk} dojoConfig={dojoConfig} clientFn={setupWorld}>
            <App />
        </DojoSdkProvider>
    );
}

main();
```

:::warning
Call `init` only once to avoid creating multiple Torii clients.
:::

::::

## Usage Overview

### Core SDK Methods

The SDK provides several key methods for interacting with your Dojo world:

- **`getEntities()`** - Fetch entities with flexible filtering
- **`subscribeEntityQuery()`** - Subscribe to real-time entity updates
- **`getEventMessages()`** - Fetch historical events
- **`subscribeEventQuery()`** - Subscribe to real-time event updates
- **`sendMessage()`** - Send signed off-chain messages

All queries use the same `ToriiQueryBuilder` and support the same filtering operators: `Eq`, `Neq`, `Gt`, `Gte`, `Lt`, `Lte`, `In`, `NotIn`.

### Querying Entities

Fetch entities using the `ToriiQueryBuilder` with various clause types:

```typescript
// Simple query: Find a specific player
const entities = await sdk.getEntities({
    query: new ToriiQueryBuilder()
        .withClause(MemberClause("dojo_starter-Player", "id", "Eq", 1).build())
});

// Access the results
entities.items.forEach(entity => {
    const player = entity.models.dojo_starter.Player;
    console.log(`Player: ${player?.name}, Score: ${player?.score}`);
});
```

:::note
Models are accessed using the pattern `entity.models.{namespace}.{ModelName}` where:
- `{namespace}` is your project's namespace (e.g., `dojo_starter`, `world`, `game`)
- `{ModelName}` is the exact model name as defined in your Cairo code
:::

Here is an example of a complex query that finds high-scoring warriors and mages in a specific area of the map:

```typescript
const entities = await sdk.getEntities({
    query: new ToriiQueryBuilder()
        .withClause(
            AndComposeClause([
                // Player conditions
                MemberClause("world-Player", "score", "Gt", 100),
                OrComposeClause([
                    MemberClause("world-Player", "class", "Eq", "warrior"),
                    MemberClause("world-Player", "class", "Eq", "mage"),
                ]),
                // Position conditions (same entities)
                MemberClause("world-Position", "x", "Lt", 50),
                MemberClause("world-Position", "y", "Gt", 20),
            ]).build()
        )
});
```

:::note
When you use AND with different model types, you're looking for **entities that have both components**.
:::

For large datasets, use pagination and ordering:

```typescript
const entities = await sdk.getEntities({
    query: new ToriiQueryBuilder()
        .withClause(MemberClause("dojo_starter-Player", "score", "Gt", 0).build())
        .withLimit(10)              // Limit to 10 results
        .withOffset(0)              // Start from beginning
        .withOrderBy([{             // Order by score descending
            field: "score",
            direction: "Desc"
        }])
});
```

### Subscribing To Entity Changes

Subscribe to real-time updates for entities matching your query criteria:

```typescript
const [initialEntities, subscription] = await sdk.subscribeEntityQuery({
    query: new ToriiQueryBuilder()
        .withClause(MemberClause("dojo_starter-Player", "score", "Gt", 100).build())
        .includeHashedKeys(),
    callback: ({ data, error }) => {
        if (data) {
            console.log("Player updated:", data);
            data.forEach(entity => {
                const player = entity.models.dojo_starter.Player;
                console.log(`Player ${player?.id}: ${player?.score} points`);
            });
        }
        if (error) {
            console.error("Subscription error:", error);
        }
    }
});

// Cancel the subscription when no longer needed
// subscription.cancel();
```

### Saving State With Zustand

The SDK integrates with Zustand for reactive state management, updating your components automatically when blockchain data changes:

```
1. useEntityQuery() subscribes to Torii for real-time updates
              ↓
2. Blockchain state changes (transaction, new entity, etc.)
              ↓
3. Torii detects the change and pushes update to your client
              ↓
4. SDK automatically updates the Zustand store
              ↓
5. React components using useModels/useModel re-render automatically
              ↓
6. UI shows the latest data
```

#### Option 1: Using Convenience Hooks (Recommended)

The easiest way is to use the provided React hooks, which abstract away the store:

```typescript
import { useEntityQuery, useModels, useModel, useEntityId } from "@dojoengine/sdk/react";

function MyComponent() {
    // Subscribe to entity changes - data automatically goes into the store
    useEntityQuery(
        new ToriiQueryBuilder()
            .withClause(MemberClause("dojo_starter-Item", "durability", "Eq", 2).build())
            .includeHashedKeys()
    );

    // Get all items from the store using convenience hooks
    const items = useModels("dojo_starter-Item");

    // Get a single item by entity ID
    const entityId = useEntityId(1);
    const item = useModel(entityId, "dojo_starter-Item");

    return (
        <div>
            <h3>All Items with Durability 2:</h3>
            {Object.entries(items).map(([id, item]) => (
                <div key={id}>Item {id}: durability {item?.durability}</div>
            ))}

            <h3>Single Item:</h3>
            {item && <div>Item 1: durability {item.durability}</div>}
        </div>
    );
}
```

#### Option 2: Direct Zustand Store Access

For more advanced use cases, you can access the Zustand store directly:

```typescript
import { useDojoSDK, useEntityQuery } from "@dojoengine/sdk/react";

function MyComponent() {
    const { useDojoStore } = useDojoSDK(); // The Zustand store

    // Subscribe to entity changes
    useEntityQuery(
        new ToriiQueryBuilder()
            .withClause(MemberClause("dojo_starter-Item", "durability", "Eq", 2).build())
            .includeHashedKeys()
    );

    // Access the raw store
    const allEntities = useDojoStore((state) =>
        state.entities
    );
    const itemEntities = useDojoStore((state) =>
        state.getEntitiesByModel("dojo_starter", "Item")
    );

    return (
        <div>
            <p>Total entities in store: {Object.keys(allEntities).length}</p>
            <p>Item entities: {itemEntities.length}</p>
            {itemEntities.map((entity) => {
                const item = entity.models.dojo_starter.Item;
                return (
                    <div key={entity.entityId}>
                        Entity {entity.entityId}: durability {item?.durability}
                    </div>
                );
            })}
        </div>
    );
}
```

### Sending Signed Messages

Signed messages allow you to send **authenticated off-chain data** to Torii without expensive blockchain transactions.
This can be used to implement things like **chat systems, leaderboards, social features, game coordination, and real-time events.**

The key benefit: **Players authenticate the data** (proving it came from them) **without gas fees**, while Torii broadcasts it to all connected clients in real-time.

Here's an example of how to send a signed message:

```typescript
// Generate typed data for a chat message model
const typedData = sdk.generateTypedData("world-Message", {
    identity: account?.address,
    content: messageContent,
    timestamp: Date.now(),
});

try {
    // Sign and send the message using the SDK
    const result = await sdk.sendMessage(typedData, account);

    if (result.isOk()) {
        console.log("Message sent successfully:", result.value);
    } else {
        console.error("Failed to send message:", result.error);
    }
} catch (error) {
    console.error("Error sending message:", error);
}
```

:::note
If you want messages to be broadcast to all of your torii client instances, you'll have to pass a `relayUrl` to `init`.
`relayUrl` is a _multiaddr_ format which looks like something like this when deployed on slot:
`/dns4/api.cartridge.gg/tcp/443/x-parity-wss/%2Fx%2Fyour-slot-deployment-name%2Ftorii%2Fwss`
:::

### Querying Tokens

Dojo.js can query token data (ERC20, ERC721, ERC1155) indexed by Torii. First, configure Torii to index your tokens:

```toml
# dojo_dev.toml
[indexing]
contracts = [
    "erc20:0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", # ETH
    "erc20:0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", # STRK
    "erc721:0x..." # Your NFT contract
]
```

Then query token balances in your React components:

```typescript
import { useTokens } from "@dojoengine/sdk/react";

function TokenBalance({ address }: { address: string }) {
    const { tokens, balances, getBalance, toDecimal } = useTokens({
        accountAddresses: [address],
    });

    return (
        <div>
            <h3>Token Balances for {address}</h3>
            {tokens.map((token, idx) => (
                <div key={idx}>
                    {token.symbol}: {toDecimal(token, getBalance(token))}
                </div>
            ))}
        </div>
    );
}
```

### Optimistic Client Rendering

We use [immer](https://immerjs.github.io/immer/) for efficient optimistic rendering. This allows instant client-side entity state updates while awaiting blockchain confirmation.

**The process:**

1. Update entity state optimistically.
2. Wait for condition (e.g., a specific state change).
3. Resolve update, providing immediate user feedback.

This ensures a responsive user experience while maintaining blockchain data integrity.

:::note
You will need to have a subscription running in order for the update to resolve.
:::

```typescript
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount } from "@starknet-react/core";
import { getEntityIdFromKeys } from "@dojoengine/utils";

export function useSystemCalls(entityId: string) {
    const { account } = useAccount();
    const { useDojoStore, client } = useDojoSDK();
    const state = useDojoStore((s) => s);

    const spawn = useCallback(async () => {
        if (!account) return;

        // Generate a unique transaction ID
        const transactionId = uuidv4();

        // The value to update the Moves model with
        const remainingMoves = 100;

        // Apply an optimistic update to the state
        // this uses immer drafts to update the state
        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (
                draft.entities[entityId]?.models?.dojo_starter?.Moves
            ) {
                draft.entities[entityId].models.dojo_starter.Moves!.remaining =
                    remainingMoves;
            }
        });

        try {
            // Execute the spawn action
            await client.actions.spawn({ account });

            // Wait for the entity to be updated with the new state
            await state.waitForEntityChange(entityId, (entity) => {
                return (
                    entity?.models?.dojo_starter?.Moves?.remaining ===
                    remainingMoves
                );
            });
        } catch (error) {
            // Revert the optimistic update if an error occurs
            state.revertOptimisticUpdate(transactionId);
            console.error("Error executing spawn:", error);
            throw error;
        } finally {
            // Confirm the transaction if successful
            state.confirmTransaction(transactionId);
        }
    }, [account, client, entityId, state]);

    return { spawn };
}
```

## Additional Examples

See this [example project](https://github.com/dojoengine/dojo.js/tree/main/examples/example-vite-react-sdk) for a real-world implementation.
