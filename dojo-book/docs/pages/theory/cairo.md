# Provable games

Provable games demand [zero-knowledge](https://ethereum.org/en/zero-knowledge-proofs/) properties for efficient scaling and verification of computations. [Cairo](https://book.starknet.io/ch01-00-getting-started.html) addresses this need by providing a generalized language, eliminating the complexity of creating circuits to incorporate [SNARKs](https://consensys.net/blog/developers/introduction-to-zk-snarks/).

**You can simply program in Cairo and your applications become automatically provable**.

Moreover, you can deploy your programs on the [Cairo Virtual Machine](https://medium.com/starkware/cairo-welcome-on-board-1cf3487554f) (CVM), which is compatible with Starknet's Layer 2, Starknet appchains, and even in-browser through WebAssembly (WASM)! Dojo aims to supply straightforward ZK primitives to fuel your game development.

For more information about Starknet, Cairo and its tech stack, check out the [Starknet & Cairo book](https://book.starknet.io/).

## Cairo

Cairo is an open-source, Turing-complete smart contract language developed by Starkware, designed to power the Validity Rollup Starknet. The language enables highly expressive and verifiable computation, making it well-suited for building scalable and secure applications, including decentralized finance (DeFi) projects.

Dojo builds on Cairo to create a robust framework for developing Autonomous Worlds (AWs). By leveraging the capabilities of Cairo, Dojo aims to streamline the development process, improve maintainability, and enhance the performance of AWs.

A key feature of the Dojo framework is its use of [commands](/cairo/commands.md). Commands are a design pattern that helps to reduce boilerplate code, resulting in cleaner and more maintainable applications. They achieve this by encapsulating specific actions or operations within self-contained, reusable units.

Developers can write commands freely within Systems, and the Cairo compiler takes care of inlining the appropriate functions.

#### Essential Reading

- [Cairo book](https://github.com/cairo-book/cairo-book)
- [Awesome Cairo](https://github.com/auditless/awesome-cairo)
- [Starknet Book](https://book.starknet.io/)

### Starknet as an L2

Starknet is a Validity Rollup Layer 2 (L2) solution designed to scale Ethereum. It operates by offering high transaction throughput and low gas costs while maintaining the same level of security as Ethereum Layer 1 (L1). The strategy it uses is akin to solving a sudoku puzzle: verifying a solution is easier than finding the solution from scratch. Similarly, Starknet replaces heavy and costly L1 computation with cheaper L1 verification through the use of STARK proofs computed off-chain.

In more technical terms, Starknet is a permissionless Validity-Rollup (also known as a "ZK-Rollup") that supports general computation and currently runs as an L2 network over Ethereum. The network's L1 security is guaranteed by its utilization of the STARK cryptographic proof system, which is considered one of the safest and most scalable.

### Starknet as an Appchain

Cairo is an isomorphic, general-purpose language, optimized for Zero-Knowledge (ZK) proofs. It's the driving force behind Starknet, Starkex, and appchains. Remarkably, you can also run it in WebAssembly (WASM) to generate proofs on the client-side! Within the dojo toolchain exists [Katana](/toolchain/katana/overview.md) which is a gaming specific sequencer, which is perfectly suited to run a Dojo appchain.

The Dojo team is also working closely with the [Madara](https://github.com/keep-starknet-strange/madara) team to enable Starknet appchains to seamlessly run Dojo worlds.
