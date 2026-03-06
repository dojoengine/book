---
title: Introduction to Saya
description: Overview of Saya, the settlement orchestrator for Katana.
---

![saya](/toolchain/saya-icon-word.png)

Saya is the settlement orchestrator for Katana, responsible for fetching blocks from Katana and proving them.
Once block execution is proven, Saya can settle the block either by verifying it on a settlement layer and updating the state of the core contract, or by posting the data to a data availability layer.

## Architecture

![saya](/toolchain/saya-overview.png)

The core steps of Saya are:

1. Fetch the blocks from Katana
2. For each block, `StarknetOS` trace is generated.
3. `StarknetOS` trace is sent to [Herodotus proving service](https://herodotus.cloud) to get the proof.
4. The proof is then sent to the settlement layer for verification and the state of the core contract is updated and/or the compressed state diff is sent to the data availability layer.

:::note
Currently, Saya is not generalized, which means that each running Katana node needs to have its own Saya instance.
This will change in the future, and Saya will be able to aggregate multiple Katana nodes blocks into a single instance.
:::

## Operating Modes

Currently, Saya can operate in two modes:

1. [**Persistent mode**](/toolchain/saya/persistent): Saya will fetch the blocks from Katana and will verify the proof and update the state of the core contract on the settlement layer.

    :::info
    At the moment only [Starknet](https://starknet.io/) is supported as a settlement layer.
    :::

2. [**Sovereign mode**](/toolchain/saya/sovereign): Saya will fetch the blocks from Katana and will post the proof and associated compressed state diff to a data availability layer.

    :::info
    At the moment only [Celestia](https://celestia.org/) is supported as a data availability layer.
    :::

## Herodotus

Saya relies on Herodotus to prove blocks.
This service can handle trace generation and proof generation, by proxying the proof generations to [SHARP](https://docs.starknet.io/architecture-and-concepts/provers-overview/).

You will need to create an account on the [Herodotus portal](https://herodotus.cloud) and provide the account API key in the `ATLANTIC_KEY` environment variable.

:::tip
If you are testing Saya for a Dojo project, contact us in the [Dojo Discord](https://discord.gg/dojoengine) for some credits.
:::

## Installation

Install Saya using the Dojo toolchain manager:

```bash
dojoup
```

This command installs the latest stable version of all Dojo tools, including Saya.

### Alternative Installation Methods

#### Building from Source

1. Clone the repository:

```bash
git clone https://github.com/dojoengine/saya.git
```

2. Navigate to the directory and build:

```bash
cd saya
cargo build --release
```

3. The binary will be available at `target/release/saya`.

#### Using Docker

You can also run Saya from the [docker image](https://github.com/dojoengine/saya/pkgs/container/saya):

```bash
docker run -it ghcr.io/dojoengine/saya:latest
```
