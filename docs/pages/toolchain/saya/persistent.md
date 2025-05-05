---
title: Saya persistent mode
description: Run an appchain as an L3 on Starknet and more coming soon.
---

# Saya - Persistent mode

![saya](/saya-persistent.png)

In persistent mode, Saya will fetch the blocks from Katana and will verify the proof and update the state of the core contract on the settlement layer.

The core contract currently used on Starknet is [Piltover](https://github.com/keep-starknet-strange/piltover).

::::info
As a work in progress, it will be soon possible to send the compressed state diff (referred as the DA) to a data availability layer like [Celestia](https://celestia.org/).

Currently the compressed state diff is sent as calldata to the core contract on the settlement layer.
::::

## Setup Katana

Katana needs to be configured in provable mode to work with Saya. Katana is available in provable mode with all the new options starting [Dojo `1.3.0`](https://github.com/dojoengine/dojo/releases/tag/v1.3.0).

Initialize a new Katana chain spec:
```
katana init --id per1 \
    --settlement-chain <Sepolia|Mainnet> \
    --settlement-account-address <ADDRESS> \
    --settlement-account-private-key <PRIVATE_KEY>
```

This will automatically deploy a fresh core contract on the settlement layer.

If you want to use a specific facts registry contract, set it via the `settlement-facts-registry` argument.

```
katana init --id per1 \
    --settlement-chain <Sepolia|Mainnet> \
    --settlement-account-address <ADDRESS> \
    --settlement-account-private-key <PRIVATE_KEY>
    --settlement-facts-registry <ADDRESS>
```

```bash
✓ Deployment successful (0x7059b8519965f0587a2d3892ce747d79d256e98e1021a7b993f86d6a3f62d22) at block #605518
```

::::note
You can inspect the chain spec by running `katana config per1`.
::::

::::note
The settlement core contract must receive configuration parameters on deployement. It's recommended to let Katana handle this. You have some options available if the core contract is already deployed, to provide it to Katana to verify the configuration parameters.
::::

When working with Katana in provable mode, two additional parameters are required:

1. **block time**: since every block is proven, it is recommended to use a block time instead of the default mode where a block is mined for each transaction.

2. **block max cairo steps**: in the current implementation of Katana, there's a limitation where the cairo steps in a block are capped at `16` million. This is to prevent the proving step to fail. Once this limitation will be lifted, the maximum will be `40` million.

```
katana --chain sov1 \
    --block-time 30000 \
    --sequencing.block-max-cairo-steps 16000000
```

::::note
You can define an `--output-path` when working with katana init to output the configuration files in the given directory. You will then want to start katana with the `--chain /path` instead of `--chain <CHAIN_ID>`.
::::

### Running Saya

If you didn't already, consult the [Herodotus guide](/toolchain/saya/herodotus) to get an account and an API key.

To ease the configuration, Saya can be run with environment variables (which can be overridden by command line arguments).

If you are not running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), you can download the SNOS program and the Layout Bridfge program from the [Saya releases](https://github.com/dojoengine/saya/releases).

If you are running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), the programs are already present in the `/programs` directory.

```bash
# .env.persistent file

# The number of blocks to process in parallel in Saya.
BLOCKS_PROCESSED_IN_PARALLEL=4

# The database directory, to ensure long running queries are tracked
# and not re-run if Saya is restarted.
DB_DIR=/tmp/saya_persistent

# The Atlantic key, obtained from https://herodotus.cloud.
ATLANTIC_KEY=

# The path to the compiled SNOS program to be run against each block.
SNOS_PROGRAM=./programs/snos.json

# The path to the compiled layout bridge program to be run against each block.
LAYOUT_BRIDGE_PROGRAM=./programs/layout_bridge.json

# In persistent mode, the rollup RPC to pull the blocks from.
ROLLUP_RPC=http://0.0.0.0:5050

# Integrity verifier contract address.
# https://github.com/HerodotusDev/integrity/blob/main/deployed_contracts.md
SETTLEMENT_INTEGRITY_ADDRESS=0x04ce7851f00b6c3289674841fd7a1b96b6fd41ed1edc248faccd672c26371b8c

# Settlement chain.
SETTLEMENT_RPC=https://api.cartridge.gg/x/starknet/sepolia
SETTLEMENT_PILTOVER_ADDRESS=
SETTLEMENT_ACCOUNT_ADDRESS=
SETTLEMENT_ACCOUNT_PRIVATE_KEY=
```

Export those variables in your shell by sourcing the file or running:

```bash
export $(grep -v '^#' .env.persistent | xargs)
```

Then, you can start Saya with:

```bash
saya persistent start
```

::::info
To avoid double spending of Herodotus credits, Saya has an internal database to track the blocks that have been proven. The `DB_DIR` is then important to ensure that the database is not lost when Saya is restarted if you have long running Saya instance.
::::
