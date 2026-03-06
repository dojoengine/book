---
title: "Dojo Client SDKs"
description: "Overview of client SDKs for building Dojo applications"
---

# Dojo SDK Architecture

Dojo provides a comprehensive suite of SDKs for building onchain games and applications across multiple platforms.
All SDKs share a unified foundation built on **dojo.c**, ensuring consistent functionality with platform-specific optimizations.

## Foundation-First Architecture

Rather than implementing blockchain logic separately in each SDK, all Dojo integrations build on dojo.c as a single foundation.
This ensures consistent behavior, shared bug fixes, and optimal performance across all platforms.

The Dojo SDK ecosystem is built on a two-layer foundation that ensures both consistency and type safety across all platforms.

### Layer 1: Cainome - Type-Safe Binding Generation

**Cainome** generates type-safe bindings from Cairo contract ABIs, providing the compile-time foundation for all SDK interactions.

**Key capabilities:**

- **ABI Parsing**: Converts Cairo contract ABIs into platform-specific type definitions
- **Type Safety**: Ensures compile-time guarantees for contract interactions
- **Multi-Language Support**: Generates bindings for Rust, TypeScript, C#, and other languages
- **Serialization Handling**: Automatically handles Cairo ↔ native type conversions

### Layer 2: dojo.c - Runtime Blockchain Integration

**dojo.c** provides the runtime foundation that handles all blockchain interactions across platforms.
Implementing in Rust provides the following advantages:

- **Memory Safety**: Eliminates classes of bugs (buffer overflows, use-after-free, etc.)
- **Performance**: Zero-cost abstractions compile to optimal machine code
- **Concurrency**: Safe async/await and threading without data races
- **Ecosystem**: Built on battle-tested Rust libraries (tokio, serde, starknet-rs)
- **Cross-Platform**: Single codebase compiles to all target platforms

**Key capabilities:**

- **Account Management**: Support for controller accounts, session accounts, and burner wallets
- **Transaction Handling**: Sign and execute transactions with proper gas estimation
- **Torii Client Integration**: Query entities, subscribe to real-time updates, and sync world state
- **Cross-Platform Compatibility**: Compiles to both native binaries (via C bindings) and WebAssembly

**Dual Compilation Strategy:**

- **Native Platforms**: Uses `cbindgen` to generate C headers for Unity, Unreal, and other native integrations
- **Web Platforms**: Uses `wasm-bindgen` to generate WebAssembly modules for JavaScript/TypeScript applications

```
dojo.c Repository (Rust Implementation)
├── Core Rust Logic (types.rs, utils.rs, constants.rs)
├── Conditional Compilation:
│   ├── Native Target → C Bindings (cbindgen)
│   └── WASM Target → JavaScript Bindings (wasm-bindgen)
└── Generated Outputs:
    ├── libdojo_c.{so,dylib,dll} + dojo.h
    └── dojo_c.js + dojo_c.wasm
```

The key insight: **two interfaces, one implementation**.
Both C and WASM APIs share identical Rust core logic, ensuring consistency.

The two interfaces are designed for different use cases:

#### C Bindings API

**Target**: Native platform integrations, custom SDKs, maximum performance

- **Style**: Procedural C functions with callback-based async operations
- **Use Cases**: Building Unity/Unreal plugins, system-level integrations
- **Memory Management**: Manual with explicit cleanup functions
- **Threading**: Callback-driven with internal runtime management

#### WASM JavaScript API

**Target**: Web applications, Node.js, rapid prototyping

- **Style**: Modern async/await with object-oriented design
- **Use Cases**: Browser games, web apps, Node.js backends, testing
- **Memory Management**: Automatic garbage collection
- **Threading**: Promise-based with native async support

### The Complete Foundation

**Cainome** (compile-time) + **dojo.c** (runtime) = **Complete SDK Foundation**

This two-layer architecture ensures that:

- Contract interactions are type-safe and validated at compile time (Cainome)
- Blockchain operations are consistent and optimized at runtime (dojo.c)
- Platform SDKs can focus on providing idiomatic APIs for their ecosystems

## Common Patterns

Regardless of which SDK you choose, all Dojo applications follow similar patterns:

### Core Game Loop

```
Client → SDK → Katana (sequencer) → Torii (indexer) → SDK → Client
```

All SDKs provide mechanisms to send transactions and query entities from your world.
Player actions in the client are translated by the SDK into transactions that are sent to the sequencer.
The sequencer executes the transactions and the indexer updates the world state.
The client can then query the world state to get the latest state, which is then rendered to the user.

### Account Management

- **Session Accounts**: Temporary accounts for seamless gameplay
- **Controller Accounts**: Delegate specific permissions to game contracts
- **Burner Accounts**: Disposable accounts funded by a master account

### Transaction Flow

1. **Prepare**: Build transaction calls using contract bindings
2. **Sign**: Use account credentials to sign transaction
3. **Execute**: Submit transaction to Katana sequencer
4. **Wait**: Monitor transaction status and confirmation
5. **Sync**: Update local state with new world state

## Platform-Specific SDKs

### Production Ready

#### JavaScript/TypeScript SDK

**Best for:** Web applications, React/Vue/Svelte apps, Node.js backends

- Full-featured SDK with React hooks and state management
- Multiple examples: Vanilla JS, React, Vue, Svelte, Phaser integration
- Real-time entity synchronization with RECS (Reactive Entity Component System)
- Built-in support for wallet connections and burner accounts

#### Unity SDK

**Best for:** 2D and 3D games, cross-platform game development

