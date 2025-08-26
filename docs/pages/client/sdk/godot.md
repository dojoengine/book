---
title: "Dojo Godot SDK"
description: "Introduction to the official Godot Engine SDK for building Dojo-powered games"
---

# Dojo.godot

Godot Engine is a free, open-source cross-platform game engine renowned for its flexibility, ease of use, and powerful scene system.
With its intuitive node-based architecture, GDScript scripting language, and robust 2D and 3D capabilities, Godot empowers developers to create everything from indie platformers to complex multiplayer experiences.

Dojo.godot is the official Godot Engine SDK for building onchain games powered by Dojo.
This GDExtension seamlessly integrates blockchain functionality into your Godot projects, enabling you to create fully decentralized games without compromising on performance or developer experience.

## Core Concepts

### ToriiClient

The `ToriiClient` is your gateway to the Dojo world, managing all communication with the blockchain indexer.

Key responsibilities:
- **Connection Management**: Establish and maintain connections to Torii servers
- **Entity Queries**: Fetch game entities and their associated models from the blockchain
- **Event Subscriptions**: Subscribe to real-time blockchain events and entity updates

The ToriiClient operates as a singleton, ensuring consistent state across your entire game.

### ControllerAccount

The `ControllerAccount` handles all transaction-related operations and wallet management.

Core features:
- **Wallet Authentication**: Secure connection to Cartridge Controller accounts
- **Transaction Execution**: Execute smart contract calls with proper signing
- **Session Management**: Maintain authenticated sessions with configurable policies

### DojoCall Resources

`DojoCall` resources encapsulate smart contract function calls in a Godot-native format.

Structure:
- **Contract Address (`to`)**: The target smart contract address
- **Function Selector**: The name of the function to call
- **Call Data**: Array of parameters to pass to the function

These resources can be created and configured directly in the Godot editor, making smart contract integration visual and intuitive.

### Cairo Type System

Dojo.godot automatically handles conversions between Cairo types and Godot equivalents:

- **Primitives**: `u8`, `u16`, `u32`, `u64`, `u128`, `u256`, `felt252` map to Godot integers and strings
- **Structures**: Cairo structs convert to Godot dictionaries with proper field mapping
- **Arrays**: Cairo arrays become Godot Arrays with automatic element conversion
- **Enums**: Cairo enums map to Godot integers with enumeration support
- **Special Types**: `Vec2` structs automatically convert to Godot's `Vector2` type

## Getting Started

::::steps

#### Prerequisites

