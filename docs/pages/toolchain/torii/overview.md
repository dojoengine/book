![katana](/torii-icon-word.png)

## Torii

Torii is an automatic indexer and client for dojo worlds. Built in rust to be blazingly fast and exceptionally scalable. Torii provides a fully typed, dynamically generated GraphqQL interface and a high performance gRPC api for binding clients to the world state. There are two parts to torii, the client and the server.

### Torii Server

The torii server comprises of the rust backend that exposes the graphql and gRPC endpoints.

<!-- ### Torii Client

Torii client interfaces with the server to provide an easy to use api for your clients:

- [wasm](/client/dojojs.md#dojoenginetorii-wasm)
- [unity](/client/sdk/unity.md)
- [c](/client/sdk/unity.md) -->

### Usage

Torii leverages world introspection to bootstrap directly from an onchain deployment. Simply run:

```sh
torii --world <World Address>
```

You'll have a GraphQL API running at `http://localhost:8080/graphql` and a gRPC api at `http://localhost:8080`

## Installation

The `torii` binary can be installed via [`dojoup`](/getting-started/quick-start.md), our dedicated installation package manager.

### Installing from Source

If you prefer to install from the source code:

```sh
cargo install --path ./bun/torii --profile local --force
```

This will install Torii and the required dependencies on your local system.

> 📚 **Reference**
>
> See the [`torii` Reference](/toolchain/torii/reference.md) for a complete reference.
