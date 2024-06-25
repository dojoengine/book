# Cairo Testing Cheat Codes: A Comprehensive Guide

The Cairo Testing Cheat Codes allow you to set and manipulate various parameters, such as block number, caller address, contract address, to test your contracts in different scenarios. In this guide, we will explore each cheat code in detail, providing explanations and examples to help you understand how to use them effectively in your tests.

Here is a breakdown of the cheat codes, along with their explanations and examples.

1. `set_block_number`: this cheat code helps one set the current block number to the specified value, allowing one to simulate different block heights for testing purposes. You can apply this cheat code when:

- Testing a contract's behavior at a specific block height, such as checking if a certain function is only callable after a certain block number.
- Simulating a fork or replay attack to test a contract's resilience.

#### Example:

```
(a) set_block_number(10),


(b) Set the block number to 100 and perform some assertions;
set_block_number(100);
assert_eq!(get_block_number(), 100);.


```

2. `set_caller_address`: this cheat code helps one set the caller address to the provided contract address, enabling you to test contract interactions with different callers. You can apply this cheat code when:

- Testing a contract's access control mechanisms, such as only allowing certain addresses to call specific functions.
- Simulating a scenario where a contract is called by a different address, such as a multisig wallet.

#### Example:

```
(a) `set_caller_address(ContractAddress::from([1, 2, 3]));`

(b) Set the caller address to a specific contract address;
let caller_address = ContractAddress::from([1, 2, 3]);
set_caller_address(caller_address);
assert_eq!(get_caller_address(), caller_address);
```

3. `set_contract_address`: this cheat code helps one set the contract address to the provided value, allowing you to test contract deployment and interactions. You can apply this code when:

- Deploying a contract to a specific address for testing purposes.
- Testing a contract's behavior when deployed to a different address.

#### Example:

```
(a) `set_contract_address(ContractAddress::from([4, 5, 6]));`

(b) Set the contract address to a specific address;
let contract_address = ContractAddress::from([4, 5, 6]);
set_contract_address(contract_address);
assert_eq!(get_contract_address(), contract_address);
```

4. `set_sequencer_address`: this cheat code helps one set the sequencer address to the provided value, enabling you to test contract interactions with different sequencers. You can apply this code when:

- Testing a contract's interaction with a specific sequencer, such as a decentralized oracle.
- Simulating a scenario where a contract is called by a different sequencer.

#### Examples:

```
(a) `set_sequencer_address(ContractAddress::from([7, 8, 9]));`

(b) Set the sequencer address to a specific address;
let sequencer_address = ContractAddress::from([7, 8, 9]);
set_sequencer_address(sequencer_address);
assert_eq!(get_sequencer_address(), sequencer_address);
```

5. `set_block_timestamp`: this cheat code helps one set the block timestamp to the specified value, allowing you to test contract behavior at different points in time. You can apply this code when:

- Testing a contract's behavior at a specific point in time, such as checking if a certain function is only callable during a certain time period.
- Simulating a scenario where a contract is deployed at a different point in time.

#### Examples:

```
(a) `set_block_timestamp(100);`

(b) Set the block timestamp to a specific value;
set_block_timestamp(1643723419);
assert_eq!(get_block_timestamp(), 1643723419);
```

6. `set_version`: this cheat code helps one set the version to the provided value, enabling you to test contract behavior with different versions. You can apply this when:

- Testing a contract's behavior with different versions, such as checking if a certain function is only callable in a specific version.
- Simulating a scenario where a contract is upgraded to a different version.

#### Examples:

```
(a) `set_version(1);`

(b) Set the version to a specific value;
set_version(2);
assert_eq!(get_version(), 2);
```

7. `set_account_contract_address`: this cheat code helps one set the account contract address to the provided value, allowing you to test contract interactions with different account contracts. You can apply this when:

- Testing a contract's interaction with a specific account contract, such as a wallet contract.
- Simulating a scenario where a contract is called by a different account contract.

#### Examples:

```
(a) `set_account_contract_address(ContractAddress::from([10, 11, 12]));`

(b) Set the account contract address to a specific address;
let account_contract_address = ContractAddress::from([10, 11, 12]);
set_account_contract_address(account_contract_address);
assert_eq!(get_account_contract_address(), account_contract_address);
```

8. `set_max_fee`: this cheat code helps one set the maximum fee to the provided value, enabling you to test contract behavior with different fee structures. You can apply this when:

- Testing a contract's behavior with different fee structures, such as checking if a certain function is only callable with a specific fee.
- Simulating a scenario where a contract is deployed with a different fee structure.

#### Examples:

```
(a) `set_max_fee(1000000000000000000) sets the maximum fee to 1 ETH.

