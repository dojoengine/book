# Cairo Testing Cheat Codes: A Comprehensive Guide

The Cairo Testing Cheat Codes allow you to set and manipulate various execution context variables, such as block number, caller address, contract address, to test your contracts in different scenarios. In this guide, we will explore each cheat code in detail, providing explanations and examples to help you understand how to use them effectively in your tests.

### Usage

pub extern fn cheatcode<const selector: felt252>(
    input: Span<felt252>
) -> Span<felt252> implicits() nopanic;

1. `set_block_number`

This cheat code helps you set the current block number to the specified value, allowing you to simulate different block heights for testing purposes.

- Testing a contract's behavior at a specific block height, such as checking if a certain function is only callable after a certain block number.
- Simulating a fork or replay attack to test a contract's resilience.

```
/// Set the block number to the provided value.

pub fn set_block_number(block_number: u64) {
    cheatcode::<'set_block_number'>([block_number.into()].span());
}

```

2. `set_caller_address`

This cheat code helps you set the caller address to the provided contract address, enabling you to test contract interactions with different callers. This cheat code can be applied when:

- Testing a contract's access control mechanisms, such as only allowing certain addresses to call specific functions.
- Simulating a scenario where a contract is called by a different address.

```
/// Set the caller address to a specific contract address.

pub fn set_caller_address(address: ContractAddress) {
    cheatcode::<'set_caller_address'>([address.into()].span());
}

```

3. `set_contract_address`

This cheat code helps you set the contract address to the provided value, allowing you to test contract deployment and interactions. You can apply this code when:

- Deploying a contract to a specific address for testing purposes.
- Testing a contract's behavior when deployed to a different address.

```
// Set the contract address to a specific address.

let contract_address = ContractAddress::from([4, 5, 6]);
set_contract_address(contract_address);
assert_eq!(get_contract_address(), contract_address);

```

4. `set_block_timestamp`

This cheat code helps you set the block timestamp to the specified value, allowing you to test contract behavior at different points in time. You can apply this code when:

- Testing a contract's behavior at a specific point in time, such as checking if a certain function is only callable during a certain time period.
- Simulating a scenario where a contract is deployed at a different point in time.

```
/// Set the block timestamp to a specific value.

pub fn set_block_timestamp(block_timestamp: u64) {
    cheatcode::<'set_block_timestamp'>([block_timestamp.into()].span());
}

```

5. `set_version`

This cheat code helps one set the version to the provided value, enabling you to test contract behavior with different versions. You can apply this when:

- Testing a contract's behavior with different versions, such as checking if a certain function is only callable in a specific version.
- Simulating a scenario where a contract is upgraded to a different version.

```
/// Set the version to the provided value.

pub fn set_version(version: felt252) {
    cheatcode::<'set_version'>([version].span());
}

```

6. `set_account_contract_address`

This cheat code helps you set the account contract address to the provided value, allowing you to test contract interactions with different account contracts. You can apply this when:

- Testing a contract's interaction with a specific account contract, such as a wallet contract.
- Simulating a scenario where a contract is called by a different account contract.

```
/// Set the account contract address.

pub fn set_account_contract_address(address: ContractAddress) {
    cheatcode::<'set_account_contract_address'>([address.into()].span());
}

```

7. `set_max_fee`

This cheat code helps you set the maximum fee to the provided value, enabling you to test contract behavior with different fee structures. You can apply this when:

- Testing a contract's behavior with different fee structures, such as checking if a certain function is only callable with a specific fee.
- Simulating a scenario where a contract is deployed with a different fee structure.

```
/// Set the max fee to a specific value.

pub fn set_max_fee(fee: u128) {
    cheatcode::<'set_max_fee'>([fee.into()].span());
}

```

8. `set_transaction_hash`

This cheat code helps one set the transaction hash to the provided value, allowing you to test contract behavior with different transaction hashes. You can apply this when:

- Testing a contract's behavior with different transaction hashes, such as checking if a certain function is only callable with a specific transaction hash.
- Simulating a scenario where a contract is called with a different transaction hash.

```
/// Set the transaction hash.

pub fn set_transaction_hash(hash: felt252) {
    cheatcode::<'set_transaction_hash'>([hash].span());
}

```

9. `set_chain_id`

