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

## Core Concepts

Before diving into platform-specific implementations, let's explore the essential concepts that apply across all Dojo SDKs:

### World Manager

The **World Manager** is the central hub for organizing and controlling entities within your Dojo world.

![world-manager](/client/unity/world-manager.webp)

During initialization, the World Manager receives configuration data that defines essential settings like your Torii URL, RPC URL, and world address.
While these settings are initially provided, you have the flexibility to adjust them for different environments.

![world-manager-data](/client/unity/world-manager-data.webp)

The World Manager simplifies entity management by offering methods to both add/remove entities and access them collectively or by individual identifiers.

### Synchronization Master

The Synchronization Master acts as the bridge between your client application and your Dojo world, seamlessly synchronizing and managing entities.

![sync-master](/client/unity/sync-master.webp)

Key Features:

- Control synchronization: Set the maximum number of entities to synchronize.

- Event-driven communication:
    - `OnSynchronized`: Notifies you when entities were successfully synchronized from Dojo world to your client.
    - `OnEntitySpawned`: Triggered whenever a new entity is spawned in the client environment.

- Dynamic entity management:
    - `SynchronizeEntities`: Asynchronously retrieves and spawns entities from the Dojo world in the client environment.
    - `HandleEntityUpdate`: Dynamically updates existing entities or spawns new ones based on changes received from the Dojo world, ensuring seamless synchronization.

### Contract Bindings

In order to link your Dojo code, written in Cairo, with your client code, we rely on something known as a "contract binding".
A contract binding is an automatically-generated "stub" allowing code in one language to call functions implemented in another language.

Dojo's Sozo CLI provides built-in support for contract bindings, through [Cainome](/toolchain/cainome).
You can learn more about Sozo's binding generation features [here](/toolchain/sozo/binding-generation).

## Common Patterns

For detailed implementation patterns including the core game loop, account management, and transaction flow that apply across all SDKs, see the [JavaScript SDK documentation](./javascript#common-patterns).

## Platform-Specific SDKs

### Production Ready

#### JavaScript/TypeScript SDK

**Best for:** Web applications, React/Vue/Svelte apps, Node.js backends

- Full-featured SDK with React hooks and state management
- Multiple examples: Vanilla JS, React, Vue, Svelte, Phaser integration
- Real-time entity synchronization with RECS (Reactive Entity Component System)
- Built-in support for wallet connections and burner accounts

[Learn more →](./javascript)

#### Unity SDK

**Best for:** 2D and 3D games, cross-platform game development

- Native C# bindings built on dojo.c foundation using C# P/Invoke
- Unity-specific components and prefabs for common patterns
- Support for WebGL, desktop, and mobile platforms
- Integrated world state synchronization with Unity's component system

[Learn more →](./unity)

### Active Development

#### Bevy SDK

**Best for:** Rust-based game development

- ECS-native integration with Bevy's component system
- Direct access to Dojo as a native Rust crate with zero FFI overhead
- Rust-first development experience with compile-time safety

[Learn more →](./bevy)

#### Godot SDK

**Best for:** Open-source game development with GDScript

- GDExtension integration built on dojo.c foundation
- Native performance with Godot's node-based architecture
- Cross-platform support for desktop and mobile

[Learn more →](./godot)

#### Unreal Engine SDK

**Best for:** High-fidelity 3D games and applications

- C++ integration with Unreal's Blueprint system
- Support for complex game mechanics and AAA-quality experiences
- Native performance with dojo.c foundation

[Learn more →](./unrealengine)

### Experimental

#### C/C++ Bindings

**Best for:** Custom integrations, maximum performance requirements

- Direct access to dojo.c API without additional abstraction layers
- Full control over memory management and optimization
- Foundation for building custom SDK wrappers

[Learn more →](./c)

#### Native Rust Integration

**Best for:** Rust applications requiring direct Dojo integration

- Import Dojo as a native Rust crate
- Zero-cost abstractions with compile-time optimization
- Suitable for high-performance backends and custom tooling

[Learn more →](./rust)

#### Telegram Mini Apps SDK

**Best for:** Lightweight games and applications within Telegram

- Simplified JavaScript SDK optimized for Telegram's runtime environment
- Built-in integration with Telegram's user authentication and payment systems
- Optimized for mobile-first experiences

[Learn more →](./telegram)

## Choosing the Right SDK

| Platform/Framework       | Recommended SDK       | Maturity Level        |
| ------------------------ | --------------------- | --------------------- |
| Web (React, Vue, Svelte) | JavaScript/TypeScript | ✅ Production         |
| Unity Games              | Unity SDK             | ✅ Production         |
| Bevy Games               | Bevy SDK              | 🔄 Active Development |
| Godot Games              | Godot SDK             | 🔄 Active Development |
| Unreal Engine            | Unreal SDK            | 🔄 Active Development |
| Telegram Mini Apps       | Telegram SDK          | 🔄 Active Development |
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
- [Godot SDK →](./godot)
- [Unreal Engine SDK →](./unrealengine)
- [Telegram Mini Apps SDK →](./telegram)
- [C Bindings →](./c)
- [Rust Integration →](./rust)

## Architecture Benefits

This foundation-first approach provides several key advantages:

- **Consistency**: Core blockchain logic is identical across all platforms
- **Maintainability**: Bug fixes and features in dojo.c benefit all SDKs
- **Performance**: Native compilation ensures optimal performance on each platform
- **Interoperability**: Applications built with different SDKs can interact seamlessly
- **Rapid Development**: New platform support can be added by wrapping dojo.c
