---
title: "World Permissions"
description: "Understanding and managing the hierarchical permission system in Dojo worlds"
---

# World Permissions

The Dojo World contract implements a sophisticated hierarchical permission system that controls access to resources.
This system works at both configuration time (via `dojo_<profile>.toml`) and runtime (via World contract API).

## Core Permissions Concepts

### Permission For Who?

Permissions are assigned to **addresses**.
These can be **externally-owned addresses**, like that of a user deploying or upgrading a World.
They can also be **the addresses of game systems**, typical for regular application use.

### Permission for What?

Permissions are given for **resources**.
A **resource** can be a world, namespace, system, or model.
Resources are indicated by **tags** -- written as `"namespace-resource"`.

## Configuration vs. Runtime Permissions

Dojo provides two complementary approaches to permission management:

### Configuration-Time Permissions

Set up initial permissions during deployment via your `dojo_<profile>.toml` file:

```toml
[writers]
# Any model in the `dojo_starter` namespace can be written by the `dojo_starter-actions` contract
"dojo_starter" = ["dojo_starter-actions"]
# Only the `dojo_starter-DirectionsAvailable` model can be written by the `dojo_starter-actions` contract
"dojo_starter-DirectionsAvailable" = ["dojo_starter-actions"]

[owners]
"dojo_starter" = ["dojo_starter-admin"]
```

:::note
In this example, permissions are given to **systems**, indicated by tags.
:::

### Runtime Permissions

Manage permissions dynamically after deployment using the World contract API:

```cairo
// Grant runtime permissions
world.grant_owner(selector_from_tag!("dojo_starter-GameState"), new_owner_address);
world.grant_writer(selector_from_tag!("dojo_starter-Position"), new_writer_address);
```

:::note
In this example, permissions are given to **addresses**, which can be systems or accounts.
:::

**When to Use Each:**
- **Configuration**: Initial setup, predictable permissions, deployment automation
- **Runtime**: Dynamic permission changes, game progression, admin functions

## Permission Types

Dojo has two permission types:

### Owner Permission

**Owners** have full control over a resource and can:
- Write data into the storage of the resource
- Grant and revoke permissions to other addresses
- Upgrade the resource
- Set metadata for the resource

### Writer Permission

**Writers** can:
- Write data into the storage of the resource
- Cannot grant permissions to others
- Cannot upgrade the resource

```cairo
// Check if an address is an owner
let is_owner = world.is_owner(resource_selector, address);

// Check if a contract has writer permission
let can_write = world.is_writer(resource_selector, address);

// Reading is always permissionless
let position: Position = world.read_model(player);
```

## Permission Hierarchy

The permission system is resource-based with the following hierarchy:

### 1. World Owner (Highest Level)

The **World Owner** can perform any operation on any resource in the world.

```cairo
// World owner can access any resource
world.grant_writer(any_resource_selector, any_address);
world.upgrade_model(any_namespace, any_class_hash);
```

:::note
Currently, the **address that deployed the world contract** is the default world owner.
In the future, Dojo will add support for a governance system where a contract manages the world, rather than a single address.
:::

### 2. Namespace Owner

A **Namespace Owner** can manage all resources within their specific namespace.

```cairo
// Namespace owner can manage all resources in "my_game"
world.grant_writer(selector_from_tag!("my_game"), new_writer_address);
world.grant_owner(selector_from_tag!("my_game"), new_owner_ddress);
```

:::note
When you deploy to a world, you automatically become the owner of that namespace, if it's not already registered.
:::

**Namespace Owner Rights**:
- Can manage the namespace and write to it
- Can add more people to the namespace
- Can grant writer permissions to resources in the namespace
- Can register new models/contracts/events in the namespace

### 3. Resource Owner

A **Resource Owner** can manage a specific resource (model, event, or contract).

```cairo
// Grant ownership of a specific model
world.grant_owner(selector_from_tag!("my_game-Position"), new_owner_address);

// Resource owner can manage this specific resource
world.grant_writer(selector_from_tag!("my_game-Position"), new_writer_address);
```

### 4. Writer

A **Writer** can write data into the storage of a specific resource but cannot manage permissions.

