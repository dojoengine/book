# Saya -- Sovereign mode

In sovereign mode, Saya will fetch the blocks from Katana and will post the proof and associated compressed state diff to a data availability layer. There is no core contract on a settlement layer.

## Overview

![saya](/saya-celestia.png)

For each block produced by Katana, Saya will post a blob to Celestia with the proof and associated compressed state diff.

Once available, this will allow any Katana to sync from the data availability layer information given the `commitment` and the `block height` of the latest Katana block that has been posted to the data availability layer. Katana will then sync backwards to the genesis block.

::::warning
Work In Progress:
Currently, it is not possible to start a Katana instance to sync from the data availability layer information. This will soon be possible.
::::

## Running in Sovereign mode

### Setup Celestia node

A Celestia node is required to post the blobs to the data availability layer, and the node must be running with funded account.

You can refer to the [official documentation for the instructions](https://docs.celestia.org/how-to-guides/light-node) to run a Celestia light node.

In the Saya repository, there is also a `celestia.sh` script to help you setup a Celestia node using docker:

1. Initialize the node:

    ```
    ./celestia.sh init
    ```

    Take note of the Celestia account created and it's address and also the auth token used to send requests to the node.

    A new docker volume named `celestia-light-mocha` will be created, and the key information will be stored there and mounted to the container when running the node.

2. Fund the account:

    The account can be funded by sending a message on the [Celestia discord](https://discord.com/invite/YsnTPcSfWQ).

    ```
    # Head to the #mocha-faucet channel and send a message with your Celestia address:
    $request <CELESTIA-ADDRESS>
    ```

3. Start the node for syncing:

    ```
    ./celestia.sh
    ```

### Setup Katana

Katana needs to be configured in provable mode to work with Saya. Katana is available in provable mode with all the new options starting [Dojo `1.3.0`](https://github.com/dojoengine/dojo/releases/tag/v1.3.0).

You can choose to just enter `katana init` and follow the instructions to setup a new instance.

Or you can go quicker by using the following arguments:
```
katana init --id sov1 --sovereign
```

::::note
You can inspect the chain spec by running `katana config sov1`.
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

If you are not running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), you can download the SNOS program from the [Saya releases](https://github.com/dojoengine/saya/releases).

If you are running Saya in [docker](https://github.com/dojoengine/saya/pkgs/container/saya), the programs are already present in the `/programs` directory.

```bash
# .env.sovereign file

# The number of blocks to process in parallel in Saya.
BLOCKS_PROCESSED_IN_PARALLEL=4

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

Export those variables in your shell by sourcing the file or running:

```bash
export $(grep -v '^#' .env.sovereign | xargs)
```

Then, you can start Saya with:

```bash
saya sovereign start
```

::::info
To avoid double spending of Herodotus credits, Saya has an internal database to track the blocks that have been proven. The `DB_DIR` is then important to ensure that the database is not lost when Saya is restarted if you have long running Saya instance.
::::
