# RECS

RECS is a powerful library for managing game state in Dojo-powered applications. It provides a flexible and efficient way to organize and manipulate game data using an entity-component-system architecture.

Key features:

- Efficiently manage and query game state
- Seamlessly integrate with React applications or pure js

RECS is a [state library developed by Lattice](https://mud.dev/state-query/typescript/recs), with minimal modifications for Dojo compatibility. For comprehensive documentation, refer to the [official RECS documentation](https://mud.dev/state-query/typescript/recs).

## Generating RECS Bindings

Use the following command to generate RECS bindings:

`npx @dojoengine/core <PATH TO MANIFEST> <PATH TO GENERATE COMPONENTS> <RPC URL> <WORLD ADDRESS>`

## Useful RECS Patterns

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
      getComponentValue(Position, entityId) as any
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
