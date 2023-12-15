# Config

Dojo worlds are defined in their `Scarb.toml` files. This is just a regular [Scarb](https://docs.swmansion.com/scarb/) file which is an excellent Cairo package manager and project manager.

Full example of a `Scarb.toml` file:

```toml
[package]
cairo-version = "2.4.0"
name = "dojo_examples"
version = "0.4.0"

[cairo]
sierra-replace-ids = true

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", version = "0.4.1" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0xbeef"

[tool.dojo.env]
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"
```
