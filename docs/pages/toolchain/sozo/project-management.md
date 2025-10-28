---
title: "Project Management"
description: "Manage your Dojo project from initial setup to production deployment."
---

# Project Management

Sozo provides a complete development lifecycle for Dojo projects, from initial scaffolding to production deployment.
This page covers the essential workflows and commands that take you from idea to deployed world.

:::tip
For detailed command options, use the built-in `sozo --help` and `sozo <command> --help`
:::

## Development Workflow

Building a Dojo project follows a predictable cycle that Sozo streamlines with intelligent automation:

1. **Project Setup**: Initialize structure and configure accounts
2. **Development Cycle**: Write, build, and test your contracts iteratively
3. **Deployment**: Deploy to local/remote networks with automatic state management
4. **Updates**: Iterate with automatic diff detection and minimal migrations

#### From Zero to Deployed

```bash
# 1. Create and set up new project
sozo init my-game
cd my-game

# 2. Set up development account (using starkli or other account tool)
# Note: Account management is handled separately from Sozo

# 3. Development cycle
sozo build                    # Compile contracts
sozo test                     # Run tests
sozo clean                    # Clean artifacts if needed

# 4. Deploy to local Katana
katana --dev --dev.no-fee &   # Start local sequencer
sozo migrate                  # Deploy world and all resources

# 5. Make changes and update
# Edit your contracts...
sozo build && sozo test       # Rebuild and test
sozo migrate                  # Automatic diff and deploy only changes

# 6. Deploy to other environments
sozo migrate --profile staging    # Deploy to testnet
sozo migrate --profile prod       # Deploy to mainnet
```

#### Key Concepts

**Automatic State Management**: Sozo tracks your world's state across deployments, automatically detecting changes and generating minimal migration transactions.

**Profile-Based Configuration**: Manage multiple environments (dev, staging, prod) with separate configuration files, allowing seamless deployment across networks.

**Incremental Development**: The build-test-migrate cycle is optimized for rapid iteration, with Sozo handling the complexity of blockchain state management.

## Project Setup

### `sozo init`

Create a new Dojo project with the standard structure and example code:

```bash
sozo init my-game                # Create project
sozo init my-game --git          # Create project + initialize git repo

# Use a custom template
sozo init my-game --template https://github.com/myorg/custom-dojo-template
sozo init my-game --template myorg/custom-dojo-template  # Short form
```

