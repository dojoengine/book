---
title: SQL Endpoint
description: Direct database access via SQL queries for custom analytics, reporting, and advanced data exploration.
---

# SQL Endpoint

Torii exposes a SQL endpoint for direct database access, enabling custom queries, analytics, and reporting beyond what GraphQL and gRPC provide.

:::warning
The SQL endpoint is under active development.
Database schema and query behavior may change between versions.
:::

## Overview

**Key Features**:

- **Direct Access**: Query the underlying SQLite database directly
- **Custom Analytics**: Build complex aggregations and reports
- **Schema Introspection**: Explore database structure and relationships
- **Read-Only**: Database cannot be modified through this interface

**Use Cases**:

- Custom dashboards and analytics
- Data export and migration
- Advanced filtering not available in GraphQL
- Database schema exploration
- Performance debugging and optimization

## Endpoint Access

The SQL endpoint is available at `/sql` on your Torii server:

- **Base URL**: `http://localhost:8080/sql`
- **Methods**: GET (query parameter) or POST (request body)
- **Format**: Raw SQL queries
- **Response**: JSON format with query results

### Interactive SQL Playground

Visiting `http://localhost:8080/sql` in your browser opens an interactive SQL playground featuring:

- **Monaco Editor**: Full-featured SQL editor with syntax highlighting and auto-completion
- **Schema Explorer**: Browse database tables and columns with expandable tree view
- **Query History**: Automatic query history with favorites and timestamps
- **Real-time Results**: Execute queries and view results in formatted tables
- **Export Options**: Download results as JSON files
- **Performance Metrics**: Query execution time and row count display

:::note
The SQL playground is marked as BETA and actively under development.
:::

## Database Schema

Understanding Torii's database structure is essential for effective querying:

### Core System Tables

#### `entities`

All entities with at least one component (ID is Poseidon hash of keys)

#### `models`

Registry of all models and events with metadata

#### `entity_model`

Junction table mapping entities to their models

#### `model_members`

Schema definition for model fields and types

### Optional Data Tables

#### `events`

Raw blockchain events from world contract

:::info
Requires `--events.raw`
:::

#### `transactions`

World-related transactions with calldata

:::info
Requires `--indexing.transactions`
:::

#### `event_messages`

Custom events emitted via `world.emit_event` API

#### `event_messages_historical`

Preserved historical event messages

:::info
Requires `--events.historical`
:::

### ERC Token Tables

#### `balances`

ERC20/ERC721/ERC1155 token balances by account

#### `tokens`

Token metadata (name, symbol, decimals)

#### `erc_transfers`

Token transfer events with amounts and parties

:::info
These tables require ERC contract configuration
:::

### Additional Tables

#### `controllers`

Cartridge controller integration

:::info
Requires `--indexing.controllers`
:::

#### `transaction_calls`

Detailed transaction call information with entrypoints

#### `entities_historical`

Entity state snapshots over time

:::info
Requires `--historical`
:::


### Dynamic Model Tables

Torii automatically creates tables for each registered model:

**Table Naming Convention**:
- Format: `<NAMESPACE>-<MODEL_NAME>`
- Example: `game-Position`, `combat-Health`

:::info
Model table names contain hyphens and must be escaped with square brackets `[table-name]` or double quotes `"table-name"` in SQL queries
:::

**Field Mapping**:
- Model fields are prefixed with `external_` in the database
- Primitive types (felt252, u32, bool, ByteArray) are stored directly
- Complex types (arrays, enums, structs) create separate tables:
  - Format: `<NAMESPACE>-<MODEL_NAME>$<FIELD_NAME>`
  - Example: `game-Inventory$items`

**Key Fields**:
- Fields marked with `#[key]` in your model are used for entity identification
- Composite keys are supported for multi-key entities
- Key fields are automatically indexed for query performance

## Endpoint queries

To submit a query to the SQL endpoint, append `/sql` to the Torii URL.
You can submit the query using a `GET` or `POST` request.

### Using GET

The query is sent as a URL parameter. Both `q` and `query` parameters are supported:

```bash
query=$(printf '%s' "SELECT * FROM [ns-Position];" | jq -s -R -r @uri)
curl "0.0.0.0:8080/sql?query=${query}" | jq
```

```bash
curl "0.0.0.0:8080/sql?query=SELECT%20*%20FROM%20models;" | jq
```

:::tip
The `jq -s -R -r @uri` command URL-encodes the SQL query to handle special characters like spaces, brackets, and semicolons in HTTP URLs.
:::

### Using POST

The query is sent as the body of the request.

```bash
curl -X POST "0.0.0.0:8080/sql" -d "SELECT * FROM [ns-Position];" | jq
```

## Common Query Examples

### Schema Exploration

List all tables in the database:
```sql
SELECT name FROM sqlite_master
WHERE type='table'
ORDER BY name;
```

Get table schema information:
```sql
SELECT
    m.name as table_name,
    p.name as column_name,
    p.type as data_type,
    p.pk as is_primary_key,
    p."notnull" as not_null
FROM sqlite_master m
JOIN pragma_table_info(m.name) p
WHERE m.type = 'table'
AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name, p.cid;
```

### Entity Queries

Find entities with specific models:
```sql
SELECT e.id, e.keys, e.updated_at
FROM entities e
JOIN entity_model em ON e.id = em.entity_id
JOIN models m ON em.model_id = m.id
WHERE m.name = 'Position'
LIMIT 100;
```

Query model-specific data (remember to quote table names):
```sql
SELECT external_player, external_x, external_y
FROM "dojo_starter-Position"
WHERE external_x > 0 AND external_y > 0;
```

### Performance Analytics

Entity count by model:
```sql
SELECT m.name, COUNT(*) as entity_count
FROM models m
JOIN entity_model em ON m.id = em.model_id
GROUP BY m.id, m.name
ORDER BY entity_count DESC;
```

Recent activity:
```sql
SELECT COUNT(*) as recent_entities
FROM entities
WHERE updated_at > datetime('now', '-1 hour');
```
