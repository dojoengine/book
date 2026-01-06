---
name: dojo-migrate
description: Manage world migrations, handle breaking changes, and upgrade Dojo versions. Use when updating deployed worlds, migrating to new versions, or handling schema changes.
allowed-tools: Read, Bash, Grep, Glob
---

# Dojo Migration Management

Handle world migrations, upgrades, and breaking changes when updating deployed Dojo worlds.

## When to Use This Skill

- "Migrate my world changes"
- "Upgrade to new Dojo version"
- "Handle breaking changes"
- "Update deployed models"

## What This Skill Does

Manages migration workflows:
- Analyze migration diffs
- Plan migration strategies
- Execute migrations
- Handle breaking changes
- Upgrade Dojo versions
- Rollback if needed

## Quick Start

**Update existing world:**
```
"Migrate my changes to the deployed world"
```

**Version upgrade:**
```
"Upgrade my project to Dojo v1.1.0"
```

**Breaking changes:**
```
"Help me handle breaking changes in my models"
```

## Migration Workflow

### 1. Analyze Changes

**Check diff:**
```bash
sozo migrate --diff
```

Shows:
- New models
- Modified models
- New systems
- Modified systems
- Removed items

### 2. Plan Migration

**Review changes:**
- Breaking: Model key changes, field removals
- Safe: New models, new systems, field additions
- Risky: Field type changes, system logic changes

**Strategy:**
- Safe changes: Direct migration
- Breaking changes: Data migration needed
- Major changes: Consider new world

### 3. Execute Migration

**Apply changes:**
```bash
sozo migrate --world WORLD_ADDRESS
```

**With specific profile:**
```bash
sozo migrate --world WORLD_ADDRESS --profile sepolia
```

## Migration Types

### Additive Migrations (Safe)

**Adding new model:**
```cairo
// New model - safe to add
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct NewFeature {
    #[key]
    pub player: ContractAddress,
    pub data: u32,
}
```

**Adding new system:**
```cairo
// New system - safe to add
#[dojo::contract]
pub mod new_system {
    // Implementation
}
```

**Adding model field:**
```cairo
// Old
struct Position {
    #[key] player: ContractAddress,
    x: u32,
    y: u32,
}

// New - adding field (careful!)
struct Position {
    #[key] player: ContractAddress,
    x: u32,
    y: u32,
    z: u32,  // New field - existing data needs handling
}
```

### Breaking Migrations (Dangerous)

**Changing key fields:**
```cairo
// Old
struct Position {
    #[key] player: ContractAddress,
    x: u32, y: u32,
}

// New - BREAKING! Cannot migrate
struct Position {
    #[key] entity_id: u32,  // Different key type
    x: u32, y: u32,
}
```

**Removing fields:**
```cairo
// Old
struct Stats {
    #[key] player: ContractAddress,
    health: u8,
    mana: u8,
}

// New - BREAKING! Data loss
struct Stats {
    #[key] player: ContractAddress,
    health: u8,
    // mana removed
}
```

**Changing field types:**
```cairo
// Old
struct Position {
    #[key] player: ContractAddress,
    x: u32,
    y: u32,
}

// New - BREAKING! Type incompatible
struct Position {
    #[key] player: ContractAddress,
    x: u128,  // Changed type
    y: u128,
}
```

## Handling Breaking Changes

### Option 1: New World

Deploy fresh world with new schema:
```bash
# Deploy new world with different name
sozo migrate --name my_game_v2
```

**Pros:**
- Clean slate
- No data migration complexity

**Cons:**
- Lose existing data
- Users must migrate

### Option 2: Data Migration

Migrate data from old to new:
```cairo
// Migration system
#[dojo::contract]
pub mod migrator {
    fn migrate_positions(ref self: ContractState) {
        // Read old format
        let old_pos = world.read_model_old(player);

        // Transform to new format
        let new_pos = transform(old_pos);

        // Write new format
        world.write_model(@new_pos);
    }
}
```

### Option 3: Parallel Models

Keep both old and new:
```cairo
// Keep old model
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct PositionV1 {
    #[key] player: ContractAddress,
    x: u32, y: u32,
}

// Add new model
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct PositionV2 {
    #[key] entity_id: u32,
    x: u32, y: u32, z: u32,
}
```

