## Deployment to Remote Network

> _IMPORTANT: Dojo is unaudited. Use at your own risk._

Dojo makes it easy to deploy to remote networks, you just need to have a valid account and network endpoint.

Scarb.toml

```toml
[package]
name = "ohayoo"
version = "0.1.0"
cairo-version = "2.1.1"

[cairo]
sierra-replace-ids = true

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo.git" }

# # Katana
# rpc_url = "http://localhost:5050"
# account_address = "0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0"
# private_key = "0x0300001800000000300000180000000000030000000000003006001800006600"

#Madara
rpc_url = "https://api.cartridge.gg/x/shinai/madara"
account_address = "0x2"
private_key = "0xc1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d"
#world_address = "0x5b328933afdbbfd44901fd69a2764a254edbb6e992ae87cf958c70493f2d201"
```

### Remote Katana

Katanas are able to be hosted and run as remote testnets, however this is not recommended for production use.

**todo**: add instructions for deploying to remote katana

### Madara

[Madara](https://github.com/keep-starknet-strange/madara) is a blazingly fast Starknet sequencer. Built on the robust Substrate framework and fast, thanks to Rust 🦀, Madara delivers unmatched performance and scalability to power your Starknet-based Validity Rollup chain.

A public Madara testnet is available for deployment:

**Testnet RPC:** https://api.cartridge.gg/x/shinai/madara

You can use the following account to deploy:

```toml
# ...rest of Scarb.toml

rpc_url = "https://api.cartridge.gg/x/shinai/madara"
account_address = "0x2"
private_key = "0xc1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d"
```

### Starknet

**todo**: add instructions for deploying to remote Starknet
