# Deploy your game using Slot

Welcome to this tutorial where we'll guide you through deploying a project using the Slot.

---

Before we start, make sure you are using the latest dojo version. Run `dojoup` to have the latest version installed.

Now, let's create a new project and initialize it with sozo.

```sh
sozo init dojo-starter && cd dojo-starter
```

First, we need to set up our configuration, starting by authenticating with Cartridge. To do this, run the following command, which will then prompt a new screen where you will need to go through the authentication process.

```sh
slot auth login

# Slot Auth debug (if old auth credentials):
rm ~/Library/Application\ Support/slot/credentials.json
```

Once successful, you can create a new deployment with a unique `DEPLOYMENT_NAME`. To do this, run the following command:

```sh
slot deployments create DEPLOYMENT_NAME katana
```

After that, you should receive the RPC endpoint for the katana slot. Now, you can use that and update your `Scarb.toml` file with the new RPC endpoint as follows:

```toml
[tool.dojo.env]
rpc_url = "YOUR_NEW_RPC_URL"
```

Now, you can stream katana in a new terminal. Open a new terminal and run the following command:

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

Once finished with the new configurations, we are ready to build and migrate the project. To build the project, run the following command:

```sh
sozo build
```

Now, let's migrate the project to our new katana slot:

```sh
sozo migrate --name YOUR_PROJECT_NAME
```

If the migrations have been successful, you will receive the `WORLD_ADDRESS`, which then you can use to interact with your world.

```sh
🎉 Successfully migrated World at address WORLD_ADDRESS

✨ Updating manifest.json...

✨ Done.

```

Congratulations! You have successfully deployed your project with a Katana slot.

## Torii

To initiate a Torri indexer slot, execute the following command:

```sh
slot deployments create DEPLOYMENT_NAME torii --world YOUR_WORLD_ADDRESS --rpc YOUR_NEW_RPC_URL --start-block 1
```

Once deployment is successful, you should receive the endpoints for GraphQL and gRPC.

If you wish to stream the logs, you can run the following command in a new terminal:

```sh
slot deployments logs DEPLOYMENT_NAME torii -f
```
