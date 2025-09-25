---
title: gRPC API
description: High-performance gRPC interface for efficient world state queries, subscriptions, and real-time data streaming.
---

# gRPC API

Torii's gRPC API provides high-performance access to indexed world data through binary serialization and streaming capabilities.
It's designed for applications requiring low latency and efficient data fetching.

## Quick Start

**Endpoint**: `http://localhost:8080` (gRPC protocol)

**Protocol Type Definitions**: [torii/proto/types](https://github.com/dojoengine/torii/blob/main/crates/proto/proto/types.proto)

**Client Libraries**:

- [dojo.js](/client/sdk/javascript) - JavaScript/TypeScript
- [dojo.c playground](https://github.com/dojoengine/dojo.c/tree/main/playground) - C/C++

## Core Concepts

### Query Structure

Both `Retrieve` and `Subscribe` queries use the `Query` message with these fields:

```cairo
struct Query {
  clause: Clause;                  // What to query
  limit: uint32;                   // Max results (pagination)
  offset: uint32;                  // Skip results (pagination)
  dont_include_hashed_keys: bool;  // Performance optimization
  order_by: Vec<OrderBy>;          // Sort order
  entity_models: Vec<String>;      // Filter models
  entity_updated_after: uint64;    // Incremental updates
}
```

### `Clause` Types

**Keys Clause** - Query by entity keys:

```json
{
    "Keys": {
        "keys": ["0x127fd..."],
        "pattern_matching": "FixedLen",
        "models": ["dojo_starter-Position"]
    }
}
```

:::info
The `HashedKeys` clause can be used with the model's underlying [hashed composite key](https://dojoengine.org/framework/models/entities)
:::

**Member Clause** - Query by field values:

```json
{
    "Member": {
        "model": "dojo_starter-Moves",
        "member": "remaining",
        "operator": "Gt",
        "value": { "Primitive": { "U32": 10 } }
    }
}
```

**Composite Clause** - Combine multiple queries:

```json
{
    "Composite": {
        "operator": "And",
        "clauses": [
            /* multiple clauses */
        ]
    }
}
```

## Query Examples

### Basic Entity Query

Get all entities with any key:

```json
{
    "clause": {
        "Keys": {
            "keys": [""],
            "pattern_matching": "VariableLen",
            "models": []
        }
    },
    "limit": 50
}
```

### Field-Based Query

Find players with moves remaining:

```json
{
    "clause": {
        "Member": {
            "model": "dojo_starter-Moves",
            "member": "remaining",
            "operator": "Gt",
            "value": { "Primitive": { "U32": 0 } }
        }
    }
}
```

### Position Range Query

Find entities in coordinate range:

```json
{
    "clause": {
        "Composite": {
            "operator": "And",
            "clauses": [
                {
                    "Member": {
                        "model": "dojo_starter-Position",
                        "member": "x",
                        "operator": "Gte",
                        "value": { "Primitive": { "U32": 0 } }
                    }
                },
                {
                    "Member": {
                        "model": "dojo_starter-Position",
                        "member": "x",
                        "operator": "Lt",
                        "value": { "Primitive": { "U32": 100 } }
                    }
                }
            ]
        }
    }
}
```

## Pagination & Sorting

### Basic Pagination with `limit` and `offset`

```json
{
    "limit": 25,
    "offset": 50,
    "clause": null
}
```

### Ordered Results with `order_by`

```json
{
    "order_by": [
        {
            "model": "dojo_starter-Moves",
            "member": "remaining",
            "direction": "Desc"
        }
    ]
}
```

### Model Filtering with `entity_models`

```json
{
    "entity_models": ["dojo_starter-Position", "dojo_starter-Moves"]
}
```

## Operators & Values

### Comparison Operators

- `Eq`, `Neq` - Equal, not equal
- `Gt`, `Gte` - Greater than, greater than or equal
- `Lt`, `Lte` - Less than, less than or equal
- `In`, `NotIn` - In list, not in list

### Value Types

```json
{
  "Primitive": {
    "U32": 42,           // Numbers
    "Bool": true,        // Booleans
    "felt252": [...]     // Byte arrays for felt252
  }
}
```

### Pattern Matching

- `FixedLen` - Exact key match
- `VariableLen` - Prefix match (at least these keys)

## Performance Tips

**Query Optimization**:

- Set `dont_include_hashed_keys: true` for better performance if you don't need entity IDs
- Use specific models in `entity_models` to reduce data transfer
- Prefer `VariableLen` pattern matching for flexible key queries

**Incremental Updates**:

- Use `entity_updated_after` with timestamps for efficient polling
- Combine with subscriptions for real-time updates

**Pagination**:

- Use reasonable `limit` values (25-100 entities)
- Implement pagination for large datasets

## Subscriptions

gRPC supports streaming subscriptions for real-time updates:

- **Entity Updates**: Subscribe to changes in specific entities
- **Event Streams**: Monitor world events as they occur
- **Model Changes**: Track updates to specific model types

:::note
Subscription examples require protocol buffer definitions.
See the [protocol files](https://github.com/dojoengine/torii/blob/main/crates/proto/proto/types.proto) for complete streaming API documentation.
:::

## Best Practices

**Connection Management**:

- Use connection pooling for high-throughput applications
- Handle reconnection logic for streaming subscriptions
- Set appropriate timeouts for long-running queries

**Query Design**:

- Start with simple queries and add complexity as needed
- Use composite queries sparingly - prefer multiple simple queries
- Test query performance with realistic data volumes

**Data Handling**:

- Process results incrementally for large datasets
- Cache frequently accessed entities locally
- Use model filtering to minimize bandwidth
