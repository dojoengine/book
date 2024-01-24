## Building from source

> If you are just wanting to play with the toolchain, we strongly suggest following the [Quick Start](/getting-started/quick-start.md) guide.

#### Prerequisites

You will need the [Rust](https://rust-lang.org) compiler and Cargo, the Rust package manager.
The easiest way to install both is with [`rustup.rs`](https://rustup.rs/).

On Windows, you will also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/),
installed with the "Desktop Development With C++" Workloads option.

#### Building

You can either use the different [Dojoup](/toolchain/dojoup.md) flags:

```sh
dojoup --branch master
dojoup --path path/to/dojo
```

Or, by using a single Cargo command:

```sh
cargo install --git https://github.com/dojoengine/dojo --force sozo katana torii
```

Or, by manually building from a local copy of the [Dojo repository](https://github.com/dojoengine/dojo):

```sh
# clone the repository
git clone https://github.com/dojoengine/dojo.git
cd dojo
# install Sozo
cargo install --path ./crates/sozo --force
# install Katana
cargo install --path ./crates/katana --force
# install Torii
cargo run -—bin torii
```
