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

## Deploying a Torii Indexer

Now, if you're building a Dojo client, you will need a Torii indexer to index your world.

Install [slot](https://github.com/cartridge-gg/slot) or update it.
You can find the docs [here](https://docs.cartridge.gg/slot/getting-started).

```sh
slotup
```

Authorize:

```sh
slot auth login
```

Create a [Torii configuration file](/toolchain/torii/configuration) with your world address and RPC endpoint:

- `WORLD_ADDRESS`: from your Dojo config file `dojo_sepolia.toml` or from the deployment output
- `RPC_URL`: your RPC provider url

```toml
# torii.toml
world_address = "<WORLD_ADDRESS>"
rpc = "<RPC_URL>"
```

Create Torii indexer with this command, replacing:

- `SERVICE_NAME` can be the name of the game/dapp. Once you create it, you own that name.
- `DOJO_VERSION`: your Dojo version (ex: `v1.0.1`)

```sh
slot deployments create <SERVICE_NAME> torii --config torii.toml --version <DOJO_VERSION>
```

Slot will output something like this.
Save it for later, you will need the endpoints on your client.

```
Deployment success 🚀

Stream logs with `slot deployments logs <SERVICE_NAME> torii -f`
```

If for any reasons we need to recreate Torii, we can just delete it and run the create command again.
This is safe, all your data is on-chain.

```sh
slot deployments delete <SERVICE_NAME> torii
```