(b) Set the max fee to a specific value;
set_max_fee(1000);
assert_eq!(get_max_fee(), 1000);
```

9. `set_transaction_hash`: this cheat code helps one set the transaction hash to the provided value, allowing you to test contract behavior with different transaction hashes. You can apply this when:

- Testing a contract's behavior with different transaction hashes, such as checking if a certain function is only callable with a specific transaction hash.
- Simulating a scenario where a contract is called with a different transaction hash.

#### Examples:

```
(a) `set_transaction_hash(123456789);`

(b) Set the transaction hash to a specific value;
let transaction_hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_transaction_hash(transaction_hash);
assert_eq!(get_transaction_hash(), transaction_hash);
```

10. `set_chain_id`: this cheat code helps one set the chain ID to the provided value, enabling you to test contract behavior on different chains. You can apply this when:

- Testing a contract's behavior on different chains, such as checking if a certain function is only callable on a specific chain.
- Simulating a scenario where a contract is deployed on a different chain.

#### Examples:

```
(a) `set_chain_id(0x01) sets the chain ID to 1.`

(b) Set the chain id to a specific value;
set_chain_id(123);
assert_eq!(get_chain_id(), 123);
```

11. `set_nonce`: this cheat code helps one set the nonce to the provided value, allowing you to test contract behavior with different nonces. You can apply this when:

- Testing a contract's behavior with different nonces, such as checking if a certain function is only callable with a specific nonce.
- Simulating a scenario where a contract is called with a different nonce.

#### Examples:

```
(a) `set_nonce(1);`
(b) Set the nonce to a specific value;
set_nonce(5);
assert_eq!(get_nonce(), 5);
```

12. `set_signature`: this cheat code helps one set the signature to the provided value, enabling you to test contract behavior with different signatures. You can apply this when:

- Testing a contract's behavior with different signatures, such as checking if a certain function is only callable with a specific signature.
- Simulating a scenario where a contract is called with a different signature.

#### Examples:

```
(a) `set_signature([1, 2, 3]);`

(b) Set the signature to a specific value;
let signature = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_signature(signature);
assert_eq!(get_signature(), signature);
```

13. `set_block_hash`: this cheat code helps one set the block hash for a specific block number, allowing you to test contract behavior with different block hashes. You can apply this when:

- Testing a contract's behavior with different block hashes, such as checking if a certain function is only callable with a specific block hash.
- Simulating a scenario where a contract is deployed with a different block hash.

#### Examples:

```
(a) `set_block_hash(123, 0x...BlockHash...) sets the block hash for block number 123.`

(b) Set the block hash to a specific value;
let block_hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
set_block_hash(100, block_hash);
assert_eq!(get_block_hash(100), block_hash);
```

14. `pop_log_raw`: this cheat code helps one pop the earliest unpopped logged event for the contract, returning the event data and keys. You can apply this when:

- Testing a contract's logging mechanism, such as checking if a certain event is logged correctly.
- Debugging a contract's behavior by inspecting the logged events.

#### Examples:

```
(a) `let (keys, data) = pop_log_raw(0x...ContractAddress...)?; pops the earliest logged event for the contract.`

(b) Pop the earliest unpopped logged event for the contract;
let log = pop_log_raw(ContractAddress::from([1, 2, 3]));
assert_eq!(log, Some(([1, 2, 3], [4, 5, 6])));
```

15. `pop_log`: this cheat code helps one pop the earliest unpopped logged event for the contract as the requested type, deserializing the event data into the specified type. You can apply this when:

- Testing a contract's event handling mechanism, such as checking if a certain event is handled correctly.
- Debugging a contract's behavior by inspecting the handled events.

#### Examples:

```
(a)let event = pop_log<MyEvent, starknet::Event<MyEvent>>(0x...ContractAddress...)?; pops the earliest logged event for the contract as a MyEvent type.

(b) Pop the earliest unpopped logged event for the contract as a specific type;
let event = pop_log<MyEvent>(ContractAddress::from([1, 2, 3]));
assert_eq!(event, Some(MyEvent { data: [4, 5, 6] })
```

16. `pop_l2_to_l1_message`: this cheat code helps one pop the earliest unpopped L2 to L1 message for the contract, returning the message data and keys. You can apply this when:
    -Testing a contract's L2 to L1 messaging mechanism, such as checking if a certain message is sent correctly.

- Debugging a contract's behavior by inspecting the sent messages.

#### Examples:

```
(a) pop_l2_to_l1_message(address: ContractAddress) -> Option<(felt252, Span<felt252>)>:

(b) Pop the earliest unpopped L2 to L1 message for the contract;
let message = pop_l2_to_l1_message(ContractAddress::from([1, 2, 3]));
assert_eq!(message, Some((1, [4, 5, 6])));
```

In conclusion, the Cairo cheat codes provide a powerful toolset for testing and debugging Starknet contracts. By mastering these cheat codes, you can simulate various scenarios, test edge cases, and ensure the correctness of your contracts. Remember to use them wisely and in conjunction with other testing techniques to achieve comprehensive coverage. With this guide, you are now well-equipped to tackle complex testing challenges and build robust contracts on the Starknet network. Happy testing!
