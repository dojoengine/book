---
title: Introduction to Katana
description: Overview of Katana, a high-performance Starknet sequencer designed for both local development and production deployments, featuring JSON-RPC support and cross-layer communication.
---

**Source: index.md**

![katana](/katana-icon-word.png)

Katana is a _blazingly fast_ Starknet sequencer, designed to support both local development as well as production deployments.

In development mode, Katana provides the tool necessary for rapid iteration, including custom development RPCs for manipulating the execution context.

In production mode, Katana provides a high performance sequencer optimized for gaming workloads, with support for settlment and cross layer communication.

## Features highlight

-   [Starknet JSON-RPC v0.7.1](https://github.com/starkware-libs/starknet-specs/tree/v0.7.1) support
-   Cross layer communication (L1 <> L2, LN <> LN+1)
-   Development RPC methods for manipulating the blockchain states
-   State forking
-   Highly configurable

## System Requirements

```sh
Katana requires glibc version 2.33 or higher. This version is not available on Ubuntu 20.04 LTS, Debian 10 Buster, CentOS 7, and their older versions. To successfully install Dojo, you need to use a newer version of these operating systems.
```

## Installation

`katana` binary is available via [`dojoup`](/installation.mdx).

### Installing from source

If you would like to install `katana` from source, you can clone the Dojo repository locally and install it using [`cargo`](https://doc.rust-lang.org/cargo/).

```sh
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./bin/katana --locked --force
```

## Usage

You can run Katana without any arguments to start the sequencer with default settings.

```console
$ katana
```

```console


██╗  ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗ █████╗
██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗
█████╔╝ ███████║   ██║   ███████║██╔██╗ ██║███████║
██╔═██╗ ██╔══██║   ██║   ██╔══██║██║╚██╗██║██╔══██║
██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝


PREDEPLOYED CONTRACTS
==================

| Contract        | Fee Token
| Address         | 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
| Class Hash      | 0x02a8846878b6ad1f54f6ba46f5f40e11cee755c677f130b2c4b60566c9003f1f

| Contract        | Universal Deployer
| Address         | 0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf
| Class Hash      | 0x07b3e05f48f0c69e4a65ce5e076a66271a527aff2c34ce1083ec6e1526997a69

| Contract        | Account Contract
| Class Hash      | 0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c


PREFUNDED ACCOUNTS
==================

| Account address |  0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca
| Private key     |  0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a
| Public key      |  0x640466ebd2ce505209d3e5c4494b4276ed8f1cde764d757eb48831961f7cdea

| Account address |  0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a
| Private key     |  0x14d6672dcb4b77ca36a887e9a11cd9d637d5012468175829e9c6e770c61642
| Public key      |  0x16e375df37a7653038bd9eccd767e780c2c4d4c66b4c85f455236a3fd75673a

| Account address |  0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af
| Private key     |  0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912
| Public key      |  0x33246ce85ebdc292e6a5c5b4dd51fab2757be34b8ffda847ca6925edf31cb67

| Account address |  0x2d71e9c974539bb3ffb4b115e66a23d0f62a641ea66c4016e903454c8753bbc
| Private key     |  0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b
| Public key      |  0x4c0f884b8e5b4f00d97a3aad26b2e5de0c0c76a555060c837da2e287403c01d

| Account address |  0x3ebb4767aae1262f8eb28d9368db5388cfe367f50552a8244123506f0b0bcca
| Private key     |  0x3e3979c1ed728490308054fe357a9f49cf67f80f9721f44cc57235129e090f4
| Public key      |  0x1e8965b7d0b20b91a62fe515dd991dc9fcb748acddf6b2cf18cec3bdd0f9f9a

| Account address |  0x541da8f7f3ab8247329d22b3987d1ffb181bc8dc7f9611a6eccec3b0749a585
| Private key     |  0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8
| Public key      |  0x570258e7277eb345ab80803c1dc5847591efd028916fc826bc7cd47ccd8f20d

| Account address |  0x56c155b624fdf6bfc94f7b37cf1dbebb5e186ef2e4ab2762367cd07c8f892a1
| Private key     |  0x6bf3604bcb41fed6c42bcca5436eeb65083a982ff65db0dc123f65358008b51
| Public key      |  0x4b076e402835913e3f6812ed28cef8b757d4643ebf2714471a387cb10f22be3

| Account address |  0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03
| Private key     |  0x1800000000300000180000000000030000000000003006001800006600
| Public key      |  0x2b191c2f3ecf685a91af7cf72a43e7b90e2e41220175de5c4f7498981b10053

| Account address |  0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a
| Private key     |  0x283d1e73776cd4ac1ac5f0b879f561bded25eceb2cc589c674af0cec41df441
| Public key      |  0x73c8a29ba0e6a368422d0551b3f45a30a27166b809ba07a41a1bc434b000ba7

| Account address |  0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114
| Private key     |  0x1c9053c053edf324aec366a34c6901b1095b07af69495bffec7d7fe21effb1b
| Public key      |  0x4c339f18b9d1b95b64a6d378abd1480b2e0d5d5bd33cd0828cbce4d65c27284


ACCOUNTS SEED
=============
0


🚀 JSON-RPC server started: http://0.0.0.0:5050

```

## Quick Tutorial: Deploy a Smart Contract

**Source: interact.md**

Welcome to this tutorial where we'll guide you through deploying a raw cairo smart using katana as a local devnet. In order to accomplish this, we have to install the following tools.

### Install Starkli, Scarb and Katana

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

### Basics of Katana and Starkli

#### katana sequencer

```console
katana --disable-fee
```

After starting Katana, a list of accounts will be automatically generated and deployed.

#### Starkli built-in accounts and configuration

Starkli supports a list of built-in accounts for katana. These built-in accounts are for local development and no one should be using them for anything serious anyways. For example the address of the `Katana-0` built-in account is `0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03`. You can check the full list of account addresses [here](https://github.com/xJonathanLEI/starkli/blob/e9a28f1b6e37bcc9fc53b7b7130e935894856739/src/account.rs#L76).

We will need this `katana-0` built-in account later when we define our `STARKNET_ACCOUNT`. For more details about accounts, please refer to the [accounts](https://book.starkli.rs/accounts) section on the starkli book.

### Contract Deployment and Interaction

#### Create a Simple Storage project

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

#### Compile contract and add environment variables

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

#### Declare contract

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

#### Deploy contract

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

#### Call contract [only read state]

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

#### Invoke contract [can write state]

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

::::note
📚 **CLI Reference**
See the [`katana` Reference](/toolchain/katana/reference.md) for an in depth reference and documentation on all the available subcommands and options.
::::