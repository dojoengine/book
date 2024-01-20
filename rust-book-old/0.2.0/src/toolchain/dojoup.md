# `dojoup`

Update or revert to a specific Dojo branch with ease.

## Installing

```sh
curl -L https://install.dojoengine.org | bash
```

## Usage

To install latest **stable** version:

```sh
dojoup
```

> Note: You may have to install `jq` to use `dojoup`. You can do so with the following commands:

```sh
# Debian
sudo apt-get install jq

# Mac
brew install jq
```

To install a specific **version** (in this case the `nightly` version):

```sh
dojoup --version nightly
```

To install a specific **branch** (in this case the `release/0.1.0` branch's latest commit):

```sh
dojoup --branch release/0.1.0
```

To install a **fork's main branch** (in this case `tarrencev/dojo`'s main branch):

```sh
dojoup --repo tarrencev/dojo
```

To install a **specific branch in a fork** (in this case the `patch-10` branch's latest commit in `tarrencev/dojo`):

```sh
dojoup --repo tarrencev/dojo --branch patch-10
```

To install from a **specific Pull Request**:

```sh
dojoup --pr 1071
```

To install from a **specific commit**:

```sh
dojoup -C 94bfdb2
```

To install a local directory or repository (e.g. one located at `~/git/dojo`, assuming you're in the home directory)

##### Note: --branch, --repo, and --version flags are ignored during local installations.

```sh
dojoup --path ./git/dojo
```

---

**Tip**: All flags have a single character shorthand equivalent! You can use `-v` instead of `--version`, etc.

---

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/dojoengine/dojo/releases).
These are better managed by using [Dojoup](#using-dojoup).

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Dojoup currently does not support Powershell or Cmd.
