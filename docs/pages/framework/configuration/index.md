---
title: Dojo Configuration
description: Configure your Dojo project using profiles, Scarb.toml manifest, and environment-specific settings for development, testing, and production deployments.
---

# Configuration

Dojo uses a **profile-based configuration system** that allows you to manage different settings for development, testing, and production environments.
Every Dojo command operates within a specific profile context, giving you fine-grained control over how your project builds, deploys, and runs.

## Understanding Profiles

Profiles separate your project configuration into distinct environments.
This allows you to use different settings for local development versus production deployment without manually changing configuration files.

```bash
# Use the default 'dev' profile
sozo build

# Use a specific profile
sozo build --profile mainnet
sozo migrate --profile staging
```

**Profile Resolution:**
1. **Specified profile**: If you provide `--profile <name>`, Dojo looks for `dojo_<name>.toml`
2. **Default fallback**: If no profile is specified, Dojo uses the `dev` profile (`dojo_dev.toml`)
3. **Configuration loading**: Each profile file contains deployment and environment settings for that specific context

:::warning
If a `dojo_dev.toml` does not exist in the contract directory, Dojo will return an error.
:::

## Configuration Files

Dojo projects use two main configuration files:

### `Scarb.toml` - Cairo Project Manifest
The Scarb manifest defines your project's dependencies, build settings, and Cairo compilation options.
This file is required for all Cairo projects and controls how your code compiles.

### `dojo_<profile>.toml` - Dojo Profile Configuration
Profile-specific files contain deployment settings, world metadata, and environment variables.
These files control how your world deploys and behaves in different environments.

```text
my-dojo-project/
├── Scarb.toml                 # Project manifest & dependencies
├── dojo_dev.toml              # Development profile
├── dojo_staging.toml          # Staging profile
└── dojo_mainnet.toml          # Production profile
```

## Project Manifest (`Scarb.toml`)

Your `Scarb.toml` file defines the core project structure and dependencies.
Here's the minimum configuration needed for a Dojo project:

```toml
[package]
cairo-version = "=2.10.1"
name = "my-dojo-game"
version = "1.5.0"
edition = "2024_07"

[[target.starknet-contract]]
sierra = true
build-external-contracts = ["dojo::world::world_contract::world"]

[dependencies]
starknet = "2.8.4"
dojo = { git = "https://github.com/dojoengine/dojo.git", tag = "v1.5.0" }

[dev-dependencies]
cairo_test = "=2.10.1"
dojo_cairo_test = { git = "https://github.com/dojoengine/dojo.git", tag = "v1.5.0" }

[features]
default = []
```

