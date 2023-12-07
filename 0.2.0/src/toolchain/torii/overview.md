## Torii - Networking & Indexing

Torii is an automatic indexer for dojo worlds. Built in rust to be blazingly fast and exceptionally scalable.

### Dojo indexer

Torii indexes your dojo worlds and exposes a GraphQL API to query them. Simply run:

```sh
torii
```

and you'll have a GraphQL API running on `http://localhost:8080`!

## Installation

The `torii` binary can be installed via [`dojoup`](../../getting-started/quick-start.md), our dedicated installation package manager.

### Installing from Source

If you prefer to install from the source code:

```sh
cargo install --path ./crates/torii --profile local --force
```

This will install Torii and the required dependencies on your local system.

> 📚 **Reference**
>
> See the [`torii` Reference](./reference.md) for a complete reference.
