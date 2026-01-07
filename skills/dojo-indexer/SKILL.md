---
name: dojo-indexer
description: Set up and configure Torii indexer for GraphQL queries, gRPC subscriptions, and SQL access. Use when indexing your deployed world for client queries or real-time updates.
allowed-tools: Read, Write, Bash, Grep
---

# Dojo Indexer (Torii)

Set up and use Torii, the Dojo indexer, for efficient querying and real-time subscriptions to your world state.

## When to Use This Skill

- "Set up Torii indexer"
- "Configure GraphQL for my world"
- "Create subscriptions for entity updates"
- "Query world state efficiently"

## What This Skill Does

Manages Torii indexer:
- Start and configure Torii
- Create GraphQL queries
- Set up gRPC subscriptions
- Use SQL access patterns
- Handle custom indexing
- Optimize query performance

## Quick Start

**Start Torii:**
```
"Start Torii indexer for my deployed world"
```

**GraphQL queries:**
```
"Create GraphQL query for all player positions"
```

**Subscriptions:**
```
"Set up real-time subscriptions for entity updates"
```

## What is Torii?

Torii is the Dojo indexer that:
- Watches blockchain for world events
- Indexes model state changes
- Provides GraphQL API for queries
- Provides gRPC API for subscriptions
- Offers SQL access for complex queries
- Caches data for fast access

**Why use Torii:**
- ✓ Faster than direct RPC queries
- ✓ Complex queries (filters, joins, pagination)
- ✓ Real-time subscriptions
- ✓ SQL access for analytics
- ✓ Caching for performance

## Starting Torii

### Basic Usage

```bash
torii \
    --world WORLD_ADDRESS \
    --rpc http://localhost:5050
```

### With All Options

```bash
torii \
    --world 0xabc... \
    --rpc http://localhost:5050 \
    --database torii.db \
    --indexing-from-block 0 \
    --allowed-origins "*"
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `--world` | World contract address | Required |
| `--rpc` | RPC endpoint URL | Required |
| `--database` | SQLite database path | `torii.db` |
| `--indexing-from-block` | Start block | `0` |
| `--allowed-origins` | CORS origins | `*` |
| `--graphql-port` | GraphQL port | `8080` |
| `--grpc-port` | gRPC port | `8081` |

## GraphQL API

Torii provides GraphQL endpoint at `http://localhost:8080/graphql`

### Basic Queries

**Get all entities of a model:**
```graphql
query {
  positions {
    edges {
      node {
        player
        x
        y
      }
    }
  }
}
```

**Get single entity:**
```graphql
query {
  position(id: "0x123") {
    player
    x
    y
  }
}
```

### Filtering

**Filter by field value:**
```graphql
query {
  positions(where: { x: { eq: 10 } }) {
    edges {
      node {
        player
        x
        y
      }
    }
  }
}
```

**Multiple conditions:**
```graphql
query {
  positions(
    where: {
      x: { gte: 10, lte: 20 }
      y: { eq: 5 }
    }
  ) {
    edges {
      node {
        player
        x
        y
      }
    }
  }
}
```

### Pagination

**Cursor-based pagination:**
```graphql
query {
  positions(first: 10, after: "cursor_value") {
    edges {
      node {
        player
        x
        y
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Sorting

```graphql
query {
  positions(orderBy: { x: ASC }, first: 10) {
    edges {
      node {
        player
        x
        y
      }
    }
  }
}
```

### Relationships

**Query related entities:**
```graphql
query {
  players {
    edges {
      node {
        address
        position {
          x
          y
        }
        health {
          current
          max
        }
        inventory {
          gold
          items
        }
      }
    }
  }
}
```

## gRPC Subscriptions

Real-time updates via gRPC at `grpc://localhost:8081`

### Entity Subscriptions

Subscribe to specific entity changes:
```typescript
import { createClient } from '@dojoengine/torii-client';

const client = await createClient({
    rpcUrl: "http://localhost:5050",
    toriiUrl: "http://localhost:8080",
    worldAddress: WORLD_ADDRESS,
});

// Subscribe to Position changes
await client.onEntityUpdated(
    [{ model: "Position", keys: [playerId] }],
    (entity) => {
        console.log("Position updated:", entity);
    }
);
```

### Model Subscriptions

Subscribe to all entities of a model:
```typescript
// Subscribe to all Position updates
await client.onModelUpdated(
    "Position",
    (entities) => {
        console.log("Positions updated:", entities);
    }
);
```

### Event Subscriptions

Subscribe to world events:
```typescript
await client.onEventEmitted(
    "Moved",
    (event) => {
        console.log("Player moved:", event);
    }
);
```

