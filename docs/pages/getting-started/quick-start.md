## Quick Start

> It is worth reading [theory](/theory/autonomous-worlds.md) to familiarize yourself with the concept of Autonomous Worlds (AWs) and the [Cairo ecosystem](/theory/cairo.md) before diving into the code.

::::steps

### Install Dojoup

Dojo is built around a set of development tools - Katana, Torii and Sozo. Install them all easily with Dojoup.

```sh
curl -L https://install.dojoengine.org | bash
```

### Run dojoup

This will install Dojoup, then simply follow the instructions on-screen,
which will make the `dojoup` command available in your CLI.

```sh
dojoup
```

For full `dojoup` reference and debugging see [Dojoup](/toolchain/dojoup.md).

### Install scarb (optional)

To ensure the proper functioning of the language server, your local Scarb version must be equal to or higher than the Dojo's Cairo version. To accomplish this, first check your local Scarb version:

```sh
scarb --version
```

If your local Scarb version is lower than the Dojo's Cairo version, you can install the latest Scarb version by running:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

## Next steps

> Head to [Hello Dojo](/cairo/hello-dojo.md) to get create your first Dojo world.
