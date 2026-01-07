---
name: dojo-deploy
description: Deploy Dojo worlds to local Katana, testnet, or mainnet. Configure Katana sequencer and manage deployments with sozo. Use when deploying your game or starting local development environment.
allowed-tools: Read, Bash, Grep
---

# Dojo Deployment

Deploy your Dojo world to local Katana sequencer, Sepolia testnet, or Starknet mainnet.

## When to Use This Skill

- "Deploy my world to Katana"
- "Start Katana sequencer"
- "Deploy to Sepolia testnet"
- "Deploy to mainnet"

## What This Skill Does

Handles deployment workflows:
- Start and configure Katana sequencer
- Deploy worlds with `sozo migrate`
- Verify deployments
- Manage world addresses
- Configure network settings

## Quick Start

**Local development:**
```
"Start Katana and deploy my world"
```

**Testnet deployment:**
```
"Deploy my world to Sepolia"
```

**Mainnet deployment:**
```
"Deploy to Starknet mainnet"
```

## Deployment Workflow

### 1. Local Development (Katana)

**Start Katana:**
```bash
katana --dev --dev.accounts 10
```

**Deploy world:**
```bash
sozo migrate --name my_game
```

**Verify:**
```bash
# Check manifest for addresses
cat target/dev/manifest.json
```

### 2. Testnet Deployment (Sepolia)

**Configure profile:**
```toml
# dojo_sepolia.toml
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/sepolia"
account_address = "YOUR_ACCOUNT"
private_key = "YOUR_KEY"
```

**Deploy:**
```bash
sozo migrate --profile sepolia
```

### 3. Mainnet Deployment

**Configure profile:**
```toml
# dojo_mainnet.toml
[env]
rpc_url = "https://api.cartridge.gg/x/starknet/mainnet"
account_address = "YOUR_ACCOUNT"
private_key = "YOUR_KEY"
```

**Deploy:**
```bash
sozo migrate --profile mainnet
```

## Katana Configuration

### Mining Modes

**Instant (default):**
```bash
katana --dev
```
Mines block immediately on transaction.

**Interval:**
```bash
katana --dev --block-time 6000
```
Mines block every 6 seconds.

**On-demand:**
```bash
katana --dev --no-mining
```
Manual block production.

### Account Configuration

**Default accounts:**
```bash
katana --dev --dev.accounts 10
```
Generates 10 pre-funded accounts.

**Custom seed:**
```bash
katana --dev --seed 0x123
```
Deterministic account generation.

### Network Forking

**Fork Sepolia:**
```bash
katana --dev --fork https://api.cartridge.gg/x/starknet/sepolia
```

**Fork at block:**
```bash
katana --dev --fork https://... --fork-block-number 100000
```

## Sozo Commands

### Build
```bash
# Build project
sozo build

# Build and verify
sozo build --check
```

### Migrate (Deploy)
```bash
# Deploy to default (Katana)
sozo migrate

# Deploy with profile
sozo migrate --profile sepolia

# Deploy with name
sozo migrate --name my_game_v2
```

### Execute
```bash
# Call a system
sozo execute SYSTEM_CONTRACT FUNCTION_NAME --calldata ARG1,ARG2

# Example: spawn
sozo execute actions spawn
```

### Model Management
```bash
# Read a model
sozo model get Position 0x123

# Read with composite key
sozo model get Tile 10,20
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (`sozo test`)
- [ ] Code reviewed (`dojo-review` skill)
- [ ] Configuration set (`dojo-config` skill)
- [ ] Target network funded (for gas)
- [ ] Private key secured (not committed)

### Deployment
- [ ] Build succeeds (`sozo build`)
- [ ] Migration succeeds (`sozo migrate`)
- [ ] Manifest generated (check `target/*/manifest.json`)
- [ ] World address recorded
- [ ] Models registered (check manifest)
- [ ] Systems deployed (check manifest)

### Post-Deployment
- [ ] Deployment verified (read models, call systems)
- [ ] Torii indexer configured (`dojo-indexer` skill)
- [ ] Client connected (`dojo-client` skill)
- [ ] World permissions set (`dojo-world` skill)

## Common Deployment Patterns

### Development Workflow
```bash
# Terminal 1: Start Katana
katana --dev --dev.accounts 10

# Terminal 2: Build and deploy
sozo build
sozo migrate

# Terminal 3: Start Torii
torii --world WORLD_ADDRESS --rpc http://localhost:5050
```

### Testnet Workflow
```bash
# Build
sozo build

# Deploy to Sepolia
sozo migrate --profile sepolia

# Verify
sozo model get Position PLAYER_ADDRESS --profile sepolia
```

### Mainnet Workflow
```bash
# Final checks
sozo test
sozo build --check

# Deploy to mainnet
sozo migrate --profile mainnet

# Verify deployment
sozo model get Config CONFIG_ID --profile mainnet
```

## Manifest File

After deployment, `target/*/manifest.json` contains:
- World address
- Model class hashes
- System class hashes
- ABI information

**Example:**
```json
{
  "world": {
    "address": "0x...",
    "class_hash": "0x..."
  },
  "models": [
    {
      "name": "Position",
      "class_hash": "0x..."
    }
  ],
  "contracts": [
    {
      "name": "actions",
      "address": "0x..."
    }
  ]
}
```

## Troubleshooting

### "Account not found"
- Ensure account is deployed on target network
- Check account address in profile config
- Verify account has funds for gas

### "Class hash mismatch"
- Run `sozo build` before migrating
- Check Scarb.toml for correct Dojo version
- Clear `target/` and rebuild

### "Insufficient funds"
- Fund account with ETH/STRK for gas
- Check gas settings in profile
- Use `--max-fee` flag if needed

### "World already exists"
- Use different world name/seed
- Or plan migration to existing world

## Network Information

### Katana (Local)
- RPC: `http://localhost:5050`
- Default account: `0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca`
- Default key: `0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a`

### Sepolia (Testnet)
- RPC: `https://api.cartridge.gg/x/starknet/sepolia`
- Faucet: https://faucet.starknet.io
- Explorer: https://sepolia.voyager.online

### Mainnet
- RPC: `https://api.cartridge.gg/x/starknet/mainnet`
- Explorer: https://voyager.online

## Best Practices

- Test on Katana first, then Sepolia, then mainnet
- Use different world names/seeds per environment
- Keep manifest files for reference
- Record world addresses securely
- Verify deployments before client integration
- Set up Torii indexer after deployment

## Next Steps

After deployment:
1. Use `dojo-indexer` skill to set up Torii
2. Use `dojo-client` skill to connect frontend
3. Use `dojo-world` skill to configure permissions
4. Use `dojo-migrate` skill for updates

## Related Skills

- **dojo-config**: Configure deployment profiles
- **dojo-migrate**: Update deployments
- **dojo-indexer**: Index deployed world
- **dojo-client**: Connect clients to deployment
- **dojo-world**: Manage world permissions
