# Dojo Unity Concepts

To dive into the exciting world of on-chain games and worlds with Unity, let's explore some essential concepts 

## World Manager

The World Manager is the central hub for organizing and controlling entities within your Dojo world in Unity.

![world-manager](/unity/world-manager.png)

During initialization, the World Manager receives WorldManagerData, which defines essential settings like your Torii URL, RPC URL, and world address. While these settings are initially provided, you have the flexibility to adjust them by creating different scriptable objects.

![world-manager-data](/unity/world-manager-data.png)

In Unity, entities are represented by GameObject instances. The World Manager simplifies their management by offering methods to:

* Add and remove entities
* Access entities by name or list all entities

## Synchronization Master

The Synchronization Master acts as the bridge between Unity and your Dojo world, seamlessly synchronizing and managing entities.

![sync-master](/unity/sync-master.png)

Key Features:

* Control synchronization: Set the maximum number of entities to synchronize.
* Event-driven communication:
  * OnSynchronized: Notifies you when entities were successfully synchronized from Dojo world to Unity.
  * OnEntitySpawned: Triggered whenever a new entity is spawned in the Unity environment.

* Dynamic entity management:
  * SynchronizeEntities: Asynchronously retrieves and spawns entities from the Dojo world in the Unity environment.
  * HandleEntityUpdate: Dynamically updates existing entities or spawns new ones based on changes received from the Dojo world, ensuring seamless synchronization.

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
