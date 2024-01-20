## Metadata

Dojo supports associating offchain metadata with the world contract and other deployed contracts. This can provide additional context about the world, such as it's name, description, social links and other media. Enabling external services to easily index and distribute worlds and experiences built on them.

### World Metadata

During migration, `sozo` will automatically manage the worlds metadata for you, uploading it to ipfs and setting it in the world contract. It does so by parsing the metadata defined in the projects `Scarb.toml`.

To set a worlds metadata, create the following section in your `Scarb.toml`:

```toml
[tool.dojo.world]
name = "example"
description = "example world"
icon_uri = "file://assets/icon.png"
cover_uri = "file://assets/cover.png"
website = "https://dojoengine.org"
socials.x = "https://twitter.com/dojostarknet"
```

The toolchain supports the `name`, `description`, `icon_uri`, `cover_uri`, `website` and `socials` attributes by default. `_uri` attributes can point to a asset in the repo using the `file://` schema or to remote resouces using either `ipfs://` or `https://`. Arbitrary social links can be set by setting a key value on the `socials` attribute. For example, we could add a `socials.github = "..."`.

During migration, `sozo` will upload any local assets to ipfs, replace the corresponding uris, upload the metadata json to ipfs, and set the `metadata_uri` for the world (resource `0`).

### Contract Metadata

It is possible for contract owners to set a `metadata_uri` for any contract. However, this specification has not yet been defined and it is not supported by the toolchain at this time.
