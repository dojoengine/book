# Cartridge VRF Integration

Integrate Cartridge's Verifiable Random Function (VRF) for provably fair, atomic randomness in Dojo games.

## Overview

Cartridge VRF provides cheap, atomic verifiable randomness for fully onchain games. The VRF request and response are processed within the **same transaction**, enabling synchronous and immediate randomness.

## Contract Addresses

| Network | Contract Address |
|---------|-----------------|
| Mainnet | `0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f` |
| Sepolia | `0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f` |

## Installation

Add to your `Scarb.toml`:

```toml
[dependencies]
cartridge_vrf = { git = "https://github.com/cartridge-gg/vrf" }
```

## Cairo Integration

### 1. Import the VRF Provider

```cairo
use cartridge_vrf::IVrfProviderDispatcher;
use cartridge_vrf::IVrfProviderDispatcherTrait;
use cartridge_vrf::Source;
```

### 2. Define VRF Provider Address

```cairo
// Use the deployed VRF provider address
const VRF_PROVIDER_ADDRESS: felt252 = 0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f;
```

### 3. Consume Random Values

```cairo
#[dojo::contract]
mod game_system {
    use starknet::{ContractAddress, get_caller_address};
    use cartridge_vrf::{IVrfProviderDispatcher, IVrfProviderDispatcherTrait, Source};

    const VRF_PROVIDER_ADDRESS: felt252 = 0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f;

    #[abi(embed_v0)]
    impl GameImpl of IGame<ContractState> {
        fn roll_dice(ref self: ContractState) -> u8 {
            let vrf_provider = IVrfProviderDispatcher { 
                contract_address: VRF_PROVIDER_ADDRESS.try_into().unwrap() 
            };
            
            let player = get_caller_address();
            
            // Consume random value using player's nonce
            let random_value: felt252 = vrf_provider.consume_random(Source::Nonce(player));
            
            // Convert to dice roll (1-6)
            let random_u256: u256 = random_value.into();
            let dice_roll: u8 = (random_u256 % 6 + 1).try_into().unwrap();
            
            dice_roll
        }
    }
}
```

## Source Types

Two source types for randomness:

### `Source::Nonce(ContractAddress)`
- Uses the address's internal nonce
- Each request generates a unique seed
- **Recommended for most use cases**

```cairo
let random = vrf_provider.consume_random(Source::Nonce(player_address));
```

### `Source::Salt(felt252)`
- Uses a provided salt value
- Same salt = same random value
- Useful for deterministic scenarios

```cairo
let random = vrf_provider.consume_random(Source::Salt(game_id));
```

## Client-Side Integration (JavaScript/TypeScript)

When executing transactions that use VRF, prefix with `request_random`:

```typescript
import { Account, CallData } from "starknet";

const VRF_PROVIDER = "0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f";

async function rollDice(account: Account, gameContract: string) {
  const call = await account.execute([
    // First: request_random
    {
      contractAddress: VRF_PROVIDER,
      entrypoint: "request_random",
      calldata: CallData.compile({
        caller: gameContract,
        source: [0, account.address], // Source::Nonce(address)
      }),
    },
    // Then: your game action
    {
      contractAddress: gameContract,
      entrypoint: "roll_dice",
      calldata: [],
    },
  ]);
  
  return call;
}
```

### Using Dojo SDK

```typescript
import { buildVrfCalls } from "@cartridge/vrf";

const calls = await buildVrfCalls({
  account,
  call: {
    contractAddress: GAME_CONTRACT,
    entrypoint: "roll_dice",
    calldata: [],
  },
  vrfProviderAddress: VRF_PROVIDER,
});

await account.execute(calls);
```

## How It Works

1. Game calls `request_random(caller, source)` as **first call** in multicall
2. Game contract calls `consume_random(source)` internally
3. VRF server generates random value using VRF algorithm
4. Cartridge Paymaster wraps multicall with `submit_random` and `assert_consumed`
5. Proof verified onchain, random value immediately available
6. `assert_consumed` ensures `consume_random` was called and resets storage

## Testing with Mock Provider

For local development/testing, use the mock provider:

```cairo
#[dojo::contract]
mod vrf_provider_mock {
    use cartridge_vrf::PublicKey;
    use cartridge_vrf::vrf_provider::vrf_provider_component::VrfProviderComponent;
    use openzeppelin::access::ownable::OwnableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: VrfProviderComponent, storage: vrf_provider, event: VrfProviderEvent);

    #[abi(embed_v0)]
    impl VrfProviderImpl = VrfProviderComponent::VrfProviderImpl<ContractState>;

    #[storage]
    pub struct Storage {
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        vrf_provider: VrfProviderComponent::Storage,
    }

    fn dojo_init(ref self: ContractState, pubkey_x: felt252, pubkey_y: felt252) {
        self.ownable.initializer(starknet::get_caller_address());
        self.vrf_provider.initializer(PublicKey { x: pubkey_x, y: pubkey_y });
    }
}
```

## Common Patterns

### Random Number in Range

```cairo
fn random_in_range(random: felt252, min: u32, max: u32) -> u32 {
    let random_u256: u256 = random.into();
    let range = max - min + 1;
    let result: u32 = (random_u256 % range.into()).try_into().unwrap();
    result + min
}
```

### Weighted Random Selection

```cairo
fn weighted_random(random: felt252, weights: Span<u32>) -> u32 {
    let total_weight: u32 = weights.iter().sum();
    let random_u256: u256 = random.into();
    let threshold: u32 = (random_u256 % total_weight.into()).try_into().unwrap();
    
    let mut cumulative: u32 = 0;
    let mut i: u32 = 0;
    loop {
        cumulative += *weights.at(i);
        if cumulative > threshold {
            break i;
        }
        i += 1;
    }
}
```

### Shuffle Array (Fisher-Yates)

```cairo
fn shuffle<T, impl TCopy: Copy<T>, impl TDrop: Drop<T>>(
    ref arr: Array<T>,
    vrf_provider: IVrfProviderDispatcher,
    player: ContractAddress,
) {
    let mut i = arr.len();
    loop {
        if i <= 1 {
            break;
        }
        i -= 1;
        let random = vrf_provider.consume_random(Source::Nonce(player));
        let j: u32 = (random.into() % (i + 1).into()).try_into().unwrap();
        // Swap arr[i] and arr[j]
        let temp = *arr.at(i);
        arr.set(i, *arr.at(j));
        arr.set(j, temp);
    };
}
```

## Important Notes

- **Always** match `Source` in `request_random` and `consume_random`
- `consume_random` must be called within the same transaction
- The Paymaster handles proof submission automatically
- Works with Cartridge Controller out of the box

## Resources

- GitHub: https://github.com/cartridge-gg/vrf
- Voyager (Mainnet): https://voyager.online/contract/0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f
- Voyager (Sepolia): https://sepolia.voyager.online/contract/0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f
