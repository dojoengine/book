# Config

Dojo worlds are defined in their `Scarb.toml` files. This is just a regular [Scarb](https://docs.swmansion.com/scarb/) file which is an excellent Cairo package manager and project manager.

## Example

Full example of a `Scarb.toml` file:

```toml
[package]
cairo-version = "2.6.3"
name = "dojo_starter"
version = "0.7.0"

[cairo]
sierra-replace-ids = true

[dependencies]
# Ensure you're specifying the Dojo version, as the dojo-core lib can introduce breaking changes.
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v0.7.0" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0xbeef"

[tool.dojo.env]
rpc_url = "http://localhost:5050/"
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
# The world address must be updated once you've migrated your world.
world_address = "0x3b5a8147f17a7ab5d5857a24d0d98574011445db0cab5ac75f588644b2b1517"

[tool.dojo.world]
name = "Dojo starter"
description = "The official Dojo Starter guide, the quickest and most streamlined way to get your Dojo Autonomous World up and running. This guide will assist you with the initial setup, from cloning the repository to deploying your world."
cover_uri = "file://assets/cover.png"
icon_uri = "file://assets/icon.png"
website = "https://github.com/dojoengine/dojo-starter"

[tool.dojo.world.socials]
x = "https://x.com/ohayo_dojo"
discord = "https://discord.gg/FB2wR6uF"
github = "https://github.com/dojoengine/dojo-starter"
telegram = "https://t.me/dojoengine"
```

## Profiles

To ease the management of different environments, Dojo supports profiles. You can define multiple profiles in your `Scarb.toml` file, and then use the `--profile` flag to select a specific profile when running a [Sozo](/toolchain/sozo) command.

You can refer to the profile in [Scarb documentation](https://docs.swmansion.com/scarb/docs/guides/defining-custom-profiles.html) for more information.