- Native C# bindings built on dojo.c foundation
- Unity-specific components and prefabs for common patterns
- Support for WebGL, desktop, and mobile platforms
- Integrated world state synchronization with Unity's component system

### Active Development

#### Bevy SDK

**Best for:** Rust-based game development

- ECS-native integration with Bevy's component system
- Rust-first development experience with compile-time safety
- Direct access to dojo.c functionality without FFI overhead

#### Unreal Engine SDK

**Best for:** High-fidelity 3D games and applications

- C++ integration with Unreal's Blueprint system
- Support for complex game mechanics and AAA-quality experiences
- Native performance with dojo.c foundation

### Experimental

#### C/C++ Bindings

**Best for:** Custom integrations, maximum performance requirements

- Direct access to dojo.c API without additional abstraction layers
- Full control over memory management and optimization
- Foundation for building custom SDK wrappers

#### Native Rust Integration

**Best for:** Rust applications requiring direct Dojo integration

- Import Dojo as a native Rust crate
- Zero-cost abstractions with compile-time optimization
- Suitable for high-performance backends and custom tooling

## Telegram Mini Apps

Build fully on-chain games and applications that run seamlessly within Telegram using Dojo and the [Cartridge Controller](https://docs.cartridge.gg/controller/overview).

Telegram [Mini Apps](https://core.telegram.org/bots/webapps) are web applications that run directly inside Telegram, providing users with rich, interactive experiences directly inside the messaging platform.

### Architecture Overview

A typical Dojo Telegram app consists of:

1. **Frontend**: React-based web app using the Telegram SDK
2. **Wallet Integration**: Cartridge Controller for account management
3. **Blockchain Layer**: Dojo smart contracts on Starknet
4. **State Management**: Torii client for real-time entity subscriptions

### Getting Started

#### Prerequisites

Before building your Telegram Mini App, ensure you have a Bot Token from [@BotFather](https://t.me/botfather).

:::tip
See the [Dojo.js docs](./javascript) for more information about using Dojo with React.
:::

#### Quick Start

::::steps

##### Create Your Project

Set up a new React project with Vite:

```bash
pnpm create vite my-telegram-dojo-app --template react-ts
cd my-telegram-dojo-app && pnpm install
```

##### Install Dependencies

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

##### Configure Vite

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

##### Initialize the Application

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

### Account Management with Controller

#### Session Key Management

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

### Dojo Integration

#### Game Actions

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

#### Torii Client Setup

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

#### Entity Queries and Subscriptions

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

#### Telegram-Specific Features

```typescript
const viewport = useViewport();
useEffect(() => {
    viewport?.expand(); // Expand Mini App viewport
}, [viewport]);
```

**Complete Implementation**: [`src/App.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/App.tsx)

### Deployment and Testing

#### Telegram Bot Setup

1. Message [@BotFather](https://t.me/botfather) to create a new bot
2. Use `/newapp` command to create a Mini App
3. Set the Web App URL to your development or production URL
4. Configure the bot description and about text

#### Local Development

```bash
pnpm run dev           # Start development server
npx ngrok http 5173    # Create HTTPS tunnel for Telegram
```

#### Production Deployment

```bash
pnpm run build && npx vercel
```

### Complete Example

**[Beast Slayers](https://github.com/cartridge-gg/beast-slayers/blob/main)** is a fully functional Telegram Mini App that demonstrates:

- **Account Management**: [`src/hooks/useAccount.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useAccount.tsx) - Session keys & cloud storage
- **Real-time State**: [`src/hooks/useBeast.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/hooks/useBeast.tsx) - Entity subscriptions and live updates
- **Game Actions**: [`src/App.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/App.tsx) - Session-based transaction execution
- **Telegram Integration**: [`src/main.tsx`](https://github.com/cartridge-gg/beast-slayers/blob/main/src/main.tsx) - SDKProvider and routing setup
- **Dependencies**: [`package.json`](https://github.com/cartridge-gg/beast-slayers/blob/main/package.json) - Complete package configuration

The game showcases how to build engaging blockchain-based experiences that feel native to the Telegram platform while leveraging Dojo's ECS architecture.

## Choosing the Right SDK

| Platform/Framework       | Recommended SDK       | Maturity Level        |
| ------------------------ | --------------------- | --------------------- |
| Web (React, Vue, Svelte) | JavaScript/TypeScript | ✅ Production         |
| Unity Games              | Unity SDK             | ✅ Production         |
| Bevy Games               | Bevy SDK              | 🔄 Active Development |
| Unreal Engine            | Unreal SDK            | 🔄 Active Development |
| Custom C/C++             | C Bindings            | ⚗️ Experimental       |
| Rust Applications        | Native Rust           | ⚗️ Experimental       |

## Getting Started

To begin development with any Dojo SDK:

1. **Set up your development environment** with Katana and Torii
2. **Choose your SDK** based on your platform and requirements
3. **Follow the platform-specific setup guide** linked below
4. **Explore examples** to understand integration patterns

### Quick Links

- [JavaScript/TypeScript SDK →](./javascript)
- [Unity SDK →](./unity)
- [Bevy SDK →](./bevy)
- [Unreal Engine SDK →](./unrealengine)
- [C Bindings →](./c)
- [Rust Integration →](./rust)

## Architecture Benefits

This foundation-first approach provides several key advantages:

- **Consistency**: Core blockchain logic is identical across all platforms
- **Maintainability**: Bug fixes and features in dojo.c benefit all SDKs
- **Performance**: Native compilation ensures optimal performance on each platform
- **Interoperability**: Applications built with different SDKs can interact seamlessly
- **Rapid Development**: New platform support can be added by wrapping dojo.c