You can refer to the [Scarb documentation](https://docs.swmansion.com/scarb/docs/guides/defining-custom-profiles.html) for more information.

### Custom Profiles in Scarb

Add custom profiles to control build settings for different environments:

```toml
# Development profile (default)
[profile.dev]
# Fast builds, debug symbols enabled

[profile.staging]
# Settings specific to staging

[profile.mainnet]
# Optimized builds for production
```

:::note
Every `dojo_<profile>.toml` must have a matching section header in `Scarb.toml`.
:::

### External Contract Dependencies

When using external libraries with models, you must explicitly build their contracts:

```toml
[[target.starknet-contract]]
build-external-contracts = [
    "dojo::world::world_contract::world", # Used by Sozo to check the world version
    "armory::models::m_Flatbow",       # External model contract
    "tokens::models::m_ERC20Token"     # Another external model
]
```

**Pattern for External Models:**
- Format: `<crate>::<path>::m_<ModelName>`
- Example: If `armory` crate has `models::Flatbow` model, include `"armory::models::m_Flatbow"`

:::warning
Missing external contracts won't cause compilation errors but will cause runtime failures when the World tries to interact with missing model contracts, or when Torii cannot find model definitions to match blockchain event data.
:::

## Profile Configuration (`dojo_<profile>.toml`)

Profile configuration files contain all deployment and runtime settings for specific environments.
Each section controls a different aspect of your Dojo world.

### Basic World Configuration

```toml
[world]
name = "My Dojo Game"
description = "An awesome on-chain game built with Dojo"
seed = "my-unique-seed"
cover_uri = "file://assets/cover.png"
icon_uri = "file://assets/icon.png"
website = "https://mydojogame.com"

[world.socials]
x = "https://x.com/mydojogame"
discord = "https://discord.gg/mydojogame"
github = "https://github.com/mydojogame/contracts"
```

**Required Fields:**
- `name` - Human-readable world name
- `seed` - Unique identifier for deterministic world address generation

**Optional Fields:**
- `description` - World description for metadata
- `cover_uri` / `icon_uri` - Visual assets (supports `file://` and `ipfs://`)
- `website` - Project website URL
- `socials` - Social media links

See more information about world metadata [here](/framework/world/metadata).

### Environment Settings

```toml
[env]
rpc_url = "http://localhost:5050/"
account_address = "0x127fd..."
private_key = "0xc5b2f..."
keystore_path = "/path/to/keystore"
world_address = "0x077c0..."
```

**Environment Variables:**
- `rpc_url` - Starknet RPC endpoint
- `account_address` - Deployer account address
- `private_key` - Deployer private key (use `keystore_path` in production)
- `keystore_path` - The path to the file containing the deployer's private key.
- `world_address` - Deployed world address (set after first deployment)

### Namespace Management

```toml
[namespace]
default = "game"
mappings = {
    "weapons" = ["Sword", "Bow", "Shield"],
    "characters" = ["Player", "Enemy", "NPC"]
}
```

**How Namespace Mapping Works:**
1. **Default namespace**: All resources not explicitly mapped use this namespace
2. **Explicit mappings**: Map specific models/contracts to custom namespaces
3. **Resource tags**: Final resource tags become `<namespace>-<resource_name>`

**Example:**
- `Player` model → `characters-Player` tag
- `GameState` model → `game-GameState` tag (uses default namespace)

### Permission Configuration

```toml
# Format: "<TARGET_TAG>" = ["<GRANTEE_TAG>"]

[writers]
# Namespace-level permissions
"game" = ["game-actions", "game-admin"]
# Resource-specific permissions
"game-Position" = ["game-movement"]
"weapons-Sword" = ["weapons-combat", "game-actions"]

[owners]
# Namespace ownership
"game" = ["game-admin"]
# Resource ownership
"weapons" = ["weapons-manager"]
```

**Permission Hierarchy:**
- **Namespace permissions** - Control access to all resources in a namespace
- **Resource permissions** - Control access to specific models/contracts
- **Writers** - Can modify data in models
- **Owners** - Can modify data AND manage permissions

### Contract Initialization

By default, Dojo contracts don't have initialization arguments.
However, you can pass init arguments to Dojo contracts using a `dojo_init` function:

```cairo
#[dojo::contract]
mod my_system {
    fn dojo_init(ref self: ContractState, arg1: felt252, arg2: u256) {
        // ...
    }
}
```

```toml
[init_call_args]
"game-my_system" = ["0x123", "u256:0x456"]
```

:::tip
See the [Sozo calldata format](/toolchain/sozo/calldata_format) for initialization argument formatting.
:::

### External Contract Deployment

Deploy and manage external (non-Dojo) contracts alongside your world:

```toml
[[external_contracts]]
contract_name = "ERC20Token"
instance_name = "GoldToken" # If deploying multiple instances
salt = "1" # Hashed with contract_name/instance_name to generate contract address
constructor_data = [
    "str:Gold Coin",            # Token name
    "sstr:GOLD",                # Symbol
    "u256:1000000000000000000", # Total supply
    "0x1234567890abcdef..."     # Owner address
]
```

**External Contract Fields:**
- `contract_name` - Cairo contract name to deploy
- `instance_name` - Unique instance identifier (for multiple deployments)
- `salt` - Deterministic address generation salt
- `constructor_data` - Arguments for contract constructor

:::tip
See the [Sozo calldata format](/toolchain/sozo/calldata_format) for initialization argument formatting.
:::

### Migration Control

```toml
[migration]
order_inits = ["game-registry", "game-actions", "token-manager"]
skip_contracts = ["game-debug_tools", "test-helpers"]
disable_multicall = false
```

**Migration Options:**
- `order_inits` - Specific order for contract initialization calls
- `skip_contracts` - Don't deploy these contracts (but still build them)
- `disable_multicall` - Force individual transactions instead of batching

### Resource Metadata

Add descriptive metadata for your models, contracts, and events:

```toml
[[models]]
tag = "game-Position"
description = "Player position in the game world"
icon_uri = "file://icons/position.png"

[[contracts]]
tag = "game-actions"
description = "Core gameplay actions and mechanics"
icon_uri = "file://icons/actions.png"

[[events]]
tag = "game-PlayerMoved"
description = "Emitted when a player changes position"
```

See more information about resource metadata [here](/framework/world/metadata).

## Configuration Examples

### Development Profile (`dojo_dev.toml`)

```toml
[world]
name = "My Game (Development)"
seed = "dev-my-game"

[env]
rpc_url = "http://localhost:5050/"
account_address = "0x127fd..."
private_key = "0xc5b2f..."

[namespace]
default = "dev"

[writers]
"dev" = ["dev-actions"]

[migration]
disable_multicall = true  # Easier debugging
```

### Production Profile (`dojo_mainnet.toml`)

```toml
[world]
name = "My Game"
seed = "prod-my-game"
description = "Production deployment of My Game"
cover_uri = "ipfs://YourCoverHash"
icon_uri = "ipfs://YourIconHash"
website = "https://mygame.com"

[env]
rpc_url = "https://api.cartridge.gg/x/prod-my-game/katana"
account_address = "0x127fd..."
keystore_path = "~/.starknet_accounts/mainnet.json"

[env.ipfs_config]
url = "https://ipfs.infura.io:5001"
username = "prod_username"
password = "prod_password"

[namespace]
default = "game"
mappings = { "items" = ["Sword", "Shield", "Potion"] }

[writers]
"game" = ["game-actions"]
"items" = ["game-actions", "item-manager"]

[owners]
"game" = ["game-admin"]
```

## See Also

- **[World Permissions](/framework/world/permissions)** - Runtime permission management
- **[Sozo Reference](/toolchain/sozo)** - Command-line tool documentation
- **[Calldata Format](/toolchain/sozo/calldata_format)** - Constructor argument formatting
- **[World Metadata](/framework/world/metadata)** - World and resource metadata