```cairo
// Grant write permission to a system contract
world.grant_writer(selector_from_tag!("my_game-Position"), movement_system);

// Writer can write to the model
let position: Position = world.read_model(player);
world.write_model(@updated_position);

// Grant write access to entire namespace
world.grant_writer(selector_from_tag!("my_game"), system_contract);

// This system can now write to ANY resource in the "my_game" namespace
// - my_game-Position, my_game-Health, my_game-Inventory, etc.
```

## Resource-Based Permissions

All permissions in Dojo are resource-based. Every component is a resource:

- **World** → A resource (selector `0`)
- **Namespace** → A resource (e.g., `"my_game"`)
- **Model** → A resource (e.g., `"my_game-Position"`)
- **Contract** → A resource (e.g., `"my_game-actions"`)
- **Event** → A resource (e.g., `"my_game-PlayerMoved"`)

**Permission Hierarchy** (order of precedence):
1. **World** (highest)
2. **Namespace**
3. **Model/Contract/Event** (lowest)

**Key Points**:
- Managing permissions requires **Owner** permission on the resource or its namespace
- Writing requires **Writer** permission on the resource or its namespace
- Reading is **always permissionless**

```cairo
// Example hierarchy for a game
world.grant_owner(selector_from_tag!("my_game"), game_admin);  // Namespace owner
world.grant_owner(selector_from_tag!("my_game-PlayerStats"), stats_manager);  // Resource owner
world.grant_writer(selector_from_tag!("my_game-PlayerPosition"), movement_system);  // Resource writer
world.grant_writer(selector_from_tag!("my_game"), system_contract);  // Namespace writer (can write to ALL resources in namespace)
```

Here is a simple way to think about organizing permissions in your Dojo application:

![System Permissions](/permissions.png)

## Managing Permissions

### Granting Permissions

#### `grant_owner`

Only existing owners or higher-level permissions can grant ownership.

```cairo
// World owner can grant namespace ownership
world.grant_owner(selector_from_tag!("my_game"), game_admin);

// Namespace owner can grant resource ownership within their namespace
world.grant_owner(selector_from_tag!("my_game-PlayerStats"), stats_manager);

// Resource owner can grant ownership of their resource
world.grant_owner(selector_from_tag!("my_game-PlayerPosition"), position_manager);
```

#### `grant_writer`

Resource owners can grant writer permissions to contracts.

```cairo
// Grant writer permission to a contract
world.grant_writer(selector_from_tag!("my_game-PlayerPosition"), movement_contract);

// Grant writer permission to multiple contracts
world.grant_writer(selector_from_tag!("my_game-PlayerHealth"), combat_contract);
world.grant_writer(selector_from_tag!("my_game-PlayerHealth"), healing_contract);
```

### Revoking Permissions

#### `revoke_owner`

Remove ownership from an address.

```cairo
// Revoke ownership (only higher-level owners can do this)
world.revoke_owner(selector_from_tag!("my_game-PlayerStats"), old_stats_manager);
```

#### `revoke_writer`

Remove writer permission from a contract.

```cairo
// Revoke writer permission
world.revoke_writer(selector_from_tag!("my_game-PlayerPosition"), old_movement_contract);
```


## Common Permission Patterns

### Principle of Least Privilege

```cairo
// Good: Specific permissions for specific functions
world.grant_writer(selector_from_tag!("my_game-PlayerPosition"), movement_contract);
world.grant_writer(selector_from_tag!("my_game-PlayerHealth"), combat_contract);

// Bad: Overly broad permissions
world.grant_owner(selector_from_tag!("my_game"), movement_contract);
```

### Game Administration

```cairo
// Set up admin permissions for a game
let game_admin = get_caller_address();
let player_contract = get_contract_address();

// Admin owns the game namespace
world.grant_owner(selector_from_tag!("my_game"), game_admin);

// Admin owns critical game state
world.grant_owner(selector_from_tag!("my_game-GameConfig"), game_admin);
world.grant_owner(selector_from_tag!("my_game-GlobalSettings"), game_admin);

// Player contract can write to player-specific models
world.grant_writer(selector_from_tag!("my_game-PlayerPosition"), player_contract);
world.grant_writer(selector_from_tag!("my_game-PlayerInventory"), player_contract);
world.grant_writer(selector_from_tag!("my_game-PlayerStats"), player_contract);
```

