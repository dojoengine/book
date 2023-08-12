## Quick Start

> It is worth reading [theory](../theory/autonomous-worlds.md) to familiarize yourself with the concept of Autonomous Worlds (AWs) and the [Cairo ecosystem](../theory/cairo.md) before diving into the code.


### Get Started

Dojo is built around a set of development tools - Katana, Torii and Sozo. Install them all easily with Dojoup. You can find detailed information about Dojoup [here](https://github.com/dojoengine/dojo/blob/master/dojoup/README.md).

```sh
curl -L https://install.dojoengine.org | bash
```

This will install Dojoup, then simply follow the instructions on-screen,
which will make the `dojoup` command available in your CLI.

```sh
dojoup
```

`dojoup` will install the latest stable release, but you can install nightly dojo build with:

```sh
dojoup -v nightly
```

You can see a full list of commands with

```sh
dojoup -help
```

---

> Note: You may have to install `jq` to use `dojoup`. You can do so with the following commands:

```sh   
# Debian
sudo apt-get install jq

# Mac
brew install jq
```

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/dojoengine/dojo/releases).
These are better managed by using [Dojoup](#using-dojoup).


> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Dojoup currently does not support Powershell or Cmd.