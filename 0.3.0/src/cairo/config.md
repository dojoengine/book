# Config

Dojo worlds are defined in their Scarb.toml files. This is just a regular [Scarb](https://docs.swmansion.com/scarb/) file which is an excellent Cairo package manager and project manager.

Full example of a Scarb.toml file:

```toml
[package]
cairo-version = "2.3.0"
name = "dojo_examples"
version = "0.1.0"

[cairo]
sierra-replace-ids = true

[dependencies]
# IMPORTANT: Dojo should be pinned to a specific version or else your world might not compile
dojo = { git = "https://github.com/dojoengine/dojo", rev="v0.3.0" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0xbeef"

[tool.dojo.env]
# local katana devnet
rpc_url = "http://localhost:5050/"

# account address of world deployer
account_address = "0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c"

# private key of world deployer
private_key = "0x333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b"

# world contract address
world_address = "0x789c94ef39aeebc7f8c4c4633030faefb8bee454e358ae53d06ced36136d7d6"
```