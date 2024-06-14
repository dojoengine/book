# Dojo.js Packages

These packages can be used independently or collectively. They are still a work in progress and welcome contributions.

## Core

Dojo core exposes a helpful `DojoProvider` which can be used to execute worlds.

Pass in a manifest and rpc to generate the provider. It extends the Starknet.js RPC Provider.

```ts
const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);
```

## Create Burner

Allows the creation of burner wallets.

## Create Dojo

Responsible for the create-dojo command allowing bootstrapping of projects.

## React

React hooks are used to manage the states based off RECS.

### useEntityQuery, Has and HasValue

To retrieve entities, use the `useEntityQuery` hook. This returns an array of entity ids, not directly the entities themselves. See `useComponentValue` for more information.

```ts
const players = useEntityQuery([Has(Player)]);
```

If you want to filter values, use `HasValue` with an object containing the fields to filter and the values for each filter.

```ts
const filteredPlayers = useEntityQuery([
  HasValue(Player, { address: account.address }),
]);
```

### useComponentValue

This hook is used to retrieve the value of a component. It returns the value of the component, or `undefined` if the component is not present.

```ts
// Retrieve the entity ids of all players model
const players = useEntityQuery([Has(Player)]);

// Retrieve the player entity
const player = useComponentValue(players[0], Player);
```

If you need to use all the entities retrieved, you need to pass the entityId to another component and use `useComponentValue` to retrieve the value inside this component.

```ts
// Pseudo-code

// Players.tsx

// Retrieve the entity ids of all players model
const players = useEntityQuery([Has(Player)]);

return (
  <>
    {players.map((player) => (
      <PlayerComponent key={player.id} player={player} />
    ))}
  </>
);

// PlayerComponent.tsx

// Retrieve the player entity
const player = useComponentValue(props.player, Player);
```

## Torii-WASM

Torii WASM exposes a torii-client for worlds to consume.

## Torii-Client

This library is used to sync all the entities that are already in the world on startup.

We first initialize the torii client.

```ts
const toriiClient = await torii.createClient([], {
  rpcUrl: config.rpcUrl, // Katana URL
  toriiUrl: config.toriiUrl, // Torii URL
  relayUrl: "", // relay URL
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

## State

### Recs

Currently you can generate the RECS bindings based off your world.

You might need to change the path of this to suit your project.

`npx @dojoengine/core ../../dojo-starter/target/dev/manifest.json src/dojo/generated/contractComponents.ts http://localhost:5050 0x28f5999ae62fec17c09c52a800e244961dba05251f5aaf923afabd9c9804d1a`

#### overridableComponent

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

#### addOverride and removeOverride

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
      getComponentValue(Position, entityId) as any,
    ).vec,
  },
});

// ...
// Send transaction
// ...

Position.removeOverride(positionId);
```

You can check the [`createSystemCalls`]("https://github.com/dojoengine/dojo.js/blob/main/examples/react/react-app/src/dojo/createSystemCalls.ts") file to see this full example of the addOverride and removeOverride functions in action.

#### defineComponent

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

### Zustand
