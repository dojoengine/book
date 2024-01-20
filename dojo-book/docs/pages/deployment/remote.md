## Deployment to Remote Network

> _IMPORTANT: Dojo is unaudited. Use at your own risk._

Dojo makes it easy to deploy to remote networks, you just need to have a valid account and network endpoint.

Scarb.toml

```toml
[package]
name = "ohayoo"
version = "0.1.0"
cairo-version = "0.3.15"

[cairo]
sierra-replace-ids = true

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v0.3.15" }

# KATANA on slot
# rpc_url = "https://api.cartridge.gg/x/example/katana"
# account_address = "0x2d5260ba1d62ed0ea7c598f1460d27528b27afdf3bb43524a1ba3617e8279b2"
# private_key = "0x6768b97b44cfbfa9f776a3c00ebe33c228058bf8716bb0515a1363049da2a11"
# world = "0x1fad58d91d5d121aa6dc4d16c01a161e0441ef75fe7d31e3664a61e66022b1f"

# ENDPOINT
rpc_url = "https://api.cartridge.gg/x/shinai/madara"
account_address = "0x2"
private_key = "0xc1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d"
world_address = "0x5b328933afdbbfd44901fd69a2764a254edbb6e992ae87cf958c70493f2d201"

# GOERLI
# rpc_url = "https://starknet-goerli.g.alchemy.com/v2/<API KEY>"
# account_address = "0x2d5260ba1d62ed0ea7c598f1460d27528b27afdf3bb43524a1ba3617e8279b2"
# private_key = "0x6768b97b44cfbfa9f776a3c00ebe33c228058bf8716bb0515a1363049da2a11"
# world = "0x1fad58d91d5d121aa6dc4d16c01a161e0441ef75fe7d31e3664a61e66022b1f"
```

### Deploy to public Starknet

If you credentials are correct in the Scarb.toml then a simple migrate will deploy the world to Starknet.

### Deploy to Remote [Katana](/toolchain/katana/overview.md)

Katanas are able to be hosted and run as remote testnets, however this is not recommended for production use.

Deploy to remote katana with slot [here](/tutorial/deploy-using-slot/main.md)

### Deploy to Remote Madara

[Madara](https://github.com/keep-starknet-strange/madara) is a blazingly fast Starknet sequencer.
