# dojo.unity

### Prerequisites

Before getting started, there are a few steps you must follow in order to get the project up and running.

#### Dojo

Ensure that you're using the latest supported Dojo [version](https://github.com/dojoengine/dojo/releases).

#### Binaries

If you are using Windows or Linux, you will need to build [dojo.c](https://github.com/dojoengine/dojo.c) yourself. Make sure that you're using the latest supported version

```bash
git clone https://github.com/dojoengine/dojo.c
cargo build --release
```

This will generate a `.dll` or `.so` binary in the `target/release` directory, depending on your platform. You will need to copy it to the following location `Packages/Dojo/Libraries`

---

### Watch video

[![Watch the video](/unity-screen-grab.png)](/dojo.unity_demo.mp4)

## Dojo Unity Concepts

Building on-chain games and worlds with Unity involves understanding several key concepts and components. Let's go over them to give you a clearer picture:

## World Manager

![world-manager](/unity/world-manager.png)

- **Function**: The World Manager acts as the central hub for your Dojo world within Unity. It's the starting point where all entities from your Dojo world will be managed.
- **Implementation**: In your Unity scene, you'll find a `WorldManager` game object. Under this object, all entities from your Dojo world will be instantiated.
- **Customization**: The WorldManager script component comes with default values, but you have the option to modify these. Specifically, you can update the URLs for your Katana and Torii instances and set your own world address.

## Synchronization Master

![world-manager](/unity/sync-master.png)

- **Role**: This component is crucial for managing the synchronization of entities between your Dojo world and the Unity world.
- **Features**: In the SynchronizationMaster, you can specify the maximum number of entities you want to synchronize. It also handles the synchronization of your models' components.
- **Models Component**:
  - **Purpose**: These are the components that will be synchronized between the two worlds.
  - **Management**: You have the flexibility to add as many models as needed. However, it's important to ensure that the models you add here are also present in your Dojo world for proper synchronization.

## Models

![models](/unity/models.png)

You should have a deep understanding of models in dojo if not checkout out models [here](/cairo/models.md) before continuing.

### What are Models in Dojo?

1. **Definition**: In Dojo, [models](/cairo/models.md) are essential state that represent various parts of [entities](/cairo/entities.md) within your game. They are the building blocks that make up the content of your game world. Read about [ECS](/cairo/hello-dojo.md).

2. **Synchronization Role**:

   - Models act as the key elements that are synchronized between the onchain Dojo world and the Unity world (your game's visual and interactive representation).
   - This synchronization ensures that changes or interactions happening within the Unity environment are accurately reflected in the Dojo world, and vice versa.

3. **Flexibility in Adding Models**:

   - You have the freedom to add as many [models](/cairo/models.md) as needed for your game's design and functionality.
   - It's vital, however, to ensure that these [models](/cairo/models.md) are consistent across both the Dojo and Unity. This means that for every model you have in Unity, there should be a corresponding model in your Dojo world.

4. **Future Developments**:

   - An important aspect to note is that in future versions of the Dojo-Unity integration, the process of adding and synchronizing [models](/cairo/models.md) will be further streamlined.
   - The plan is to have these [models](/cairo/models.md) auto-generated, which would significantly simplify the development process and reduce the manual effort required for synchronization.

5. **Importance of Understanding Models**:
   - Before diving into game development with Dojo in Unity, it’s recommended to have a solid understanding of how [models](/cairo/models.md) work in the Dojo environment.
   - This knowledge is crucial for effectively designing and implementing game elements that interact seamlessly between the blockchain and the game's user interface.

In summary, [models](/cairo/models.md) are the bridge between the onchain (Dojo) and off-chain (Unity) aspects of your game.

### Adding Models

The process to add models is:

1. Define in your dojo cairo contracts
2. Define in your Unity world making sure they accurately reflect

### Adding Systems

[insert]

### Entities

Via toriiClient [models](/cairo/entities.md) are synced to Unity and are comprised of the models that you defined.

### Starter Project

Get started by:

0. [Prerequisites](#prerequisites)
1. Cloning the [dojo.unity](https://github.com/dojoengine/dojo.unity)
2. Open project within Unity
3. Run the [dojo-starter](https://github.com/dojoengine/dojo-starter-unity) project and make sure to have Katana and Torii running.
