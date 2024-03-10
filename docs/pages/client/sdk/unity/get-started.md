# Getting Started

This section guides you through:

- Dojo Unity SDK Setup: Learn how to integrate the Dojo.unity SDK into your Unity scene for seamless development.
- Calling Dojo Systems: Discover how to interact with various systems within your Dojo world directly from Unity.
- Building for Desktop & WebGL: Master the steps for building your onchain game for both desktop and WebGL platforms(using the Slot framework).

## Setting up Unity Scene

::::steps

### Add Essential Prefabs

In your Unity project, navigate to the scene where you want to integrate the Dojo SDK.

- From the `Project` window, locate the `Assets/Dojo/Prefabs` folder.
Drag the `WorldManager` prefab into your scene. This prefab acts as the central hub for managing entities in your Dojo world.
- Additionally, navigate to the `Assets/Dojo/Runtime` folder and drag the `UnityMainThreadDispatcher` prefab into your scene.

### Configuring the World Manager

Here's how to tailor the World Manager's settings to your specific needs:

#### Default Configuration

The World Manager operates with a default configuration called `WorldManagerDataLocalConfig`, residing in `Dojo/Runtime/Config`.

![world-manager-data](/unity/world-manager-data.png)
Feel free to modify this configuration directly if it suits your project's requirements.

#### Creating Custom Configurations

To create separate configuration files for different environments (like Slot), follow these simple steps:

In the `Project` window, right-click and choose `Create > ScriptableObjects > WorldManagerData`.
Customize the configuration values within this new ScriptableObject instance.

#### Applying a Configuration

To use a specific configuration, locate the `WorldManager` game object in your scene.
Drag the desired ScriptableObject (either the default one or your custom configuration) onto the `DojoConfig` field within the `WorldManager` component.

![world-manager-config](/unity/world-manager-config.png)

## Adding Binding Models

- Generate Models: If you haven't already created your model bindings, please refer to the [Bingen section](/client/sdk/unity/important-concepts#bingen) for step-by-step instructions on how to do so.

- Import Models: Locate the `bindings/unity/Models` folder within your Dojo project. Simply drag the desired `model` files from this folder into your Unity project. The `Synchronization Master` will automatically detect and load these models for seamless data exchange.
