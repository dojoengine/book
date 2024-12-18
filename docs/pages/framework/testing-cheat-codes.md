---
title: Cairo Testing Cheat Codes
description: A comprehensive guide to using Cairo testing cheat codes for manipulating execution context in contract tests.
---

# Cairo Testing Cheat Codes: A Comprehensive Guide

The Cairo Testing Cheat Codes allow you to set and manipulate various execution context variables, such as block number, caller address, contract address, to test your contracts in different scenarios. In this guide, we will explore each cheat code in detail, providing explanations and examples to help you understand how to use them effectively in your tests.

## `set_block_number`

This cheat code helps you set the current block number to the specified value, allowing you to simulate different block heights for testing purposes.

This one is helpful to test a contract's behavior at a specific block height, such as checking if a certain function is only callable after a certain block number.

```rust
use starknet::{testing, get_block_number};

#[test]
fn f1() {
    testing::set_block_number(1234567);
    assert!(get_block_number() == 1234567, 'bad block number');
}

```

## `set_caller_address`

This cheat code helps you set the caller address to the provided contract address, enabling you to test contract interactions with different callers. This cheat code can be applied when:

-   Testing a contract's access control mechanisms, such as only allowing certain addresses to call specific functions.
-   Simulating a scenario where a contract is called by a different address.

```rust
use starknet::{testing, get_caller_address, contract_address_const};

#[test]
fn f2() {
    let user_one = contract_address_const::<'user1'>();
    testing::set_caller_address(user_one);
    assert(get_caller_address() == user_one, 'bad caller';
}
```

## `set_contract_address`

This cheat code helps you set the contract address to the provided value, allowing you to test contract deployment and interactions.

It is important to note that any test function is considered a contract, which by default uses the `0` address. Using `set_contract_address` allows you to mock the current address of the testing function, making it useful to call other contract that may use `get_caller_address`.

```rust
use starknet::{testing, get_contract_address, contract_address_const};

#[test]
fn f3() {
    const HUB_ADDRESS: ContractAddress = contract_address_const::<'hub'>()
    testing::set_contract_address(HUB_ADDRESS);
    assert(get_contract_address() == HUB_ADDRESS, 'BAD ADDRESS');
}
```

## `set_block_timestamp`

This cheat code helps you set the block timestamp to the specified value, allowing you to test contract behavior at different points in time. You can apply this code when:

-   Testing a contract's behavior at a specific point in time, such as checking if a certain function is only callable during a certain time period.
-   Simulating a scenario where a contract is deployed at a different point in time.

```rust
use starknet::{testing, get_block_timestamp};

#[test]
fn f4() {
    testing::set_block_timestamp(123456);
    assert(get_block_timestamp == 123456, 'bad timestamp');
}

```

## `set_version`

This cheat code helps one set the transcation version to the provided value.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f5() {
    testing::set_version('0.1.0');
    assert_eq!(get_tx_info().unbox().version, 1_felt252);
}

```

## `set_account_contract_address`

This cheat code helps you set the account contract address to the provided value, allowing you to test contract interactions with different account contracts. You can apply when simulating a scenario where a contract is called by a different account contract.

```rust
use starknet::{testing, get_tx_info, contract_address_const};

#[test]
fn f6() {
    const contract = contract_address_const::<'contract'>();
    testing::set_account_contract_address(contract);
    assert_eq!(get_tx_info().unbox().account_contract_address.into(), contract);
}

```

## `set_max_fee`

This cheat code helps you set the maximum fee to the provided value, enabling you to test contract behavior with different fee structures. You can apply this when:

-   Testing a contract's behavior with different fee structures, such as checking if a certain function is only callable with a specific fee.
-   Simulating a scenario where a contract is deployed with a different fee structure.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f7() {
    testing::set_max_fee(123456);
    assert_eq!(get_tx_info().unbox().max_fee.into(), 123456);
}

```

## `set_transaction_hash`

This cheat code helps one set the transaction hash to the provided value, allowing you to test contract behavior with different transaction hashes. You can apply this when:

-   Testing a contract's behavior with different transaction hashes, such as checking if a certain function is only callable with a specific transaction hash.
-   Simulating a scenario where a contract is called with a different transaction hash.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f8() {
    testing::set_transaction_hash('12345678');
    assert_eq!(get_tx_info().unbox().transcation_hash.into(), '12345678');
}

