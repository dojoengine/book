# Dojo.js Packages

Dojo.js offers a suite of packages that can be used independently or collectively. These packages are continuously evolving and welcome contributions.

## Core

The Dojo core package provides the `DojoProvider`, which is essential for executing worlds.

Pass in a manifest and rpc to generate the provider. It extends the Starknet.js RPC Provider.

```ts
const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);
```

## Create Burner

This package facilitates the creation of burner wallets, enhancing user onboarding and transaction management.

## Create Dojo

This package is responsible for the `create-dojo` command, which bootstraps new Dojo projects.

## React

The React package offers hooks for managing state based on the [RECS](https://mud.dev/state-query/typescript/recs) state library by Lattice.

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
