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
katana --dev --dev.no-fee
```

This launches Katana with:
- RPC server at `http://localhost:5050`
- 10 pre-funded accounts
- Instant block mining
- Gas fees disabled

**Build and deploy:**
```bash
sozo build && sozo migrate
```

**Verify:**
```bash
# Preview deployment
sozo inspect

# Execute a system
sozo execute dojo_starter-actions spawn
```

### 2. Testnet Deployment (Sepolia)

**Configure profile:**
```toml
# dojo_sepolia.toml
[world]
name = "My Game"
seed = "my-game-sepolia"

[env]
rpc_url = "https://api.cartridge.gg/x/starknet/sepolia"
account_address = "YOUR_ACCOUNT"
private_key = "YOUR_KEY"

[namespace]
default = "my_game"

[writers]
"my_game" = ["my_game-actions"]
```

**Deploy:**
```bash
sozo build --profile sepolia
sozo migrate --profile sepolia
```

### 3. Mainnet Deployment

**Configure profile:**
```toml
# dojo_mainnet.toml
[world]
name = "My Game"
seed = "my-game-mainnet"

[env]
rpc_url = "https://api.cartridge.gg/x/starknet/mainnet"
account_address = "YOUR_ACCOUNT"
keystore_path = "~/.starknet_accounts/mainnet.json"

[namespace]
default = "my_game"

[writers]
"my_game" = ["my_game-actions"]
```

**Deploy:**
```bash
sozo build --profile mainnet
sozo migrate --profile mainnet
```

## Katana Configuration

### Quick Start (Development)

```bash
katana --dev --dev.no-fee
```

### Mining Modes

**Instant (default):**
```bash
katana --dev --dev.no-fee
```
Mines block immediately on transaction.

**Interval:**
```bash
katana --block-time 10000
```
Mines block every 10 seconds.

### Persistent Storage

```bash
katana --db-dir ./katana-db
```

### Network Forking

**Fork Starknet mainnet:**
```bash
katana --fork.provider https://api.cartridge.gg/x/starknet/mainnet
```

**Fork at specific block:**
```bash
katana --fork.provider https://api.cartridge.gg/x/starknet/mainnet --fork.block 1000000
```

## Sozo Commands

### Build
```bash
sozo build
```

### Inspect (Preview Deployment)
```bash
# See what will be deployed/changed
sozo inspect
```

### Migrate (Deploy)
```bash
# Deploy with default dev profile
sozo migrate

# Deploy with specific profile
sozo migrate --profile sepolia
```

### Execute System
```bash
# Call a system function
sozo execute <CONTRACT_TAG> <FUNCTION> [ARGS...]

# Example: spawn
sozo execute dojo_starter-actions spawn

# Example: move with argument
sozo execute dojo_starter-actions move 1
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
- [ ] Inspect looks correct (`sozo inspect`)
- [ ] Migration succeeds (`sozo migrate`)
- [ ] Manifest generated (check `manifest_<profile>.json`)
- [ ] World address recorded

### Post-Deployment
- [ ] Deployment verified (execute systems, query models)
- [ ] Torii indexer configured (`dojo-indexer` skill)
- [ ] Client connected (`dojo-client` skill)
- [ ] World permissions verified (`dojo-world` skill)

## Development Workflow

**Terminal 1: Start Katana**
```bash
katana --dev --dev.no-fee
```

**Terminal 2: Build and deploy**
```bash
sozo build && sozo migrate
```

**Terminal 3: Start Torii**
```bash
torii --world <WORLD_ADDRESS>
```

## Sample Deploy Script

For automated local development, use a script like this:

```bash
#!/bin/bash
set -e

# Configuration
PROFILE="${PROFILE:-dev}"
MANIFEST_FILE="manifest_${PROFILE}.json"
RPC_URL="http://localhost:5050"
TORII_URL="http://localhost:8080"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track background processes for cleanup
KATANA_PID=""
TORII_PID=""

cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    [[ -n "$TORII_PID" ]] && kill $TORII_PID 2>/dev/null
    [[ -n "$KATANA_PID" ]] && kill $KATANA_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Check prerequisites
