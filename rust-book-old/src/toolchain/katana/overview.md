![katana](../../images/katana-icon-word.png)

Katana is a _blazingly fast_ sequencer, designed to support both local development as well as production deployments.

In development mode, Katana provides the tool necessary for rapid iteration, including custom development RPCs for manipulating the execution context.

In produciton mode, Katana provides a high performance sequencer optimized for gaming workloads, with support for settlment and cross layer communication.

### Features

- [Starknet JSON-RPC v0.3.0](https://github.com/starkware-libs/starknet-specs/tree/v0.3.0) support
- Cross layer communication (L1 <> L2, LN <> LN+1)
- Custom methods for manipulating the blockchain states

## Installation

`katana` binary is available via [`dojoup`](../../getting-started/quick-start.md).

### Installing from source

```sh
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./crates/katana --locked --force
```

### Usage

```console
katana
```

```console


██╗  ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗ █████╗
██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗
█████╔╝ ███████║   ██║   ███████║██╔██╗ ██║███████║
██╔═██╗ ██╔══██║   ██║   ██╔══██║██║╚██╗██║██╔══██║
██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝



PREFUNDED ACCOUNTS
==================

| Account address |  0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
| Private key     |  0x300001800000000300000180000000000030000000000003006001800006600
| Public key      |  0x1b7b37a580d91bc3ad4f9933ed61f3a395e0e51c9dd5553323b8ca3942bb44e

| Account address |  0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c
| Private key     |  0x333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b
| Public key      |  0x4486e2308ef3513531042acb8ead377b887af16bd4cdd8149812dfef1ba924d


ACCOUNTS SEED
=============
0


🚀 JSON-RPC server started: http://0.0.0.0:5050


```

To enable development features, run using the `--dev` flag.

> 📚 **Reference**
>
> See the [`katana` Reference](./reference.md) for an in depth reference and documentation on Katana.
