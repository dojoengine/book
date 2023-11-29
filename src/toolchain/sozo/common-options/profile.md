## use sozo profiles

Profiles can be convenient when dealing with multiple environments (dev, staging, prod)

`--profile`  
&nbsp;&nbsp;&nbsp;&nbsp;Specify profile to use by name.

`--dev`  
&nbsp;&nbsp;&nbsp;&nbsp;Use dev profile.

`--release`  
&nbsp;&nbsp;&nbsp;&nbsp;Use release profile.


### USAGE

Multiple profiles can be defined in Scarb.toml

```sh
[profile.dev.tool.dojo.env]
rpc_url = "http://localhost:5050"
account_address = "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
private_key = "0x1800000000300000180000000000030000000000003006001800006600"

[profile.staging.tool.dojo.env]
rpc_url = "https://api.cartridge.gg/x/mydojoproject/katana"
account_address = "0x5686a647a9cdd63ade617e0baf3b364856b813b508f03903eb58a7e622d5855"
private_key = "0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b"
```

Then used with sozo commands

```sh
sozo --profile dev migrate
```

is equivalent to 

```sh
sozo migrate --rpc-url http://localhost:5050 --account-address 0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973 --private-key 0x1800000000300000180000000000030000000000003006001800006600
```
