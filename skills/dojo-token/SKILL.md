---
name: dojo-token
description: Implement ERC20 and ERC721 token standards in Dojo using Origami library. Use when adding fungible tokens, NFTs, or token-based game mechanics.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Dojo Token Standards

Implement ERC20 fungible tokens and ERC721 NFTs in your Dojo game using the Origami library.

## When to Use This Skill

- "Implement ERC20 token for game currency"
- "Create NFT items with ERC721"
- "Add token standard to my game"
- "Use Origami for tokens"

## What This Skill Does

Implements token standards:
- ERC20 fungible tokens (currency, resources)
- ERC721 non-fungible tokens (items, characters)
- Token minting and burning
- Transfer mechanics
- Balance tracking
- Integration with Origami library

## Quick Start

**ERC20 (fungible):**
```
"Implement ERC20 token for gold currency"
```

**ERC721 (NFT):**
```
"Create ERC721 for equipment items"
```

**With Origami:**
```
"Use Origami library to add token support"
```

## Token Standards

### ERC20 - Fungible Tokens

For interchangeable assets:
- Game currency (gold, gems)
- Resources (wood, stone)
- Experience points
- Reputation/score

**Properties:**
- Divisible (can have fractions)
- Interchangeable (any token = any other)
- Track balances per account

### ERC721 - Non-Fungible Tokens

For unique assets:
- Character NFTs
- Equipment/items
- Land plots
- Achievements

**Properties:**
- Unique (each has token ID)
- Indivisible (whole units only)
- Individual ownership tracking

## Using Origami Library

### Installation

Add to `Scarb.toml`:
```toml
[dependencies]
origami_token = { git = "https://github.com/dojoengine/origami", tag = "v1.0.0" }
```

### Origami Components

Origami provides reusable token components:
- `Balance` - Token balances
- `ERC20Allowance` - Spending approvals
- `ERC20Metadata` - Token info
- `ERC721Owner` - NFT ownership
- `ERC721TokenApproval` - NFT approvals

## ERC20 Implementation

### Basic ERC20 Model

```cairo
use origami_token::components::token::erc20::erc20_balance::{
    ERC20Balance, ERC20BalanceTrait
};

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Gold {
    #[key]
    pub player: ContractAddress,
    pub amount: u256,
}
```

### ERC20 System

```cairo
use dojo::model::{ModelStorage, ModelValueStorage};
use origami_token::components::token::erc20::erc20_balance::ERC20Balance;

#[dojo::interface]
trait IGoldToken {
    fn mint(ref self: ContractState, to: ContractAddress, amount: u256);
    fn transfer(ref self: ContractState, to: ContractAddress, amount: u256);
    fn balance_of(self: @ContractState, account: ContractAddress) -> u256;
}

#[dojo::contract]
mod gold_token {
    use super::IGoldToken;

    #[abi(embed_v0)]
    impl GoldTokenImpl of IGoldToken<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            let mut world = self.world_default();

            // Get current balance
            let mut balance: Gold = world.read_model(to);

            // Add amount
            balance.amount += amount;

            // Save
            world.write_model(@balance);

            // Emit event
            world.emit_event(@TokenMinted { to, amount });
        }

        fn transfer(
            ref self: ContractState,
            to: ContractAddress,
            amount: u256
        ) {
            let mut world = self.world_default();
            let from = get_caller_address();

            // Get balances
            let mut from_balance: Gold = world.read_model(from);
            let mut to_balance: Gold = world.read_model(to);

            // Check sufficient balance
            assert(from_balance.amount >= amount, 'insufficient balance');

            // Transfer
            from_balance.amount -= amount;
            to_balance.amount += amount;

            // Save
            world.write_model(@from_balance);
            world.write_model(@to_balance);

            // Emit event
            world.emit_event(@TokenTransferred { from, to, amount });
        }

        fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
            let world = self.world_default();
            let balance: Gold = world.read_model(account);
            balance.amount
        }
    }
}
```

### ERC20 With Origami

Using Origami components:
```cairo
use origami_token::components::token::erc20::erc20_balance::{
    ERC20Balance, ERC20BalanceTrait
};

#[dojo::contract]
mod gold_token {
    fn transfer(ref self: ContractState, to: ContractAddress, amount: u256) {
        let mut world = self.world_default();
        let from = get_caller_address();

        // Use Origami trait
        let mut from_balance: ERC20Balance = world.read_model(from);
        let mut to_balance: ERC20Balance = world.read_model(to);

        // Origami provides safe transfer
        from_balance.transfer(ref to_balance, amount);

        world.write_model(@from_balance);
        world.write_model(@to_balance);
    }
}
```

## ERC721 Implementation

### Basic ERC721 Model

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Weapon {
    #[key]
    pub token_id: u256,
    pub owner: ContractAddress,
    pub damage: u32,
    pub rarity: u8,
}
```

### ERC721 System

```cairo
#[dojo::interface]
trait IWeaponNFT {
    fn mint(ref self: ContractState, to: ContractAddress, damage: u32) -> u256;
    fn transfer(ref self: ContractState, to: ContractAddress, token_id: u256);
    fn owner_of(self: @ContractState, token_id: u256) -> ContractAddress;
}

#[dojo::contract]
mod weapon_nft {
    use super::IWeaponNFT;

