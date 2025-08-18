---
title: Dojo 1.7 Upgrading Guide
description: An upgrade guide for Dojo 1.7
---

# Dojo 1.7 Overview

Dojo 1.7 is a minor release of the Dojo stack, bringing RPC 0.9 support and a new `DojoStore` trait for enhanced model serialization.

## Starknet 0.14.0

Dojo 1.7 was timed to coincide with [Starknet's 0.14.0 upgrade](https://governance.starknet.io/voting-proposals/9), which brought several major changes to the network:

- The introduction of RPC 0.9 and the introduction of the `PRE_CONFIRMED` transaction status.
- The migration to a multi-sequencer architecture
- The introduction of an EIP-1559-style fee market for transaction prices

**Starknet's 0.14.0 upgrade is scheduled to go live on mainnet September 1, 2025.**

Dojo 1.7 brings support for RPC 0.9 to the entire stack, including Torii, Katana, and the client SDKs.

See [this guide](https://hackmd.io/8ILy9nLgTmaEJ98mrtPP3A) for more context and a migration guide for RPC 0.9.

## The `DojoStore` trait

In response to a vulnerability identified with the existing implementation of Dojo storage, a new `DojoStore` trait was introduced to give developers more fine-grained control of model storage.

This is a **breaking change**; while migration is straightforward, existing projects which do not migrate are at risk of data loss.

See [this guide](https://hackmd.io/@remyb/HyKHqDqull) for more context and a migration guide for `DojoStore`.
