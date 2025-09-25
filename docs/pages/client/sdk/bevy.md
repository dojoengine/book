---
title: "Dojo Bevy SDK"
description: "Official Bevy engine integration for building Dojo-powered games with native Rust performance"
---

# Dojo.bevy

Bevy is a modern, data-driven game engine built in Rust that leverages the Entity Component System (ECS) architecture.
Known for its performance, modularity, and ergonomic API, Bevy enables developers to create everything from simple 2D games to complex 3D experiences with compile-time safety and zero-cost abstractions.

Dojo.bevy is the official Bevy engine SDK for interacting with Dojo worlds, providing native Rust integration for building high-performance onchain games.
Built specifically for Bevy's ECS architecture, it seamlessly integrates with Bevy's component system while maintaining the performance and safety guarantees that Rust developers expect.

## Core Concepts

Before diving into building onchain games with Bevy, let's explore the essential components of the Dojo.bevy architecture:

### `DojoPlugin`

The **`DojoPlugin`** is the central Bevy plugin that manages all connections to Torii and Starknet.
It handles async task coordination and event emission within Bevy's single-threaded execution model.

```rust
use bevy::prelude::*;
use dojo_bevy_plugin::DojoPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(DojoPlugin) // Add the Dojo plugin
        .run();
}
```

### `DojoResource`

The **`DojoResource`** serves as the main interface for all Dojo operations.
It manages connections to both Torii (for querying entities) and Starknet (for executing transactions).

```rust
use dojo_bevy_plugin::{DojoResource, TokioRuntime};

fn connect_to_dojo(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>
) {
    // Connect to Torii indexer
    dojo.connect_torii(&tokio, "http://localhost:8080".to_string(), world_address);

    // Connect to Starknet using predeployed account
    dojo.connect_predeployed_account(&tokio, "http://localhost:5050".to_string(), 0);
}
```

### Event System

Dojo.bevy leverages Bevy's event system for reactive blockchain interactions:

- **`DojoInitializedEvent`**: Emitted when connections to Torii and Starknet are established
- **`DojoEntityUpdated`**: Emitted when entity state changes are received from Torii

```rust
use dojo_bevy_plugin::{DojoInitializedEvent, DojoEntityUpdated};

fn handle_dojo_events(
    mut ev_initialized: EventReader<DojoInitializedEvent>,
    mut ev_entity_updated: EventReader<DojoEntityUpdated>,
) {
    for _ in ev_initialized.read() {
        info!("Dojo connections established!");
    }

    for ev in ev_entity_updated.read() {
        info!("Entity {} updated with {} models", ev.entity_id, ev.models.len());
    }
}
```

### `TokioRuntime`

The **`TokioRuntime`** resource provides async execution capabilities within Bevy's single-threaded environment.
This is essential for blockchain operations that require asynchronous processing.

## Getting Started

### Prerequisites

Before getting started, ensure you have:

