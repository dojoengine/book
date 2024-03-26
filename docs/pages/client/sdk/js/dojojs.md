# dojo.js

## Prerequisites

Before getting started, there are a few steps you must follow in order to get the project up and running.

### Dojo

Ensure that you're using the latest supported Dojo [version](https://github.com/dojoengine/dojo/releases).

### Starter Projects

All start projets are based on the [dojo-starter](https://github.com/dojoengine/dojo-starter) project.

There are currently 4 starter projects available:
- react-app: simple react app
- react-phaser-example: react app using Phaser.js
- react-pwa-app: React Progressive Web App
- react-treejs: react app using drei (Three.js)

1. Run `npx @dojoengine/create-dojo`
2. Pick `react-app`
3. `cd react-app`
4. `bun install` to install dependencies
5. `bun dev` to run the project
6. You need to start Katana, Torii and run the [dojo-starter](https://github.com/dojoengine/dojo-starter) project.
7. Head to http://localhost:3000

## Core documentation

## React documentation

React hooks are used to manage the states. Whenever Torii receives a new entity, it will trigger the `useEntityQuery` hook.

### useEntityQuery, Has and HasValue

To retrieve entities, use the `useEntityQuery` hook. This returns an array of entity ids, not directly the entities themselves. See `useComponentValue` for more information.

```ts
const players = useEntityQuery([Has(Player)])
```

If you want to filter values, use `HasValue` with an object containing the fields to filter and the values for each filter.

```ts
const filteredPlayers = useEntityQuery([HasValue(Player, { address: account.address })])
```

### useComponentValue

This hook is used to retrieve the value of a component. It returns the value of the component, or `undefined` if the component is not present.

```ts
// Retrieve the entity ids of all players model
const players = useEntityQuery([Has(Player)])

// Retrieve the player entity
const player = useComponentValue(players[0], Player)
```

If you need to use all the entities retrieved, you need to pass the entityId to another component and use `useComponentValue` to retrieve the value inside this component.

```ts
// Pseudo-code

// Players.tsx

// Retrieve the entity ids of all players model
const players = useEntityQuery([Has(Player)])

return (
    <>
        {
            players.map((player) => (
                <PlayerComponent key={player.id} player={player} />
            ))
        }
    </>
)

// PlayerComponent.tsx

// Retrieve the player entity
const player = useComponentValue(props.player, Player)
```

## Torii-client

This library is used to sync all the entities that are already in the world on startup.

We first initialize the torii client.

```ts
const toriiClient = await torii.createClient([], {
    rpcUrl: config.rpcUrl, // Katana url
    toriiUrl: config.toriiUrl, // Torii url
    worldAddress: config.manifest.world.address || "", // World contract address
});
```

We then fetch all the entities from the world. using the `getSyncEntities` function from the `state` library.

```ts
import { getSyncEntities } from "@dojoengine/state";

// create contract components
const contractComponents = defineContractComponents(world);

// fetch all existing entities from torii
await getSyncEntities(toriiClient, contractComponents as any);
```

## Recs state library

### overridableComponent

To avoid waiting for the transaction to be validated before seeing the action, you can override components.

You first need to define your components as overridable in `createClientComponents.tsx`. This will add an addOverride and removeOverride function that will be used to override the value when sending the transaction and remove the override when the transaction has ended.

```ts
import { overridableComponent } from "@dojoengine/recs";
import { SetupNetworkResult } from "./setupNetwork";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
    contractComponents,
}: SetupNetworkResult) {
    return {
        ...contractComponents,
        Position: overridableComponent(contractComponents.Position),
    };
}
```

### addOverride and removeOverride

You can add and remove overrides using the addOverride and removeOverride functions.

`addOverride` needs to be called with a new uuid (using the uuid function so that it is unique) and an object containing the entityId to override and the new value.

`removeOverride` needs to be called with the new uuid generated.

```ts
// Extract from createSystemCalls.tsx
const positionId = uuid();
Position.addOverride(positionId, {
    entity: entityId,
    value: {
        player: BigInt(entityId),
        vec: updatePositionWithDirection(
            direction,
            getComponentValue(Position, entityId) as any
        ).vec,
    },
});

// ...
// Send transaction
// ...

Position.removeOverride(positionId)
```

You can check the [`createSystemCalls`]("https://github.com/dojoengine/dojo.js/blob/main/examples/react/react-app/src/dojo/createSystemCalls.ts") file to see this full example of the addOverride and removeOverride functions in action.

### defineComponent

This function is currently used in the generated file `contractComponents.ts` and is used to register the models. Here is an example of how this function is used:

```ts
// Extract from contractComponents.ts
Position: (() => {
    return defineComponent(
        world,
        {
            player: RecsType.BigInt,
            vec: { x: RecsType.Number, y: RecsType.Number },
        },
        {
            metadata: {
                name: "Position",
                types: ["contractaddress", "u32", "u32"],
                customTypes: ["Vec2"],
            },
        }
    );
})(),
```

### defineSystem, defineEnterSystem

## Contribute

To contribute to the project, check the [Contribute section](https://github.com/dojoengine/dojo.js?tab=readme-ov-file#contributing-to-dojojs) of the dojo.js repo.

Core documentation including examples of usage in vanilla JS
React documentation including examples of usage in React
Torii-client explanation
running npx create-dojo
Explanation and code snippets of Recs state library


E2E example using dojo.js