## SQL Access

Torii stores data in SQLite, accessible for complex queries.

### Connection

```bash
sqlite3 torii.db
```

### Schema

Torii creates tables for each model:
```sql
-- Position model table
CREATE TABLE position (
    id TEXT PRIMARY KEY,
    player TEXT NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

### Complex Queries

**Spatial queries:**
```sql
SELECT * FROM position
WHERE x BETWEEN 10 AND 20
  AND y BETWEEN 5 AND 15;
```

**Aggregations:**
```sql
SELECT
    AVG(health.current) as avg_health,
    COUNT(*) as player_count
FROM health;
```

**Joins:**
```sql
SELECT
    p.player,
    p.x,
    p.y,
    h.current as health
FROM position p
JOIN health h ON p.player = h.player
WHERE h.current < 50;
```

## Client Integration

### JavaScript/TypeScript

```typescript
import { createClient } from '@dojoengine/torii-client';

const client = await createClient({
    rpcUrl: "http://localhost:5050",
    toriiUrl: "http://localhost:8080",
    worldAddress: WORLD_ADDRESS,
});

// Query entities
const positions = await client.getEntities({
    model: "Position",
    where: { x: { $gte: 10 } },
    limit: 10
});

// Subscribe to updates
await client.onEntityUpdated(
    [{ model: "Position", keys: [playerId] }],
    (entity) => updateUI(entity)
);
```

### GraphQL Client (Apollo)

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
});

// Query
const { data } = await client.query({
    query: gql`
        query GetPositions {
            positions(where: { x: { gte: 10 } }) {
                edges {
                    node {
                        player
                        x
                        y
                    }
                }
            }
        }
    `
});
```

## Performance Optimization

### Indexing Strategies

**Index from specific block:**
```bash
# Skip early blocks with no data
torii --indexing-from-block 1000 ...
```

**Selective model indexing:**
Configure in `torii.toml`:
```toml
[indexing]
models = ["Position", "Health"]  # Only index these models
```

### Query Optimization

**Use pagination:**
```graphql
query {
  positions(first: 50) {  # Limit results
    edges {
      node { player x y }
      cursor
    }
  }
}
```

**Filter early:**
```graphql
query {
  # ✅ Filter in query
  positions(where: { x: { gte: 10 } }) {
    edges { node { player x y } }
  }
}

# ❌ Don't fetch all then filter client-side
```

**Select only needed fields:**
```graphql
query {
  positions {
    edges {
      node {
        x y  # Only fields needed
      }
    }
  }
}
```

## Deployment Patterns

### Development Setup

```bash
# Terminal 1: Katana
katana --dev

# Terminal 2: Deploy world
sozo migrate

# Terminal 3: Torii
torii --world WORLD_ADDRESS --rpc http://localhost:5050
```

### Production Setup

```bash
# Use production RPC
torii \
    --world 0xabc... \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --database /data/torii.db \
    --allowed-origins "https://mygame.com"
```

### Docker Deployment

```dockerfile
FROM ghcr.io/dojoengine/torii:latest

CMD ["torii", \
     "--world", "${WORLD_ADDRESS}", \
     "--rpc", "${RPC_URL}", \
     "--database", "/data/torii.db"]
```

## Monitoring

### Health Check

```bash
curl http://localhost:8080/health
```

### Indexing Status

```graphql
query {
  indexingStatus {
    currentBlock
    latestBlock
    synced
  }
}
```

### Database Size

```bash
du -h torii.db
```

## Troubleshooting

### "Connection refused"
- Check Torii is running
- Verify port (default 8080)
- Check firewall rules

### "World not found"
- Verify world address is correct
- Check RPC URL is correct
- Ensure world is deployed on that network

### "Slow queries"
- Add database indexes
- Use pagination
- Filter results early
- Reduce field selection

### "Out of sync"
- Check RPC connection
- Restart Torii
- Verify starting block
- Check database isn't corrupted

## Best Practices

- Start Torii immediately after world deployment
- Use GraphQL for complex queries
- Use gRPC for real-time updates
- Don't query RPC directly from clients
- Monitor indexing lag
- Backup database regularly
- Use appropriate pagination
- Filter queries server-side

## Next Steps

After Torii setup:
1. Integrate with client (`dojo-client` skill)
2. Create optimized queries
3. Set up subscriptions
4. Monitor performance
5. Scale horizontally if needed

## Related Skills

- **dojo-deploy**: Deploy world first
- **dojo-client**: Use Torii in clients
- **dojo-world**: Configure what Torii indexes
- **dojo-migrate**: Restart Torii after migrations
