## Local Deployment with Katana

Experience the power of rapid development with Dojo, featuring the ultra-fast local development sequencer, [Katana](../toolchain/katana/overview.md). Katana acts as an on-device Starknet, enabling thorough testing of your dojo world in a controlled environment before migrating them to the remote testnet.

### Easy Katana Deployments

Deploying to Katana is straightforward and efficient.

> **Pre-requisite:** Ensure you've completed the [Quick Start](../getting-started/quick-start.md) guide and have your project set up.

To initiate Katana from your project directory, execute:

```bash
katana --disable-fee
```

This command launches a local instance of Katana, setting the stage for your deployment.

### Step-by-Step Guide to Deploy on Katana

Deploying your project to Katana involves a few simple steps.\

1. **Compile Your Contracts:**

   If you haven't compiled your contracts yet, run:

   ```bash
   sozo build
   ```

   Compiling ensures that your contracts are ready for deployment.

2. **Migrate your Project:**

   To migrate, run:

   ```bash
   sozo migrate
   ```

Success! You have now migrated your world. You will be able to interact with the world using [sozo](../toolchain/sozo/overview.md).
