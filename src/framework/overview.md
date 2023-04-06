## Overview

Dojo employs the ECS (Entity Component System) as an architectural pattern to efficiently manage and organize the state and behavior of Autonomous Worlds (AWs). In this pattern, computation is defined as a list of systems operating on a set of entities, each of which consists of a dynamic set of pure data components. Systems select the entities to process via persistent and efficient queries over the entities' components.

It is worth reading this excellent [FAQ](https://github.com/SanderMertens/ecs-faq) on ECS

### What is an ECS

In the Dojo framework, the ECS pattern is employed to efficiently manage and organize state and behavior. Here's a short glossary adapted from the getting started guide:

1. Entities: Objects with unique IDs that can have multiple components attached.
2. Components: Different facets of an entity (e.g., geometry, physics, hit points); data storage occurs only in components.
3. Systems: Code segments that process entities and modify components.
4. Queries: Used by systems to select entities based on attached components.
5. World: A container for entities, components, systems, and queries.

The typical workflow for building an Dojo World:

1. Envision the entities in your world.
2. Identify shared attributes of entities (position, name, health).
3. Create reusable components based on these abstractions.
4. Design focused systems that excel at performing a single task.

A simple design utilising components and systems to create 4 different entities:

![ECS](../images/ECS.png)