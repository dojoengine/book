---
title: GraphQL API
description: Complete guide to Torii's GraphQL interface, including queries, subscriptions, pagination, and real-time world state access.
---

# GraphQL API

Torii's GraphQL API provides type-safe access to your indexed Dojo world data. The schema is dynamically generated from your world's models, offering both flexible queries and real-time subscriptions.

## Quick Start

Start Torii and access the GraphQL endpoint:

```sh
torii --world <WORLD_ADDRESS>
```

**Endpoints:**

- GraphQL API: `http://localhost:8080/graphql`
- GraphiQL IDE: `http://localhost:8080/graphql` (in browser)

## Core Features

- **Dynamic Schema**: Auto-generated from your world's model definitions
- **Real-time Subscriptions**: WebSocket-based live updates
- **Flexible Pagination**: Cursor-based and offset/limit support
- **Type Safety**: Fully typed with introspection support

## Schema Structure

Torii generates two types of queries:

**Generic Queries:**

- `entities` - Access all entities with flexible filtering
- `models` - Retrieve model definitions and metadata
- `transactions` - Query indexed transaction data

**Model-Specific Queries:**

- `{modelName}Models` - Custom queries for each registered model
- Example: `positionModels`, `movesModels`, `playerModels`

Model-specific queries provide optimized filtering, sorting, and type-safe field access.

## Basic Queries

### Model Metadata

Query model information using the model selector:

```graphql
query {
    model(id: "0x28b9a...") {
        id
        name
        classHash
    }
}
```

This query will return an output like this:

```json
{
    "data": {
        "model": {
            "id": "0x28b9a...",
            "name": "Position",
            "classHash": "0x2e9c4..."
        }
    }
}
```

> **Tip**: Use [stark-utils](https://www.stark-utils.xyz/) or `starkli` to compute model selectors.

:::info
You can find information about your schema definitions in the **Documentation Explorer** section of the GraphQL IDE.
:::

### Model Data

Query specific model data with automatic pagination:

```graphql
query {
    movesModels {
        edges {
            node {
                player
                remaining
                last_direction
            }
        }
    }
}
```

This query will return an output like this:

```json
{
    "data": {
        "movesModels": {
            "edges": [
                {
                    "node": {
                        "player": "0xb3ff4...",
                        "remaining": 100,
                        "last_direction": "None"
                    }
                }
            ]
        }
    }
}
```

### Transactions

Query world transactions with pagination:

```graphql
query {
    transactions {
        edges {
            node {
                id
                transactionHash
                senderAddress
            }
        }
        totalCount
    }
}
```

This query will return an output like this:

```json
{
    "data": {
        "transactions": {
            "edges": [
                {
                    "node": {
                        "id": "0x00000...:0x4b264...",
                        "transactionHash": "0x4b264...",
                        "senderAddress": "0xb3ff4...",
                        "calldata": [
                            "0x1",
                            "0x7ec42...",
                            "0x217c7...",
                            "0x0"
                        ]
                    }
                },
                # ... four more results
            ],
            "totalCount": 5
        }
    }
}
```

## Pagination

Torii supports both cursor-based and offset/limit pagination using GraphQL [Connection](https://relay.dev/graphql/connections.htm#sec-Connection-Types) types.

### Cursor-Based Pagination

Recommended for performance. Use `first`/`after` for forward pagination, `last`/`before` for backward:

```graphql
query {
    entities(first: 10) {
        edges {
            cursor
            node {
                id
            }
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
```

This query will return an output like this, with two results out of five.

```json
{
    "entities": {
        "totalCount": 5,
        "edges": [
            {
                "cursor": "Y3Vyc29yX29uZQ==",
                "node": {
                    "id": "0x54f58..."
                }
            },
            {
                "cursor": "Y3Vyc29yX3R3bw==",
                "node": {
                    "id": "0x2c2ed..."
                }
            }
        ]
    }
}
```

Next page, using the cursor from the previous query.

```graphql
query {
    entities(first: 3, after: "Y3Vyc29yX3R3bw==") {
        # ... same fields
    }
}
```

### Offset/Limit Pagination

Simpler but less efficient for large datasets:

```graphql
query {
    entities(offset: 20, limit: 10) {
        edges {
            node {
                id
            }
        }
        totalCount
    }
}
```

## Real-time Subscriptions

Subscriptions provide WebSocket-based real-time updates when world state changes.

### Model Registration

Listen for new model registrations:

```graphql
subscription {
    modelRegistered {
        id
        name
        namespace
    }
}
```

### Entity Updates

Subscribe to specific entity changes:

```graphql
subscription {
    entityUpdated(id: "0x54f58...") {
        id
        updatedAt
        models {
            __typename
            ... on Position {
                vec {
                    x
                    y
                }
            }
            ... on Moves {
                remaining
            }
        }
    }
}
```

### Event Stream

Monitor all world events with filtering support:

```graphql
subscription {
    eventEmitted {
        id
        keys
        data
        transactionHash
    }
}
```

## GraphiQL IDE

Use the built-in GraphiQL IDE at `http://localhost:8080/graphql` to:

- **Explore Schema**: Browse all available queries, mutations, and subscriptions
- **Auto-completion**: IntelliSense support for writing queries
- **Real-time Testing**: Test subscriptions with live data
- **Documentation**: Built-in schema documentation

## Best Practices

**Query Optimization:**

- Use model-specific queries instead of generic `entities` for better performance
- Request only the fields you need
- Use cursor-based pagination for large datasets

**Real-time Updates:**

- Subscribe to specific entities rather than all events when possible
- Handle connection drops and reconnection in production
- Use subscription filters to reduce bandwidth
