---
title: SQL Queries in Torii
description: Learn how to use SQL queries with Torii's database, including table structure, model tables, and endpoint query examples.
---

# SQL

:::warning
Torii SQL endpoint is still under development and the behavior might change.
The underlying database structure is also subject to change.
:::

_TL;DR_

-   SQL is a simple query language to fetch your data
-   Access the raw data from the database
-   The database is readonly, it cannot be modified

Torii SQL endpoint is available at the `/sql` endpoint. The queries are directly executed against the database.
To use this endpoint, a basic understanding of the Torii tables is required.

## Default Tables

By default, Torii creates the following tables:

- `entities` - Contains all entities and their keys that has been set at least once. The `id` column is the entity id, being the poseidon hash of the key(s).
- `models` - Contains all registered models and events defined with `#[dojo::model]` or `#[dojo::event]`. The `id` column is the dojo selector of the resource.
- `entity_model` - Contains the mapping between an entity and the models it has. The `entity_id` column is the id of the entity, and the `model_id` is the dojo selector of the model.
- `model_members` - Contains the members definition for each model/event, such as the field name, if it's a key or not, etc.
- `events` - Contains the raw events emitted by the world. It's not stored by default, use the `--events.raw` flag to enable it.
- `transactions` - Contains the transactions that have been indexed by Torii. It's not stored by default, use the `--indexing.transactions` flag to enable it.
- `event_messages` - Contains the event messages that have been emitted in a contract using `world.emit_event` API.
- `event_messages_historical` - Contains the event messages that have been emitted in a contract using `world.emit_event` API, but have been flagged as historical when Torii was started with the `--events.historical` flag.

## Model and Event Tables

When a model is registered, Torii creates a table with the model tag `<NAMESPACE>-<MODEL_NAME>`. The fields of the model are prefixed with `external_` in the table.
Since currently `Sqlite` is used, the model tag as a table name must be escaped using double quotes when sending a query.

In the current implementation, Torii will store all the fields that are a primitive type (that can be stored in a felt or converted to string like `ByteArray`). For the other types (including arrays or enums), a new table is created with the name `<NAMESPACE>-<MODEL_NAME>$<FIELD_NAME>`. This is about to change for an easier querying.

## Endpoint queries

To submit a query to the SQL endpoint, append `/sql` to the Torii URL. You can submit the query using a `GET` or `POST` request.

### Using GET

The query is sent as a query parameter `q`.

```bash
query=$(printf '%s' "SELECT * FROM [ns-Position];" | jq -s -R -r @uri)
curl "0.0.0.0:8080/sql?q=${query}" | jq
```

```bash
curl "0.0.0.0:8080/sql?q=SELECT%20*%20FROM%20models;" | jq
```

### Using POST

The query is sent as the body of the request.

```bash
curl -X POST "0.0.0.0:8080/sql" -d "SELECT * FROM [ns-Position];" | jq
```
