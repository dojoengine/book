# Storage

In a Dojo Autonomous World, the `World` contract serves as the central store that manages and maintains the overall state. No state is maintained at the component level, this allows a clean split in logic and state. Most developers will not need to touch the storage methods, every part of the world can just be maintained via the [commands](./commands.md).


## Detailed overview of Storage

State is maintained via an generated partition when you create a component. The compiler calculates the size of the component along with the key you have used and creates a partition within the world. Think of the partition as a table which can be read from and written to.
