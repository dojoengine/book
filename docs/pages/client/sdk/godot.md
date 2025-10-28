---
title: "Dojo Godot SDK"
description: "Introduction to the official Godot Engine SDK for building Dojo-powered games"
---

# Dojo.godot

Godot Engine is a free, open-source cross-platform game engine renowned for its flexibility, ease of use, and powerful scene system.
With its intuitive node-based architecture, GDScript scripting language, and robust 2D and 3D capabilities, Godot empowers developers to create everything from indie platformers to complex multiplayer experiences.

Dojo.godot is the official Godot Engine SDK for building onchain games powered by Dojo.
This GDExtension seamlessly integrates blockchain functionality into your Godot projects, enabling you to create fully decentralized games without compromising on performance or developer experience.

:::info
If there is something that is not covered here, please refer to the in-editor documentation.

You can access it by pressing Ctrl + Left Click on a class name, or by pressing F1 and using the search bar.
:::

## Core Concepts

### ToriiClient

The `ToriiClient` is your gateway to the Dojo world, managing all communication with the blockchain indexer.

Key responsibilities:

- **Connection Management**: Establish and maintain connections to Torii servers
- **Entity Queries**: Fetch game entities and their associated models from the blockchain
- **Event Subscriptions**: Subscribe to real-time blockchain events and entity updates

### ControllerAccount

The `ControllerAccount` handles all transaction-related operations and wallet management.

Core features:

- **Wallet Authentication**: Secure connection to Cartridge Controller accounts
- **Transaction Execution**: Execute smart contract calls with proper signing
- **Session Management**: Maintain authenticated sessions with configurable policies