Before getting started, ensure you have:
- [Godot Engine](https://godotengine.org/download) `>= 4.2`
- [Rust](https://www.rust-lang.org/tools/install) toolchain
- [SCons](https://scons.org/pages/download.html) build system
- A C++17 compatible compiler (GCC, Clang, or MSVC)
- A working [Dojo project](/getting-started) with deployed contracts
- Basic familiarity with [GDScript](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html)

#### Build the Extension

Clone and build the Dojo.godot extension:

```bash
git clone --recurse-submodules https://github.com/lonewolftechnology/godot-dojo
cd godot-dojo

# Build for your platform
scons platform=linux target=template_release    # Linux
scons platform=windows target=template_release  # Windows
scons platform=macos target=template_release    # macOS
```

The compiled extension will be output to the `bin/` directory.

#### Create Your Godot Project

1. Create a new Godot project or open an existing one
2. Copy the `bin/` directory and `godot-dojo.gdextension` file to your project root
3. Restart Godot to load the extension

#### Set Up Connection Management

Create an autoload script to manage your blockchain connections:

```gdscript
# autoload/connection.gd
extends Node

signal connected

@onready var client: ToriiClient = $ToriiClient
@onready var controller_account: ControllerAccount = $ControllerAccount

func _ready() -> void:
    # Configure the client
    client.torii_url = "http://localhost:8080"  # or your Torii server
    client.world_address = "0x..." # Your world contract address

    # Connect signals
    client.client_connected.connect(_on_client_connected)
    controller_account.controller_connected.connect(_on_controller_connected)

func connect_client() -> void:
    client.create_client()

func connect_controller() -> void:
    controller_account.setup()

func _on_client_connected(success: bool) -> void:
    if success:
        connect_controller()

func _on_controller_connected(success: bool) -> void:
    if success:
        connected.emit()
```

::::

## Basic Usage

### Connecting to Dojo

Start by establishing connections to both Torii and the Controller:

```gdscript
# In your main game script
extends Node

func _ready() -> void:
    # Wait for connection autoload to be ready
    await get_tree().process_frame
    Connection.connected.connect(_on_dojo_connected)
    Connection.connect_client()

func _on_dojo_connected() -> void:
    print("Successfully connected to Dojo!")
    # Now you can interact with the blockchain
    setup_subscriptions()
    query_entities()
```

### Creating Contract Calls

Define your contract interactions using DojoCall resources:

```gdscript
# Create a spawn action
@export var spawn_call: DojoCall

func _ready() -> void:
    # Configure the call (or use .tres resource files)
    spawn_call = DojoCall.new()
    spawn_call.to = "0x..." # Contract address
    spawn_call.selector = "spawn"
    spawn_call.calldata = [] # Parameters array

func spawn_player() -> void:
    Connection.controller_account.execute_from_outside(spawn_call)
```

### Subscribing to Events

Listen for blockchain events in real-time:

```gdscript
func setup_subscriptions() -> void:
    # Subscribe to all events
    Connection.client.create_event_subscription(_on_events, {})

    # Subscribe to entity updates
    Connection.client.create_entity_subscription(_on_entities, {})

func _on_events(event_data: Dictionary) -> void:
    print("Received event: ", event_data)
    # Handle event data - structure depends on your contracts
    var data = event_data["data"]
    for entry in data:
        process_event_entry(entry)

func _on_entities(entity_data: Dictionary) -> void:
    print("Entity updated: ", entity_data)
    # Handle entity updates - structure depends on your models
    var data = entity_data["data"]
    for entry in data:
        process_entity_update(entry)
```

### Querying Entities

Fetch current blockchain state:

```gdscript
func query_players() -> void:
    var query = {
        "pagination": {
            "limit": 10,
            "cursor": "",
            "order_by": [],
            "direction": ToriiClient.QueryPaginationDirection.FORWARD
        },
        "clause": null,
        "no_hashed_keys": true,
        "models": [],
        "historical": false
    }

    var entities = Connection.client.get_entities(query)
    for entity in entities:
        process_entity(entity)

func process_entity(entity: Dictionary) -> void:
    for model in entity.models:
        for key in model:
            var data = model[key]
            # Process based on your model structure
            if data.has("Vec2"):
                var position = Vector2(data["Vec2"]["x"], data["Vec2"]["y"])
                update_player_position(data["player"], position)
```

## Advanced Features

### Using Resource Files

Create reusable DojoCall resources in the Godot editor:

1. In the FileSystem dock, right-click and select `New Resource`
2. Choose `DojoCall` as the resource type
3. Configure the properties in the Inspector:
   - **To**: Contract address
   - **Selector**: Function name
   - **Calldata**: Parameter array
4. Save as `.tres` file

### Managing Policies

Configure controller permissions using DojoPolicies resources:

```gdscript
# Create policy resource
var policy = DojoPolicy.new()
policy.target = "0x..." # Contract address
policy.method = "move"

var policies = DojoPolicies.new()
policies.name = "game_actions"
policies.contract = "0x..." # Contract address
policies.policies = [policy]

# Use with controller account
controller_account.create(policies)
```

### Type Conversion

Dojo.godot handles type conversion automatically:

```gdscript
# Cairo Vec2 becomes Godot Vector2
func handle_position_update(data: Dictionary) -> void:
    if data.has("Vec2"):
        var position = Vector2(data["Vec2"]["x"], data["Vec2"]["y"])
        player.position = position

# Enums convert to integers
enum Direction { LEFT, RIGHT, UP, DOWN }

func move_player(direction: Direction) -> void:
    move_call.calldata = [direction] # Automatically converts to felt252
    controller_account.execute_from_outside(move_call)
```

## Building and Deployment

### Development Builds

For development, use debug builds to enable logging:

```bash
scons platform=linux target=template_debug
```

Set environment variables in your game for detailed logging:

```gdscript
func _ready() -> void:
    OS.set_environment("RUST_BACKTRACE", "full")
    OS.set_environment("RUST_LOG", "debug")
```

### Production Builds

Create optimized builds for distribution:

```bash
scons platform=linux target=template_release
scons platform=windows target=template_release
scons platform=macos target=template_release
```

### WebAssembly Support

Build for web deployment (experimental):

```bash
scons platform=web target=template_release
```

Note that WebAssembly builds may have limitations compared to native platforms.

## Example Project

The [Dojo.godot repository](https://github.com/lonewolftechnology/godot-dojo) includes a complete demo project showcasing:

- **Player Movement**: Onchain player spawning and movement using arrow keys
- **Real-time Updates**: Live synchronization between blockchain state and game visuals
- **Controller Integration**: Seamless wallet authentication and transaction signing
- **Event Handling**: Processing both events and entity updates from subscriptions

To run the demo:

1. Set up a local [Dojo Starter](/tutorials/dojo-starter) environment
2. Build the Dojo.godot extension following the instructions above
3. Open the `demo` folder in Godot and run the project

The demo connects to a live testnet deployment, demonstrating real blockchain integration in a simple 2D movement game.

## Troubleshooting

Enable detailed logging for troubleshooting:

```gdscript
func _ready() -> void:
    OS.set_environment("RUST_LOG", "debug,tokio=info,hyper=info")
    OS.set_environment("RUST_BACKTRACE", "full")
```

Check the Godot console for detailed error messages and stack traces.
