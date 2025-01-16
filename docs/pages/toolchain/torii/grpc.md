---
title: gRPC in Torii
description: Overview of using gRPC with Torii for efficient data fetching and entity/model event subscriptions.
---

## gRPC

_TL;DR_

- gRPC is an efficient way to fetch your data
- You can subscribe to entity and model events via the gRPC
- Read more - [gRPC](https://grpc.io/docs/what-is-grpc/introduction/)

You can use the gRPC directly or you can use it through a developed client. A great way to use it is via [dojo.js](/client/sdk/javascript.mdx)
You can also check out the basic [playground](https://github.com/dojoengine/dojo.c/tree/main/playground) which showcases the simplest example of them all.

All the proto files can be found at : [https://github.com/dojoengine/dojo/tree/main/crates/torii/grpc/proto](https://github.com/dojoengine/dojo/tree/main/crates/torii/grpc/proto).
The proto files contains the definition of grpc server capacity.

### Query

Query type is basically used in either `Retrieve` or `Subscribe` grpc calls.

```rust
struct Query {
  /// This will be documented in next part
  clause: Clause,
  /// Max entities returned from query, useful for pagination
  limit: u32,
  /// Returned results offset, useful for pagination
  offset: u32,
  /// Wether you want torii to return internal EntityIds. If you want to know your entity ids and work with it you can set this to `false` otherwise, it will return hexadecimal index of the entity returned
  dont_include_hash_keys: bool,
  /// The way you want your entities to be ordered
  order_by: Vec<OrderBy>,
  /// Whitelist the models you want to retrieve
  entity_models: Vec<String>,
  /// Here you can set the latest timestamp of the query you've made. If you've cached some entities you may only want to retrieve those that have changed.
  entity_updated_after: u64,
}
```

### Clause

This is the primitive to query you entities.

```rust
enum Clause {
  /// Query your entities based on keys (defined #[key] in your dojo models)
  EntityKeys: KeysClause,
  /// Internal torii entity ids.
  HashedKeys: HashedKeysClause,
  /// Query your entities based on their members values (for instance dojo_starter-Moves.remaining > 10)
  Member: MemberClause,
  /// Compose previous clause with "And" | "Or" logical operator to create those complex data fetching queries
  Composite: CompositeClause,
}

struct KeysClause {
  /// Keys values, you can use 'undefined' or an empty string as a wildcard to match any keys
  keys: Vec<String>,
  /// VariableLen: use it if you want at least `keys` matching your query
  /// FixedLen: use if you want keys to match exactly what you've passed in your query
  pattern_matching: "VariableLen" | "FixedLen",
  /// Model names that you want to query
  models: Vec<String>,
}

struct HashedKeysClause {
  /// Query over HashedKeys returned by torii
  hashed_keys: Vec<String>
}

struct MemberClause {
  /// Model name you want to query
  model: String,
  /// Member key that you want to use as comparison
  member: String,
  /// How to query your model
  operator: ComparisonOperator,
  /// The value you want to compare
  value: MemberValue,
}

struct CompositeClause {
  /// List of clauses that you want to compose you can use nested Composite queries (if you want an extra spicy recipe)
  clauses: Vec<Clause>,
  /// How to match clauses
  operator: "Or" | "And",
}


enum MemberValue {
  /// Single string to compare
  String: String,
  /// Nested params to query over multiple values
  MemberValueList: Vec<MemberValue>
  /// Use primitive types for query
  Primitive: enum {
    i8: i8,
    i16: i16,
    i32: i32,
    i64: i64,
    i128: Vec<u8>,
    u8: u32,
    u16: u32,
    u32: u32,
    u64: u64,
    u128: Vec<u8>,
    u256: Vec<u8>,
    usize: u32,
    bool: bool,
    felt252: Vec<u8>,
    class_hash: Vec<u8>,
    contract_address: Vec<u8>,
  },
}

enum ComparisonOperator {
  Eq, Neq, Gt, Gte, Lt, Lte, In, NotIn
}
```

### OrderBy

```rust
struct OrderBy {
  /// Model prefixed with namespace: "dojo_starter-Moves"
  model: String,
  /// Member key of the model passed as model : "remaining"
  member: String,
  /// Direction of the given results
  direction: "Asc" | "Desc",
}
```

### Key-based Query

Get everything that has at least one key

```json
{
    "Keys": {
        "keys": [""],
        "pattern_matching": "VariableLen",
        "models": []
    }
}
```

Query entities that only have one key

```json
{
    "Keys": {
        "keys": [
            "0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec"
        ],
        "pattern_matching": "FixedLen",
        "models": []
    }
}
```

Query entities that have at least "0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec" as key

```json
{
    "Keys": {
        "keys": [
            "0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec"
        ],
        "pattern_matching": "VariableLen",
        "models": []
    }
}
```

### Member-based Queries

Query players with more than 10 moves remaining:

```json
{
    "Member": {
        "model": "dojo_starter-Moves",
        "member": "remaining",
        "operator": "Gt",
        "value": {
            "Primitive": {
                "U32": 10
            }
        }
    }
}
```

Query positions where x > 0:

```json
{
    "Member": {
        "model": "dojo_starter-Position",
        "member": "x",
        "operator": "Gt",
        "value": {
            "Primitive": {
                "U32": 0
            }
        }
    }
}
```

Query active game states:

```json
{
    "Member": {
        "model": "dojo_starter-GameState",
        "member": "active",
        "operator": "Eq",
        "value": {
            "Primitive": {
                "Bool": true
            }
        }
    }
}
```

## Complex Queries

### Composite AND/OR Query

Find active players within a specific area:

```json
{
    "Composite": {
        "operator": "And",
        "clauses": [
            {
                "Member": {
                    "model": "dojo_starter-GameState",
                    "member": "active",
                    "operator": "Eq",
                    "value": {
                        "Primitive": {
                            "Bool": true
                        }
                    }
                }
            },
            {
                "Composite": {
                    "operator": "Or",
                    "clauses": [
                        {
                            "Member": {
                                "model": "dojo_starter-Position",
                                "member": "x",
                                "operator": "Gt",
                                "value": {
                                    "Primitive": {
                                        "U32": 0
                                    }
                                }
                            }
                        },
                        {
                            "Member": {
                                "model": "dojo_starter-Position",
                                "member": "y",
                                "operator": "Gt",
                                "value": {
                                    "Primitive": {
                                        "U32": 0
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Complete Query With All Options

Example of a complete query with pagination, ordering, and filtering:

```json
{
    "limit": 10,
    "offset": 0,
    "clause": {
        "Member": {
            "model": "dojo_starter-Moves",
            "member": "remaining",
            "operator": "Gt",
            "value": {
                "Primitive": {
                    "U32": 0
                }
            }
        }
    },
    "dont_include_hashed_keys": false,
    "order_by": [
        {
            "model": "dojo_starter-Moves",
            "member": "remaining",
            "direction": "Desc"
        }
    ],
    "entity_models": ["dojo_starter-Moves"],
    "entity_updated_after": 0
}
```

## Model-Specific Query Examples

### Position Range Query

Query positions within a specific range:

```json
{
    "Composite": {
        "operator": "And",
        "clauses": [
            {
                "Member": {
                    "model": "dojo_starter-Position",
                    "member": "x",
                    "operator": "Gte",
                    "value": {
                        "Primitive": {
                            "U32": 0
                        }
                    }
                }
            },
            {
                "Member": {
                    "model": "dojo_starter-Position",
                    "member": "y",
                    "operator": "Lt",
                    "value": {
                        "Primitive": {
                            "U32": 100
                        }
                    }
                }
            }
        ]
    }
}
```

### Moves Query

Query for active players with available moves:

```json
{
    "Composite": {
        "operator": "And",
        "clauses": [
            {
                "Member": {
                    "model": "dojo_starter-Moves",
                    "member": "remaining",
                    "operator": "Gt",
                    "value": {
                        "Primitive": {
                            "U32": 0
                        }
                    }
                }
            },
            {
                "Member": {
                    "model": "dojo_starter-Moves",
                    "member": "can_move",
                    "operator": "Eq",
                    "value": {
                        "Primitive": {
                            "Bool": true
                        }
                    }
                }
            }
        ]
    }
}
```

## Common Query Patterns

### Basic Pagination Query

```json
{
    "limit": 25,
    "offset": 0,
    "clause": null,
    "dont_include_hashed_keys": false,
    "order_by": [],
    "entity_models": [],
    "entity_updated_after": 0
}
```

### Model Filtering Query

```json
{
    "limit": 100,
    "offset": 0,
    "clause": null,
    "dont_include_hashed_keys": false,
    "order_by": [],
    "entity_models": ["dojo_starter-Position", "dojo_starter-Moves"],
    "entity_updated_after": 0
}
```

### Ordered Query

```json
{
    "limit": 100,
    "offset": 0,
    "clause": null,
    "dont_include_hashed_keys": false,
    "order_by": [
        {
            "model": "dojo_starter-Moves",
            "member": "remaining",
            "direction": "Desc"
        }
    ],
    "entity_models": [],
    "entity_updated_after": 0
}
```
