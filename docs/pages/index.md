# Welcome to the Dojo

Dojo is an [open source](https://github.com/dojoengine/dojo) framework for building **provable** Games, Autonomous Worlds and other Applications that are composable, extensible, permissionless and persistent. It is an extension of [Cairo](https://www.cairo-lang.org/), an efficiently provable language, that supports generation of zero-knowledge proofs attesting to a computations validity and enables exponential scaling of onchain computation while maintaining the security properties of Ethereum.

![Feature Matrix](/feature-matrix.png)

## Whats in the box?

**Dojo** is designed to significantly reduce the complexity of developing provable applications that can be deployed to and verified by blockchains. It do so by providing a ~zero-cost abstraction for developers to succinctly define provable applications using [Cairo](https://www.cairo-lang.org/) and a robust toolchain for building, migrating, deploying, proving and settling these worlds in production.

Dojo includes:

- [Framework](framework): a set of contracts and a protocol for building applications that are natively provable, extensible and composable.
- [Katana](toolchain/katana): a modular and extensible sequencer designed for high performance applications.
- [Torii](toolchain/torii): an indexer exposing an automatically generated GraphQL and gRPC api for real-time state synchronization.
- [Sozo](toolchain/sozo): a declarative migration planning tool for deploying, upgrading, and maintaining smart contracts.

In addition, [Cartridge](https://cartridge.gg) provides tools and services for productionalizing provable applications:

- [Slot](toolchain/slot): a managed infrastructure service for deploying and scaling provable applications in seconds.
<!-- - [World Explorer](toolchain/world-explorer): a Dojo-native blockchain explorer for understanding and interacting with your application. -->

:::note
Before diving into the Dojo book, if you are new to cairo we highly recommend you to [learn Cairo](https://book.cairo-lang.org) first.
:::

[Get started](/getting-started.md) by installing Dojo in only a few minutes!
