---
title: "Libraries in Dojo"
description: "How to separate logic from your Dojo contracts with libraries"
---

# Libraries in Starknet

In Starknet, a contract can call an other contract in two ways:

1. [Contract call](https://www.starknet.io/cairo-book/ch102-02-interacting-with-another-contract.html?highlight=contract%20call#interacting-with-another-contract), where the caller and called contract have their own respective storage.
2. [Library call](https://www.starknet.io/cairo-book/ch102-03-executing-code-from-another-class.html?highlight=library%20call#library-calls), where the called contract is only used as an execution library, but the storage is still the same as the caller.

Doing a library call only requires the contract to be declared (no need to have it deployed).

:::warning
Calling an other contract with a library call can be very unsafe. Ensure you only call libraries you trust. An untrusted library may upgrade your own contract and take control over it.
:::

# Libraries in Dojo

In Dojo, this concept is abstracted by the `#[dojo::library]` attribute, which enables this concept of libraries to embrace the full power of Dojo's ECS architecture.

In comparison to contracts which are deployed (hence have an address), libraries are not deployed, but rather only declared.

As you may expect already, this means that libraries **are not upgradeable**. Changing the logic of a library requires to re-declare a new class.

Dojo has a special way to treat libraries upgrades to mirror how package managers would do it, using versions.

## Define a library

To define a library in Dojo, is very similar to defining a contract with systems:

```rust
#[starknet::interface]
pub trait SimpleMath<T> {
    fn decrement_saturating(self: @T, value: u8) -> u8;
}

/// Note here the `dojo::library` attribute, which is used to define the library.
#[dojo::library]
pub mod simple_math {
    use core::num::traits::SaturatingSub;
    use super::SimpleMath;

    #[abi(embed_v0)]
    impl SimpleMathImpl of SimpleMath<ContractState> {
        fn decrement_saturating(self: @ContractState, value: u8) -> u8 {
            value.saturating_sub(1)
        }
    }
}
```

As you can see, as contracts we can have a trait defining a `#[starknet::interface]` which will be used to define the library.

## Configure a library

In order to instruct the Dojo toolchain that you have a library to use, you need to configure it in your [Dojo configuration file](/framework/configuration/index.md#project-manifest).

If we take the example of the previous library, we would need to configure it like this:

```toml
[lib_versions]
"<NAMESPACE>-simple_math" = "0_1_0"
```

Doing so, we instruct Sozo to register the library in the world with the version `0_1_0`. Sozo will use the code you have locally defined in your project for this library. If you change the library, rebuild the code with `sozo build` and then change the version in the configuration file. Then, run `sozo migrate` to declare the new library class and register it in the world.

As you have already seen, the Dojo resources are identified by a selector, which is for contracts/models/events the poseidon hash of the namespace and the resource name. For libraries, it is similar but the version has to be added in order to avoid collisions:

```
poseidon_hash("<NAMESPACE>", "<LIBRARY_NAME>_v<VERSION>")
```

This concatenation is done automatically by the world while registering the library, since the library name and version are passed as separate arguments.

## Use a library

Once the library is registered in the world, you can leverage the Dojo's DNS in order to get the library's class hash without having to hardcode it.

```rust
use path::to::libary::{SimpleMathLibraryDispatcher, SimpleMathLibraryDispatcherTrait};

let (_, class_hash) = world.dns(@"simple_math_v0_1_0").unwrap();

// or

let class_hash = world.dns_class_hash(@"simple_math_v0_1_0").unwrap();

let simple_math_library = SimpleMathLibraryDispatcher { class_hash };
let r = simple_math_library.decrement_saturating(123_u8);
```

As you can note here, the DNS is expecting the library name and version as a single argument, separated by an underscore.

Instead of `unwrap`, in production code you can use `.expect` in order to have the revert message identified more easily.
