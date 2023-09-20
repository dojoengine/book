# Development Setup

> This article is a guide to setting up a development environment for Dojo. It is not suggested to follow this guide if you are just wanting to play with the toolchain. We strongly suggest following the [Quick Start](../getting-started/quick-start.md) guide.

### Prerequisites

- Rust
- Cairo



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

#### 4. Setup csharp bindings

CSharp binding could be done in order to compile with c# game engines such as Unity or Godot.
See [Godot Documentation](https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/c_sharp_basics.html#using-nuget-packages-in-godot).
See also [Unity Documentation](https://docs.unity3d.com/Manual/CustomPackages.html).

Dojo uses uniffy-rs bindings generator.

That is why each time you create a new object on dojo that should be avaible on external game engines, you shall [fill uniffy-rs bindings udl file](https://mozilla.github.io/uniffi-rs/udl_file_spec.html)

If you want to compile CSharp bindings from dojo, you should use these commands:
```powershell
cargo install uniffi-bindgen-cs --git https://github.com/NordSecurity/uniffi-bindgen-cs
mkdir .\bindings
uniffi-bindgen-cs .\crates\dojo-lang\src\dojo.udl --out-dir .\bindings
```

### Windows

_Coming soon_

### Container

_Coming soon_