- [Rust](https://rustup.rs/) `>= 1.70.0` installed
- [Bevy](https://bevyengine.org/) `>= 0.16.0` in your project

### Installation

Add dojo.bevy to your `Cargo.toml`:

```toml
[dependencies]
starknet = "0.16"
bevy = "0.16.0"
dojo_bevy_plugin = { git = "https://github.com/dojoengine/dojo.bevy" }
tokio = { version = "1.0", features = ["full"] }
```

### Basic Setup

Create a basic Bevy application with Dojo integration:

```rust
use bevy::prelude::*;
use dojo_bevy_plugin::{
    DojoPlugin, DojoResource, TokioRuntime,
    DojoInitializedEvent, DojoEntityUpdated
};
use starknet::core::types::Felt;

// Your world and contract addresses (from sozo migrate output)
const WORLD_ADDRESS: Felt = Felt::from_hex_unchecked("0x07cb61df...");
const TORII_URL: &str = "http://localhost:8080";
const KATANA_URL: &str = "http://localhost:5050";

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(DojoPlugin)
        .init_resource::<DojoResource>()
        .init_resource::<TokioRuntime>()
        .add_systems(Startup, setup_dojo)
        .add_systems(Update, handle_dojo_events)
        .run();
}

fn setup_dojo(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>
) {
    // Initialize connections
    dojo.connect_torii(&tokio, TORII_URL.to_string(), WORLD_ADDRESS);
    dojo.connect_predeployed_account(&tokio, KATANA_URL.to_string(), 0);
}

fn handle_dojo_events(
    mut ev_initialized: EventReader<DojoInitializedEvent>,
    mut ev_entity_updated: EventReader<DojoEntityUpdated>,
) {
    for _ in ev_initialized.read() {
        info!("Dojo initialized successfully!");
    }

    for ev in ev_entity_updated.read() {
        info!("Entity {} updated", ev.entity_id);
    }
}
```

## Usage Patterns

### Querying Entities

Fetch entities from your Dojo world using Torii queries:

```rust
use torii_grpc_client::types::{Query as ToriiQuery, Pagination, PaginationDirection};

fn fetch_entities(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    if keyboard.just_pressed(KeyCode::KeyF) {
        let query = ToriiQuery {
            clause: None,
            pagination: Pagination {
                limit: 100,
                cursor: None,
                direction: PaginationDirection::Forward,
                order_by: vec![],
            },
            no_hashed_keys: false,
            models: vec![],
            historical: false,
        };

        dojo.queue_retrieve_entities(&tokio, query);
    }
}
```

### Subscribing to Updates

Set up real-time subscriptions to track entity changes:

```rust
fn setup_subscriptions(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    if keyboard.just_pressed(KeyCode::KeyS) {
        // Subscribe to all position updates
        dojo.subscribe_entities(&tokio, "position_updates".to_string(), None);
    }
}
```

### Executing Transactions

Send transactions to your Dojo systems:

```rust
use starknet::core::types::Call;
use starknet::macros::selector;

// Contract addresses from your deployment
const ACTION_ADDRESS: Felt = Felt::from_hex_unchecked("0x0693bc04...");

fn handle_player_actions(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    if keyboard.just_pressed(KeyCode::Space) {
        // Spawn a new entity
        let spawn_call = Call {
            to: ACTION_ADDRESS,
            selector: selector!("spawn"),
            calldata: vec![],
        };

        dojo.queue_tx(&tokio, vec![spawn_call]);
    }

    if keyboard.just_pressed(KeyCode::ArrowLeft) {
        // Move entity left
        let move_call = Call {
            to: ACTION_ADDRESS,
            selector: selector!("move"),
            calldata: vec![Felt::from(0u32)], // Direction: Left
        };

        dojo.queue_tx(&tokio, vec![move_call]);
    }
}
```

## Example Game

Here's a pedagogical example showing the key concepts for a 3D game where players can spawn and move cubes:

```rust
use bevy::prelude::*;
use dojo_bevy_plugin::{
    DojoPlugin, DojoResource, TokioRuntime,
    DojoInitializedEvent, DojoEntityUpdated
};
use starknet::core::types::{Call, Felt};
use starknet::macros::selector;

// Configuration constants
const WORLD_ADDRESS: Felt = Felt::from_hex_unchecked("0x07cb61df...");
const ACTION_ADDRESS: Felt = Felt::from_hex_unchecked("0x0693bc04...");

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(DojoPlugin)  // 1. Add the Dojo plugin
        .init_resource::<DojoResource>()
        .init_resource::<TokioRuntime>()
        .add_systems(Startup, setup_dojo)
        .add_systems(Update, (handle_keyboard_input, handle_dojo_events))
        .run();
}

fn setup_dojo(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>
) {
    // 2. Connect to Torii and Starknet
    dojo.connect_torii(&tokio, "http://localhost:8080".to_string(), WORLD_ADDRESS);
    dojo.connect_predeployed_account(&tokio, "http://localhost:5050".to_string(), 0);
}

fn handle_keyboard_input(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    if keyboard.just_pressed(KeyCode::Space) {
        // 3. Execute transactions
        let spawn_call = Call {
            to: ACTION_ADDRESS,
            selector: selector!("spawn"),
            calldata: vec![],
        };
        dojo.queue_tx(&tokio, vec![spawn_call]);
    }
}

fn handle_dojo_events(
    mut ev_initialized: EventReader<DojoInitializedEvent>,
    mut ev_entity_updated: EventReader<DojoEntityUpdated>,
) {
    // 4. React to blockchain events
    for _ in ev_initialized.read() {
        info!("Connected to Dojo world!");
    }

    for ev in ev_entity_updated.read() {
        info!("Entity {} updated with {} models", ev.entity_id, ev.models.len());
        // Process entity updates and sync with Bevy components
    }
}
```

### Key Learning Points

1. **Plugin Integration**: Add `DojoPlugin` to enable blockchain connectivity
2. **Resource Management**: Use `DojoResource` and `TokioRuntime` for async operations
3. **Transaction Execution**: Queue transactions with `dojo.queue_tx()`
4. **Event Handling**: React to `DojoInitializedEvent` and `DojoEntityUpdated` events

For a complete implementation including 3D rendering, entity tracking, and full game logic, see the [full example](https://github.com/dojoengine/dojo.bevy/blob/main/examples/intro.rs).

## Advanced Features

### Account Management

For production applications, you'll want to use custom accounts instead of predeployed ones:

```rust
fn setup_custom_account(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>
) {
    let account_address = Felt::from_hex("0x1234...").unwrap();
    let private_key = Felt::from_hex("0x5678...").unwrap();

    dojo.connect_account(
        &tokio,
        "https://api.cartridge.gg/x/your-game/katana".to_string(),
        account_address,
        private_key
    );
}
```

### Batch Transactions

Execute multiple system calls in a single transaction:

```rust
fn batch_operations(
    mut dojo: ResMut<DojoResource>,
    tokio: Res<TokioRuntime>
) {
    let calls = vec![
        Call {
            to: ACTION_ADDRESS,
            selector: selector!("spawn"),
            calldata: vec![],
        },
        Call {
            to: ACTION_ADDRESS,
            selector: selector!("move"),
            calldata: vec![Felt::from(1u32)],
        },
    ];

    dojo.queue_tx(&tokio, calls);
}
```

### Entity Management

- Use Bevy's change detection to minimize unnecessary updates
- Batch entity operations when possible
- Consider using Bevy's sparse sets for entities with optional components

```rust
fn optimized_position_updates(
    mut ev_position_updated: EventReader<PositionUpdatedEvent>,
    mut query: Query<&mut Transform, (With<Cube>, Changed<Transform>)>,
) {
    // Only process entities that have actually changed
    for ev in ev_position_updated.read() {
        // Update logic here
    }
}
```

## Troubleshooting

Enable debug logging to troubleshoot issues:

```rust
use bevy::log::LogPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins.set(LogPlugin {
            level: bevy::log::Level::DEBUG,
            ..default()
        }))
        .add_plugins(DojoPlugin)
        .run();
}
```
