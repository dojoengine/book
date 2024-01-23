# Config

Dojo worlds are defined in their `Scarb.toml` files. This is just a regular [Scarb](https://docs.swmansion.com/scarb/) file which is an excellent Cairo package manager and project manager.

Full example of a `Scarb.toml` file:

```toml
[package]
cairo-version = "2.4.0"
name = "dojo_examples"
version = "0.5.0"

[cairo]
sierra-replace-ids = true

[dependencies]
# IMPORTANT: Dojo should be pinned to a specific version or else your world might not compile.
dojo = { git = "https://github.com/dojoengine/dojo", version = "0.5.0" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0xbeef"

[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"
```
