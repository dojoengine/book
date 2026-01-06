---
name: dojo-config
description: Configure Scarb.toml, dojo profiles, world settings, and dependencies. Use when setting up project configuration, managing dependencies, or configuring deployment environments.
allowed-tools: Read, Write, Edit, Glob
---

# Dojo Configuration Management

Manage Dojo project configuration including Scarb.toml, deployment profiles, and world settings.

## When to Use This Skill

- "Configure Dojo for my project"
- "Update Scarb.toml dependencies"
- "Set up deployment profiles"
- "Configure world settings"

## What This Skill Does

Manages configuration files:
- `Scarb.toml` - Package and dependencies
- `dojo_dev.toml` - Local development profile
- `dojo_release.toml` - Production deployment profile
- World configuration and namespaces

## Quick Start

**Interactive mode:**
```
"Update my Dojo configuration"
```

I'll ask about:
- What to configure (dependencies, profiles, world)
- Environment (dev, testnet, mainnet)
- Specific settings

**Direct mode:**
```
"Add the Origami library to my dependencies"
"Configure production deployment for Sepolia"
```

## Configuration Files

### Scarb.toml

Package manager configuration:

```toml
[package]
name = "my_game"
version = "0.1.0"
edition = "2024_07"

[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.0.0" }

[[target.dojo]]

[tool.dojo]
initializer_class_hash = "0x..."

[tool.dojo.env]
rpc_url = "http://localhost:5050/"
account_address = "0x..."
private_key = "0x..."
world_address = "0x..."
```

**Key sections:**
- `[package]` - Project metadata
- `[dependencies]` - Dojo and library versions
- `[[target.dojo]]` - Build target
- `[tool.dojo]` - Dojo-specific settings
- `[tool.dojo.env]` - Environment variables

### dojo_dev.toml

Local development configuration:

```toml
[env]
rpc_url = "http://localhost:5050/"
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
world_address = ""

[world]
name = "my_game"
seed = "my_game"
```

### dojo_release.toml

Production deployment configuration:

```toml
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/sepolia"
account_address = "YOUR_ACCOUNT_ADDRESS"
private_key = "YOUR_PRIVATE_KEY"
world_address = "DEPLOYED_WORLD_ADDRESS"

[world]
name = "my_game_production"
seed = "my_game_prod"
```

## Common Configuration Tasks

### Add Dependencies

**Origami library:**
```toml
[dependencies]
origami_token = { git = "https://github.com/dojoengine/origami", tag = "v1.0.0" }
```

**Alexandria library:**
```toml
[dependencies]
alexandria_math = { git = "https://github.com/keep-starknet-strange/alexandria" }
```

### Configure Profiles

**Development (Katana):**
```toml
[env]
rpc_url = "http://localhost:5050/"
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
```

**Testnet (Sepolia):**
```toml
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/sepolia"
account_address = "YOUR_ACCOUNT"
```

**Mainnet:**
```toml
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/mainnet"
account_address = "YOUR_ACCOUNT"
```

### World Configuration

**Namespace setup:**
```toml
[world]
name = "my_game"
namespace = "my_game"
seed = "my_game_v1"
```

**Description and metadata:**
```toml
[world]
name = "my_game"
description = "A provable on-chain game"
icon_uri = "https://example.com/icon.png"
cover_uri = "https://example.com/cover.png"
```

## Configuration Patterns

### Multi-Environment Setup

Create separate profile files:
- `dojo_dev.toml` - Local Katana
- `dojo_sepolia.toml` - Sepolia testnet
- `dojo_mainnet.toml` - Mainnet

Deploy with:
```bash
sozo migrate --profile dev
sozo migrate --profile sepolia
sozo migrate --profile mainnet
```

### Version Management

Pin Dojo version:
```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.0.0" }
```

Use latest:
```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo" }
```

### Account Configuration

**Development (Katana default):**
```toml
account_address = "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
private_key = "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"
```

**Production (Argent/Braavos):**
```toml
account_address = "YOUR_WALLET_ADDRESS"
private_key = "YOUR_PRIVATE_KEY"  # Store securely!
```

## Best Practices

- **Never commit private keys** - Use `.gitignore` for `dojo_release.toml`
- **Pin versions** - Use specific tags for production
- **Separate profiles** - Different configs for dev/test/prod
- **Document settings** - Add comments explaining non-obvious config
- **Test configurations** - Verify RPC connectivity before deploying

## Security

### Protecting Secrets

**Option 1: Environment variables**
```toml
[env]
private_key = "${DOJO_PRIVATE_KEY}"
```

**Option 2: Separate secrets file**
```toml
# dojo_release.toml (committed)
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/mainnet"

# dojo_secrets.toml (gitignored)
[env]
account_address = "..."
private_key = "..."
```

### .gitignore
```
# Ignore sensitive configs
dojo_release.toml
dojo_secrets.toml
dojo_*.toml

# Keep development config
!dojo_dev.toml
```

## Troubleshooting

**"World not found":**
- Check `world_address` is set after migration
- Verify RPC URL is correct

**"Account not found":**
- Ensure account is deployed on target network
- Check account_address format

**"Invalid private key":**
- Verify private key starts with "0x"
- Ensure no extra whitespace

## Next Steps

After configuration:
1. Use `dojo-deploy` skill to deploy with your config
2. Use `dojo-migrate` skill when updating deployments
3. Use `dojo-init` skill to regenerate configs if needed

## Related Skills

- **dojo-init**: Initialize configuration
- **dojo-deploy**: Deploy using configuration
- **dojo-migrate**: Update deployed worlds
- **dojo-world**: Manage world permissions
