# Cairo Testing Cheat Codes: A Comprehensive Guide

The Cairo Testing Cheat Codes allow you to set and manipulate various execution context variables, such as block number, caller address, contract address, to test your contracts in different scenarios. In this guide, we will explore each cheat code in detail, providing explanations and examples to help you understand how to use them effectively in your tests.


1. `set_block_number`

This cheat code helps you set the current block number to the specified value, allowing you to simulate different block heights for testing purposes.

- Testing a contract's behavior at a specific block height, such as checking if a certain function is only callable after a certain block number.
- Simulating a fork or replay attack to test a contract's resilience.

```
use starknet::{testing, get_block_number};

testing::set_block_number(1234567);

get_block_nunmber(); // returns 1234567
```

2. `set_caller_address`

This cheat code helps you set the caller address to the provided contract address, enabling you to test contract interactions with different callers. This cheat code can be applied when:

- Testing a contract's access control mechanisms, such as only allowing certain addresses to call specific functions.
- Simulating a scenario where a contract is called by a different address.

```
use starknet::{testing, get_caller_address, contract_address_const};

let user_one = contract_address_const::<'user1'>();
testing::set_caller_address(user_one);
assert(get_caller_address() == user_one, 'bad caller';
```

3. `set_contract_address`

This cheat code helps you set the contract address to the provided value, allowing you to test contract deployment and interactions. You can apply this code when:

- Deploying a contract to a specific address for testing purposes.
- Testing a contract's behavior when deployed to a different address.

```
use starknet::{testing, get_contract_address};

const HUB_ADDRESS: ContractAddress = 0x05d17402d2d9b07fda1fe50570e6e13cdb019352a1be63b1be588e6e3087d08e;

testing::set_contract_address(HUB_ADDRESS);

get_contract_address(); // returns HUB_ADDRESS
```

4. `set_block_timestamp`

This cheat code helps you set the block timestamp to the specified value, allowing you to test contract behavior at different points in time. You can apply this code when:

- Testing a contract's behavior at a specific point in time, such as checking if a certain function is only callable during a certain time period.
- Simulating a scenario where a contract is deployed at a different point in time.

```
use starknet::{testing};

testing::set_block_timestamp(123456);

```

5. `set_version`

This cheat code helps one set the version to the provided value, enabling you to test contract behavior with different versions. You can apply this when:

- Testing a contract's behavior with different versions, such as checking if a certain function is only callable in a specific version.
- Simulating a scenario where a contract is upgraded to a different version.

```
use starknet::{testing};

testing::set_version('0.1.0');

```

6. `set_account_contract_address`

This cheat code helps you set the account contract address to the provided value, allowing you to test contract interactions with different account contracts. You can apply this when:

- Testing a contract's interaction with a specific account contract, such as a wallet contract.
- Simulating a scenario where a contract is called by a different account contract.

```
use starknet::{testing, get_account_contract_address};
use core::traits::{TryInto, Into};

const USER_ONE: felt252 = 'USER1';

testing::set_account_contract_address(USER_ONE.try_into().unwrap());


get_account_contract_address(); // returns USER_ONE.try_into().unwrap()
```

7. `set_max_fee`

This cheat code helps you set the maximum fee to the provided value, enabling you to test contract behavior with different fee structures. You can apply this when:

- Testing a contract's behavior with different fee structures, such as checking if a certain function is only callable with a specific fee.
- Simulating a scenario where a contract is deployed with a different fee structure.

```
use starknet::{testing};

testing::set_max_fee(123456);

```

8. `set_transaction_hash`

This cheat code helps one set the transaction hash to the provided value, allowing you to test contract behavior with different transaction hashes. You can apply this when:

- Testing a contract's behavior with different transaction hashes, such as checking if a certain function is only callable with a specific transaction hash.
- Simulating a scenario where a contract is called with a different transaction hash.

```
use starknet::{testing};

testing::set_transaction_hash('12345678');

```

9. `set_chain_id`

This cheat code helps one set the chain ID to the provided value, enabling you to test contract behavior on different chains. You can apply this when:

- Testing a contract's behavior on different chains, such as checking if a certain function is only callable on a specific chain.
- Simulating a scenario where a contract is deployed on a different chain.

```
use starknet::{testing};

testing::set_chain_id('test_chain_id');

```

10. `set_nonce`

This cheat code helps one set the nonce to the provided value, allowing you to test contract behavior with different nonces. You can apply this when:

- Testing a contract's behavior with different nonces, such as checking if a certain function is only callable with a specific nonce.
- Simulating a scenario where a contract is called with a different nonce.

```
use starknet::{testing, get_nonce};

testing::set_nonce('test_nonce');

get_nonce(); // returns 'test_nonce'

```

11. `set_signature`

This cheat code helps one set the signature to the provided value, enabling you to test contract behavior with different signatures. You can apply this when:

- Testing a contract's behavior with different signatures, such as checking if a certain function is only callable with a specific signature.
- Simulating a scenario where a contract is called with a different signature.

```
use starknet::{testing, get_signature};

testing::set_signature('signature');

get_signature(); // 'signature'

```

12. `set_block_hash`

This cheat code helps one set the block hash for a specific block number, allowing you to test contract behavior with different block hashes. You can apply this when:

- Testing a contract's behavior with different block hashes, such as checking if a certain function is only callable with a specific block hash.
- Simulating a scenario where a contract is deployed with a different block hash.

```
use starknet::{testing, get_block_hash};

testing::set_block_hash(12345678, 'value');

get_block_hash();

```

13. `pop_log_raw`

This cheat code helps one pop the earliest unpopped logged event for the contract, returning the event data and keys. You can apply this when:

- Testing a contract's logging mechanism, such as checking if a certain event is logged correctly.
- Debugging a contract's behavior by inspecting the logged events.

```
use starknet::{testing};
let contract_address = starknet::contract_address_const::<0x42>();

testing::pop_log_raw(contract_address);

```

14. `pop_log`

This cheat code helps one pop the earliest unpopped logged event for the contract as the requested type, deserializing the event data into the specified type. You can apply this when:

- Testing a contract's event handling mechanism, such as checking if a certain event is handled correctly.
- Debugging a contract's behavior by inspecting the handled events.

```
use starknet::{testing};
let contract_address = starknet::contract_address_const::<0x42>();

testing::pop_log(contract_address);

```

15. `pop_l2_to_l1_message`

This cheat code helps one pop the earliest unpopped L2 to L1 message for the contract, returning the message data and keys. You can apply this when:
-Testing a contract's L2 to L1 messaging mechanism, such as checking if a certain message is sent correctly.

- Debugging a contract's behavior by inspecting the sent messages.

```
use starknet::{testing};
let contract_address = starknet::contract_address_const::<0x42>();

testing::pop_l2_to_l1_message(contract_address)

```

In conclusion, the Cairo cheat codes provide a powerful toolset for testing and debugging Starknet contracts. By mastering these cheat codes, you can simulate various scenarios, test edge cases, and ensure the correctness of your contracts. Remember to use them wisely and in conjunction with other testing techniques to achieve comprehensive coverage. With this guide, you are now well-equipped to tackle complex testing challenges and build robust contracts on the Starknet network. Happy testing!

