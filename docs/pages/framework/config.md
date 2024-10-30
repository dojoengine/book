# Config

Dojo projects implement a way to standardize your profile management. It introduces two config files to easily manage complex configurations, easing development hassles. This keeps the `Scarb.toml` clean of dojo specific config.

## dojo_dev.toml

In your dev toml include your development parameters.

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

[namespace]
default = "dojo_starter"

[env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
world_address = "0x3b34889efbdf01f707d5d7421f112e8fb85a42fb6f2e5422c75ce3253148b0e"

[writers]
"dojo_starter" = ["dojo_starter-actions"]
```

## dojo_release.toml

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

[namespace]
default = "dojo_starter"

[env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
# world_address = "0x3fc79ccfd72c1450d2ccb73c5c521a7ec68b6c6af0caf96a0f1c39ce58876c8"  # Uncomment and update this line with your world address.

[writers]
"dojo_starter" = ["dojo_starter-actions"]
```

## Scarb

Under the hood dojo extends the base `Scarb.toml` file.

You can refer to the profile in [Scarb documentation](https://docs.swmansion.com/scarb/docs/guides/defining-custom-profiles.html) for more information.
