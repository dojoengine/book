---
title: "Dojo Unreal Engine SDK"
description: "Introduction to the official Unreal Engine 5 SDK for building Dojo-powered games"
---

# Dojo.unreal

[Dojo.unreal](https://github.com/dojoengine/dojo.unreal) is the official Unreal Engine 5 SDK for Dojo.
With this SDK, you can combine the power of Dojo and Unreal to develop mobile and desktop 2D and 3D games.

## Prerequisites

Before getting started, ensure you have the Unreal Engine installed.
To install the Unreal Engine, [follow these instructions](https://www.unrealengine.com/en-US/download).

## Getting Started

To get started with the dojo.unreal SDK, follow these steps:

::::steps

#### Download dojo.unreal

Obtain the Dojo plugin by visiting [dojo.unreal](https://github.com/dojoengine/dojo.unreal).
Either clone the repository or download it as a ZIP file to access the plugin.

![unrealdl](/client/unreal/downloadzip.webp)

#### Set Up Your Unreal Project

Launch Unreal Engine 5 and create a new project or open an existing one where you'll implement dojo.unreal.

![unrealcreate](/client/unreal/create_new_cpp_project.webp)

#### Import the Plugin

1. Navigate to your project directory by right-clicking the project in Epic Games Launcher (Unreal Engine > Library > My Projects)
   ![unrealdir](/client/unreal/open_project_directory.webp)

2. Create a Plugins directory if one doesn't exist

3. Copy the Plugins/Dojo directory from dojo.unreal into your project's Plugins folder

4. Verify the plugin version in `Plugins/Dojo/Source/Dojo/Dojo.Build.cs`. For version updates or platform-specific deployments, refer to [Update the plugin](#update-the-plugin) or [Add a new platform](#add-a-new-platform) respectively.

5. Enable the Dojo plugin by adding `"Dojo"` to the `PublicDependencyModuleNames.AddRange` list in `Source/DojoBookTest/PROJECTNAME.Build.cs`

6. Generate bindings using `sozo build --unrealengine` and add the resulting `DojoHelpers.cpp` and `DojoHelpers.h` to `Source/PROJECTNAME`

7. Regenerate project files (see [Regenerate project files](#regenerate-project-files) for detailed instructions)

#### Configure the Project

1. Open your project in Unreal Engine 5 to initiate the rebuild
   ![ue5rebuild](/client/unreal/rebuild.webp)

2. Create a new blueprint
   ![unrealbp](/client/unreal/create_new_blueprint.webp)

3. Initialize the DojoHelpers actor and store it as a variable
   ![unrealspawnactor](/client/unreal/create_dojo_helpers_actor.webp)

4. Implement Torii connections and other desired functionality
   ![unrealusehelpers](/client/unreal/use_dojo_helpers.webp)

5. Launch the game and verify the connection in the Output Log
   ![unrealtoriiconnected](/client/unreal/torii_connected.webp)

::::

## Regenerating Files

Follow these instructions to regenerate your project files:

::::steps

#### Delete the following directories if they exist:

- Binaries/
- Saved/
- Intermediate/
- DerivedDataCache/

#### Generate fresh project files

Follow the instructions for your platform:

**Mac**

Open Terminal in your project directory and run:

```bash
# For UE 5.5
/Users/Shared/Epic\ Games/UE_5.5/Engine/Build/BatchFiles/Mac/GenerateProjectFiles.sh -project="$PWD/ProjectName.uproject" -game

# For other UE versions, adjust the path accordingly
```

**Linux**

Run from project directory:

```bash
~/UnrealEngine/Engine/Build/BatchFiles/Linux/GenerateProjectFiles.sh -project="$PWD/ProjectName.uproject"
```

**Windows**

- Right click on your project file `ProjectName.uproject`
- Select "Generate Visual Studio Project Files"
- Or run this from PowerShell:
    ```
    & 'C:\Program Files\Epic Games\UE_5.5\Engine\Binaries\DotNET\UnrealBuildTool\UnrealBuildTool.exe' -projectfiles -project="$PWD\ProjectName.uproject" -game -engine
    ```

::::

## Integrating Bindings

Using the command `sozo build --unrealengine`, you can add the `DojoHelpers.h` and `DojoHelpers.cpp` files to your project.

These files use the Dojo plugin and expose simple functions that you can use from another `cpp` file or directly from a Blueprint.
If you have set up everything correctly, you will have a connected Torii client in a Blueprint.

:::info
You can learn more about Unreal Engine Blueprints [here](https://www.unrealengine.com/en-US/blog/introduction-to-blueprints).
:::

Here are all the things you need to set up:

::::steps

#### Create public variables in your `DojoGameLogic` Blueprint

![unrealinspector](/client/unreal/configinspector2.webp)

:::tip
Click on the closed eye to be able to change it in the Inspector.
:::

![unrealinspector2](/client/unreal/configinspector.webp)

#### Create your `DojoHelpers` actor

![unrealhelpers](/client/unreal/spawnhelpers.webp)

#### Connect to Torii and set contract addresses

![unrealtoriicontracts](/client/unreal/connect_setup.webp)

#### Subscribe to and fetch existing models

This is where you will retrieve all the models that are stored on-chain.

Both subscription and fetch existing models will trigger a custom event called `OnDojoModelUpdate`.
Always bind this custom event before calling any of these functions.

![unrealmodels0](/client/unreal/getmodelupdate.webp)

You can then create functions for each model to retrieve the values and update your game.

![unrealmodels3](/client/unreal/accessmodel2.webp)

Generated models follow the Unreal Engine 5 convention in `cpp`.
For example, if you have a `Vec2` model, it will be called `FVec2`.

For enums, to avoid conflicts, they are prefixed with "ED" (E for Enums, D for Dojo).
For example, `Direction` enum becomes `EDDirection`.

When used in a Blueprint, the prefix is removed.

#### Controller

To send transactions, you need to use the [Cartridge Controller](https://docs.cartridge.gg/controller/overview).

When a player connects, a new browser tab opens to handle authentication.
The connection result is returned through a custom event after the player successfully connects.

:::tip
Always bind this Custom Event before calling either `ControllerConnect` or `ControllerGetAccountOrConnect`.
:::

The `ControllerAccount` method always opens a new browser tab for authentication.
`GetAccountOrConnect` first attempts to retrieve a previously stored account, and only opens a new browser tab if no existing account is found.

:::tip
If the account address is `0x0`, it means the player did not connect to the Controller.
:::

We also call the `CallControllerDojoStarterActionsSpawn` function.

![unrealcontroller](/client/unreal/controllerconnectandcall.webp)

More information about calls is provided below.

#### Calls

There are two functions available for each selector of your contracts.

If you used `CreateBurnerDeprecated`, use functions prefixed with `Call`.
If you used the Controller Connect, use functions prefixed with `CallController`.

The format for each function is `<PREFIX><NAMESPACE><CONTRACT><SELECTOR>` with all the required parameters

![unrealcall](/client/unreal/callmethod.webp)

::::

## Updating the Plugin

To update the plugin to a new version:

1. Build the `dojo.c` library for your platform
2. In your UE5 project directory, create a new directory next to `Dojo.Build.cs` named after your version number (e.g. "1.7.0")
3. Copy the `dojo.h` header file into this new version directory
4. Create a `lib/<platform>` subdirectory and copy the `libdojo_c` library file into it
5. Update the `Dojo.Build.cs` file to reference your new version number
6. Regenerate the project files following the instructions above

## Adding a New Platform

To add support for a new platform:

::::steps

#### Build the `dojo.c` library for your target platform

- Use `cargo build --release --target <target>`
- Common targets include:
    - iOS: `aarch64-apple-ios`
    - Android: `aarch64-linux-android`
    - Windows: `x86_64-pc-windows-msvc`
    - Mac: `aarch64-apple-darwin`

#### Create the platform-specific directory structure

- Navigate to your version folder (e.g. `1.7.0/`)
- Create `lib/<PLATFORM>` directory (e.g. `lib/iOS`, `lib/Android`)
- Platform names should match Unreal's naming conventions

#### Copy the built library files

- Place the compiled library in the platform directory

#### Update `Dojo.Build.cs`

- Add platform-specific conditional logic if needed
- Add library path definitions for your platform
- Test compilation for the new platform

::::

## Sample Project

The dojo.unreal repository contains `ue5dojostarter`, a complete sample project that demonstrates how Dojo can be integrated with Unreal Engine.
This sample is built on top of the Unreal Engine 5 First Person template and showcases:

- **Complete Dojo Integration**: Working examples of connecting to Torii, subscribing to model updates, and calling system functions
- **Blueprint Implementation**: All Dojo functionality implemented through Blueprint nodes for easy understanding
- **Game Mechanics**: A simple boat movement game where players can spawn and move around a world
- **Controller Authentication**: Integration with Cartridge Controller for wallet authentication
- **Model Synchronization**: Real-time updates between onchain state and game visuals

The sample project works with the [Dojo Starter](https://github.com/dojoengine/dojo-starter) contracts, providing a complete end-to-end example of an onchain game.

To run the sample project locally:

1. Set up and deploy the Dojo Starter contracts following the [getting started guide](/getting-started)
2. Clone the dojo.unreal repository
3. Follow the detailed setup instructions in the [repository README](https://github.com/dojoengine/dojo.unreal)
4. Configure the game with your deployed contract addresses and RPC endpoints

The sample project serves as both a learning resource and a starting point for your own Dojo-powered Unreal Engine games.
