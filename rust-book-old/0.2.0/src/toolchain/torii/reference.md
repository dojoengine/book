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

- The in-memory database is ephermal and only lasts as long as the indexer is running. This is a fast and simple option to start the indexer for development/testing.
- Presistent storage should be used in production. It relies on the local filesystem for storage.

Note: If using in-memory db, the memory will be garbage collected after a period of inactivity, causing queries to result in errors. A workaround is to start `katana` with the `--block-time` option or use a persistent database.

```sh
# Persistent database storage using file indexer.db
torii --database-url sqlite:indexer.db
```

### OPTIONS

#### General Options

`-w, --world`
&nbsp;&nbsp;&nbsp;&nbsp; Address of the world contract to index

`--rpc`
&nbsp;&nbsp;&nbsp;&nbsp; Starknet RPC endpoing to use [default: http//localhost:5050]

`-m, --manifest <MANIFEST>`
&nbsp;&nbsp;&nbsp;&nbsp; Specify a local manifest to initialize from

`-d, --database-url <DATABASE_URL>`
&nbsp;&nbsp;&nbsp;&nbsp; Database URL (read more above) [default: sqlite::memory:]

`-s, --start-block <START_BLOCK>`
&nbsp;&nbsp;&nbsp;&nbsp; Specify a block to start indexing from, ignored if stored head exists [default: 0]

`-h, --help`
&nbsp;&nbsp;&nbsp;&nbsp; Print help

`-V, --version`
&nbsp;&nbsp;&nbsp;&nbsp; Print version
