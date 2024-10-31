# Config

The first thing to know about Dojo configuration is that, it's a **profile** based system.
Any command you may use to build, migrate or inspect your project, you need to specify the profile you want to use.

By default, the profile is always `dev` if not specified.

When you work with Dojo, you have two main configuration files:

1. First, the `Scarb.toml` manifest. This file is used to reference all Cairo dependencies.
2. Second, the `dojo_<PROFILE>.toml`, where `<PROFILE>` can be `dev` or any other string (no spaces or special characters).

## Adding a custom profile

To add a new profile, you must:

1. Add a `[profile.<PROFILE>]` section in your `Scarb.toml` file.
    ```toml
    # Scarb.toml

    # ... other configs ...

    [profile.my_profile]
    ```

2. Add the `dojo_<PROFILE>.toml` file in the root of your project (alonside the `Scarb.toml` file).

## `Scarb.toml`

To work with Dojo, the minimum you need to add to your `Scarb.toml` is:

```toml
[package]
cairo-version = "=2.8.4"
name = "<PROJECT_NAME>"
version = "0.1.0"
edition = "2024_07"

[[target.starknet-contract]]
sierra = true
# It's important to keep this, since it's used by Sozo to check the world version.
build-external-contracts = ["dojo::world::world_contract::world"]

[dependencies]
# Adding the dojo core crate with the world and dojo traits.
dojo = { git = "https://github.com/dojoengine/dojo.git", tag = "v1.0.0-rc.0" }
starknet = "2.8.4"

[dev-dependencies]
# This package is required to run tests and add dojo utilities to your project in test only.
dojo_cairo_test = { git = "https://github.com/dojoengine/dojo.git", tag = "v1.0.0-rc.0" }

[features]
default = []
```

You can refer to the profile in [Scarb documentation](https://docs.swmansion.com/scarb/docs/guides/defining-custom-profiles.html) for more information.


## `dojo_<PROFILE>.toml`

The dojo profile configuration file is where you can add your development parameters and world's metadata.

```toml
[world]
name = "Dojo starter"
description = "The official Dojo Starter guide, the quickest and most streamlined way to get your Dojo Autonomous World up and running. This guide will assist you with the initial setup, from cloning the repository to deploying your world."
cover_uri = "file://assets/cover.png"
icon_uri = "file://assets/icon.png"
website = "https://github.com/dojoengine/dojo-starter"
seed = "dojo_starter"

[world.socials]
x = "https://x.com/ohayo_dojo"
discord = "https://discord.gg/FB2wR6uF"
github = "https://github.com/dojoengine/dojo-starter"
telegram = "https://t.me/dojoengine"

[world]
description = "Simple world."
name = "simple"
seed = "simple"

[env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec"
private_key = "0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912"
#world_address = "0x077c0dc7c1aba7f8842aff393ce6aa71fa675b4ced1bc927f7fc971b6acd92fc"

[namespace]
default = "ns"
mappings = { "ns" = ["c1", "M"], "ns2" = ["c1", "M"] }

[init_call_args]
"ns-c1" = ["0xfffe"]
"ns2-c1" = ["0xfffe"]

[writers]
"ns" = ["ns-c1", "ns-c2"]
"ns-M" = ["ns-c2",  "ns-c1", "ns2-c1"]

[owners]
"ns" = ["ns-c1"]

[migration]
order_inits = ["ns-c2", "ns-c1"]
skip_contracts = ["ns-c3"]
```
