## Installation

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/dojoengine/dojo/releases).
These are better managed by using [Dojoup](#using-dojoup).

### Using Dojoup

Dojoup is the Dojo toolchain installer. You can find more about it [here](https://github.com/dojoengine/dojo/blob/master/dojoup/README.md).

Open your terminal and run the following command:

```sh
curl -L https://install.dojoengine.org | bash
```

This will install Dojoup, then simply follow the instructions on-screen,
which will make the `dojoup` command available in your CLI.

Running `dojoup` by itself will install the latest (nightly) [precompiled binaries](#precompiled-binaries): `sozo`, `katana`, and `torii`.
See `dojoup --help` for more options, like installing from a specific version or commit.

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Dojoup currently does not support Powershell or Cmd.

### Building from source

#### Prerequisites

You will need the [Rust](https://rust-lang.org) compiler and Cargo, the Rust package manager.
The easiest way to install both is with [`rustup.rs`](https://rustup.rs/).

On Windows, you will also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/),
installed with the "Desktop Development With C++" Workloads option.

#### Building

You can either use the different [Dojoup](#using-dojoup) flags:

```sh
dojoup --branch master
dojoup --path path/to/dojo
```

Or, by using a single Cargo command:

```sh
cargo install --git https://github.com/dojoengine/dojo --profile local --force sozo katana torii
```

Or, by manually building from a local copy of the [Dojo repository](https://github.com/dojoengine/dojo):

```sh
# clone the repository
git clone https://github.com/dojoengine/dojo.git
cd dojo
# install Sozo
cargo install --path ./crates/sozo --profile local --force
# install Katana
cargo install --path ./crates/katana --profile local --force
# install Torii
cargo install --path ./crates/torii --profile local --force
```
