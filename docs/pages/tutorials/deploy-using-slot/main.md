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

If the migrations have been successful, you will receive the world address, which then you can use to interact with your world.

```sh
🎉 Successfully migrated World at address WORLD_ADDRESS

✨ Updating manifest.json...

✨ Done.

```

Congratulations! You have successfully deployed your project with a Katana slot.

To deploy a Torii indexer for your Katana deployment, follow the [Torii deployment instructions](/tutorials/deploy-to-mainnet/main#torii-indexer) in the mainnet deployment guide, using your Katana RPC URL and world address.
