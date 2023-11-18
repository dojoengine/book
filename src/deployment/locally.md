## Deploying Locally

Dojo is engineered for rapid development, boasting a lightning-fast local development environment named [Katana](../toolchain/katana/overview.md). Katana serves as an on-device Starknet blockchain, allowing you to rigorously test your smart contracts before transitioning them to the remote testnet.

### Katana Deployments

Deploying to Katana could not be easier.

> This assumes you have followed the [Quick Start](../getting-started/quick-start.md) guide and have a project initialized.

From your project directory, run:

```bash
katana --disable-fee
```

This has started a local Katana which you can now deploy on!

### Deploying to Katana

To deploy your project to Katana, run:

```bash
sozo migrate --name test
```

Note - this will only work if you have compiled your contracts. If you have not, run:

```bash
sozo build
```