## Version Upgrades

### Patch Versions (v1.0.0 → v1.0.1)

Usually safe:
```toml
[dependencies]
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.0.1" }
```

```bash
scarb update
sozo build
sozo test
sozo migrate --world WORLD_ADDRESS
```

### Minor Versions (v1.0.0 → v1.1.0)

Check changelog for:
- New features
- Deprecations
- API changes

```bash
# Update dependency
# Update Scarb.toml

# Rebuild
sozo build

# Test thoroughly
sozo test

# Migrate
sozo migrate --world WORLD_ADDRESS
```

### Major Versions (v1.0.0 → v2.0.0)

Breaking changes likely:
- Read migration guide
- Update all breaking changes
- Test extensively
- Consider new world deployment

```bash
# Read CHANGELOG.md and migration guide

# Update code for breaking changes
# Update Scarb.toml

# Build and test
sozo build
sozo test

# Deploy new world or migrate carefully
sozo migrate --name my_game_v2
```

## Migration Checklist

### Pre-Migration
- [ ] Backup world address and manifest
- [ ] Review migration diff (`sozo migrate --diff`)
- [ ] Test changes locally on Katana
- [ ] Identify breaking changes
- [ ] Plan data migration if needed
- [ ] Test migration on testnet first

### Migration
- [ ] Build succeeds (`sozo build`)
- [ ] Tests pass (`sozo test`)
- [ ] Migration executes (`sozo migrate --world ADDR`)
- [ ] Verify new models/systems
- [ ] Check existing data integrity
- [ ] Update client with new ABI

### Post-Migration
- [ ] Test all systems still work
- [ ] Verify client integration
- [ ] Update Torii indexer if needed
- [ ] Monitor for issues
- [ ] Document changes

## Common Scenarios

### Adding a New Model
```bash
# 1. Add model to code
# 2. Build
sozo build

# 3. Migrate
sozo migrate --world WORLD_ADDRESS

# 4. Verify
sozo model get NewModel KEY
```

### Updating System Logic
```bash
# 1. Update system code
# 2. Build and test
sozo build
sozo test

# 3. Migrate (redeploys system)
sozo migrate --world WORLD_ADDRESS

# 4. Test updated system
sozo execute actions updated_function
```

### Adding Model Field
```bash
# 1. Add field to model
# 2. Handle existing data:
#    - New field will be zero/default for existing entities
#    - May need migration system to populate

# 3. Build and migrate
sozo build
sozo migrate --world WORLD_ADDRESS
```

## Rollback Strategies

### Revert Code Changes
```bash
# Revert to previous commit
git revert HEAD

# Rebuild and migrate
sozo build
sozo migrate --world WORLD_ADDRESS
```

### Deploy Previous Version
```bash
# Switch to previous tag
git checkout v1.0.0

# Redeploy
sozo build
sozo migrate --world WORLD_ADDRESS
```

### Keep Both Versions
```bash
# Deploy new world with new name
sozo migrate --name my_game_legacy  # Old version
sozo migrate --name my_game_v2      # New version

# Run both in parallel during transition
```

## Best Practices

- Always test migrations on Katana first
- Then test on testnet before mainnet
- Keep manifest backups
- Document breaking changes
- Version your worlds (my_game_v1, my_game_v2)
- Plan data migration for breaking changes
- Monitor after migration
- Keep rollback plan ready

## Troubleshooting

### "Class hash not found"
- Run `sozo build` first
- Check Scarb.toml is correct
- Verify world address

### "Model already exists"
- Model cannot be removed from world
- Can only add or upgrade
- Use new model name if needed

### "Migration failed"
- Check account has funds
- Verify world address
- Check for breaking changes
- Review diff output

### "Data corrupted after migration"
- Breaking change likely occurred
- May need data migration system
- Consider rolling back

## Next Steps

After migration:
1. Test all functionality
2. Update client with new ABIs (`dojo-client` skill)
3. Update Torii if model changes (`dojo-indexer` skill)
4. Monitor world for issues

## Related Skills

- **dojo-deploy**: Initial deployment
- **dojo-config**: Update configuration
- **dojo-world**: Manage permissions after migration
- **dojo-indexer**: Update indexer for new schema
- **dojo-client**: Update client bindings
