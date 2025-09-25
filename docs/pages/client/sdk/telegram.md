---
title: "Dojo Telegram Integration"
description: "Complete guide for building Telegram Mini Apps with Dojo and Cartridge Controller"
---

# Dojo Telegram Integration

Build fully on-chain games and applications that run seamlessly within Telegram using Dojo and the [Cartridge Controller](https://docs.cartridge.gg/controller/overview).

Telegram [Mini Apps](https://core.telegram.org/bots/webapps) are web applications that run directly inside Telegram, providing users with rich, interactive experiences directly inside the messaging platform.

## Architecture Overview

A typical Dojo Telegram app consists of:

1. **Frontend**: React-based web app using the Telegram SDK
2. **Wallet Integration**: Cartridge Controller for account management
3. **Blockchain Layer**: Dojo smart contracts on Starknet
4. **State Management**: Torii client for real-time entity subscriptions

## Getting Started

### Prerequisites

Before building your Telegram Mini App, ensure you have a Bot Token from [@BotFather](https://t.me/botfather).

:::tip
See the [Dojo.js docs](/client/sdk/javascript) for more information about using Dojo with React.
:::

### Quick Start

::::steps

#### Create Your Project

Set up a new React project with Vite:

```bash
pnpm create vite my-telegram-dojo-app --template react-ts
cd my-telegram-dojo-app && pnpm install
```

#### Install Dependencies

Add the essential packages for Telegram and Dojo integration:

```bash
# Dojo SDK packages
pnpm add @dojoengine/core @dojoengine/sdk @dojoengine/torii-client @dojoengine/torii-wasm

# Telegram integration
pnpm add @telegram-apps/sdk-react

# Cartridge Controller for wallet management
pnpm add @cartridge/connector @cartridge/controller @cartridge/account-wasm

# Additional utilities
pnpm add @dojoengine/utils zustand immer

# Development tools
pnpm add -D vite-plugin-wasm vite-plugin-top-level-await
```

#### Configure Vite

Update your `vite.config.ts` to support WASM modules:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
    plugins: [react(), wasm(), topLevelAwait()],
    server: {
        fs: {
            allow: [".."],
        },
    },
});
```

#### Initialize the Application

Set up your main application entry point:

```typescript
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { AccountProvider } from "./hooks/useAccount";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SDKProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <AccountProvider>
              <App />
            </AccountProvider>
          } />
        </Routes>
      </Router>
    </SDKProvider>
  </React.StrictMode>
);
```

::::

## Account Management with Controller

### Session Key Management

Beast Slayers demonstrates a robust account management pattern using Telegram's cloud storage for session persistence.

**Key concepts:**

```typescript
import { useUtils } from "@telegram-apps/sdk-react";
import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";
import * as Dojo from "@dojoengine/torii-wasm";

// Generate session keys with Dojo utilities
const privateKey = Dojo.signingKeyNew();
const publicKey = Dojo.verifyingKeyNew(privateKey);
storage.set("sessionSigner", JSON.stringify({ privateKey, publicKey }));

// Create Cartridge session account
const account = CartridgeSessionAccount.new_as_registered(
    rpcUrl,
    privateKey,
    address,
    ownerGuid,
    chainId,
    { expiresAt, policies }
);

// Open Cartridge Controller for session registration
const utils = useUtils();
utils.openLink(keychainUrl + sessionParams);
```

**Complete implementation**: See [`src/hooks/useAccount.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useAccount.tsx)

**Key integration points:**

- **Telegram Cloud Storage**: Persists session keys across app sessions
- **Launch Parameters**: Receives account data via `initData.startParam`
- **Session Policies**: Define which contract methods the session can execute
- **Dojo Integration**: Uses Dojo's cryptographic utilities for key generation

## Dojo Integration

### Game Actions

Execute game actions using the session account:

```typescript
const handleAttack = async () => {
    await account.execute([
        {
            contractAddress: ACTIONS_ADDRESS,
            entrypoint: "attack",
            calldata: [],
        },
    ]);
};
```

**Complete Implementation**: [`src/App.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/App.tsx)

### Torii Client Setup

Initialize the Torii client for real-time blockchain data synchronization:

```typescript
import { useState, useEffect } from "react";
import { createClient, ToriiClient } from "@dojoengine/torii-wasm";

const [client, setClient] = useState<ToriiClient>();
useEffect(() => {
    createClient({
        toriiUrl: "https://api.cartridge.gg/x/yourapp/torii",
        rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet",
        worldAddress: "0x...",
    }).then(setClient);
}, []);
```

### Entity Queries and Subscriptions

Use the Torii client to query and subscribe to entities:

```typescript
// Entity queries
const entities = await client.getEntities({
    clause: {
        Keys: {
            keys: ["0xfea4"], // Entity key
            models: ["beastslayers-Game"],
        },
    },
});

// Real-time subscriptions
const subscription = await client.onEntityUpdated(
    [{ HashedKeys: Object.keys(entities) }],
    (hashedKeys, models) => {
        // Handle state updates
        updateGameState(models["beastslayers-Game"]);
    }
);
```

**Complete implementations:**

- **Entity Subscriptions**: [`src/hooks/useBeast.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useBeast.tsx)
- **Player State**: [`src/hooks/useWarrior.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useWarrior.tsx)
- **Token Balances**: [`src/hooks/useThingBalances.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useThingBalances.tsx)

### Telegram-Specific Features

```typescript
const viewport = useViewport();
useEffect(() => {
    viewport?.expand(); // Expand Mini App viewport
}, [viewport]);
```

**Complete Implementation**: [`src/App.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/App.tsx)

## Deployment and Testing

### Telegram Bot Setup

1. Message [@BotFather](https://t.me/botfather) to create a new bot
2. Use `/newapp` command to create a Mini App
3. Set the Web App URL to your development or production URL
4. Configure the bot description and about text

### Local Development

```bash
pnpm run dev           # Start development server
npx ngrok http 5173    # Create HTTPS tunnel for Telegram
```

### Production Deployment

```bash
pnpm run build && npx vercel
```

## Complete Example

**[Beast Slayers](https://github.com/cartridge-gg/beast-slayers/blob/main)** is a fully functional Telegram Mini App that demonstrates:

- **Account Management**: [`src/hooks/useAccount.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useAccount.tsx) - Session keys & cloud storage
- **Real-time State**: [`src/hooks/useBeast.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useBeast.tsx) - Entity subscriptions and live updates
- **Game Actions**: [`src/App.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/App.tsx) - Session-based transaction execution
- **Telegram Integration**: [`src/main.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/main.tsx) - SDKProvider and routing setup
- **Dependencies**: [`package.json`](https://github.com/cartridge-gg/beast-slayers/blob/main/package.json) - Complete package configuration

The game showcases how to build engaging blockchain-based experiences that feel native to the Telegram platform while leveraging Dojo's ECS architecture.