    #[abi(embed_v0)]
    impl WeaponNFTImpl of IWeaponNFT<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, damage: u32) -> u256 {
            let mut world = self.world_default();

            // Generate unique token ID
            let token_id: u256 = world.uuid().into();

            // Create NFT
            let weapon = Weapon {
                token_id,
                owner: to,
                damage,
                rarity: calculate_rarity(damage),
            };

            world.write_model(@weapon);

            // Emit event
            world.emit_event(@NFTMinted { to, token_id });

            token_id
        }

        fn transfer(ref self: ContractState, to: ContractAddress, token_id: u256) {
            let mut world = self.world_default();
            let from = get_caller_address();

            // Get NFT
            let mut weapon: Weapon = world.read_model(token_id);

            // Check ownership
            assert(weapon.owner == from, 'not owner');

            // Transfer
            weapon.owner = to;
            world.write_model(@weapon);

            // Emit event
            world.emit_event(@NFTTransferred { from, to, token_id });
        }

        fn owner_of(self: @ContractState, token_id: u256) -> ContractAddress {
            let world = self.world_default();
            let weapon: Weapon = world.read_model(token_id);
            weapon.owner
        }
    }
}
```

## Token Patterns

### In-Game Currency (ERC20)

```cairo
// Gold token model
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Gold {
    #[key]
    pub player: ContractAddress,
    pub amount: u256,
}

// Award gold for completing quest
fn complete_quest(ref self: ContractState, player: ContractAddress) {
    let mut world = self.world_default();

    // Get current gold
    let mut gold: Gold = world.read_model(player);

    // Award 100 gold
    gold.amount += 100;

    world.write_model(@gold);
}

// Spend gold to buy item
fn buy_item(ref self: ContractState, item_id: u32) {
    let mut world = self.world_default();
    let player = get_caller_address();

    // Get gold balance
    let mut gold: Gold = world.read_model(player);

    // Check price
    let item_price = get_item_price(item_id);
    assert(gold.amount >= item_price, 'insufficient gold');

    // Deduct gold
    gold.amount -= item_price;
    world.write_model(@gold);

    // Give item
    give_item(player, item_id);
}
```

### Equipment NFTs (ERC721)

```cairo
// Weapon NFT model
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Weapon {
    #[key]
    pub token_id: u256,
    pub owner: ContractAddress,
    pub weapon_type: u8,  // 0=sword, 1=axe, 2=bow
    pub damage: u32,
    pub durability: u32,
}

// Craft new weapon
fn craft_weapon(ref self: ContractState, weapon_type: u8) -> u256 {
    let mut world = self.world_default();
    let player = get_caller_address();

    // Check materials
    require_materials(player, weapon_type);

    // Create weapon NFT
    let token_id = world.uuid().into();
    let weapon = Weapon {
        token_id,
        owner: player,
        weapon_type,
        damage: calculate_damage(weapon_type),
        durability: 100,
    };

    world.write_model(@weapon);
    token_id
}

// Equip weapon
fn equip_weapon(ref self: ContractState, token_id: u256) {
    let mut world = self.world_default();
    let player = get_caller_address();

    // Check ownership
    let weapon: Weapon = world.read_model(token_id);
    assert(weapon.owner == player, 'not owner');

    // Equip
    let mut equipment: Equipment = world.read_model(player);
    equipment.weapon_id = token_id;
    world.write_model(@equipment);
}
```

### Resource Tokens (ERC20)

```cairo
// Multiple resource types
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Resources {
    #[key]
    pub player: ContractAddress,
    pub wood: u256,
    pub stone: u256,
    pub iron: u256,
}

// Gather resources
fn gather(ref self: ContractState, resource_type: u8) {
    let mut world = self.world_default();
    let player = get_caller_address();

    let mut resources: Resources = world.read_model(player);

    match resource_type {
        0 => resources.wood += 10,
        1 => resources.stone += 10,
        2 => resources.iron += 5,
        _ => panic!("invalid resource"),
    }

    world.write_model(@resources);
}
```

## Token Events

```cairo
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct TokenMinted {
    pub to: ContractAddress,
    pub amount: u256,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct TokenTransferred {
    pub from: ContractAddress,
    pub to: ContractAddress,
    pub amount: u256,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct NFTMinted {
    pub to: ContractAddress,
    pub token_id: u256,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct NFTTransferred {
    pub from: ContractAddress,
    pub to: ContractAddress,
    pub token_id: u256,
}
```

## Best Practices

- Use Origami library for standard implementations
- Always check balances before transfers
- Emit events for all token operations
- Use u256 for token amounts (large numbers)
- Check ownership before NFT operations
- Consider approval mechanics for trading
- Test with edge cases (zero amounts, non-existent tokens)

## Testing Tokens

```cairo
#[test]
fn test_gold_transfer() {
    let mut world = spawn_test_world(...);

    // Mint gold to player1
    gold_token.mint(player1, 100);

    // Transfer to player2
    prank(world, player1);
    gold_token.transfer(player2, 50);

    // Check balances
    assert(gold_token.balance_of(player1) == 50, 'wrong sender balance');
    assert(gold_token.balance_of(player2) == 50, 'wrong receiver balance');
}

#[test]
fn test_weapon_nft() {
    let mut world = spawn_test_world(...);

    // Mint weapon to player1
    let token_id = weapon_nft.mint(player1, 50);

    // Check ownership
    assert(weapon_nft.owner_of(token_id) == player1, 'wrong owner');

    // Transfer to player2
    prank(world, player1);
    weapon_nft.transfer(player2, token_id);

    // Check new owner
    assert(weapon_nft.owner_of(token_id) == player2, 'transfer failed');
}
```

## Next Steps

After implementing tokens:
1. Test thoroughly with `dojo-test` skill
2. Deploy with `dojo-deploy` skill
3. Integrate with client (`dojo-client` skill)
4. Set up permissions (`dojo-world` skill)

## Related Skills

- **dojo-model**: Token models extend Dojo models
- **dojo-system**: Token logic in systems
- **dojo-test**: Test token operations
- **dojo-review**: Audit token implementation
