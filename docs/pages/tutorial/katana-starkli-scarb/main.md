# Deploy your Cairo smart contract using Katana: Advanced Tutorial

_Before starting recommend following the [`Interact with katana`](/toolchain/katana/interact.md) chapter to gain a basic understanding of katana, starkli and scarb._

## Contract Deployment and Interaction

### Create a Vote project

```bash
scarb new vote
```

Add contract dependencies to scarb.toml

```toml
[dependencies]
starknet = "2.5.4"

[[target.starknet-contract]]
```

Copy the vote contract to lib.cairo

```rust,ignore
/// @dev Core Library Imports for the Traits outside the Starknet Contract
use starknet::ContractAddress;

/// @dev Trait defining the functions that can be implemented or called by the Starknet Contract
#[starknet::interface]
trait VoteTrait<T> {
    /// @dev Function that returns the current vote status
    fn get_vote_status(self: @T) -> (u8, u8, u8, u8);
    /// @dev Function that checks if the user at the specified address is allowed to vote
    fn voter_can_vote(self: @T, user_address: ContractAddress) -> bool;
    /// @dev Function that checks if the specified address is registered as a voter
    fn is_voter_registered(self: @T, address: ContractAddress) -> bool;
    /// @dev Function that allows a user to vote
    fn vote(ref self: T, vote: u8);
}

/// @dev Starknet Contract allowing three registered voters to vote on a proposal
#[starknet::contract]
mod Vote {
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    const YES: u8 = 1_u8;
    const NO: u8 = 0_u8;

    /// @dev Structure that stores vote counts and voter states
    #[storage]
    struct Storage {
        yes_votes: u8,
        no_votes: u8,
        can_vote: LegacyMap::<ContractAddress, bool>,
        registered_voter: LegacyMap::<ContractAddress, bool>,
    }

    /// @dev Contract constructor initializing the contract with a list of registered voters and 0 vote count
    #[constructor]
    fn constructor(
        ref self: ContractState,
        voter_1: ContractAddress,
        voter_2: ContractAddress,
        voter_3: ContractAddress
    ) {
        // Register all voters by calling the _register_voters function
        self._register_voters(voter_1, voter_2, voter_3);

        // Initialize the vote count to 0
        self.yes_votes.write(0_u8);
        self.no_votes.write(0_u8);
    }

    /// @dev Event that gets emitted when a vote is cast
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        VoteCast: VoteCast,
        UnauthorizedAttempt: UnauthorizedAttempt,
    }

    /// @dev Represents a vote that was cast
    #[derive(Drop, starknet::Event)]
    struct VoteCast {
        voter: ContractAddress,
        vote: u8,
    }

    /// @dev Represents an unauthorized attempt to vote
    #[derive(Drop, starknet::Event)]
    struct UnauthorizedAttempt {
        unauthorized_address: ContractAddress,
    }

    /// @dev Implementation of VoteTrait for ContractState
    #[abi(embed_v0)]
    impl VoteImpl of super::VoteTrait<ContractState> {
        /// @dev Returns the voting results
        fn get_vote_status(self: @ContractState) -> (u8, u8, u8, u8) {
            let (n_yes, n_no) = self._get_voting_result();
            let (yes_percentage, no_percentage) = self._get_voting_result_in_percentage();
            (n_yes, n_no, yes_percentage, no_percentage)
        }

        /// @dev Check whether a voter is allowed to vote
        fn voter_can_vote(self: @ContractState, user_address: ContractAddress) -> bool {
            self.can_vote.read(user_address)
        }

        /// @dev Check whether an address is registered as a voter
        fn is_voter_registered(self: @ContractState, address: ContractAddress) -> bool {
            self.registered_voter.read(address)
        }

        /// @dev Submit a vote
        fn vote(ref self: ContractState, vote: u8) {
            assert(vote == NO || vote == YES, 'VOTE_0_OR_1');
            let caller: ContractAddress = get_caller_address();
            self._assert_allowed(caller);
            self.can_vote.write(caller, false);

            if (vote == NO) {
                self.no_votes.write(self.no_votes.read() + 1_u8);
            }
            if (vote == YES) {
                self.yes_votes.write(self.yes_votes.read() + 1_u8);
            }

            self.emit(VoteCast { voter: caller, vote: vote, });
        }
    }

    /// @dev Internal Functions implementation for the Vote contract
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        /// @dev Registers the voters and initializes their voting status to true (can vote)
        fn _register_voters(
            ref self: ContractState,
            voter_1: ContractAddress,
            voter_2: ContractAddress,
            voter_3: ContractAddress
        ) {
            self.registered_voter.write(voter_1, true);
            self.can_vote.write(voter_1, true);

            self.registered_voter.write(voter_2, true);
            self.can_vote.write(voter_2, true);

            self.registered_voter.write(voter_3, true);
            self.can_vote.write(voter_3, true);
        }
    }

    /// @dev Asserts implementation for the Vote contract
    #[generate_trait]
    impl AssertsImpl of AssertsTrait {
        // @dev Internal function that checks if an address is allowed to vote
        fn _assert_allowed(ref self: ContractState, address: ContractAddress) {
            let is_voter: bool = self.registered_voter.read((address));
            let can_vote: bool = self.can_vote.read((address));

            if (can_vote == false) {
                self.emit(UnauthorizedAttempt { unauthorized_address: address, });
            }

            assert(is_voter == true, 'USER_NOT_REGISTERED');
            assert(can_vote == true, 'USER_ALREADY_VOTED');
        }
    }

    /// @dev Implement the VotingResultTrait for the Vote contract
    #[generate_trait]
    impl VoteResultFunctionsImpl of VoteResultFunctionsTrait {
        // @dev Internal function to get the voting results (yes and no vote counts)
        fn _get_voting_result(self: @ContractState) -> (u8, u8) {
            let n_yes: u8 = self.yes_votes.read();
            let n_no: u8 = self.no_votes.read();

            (n_yes, n_no)
        }

        // @dev Internal function to calculate the voting results in percentage
        fn _get_voting_result_in_percentage(self: @ContractState) -> (u8, u8) {
            let n_yes: u8 = self.yes_votes.read();
            let n_no: u8 = self.no_votes.read();

            let total_votes: u8 = n_yes + n_no;

            if (total_votes == 0_u8) {
                return (0, 0);
            }
            let yes_percentage: u8 = (n_yes * 100_u8) / (total_votes);
            let no_percentage: u8 = (n_no * 100_u8) / (total_votes);

            (yes_percentage, no_percentage)
        }
    }
}
```