check_requirements() {
    local missing=()
    command -v katana >/dev/null 2>&1 || missing+=("katana")
    command -v sozo >/dev/null 2>&1 || missing+=("sozo")
    command -v torii >/dev/null 2>&1 || missing+=("torii")
    command -v jq >/dev/null 2>&1 || missing+=("jq")

    if [[ ${#missing[@]} -gt 0 ]]; then
        echo -e "${RED}Missing required tools: ${missing[*]}${NC}"
        echo "Install Dojo: https://book.dojoengine.org/getting-started"
        exit 1
    fi
}

# Wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30

    echo -n "Waiting for $name..."
    for ((i=1; i<=max_attempts; i++)); do
        if curl -s "$url" >/dev/null 2>&1; then
            echo -e " ${GREEN}ready${NC}"
            return 0
        fi
        sleep 1
        echo -n "."
    done
    echo -e " ${RED}failed${NC}"
    return 1
}

# Start Katana
start_katana() {
    echo -e "${YELLOW}Starting Katana...${NC}"
    katana --dev --dev.no-fee > /tmp/katana.log 2>&1 &
    KATANA_PID=$!
    wait_for_service "$RPC_URL" "Katana"
}

# Build and deploy contracts
deploy_contracts() {
    echo -e "${YELLOW}Building contracts...${NC}"
    sozo build --profile "$PROFILE"

    echo -e "${YELLOW}Deploying contracts...${NC}"
    sozo migrate --profile "$PROFILE"
}

# Extract addresses from manifest
extract_addresses() {
    if [[ ! -f "$MANIFEST_FILE" ]]; then
        echo -e "${RED}Manifest file not found: $MANIFEST_FILE${NC}"
        exit 1
    fi

    WORLD_ADDRESS=$(jq -r '.world.address' "$MANIFEST_FILE")
    echo -e "${GREEN}World address: $WORLD_ADDRESS${NC}"

    # Extract contract addresses
    echo -e "\n${YELLOW}Deployed contracts:${NC}"
    jq -r '.contracts[] | "  \(.tag): \(.address)"' "$MANIFEST_FILE"
}

# Start Torii indexer
start_torii() {
    echo -e "\n${YELLOW}Starting Torii indexer...${NC}"
    torii --world "$WORLD_ADDRESS" --http.cors_origins "*" > /tmp/torii.log 2>&1 &
    TORII_PID=$!
    wait_for_service "$TORII_URL/graphql" "Torii"
}

# Print deployment info
print_info() {
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}Deployment Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "World:   $WORLD_ADDRESS"
    echo -e "RPC:     $RPC_URL"
    echo -e "Torii:   $TORII_URL/graphql"
    echo -e "\nLogs:"
    echo -e "  Katana: tail -f /tmp/katana.log"
    echo -e "  Torii:  tail -f /tmp/torii.log"
    echo -e "\nPress Ctrl+C to stop all services"
}

# Main
main() {
    check_requirements
    start_katana
    deploy_contracts
    extract_addresses
    start_torii
    print_info

    # Keep script running
    while kill -0 $KATANA_PID 2>/dev/null; do
        sleep 5
    done
}

main "$@"
```

**Usage:**
```bash
# Make executable
chmod +x scripts/deploy_local.sh

# Run with default dev profile
./scripts/deploy_local.sh

# Run with specific profile
PROFILE=staging ./scripts/deploy_local.sh
```

The script:
1. Checks for required tools (katana, sozo, torii, jq)
2. Starts Katana with health checking
3. Builds and deploys contracts
4. Extracts addresses from the manifest
5. Starts Torii indexer
6. Cleans up all services on exit (Ctrl+C)

## Manifest File

After deployment, `manifest_<profile>.json` contains:
- World address
- Model addresses and class hashes
- System/contract addresses
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
      "tag": "dojo_starter-Position",
      "address": "0x..."
    }
  ],
  "contracts": [
    {
      "tag": "dojo_starter-actions",
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
- Use Sepolia faucet: https://faucet.starknet.io

### "Profile not found"
- Ensure `dojo_<profile>.toml` exists
- Check spelling matches the `--profile` flag

## Network Information

### Katana (Local)
- RPC: `http://localhost:5050`
- Pre-funded accounts printed on startup

### Sepolia (Testnet)
- RPC: `https://api.cartridge.gg/x/starknet/sepolia`
- Faucet: https://faucet.starknet.io
- Explorer: https://sepolia.voyager.online

### Mainnet
- RPC: `https://api.cartridge.gg/x/starknet/mainnet`
- Explorer: https://voyager.online

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
