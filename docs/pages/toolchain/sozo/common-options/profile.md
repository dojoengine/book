## Sozo Profile Configuration

The `--profile` option allows you to manage multiple environments (dev, staging, prod) efficiently in your Dojo projects.

### Available Profile Options

`--profile <name>`  
&nbsp;&nbsp;&nbsp;&nbsp;Specify profile to use by name.

`--dev`  
&nbsp;&nbsp;&nbsp;&nbsp;Use development profile (default).

`--release`  
&nbsp;&nbsp;&nbsp;&nbsp;Use release/production profile.

### Configuration Files

Each profile corresponds to a specific configuration file in your project workspace:

Example Development Profile (dojo_dev.toml)

```toml
[env]
rpc_url = "http://localhost:5050"
account_address = "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"
```

Example Release Profile (dojo_release.toml)

```toml
[env]
rpc_url = "https://api.cartridge.gg/x/mydojoproject/katana"
account_address = "0x5686a647a9cdd63ade617e0baf3b364856b813b508f03903eb58a7e622d5855"
private_key = "0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b"
```

### Usage

To use a specific profile with Sozo commands:

```sh
sozo --profile dev migrate 
```

This command will use the development profile settings from `dojo_dev.toml`. Using profile configurations is recommended over passing explicit arguments in most cases, as it provides better organization and reproducibility across different environments.
