# Getting Started

:::note
Windows it not natively supported, we suggest using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to develop with Dojo on Windows.
:::

:::Alternitively you can use our [WSL install](/getting-started/wsl) instructions

Let's get started building on **Dojo**! This guide will walk you through installing the Dojo toolchain and preparing your environment for development. Dojo is built around a set of development tools - [Katana](/toolchain/katana), [Torii](/toolchain/torii) and [Sozo](/toolchain/sozo).

<!-- TODO: Add link to the Saya page when available. -->

## Prerequisites

To work with Dojo, you need to have Git, Rust and Scarb installed on your PC to satisfy Dojo dependencies. You can install them with the following steps:

### Install Rust

Go to the [Rust installation page](https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-linux-or-macos).

After installing Rust, ensure your `PATH` environment variable includes the Cargo bin directory (usually `$HOME/.cargo/bin`).

### Install Git

Go to the [Git installation page](https://git-scm.com/downloads) and follow the instructions for your operating system to install Git.

### Install Scarb

The Dojo toolchain integrates [Scarb](https://docs.swmansion.com/scarb/) to build and run Dojo projects, installation instructions are [here](https://docs.swmansion.com/scarb/download.html).

## Install Dojo using `dojoup`

You can install with the `dojoup` version manager which enables you to easily install, update and manage your Dojo installation.

::::steps

### Install dojoup

```sh
curl -L https://install.dojoengine.org | bash
```

### Install the latest Dojo release

```sh
dojoup
```

For more information on advanced usage, such as installing a particular version or building from source, run `dojoup --help`.

::::

## Install Dojo using `asdf`

You can alternatively use the `asdf` package manager to install and manage your Dojo installation.

::::steps

### Install asdf

Follow the [asdf installation instructions](https://asdf-vm.com/guide/getting-started.html).

### Add the asdf-dojo plugin

```sh
asdf plugin add dojo https://github.com/dojoengine/asdf-dojo
```

### Install the latest or a specific version

```sh
asdf install dojo latest      # For the latest version
asdf install dojo 0.7.0       # For a specific version
```

### Set the global or local version

```sh
asdf global dojo latest       # Set globally
asdf local dojo 0.7.0         # Set locally in your project directory
```

::::

Once you're up and running, check out the [Dojo Starter guide](/tutorial/dojo-starter)!
