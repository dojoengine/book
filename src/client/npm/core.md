## @dojoengine/core

This library abstracts away the world interface and provides a set of helper functions to interact with the world. It is preferred to use this library over interacting with the world directly.

- World explorers
- World deployers
- Games
- Anaylitics

### Getting Started

```console
yarn add @dojoengine/core
```

### Example Usage

This is an example from [Dojo React App](https://github.com/dojoengine/dojo-starter-react-app)

```javascript
import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { RPCProvider, Query, } from "@dojoengine/core";
import { Account, num } from "starknet";
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {

    const provider = new RPCProvider(import.meta.env.VITE_PUBLIC_WORLD_ADDRESS, import.meta.env.VITE_PUBLIC_NODE_URL);

    return {
        contractComponents: defineContractComponents(world),
        provider,
        execute: async (signer: Account, system: string, call_data: num.BigNumberish[]) => provider.execute(signer, system, call_data),
        entity: async (component: string, query: Query) => provider.entity(component, query),
        entities: async (component: string, partition: number) => provider.entities(component, partition),
        world,
        graphSdk: getSdk(new GraphQLClient(import.meta.env.VITE_PUBLIC_TORII)),
        call: async (selector: string, call_data: num.BigNumberish[]) => provider.call(selector, call_data),
    };
}
```
