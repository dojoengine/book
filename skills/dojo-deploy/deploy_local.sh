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