:::note
By default, this clones the [dojo-starter](https://github.com/dojoengine/dojo-starter) template, giving you a working foundation with:

- Example models (Position, Moves) and systems (Actions)
- Pre-configured Scarb.toml with Dojo dependencies
- Basic tests and deployment configuration
  :::

**Account Management**: Sozo uses accounts defined in your `dojo_<profile>.toml` files.
See the [configuration guide](/framework/configuration/index.md) for more information.

:::tip
Use a tool like [starkli](https://book.starkli.rs/accounts) to create and manage accounts and keystores.
:::

## Development Cycle

The core development loop involves building, testing, and iterating on your contracts:

### `sozo build`

Compile your Cairo contracts and generate deployment artifacts:

```bash
sozo build                    # Compile all contracts
sozo build --unity            # Compile + generate Unity bindings
sozo build --typescript       # Compile + generate TypeScript bindings
```

**What it does:**

- Compiles Cairo contracts using Scarb
- Validates contract syntax and imports
- Generates Dojo manifests for deployment
- (Optional) Creates language bindings for client integration

### `sozo test`

Run your Cairo tests to verify contract behavior:

```bash
sozo test                     # Run all tests
```

Tests are Cairo functions marked with `#[test]`.
Sozo runs them using the Cairo test runner, giving you confidence in your logic before deployment.
See the [testing guide](/framework/testing/index.md) for more information about testing your Dojo contracts.

### `sozo clean`

Remove stale build files when needed:

```bash
sozo clean                    # Clean current profile manifest files
sozo clean --all-profiles     # Clean all profile manifest files
```

**When to clean:**

- After major contract restructuring
- When build artifacts seem corrupted
- Before important deployments to ensure fresh state

**What gets cleaned:**

- Manifest files for the current profile (or all profiles with `--all-profiles`)
- Generated metadata and artifacts
- Does NOT clean Scarb's `target/` directory (use `scarb clean` for that)

### `sozo bindgen`

Create client bindings for various platforms after building:

```bash
sozo bindgen                  # Generate all configured bindings
sozo bindgen --typescript     # Generate TypeScript bindings only
sozo bindgen --unity          # Generate Unity bindings only
```

Bindgen reads from your build artifacts to create platform-specific client code for interacting with your world.

### `sozo dev`

Automatically rebuild and migrate your world when files change during development:

```bash
sozo dev                             # Watch files and auto-rebuild
sozo dev --unity                     # Watch + generate Unity bindings
sozo dev --typescript                # Watch + generate TypeScript bindings

# With contract verification
sozo dev --verify voyager            # Auto-verify on Voyager after each rebuild
```

This starts a file watcher that automatically runs `sozo build` and `sozo migrate` whenever you modify Cairo contracts.
Perfect for rapid development iteration without manual rebuilds.

**Key Features:**

- **File watching**: Monitors Cairo source files for changes
- **Automatic rebuild**: Runs build + migrate when files change
- **Binding generation**: Can generate client bindings on each rebuild
- **Hot reload**: Instant feedback loop for development

**Common Use Cases:**

- Development with live-reloading game clients
- Rapid contract iteration and testing
- Continuous integration during development
- Client binding updates alongside contract changes

## Deployment and Updates

Sozo's migration system is the heart of Dojo deployment, automatically handling the complex process of deploying and updating worlds.

![Dojo Sozo Workflow](/toolchain/dojo-sozo-workflow.jpg)

### `sozo migrate`

Deploy your world for the first time or update existing deployments:

```bash
# First deployment to local Katana
katana --dev --dev.no-fee &   # Start local sequencer
sozo migrate                  # Deploy world and all resources

# Deploy to testnet (requires profile configuration)
sozo migrate --profile staging

# Deploy to mainnet
sozo migrate --profile prod

# If you need more information about the migration, you have 3 levels of verbosity:
# Verbose mode, with additional info.
sozo migrate -v
# Debug mode, with even more info.
sozo migrate -vv
# Trace mode, with the most info + technical details.
sozo migrate -vvv
```

:::tip
You can use `-P` instead of `--profile` for simplicity.
:::

:::info
Since the 0.14 network upgrade, the PRE-CONFIRMED state may be lagging on nodes
with load-balanced infrastructure.

By default, Sozo is now using `ACCEPTED_ON_L2` as the default transaction finality status.
You may want to speed up the migration process by using `PRE_CONFIRMED` instead,
but this may come to the of the migration failing and having to be restarted.
:::

#### How Migration Works

**Automatic Diff Analysis**: Sozo compares your local world state against the deployed state, identifying exactly what has changed:

- New or modified models, systems, events, libraries
- Updated class hashes and resource registrations
- Permission changes (writers and owners)

**Intelligent Updates**: Instead of redeploying everything, Sozo generates minimal migration transactions:

- Declares only new or changed classes
- Updates only modified resources
- Applies permission changes incrementally
- Initializes new contracts as needed

**Multi-Environment Management**: Each profile tracks its own deployment state:

```bash
sozo migrate                    # Uses 'dev' profile (local Katana)
sozo migrate --profile staging  # Uses 'staging' profile (testnet)
sozo migrate --profile prod     # Uses 'prod' profile (mainnet)
```

For subsequent deployments, record the world address in your profile:

```toml
[env]
world_address = "0x06171ed98331e849d6084bf2b3e3186a7ddf35574dd68cab4691053ee8ab69d7"
rpc_url = "https://starknet-sepolia.public.blastapi.io/rpc/v0_7"
account_address = "0x..."
private_key = "0x..."
```

This tells Sozo to update the existing world rather than deploy a new one.

:::tip
Make sure to set the `world_address` value after your initial deployment.
This will ensure that future migrations are made to your existing world.
:::

#### Local Development

```bash
# Standard local development flow
katana --dev --dev.no-fee &      # Start local sequencer
sozo build && sozo test          # Build and test
sozo migrate                     # Deploy to local Katana

# Test your world...
# Update your contracts...

sozo migrate                     # Deploy any changes (automatic diff)
```

#### Remote Deployment

```bash
# Final validation before production
sozo build && sozo test
sozo clean && sozo build         # Clean build for production

# Deploy to mainnet
sozo migrate --profile prod
```

## Development Utilities

### `sozo hash`

Debug and verify resource deployments:

```bash
# Compute hash for a resource
sozo hash compute Position         # Get hash for Position model
sozo hash compute Actions          # Get hash for Actions system

# Find resource by hash
sozo hash find 0x1234... --namespaces ns --resources Position,Actions
```

### `sozo walnut`

Verify your contracts on Walnut for debugging:

```bash
sozo walnut verify                # Verify all contracts on Walnut
```

This uploads your contract source and ABIs to [Walnut](https://walnut.dev) for debugging and inspection.
For more details, refer to [Walnut documentation](https://docs.walnut.dev/overview/debug-dojo-with-walnut).

:::note
The `walnut` command requires Sozo to be built with the feature enabled.
If you see "unrecognized subcommand," rebuild from source using `cargo build --features walnut`.
:::

## Project Structure

Scarb, which is used to build and test your project under the hood, supports [workspaces](https://docs.swmansion.com/scarb/docs/reference/workspaces.html#workspaces).
Sozo also supports workspaces.

However, Sozo requires two additional things:

1. A main package from which Sozo will extract the package's name (for binding generation and migration)
2. [Dojo configuration files](/framework/configuration/#configuration-files) to inject deployment settings during migration

From here, you have several options for laying out your project:

### Single package

The simplest way to lay out your project is to have a single package where all the contracts and libraries are placed.

```
├── my-project/
│   ├── dojo_dev.toml
│   ├── dojo_sepolia.toml
│   ├── Scarb.toml
│   └── src
│       ├── lib.cairo
│       ├── models.cairo
│       ├── systems.cairo
```

With this setup, running `sozo build`, `sozo test`, and `sozo migrate` will work as expected at the root of the project.

:::note
If in your project you have other folders (not related to cairo), opening the project at the root is currently not supported by the cairo language server.
You must have a root `Scarb.toml` file.

This issue is being worked on by the Scarb team. In the meantime, you can open the project in your contracts directory, or you can add a virtual workspace to your project as shown in the next section.
:::

### Multi-package

If you want to split your project into multiple packages, you can do so by creating a `packages` directory and placing your packages inside it.
In the example below, only the `my-world` package is deployed on-chain with a Dojo world. The configuration files are placed inside the `my-world` package.

```
├── my-project/
│   ├── Scarb.toml
│   └── packages
│       ├── my-world/
│       │   ├── dojo_dev.toml
│       │   ├── dojo_sepolia.toml
│       │   ├── Scarb.toml
│       │   ├── src
│       │   │   ├── lib.cairo
│       │   │   ├── models.cairo
│       │   │   ├── systems.cairo
│       │   │   └── tests.cairo
│       ├── package2/
│       │   ├── Scarb.toml
│       │   ├── lib.cairo
│       └── package3/
│           ├── Scarb.toml
│           ├── lib.cairo
```

To make this layout work, you will need the root `Scarb.toml` to be a [virtual workspace](https://docs.swmansion.com/scarb/docs/reference/workspaces.html#virtual-workspace) to ease dependency management.

You will be able to run `sozo test` at the workspace level. However, since the Dojo configuration files are placed inside the `my-world` package, you will need to run `sozo build` and `sozo migrate` at the package level.
This will generate the `target` directory and the `manifest_<profile>.json` file **at the package level**.

If you prefer managing everything from the workspace level, you can simply move the Dojo configuration files to the workspace level.

```
├── my-project/
│   ├── dojo_dev.toml
│   ├── dojo_sepolia.toml
│   ├── Scarb.toml
│   └── packages
│       ├── my-world/
│       │   ├── Scarb.toml
│       │   ├── src
│       │   │   ├── lib.cairo
│       │   │   ├── models.cairo
│       │   │   ├── systems.cairo
│       │   │   └── tests.cairo
│       ├── package2/
│       │   ├── Scarb.toml
│       │   ├── lib.cairo
│       └── package3/
│           ├── Scarb.toml
│           ├── lib.cairo
```

With this setup, the `target` directory and the `manifest_<profile>.json` file will be generated at the workspace level.
Therefore, you will need to run `sozo build`, `sozo test`, and `sozo migrate` at the workspace level.

#### Example layout

When you want to ship both Cairo libraries and a Dojo world to be deployed on-chain, one way to lay out the project is by creating a `contracts` or `world` package with the name of your project as the package name in its `Scarb.toml` and library packages.

:::note
This layout is not mandatory—it is an example of how to lay out your project.
Using a virtual workspace helps manage dependencies between packages.
:::

```
├── my-project/
│   ├── dojo_dev.toml
│   ├── dojo_sepolia.toml
│   ├── Scarb.toml
│   ├── contracts
│   │   ├── Scarb.toml
│   │   ├── src
│   │   │   ├── lib.cairo
│   │   │   ├── models.cairo
│   │   │   ├── systems.cairo
│   │   │   └── tests.cairo
│   └── packages
│       ├── package1/
│       │   ├── Scarb.toml
│       │   ├── src
│       │   │   ├── lib.cairo
│       └── package2/
│           ├── Scarb.toml
│           ├── src
│           │   ├── lib.cairo
│           │   ├── models.cairo
```

:::warning
If you want to manage a single repository with multiple worlds to be deployed, you will not be able to have all of them in the same workspace.

For such a setup, it is recommended to keep them as independent directories and manage them as separate packages by running `sozo build` and `sozo migrate` at the package level.

```
├── my-project/
│   ├── world1/
│   │   ├── Scarb.toml
│   │   ├── dojo_dev.toml
│   │   ├── dojo_sepolia.toml
│   │   ├── src
│   │   │   ├── lib.cairo
│   │   │   ├── models.cairo
│   │   │   ├── systems.cairo
│   │   │   └── tests.cairo
│   └── world2/
│       ├── Scarb.toml
│       ├── dojo_dev.toml
│       ├── dojo_sepolia.toml
│       ├── src
│       │   ├── lib.cairo
│       │   ├── models.cairo
│       │   ├── systems.cairo
│       │   └── tests.cairo
```

Sozo will output an error if you have multiple worlds in the same workspace.
:::
