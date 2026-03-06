---
title: Deploying with Slot
description: Learn how to deploy your Dojo project using Slot, including authentication, configuration, and setting up a Torii indexer.
---

![slot](/tutorials/slot-icon-word.png)

# Deploy your game using Slot

Welcome to this tutorial where we'll guide you through deploying a project using the Slot.

---

Before we start, make sure you are using the latest dojo version.
Run `dojoup` to have the latest version installed.

Now, let's create a new project and initialize it with sozo.

```sh
sozo init dojo-starter && cd dojo-starter
```

First, we need to set up our configuration, starting by authenticating with Cartridge.
To do this, run the following command, which will then prompt a new screen where you will need to go through the authentication process.

```sh
slot auth login

# Slot Auth debug (if old auth credentials):
rm ~/Library/Application\ Support/slot/credentials.json
```

Once successful, you can create a new deployment with a unique `DEPLOYMENT_NAME`.

The simplest way to get started is using `--optimistic` mode:

```sh
slot deployments create DEPLOYMENT_NAME katana --optimistic
```

Alternatively, you can provide a [Katana configuration file](/toolchain/katana/configuration) via `--config`:

```sh
slot deployments create DEPLOYMENT_NAME katana --config katana.toml
```

After that, you should receive the RPC endpoint for the katana slot.
Now, you can use that and update your `Scarb.toml` file with the new RPC endpoint as follows:

```toml
[tool.dojo.env]
rpc_url = "YOUR_NEW_RPC_URL"
```

Now, you can stream katana in a new terminal.
Open a new terminal and run the following command:

```sh
slot deployments logs DEPLOYMENT_NAME katana -f
```

Then, copy the account address and the private key from the first account into the `Scarb.toml` file and replace the existing ones as follows:

```toml
account_address = "YOUR_NEW_ACCOUNT_ADDRESS"
private_key = "YOUR_NEW_PRIVATE_KEY"
```

Note: For each new Katana slot, a different account seed is used, making all the accounts unique!

---

Once finished with the new configurations, we are ready to build and migrate the project.
To build the project, run the following command:

```sh
sozo build
```

Now, let's migrate the project to our new katana slot:

```sh
sozo migrate
```

If the migrations have been successful, you will receive the `WORLD_ADDRESS`, which then you can use to interact with your world.

```sh
🎉 Successfully migrated World at address WORLD_ADDRESS

✨ Updating manifest.json...

✨ Done.

```

Congratulations!
You have successfully deployed your project with a Katana slot.

For a comprehensive guide to deploying on Starknet mainnet, see our [mainnet deployment tutorial](./deploy-to-mainnet/main).

## Torii

To deploy a Torii indexer slot, first create a [Torii configuration file](/toolchain/torii/configuration) with your world address and RPC endpoint:

```toml
# torii.toml
world_address = "YOUR_WORLD_ADDRESS"
rpc = "YOUR_NEW_RPC_URL"
```

Then create the deployment:

```sh
slot deployments create DEPLOYMENT_NAME torii --config torii.toml
```

You can also specify a Dojo version with `--version`:

```sh
slot deployments create DEPLOYMENT_NAME torii --config torii.toml --version v1.8.0
```

Once deployment is successful, you should receive the endpoints for GraphQL and gRPC.

If you wish to stream the logs, you can run the following command in a new terminal:

```sh
slot deployments logs DEPLOYMENT_NAME torii -f
```

## Debug with Walnut

Use [Walnut](https://walnut.dev) to debug your on-chain transactions on Mainnet, Sepolia, or Slot deployments.
Walnut helps you inspect transaction details, understand execution flow, and troubleshoot issues.

### Step 1: Verify your Contracts

To use full debugging capabilities, first verify your contracts using Walnut:

```bash
sozo walnut verify
```

You'll see output similar to:

```console
🌰 Verifying classes with Walnut...

  > "Contract verification has started. You can check the verification status at the following link: https://app.walnut.dev/verification/status/c9f415ec-1257-4f34-959c-5ccf51662e53"
```

### Step 2: Debug Your Transaction

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
