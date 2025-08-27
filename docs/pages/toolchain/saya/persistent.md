---
title: Persistent mode
description: Run an appchain as an L3 on Starknet and more coming soon.
---

# Persistent mode

In persistent mode, Saya fetches blocks from Katana, verifies proofs, and updates the core contract state on the settlement layer.

![saya](/toolchain/saya-persistent.png)

:::tip
For data availability without settlement layer integration, see [Sovereign mode](/toolchain/saya/sovereign).
:::

:::info
The core contract currently used on Starknet is [Piltover](https://github.com/keep-starknet-strange/piltover).
Piltover acts as the settlement layer contract that receives and verifies state updates from your rollup, ensuring the integrity of state transitions on the base layer.
:::

## Setup Katana

Katana must be configured in provable mode to work with Saya.
First, initialize a new chain spec:

```bash
katana init --id per1 \
    --settlement-chain <Sepolia|Mainnet> \
    --settlement-account-address <ADDRESS> \
    --settlement-account-private-key <PRIVATE_KEY>
```

This automatically deploys a fresh core contract on the settlement layer.
If you want to use a specific facts registry contract, set it via the `settlement-facts-registry` argument:

```bash
katana init --id per1 \
    --settlement-chain <Sepolia|Mainnet> \
    --settlement-account-address <ADDRESS> \
    --settlement-account-private-key <PRIVATE_KEY>
    --settlement-facts-registry <ADDRESS>
```

::::tip
You can inspect the chain by running `katana config per1`
::::

::::note
The settlement core contract must receive configuration parameters on deployment.
It's recommended to let Katana handle this.
If the core contract is already deployed, you should provide it so Katana can verify the configuration parameters.
::::

When working with Katana in provable mode, two additional parameters are required:

1. `block-time`: Since every block is proven, it is recommended to use a block time instead of the default mode where a block is mined for each transaction.
This prevents overwhelming the prover with too many blocks and ensures consistent proving performance.

2. `block-max-cairo-steps`: In the current implementation of Katana, the default cairo steps limit in a block is `50` million.
For provable mode with Saya, it is recommended to use `16` million to ensure the proving step succeeds reliably.
This limit exists due to Cairo VM constraints and proving complexity - larger blocks may fail to prove or timeout.

```bash
katana --chain per1 \
    --block-time 30000 \
    --sequencing.block-max-cairo-steps 16000000
```

::::note
You can define an `--output-path` when working with katana init to output the configuration files in the given directory.
You will then want to start katana with the `--chain /path` instead of `--chain <CHAIN_ID>`.
::::

## Run Saya

If you haven't already, consult the [Herodotus guide](/toolchain/saya) to get an account and an API key.

If you are not running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), you can download the SNOS program and the Layout Bridge program from the [Saya releases](https://github.com/dojoengine/saya/releases).
If you are running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), the programs are already present in the `/programs` directory.

:::tip
To ease configuration, Saya can be run with environment variables (which can be overridden by command line arguments).
:::

```bash
# .env.persistent

# The number of blocks to process in parallel in Saya.
BLOCKS_PROCESSED_IN_PARALLEL=60

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
To avoid double spending of Herodotus credits, Saya has an internal database to track the blocks that have been proven.
The `DB_DIR` is important to ensure that the database is not lost when Saya is restarted if you have a long running Saya instance.
::::
