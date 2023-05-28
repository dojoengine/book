# Cairo

Cairo is an open-source, Turing-complete smart contract language developed by Starkware, designed to power the Validity Rollup Starknet. The language enables highly expressive and verifiable computation, making it well-suited for building scalable and secure applications, including decentralized finance (DeFi) projects.

Dojo builds on Cairo to create a robust framework for developing Autonomous Worlds (AWs). By leveraging the capabilities of Cairo, Dojo aims to streamline the development process, improve maintainability, and enhance the performance of AWs.

A key feature of the Dojo framework is its use of [commands](./framework/commands.md). Commands are a design pattern that helps to reduce boilerplate code, resulting in cleaner and more maintainable applications. They achieve this by encapsulating specific actions or operations within self-contained, reusable units.

Developers can write commands freely within Systems, and the Cairo compiler takes care of inlining the appropriate functions. 

## Starknet

Starknet is a Validity Rollup Layer 2 (L2) solution designed to scale Ethereum. It operates by offering high transaction throughput and low gas costs while maintaining the same level of security as Ethereum Layer 1 (L1). The strategy it uses is akin to solving a sudoku puzzle: verifying a solution is easier than finding the solution from scratch. Similarly, Starknet replaces heavy and costly L1 computation with cheaper L1 verification through the use of STARK proofs computed off-chain.

In more technical terms, Starknet is a permissionless Validity-Rollup (also known as a "ZK-Rollup") that supports general computation and currently runs as an L2 network over Ethereum. The network's L1 security is guaranteed by its utilization of the STARK cryptographic proof system, which is considered one of the safest and most scalable.

Starknet contracts are primarily written in the Cairo language, a Turing-complete programming language specifically designed for STARK proofs.

### Resources

- [Starknet Book](https://book.starknet.io/)
- [Awesome Cairo](https://github.com/auditless/awesome-cairo)
