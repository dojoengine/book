# Interact with Katana on Starknet. Deploy a Cairo smart contract using Katana

Welcome to this tutorial where we'll guide you through deploying a raw cairo smart using katana as a local devnet. In order to accomplish this, we have to install the following tools.

## Install Starkli, Scarb and Katana

To install `Starkli`, open a new terminal.

```sh
curl https://get.starkli.sh | sh
starkliup
```

You can check your installation by running `starkli --version`, then you will get the starkli version.

To install `Scarb`

```sh
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

You can check your installation by running `scarb --version`, then you will get the starkli version.

To install `Katana`, use the `dojoup` installer from the command line:

```sh
curl -L https://install.dojoengine.org | bash
dojoup
```

You can check your installation by running `katana --version`, then you will get the katana version.

## Basics of Katana and Starkli

### katana sequencer

```console
katana --disable-fee
```

After starting Katana, a list of accounts will be automatically generated and deployed.

### Starkli built-in accounts and configuration

Starkli supports a list of built-in accounts for katana. These built-in accounts are for local development and no one should be using them for anything serious anyways. For example the address of the `Katana-0` built-in account is `0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03`. You can check the full list of account addresses [here](https://github.com/xJonathanLEI/starkli/blob/e9a28f1b6e37bcc9fc53b7b7130e935894856739/src/account.rs#L76).

We will need this `katana-0` built-in account later when we define our `STARKNET_ACCOUNT`. For more details about accounts, please refer to the [accounts](https://book.starkli.rs/accounts) section on the starkli book.

## Contract Deployment and Interaction

### Create a Simple Storage project

```sh
scarb new simple_storage
```

Add contract dependencies to scarb.toml

```toml
[dependencies]
starknet = "2.5.4"

[[target.starknet-contract]]
```

Copy the simple storage contract to lib.cairo

```rust
#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, x: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        stored_data: u128
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, x: u128) {
            self.stored_data.write(x);
        }
        fn get(self: @ContractState) -> u128 {
            self.stored_data.read()
        }
    }
}
```

### Compile contract and add environment variables

Compile your contract using scarb

```sh
scarb build
```

Having compiled the smart contract, it's time to declare it with Starkli and katana. For clean enviroment management, place the following environment variables in a .env file within the `src/` directory.

```sh
export STARKNET_ACCOUNT=katana-0        #A pre-funded account on the local development network.
export STARKNET_RPC=http://0.0.0.0:5050 #To specify the network, targeting the local katana devnet.
```

Then, ensure your project acknowledges the environment variables:

```sh
source .env
```

These settings significantly streamline `Starkli` command operations, ensuring a smoother and more efficient workflow.

### Declare contract

Make sure `Katana` is already running in separate terminal. Otherwise launch katana

```sh
katana --disable-fee
```

To declare your contract, execute:

```sh
starkli declare target/dev/simple_storage_SimpleStorage.contract_class.json
```

Upon successful command execution, you'll obtain a contract class hash: This unique hash serves as the identifier for your contract class within `Starknet`.

```console
Sierra compiler version not specified. Attempting to automatically decide version to use...
Unknown network. Falling back to the default compiler version 2.5.4. Use the --compiler-version flag to choose a different version.
Declaring Cairo 1 class: 0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306
Compiling Sierra class to CASM with compiler version 2.5.4...
CASM class hash: 0x016052cc70f7462306aa149bdf0e0df3aecb1876a9b05283d60c493c92aa03f4
Contract declaration transaction: 0x0555ba421c2aef3113f1a2d3866955b762191280092bb73956147f24a2d66aa6
Class hash declared: // [!code hl]
0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306 // [!code hl]
```

### Deploy contract

```sh
starkli deploy <class_hash_of_the_contract_to_be_deployed>
```

For this contract we did not specified a `constructor` function, thus we don't need to pass any constructor argument

```sh
starkli deploy 0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306
```

After running, expect an output similar to:

```console
Deploying class 0x07ad2516dd66fb2e274e78d4357837cad689c9fffaa347feb9800b231b37b306 with salt 0x02c93ad00ce6f894729baeafd1fd0456c5a5c540c1caa053ab5392f27ea8f130...
The contract will be deployed at address 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e
Contract deployment transaction: 0x06817bc837ce4df879fe903ca4700a860ce8165742bd74bdadf379618e89cccd
Contract deployed:
0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e
```

### Call contract [only read state]

The first parameter is the contract address, the second parameter is the function to be called.

```sh
starkli call 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e get
```

After running, expect an output similar to:

```console
[
    "0x0000000000000000000000000000000000000000000000000000000000000000"
]
```

It means the vale of `stored_data` is zero.

### Invoke contract [can write state]

The first parameter is the contract address, the second parameter is the function to be invoked, and the third parameter is the function parameter. Let's set the value of `stored_data` to 42.

```sh
starkli invoke 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e set 42
```

Let's retrieve the new value of `stored_data`

```sh
starkli call 0x03da69257a94a06a1101c1413d78551e38d91ca180c0fc26004650a427238f4e get
```

After running, expect an output similar to:

```console
[
    "0x000000000000000000000000000000000000000000000000000000000000002a"
]
```

Awesome you interacted a deployed a raw Cairo smart contract using katana! You can now build more complex smart contracts and interact with them using the same process.
