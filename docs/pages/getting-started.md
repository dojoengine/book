# Getting Started

:::note
Windows it not natively supported, we suggest using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to develop with Dojo on Windows.
:::

Let's get started building on **Dojo**! This guide will walk you through installing the Dojo toolchain and preparing your environment for development. Dojo is built around a set of development tools - [Katana](/toolchain/katana), [Torii](/toolchain/torii), [Sozo](/toolchain/sozo) and Saya.

## Install using the `dojoup` Package Manager

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

## Install using `asdf` Package Manager

You can alternatively use the `asdf` package manager to install and manage your Dojo installation.

::::steps

### Install the asdf

Follow the [asdf installation instructions](https://asdf-vm.com/guide/getting-started.html).

### Add the asdf-dojo plugin:

```sh
asdf plugin add dojo https://github.com/dojoengine/asdf-dojo
```

### Install the latest version of Dojo or a specific version you need:

```sh
asdf install dojo latest      # For the latest version
asdf install dojo 1.2.3       # For a specific version
```
### Set the global or local version:

```sh
asdf global dojo latest       # Set globally
asdf local dojo 1.2.3         # Set locally in your project directory
```

::::

Once you're up and running, check out the [Dojo Starter guide](/tutorial/dojo-starter)!
