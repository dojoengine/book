# Development Setup

> This is a guide to setting up a development environment for Dojo. It is not suggested to follow this guide if you are just wanting to play with the toolchain. We strongly suggest following the [Quick Start](/getting-started/quick-start.md) guide.

### Prerequisites

- [Rust](https://github.com/rust-lang/rust)
- [Cairo](https://github.com/starkware-libs/cairo)
- [protoc](https://github.com/protocolbuffers/protobuf)

## Guide

### Clone

```sh
git clone https://github.com/dojoengine/dojo.git
```

### Linux & Mac

#### 1. Install Rust and Dependencies

Start by installing Rust and running the test suite to confirm your setup:

```sh
rustup override set stable && rustup update && cargo test
```

> Note: Depending on your Linux distribution, you may need to install additional dependencies. Make sure to install any suggested or missing dependencies that arise during the setup process.

#### 2. Install Scarb Package Manager

Next, install the [Scarb](https://docs.swmansion.com/scarb) package manager by running:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

#### 3. Add the Cairo 1.0 VSCode Extension

Install the [Cairo 1.0](https://marketplace.visualstudio.com/items?itemName=starkware.cairo1) extension for Visual Studio Code.

### Windows

_Coming soon_

### Container

_Coming soon_
