---
name: dojo-world
description: Manage world permissions, namespaces, resource registration, and access control. Use when configuring world ownership, setting up authorization policies, or managing resource permissions.
allowed-tools: Read, Write, Bash, Grep
---

# Dojo World Management

Manage your Dojo world's permissions, namespaces, resource registration, and access control policies.

## When to Use This Skill

- "Configure world permissions"
- "Set up namespace access"
- "Grant writer permissions"
- "Manage resource ownership"

## What This Skill Does

Handles world management:
- Namespace configuration
- Resource registration
- Writer permissions
- Owner permissions
- Role-based access
- Permission transfers

## Quick Start

**Configure permissions:**
```
"Grant writer permission to my system"
```

**Namespace setup:**
```
"Create a namespace for my game"
```

**Transfer ownership:**
```
"Transfer world ownership to new address"
```

## World Concepts

### World Contract
Central registry that:
- Manages all models and systems
- Controls permissions
- Handles namespaces
- Stores metadata

### Namespaces
Logical groupings of resources:
- Models belong to namespaces
- Systems belong to namespaces
- Permissions granted per namespace
- Prevents naming conflicts

### Permissions
Two types:
- **Owner**: Full control (grant/revoke permissions)
- **Writer**: Can write to models

## Permission Management

### Granting Writer Permission

Allow a system to write to models:
```bash
sozo auth grant writer \
    MODEL_NAME,SYSTEM_ADDRESS \
    --world WORLD_ADDRESS
```

**Example:**
```bash
# Grant actions system writer to Position model
sozo auth grant writer \
    Position,0x123... \
    --world 0xabc...
```

### Granting Owner Permission

Transfer ownership or grant admin access:
```bash
sozo auth grant owner \
    RESOURCE_NAME,NEW_OWNER_ADDRESS \
    --world WORLD_ADDRESS
```

### Revoking Permissions

Remove access:
```bash
sozo auth revoke writer \
    MODEL_NAME,SYSTEM_ADDRESS \
    --world WORLD_ADDRESS
```

## Namespace Management

### Creating Namespace

```bash
sozo auth create-namespace \
    my_namespace \
    --world WORLD_ADDRESS
```

### Registering Resources

```bash
# Register model to namespace
sozo auth register model \
    Position \
    --namespace my_namespace \
    --world WORLD_ADDRESS

# Register system to namespace
sozo auth register contract \
    actions \
    --namespace my_namespace \
    --world WORLD_ADDRESS
```

## Common Permission Patterns

### Game System Permissions

Grant system access to all game models:
```bash
# Actions system can write to Position
sozo auth grant writer Position,ACTIONS_ADDRESS

# Actions system can write to Health
sozo auth grant writer Health,ACTIONS_ADDRESS

# Actions system can write to Inventory
sozo auth grant writer Inventory,ACTIONS_ADDRESS
```

### Admin System

Grant admin system owner permissions:
```bash
sozo auth grant owner Position,ADMIN_SYSTEM_ADDRESS
sozo auth grant owner Config,ADMIN_SYSTEM_ADDRESS
```

### Multi-System Architecture

Different systems for different aspects:
```bash
# Movement system writes to Position
sozo auth grant writer Position,MOVEMENT_SYSTEM

# Combat system writes to Health
sozo auth grant writer Health,COMBAT_SYSTEM

# Inventory system writes to Inventory
sozo auth grant writer Inventory,INVENTORY_SYSTEM
```

## World API

### In Systems (Cairo)

**Check permissions:**
```cairo
#[dojo::contract]
pub mod system {
    fn restricted_action(ref self: ContractState) {
        let world = self.world_default();

        // Only owner can call
        world.assert_owner(get_caller_address());

        // Or check writer
        world.assert_writer(get_caller_address());
    }
}
```

**Grant permissions from system:**
```cairo
fn setup_permissions(ref self: ContractState) {
    let world = self.world_default();

    // Grant writer permission
    world.grant_writer(MODEL_SELECTOR, system_address);

    // Grant owner permission
    world.grant_owner(RESOURCE_SELECTOR, new_owner);
}
```

## Authorization Patterns

### Public Systems
Anyone can call:
```cairo
fn spawn(ref self: ContractState) {
    // No permission check - anyone can spawn
    let player = get_caller_address();
    world.write_model(@Position { player, x: 0, y: 0 });
}
```

