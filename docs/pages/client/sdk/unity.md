---
title: "Dojo Unity SDK"
description: "Introduction to the official Unity SDK for building Dojo-powered games"
---

# Dojo.unity

Unity is one of the world's most popular cross-platform game engines, powering millions of games across mobile, desktop, console, and web platforms.
With its intuitive visual editor, robust scripting capabilities in C#, and extensive asset ecosystem, Unity enables developers to create everything from simple 2D indies to complex 3D AAA titles.

Dojo.unity is the official Unity Engine SDK for interacting with Dojo worlds to develop web and desktop 2D and 3D games.
Whether you're creating a tactical RPG, a real-time strategy game, or an immersive 3D world, dojo.unity provides the tools you need to bring your onchain game vision to life.

## Core Concepts

Before diving into the exciting world of onchain games and worlds with Unity, let's explore some essential concepts:

### World Manager

The **World Manager** is the central hub for organizing and controlling entities within your Dojo world in Unity.

![world-manager](/client/unity/world-manager.png)

During initialization, the World Manager receives `WorldManagerData`, which defines essential settings like your Torii URL, RPC URL, and world address.
While these settings are initially provided, you have the flexibility to adjust them by creating different scriptable objects.

![world-manager-data](/client/unity/world-manager-data.png)

In Unity, entities are represented by `GameObject` instances.
The World Manager simplifies their management by offering methods to both add/remove entitites and access them collectively or by individual identifiers.

### Synchronization Master

The Synchronization Master acts as the bridge between Unity and your Dojo world, seamlessly synchronizing and managing entities.

![sync-master](/client/unity/sync-master.png)

Key Features:

- Control synchronization: Set the maximum number of entities to synchronize.

- Event-driven communication:

    - `OnSynchronized`: Notifies you when entities were successfully synchronized from Dojo world to Unity.
    - `OnEntitySpawned`: Triggered whenever a new entity is spawned in the Unity environment.

- Dynamic entity management:
    - `SynchronizeEntities`: Asynchronously retrieves and spawns entities from the Dojo world in the Unity environment.
    - `HandleEntityUpdate`: Dynamically updates existing entities or spawns new ones based on changes received from the Dojo world, ensuring seamless synchronization.

### Code Bindings

In order to link your Dojo code, written in Cairo, with your Unity code, written in C#, we rely on something known as a "code binding".
A code binding is an automatically-generated "stub" allowing code in one language to call functions implemented in another language.

Dojo's Sozo CLI provides built-in support for code bindings, through [Cainome](/toolchain/cainome).
You can learn more about Sozo's binding generation features [here](/toolchain/sozo/binding-generation).

## Getting Started

To get started with the dojo.unity SDK, follow these steps:

::::steps

#### Prerequisites

