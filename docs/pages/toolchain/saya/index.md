---
title: Introduction to Saya
description: Overview of Saya, the settlement orchestrator for Katana.
---

![saya](/saya-icon-word.png)

Saya is the settlement orchestrator for Katana, it is responsible for fetching the blocks from Katana and prove them. Once the block execution is proven, Saya can settle the block either by verifying it on a settlement layer and update the state of the core contract, or by posting the data to a data availability layer.

## Global Architecture

Currently, Saya is not generalized, which means that each running Katana node needs to have its own Saya instance. This will change in the future, and Saya will be able to aggregate multiple Katana nodes blocks into a single instance.

The core steps of Saya are:

1. Fetch the blocks from Katana
2. For each block, `StarknetOS` trace is generated.
3. `StarknetOS` trace is sent to [Herodotus proving service](https://herodotus.cloud) to get the proof.
4. The proof is then sent to the settlement layer for verification and the state of the core contract is updated and/or the compressed state diff is sent to the data availability layer.

## Modes of operation

Currently, Saya can operate in two modes:

1. [**Persistent mode**](/toolchain/saya/persistent): Saya will fetch the blocks from Katana and will verify the proof and update the state of the core contract on the settlement layer.

    ::::info
    At the moment only [Starknet](https://starknet.io/) is supported as a settlement layer.
    ::::

2. [**Sovereign mode**](/toolchain/saya/sovereign): Saya will fetch the blocks from Katana and will post the proof and associated compressed state diff to a data availability layer.

    ::::info
    At the moment only [Celestia](https://celestia.org/) is supported as a data availability layer.
    ::::

## Source code

The source code of Saya is available on GitHub at [dojoengine/saya](https://github.com/dojoengine/saya).

Saya is available as a binary for `linux` and `macOS` (both `amd64` and `arm64`).

You can also use the [docker image `ghcr.io/dojoengine/saya`](https://github.com/dojoengine/saya/pkgs/container/saya) to run Saya without prior installation.


## Herodotus

Herodotus is the service that Saya is currently using to generate proofs.

Please refer to the [Herodotus guide in this documentation](/toolchain/saya/herodotus) for more information and setup an account before diving into Saya.
