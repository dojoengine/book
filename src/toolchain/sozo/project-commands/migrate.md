## sozo migrate

`migrate` is used to perform the migration (deployment) process, declaring and deploying contracts as necessary to deploy or update the World.

Changes made to the local World after the initial deployment, can easily be pushed to the remote counterpart by running `sozo migrate --world <WORLD_ADDRESS>` with `WORLD_ADDRESS` being the address of the remote World. In the background, `migrate` will compute the diffs of the local and remote World, then, start constructing a migration strategy to determine, if any, which part of the local World needs to be pushed upstream.

### USAGE

```sh
sozo migrate [OPTIONS]
```

### OPTIONS

#### General Options

`--name` _NAME_  
&nbsp;&nbsp;&nbsp;&nbsp;Name of the World. At the moment, the only usage for this option is to be used as a salt when deploying the World contract to avoid address conflicts. This option is **required** when performing the initial migration of the World.

#### World Options

{{#include ../common/world-options.md}}

#### Starknet Options

{{#include ../common/starknet-options.md}}

#### Account Options

{{#include ../common/account-options.md}}

#### Signer Options - Raw

{{#include ../common/signer-options-raw.md}}

#### Signer Options - Keystore

{{#include ../common/signer-options-keystore.md}}

### EXAMPLES

1. Deploying your World for the first time to a local Katana node

```sh
sozo migrate --name ohayo --rpc-url http://localhost:5050
```

2. Updating a remote World after making some changes

```sh
sozo migrate --world 0x123456
```

3. Deploying your World using [profile options](../common-options/profile-options.md)

```sh
sozo --profile dev migrate
```