Before getting started, ensure you have [Unity](https://unity.com/download) `>= 2022.3.15f1` installed.

#### Download dojo.unity

Visit the [dojo.unity release page](https://github.com/dojoengine/dojo.unity/releases) and download the latest version of `dojo.unitypackage`.

#### Open or create a Unity project

Launch Unity and either create a new project or open an existing one where you intend to integrate dojo.unity

#### Import `dojo.unitypackage`

Navigate to `Assets/Import Package/Custom Package` within your Unity project.
Choose the downloaded `dojo.unitypackage` file.

![unitypackage01](/client/unity/import-unitypackage-01.png)

Finally, ensure to check only the intended platforms for your project.

![unitypackage02](/client/unity/import-unitypackage-02.png)

:::warning
If your project includes the `Plugins/iOS` directory, note that it requires **Git Large File Storage (LFS)** to be uploaded.
Refer to [GitHub's documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage) for more information.
:::

#### Import Newtonsoft's [Json.NET](https://www.newtonsoft.com/json) dependency

In Unity, navigate to `Window/Package Manager`.

![unitypackage01](/client/unity/unitypackage-dependencies-01.png)

Once the `Package Manager` window opens, select `Add package from git URL`

![unitypackage02](/client/unity/unitypackage-dependencies-02.png)

Enter `com.unity.nuget.newtonsoft-json` as the package URL, click `Add` and then `Done` to import the dependency.

::::

## Setting up a Unity scene

::::steps

#### Add Essential Prefabs

In your Unity project, navigate to the scene where you want to integrate the SDK.

1. From the `Project` window, locate the `Assets/Dojo/Prefabs` folder.
2. Drag the `WorldManager` prefab into your scene. This prefab acts as the central hub for managing entities in your Dojo world.
3. Additionally, navigate to the `Assets/Dojo/Runtime` folder and drag the `UnityMainThreadDispatcher` prefab into your scene.

#### Configuring the `WorldManager`

**Default Configuration**

The World Manager operates with a default configuration called `WorldManagerDataLocalConfig`, residing in `Dojo/Runtime/Config`.

![world-manager-data](/client/unity/world-manager-data.png)

Feel free to modify this configuration directly if it suits your project's requirements.

**Creating Custom Configurations**

To create separate configuration files for different environments (like Slot), first navigate to the `Project` window, then right-click and choose `Create > ScriptableObjects > WorldManagerData`.
Customize the configuration values within this new `ScriptableObject` instance.

**Applying a Configuration**

To use a specific configuration, locate the `WorldManager` game object in your scene.
Drag the desired `ScriptableObject` (either the default one or your custom configuration) onto the `DojoConfig` field within the `WorldManager` component.

#### Adding model bindings

1. Generate model bindings: If you haven't already created your model bindings, please refer to the [bindgen section](/toolchain/sozo/binding-generation#unity) for instructions.

2. Import model bindings: Locate the `bindings/client/unity/Models` folder within your Dojo project, and drag the desired `model` files from this folder into your Unity project.
   The [Synchronization Master](#synchronization-master) will automatically detect and load these models for seamless data exchange.

![bindings-example](/client/unity/bindings-example.png)

::::

## Calling Dojo Systems

This section explores the process of interacting with Dojo systems from Unity.

### Account Creation

Every transaction to a Dojo system must come from an **account**.
Accounts are required to sign and execute transactions that modify your game's on-chain state.

We have two options for creating an account: a simple account, or a burner account.

To create a **simple account**, use this code:

```cs
using Dojo;
using Dojo.Starknet;
using UnityEngine;

void Start()
{
    var provider = new JsonRpcClient(dojoConfig.rpcUrl);
    var signer = new SigningKey(masterPrivateKey);
    var account = new Account(provider, signer, new FieldElement(masterAddress));
}
```

For a **burner account**, use this code:

```cs
using Dojo;
using Dojo.Starknet;
using UnityEngine;

async void Start()
{
    Account burnerAccount = await CreateBurnerAccount(dojoConfig.rpcUrl, masterAddress, masterPrivateKey);
}

private async Task<Account> CreateBurnerAccount(string rpcUrl, string masterAddress, string masterPrivateKey )
{
    var provider = new JsonRpcClient(rpcUrl);
    var signer = new SigningKey(masterPrivateKey);
    var account = new Account(provider, signer, new FieldElement(masterAddress));

    BurnerManager burnerManager = new BurnerManager(provider, account);
    return await burnerManager.DeployBurner();
}
```

:::tip
Replace `masterAddress` and `masterPrivateKey` with the **account Address** and **private key** of the prefunded Katana account.
:::

### System Execution

Once we have an [account](#account-creation), we must execute a call to a Dojo system.
To do this, we must first teach our Unity project about our Dojo contracts using [code bindings](#code-bindings).

Sozo's [bindgen](/toolchain/sozo/binding-generation#unity) generates bindings for contracts, which must be transferred into your Unity project.

Let's consider a practical example: a `PlayerActions` contract that handles player creation in an RPG game.
This system allows players to create their character by choosing a name and selecting their gender, then stores this information on-chain as part of the game state.

```rust
#[starknet::interface]
pub trait IPlayerActions<T> {
    fn create(
        ref self: T, player_name: ByteArray, gender_id: u32
    );
}

#[dojo::contract]
pub mod player_actions {
    use super::IPlayerActions;
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::ModelStorage;
    use dojo::world::{WorldStorage, WorldStorageTrait};

    #[abi(embed_v0)]
    impl PlayerActionsImpl of IPlayerActions<ContractState> {
        fn create(ref self: ContractState, player_name: ByteArray, gender_id: u32) {
            let mut world = self.world(@"namespace");
            let player = get_caller_address();

            // Create a new player model with the provided data
            let player_data = Player {
                player,
                name: player_name,
                gender: gender_id,
                level: 1,
                experience: 0
            };

            // Write the player data to the world state
            world.write_model(@player_data);
        }
    }
}
```

The generated bindings would be as follows:

```cs
using System;
using System.Threading.Tasks;
using Dojo;
using Dojo.Starknet;
using UnityEngine;
using dojo_bindings;

public class PlayerActions : MonoBehaviour {
    // The address of this contract
    public string contractAddress;

    // Call the `create` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> Create(Account account, string player_name, uint gender_id) {
        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = contractAddress,
                selector = "create",
                calldata = new dojo.FieldElement[] {
                    new FieldElement(player_name).Inner(),
                    new FieldElement(gender_id.ToString()).Inner()
                }
            }
        });
    }
}
```

Let's break down the concepts:

- `public string contractAddress;`: The contract address of the `PlayerActions` system, obtained as output from `sozo migrate`.
- `new dojo.Call{ ... }`: Creates a new call, where the `selector` is the name of the system function ("create"), and `calldata` contains the serialized parameters (player name and gender ID).
- `account.ExecuteRaw(new dojo.Call[] { ... })`: Executes the transaction on-chain, creating the player character with the specified attributes. The `account` can be either a simple account or a burner account.

When this function is called from Unity (e.g., when a player fills out a character creation form), it will create a new on-chain player entity that persists in your Dojo world and can be queried by other systems or clients.

:::tip
It is possible to execute an array of calls simultaneously, by passing multiple `dojo.Call` instances to `ExecuteRaw`.
:::

## Building your Dojo Game

The final stage is building your onchain game for interaction and deployment.
Dojo currently supports building for both **desktop** and **WebGL** platforms.

### Building for Desktop

Follow these instructions to build your game for Windows, Mac, or Linux.

1. Navigate to `File/Build Settings`.
2. From the right menu choose the `Windows, Mac, Linux` option.
3. From the Platform dropdown, select the target desktop platform.
4. Click the Build button to initiate the build process.

![build-desktop](/client/unity/build-desktop.png)

### Building for WebGL

::::steps

#### Ensure the WebGL module is installed

1. Open the `Unity Hub`.
2. Go to `Installs`.
3. Select the Unity version matching your project.
4. Click `Add Modules`.
5. Under the Modules tab, locate and install the `WebGL` module.

![unityhub-add-module](/client/unity/webgl-module.png)

#### Configure the WebGL player settings

1. Go to `Edit/Project Settings/Player` (or navigate directly using the Project Settings window).
2. Select the `WebGL` tab.
3. Under `Resolution and Presentation`, ensure the `Dojo Template` is selected.

![unityhub-add-module](/client/unity/webgl-player-settings.png)

#### Build your project

1. Navigate to `File/Build Settings`.
2. From the right menu choose `WebGL` option.
3. Click the Build button to build your game for WebGL.

![build-webgl](/client/unity/build-webgl.png)

::::

## Troubleshooting

### Build Issues

#### Model Binding Errors

When modifying the bindings generated during [bindgen](/toolchain/sozo/binding-generation#unity), ensure that all fields in the model bindings are declared as public.

:::warning
Failing to do so can result in the values of the fields not being loaded properly.
:::

#### WebGL Build Errors

You may encounter the following error while building for WebGL:

![webgl-error](/client/unity/webgl-error.png)

Here are the steps to address it:

1. **Verify Dojo Template Selection**:

    - Navigate to `Edit > Project Settings > Player` (or directly through the Project Settings window).
      ![webgl-error](/client/unity/webgl-build-fail.png)
        > Example without `Dojo` template selected
    - Select the WebGL tab.
    - Under `Resolution and Presentation`, ensure the `Dojo` Template is selected.
    - If the Dojo template is missing, proceed to `step 2`.

2. **Download WebGL Templates Folder**: If the Dojo template is unavailable in Player Settings, it's likely missing from your project.

    - Navigate to the [Dojo Unity repository](https://github.com/dojoengine/dojo.unity)
    - Download the `WebGL templates` folder.
    - Add this folder to your project's Assets directory.

3. **Rebuild Your Project**:
   After ensuring the Dojo template is selected or added, try rebuilding your project for WebGL.

#### Slot on Desktop

Currently, Slot functionality is not available on desktop platforms due to a server error preventing the initialization of the ToriiClient within the WorldManager component.
Attempting to use Slot with a desktop build will result in the following exception:

```cs
Exception: status: Unknown, message: "h2 protocol error: http2 error: connection error detected: frame with invalid size", details: [], metadata: MetadataMap { headers: {} }
Dojo.Torii.ToriiClient..ctor (System.String toriiUrl, System.String rpcUrl, System.String world, dojo_bindings.dojo+KeysClause[] entities) (at Assets/Dojo/Runtime/Torii/ToriiClient.cs:40)
Dojo.WorldManager.Start () (at Assets/Dojo/Runtime/WorldManager.cs:28)
```

:::note
If you intend to deploy with Slot, build the game for WebGL instead.
:::

### Runtime Issues

#### Async Calls Failing

If asynchronous (`await`) calls to your Dojo systems are not working, ensure that the `UnityMainThreadDispatcher` is present in your scene.
This prefab should have been added during the [scene setup](#add-essential-prefabs) process.

:::info
The `UnityMainThreadDispatcher` can be found in `Assets/Dojo/Runtime directory`.
:::

#### Authentication Errors

While executing a transaction from your Unity project, you may encounter the following error in the Katana logs:

```bash
2024-03-19T18:05:46.841197Z  WARN executor: Transaction execution error: "Error in the called contract (0x00280a3deba2004bbbdb3d60a619f3059305f2399ab1e1cd630ec20249abe5fa):
Error at pc=0:4573:
Got an exception while executing a hint.
Cairo traceback (most recent call last):
Unknown location (pc=0:67)
Unknown location (pc=0:1835)
Unknown location (pc=0:2478)
Unknown location (pc=0:3255)
Unknown location (pc=0:3795)

Error in the called contract (0x05024efa0bbd4ec33a2f56251a5d67d8ed2b1e88cbdba566cbce6d3d757db21f):
Error at pc=0:1867:
Got an exception while executing a hint: Hint Error: Execution failed. Failure reason: 0x6e6f7420777269746572 ('not writer').
Cairo traceback (most recent call last):
Unknown location (pc=0:256)
Unknown location (pc=0:634)

Error in the called contract (0x01bf3dfc0c2b66b3d4abb47e9c8e4c5552992dbc70bb2566b9f6d6ee9b707317):
Execution failed. Failure reason: 0x6e6f7420777269746572 ('not writer').
```

The solution is to navigate to the `src` directory within your Dojo project and run the `default_auth.sh` script in your shell.

![auth](/client/unity/auth.png)

## Example Project

This section provides a walkthrough for running the example from the dojo.unity repository using the `Dojo Starter` repository.

[![dojo.unity demo](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fyoutu.be%2F25ocgPsHs4w)](https://youtu.be/25ocgPsHs4w)

:::steps

#### Prerequisites

Clone the [dojo.unity](https://github.com/dojoengine/dojo.unity) and [Dojo Starter](https://github.com/dojoengine/dojo-starter) repositories.

#### Setting up Dojo Starter

Follow the steps outlined in the [Dojo Starter setup guide](/tutorials/dojo-starter.mdx) to deploy your Dojo project locally: 1) launch Katana, 2) build with Sozo, and 3) launch Torii.

#### Setting up dojo.unity

1. Open the scene: In the `Project tab`, navigate to `Assets/Spawn And Move/Scenes/Sample scene`
2. Adjusting Scriptable Objects:
    - Verify that the `player address` and `player private` key in `Assets/Spawn And Move/Dojo5.0Data` match the output of the Katana terminal.
    - Verify that the `world address` in the Scriptable Object located at `Assets/Dojo/Runtime/Config/WorldManagerLocalConfig` matches the output of the Sozo migrate command.

#### Running the Example

1. Play the opened scene.
2. To spawn an entity, press the `space key`.
3. To move the entity, use the keys: `a (left)`, `w (forward)`, `s (backward)`, `d (right)`.

:::tip
You can create multiple entities by pressing the `space` key.
To select an entity for movement, simply `right-click` on it.
:::

::::
