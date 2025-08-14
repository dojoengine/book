---
title: "World and Resource Metadata"
description: "Guide to configuring and managing metadata for Dojo worlds and resources"
---

# Metadata

Dojo supports associating offchain metadata with the **world** and its **resources**. This provides additional context about the world and its resources, such as their name, description, icon URI, and more. This enables external services to easily index and distribute worlds and experiences built on them.

During migration, `sozo` automatically manages metadata for you, uploading it to IPFS in `JSON` format and registering it in the world contract through the `ResourceMetadata` Dojo model. `sozo` does this by parsing the metadata defined in the Dojo profile configuration `dojo_\<PROFILE>.toml`.

## World Metadata

To set world metadata, create the following section in your `dojo_\<PROFILE>.toml`:

```toml
[world]
name = "example"
seed = "dojo_examples"
description = "example world"
icon_uri = "file://assets/icon.png"
cover_uri = "file://assets/cover.png"
website = "https://dojoengine.org"

[world.socials]
x = "https://twitter.com/dojostarknet"
github = "https://github.com/dojoengine/dojo"
discord = "https://discord.gg/FB2wR6uF"
```

The toolchain supports the `name`, `description`, `icon_uri`, `cover_uri`, `website` and `socials` attributes by default.

`*_uri` attributes can point to an asset in the repo using the `file://` schema or to remote resources using either `ipfs://` or `https://`. For local assets, `sozo` will upload them to IPFS and replace the corresponding URIs with an IPFS URI.

Arbitrary social links can be set by adding key-value pairs under the `socials` section. For example, you could add `telegram = "https://t.me/dojoengine"`.

## Resource Metadata

To set resource metadata, create the following sections in your `dojo_\<PROFILE>.toml`, using `[[models]]`, `[[contracts]]` or `[[events]]` depending on the type of the resource:

```toml
[[models]]
tag = "ns-Position"
description = "Position of the player in the world"
icon_uri = "file://assets/position_icon.png"

[[events]]
tag = "ns-Moved"
description = "Event emitted when a player has moved"
icon_uri = "file://assets/moved_icon.png"

[[contracts]]
tag = "ns-actions"
description = "Available actions for a player in the world"
icon_uri = "file://assets/actions_icon.png"
```

For each type of resource, the toolchain supports the `description` and `icon_uri` attributes by default. The `name` of the resource, retrieved from its `tag`, is also stored in the resource metadata.

`*_uri` attributes can point to an asset in the repo using the `file://` schema or to remote resources using either `ipfs://` or `https://`. For local assets, `sozo` will upload them to IPFS and replace the corresponding URIs with an IPFS URI.

## IPFS Configuration

The toolchain supports IPFS configuration options in the profile configuration file `dojo_\<PROFILE>.toml`. This configuration is required for uploading local assets and metadata to IPFS.

```toml
[env]
ipfs_config.url = "https://ipfs.infura.io:5001"
ipfs_config.username = "2EBrzr7ZASQZKH32sl2xWauXPSA"
ipfs_config.password = "12290b883db9138a8ae3363b6739d220"
```

:::warning
If IPFS configuration is not provided, metadata will not be uploaded to IPFS and a warning will be displayed during migration. Local assets using `file://` URIs will not be processed.
:::

## Technical Implementation

Dojo uses the `ResourceMetadata` model to store metadata on-chain. This model is [defined in Cairo](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/model/metadata.cairo) as:

```cairo
#[derive(Introspect, Drop, Serde, PartialEq, Clone, Debug)]
#[dojo::model]
pub struct ResourceMetadata {
    #[key]
    pub resource_id: felt252,
    pub metadata_uri: ByteArray,
    pub metadata_hash: felt252,
}
```

#### Fields

- `resource_id`: A unique identifier for the resource (world, model, contract, or event)
- `metadata_uri`: The URI pointing to the metadata JSON file (typically an IPFS URI)
- `metadata_hash`: A hash of the metadata content for integrity verification
