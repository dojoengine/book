# World Interaction

Once your world is deployed, these commands let you interact with it during development, testing, and runtime operations.
This page covers executing game logic, querying world state, managing permissions, and debugging your deployed worlds.

:::tip
For detailed command options, use the built-in `sozo --help` and `sozo <command> --help`
:::

## Interacting with a World

```bash
# Execute game actions (sends transactions)
sozo execute ns-Actions spawn                   # Create a new player
sozo execute ns-Actions attack str:goblin       # Attack a goblin

# Query game state (read-only)
sozo model get ns-Health 0x123...               # Check player health
sozo call ns-GameView get_leaderboard           # Get top players
```

## System Execution

### `sozo execute`

Execute system functions that modify world state.
These operations send transactions and cost gas.

```bash
# Separate system calls
sozo execute ns-Actions spawn                     # Call spawn() on Actions system
sozo execute ns-Actions move 10 5                 # Call move(10, 5)
sozo execute ns-Shop buy_item str:sword u256:100  # Buy sword for 100 gold

# Batch multiple calls (separated by /)
sozo execute ns-Actions spawn / ns-Actions move 5 3 / ns-Actions open_chest
```

**Key Features:**
- **Transaction-based**: Requires account/signer configuration
- **Tag resolution**: Use contract tags (e.g., `Actions`) or addresses
- **Multicall support**: Batch multiple system calls efficiently
- **Type-aware calldata**: Supports Dojo's [calldata format](/toolchain/sozo/index.md#data-format-reference)

**Common Use Cases:**
- Player actions (move, attack, trade)
- Game state changes (spawn entities, update scores)
- Administrative actions (set permissions, update config)

## Data Querying

### `sozo call `

Call view functions and read-only system methods.
These operations don't send transactions or require gas.

```bash
# Query game state
sozo call ns-GameView get_player_stats 0x123...     # Get player stats
sozo call ns-MapSystem get_tile_info 5 10           # Get tile at (5,10)
sozo call ns-Leaderboard get_top_players            # Get leaderboard

# Historical queries (specify block)
sozo call ns-GameView get_player_stats 0x123... --block-id 12345
```

**Key Features:**
- **Read-only**: No transactions, no gas costs, no account required
- **Return values**: Get data back from function calls
- **Historical queries**: Query state at specific blocks
- **Instant results**: No waiting for transaction confirmation

**Common Use Cases:**
- Query player stats, positions, inventory
- Check game state before making moves
- Validate game logic during development
- Build dashboards and analytics

### `sozo model`

Query model data and inspect model schemas.
Models store your game's ECS component data.

```bash
# Query entity data
sozo model get ns-Position 0x123...              # Get Position for entity 0x123...
sozo model get ns-Health 0x123... 0x456...       # Get Health for entity with composite key
sozo model get ns-Inventory 0x123...             # Get player's inventory

# Inspect model structure
sozo model schema ns-Position                    # See Position model fields
sozo model schema ns-Health                      # See Health model structure
sozo model class-hash ns-Position                # Get Position class hash
sozo model contract-address ns-Position          # Get Position contract address
```

**Key Features:**
- **Entity queries**: Get model data for specific entities using their keys
- **Schema inspection**: Understand model structure and field types
- **Composite keys**: Support for models with multiple key fields
- **Contract metadata**: Access class hashes and addresses

**Common Use Cases:**
- Debug game state during development
- Query player data (position, health, inventory)
- Inspect model schemas when integrating clients
- Verify entity state after system calls

### `sozo events `

Query world events to track game activity and debug system behavior.

```bash
# Get recent events
sozo events --chunk-size 10                            # Get latest 10 events
sozo events ns-PlayerMoved --chunk-size 5              # Get latest 5 PlayerMoved events
sozo events ns-PlayerMoved ns-GameEnd --chunk-size 20  # Get PlayerMoved and GameEnd events

# Filter by block range
sozo events --from-block 1000 --to-block 2000 --chunk-size 50
sozo events ns-PlayerAttack --from-block 1500 --chunk-size 10

# Export to JSON for analysis
sozo events --chunk-size 100 --json > game_events.json
```

**Key Features:**
- **Event filtering**: Query specific event types or all events
- **Block range queries**: Get events from specific time periods
- **Pagination**: Handle large event sets with chunk-size
- **JSON export**: Export events for analysis or integration

**Common Use Cases:**
- Debug system execution and event emission
- Track player activity and game metrics
- Build event-driven analytics
- Monitor world activity during development

## Permissions Management

### `sozo auth `

Manage access control for your world resources.
Control who can modify models and own contracts.

```bash
# Grant system write access to models
sozo auth grant writer ns-Position,0x123...      # Let contract 0x123... write to Position
sozo auth grant writer ns-Health,0x456...        # Let contract 0x456... write to Health
sozo auth grant writer ns-Inventory,0x789...     # Let contract 0x789... write to Inventory

# Grant ownership of resources
sozo auth grant owner ns-Position,0xabc...       # Give ownership of Position model
sozo auth grant owner ns-Actions,0xdef...        # Give ownership of Actions contract

# Revoke permissions
sozo auth revoke writer ns-Position,0x123...     # Remove write access
sozo auth revoke owner ns-Position,0xabc...      # Remove ownership

# Batch permission changes (more efficient)
sozo auth grant writer ns-Position,0x123... ns-Health,0x123... ns-Inventory,0x123...
```

**Permission Types:**
- **Writer**: Can modify model data (required for systems that update game state)
- **Owner**: Can modify resource permissions and upgrade contracts

**Key Features:**
- **Multicall batching**: Multiple permission changes in one transaction
- **Resource targeting**: Models, contracts, and namespaces
- **Flexible syntax**: Use contract tags or addresses

**Common Use Cases:**
- Grant systems write access to models they need to update
- Transfer ownership for contract upgrades
- Set up multi-system architectures with proper permissions
- Delegate administrative control to other accounts

### `sozo register `

Register new models to your world after they've been declared but not yet registered.

```bash
# Register a model by class hash
sozo register model 0x76490...

# Register multiple models
sozo register model 0x123... 0x456... 0x789...
```

**When to Use:**
- After declaring a new model class that wasn't included in the original world deployment
- When adding models from external libraries to your world
- During development when iterating on model schemas

:::note
Most model registration happens automatically during `sozo migrate`.
Manual registration is typically only needed for external models or advanced deployment scenarios.
:::

## Development & Debugging

### `sozo inspect`

Inspect deployed world configuration, resources, and permissions.

```bash
sozo inspect                        # Inspect current world
sozo inspect --world 0x123...       # Inspect specific world address
```

**What it shows:**
- Registered models, systems, events, and libraries
- Resource permissions and ownership
- World metadata and configuration
- Class hashes and contract addresses

**Common Use Cases:**
- Debug permission issues
- Understand deployed world structure
- Verify resource registration
- Audit world state and permissions

### `sozo version`

Display Sozo version information:

```bash
sozo version                         # Show version details
```

### `sozo mcp`

Start an MCP (Model Context Protocol) server for development tooling:

```bash
sozo mcp                             # Start MCP server
```

This enables enhanced IDE integration and development tool support for Dojo projects.
