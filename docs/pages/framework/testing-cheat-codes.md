# Cairo Testing Cheat Codes: A Comprehensive Guide

The Cairo Testing Cheat Codes allow you to set and manipulate various execution context variables, such as block number, caller address, contract address, to test your contracts in different scenarios. In this guide, we will explore each cheat code in detail, providing explanations and examples to help you understand how to use them effectively in your tests.

### Usage

1. `set_block_number`

This cheat code helps you set the current block number to the specified value, allowing you to simulate different block heights for testing purposes.

- Testing a contract's behavior at a specific block height, such as checking if a certain function is only callable after a certain block number.
- Simulating a fork or replay attack to test a contract's resilience.

```
// Set the block number to 100

set_block_number(100);
assert_eq!(get_block_number(), 100);

```

2. `set_caller_address`

This cheat code helps you set the caller address to the provided contract address, enabling you to test contract interactions with different callers. This cheat code can be applied when:

- Testing a contract's access control mechanisms, such as only allowing certain addresses to call specific functions.
- Simulating a scenario where a contract is called by a different address.

```
// Set the caller address to a specific contract address

let caller_address = ContractAddress::from([1, 2, 3]);
set_caller_address(caller_address);
assert_eq!(get_caller_address(), caller_address);

```

3. `set_contract_address`

This cheat code helps you set the contract address to the provided value, allowing you to test contract deployment and interactions. You can apply this code when:

- Deploying a contract to a specific address for testing purposes.
- Testing a contract's behavior when deployed to a different address.

```
// Set the contract address to a specific address

let contract_address = ContractAddress::from([4, 5, 6]);
set_contract_address(contract_address);
assert_eq!(get_contract_address(), contract_address);

```

4. `set_block_timestamp`

This cheat code helps you set the block timestamp to the specified value, allowing you to test contract behavior at different points in time. You can apply this code when:

- Testing a contract's behavior at a specific point in time, such as checking if a certain function is only callable during a certain time period.
- Simulating a scenario where a contract is deployed at a different point in time.

```
// Set the block timestamp to a specific value

set_block_timestamp(1643723419);
assert_eq!(get_block_timestamp(), 1643723419);

```

5. `set_version`

This cheat code helps one set the version to the provided value, enabling you to test contract behavior with different versions. You can apply this when:

- Testing a contract's behavior with different versions, such as checking if a certain function is only callable in a specific version.
- Simulating a scenario where a contract is upgraded to a different version.

```
// Set the version to a specific value

set_version(2);
assert_eq!(get_version(), 2);

```

6. `set_account_contract_address`

This cheat code helps you set the account contract address to the provided value, allowing you to test contract interactions with different account contracts. You can apply this when:

- Testing a contract's interaction with a specific account contract, such as a wallet contract.
- Simulating a scenario where a contract is called by a different account contract.

```
// Set the account contract address to a specific address

let account_contract_address = ContractAddress::from([10, 11, 12]);
set_account_contract_address(account_contract_address);
assert_eq!(get_account_contract_address(), account_contract_address);

```

7. `set_max_fee`

This cheat code helps you set the maximum fee to the provided value, enabling you to test contract behavior with different fee structures. You can apply this when:

- Testing a contract's behavior with different fee structures, such as checking if a certain function is only callable with a specific fee.
- Simulating a scenario where a contract is deployed with a different fee structure.

```
// Set the max fee to a specific value

set_max_fee(1000);
assert_eq!(get_max_fee(), 1000);

```

8. `set_transaction_hash`

This cheat code helps one set the transaction hash to the provided value, allowing you to test contract behavior with different transaction hashes. You can apply this when:

- Testing a contract's behavior with different transaction hashes, such as checking if a certain function is only callable with a specific transaction hash.
- Simulating a scenario where a contract is called with a different transaction hash.

```
// Set the transaction hash to a specific value

let transaction_hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_transaction_hash(transaction_hash);
assert_eq!(get_transaction_hash(), transaction_hash);

```

9. `set_chain_id`

This cheat code helps one set the chain ID to the provided value, enabling you to test contract behavior on different chains. You can apply this when:

- Testing a contract's behavior on different chains, such as checking if a certain function is only callable on a specific chain.
- Simulating a scenario where a contract is deployed on a different chain.

```
// Set the chain id to a specific value

set_chain_id(123);
assert_eq!(get_chain_id(), 123);

```

10. `set_nonce`

This cheat code helps one set the nonce to the provided value, allowing you to test contract behavior with different nonces. You can apply this when:

- Testing a contract's behavior with different nonces, such as checking if a certain function is only callable with a specific nonce.
- Simulating a scenario where a contract is called with a different nonce.

```
// Set the nonce to a specific value

set_nonce(5);
assert_eq!(get_nonce(), 5);

```

11. `set_signature`

This cheat code helps one set the signature to the provided value, enabling you to test contract behavior with different signatures. You can apply this when:

- Testing a contract's behavior with different signatures, such as checking if a certain function is only callable with a specific signature.
- Simulating a scenario where a contract is called with a different signature.

```
// Set the signature to a specific value

let signature = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_signature(signature);
assert_eq!(get_signature(), signature);

```

12. `set_block_hash`

This cheat code helps one set the block hash for a specific block number, allowing you to test contract behavior with different block hashes. You can apply this when:

- Testing a contract's behavior with different block hashes, such as checking if a certain function is only callable with a specific block hash.
- Simulating a scenario where a contract is deployed with a different block hash.

```
// Set the block hash to a specific value

let block_hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_block_hash(100, block_hash);
assert_eq!(get_block_hash(100), block_hash);

```

13. `pop_log_raw`

This cheat code helps one pop the earliest unpopped logged event for the contract, returning the event data and keys. You can apply this when:

- Testing a contract's logging mechanism, such as checking if a certain event is logged correctly.
- Debugging a contract's behavior by inspecting the logged events.

```
// Pop the earliest unpopped logged event for the contract

let log = pop_log_raw(ContractAddress::from([1, 2, 3]));
assert_eq!(log, Some(([1, 2, 3], [4, 5, 6])));

```

14. `pop_log`

This cheat code helps one pop the earliest unpopped logged event for the contract as the requested type, deserializing the event data into the specified type. You can apply this when:

- Testing a contract's event handling mechanism, such as checking if a certain event is handled correctly.
- Debugging a contract's behavior by inspecting the handled events.

```
// Pop the earliest unpopped logged event for the contract as a specific type

let event = pop_log<MyEvent>(ContractAddress::from([1, 2, 3]));
assert_eq!(event, Some(MyEvent { data: [4, 5, 6] }));

```

15. `pop_l2_to_l1_message`

This cheat code helps one pop the earliest unpopped L2 to L1 message for the contract, returning the message data and keys. You can apply this when:
-Testing a contract's L2 to L1 messaging mechanism, such as checking if a certain message is sent correctly.

- Debugging a contract's behavior by inspecting the sent messages.

```
// Pop the earliest unpopped L2 to L1 message for the contract

let message = pop_l2_to_l1_message(ContractAddress::from([1, 2, 3]));
assert_eq!(message, Some((1, [4, 5, 6])));

```

In conclusion, the Cairo cheat codes provide a powerful toolset for testing and debugging Starknet contracts. By mastering these cheat codes, you can simulate various scenarios, test edge cases, and ensure the correctness of your contracts. Remember to use them wisely and in conjunction with other testing techniques to achieve comprehensive coverage. With this guide, you are now well-equipped to tackle complex testing challenges and build robust contracts on the Starknet network. Happy testing!
