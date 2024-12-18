---
title: Torii Reference Guide
description: Complete reference documentation for Torii, including usage, configuration options, database setup, and command-line parameters.
---

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

-   The in-memory database is ephemeral and only lasts as long as the indexer is running. This is a fast and simple option to start the indexer for development/testing.
-   Persistent storage should be used in production. It relies on the local filesystem for storage.

Note: If using in-memory db, the memory will be garbage collected after a period of inactivity, causing queries to result in errors. Workaround is to use a persistent database.

```sh
# Persistent database storage using file indexer.db
torii --db-dir indexer.db
```

### Quick help reference:

```
Usage: torii [OPTIONS]

Options:
  -w, --world <WORLD_ADDRESS>
          The world to index
          
          [env: DOJO_WORLD_ADDRESS=]

      --rpc <URL>
          The sequencer rpc endpoint to index
          
          [default: http://0.0.0.0:5050]

      --db-dir <PATH>
          Database filepath. If specified directory doesn't exist, it will be created. Defaults to in-memory database.

      --external-url <EXTERNAL_URL>
          The external url of the server, used for configuring the GraphQL Playground in a hosted environment.

      --explorer
          Open World Explorer on the browser.

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version

Metrics options:
      --metrics
          Enable metrics.
          
          For now, metrics will still be collected even if this flag is not set. This only controls whether the metrics server is started or not.

      --metrics.addr <ADDRESS>
          The metrics will be served at the given address
          
          [default: 127.0.0.1]

      --metrics.port <PORT>
          The metrics will be served at the given port
          
          [default: 9200]

Indexing options:
      --indexing.events_chunk_size <EVENTS_CHUNK_SIZE>
          Chunk size of the events page to fetch from the sequencer.
          
          [default: 1024]

      --indexing.blocks_chunk_size <BLOCKS_CHUNK_SIZE>
          Number of blocks to process before commiting to DB.
          
          [default: 10240]

      --indexing.pending <INDEX_PENDING>
          Whether or not to index pending blocks.
          
          [default: true]
          [possible values: true, false]

      --indexing.polling_interval <POLLING_INTERVAL>
          Polling interval in ms for Torii to check for new events.
          
          [default: 500]

      --indexing.max_concurrent_tasks <MAX_CONCURRENT_TASKS>
          Max concurrent tasks used to parallelize indexing.
          
          [default: 100]

      --indexing.transactions <INDEX_TRANSACTIONS>
          Whether or not to index world transactions and keep them in the database.
          
          [default: false]
          [possible values: true, false]

      --indexing.contracts <CONTRACTS>
          ERC contract addresses to index. You may only specify ERC20 or ERC721 contracts.

Events indexing options:
      --events.raw <RAW>
          Whether or not to index raw events.
          
          [default: true]
          [possible values: true, false]

      --events.historical <HISTORICAL>
          Event messages that are going to be treated as historical during indexing.

HTTP server options:
      --http.addr <ADDRESS>
          HTTP server listening interface
          
          [default: 127.0.0.1]

      --http.port <PORT>
          HTTP server listening port
          
          [default: 8080]

      --http.cors_origins <HTTP_CORS_ORIGINS>
          Comma separated list of domains from which to accept cross origin requests

Relay options:
      --relay.port <PORT>
          Port to serve Libp2p TCP & UDP Quic transports.
          
          [default: 9090]

      --relay.webrtc_port <PORT>
          Port to serve Libp2p WebRTC transport.
          
          [default: 9091]

      --relay.websocket_port <PORT>
          Port to serve Libp2p WebRTC transport.
          
          [default: 9092]

      --relay.local_key_path <PATH>
          Path to a local identity key file. If not specified, a new identity will be generated.

      --relay.cert_path <PATH>
          Path to a local certificate file. If not specified, a new certificate will be generated for WebRTC connections.

      --config <CONFIG>
          Configuration file to setup Torii.
```