```

## `set_chain_id`

This cheat code helps one set the chain ID to the provided value, enabling you to test contract behavior on different chains. You can apply this when:

-   Testing a contract's behavior on different chains, such as checking if a certain function is only callable on a specific chain.
-   Simulating a scenario where a contract is deployed on a different chain.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f9() {
    testing::set_chain_id('test_chain_id');
    assert_eq!(get_tx_info().unbox().chain_id.into(), 'test_chain_id');
}

```

## `set_nonce`

This cheat code helps one set the nonce to the provided value, allowing you to test contract behavior with different nonces. You can apply this when:

-   Testing a contract's behavior with different nonces, such as checking if a certain function is only callable with a specific nonce.
-   Simulating a scenario where a contract is called with a different nonce.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f10() {
    testing::set_nonce('test_nonce');
    assert_eq!(get_tx_info().unbox().nonce(), 'test_nonce');
}

```

## `set_signature`

This cheat code helps one set the signature to the provided value, enabling you to test contract behavior with different signatures.

```rust
use starknet::{testing, get_tx_info};

#[test]
fn f11() {
    testing::set_signature(array!['r', 's'].span());
    let s = get_tx_info().unbox().signature;
    assert_eq!(*s[0], 'r');
    assert_eq!(*s[1], 's');
}

```

## `set_block_number`

This cheat code helps one set a specific block number, allowing you to test contract behavior with different block numbers.

```rust
use starknet::{testing, get_block_info};

#[test]
fn f12() {
    testing::set_block_number(12345678);
    assert_eq!(get_block_info().unbox().block_number, 12345678);
}

```

## `pop_log_raw`

This cheat code helps one pop the earliest unpopped logged event for the contract, returning the event data and keys.

```rust
use starknet::{testing};

#[test]
fn f13() {
    let contract_address = starknet::contract_address_const::<0x42>();
    let _log = testing::pop_log_raw(contract_address);
}

```

## `pop_log`

This cheat code helps one pop the earliest unpopped logged event for the contract as the requested type, deserializing the event data into the specified type. You can apply this when:

-   Testing a contract's event handling mechanism, such as checking if a certain event is handled correctly.
-   Debugging a contract's behavior by inspecting the handled events.

```rust
use starknet::{testing, get_caller_address};
use core::starknet::SyscallResultTrait;

#[starknet::interface]
pub trait IContract<T> {
    fn post(ref self: T);
}

#[event]
#[derive(Drop, starknet::Event)]
pub enum Event {
    Post: Post,
}

#[derive(Drop, starknet::Event)]
pub struct Post {
    post_id: u256,
    transaction_executor: ContractAddress,
    block_timestamp: u64,
}

#[starknet::contract]
pub mod my_contract {
    #[abi(embed_v0)]
    impl IContractImpl of IContract<ContractState> {
        fn post(ref self: ContractState) {
            starknet::emit(
                Post {
                       post_id: pub_id_assigned,
                       transaction_executor: get_caller_address(),
                       block_timestamp: get_block_timestamp(),
                   }
            );
        }
    }
}

#[test]
fn f14() {
    let (contract_address, _) = starknet::syscalls::deploy_syscall(
        my_contract::TEST_CLASS_HASH.try_into().unwrap(), 0, calldata, false
    )
        .unwrap();
    let dispatcher = IContractDispatcher { contract_address };
    dispatcher.post();
    let _log = testing::pop_log::<Post>(contract_address);
}

```

## `pop_l2_to_l1_message`

This cheat code helps one pop the earliest unpopped L2 to L1 message for the contract, returning the message data and keys. You can apply this when:
-Testing a contract's L2 to L1 messaging mechanism, such as checking if a certain message is sent correctly.

-   Debugging a contract's behavior by inspecting the sent messages.

```rust
use starknet::{testing};

#[test]
fn f15() {
    let contract_address = starknet::contract_address_const::<0x42>();
    let _msg = testing::pop_l2_to_l1_message(contract_address);
}

```

In conclusion, the Cairo cheat codes provide a powerful toolset for testing and debugging Starknet contracts. By mastering these cheat codes, you can simulate various scenarios, test edge cases, and ensure the correctness of your contracts. Remember to use them wisely and in conjunction with other testing techniques to achieve comprehensive coverage. With this guide, you are now well-equipped to tackle complex testing challenges and build robust contracts on the Starknet network. Happy testing!
