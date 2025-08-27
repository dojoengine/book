---
title: Introduction to Saya
description: Overview of Saya, the settlement orchestrator for Katana.
---

![saya](/toolchain/saya/saya-icon-word.png)

Saya is the settlement orchestrator for Katana, it is responsible for fetching the blocks from Katana and prove them.
Once the block execution is proven, Saya can settle the block either by verifying it on a settlement layer and update the state of the core contract, or by posting the data to a data availability layer.

## Architecture

![saya](/toolchain/saya/saya-overview.png)

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

    ::::info
    At the moment only [Starknet](https://starknet.io/) is supported as a settlement layer.
    ::::

2. [**Sovereign mode**](/toolchain/saya/sovereign): Saya will fetch the blocks from Katana and will post the proof and associated compressed state diff to a data availability layer.

    ::::info
    At the moment only [Celestia](https://celestia.org/) is supported as a data availability layer.
    ::::

## Herodotus

Saya relies on Herodotus to prove blocks.
This service can handle trace generation and proof generation, by proxying the proof generations to [SHARP](https://docs.starknet.io/architecture-and-concepts/provers-overview/).

You will need to create an account on the [Herodotus portal](https://herodotus.cloud) and provide the account API key in the `ATLANTIC_KEY` environment variable.

::::tip
If you are testing Saya for a Dojo project, contact us in the [Dojo Discord](https://discord.gg/dojoengine) for some credits.
::::

## Installation

The source code of Saya is available on GitHub at [dojoengine/saya](https://github.com/dojoengine/saya).
Saya is available as a binary for `linux` and `macOS` (both `amd64` and `arm64`).

You can also run Saya from the [docker image](https://github.com/dojoengine/saya/pkgs/container/saya).
