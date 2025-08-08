---
title: Saya sovereign mode
description: Run a sovereign rollup with Katana and posting proofs to Celestia.
---

# Sovereign mode

In sovereign mode, Saya fetches blocks from Katana and posts the proof and associated compressed state diff to a data availability layer.
There is no core contract on a settlement layer.

![saya](/saya-celestia.png)

:::tip
For settlement layer integration with state updates, see [Persistent mode](/toolchain/saya/persistent).
:::

Once available, this allows any Katana to sync from the data availability layer information given the `commitment` and the `block height` of the latest Katana block that has been posted to the data availability layer.
Katana will then sync backwards to the genesis block.

::::warning
Currently, it is not possible to sync a Katana instance from a data availability layer.
This functionality is planned and will be available soon.
::::

## Setup Celestia

A Celestia node is required to post the blobs to the data availability layer, and the node must be running with a funded account.
You can refer to the [official documentation for the instructions](https://docs.celestia.org/how-to-guides/light-node) to run a Celestia light node.

In the Saya repository, there is also a `celestia.sh` script to help you set up a Celestia node using docker:

### 1. Initialize the node

```bash
./celestia.sh init
```

Take note of the Celestia account created and its address and also the auth token used to send requests to the node.
A new docker volume named `celestia-light-mocha` will be created, and the key information will be stored there and mounted to the container when running the node.

### 2. Fund the account

The account can be funded by sending a message to the `#mocha-faucet` channel on the [Celestia discord](https://discord.com/invite/YsnTPcSfWQ):

```bash
# Send this message in the #mocha-faucet channel:
$request <CELESTIA-ADDRESS>
```

### 3. Start the node for syncing

```bash
./celestia.sh
```

## Setup Katana

Katana must be configured in provable mode to work with Saya.

You can choose to just enter `katana init` and follow the instructions to set up a new instance.
Or you can go quicker by using the following arguments:

```bash
katana init --id sov1 --sovereign
```

::::note
You can inspect the chain spec by running `katana config sov1`.
::::

When working with Katana in provable mode, two additional parameters are required:

1. `block-time`: Since every block is proven, it is recommended to use a block time instead of the default mode where a block is mined for each transaction.

2. `block-max-cairo-steps`: In the current implementation of Katana, the default Cairo steps limit in a block is `50` million.
For provable mode with Saya, it is recommended to use `16` million to ensure the proving step succeeds reliably.

```bash
katana --chain sov1 \
    --block-time 30000 \
    --sequencing.block-max-cairo-steps 16000000
```

::::note
You can define an `--output-path` when working with katana init to output the configuration files in the given directory.
You will then want to start katana with the `--chain /path` instead of `--chain <CHAIN_ID>`.
::::

## Run Saya

If you haven't already, consult the [Herodotus guide](/toolchain/saya) to get an account and an API key.

If you are not running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), you can download the SNOS program from the [Saya releases](https://github.com/dojoengine/saya/releases).
If you are running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), the programs are already present in the `/programs` directory.

:::tip
To ease configuration, Saya can be run with environment variables (which can be overridden by command line arguments).
:::

```bash
# .env.sovereign

# The number of blocks to process in parallel in Saya (required).
BLOCKS_PROCESSED_IN_PARALLEL=60

# The database directory, to ensure long running queries are tracked
# and not re-run if Saya is restarted.
DB_DIR=/tmp/saya_sovereign

# The Atlantic key, obtained from https://herodotus.cloud.
ATLANTIC_KEY=

# The path to the compiled SNOS program to be run against each block.
SNOS_PROGRAM=./programs/snos.json

# The Starknet RPC URL to fetch the blocks from.
STARKNET_RPC=http://localhost:5050

# The first block to process.
GENESIS_FIRST_BLOCK_NUMBER=0

# The Celestia RPC URL to fetch the blocks from.
CELESTIA_RPC=http://localhost:26658
# Celestia defaults the key name to `my_celes_key` if not specified.
# CELESTIA_KEY_NAME=my_celes_key
# Default namespace will be sayaproofs, but can be overriden.
# CELESTIA_NAMESPACE=sayaproofs

# The Celestia token to post the proof.
# When running a node with `scripts/celestia.sh`, you can find the token in the logs before the node starts.
CELESTIA_TOKEN=
```

:::note
`BLOCKS_PROCESSED_IN_PARALLEL` is **required** when configuring Saya in sovereign mode
:::

Export those variables in your shell by sourcing the file or running:

```bash
export $(grep -v '^#' .env.sovereign | xargs)
```

Then, you can start Saya with:

```bash
saya sovereign start
```

::::info
To avoid double spending of Herodotus credits, Saya has an internal database to track the blocks that have been proven.
The `DB_DIR` is important to ensure that the database is not lost when Saya is restarted if you have a long running Saya instance.
::::
