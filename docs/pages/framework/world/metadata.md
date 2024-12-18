---
title: "World and Resource Metadata"
description: "Guide to configuring and managing metadata for Dojo worlds and resources"
---

# Metadata

Dojo supports associating offchain metadata with the world and its resources. This can provide additional context about the world and their resources, such as their name, description, icon URI, ... Enabling external services to easily index and distribute worlds and experiences built on them.

During migration, `sozo` will automatically manage metadata for you, uploading them to IPFS in `JSON` format and registering them in the world contract through the `ResourceMetadata` Dojo model. `sozo` does so by parsing the metadata defined in the Dojo profile configuration `dojo_<PROFILE>.toml`.

## World Metadata

To set world metadata, create the following section in your `dojo_<PROFILE>.toml`:

```toml
[world]
name = "example"
seed = "dojo_examples"
description = "example world"
icon_uri = "file://assets/icon.png"
cover_uri = "file://assets/cover.png"
website = "https://dojoengine.org"
socials.x = "https://twitter.com/dojostarknet"
```

The toolchain supports the `name`, `description`, `icon_uri`, `cover_uri`, `website` and `socials` attributes by default.

`*_uri` attributes can point to an asset in the repo using the `file://` schema or to remote resouces using either `ipfs://` or `https://`. For local assets, `sozo` wil upload them to IPFS and replace the corresponding URIs by a IPFS URI.

Arbitrary social links can be set by setting a key value on the `socials` attribute. For example, we could add a `socials.github = "..."`.

## Resource Metadata

To set resource metadata, create the following section in your `dojo_<PROFILE>.toml`, using `[[models]]`, `[[contracts]]` or `[[events]]` depending on the type of the resource:

```toml
[[models]]
tag = "ns-Position"
description = "Position of the player in the world"
icon_uri = "file://assets/position_icon.png"

[[events]]
tag = "ns-Moved"
description = "emit when a player has moved"
icon_uri = "file://assets/moved_icon.png"

[[contracts]]
tag = "ns-actions"
description = "Available actions for a player in the world"
icon_uri = "file://assets/actions_icon.png"
```

For each type of resource, the toolchain supports the `description` and `icon_uri` attributes by default. The `name` of the resource, retrieved from its `tag`, is also stored in the resource metadata.

`*_uri` attributes can point to an asset in the repo using the `file://` schema or to remote resouces using either `ipfs://` or `https://`. For local assets, `sozo` wil upload them to IPFS and replace the corresponding URIs by a IPFS URI.

## Defining IPFS configuration in profile

The toolchain supports the following IPFS configuration options in the profile configuration file `dojo_<PROFILE>.toml`:

```toml
[env]
ipfs_config.url = "https://ipfs.infura.io:5001"
ipfs_config.username = "2EBrzr7ZASQZKH32sl2xWauXPSA"
ipfs_config.password = "12290b883db9138a8ae3363b6739d220"
```

If those configurations are not provided, metadata will not be uploaded to IPFS and a warning will be displayed.