### Multi-System Architecture

```cairo
// Different systems handle different aspects
world.grant_writer(selector_from_tag!("my_game-PlayerPosition"), movement_system);
world.grant_writer(selector_from_tag!("my_game-PlayerHealth"), combat_system);
world.grant_writer(selector_from_tag!("my_game-PlayerInventory"), inventory_system);
world.grant_writer(selector_from_tag!("my_game-PlayerInventory"), trading_system);

// Admin system can manage all player data
world.grant_owner(selector_from_tag!("my_game-PlayerPosition"), admin_system);
world.grant_owner(selector_from_tag!("my_game-PlayerHealth"), admin_system);
world.grant_owner(selector_from_tag!("my_game-PlayerInventory"), admin_system);
```

### Modular Permissions

```cairo
// Base game permissions
world.grant_writer(selector_from_tag!("my_game-Position"), base_game_contract);
world.grant_writer(selector_from_tag!("my_game-Health"), base_game_contract);

// Expansion permissions (new contracts can access base models)
world.grant_writer(selector_from_tag!("my_game-Position"), expansion_contract);
world.grant_writer(selector_from_tag!("my_game-MagicSpells"), expansion_contract);
```

## Permission Events

The World contract emits events when permissions change:

```cairo
// Emitted when owner permission is granted/revoked
#[derive(Drop, starknet::Event)]
pub struct OwnerUpdated {
    #[key]
    pub resource: felt252,
    #[key]
    pub contract: ContractAddress,
    pub value: bool,
}

// Emitted when writer permission is granted/revoked
#[derive(Drop, starknet::Event)]
pub struct WriterUpdated {
    #[key]
    pub resource: felt252,
    #[key]
    pub contract: ContractAddress,
    pub value: bool,
}
```

Use these events to track permission changes:

```cairo
// Listen for permission changes in your indexer
match event {
    Event::OwnerUpdated(owner_event) => {
        // Handle ownership change
        update_owner_permissions(owner_event.resource, owner_event.contract);
    },
    Event::WriterUpdated(writer_event) => {
        // Handle writer permission change
        update_writer_permissions(writer_event.resource, writer_event.contract);
    },
}
```

## Migration and Permissions

During migration, permissions are automatically set up from your configuration:

```toml
# dojo_dev.toml
[world]
name = "my_game"
description = "My awesome game"

# Configuration-time permissions
[writers]
"my_game" = ["my_game-actions"]
"my_game-Position" = ["my_game-actions"]

[owners]
"my_game" = ["my_game-admin"]

[[contracts]]
tag = "my_game-actions"
description = "Game actions contract"

[[models]]
tag = "my_game-Position"
description = "Player position model"
```

After migration, you can adjust permissions using the World contract API:

```bash
# Grant writer permission using sozo auth
sozo auth grant writer my_game-Position,my_game-actions

# Grant owner permission using sozo auth
sozo auth grant owner my_game,my_game-admin

# Check writer permissions
sozo call world is_writer 0x123 0x456  # resource_selector contract_address

# Check owner permissions
sozo call world is_owner 0x123 0x456   # resource_selector contract_address

# List all permissions
sozo auth list
```

**Configuration Reference:**
For detailed configuration options, see [Configuration](/framework/configuration).

## Debugging Permission Issues

1. **Check Resource Selector**: Ensure you're using the correct resource selector
2. **Verify Caller**: Confirm the caller address is what you expect
3. **Check Hierarchy**: Verify the permission hierarchy is set up correctly
4. **Use Events**: Monitor permission events to track changes

```cairo
// Debug helper function
fn debug_permissions(world: @WorldStorage, resource: felt252, address: ContractAddress) {
    let is_owner = world.is_owner(resource, address);
    let is_writer = world.is_writer(resource, address);

    println!("Resource: {}, Address: {}", resource, address);
    println!("Is Owner: {}, Is Writer: {}", is_owner, is_writer);
}
```

The permission system in Dojo is powerful and flexible, enabling you to build secure, scalable applications.
Use it thoughtfully to protect your resources while enabling the functionality your users need.
