---
name: dojo-world
description: "Manage Dojo world permissions, namespaces, resource registration, and access control. Grant and revoke owner and writer roles via config or Cairo. Use when configuring world ownership, setting up authorization policies, managing resource permissions, or debugging access errors."
allowed-tools: Read, Write, Bash, Grep
---

# Dojo World Management

Manage your Dojo world's permissions, namespaces, and access control policies.

## Permission Hierarchy

```
World Owner (highest)
    └── Namespace Owner
        └── Resource Owner / Writer (lowest)
```

| Role | Write Data | Grant Permissions | Upgrade Resource |
|------|-----------|-------------------|------------------|
| Owner | ✅ | ✅ | ✅ |
| Writer | ✅ | ❌ | ❌ |

Reading is always permissionless.

## Configuration-Based Permissions

Set permissions during deployment in `dojo_<profile>.toml`:

```toml
[namespace]
default = "my_game"

[writers]
# Namespace-level: actions can write to all resources in my_game
"my_game" = ["my_game-actions"]
# Resource-specific: movement can only write to Position
"my_game-Position" = ["my_game-movement"]

[owners]
# Namespace ownership
"my_game" = ["my_game-admin"]
```

Format: `"<TARGET_TAG>" = ["<GRANTEE_TAG>"]`

## CLI Permission Management

```bash
# Grant writer permission
sozo auth grant writer my_game-Position,my_game-actions

# Grant owner permission
sozo auth grant owner my_game,my_game-admin

# Revoke writer permission
sozo auth revoke writer my_game-Position,my_game-actions

# List all permissions
sozo auth list
```

## Runtime Permission Management (Cairo)

```cairo
use dojo::world::WorldStorage;

// Grant writer permission to a contract
world.grant_writer(
    selector_from_tag!("my_game-Position"),
    movement_system_address
);

// Grant owner permission
world.grant_owner(
    selector_from_tag!("my_game-GameState"),
    new_owner_address
);

// Revoke permissions
world.revoke_writer(
    selector_from_tag!("my_game-Position"),
    old_system_address
);

// Check permissions
let is_owner = world.is_owner(resource_selector, address);
let can_write = world.is_writer(resource_selector, address);
```

## Permission Patterns

### Principle of Least Privilege
```cairo
// ✅ Specific permissions per system
world.grant_writer(selector_from_tag!("my_game-Position"), movement_contract);
world.grant_writer(selector_from_tag!("my_game-Health"), combat_contract);

// ❌ Overly broad — avoid unless necessary
world.grant_owner(selector_from_tag!("my_game"), movement_contract);
```

### Authorization Check in Systems
```cairo
fn admin_function(ref self: ContractState) {
    let mut world = self.world_default();
    let caller = get_caller_address();

    assert(
        world.is_owner(selector_from_tag!("my_game"), caller),
        'not authorized'
    );

    // Proceed with admin logic
}
```

### Transfer Namespace Ownership
```cairo
fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
    let mut world = self.world_default();

    world.grant_owner(selector_from_tag!("my_game"), new_owner);
    world.revoke_owner(selector_from_tag!("my_game"), get_caller_address());
}
```

## Troubleshooting

| Error | Check |
|-------|-------|
| "Not authorized" | Writer permissions granted? System address correct? |
| "Permission denied" | You have owner permission to grant/revoke? |
| Unexpected access | Run `sozo auth list` to audit current permissions |

## Verification

After configuring permissions, verify the setup:

```bash
# List all permissions and review
sozo auth list

# Build and test to confirm authorization works
sozo build
sozo test
```

## Related Skills

- **dojo-deploy**: Deploy world first
- **dojo-system**: Add authorization checks to systems
- **dojo-config**: Configure permissions in deployment profile
- **dojo-review**: Audit permission setup
