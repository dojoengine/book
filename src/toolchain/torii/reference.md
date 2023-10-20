## torii reference

### Name

torii - An automatic indexer and networking layer for a world contract.

### USAGE

```sh
torii [OPTIONS]
```

### DESCRIPTION

`torii` starts the indexer and exposes GraphQL/gRPC API endpoints. The indexer queries the specified Starknet RPC endpoint for transaction blocks and listens for transactions related to the world contract. These transactions can include component/system registrations, entity state updates, system calls, and events. The parsed data is then stored in a local SQLite database.

The GraphQL and gRPC API endpoints run in tandem with the indexer, providing custom queries specific to the world contract for client applications.

#### Database URL

`torii` uses a sqlite database to store indexed data. The database can be stored either in-memory or persistently on the filesystem.

- The in-memory database is ephemeral and only lasts as long as the indexer is running. This is a fast and simple option to start the indexer for development/testing.
- Persistent storage should be used in production. It relies on the local filesystem for storage.

Note: If using in-memory db, the memory will be garbage collected after a period of inactivity, causing queries to result in errors. Workaround is to use a persistent database.

```sh
# Persistent database storage using file indexer.db
torii --database indexer.db
```

### OPTIONS

#### General Options

`-w, --world`  
&nbsp;&nbsp;&nbsp;&nbsp; Address of the world contract to index

`--rpc`  
&nbsp;&nbsp;&nbsp;&nbsp; Starknet RPC endpoint to use [default: http//localhost:5050]

`-d, --database <DATABASE>`  
&nbsp;&nbsp;&nbsp;&nbsp; Database filepath (ex: indexer.db) [default: :memory:]

`-s, --start-block <START_BLOCK>`  
&nbsp;&nbsp;&nbsp;&nbsp; Specify a block to start indexing from, ignored if stored head exists [default: 0]

`--allowed-origins <ALLOWED_ORIGINS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Specify allowed origins for api endpoints (comma-separated list of allowed origins, or "\*" for all) [default: *]

`--external-url <EXTERNAL_URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; The external url of the server, used for configuring the GraphQL Playground in a hosted environment

`-h, --help`
&nbsp;&nbsp;&nbsp;&nbsp; Print help

`-V, --version`
&nbsp;&nbsp;&nbsp;&nbsp; Print version
