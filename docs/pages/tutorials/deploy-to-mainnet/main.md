---
title: Deploying to Sepolia and Mainnet
description: Learn how to deploy your Dojo world to Sepolia testnet or Mainnet, including RPC setup, environment configuration, and Torii indexer deployment.
---

## Sepolia / Mainnet Deployment

This is a guide to deploy a Dojo world to Sepolia.
The steps for Mainnet are exactly the same, just replace the chain name and ID when necessary.


### Setup

* You need a [Starknet RPC Provider](https://www.starknet.io/fullnodes-rpc-services/) to deploy contracts on-chain.

You can use the *Cartridge RPC provider* for this.

```sh
https://api.cartridge.gg/x/starknet/mainnet # mainnet
https://api.cartridge.gg/x/starknet/sepolia # sepolia
```


 After you get yours, you can check if it works and is on the correct chain (`SN_SEPOLIA` or `SN_MAIN`)

```sh
# run this...
curl --location '<RPC_PROVIDER_URL>' \
--header 'Content-Type: application/json' \
--data '{"id": 0,"jsonrpc": "2.0","method": "starknet_chainId","params": {}}'

# you should get an output like this...
{"jsonrpc":"2.0","result":"0x534e5f5345504f4c4941","id":0}

# now paste the hex result part on this command...
echo 0x534e5f5345504f4c4941 | xxd -r -p

# which !must! output SN_SEPOLIA or SN_MAIN
SN_SEPOLIA
```

* Declare the `sepolia` profile in [`Scarb.toml`](https://github.com/rsodre/512karat/blob/main/dojo/Scarb.toml)

```toml
[profile.sepolia]
```

* Create the [`dojo_sepolia.toml`](https://github.com/rsodre/512karat/blob/main/dojo/dojo_sepolia.toml) dojo config file, with the same contents of [`dojo_dev.toml`](https://github.com/rsodre/512karat/blob/main/dojo/dojo_dev.toml), except for `[env]`, in which we're going to expose the `world_address` only:

```toml
[env]
# rpc_url = ""         # env: STARKNET_RPC_URL
# account_address = "" # env: DOJO_ACCOUNT_ADDRESS
# private_key = ""     # env: DOJO_PRIVATE_KEY
# world_address = "<World Address>"
```

* It's recommended to keep the `world_address` empty, on the first deployment it will be outputed by the deployment script. Then you should expose it.

* Clone the [`dev`](https://github.com/rsodre/512karat/blob/main/dojo/overlays/dev/) overlays to [`sepolia`](https://github.com/rsodre/512karat/blob/main/dojo/overlays/sepolia/)

* Create `.env.sepolia` containing your RPC provider, account and private key. Make sure that account is deployed and has some [ETH](https://starknet-faucet.vercel.app) in it (0.001 is more than enough).

```sh
# usage: source .env.sepolia
export STARKNET_RPC_URL=<RPC_PROVIDER_URL>
export DOJO_ACCOUNT_ADDRESS=<YOUR_ACCOUNT_ADDRESS>
export DOJO_PRIVATE_KEY=<YOUR_ACCOUNT_PRIVATE_KEY>
```



### Deployment

* To load the env variables and deploy to the chain you can use this script (for mainnet, just replace `sepolia` with `mainnet`):

```bash
# Stop script on error
set -e

# Load environment variables from the appropriate file
ENV_FILE=".env.sepolia"

if [ -f "$ENV_FILE" ]; then
  echo "Loading environment variables from $ENV_FILE..."
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "Environment file $ENV_FILE not found!"
  exit 1
fi

# Define a cleanup function to clear environment variables
cleanup_env() {
  echo "Cleaning up environment variables..."
  unset STARKNET_RPC_URL
  unset DOJO_ACCOUNT_ADDRESS
  unset DOJO_PRIVATE_KEY
  echo "Environment variables cleared."
}

# Set the trap to execute cleanup on script exit or error
trap cleanup_env EXIT

# Build the project
echo "Building the project..."
sozo -P sepolia build

# Deploy the project
echo "Deploying to Sepolia..."
sozo -P sepolia migrate

# Deployment succeeded message
echo "Deployment completed successfully."
```

* For this script to work don't forget to give it execution permissions:
 `chmod +x <script_name>.sh`

* This localises the env variables to the deployment script, so if for any reason the deployment is aborted, it cleans up the env variables.


* sozo will output the rpc url, account address and deployed block.

```sh
 profile | chain_id | rpc_url
---------+----------+------------------------
 sepolia | SN_SEPOLIA | <RPC_PROVIDER_URL>


🌍 World deployed at block <DEPLOYED_BLOCK> with txn hash: <DEPLOYMENT_TXN_HASH>
⛩️  Migration successful with world at address <WORLD_ADDRESS>
```

:::note
If the world is already deployed by other user, you must change your `seed` in `dojo_<PROFILE>.toml` config file.
This will yield a different world address.
:::


Your world is deployed!

* Once the world is deployed, you need to add the world_block in the `dojo_<PROFILE>.toml` file.
```toml
rpc_url = "https://api.cartridge.gg/x/starknet/mainnet"
# account_address = "" # env: DOJO_ACCOUNT_ADDRESS
# private_key = ""     # env: DOJO_PRIVATE_KEY
world_address = <world address>
world_block = 42069 # Here you add the block number where the world was deployed
```

### Torii Indexer

Now, if you're building a Dojo client, you will need a Torii service to index our world...

* Install [slot](https://github.com/cartridge-gg/slot) or update it. You can find the docs [here](https://docs.cartridge.gg/slot/getting-started).

```sh
slotup
```

* Authorize

```sh
slot auth login
```

* Create Torii service with this command, replacing...
  * `SERVICE_NAME` can be the name of the game/dapp. Once you create it, you own that name.
  * `DOJO_VERSION`: your Dojo version (ex: `v1.0.1`)
  * `WORLD_ADDRESS`: from your Dojo config file `dojo_sepolia.toml` or from the deployment output
  * `RPC_URL`: your RPC provider url

```sh
slot deployments create <PROJECT_NAME> torii --version <DOJO_VERSION> --world <WORLD_ADDRESS> --rpc <RPC_URL>
```

* slot will output something like this. Save it for later, you will need the endpoints on your client.

```
Deployment success 🚀

Stream logs with `slot deployments logs <SERVICE_NAME> torii -f`
```

* If for any reasons we need to recreate Torii, we can just delete it and run the create command again. This is safe, all your data is on-chain.

```sh
slot deployments delete <SERVICE_NAME> torii
```

### Some notes on the client side

* The `migrate` script is copying manifests to `/client/src/dojo/generated/<PROFILE>`, each chain needs to use their own manifest!

* The client needs the env variable `VITE_PUBLIC_CHAIN_ID` to be set to your chain id. Configure on your sever and add it to your `.env` to access your deployment localy:


```
VITE_PUBLIC_CHAIN_ID=SN_SEPOLIA
```

or...

```
VITE_PUBLIC_CHAIN_ID=SN_MAIN
```

### Debug with Walnut

Use [Walnut](https://walnut.dev) to debug your on-chain transactions on Mainnet, Sepolia, or Slot deployments. Walnut helps you inspect transaction details, understand execution flow, and troubleshoot issues.

#### Step 1: Verify your Contracts

To use full debugging capabilities, first verify your contracts using Walnut:

```bash
sozo walnut verify
```

You'll see output similar to:
```console
🌰 Verifying classes with Walnut...

  > "Contract verification has started. You can check the verification status at the following link: https://app.walnut.dev/verification/status/c9f415ec-1257-4f34-959c-5ccf51662e53"
```

#### Step 2: Debug Your Transaction

After successful verification, follow these steps to debug your transaction on Walnut:

**For Starknet Mainnet or Testnet(Sepolia):**

1. Open the [Walnut app](https://app.walnut.dev).
2. Enter your transaction hash in the search bar.
3. Click on your transaction to view debug information.

  > Example: To see Walnut Debugger in action, open this [example Dojo transaction](https://app.walnut.dev/transactions?chainId=SN_SEPOLIA&txHash=0x06553f6543e0afbfcfa3ba22223a50cd36db75c7be7e53fba38786908a550c9b).

**For Slot Deployments:**

You need to set up your Slot RPC URL in Walnut before debugging:

1. Follow this [custom networks setup guide](https://docs.walnut.dev/custom-networks).
2. Once set up, use the Walnut app as described above.

For detailed instructions and advanced use cases, visit the official [Walnut Documentation](https://docs.walnut.dev).
