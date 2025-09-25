---
title: "Dojo Client SDKs"
description: "Overview of client SDKs for building Dojo applications"
---

# Dojo SDK Architecture

Dojo provides a comprehensive suite of SDKs for building onchain games and applications across multiple platforms.
All SDKs share a unified foundation built on **dojo.c**, ensuring consistent functionality with platform-specific optimizations.

## Foundation-First Architecture

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

**Key capabilities:**

- **Account Management**: Support for controller accounts, session accounts, and burner wallets
- **Transaction Handling**: Sign and execute transactions with proper gas estimation
- **Torii Client Integration**: Query entities, subscribe to real-time updates, and sync world state
- **Cross-Platform Compatibility**: Compiles to both native binaries (via C bindings) and WebAssembly

**Dual Compilation Strategy:**

- **Native Platforms**: Uses `cbindgen` to generate C headers for Unity, Unreal, and other native integrations
- **Web Platforms**: Uses `wasm-bindgen` to generate WebAssembly modules for JavaScript/TypeScript applications

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
