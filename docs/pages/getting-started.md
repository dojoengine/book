# Getting Started

:::note
Windows it not natively supported, we suggest using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to develop with Dojo on Windows.
:::

Let's get started building on **Dojo**! This guide will walk you through installing the Dojo toolchain and preparing your environment for development. Dojo is built around a set of development tools - [Katana](/toolchain/katana), [Torii](/toolchain/torii) and [Sozo](/toolchain/sozo).

<!-- TODO: Add link to the Saya page when available. -->

## Install dependencies

The Dojo toolchain integrates [scarb](https://docs.swmansion.com/scarb/), the cairo package manager, which have the following dependencies:

- [git](https://www.git-scm.com/about)
- [cargo](https://doc.rust-lang.org/stable/cargo/getting-started/installation.html)

## Install using `dojoup`

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

## Install using `asdf`

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
