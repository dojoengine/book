## Quick Start

> It is worth reading [theory](/theory/autonomous-worlds.md) to familiarize yourself with the concept of Autonomous Worlds (AWs) and the [Cairo ecosystem](/theory/cairo.md) before diving into the code.

::::steps

### Install Dojo

Dojo is built around a set of development tools - Katana, Torii and Sozo. To install them, you can choose between using
the [Dojoup](/toolchain/dojoup.md) utility or the [asdf-dojo](https://github.com/dojoengine/asdf-dojo) plugin. Both methods are effective but cater to different needs.
Dojoup provides a direct installation method, while asdf-dojo allows version management through the asdf version manager.

#### Option 1: Using Dojoup

```sh
curl -L https://install.dojoengine.org | bash
```

##### Run dojoup

This will install Dojoup, then simply follow the instructions on-screen,
which will make the `dojoup` command available in your CLI.

```sh
dojoup
```

For full `dojoup` reference and debugging see [Dojoup](/toolchain/dojoup.md).

#### Option 2: Using ASDF with asdf-dojo plugin

1. Ensure you have asdf installed. If not, follow the [asdf installation instructions](https://asdf-vm.com/guide/getting-started.html).
2. Add the asdf-dojo plugin:

```sh
asdf plugin add dojo https://github.com/dojoengine/asdf-dojo
```

3. Install the latest version of Dojo or a specific version you need:

```sh
asdf install dojo latest      # For the latest version
asdf install dojo 1.2.3       # For a specific version
```
4. Set the global or local version:

```sh
asdf global dojo latest       # Set globally
asdf local dojo 1.2.3         # Set locally in your project directory
```

### List available Dojo versions

If using asdf, to see all available versions of Dojo that you can install, use:

```sh
asdf list-all dojo
```

### Switching between installed Dojo versions

If using asdf, switch between different installed versions of Dojo using:

```sh
asdf global dojo 1.2.3       # Switch globally
asdf local dojo 2.0.0        # Switch locally in your project directory
```

### Install Scarb (optional)

To ensure the proper functioning of the language server, your local `Scarb` version must be equal to or higher than the Dojo's Cairo version. To accomplish this, first check your Dojo's Cairo version running the following command:

```bash
sozo --version
```

You should have an output similar to this:

```console
sozo 0.6.0
scarb: 2.5.4
cairo: 2.5.4
sierra: 1.4.0
```

After that, check your local `Scarb` version:

```sh
scarb --version
```

You should have an output similar to this:

```console
scarb 2.5.4 (28dee92c8 2024-02-14)
cairo: 2.5.4 (https://crates.io/crates/cairo-lang-compiler/2.5.4)
sierra: 1.4.0
```

If your local `Scarb` version is lower than the Dojo's Cairo version, you have to install a newer version `Scarb`.

To accomplish it, please refer to the [installation instructions](https://docs.swmansion.com/scarb/download).
We strongly recommend that you install
Scarb via [asdf](https://docs.swmansion.com/scarb/download.html#install-via-asdf).
This will ensure that the version of Scarb you use to work on a project always matches the one defined in the
project settings, avoiding problems related to version mismatches.

Please refer to the [asdf documentation](https://asdf-vm.com/guide/getting-started.html) to install all
prerequisites.

Once you have `asdf` installed locally, you can download Scarb plugin with the following command:

```bash
asdf plugin add scarb
```

This will allow you to download specific versions. You can choose the same version as the Dojo's Cairo version, for example, `2.5.4`, with the following command:

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

If you want to install a specific version of Scarb, run the following with the desired version number.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh -s -- -v 2.5.4
```

## Next steps

> Head to [Hello Dojo](/cairo/hello-dojo.md) to get create your first Dojo world.