:::warning
With [dojo.c](https://github.com/dojoengine/dojo.c)
ControllerAccount will likely be deprecated or heavily modified as controller session related logic is moved to [controller.c](https://docs.cartridge.gg/controller/native-integration#controllerc)
:::

### Dojo Calls

Used for smart contract function calls.

Structure:

- **Contract Address (`to`)**: The address of the target smart contract.
- **Function Selector**: The name of the function to call.
- **Call Data**: An array of parameters to pass to the function.

:::info

The `calldata` is an array and an optional parameter.

If the function in your contract doesn't take arguments, otherwise it has to be inside an array.

Calldata is always flattened, with means that if it has other arrays inside, they will be merge into a single array.

:::

### Cairo Type System

Dojo.godot automatically handles conversions between Cairo types and Godot equivalents:

- **Primitives**: `u8`, `u16`, `u32`, `u64`, `u128`, `u256`, `felt252` map to Godot integers and strings
- **Structures**: Cairo structs convert to Godot dictionaries with proper field mapping
- **Arrays**: Cairo arrays become Godot Arrays with automatic element conversion
- **Enums**: Cairo enums map to Godot integers with enumeration support
- **Special Types**: `Vec2` structs automatically convert to Godot's `Vector2` type

:::info

Godot doesn't natively support bigint like i128, u128 and u256,
but the extension supports it and uses wrapper classes to store and show the data.

I128, U128 and U256 wrappers can be directly used inside the calldata array.

:::

## Getting Started

::::steps

#### Download the latest version

Go to the [release page](https://github.com/lonewolftechnology/godot-dojo/releases) and download the latest version

#### Create Your Godot Project

Create a new Godot project

#### Install the GDExtension

Copy the files you downloaded into an ‘addons’ folder. If it doesn’t exist, create one as a child of the root folder

#### Connecting to Dojo

Add a `ToriiClient` and `ControllerAccount` nodes to your scene

Configure the client and controller by completing the fields from the inspector. You can also configure it from the project settings, which will be used if the inspector fields are empty

:::note
The parameters for `ControllerAccount` and `ToriiClient` can be set in three ways, from the top of the list is the priority list:

- As function parameter
- Using the editor inspector or by code
- Configured on ProjectSettings
  :::

:::info
`ControllerAccount.setup()` is a utility function, it uses `init_provider()` and `create(policies)`.

So if you want to set the policies using parameters instead of the editor inspector or ProjectSettings, you **need** to use them separately and initialize the provider first.
:::

:::code-group

```gdscript [Torii 1.7.x]

func _ready() -> void:
    # Another way of configuring the nodes is from code. This takes precedence over the other previous
    client.torii_url = "http://localhost:8080"  # or your Torii server
    client.world_address = "0x..." # Your world contract address

    # Connect signals
    client.client_connected.connect(_on_client_connected)
    controller_account.controller_connected.connect(_on_controller_connected)

func connect_client() -> void:
    # create a new client
    client.create_client()

func connect_controller() -> void:
    controller_account.setup()

func _on_client_connected(success: bool) -> void:
    if success:
        # connect the controller after successfully connecting the client
        connect_controller()

func _on_controller_connected(success: bool) -> void:
    if success:
        start_game()
```

```gdscript [Torii 1.8.x]

func _ready() -> void:
    # Another way of configuring the nodes is from code. This takes precedence over the other previous
    client.torii_url = "http://localhost:8080"  # or your Torii server

    # Connect signals
    client.client_connected.connect(_on_client_connected)
    controller_account.controller_connected.connect(_on_controller_connected)

func connect_client() -> void:
    # create a new client
    client.create_client()

func connect_controller() -> void:
    controller_account.setup()

func _on_client_connected(success: bool) -> void:
    if success:
        # connect the controller after successfully connecting the client
        connect_controller()

func _on_controller_connected(success: bool) -> void:
    if success:
        start_game()
```

:::

::::

### Creating Contract Calls

When creating calls, you need the contract address, the selector/function name and call arguments.

:::info
If your function uses a custom type defined on your contract, you need to send all members in order insidea an array or directly on the calldata array.

In the example a Vector3 is used, but it works with any type defined on your contract.

```gdscript
var new_pos:Vector3 = Vector3(6, 2.5, -6)
var position:Array = [new_pos.x, new_pos.y, new_pos.z]
var direction:int = Directions.LEFT

func move_to(_position:Array, _direction:int) -> void:
    var data = _position
    data.append(_direction)

    controller_account.execute_from_outside(
        "0x...",
        "move",
        data
    )
    # or
    controller_account.execute_from_outside(
        "0x...",
        "move",
        [_position, _direction]
    )

```

:::

:::code-group

```gdscript [ControllerAccount]
func spawn_player() -> void:
    controller_account.execute_from_outside("0x...", "spawn")

func move_player(position:int) -> void:
    controller_account.execute_raw("0x...", "move", [position])

```

```gdcript [Account]
func spawn_player() -> void:
    account.execute_raw("0x...", "spawn", [0])

func move_player(position:int) -> void:
    account.execute_raw("0x...", "move", [position])

```

:::

### Subscriptions

Every subscription has its own resource, it contains all necessary data to create and update it.
It’s recommended to use the callable/callbacks instead of signals.

:::note

In Torii 1.8.x multiworld support was added, so all world addresses has to be set up inside the `Subscription` Resource.

Here we are covering `Event` subscription and `Entity` querying, but every query and subscription is used similarly.

Refer to in-editor documentation to see the rest.

:::

#### Subscribing to Events

Listen for blockchain events in real-time:

Every first parameter is a `Callable` wich can be a lambda function, constructed using Callable.new() to use a function of another object, or any function in the script.

```gdscript
# Configured in inspector
@export var entity_sub:EntitySubscription
@export var event_sub:EventSubscription

func setup_subscriptions() -> void:
    # Subscribe to all events
    torii_client.create_event_subscription(_on_events, event_sub)

    # Subscribe to entity updates
    torii_client.create_entity_subscription(_on_entities, entity_sub)

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
# Set in inspector
@export var query:DojoQuery
func query_players() -> void:
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

There are two types of custom resources: `Subscription` and `Query`.

The idea behind it is that all relevant data can be stored in disk and used as a base to setup subscriptions or build queries,
as this can be modified in runtime, it allows updating subscriptions and reusing the same query with additional parameters.

So you can create them manually

1. In the FileSystem dock, right-click and select `New Resource`
2. Choose `Subscription` or `Query` of choice as the resource type
3. Configure the properties in the Inspector:
4. Save as `.tres` file

:::note
Resources modified in-game do not preserve changes if not explicitly done, but is not recommended as it can be overwritten with updates as resources are part of game's .pck
:::

### Managing Policies

Policies are a `Dictionary` where the `key` is the method and the `value` its description:
It follows the same pattern of parameter priority: Parameter -> Property -> ProjectSettings

:::warning
In Torii 1.8.x was only tested with one world
:::

:::note
Contract addresses are fetched following the parameter priority
:::

```gdscript
# Create policy resource
var policy = DojoPolicy.new()
policy.target = "0x..." # Contract address
policy.method = "move"

var policies = {
    "move": "Move in the world"
}

# Use with controller account
controller_account.init_provider()
controller_account.create(policies)
```

### Type Conversion

Dojo.godot handles type conversion automatically:

In cases like the (Dojo Starter Contract)[github.com/dojoengine/dojo-starter] we used its custom struct `Vec2` to convert to Godot's `Vector2`.
So you can use this snippet but replace `Vec2` for the name of your custom datatype.

:::info
Cairo native types are converted to Godot's types automatically.
:::

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

We use scons build system as is what Godot uses, but a Cmake equivalent is placed so the extension can be developed using any modern IDE.
The extension compiles and places itself under _demo/addons/godot-dojo_.

As [dojo.c](https://github.com/dojoengine/dojo.c) 1.8.3, only `Linux`, `Windows` and `MacOS` are supported.
:::note
`Linux` and `Windows` builds are x86_64 only. You can build arm64 builds,
let us know if it works by opening an [issue](https://github.com/lonewolftechnology/godot-dojo/issues)
or by leaving a message on [`Dojo's Discord`](https://discord.gg/dojoengine) under the [`Godot section`](https://discord.com/channels/1062934010722005042/1151498928563437680).

`MacOS` builds are universal so it should work on Intel and Apple Silicon.
:::

### Editor builds

Since mobile support is in the works thanks to [controller.c](https://github.com/cartridge-gg/controller.c)
we've prepared the barebones, placeholders and some utility tools that are required to properly export the builds.

The editor builds contain code that only runs in-editor and is only found in-editor.

```bash
scons platform=linux target=editor
```

### Development Builds

For development, use debug builds to enable logging:

```bash
scons platform=linux target=template_debug
scons platform=windows target=template_debug
scons platform=macos target=template_debug
```

You can set environment variables in your game for detailed logging, but this is useful when developing the extension or reporting bugs:

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

## Example Project

The [Dojo.godot repository](https://github.com/lonewolftechnology/godot-dojo) includes a complete demo project showcasing:

- **Player Movement**: Onchain player spawning and movement using arrow keys
- **Real-time Updates**: Live synchronization between blockchain state and game visuals
- **Controller Integration**: Seamless wallet authentication and transaction signing
- **Event Handling**: Processing both events and entity updates from subscriptions

To run the demo:
:::note
The demo has a `Slot` configured to test it by just downloading the demo.

It uses a [custom contract](https://github.com/dannroda/dojo-starter) based on `dojo-starter` but with some testing/experimental things to test the extension.
:::

1. Set up a local [Dojo Starter](/tutorials/dojo-starter) environment
2. Build/download the Dojo.godot extension following the instructions above
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
