---
title: "Dojo Unity Example Project"
description: "Step-by-step guide for running the example project using Dojo Starter and dojo.unity"
---

# Example with Dojo Starter and dojo.unity

This section provides a walkthrough for running the example from the dojo.unity repository using the `Dojo Starter` repository.

[![dojo.unity demo](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fyoutu.be%2F25ocgPsHs4w)](https://youtu.be/25ocgPsHs4w)

## Prerequisites

-   Clone the [Dojo.unity](https://github.com/dojoengine/dojo.unity) repository.
-   Clone the [Dojo Starter](https://github.com/dojoengine/dojo-starter) repository.

## Setting up Dojo Starter

Follow the steps outlined in the [Dojo Starter setup guide](/tutorials/dojo-starter.mdx):

1. Launch Katana.
2. Build with Sozo.
3. Launch Torii.

## Setting up dojo.unity

1. Open the scene: In the `Project tab`, navigate to `Assets/Spawn And Move/Scenes/Sample scene`
2. Adjusting Scriptable Objects:

    - Verify that the `player address` and `player private` key in `Assets/Spawn And Move/Dojo5.0Data` match the output of the Katana terminal.
    - Verify that the `world address` in the Scriptable Object located at `Assets/Dojo/Runtime/Config/WorldManagerLocalConfig` matches the output of the Sozo migrate command.

## Running the Example

1. Play the opened scene.
2. To spawn an entity, press the `space key`.
3. To move the entity, use the keys: `a (left)`, `w (forward)`, `s (backward)`, `d (right)`.

> You can create multiple entities by pressing the `space` key. To select an entity for movement, simply `right-click` on it.