### Owner-Only Systems
Only world owner:
```cairo
fn admin_function(ref self: ContractState) {
    let world = self.world_default();
    world.assert_owner(get_caller_address());

    // Admin logic
}
```

### Writer-Only Systems
Only authorized writers:
```cairo
fn internal_update(ref self: ContractState) {
    let world = self.world_default();
    world.assert_writer(get_caller_address());

    // Update logic
}
```

### Custom Authorization
Check specific conditions:
```cairo
fn guild_action(ref self: ContractState, guild_id: u32) {
    let player = get_caller_address();

    // Read player's guild membership
    let member: GuildMember = world.read_model((guild_id, player));
    assert(member.role >= OFFICER, 'not authorized');

    // Guild logic
}
```

## Metadata Management

### World Metadata

Set world information:
```cairo
fn set_metadata(ref self: ContractState) {
    let world = self.world_default();

    world.set_metadata_uri("https://example.com/metadata.json");
}
```

### Resource Metadata

Set model/system metadata:
```cairo
world.set_resource_metadata(
    MODEL_SELECTOR,
    "ipfs://QmHash..."
);
```

## Security Best Practices

### Principle of Least Privilege
Grant minimal permissions:
```bash
# ❌ Don't grant owner when writer is enough
sozo auth grant owner Position,SYSTEM_ADDRESS

# ✅ Grant only writer
sozo auth grant writer Position,SYSTEM_ADDRESS
```

### Audit Permissions Regularly
```bash
# Check who has access to model
sozo auth list writers Position --world WORLD_ADDRESS

# Check owners
sozo auth list owners Position --world WORLD_ADDRESS
```

### Secure Owner Key
- Use hardware wallet for owner account
- Consider multi-sig for production
- Rotate keys if compromised

### Test Permission Checks
```cairo
#[test]
#[should_panic(expected: ('not authorized',))]
fn test_unauthorized_access() {
    let unauthorized = starknet::contract_address_const::<0x999>();
    prank(world, unauthorized);

    system.admin_function();  // Should panic
}
```

## World Management Checklist

### Initial Setup
- [ ] Deploy world (`dojo-deploy` skill)
- [ ] Record world address
- [ ] Set up namespaces
- [ ] Register models and systems
- [ ] Configure world metadata

### Permission Configuration
- [ ] Grant writer permissions to all systems
- [ ] Set up admin accounts
- [ ] Configure authorization in systems
- [ ] Test permission checks
- [ ] Document permission structure

### Production Readiness
- [ ] Audit all permissions
- [ ] Remove unnecessary permissions
- [ ] Secure owner keys
- [ ] Set up monitoring
- [ ] Document emergency procedures

## Common Scenarios

### Setting Up New Game

```bash
# 1. Deploy world
sozo migrate --name my_game

# 2. Record addresses from manifest
WORLD_ADDRESS=...
ACTIONS_ADDRESS=...

# 3. Grant permissions
sozo auth grant writer Position,$ACTIONS_ADDRESS --world $WORLD_ADDRESS
sozo auth grant writer Health,$ACTIONS_ADDRESS --world $WORLD_ADDRESS

# 4. Verify
sozo auth list writers Position --world $WORLD_ADDRESS
```

### Adding New System

```bash
# 1. Deploy new system
sozo migrate --world WORLD_ADDRESS

# 2. Grant necessary permissions
sozo auth grant writer NewModel,NEW_SYSTEM_ADDRESS --world WORLD_ADDRESS

# 3. Test
sozo execute new_system test_function --world WORLD_ADDRESS
```

### Transferring Ownership

```bash
# Transfer world ownership
sozo auth transfer-ownership NEW_OWNER_ADDRESS --world WORLD_ADDRESS
```

## Troubleshooting

### "Not authorized" errors
- Check writer permissions granted
- Verify system address is correct
- Ensure caller has required permission

### "Resource not found"
- Verify resource is registered
- Check namespace is correct
- Ensure resource is deployed

### "Permission denied"
- Check owner permissions
- Verify transaction from correct account
- Ensure not trying to grant higher than owned

## Next Steps

After world setup:
1. Test all permission checks
2. Document permission structure
3. Set up monitoring for permission changes
4. Configure client with appropriate accounts

## Related Skills

- **dojo-deploy**: Deploy world first
- **dojo-system**: Add authorization to systems
- **dojo-review**: Audit permission setup
- **dojo-migrate**: Update permissions after changes
