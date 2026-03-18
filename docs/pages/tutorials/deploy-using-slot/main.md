---
title: Deploying with Slot
description: Learn how to deploy your Dojo project using Slot, including authentication, configuration, and setting up a Torii indexer.
---

![slot](/tutorials/slot-icon-word.png)

# Deploy your game using Slot

Welcome to this tutorial where we'll guide you through deploying a project using Slot.

---

Before we start, make sure you are using the latest Dojo version.
Run `dojoup` to have the latest version installed.

Now, let's create a new project and initialize it with Sozo.

```bash
sozo init dojo-starter && cd dojo-starter
```

First, we need to set up our configuration, starting by authenticating with Cartridge.
To do this, run the following command, which will then prompt a new screen where you will need to go through the authentication process.

```bash
slot auth login

# Slot Auth debug (if old auth credentials):
rm ~/Library/Application\ Support/slot/credentials.json
```

Once successful, you can create a new deployment with a unique `DEPLOYMENT_NAME`.

The simplest way to get started is using `--optimistic` mode:

```bash
slot deployments create DEPLOYMENT_NAME katana --optimistic
```

Alternatively, you can provide a [Katana configuration file](/toolchain/katana/configuration) via `--config`:

```bash
slot deployments create DEPLOYMENT_NAME katana --config katana.toml
```

After that, you should receive the RPC endpoint for the Katana slot.
Now, you can use that and update your `Scarb.toml` file with the new RPC endpoint as follows:

```toml
[tool.dojo.env]
rpc_url = "YOUR_NEW_RPC_URL"
```

Now, you can stream Katana in a new terminal.
Open a new terminal and run the following command:

```bash
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

```bash
sozo build
```

Now, let's migrate the project to our new Katana slot:

```bash
sozo migrate
```

If the migrations have been successful, you will receive the world address, which then you can use to interact with your world.

```bash
🎉 Successfully migrated World at address WORLD_ADDRESS

✨ Updating manifest.json...

✨ Done.

```

Congratulations!
You have successfully deployed your project with a Katana slot.

## Torii

For Torii deployment setup, see the [Torii Indexer section in the mainnet deployment guide](/tutorials/deploy-to-mainnet/main#torii-indexer).