This cheat code helps one set the chain ID to the provided value, enabling you to test contract behavior on different chains. You can apply this when:

- Testing a contract's behavior on different chains, such as checking if a certain function is only callable on a specific chain.
- Simulating a scenario where a contract is deployed on a different chain.

```
/// Set the chain id.

pub fn set_chain_id(chain_id: felt252) {
    cheatcode::<'set_chain_id'>([chain_id].span());
}

```

10. `set_nonce`

This cheat code helps one set the nonce to the provided value, allowing you to test contract behavior with different nonces. You can apply this when:

- Testing a contract's behavior with different nonces, such as checking if a certain function is only callable with a specific nonce.
- Simulating a scenario where a contract is called with a different nonce.

```
/// Set the nonce to a specific value.

pub fn set_nonce(nonce: felt252) {
    cheatcode::<'set_nonce'>([nonce].span());
}

```

11. `set_signature`

This cheat code helps one set the signature to the provided value, enabling you to test contract behavior with different signatures. You can apply this when:

- Testing a contract's behavior with different signatures, such as checking if a certain function is only callable with a specific signature.
- Simulating a scenario where a contract is called with a different signature.

```
/// Set the signature.

pub fn set_signature(signature: Span<felt252>) {
    cheatcode::<'set_signature'>(signature);
}

```

12. `set_block_hash`

This cheat code helps one set the block hash for a specific block number, allowing you to test contract behavior with different block hashes. You can apply this when:

- Testing a contract's behavior with different block hashes, such as checking if a certain function is only callable with a specific block hash.
- Simulating a scenario where a contract is deployed with a different block hash.

```
/// Set the block hash to a specific value.

pub fn set_block_hash(block_number: u64, value: felt252) {
    cheatcode::<'set_block_hash'>([block_number.into(), value].span());
};

```

13. `pop_log_raw`

This cheat code helps one pop the earliest unpopped logged event for the contract, returning the event data and keys. You can apply this when:

- Testing a contract's logging mechanism, such as checking if a certain event is logged correctly.
- Debugging a contract's behavior by inspecting the logged events.

```
/// Pop the earliest unpopped logged event for the contract.

pub fn pop_log_raw(address: ContractAddress) -> Option<(Span<felt252>, Span<felt252>)> {
    let mut log = cheatcode::<'pop_log'>([address.into()].span());
    Option::Some((Serde::deserialize(ref log)?, Serde::deserialize(ref log)?,))
}

```

14. `pop_log`

This cheat code helps one pop the earliest unpopped logged event for the contract as the requested type, deserializing the event data into the specified type. You can apply this when:

- Testing a contract's event handling mechanism, such as checking if a certain event is handled correctly.
- Debugging a contract's behavior by inspecting the handled events.

```
/// Pop the earliest unpopped logged event for the contract as a specific type.

pub fn pop_log<T, +starknet::Event<T>>(address: ContractAddress) -> Option<T> {
    let (mut keys, mut data) = pop_log_raw(address)?;
    starknet::Event::deserialize(ref keys, ref data)
}

```

15. `pop_l2_to_l1_message`

This cheat code helps one pop the earliest unpopped L2 to L1 message for the contract, returning the message data and keys. You can apply this when:
-Testing a contract's L2 to L1 messaging mechanism, such as checking if a certain message is sent correctly.

- Debugging a contract's behavior by inspecting the sent messages.

```
/// Pop the earliest unpopped L2 to L1 message for the contract.

pub fn pop_l2_to_l1_message(address: ContractAddress) -> Option<(felt252, Span<felt252>)> {
    let mut l2_to_l1_message = cheatcode::<'pop_l2_to_l1_message'>([address.into()].span());
    Option::Some(
        (Serde::deserialize(ref l2_to_l1_message)?, Serde::deserialize(ref l2_to_l1_message)?,)
    )
}

```

In conclusion, the Cairo cheat codes provide a powerful toolset for testing and debugging Starknet contracts. By mastering these cheat codes, you can simulate various scenarios, test edge cases, and ensure the correctness of your contracts. Remember to use them wisely and in conjunction with other testing techniques to achieve comprehensive coverage. With this guide, you are now well-equipped to tackle complex testing challenges and build robust contracts on the Starknet network. Happy testing!
