---
title: Dojo 1.7 Upgrading Guide
description: An upgrade guide for Dojo 1.7
---

# Dojo 1.7 Overview

Dojo 1.7 is a minor release of the Dojo stack, bringing Sozo updates, RPC 0.9 support, and a new `DojoStore` trait for enhanced model serialization.

## Sozo Updates

Dojo 1.7 brings major changes to Sozo, Dojo's build tool.
Prior to 1.7, Sozo implemented Dojo's specialized functionality (like `#[dojo::model]`) through Cairo compiler plugins.
This was an advanced feature that few other teams used, meaning that Dojo had to essentially maintain a separate fork of Scarb, Cairo's build tool.
This extra complexity made Dojo development slower and more difficult than it otherwise would have been.

With Dojo 1.7, Sozo will instead began relying on "proc macros" (procedural macros) to implement specialized Dojo functionality.
With proc macros, Dojo functionality can be accessed by Scarb at compile-time, rather than requiring separate pre-compilation.
This means that Sozo can leverage the mainstream Scarb directly; going forward, calls to `sozo build` will be thin wrappers around underlying Scarb functionality.

The move to mainstream Scarb has reduced typical compile-times by about 3x, as well as unblocked quality-of-life improvements like in-editor syntax highligting and terminal text coloring.
Most importantly, this change will make it easier to maintain and improve Dojo and Sozo going forward.

## Starknet 0.14.0

:::info
Starknet's 0.14.0 upgrade went live on mainnet September 1, 2025.
:::

Dojo 1.7 was timed to coincide with [Starknet's 0.14.0 upgrade](https://governance.starknet.io/voting-proposals/9), which brought several major changes to the network:

- The introduction of RPC 0.9 and the introduction of the `PRE_CONFIRMED` transaction status.
- The migration to a multi-sequencer architecture
- The introduction of an EIP-1559-style fee market for transaction prices

Dojo 1.7 brings support for RPC 0.9 to the entire stack, including Torii, Katana, and the client SDKs.

See [this guide](https://hackmd.io/8ILy9nLgTmaEJ98mrtPP3A) for more context and a migration guide for RPC 0.9.

## The `DojoStore` trait

:::warning
This is a **breaking change**; while migration is straightforward, existing projects which do not migrate are at risk of data loss.
:::

**TL;DR: all Enums which are stored inside of Dojo models must derive the `Default` trait and set a `#[default]` value.**

In response to a vulnerability identified with the existing implementation of Dojo storage, a new `DojoStore` trait was introduced to give developers more fine-grained control of model storage.
This trait will affect data serialization and requires some code updates to handle correctly.

See [this guide](https://hackmd.io/@remyb/HyKHqDqull) for more context and a migration guide for `DojoStore`.

## Troubleshooting

As with any major upgrade, there are always "gotchas" to be aware of.
This section will help you address some common issues.

### Toolchain compatibility guide

:::warning
This compatibility guide is rapidly changing and may be slightly out of date.
For the most up-to-date information, [visit our Discord](https://discord.gg/dojoengine).
:::

The following is the **latest** compatibility guide for Dojo 1.7.

Add these to your `.tool-versions` for best results:

```txt
scarb 2.12.2
sozo 1.7.0
katana 1.7.0
torii 1.7.0
```

### Sozo build errors

If you're having trouble compiling your contracts with Sozo, try adding `dojo_macros` to your `Scarb.toml`:

```toml
[dependencies]
starknet = ">=2.12.2"
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0" }
dojo_macros = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0" } # Add this
```