### Compile contract and Environment variables setup

Compile your contract using scarb

```bash
scarb build
```

Place the following environment variables in a .env file within the `src/` directory.

```bash
export STARKNET_ACCOUNT=katana-0        #A pre-funded account on the local development network.
export STARKNET_RPC=http://0.0.0.0:5050 #To specify the network, targeting the local katana devnet.
```

Then, ensure your project acknowledges the environment variables:

```bash
source .env
```

### Declare contract

Make sure Katana is already running in separate terminal. Otherwise launch katana

```bash
katana --disable-fee
```

To declare your contract, execute:

```bash
starkli declare target/dev/vote_Vote.contract_class.json
```

Upon successful command execution, you'll obtain a contract class hash: This unique hash serves as the identifier for your contract class within Starknet. For example:

```console
Class hash declared: 0x071092406ababbba5573bbff0074b068aaeb48c9a67ec66abe982ab19bc6997b
```

### Deploy contract

```bash
starkli deploy <class_hash_of_the_contract_to_be_deployed> <voter_0_address> <voter_1_address> <voter_2_address>
```

There are four hexadecimal numbers in total. The first one is the class_hash of the contract, and the next three are the vote account addresses. We can define that the first vote account address corresponds to the address of `katana-0`, while the second and third vote account addresses are associated with `katana-1` and `katana-2`, respectively. Check the list of built-in accounts [here](https://github.com/xJonathanLEI/starkli/blob/e9a28f1b6e37bcc9fc53b7b7130e935894856739/src/account.rs#L76).

```bash
starkli deploy 0x071092406ababbba5573bbff0074b068aaeb48c9a67ec66abe982ab19bc6997b 0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03 0x2d71e9c974539bb3ffb4b115e66a23d0f62a641ea66c4016e903454c8753bbc 0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114
```

After running, expect an output similar to:

```console
Deploying class 0x071092406ababbba5573bbff0074b068aaeb48c9a67ec66abe982ab19bc6997b with salt 0x04baae9a396c3ce27a45b201528ec13b366c25960d640a9a32a8736814d9d8c2...
The contract will be deployed at address 0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15
Contract deployment transaction: 0x071d6b51e52febfaf2e3ed7dbbf1416190f019d80c73b1bf707d375374ab7cc5
Contract deployed:
0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15
```

### Call contract [only read state]

The first parameter is the contract address, the second parameter is the function to be called, and the third parameter is the function parameter. Let's pass the address of `Katana-0` account

```bash
starkli call 0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15 voter_can_vote 0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03
```

After running, expect an output similar to:

```console
[
    "0x0000000000000000000000000000000000000000000000000000000000000001"
]
```

`1` means this user address can vote.

### Invoke contract [can write state]

The first parameter is the contract address, the second parameter is the function to be invoked, and the third parameter is the function parameter. Let's vote `Yes` with `katana-0` user

```bash
starkli invoke 0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15 vote 1
```

Now let's vote `No` with `katana-1` user

```bash
starkli invoke 0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15 vote 0 --account katana-1
```

Let's try to vote again with `katana-0` user

```bash
starkli invoke 0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15 vote 0
```

Since the same user/signer cannot vote repeatedly Katana will report an error.

```console
Transaction execution error: "Error in the called contract (0x06162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03):
Error at pc=0:4573:
Got an exception while executing a hint: Hint Error: Execution failed. Failure reason: 0x555345525f414c52454144595f564f544544 ('USER_ALREADY_VOTED').
Cairo traceback (most recent call last):
Unknown location (pc=0:67)
Unknown location (pc=0:1835)
Unknown location (pc=0:2478)
Unknown location (pc=0:3255)
Unknown location (pc=0:3795)

Error in the called contract (0x02c44f2d396fc5f9caa551e8c1d901d943a3b8cc5c433c88a1bf10b1f15fcd15):
Execution failed. Failure reason: 0x555345525f414c52454144595f564f544544 ('USER_ALREADY_VOTED').
```

7. Query transaction

```bash
### starkli transaction <TRANSACTION_HASH>
starkli transaction 0x071d6b51e52febfaf2e3ed7dbbf1416190f019d80c73b1bf707d375374ab7cc5
```

All the above interaction processes can be seen on the katana client. Pay attention to the status changes of katana at each step.
