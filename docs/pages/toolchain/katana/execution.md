# Execution Engines

Execution engine is the transaction-executing component in the Katana sequencer. It is responsible for processing transactions and updating the state of the Starknet contracts. Currently, Katana supports two execution engines: `blockifier` and `starknet_in_rust`.

By default, the `blockfier` execution engine is used. It is the official implementation of the Starknet execution logic developed by StarkWare. Blockifier is also what Katana is shipped with when it is installed using `dojoup`. For now, the only way to use the `starknet_in_rust` engine is to build the Katana binary directly from source.

## Using `starknet_in_rust` Engine

`starknet_in_rust` is a Starknet execution logic developed and maintained by the awesome team at LambdaClass. It is meant to be an alternative to `blockifier`.
As mentioned earlier, the `starknet_in_rust` engine is not the default execution engine in Katana. For now, the only way to use it is to build the Katana binary directly from source with the `sir` feature enabled.

If you want to install Katana with the `starknet_in_rust` engine, you can do so by running the following command, without having to clone the Dojo repository locally (provided that you have `rustc` and `cargo` already installed):

```console
cargo install --git https://github.com/dojoengine/dojo katana --no-default-features --features sir --locked --force
```

::::note
💡 **NOTE**  
Although `starknet_in_rust` and `blockifier` are different implementations of the Starknet logic, under the hood they both are running on the same `cairo-vm` implementation. As such, there is not much performance to be gained by switching to the `starknet_in_rust` as is. For that, you would need to use the `cairo-native` execution engine.
::::

## Cairo Native

TODO: Add more information about Cairo Native and how to build it

## Benchmarks

TODO: Add benchmarks for the different execution engines
