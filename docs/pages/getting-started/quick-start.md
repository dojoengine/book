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

### Install Scarb (optional)

To ensure the proper functioning of the language server, your local `Scarb` version must be equal to or higher than the Dojo's Cairo version. To accomplish this, first check your Dojo's Cairo version running the following command:

```bash
sozo --version
```

You should have an output similar to this:

```console
sozo 0.6.0-alpha.9
scarb: 2.5.4
cairo: 2.5.4
sierra: 1.4.0
```

After that, check your local `Scarb` version:

```sh
scarb --version
```

If your local `Scarb` version is lower than the Dojo's Cairo version, you have to install a newer version `Scarb`.

To accomplish it, please refer to the [installation instructions](https://docs.swmansion.com/scarb/download).
We strongly recommend that you install
Scarb via [asdf](https://docs.swmansion.com/scarb/download.html#install-via-asdf), a CLI tool that can manage
multiple language runtime versions on a per-project basis.
This will ensure that the version of Scarb you use to work on a project always matches the one defined in the
project settings, avoiding problems related to version mismatches.

Please refer to the [asdf documentation](https://asdf-vm.com/guide/getting-started.html) to install all
prerequisites.

Once you have `asdf` installed locally, you can download Scarb plugin with the following command:

```bash
asdf plugin add scarb
```

This will allow you to download specific versions. You can choose the same version as the Dojo's Cairo version, for example, 2.5.4, with the following command:

```bash
asdf install scarb 2.5.4
```

and set a global version:

```bash
asdf global scarb 2.5.4
```

Otherwise, you can simply run the following command in your terminal, and follow the onscreen instructions. This
will install the latest stable release of Scarb.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

## Next steps

> Head to [Hello Dojo](/cairo/hello-dojo.md) to get create your first Dojo world.
