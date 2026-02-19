---
title: "Dojo Godot SDK"
description: "Introduction to the official Godot Engine SDK for building Dojo-powered games"
---

# Dojo.godot

Godot Engine is a free, open-source cross-platform game engine renowned for its flexibility, ease of use, and powerful scene system.
With its intuitive node-based architecture, GDScript scripting language, and robust 2D and 3D capabilities, Godot empowers developers to create everything from indie platformers to complex multiplayer experiences.

Dojo.godot is the official Godot Engine SDK for building onchain games powered by Dojo.
This GDExtension seamlessly integrates blockchain functionality into your Godot projects.
It enables you to create fully decentralized games without compromising on performance or developer experience.

:::tip
Always [Download](https://github.com/lonewolftechnology/godot-dojo/releases) the latest version.
:::
:::info
If there is something that is not covered here, please refer to the in-editor documentation.

You can access it by pressing Ctrl + Left Click on a class name, or by pressing F1 and using the search bar.
:::

## Core Concepts

### ToriiClient

The `ToriiClient` is your gateway to the Dojo world, managing all communication with the blockchain indexer.

Key responsibilities:

- **Connection Management**: Establish and maintain connections to Torii servers.
- **Entity Queries**: Fetch game entities and their associated models from the blockchain.
- **Event Subscriptions**: Subscribe to real-time blockchain events and entity updates.

### DojoSessionAccount

The `DojoSessionAccount` handles all transaction-related operations and wallet management.

Core features:

- **Wallet Authentication**: Secure connection to Cartridge Controller accounts.
- **Transaction Execution**: Execute smart contract calls with proper signing.
- **Session Management**: Maintain authenticated sessions with configurable policies.

### Dojo Calls

Used for smart contract function calls.

Structure:

- **Contract Address**: The address of the target smart contract.
- **Function Name (`entrypoint/method`)**: The name of the function to call.
- **Call Data**: An array of parameters to pass to the function.

### Helper Classes

Two helper classes were added to simplify common tasks:

- `ControllerHelper`: Provides utility functions for session management, key generation, and calldata handling.
- `GodotDojoHelper`: Offers utility for float-point conversion and extension configuration.

## Editor Utilities

Some in-editor tools were added under
`Project -> Tools -> Godot Dojo Tools`

### Cairo Type System

Dojo.godot automatically handles conversions between Cairo types and Godot equivalents:

- **Primitives**: `u8`, `u16`, `u32`, `u64`, `u128`, `u256`, `felt252` map to Godot integers and strings.
- **Structures**: Cairo structs convert to Godot Dictionaries with proper field mapping.
- **Arrays**: Cairo arrays become Godot Arrays with automatic element conversion.
- **Enums**: Cairo enums map to Godot integers with enumeration support.

:::info

Godot doesn't natively support big integers like `i128`, `u128`, and `u256`.
However, the extension supports them using wrapper classes to store and display the data.

`I128`, `U128`, and `U256` wrappers can be used directly inside the `calldata` array.

:::

## Getting Started

We will be using `dojo-starter` contract for this example.

::::steps

#### Download the latest version

Visit the [release page](https://github.com/lonewolftechnology/godot-dojo/releases) and download the latest version for your platform.

#### Create Your Godot Project

Create a new Godot project or open an existing one.

#### Install the GDExtension

1. Create an `addons` folder in the root of your project if it doesn't exist.
2. Copy the downloaded files into the `addons` folder.
3. Restart Godot to ensure the extension is correctly loaded.

#### Setup `ToriiClient`
- Add a `ToriiClient` node to your scene tree.
- Connect the client:
  ```gdscript
  var _success = torii_client.connect("http://localhost:8080")
  ```
- Register a subscription:
  :::tip
  If `ToriiClient.subscribe_entity_updates` is used with an empty `DojoClause`, it retrieves ALL entity updates.
  :::
    ```gdscript
    func _entity_callback(entity: Dictionary):
        printt("Entity Models", entity["models"])
    
    func _register_sub():
        var _dojo_callback = DojoCallback.new()
        _dojo_callback.on_update = _entity_callback
        _dojo_callback.on_error = func(_err): printt("DojoError", _err) # Can also be a lambda
        var dojo_worlds: Array = ["0x..."]
        if torii_client.is_valid():
            var entity_sub: int = torii_client.subscribe_entity_updates(DojoClause.new(), dojo_worlds, _dojo_callback)
    ```

    :::note
    If `torii_client.connect` is used in the same method, you can use its return value instead of checking `is_valid()`.
    :::

#### Connect `DojoSessionAccount`

Add a `DojoSessionAccount` node to your scene tree.

Generate the URL to start the login process and open it in the browser:

```gdscript
func trigger_login():
	# Create policies
	var policies = { "policies": [
		{
			"target": "0x...",
			"method": "move"
		},
		{
			"target": "0x...",
			"method": "spawn"
		}
	]}
	
    # Generate private key. 
    # If a previously generated key is used, you can create a session without logging in again.
    _priv_key = ControllerHelper.generate_private_key() # Save this key for the next step
    
    # Create session registration URL
    var session_url = ControllerHelper.create_session_registration_url(_priv_key, policies, "http://localhost:5050")
    
    # Open the default web browser
    OS.shell_open(session_url)
```

Once the session is successfully registered, fetch the session:

```gdscript
    dojo_session_account.max_fee = "0x100000"
    dojo_session_account.full_policies = policies
    
    dojo_session_account.create_from_subscribe(
        _priv_key,
        "http://localhost:5050", # Katana URL
        policies,                # Optional if `full_policies` is set
        "https://api.cartridge.gg" # Controller URL (defaults to this value)
    )
```

::::


### Creating Contract Calls

When creating calls, you need the contract address, the selector/function name, and call arguments.

:::warning

The `calldata` is an array and an optional parameter.

If the function in your contract doesn't take arguments, you can pass an empty array.
Otherwise, arguments must be inside an array.

Calldata is always flattened.
This means that if it has other arrays inside, they will be merged into a single array.

:::

:::info
If your function uses a custom type defined on your contract, you need to send all members in order inside an array or directly on the calldata array.

In the example a Vector3 is used.
But it works with any type defined on your contract.
:::

:::tip
`execute` and `execute_from_outside` can make calls in bulk by using an array.
`execute_single` and `execute_from_outside_single` were added as a utility for a simple unique transaction.
:::

```gdscript
var new_pos:Vector3 = Vector3(6, 2.5, -6)
var position:Array = [new_pos.x, new_pos.y, new_pos.z]
var direction:int = Directions.LEFT

func move_to(_position:Array, _direction:int) -> void:
    var move_call:Dictionary = { 
		"contract_address": "0x...",
		"entrypoint": "move",
		"calldata": [_position, _direction]
		}
		
    dojo_session_account.execute(
        [move_call]
    )
    # or
    dojo_session_account.execute_single(
        "0x...",
        "move",
        [_position, _direction]
    )

```

### Subscriptions

Subscriptions can be created through `ToriiClient`. When a subscription is successfully created, it returns a `sub_id`.

This `sub_id` is required to update or cancel the subscription.

Subscriptions are automatically cancelled when closing the game.

:::tip

Refer to the in-editor documentation to see other available subscriptions.

:::

#### Subscribing to Events

Listen for blockchain events in real-time. The first parameter is always a `Callable`:

This can be a lambda function, a `Callable` constructed from another object's function, or any function in the current script.

```gdscript
# Configured in inspector
@export var entity_sub: int
@export var event_sub: int

func setup_subscriptions() -> void:
    # Subscribe to all events
    var _dojo_callback_message: DojoCallback = DojoCallback.new()
    _dojo_callback_message.on_update = callback.bind("Message") # We add an extra parameter to the callback
    _dojo_callback_message.on_error = error_callback.bind("Message")
    message_sub = torii_client.subscribe_event_updates([], _dojo_callback_message)

    # Subscribe to entity updates
    var _dojo_callback: DojoCallback = DojoCallback.new()
    _dojo_callback.on_update = callback.bind("Entity")
    _dojo_callback.on_error = error_callback.bind("Entity")
    entity_sub = torii_client.subscribe_entity_updates(DojoClause.new(), ["0x..."], _dojo_callback)

func callback(data: Dictionary, type: String):
    if type == "Entity":
        var result = data["models"]
    if type == "Message":
        var _data = data["data"]
        for _key in _data:
            printt("**", _key)
			
func error_callback(err, type: String):
    push_error("Error on %s subscription: %s" % [type, err])
```

### Querying Entities

Fetch the current blockchain state using queries:

:::tip
An empty query retrieves **ALL** entities across **ALL** worlds indexed by Torii.
:::

:::note
`DojoQuery` is used for retrieving entities. For other query types, refer to the `ToriiClient` in-editor documentation.
:::

```gdscript
func query_players() -> void:
    var query: DojoQuery = DojoQuery.new()
    var entities = torii_client.entities(query)
    for entity in entities:
        process_entity(entity)

func process_entity(entity: Dictionary) -> void:
    for model in entity["items"]:
        for key in model:
            var data = model[key]
            # Process based on your model structure
            if data.has("dojo_starter-Position"):
                var position_model = data["dojo_starter-Position"]
                # Structure depends on your contract models/ABI
                var position = Vector2(position_model['vec']['x'], position_model['vec']['y'])
                var id: String = position_model['player']
                printt(id, position)
```

#### Advanced Queries (Builder Pattern)

All queries follow the **Builder Pattern**, allowing for flexible and readable construction of complex filters:

```gdscript
    var query: DojoQuery = DojoQuery.new()
    var clause = MemberClause.new()
    
    clause.member("id")
    clause.op(MemberClause.ComparisonOperator.Eq)
    var _addr = "0x..." # Player address
    
    clause.hex(_addr, MemberClause.PrimitiveTag.ContractAddress)
    clause.model("dojo_starter-Player")
    
    query.with_clause(clause)
    query.models(["dojo_starter-Moves", "dojo_starter-Position"])
    
    var data: Dictionary = torii_client.entities(query)
    var _player_items: Array = data['items']
    printt("ITEMS", _player_items)
```

You can also create the query in a single line:

```gdscript
    var query: DojoQuery = DojoQuery.new() \
        .with_clause(MemberClause.new() \
            .member("id") \
            .op(MemberClause.ComparisonOperator.Eq) \
            .hex("0x...", MemberClause.PrimitiveTag.ContractAddress) \
            .model("dojo_starter-Player")) \
        .models(["dojo_starter-Moves", "dojo_starter-Position"]) 

    var data: Dictionary = torii_client.entities(query)
    var _player_items: Array = data['items']
    printt("ITEMS", _player_items)
```

### Managing Policies

The recommended structure for policies for this extension is the following:
```gdscript
# Create policy
var full_policies: Dictionary = {
	"max_fee": "0x100000",
	"policies": [{
		"contract_address": "0x...",
		"methods": [
			"spawn",
			"move"
		]
	}]
}

# Use with session account
dojo_session_account.max_fee = full_policies["max_fee"] # Can be omitted if present on full_policies dictionary
dojo_session_account.full_policies = full_policies

dojo_session_account.create_from_subscribe(
	_priv_key,
	"http://localhost:5050", # Katana
	full_policies, # Optional if `full_policies` is set
	"https://api.cartridge.gg" # Optional, defaults to `https://api.cartridge.gg`
)
```

### Type Conversion

Dojo.godot handles type conversion automatically:

Every struct/type in your contract will return inside a Dictionary with its name and parameters.
In the Starter Project there is a custom struct `Vec2`, the following snippet is an example.

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
    controller_account.execute_from_outside([move_call])
```

## Building and Deployment

We use scons build system as it is what Godot uses.
However, a Cmake equivalent is placed so the extension can be developed using any modern IDE.
The extension compiles and places itself under _demo/addons/godot-dojo_.

As of `godot-dojo` [v0.7.2](https://github.com/lonewolftechnology/godot-dojo/releases/tag/v0.7.2), `Linux`, `Windows`, `MacOS` , `Android` and `iOS` are supported.
Make sure to check new versions under the [releases tab](https://github.com/lonewolftechnology/godot-dojo/releases)
:::note
`Linux` and `Windows` builds are x86_64 only.
You can build arm64 builds.

Let us know if it works by opening an issue or by leaving a message on `Dojo's Discord` under the `Godot section`.

`MacOS` builds are not universal, so while they work on both Intel and Apple Silicon, they require separate binaries.
A universal build could be created, but we haven't been able to properly test it yet.
:::

### Editor builds

The editor builds contain code that only runs in-editor and is only found in-editor.

This is the only required build to run the extension; for exporting the templates are required.

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

You can set environment variables in your game for detailed logging.
This is useful when developing the extension or reporting bugs:

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

The Dojo.godot repository includes a complete demo project showcasing:

- **Player Movement**: Onchain player spawning and movement using arrow keys.
- **Real-time Updates**: Live synchronization between blockchain state and game visuals.
- **Controller Integration**: Seamless wallet authentication and transaction signing.
- **Event Handling**: Processing both events and entity updates from subscriptions.

To run the demo:
:::note
Follow the [dojo-starter](/tutorials/dojo-starter) or [dojo-intro](/getting-started/your-first-dojo-app) guide.
:::

1. Set up a local Dojo Starter environment.
2. Build/download the Dojo.godot extension following the instructions above.
3. Open the `demo` folder in Godot and run the project.

The demo connects to a live testnet deployment, demonstrating real blockchain integration in a simple 2D movement game.

## Troubleshooting

Enable detailed logging for troubleshooting:

```gdscript
func _ready() -> void:
    OS.set_environment("RUST_LOG", "debug,tokio=info,hyper=info")
    OS.set_environment("RUST_BACKTRACE", "full")
```

Check the Godot console for detailed error messages and stack traces.