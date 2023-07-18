## Katana

`katana` is a _blazingly fast_ local Starknet node, designed to support local development with Dojo.

### Features

-   [Starknet JSON-RPC v0.3.0](https://github.com/starkware-libs/starknet-specs/tree/v0.3.0) support

## Installation

`katana` binary is available via [`dojoup`](../../getting-started/installation.md#using-dojoup).

### Installing from source

```bash
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./crates/katana --locked --force
```

### Usage

```console
$ katana



██╗  ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗ █████╗
██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗
█████╔╝ ███████║   ██║   ███████║██╔██╗ ██║███████║
██╔═██╗ ██╔══██║   ██║   ██╔══██║██║╚██╗██║██╔══██║
██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝



PREFUNDED ACCOUNTS
==================

| Account address |  0x06f62894bfd81d2e396ce266b2ad0f21e0668d604e5bb1077337b6d570a54aea
| Private key     |  0x07230b49615d175307d580c33d6fda61fc7b9aec91df0f5c1a5ebe3b8cbfee02
| Public key      |  0x078e6e3e4a50285be0f6e8d0b8a61044033e24023df6eb95979ae4073f159ae6

| Account address |  0x04b352538f61697825af242c9c451df02a40cca99391a47054489dee82138008
| Private key     |  0x0326b6d921c2d9c9b76bb641c433c94b030cf57d48803dc742729704ffdd0fc6
| Public key      |  0x0564a13ba4d4cf95a60f78ca05fc04ff6845736e2f04b3c6703283cdf65e2615


🚀 JSON-RPC server started: http://127.0.0.1:5050


```

> 📚 **Reference**
>
> See the [`katana` Reference](../../reference/katana/) for in depth information on Anvil and its capabilities.
