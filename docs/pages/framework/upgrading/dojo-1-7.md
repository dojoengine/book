---
title: Dojo 1.7 Upgrading Guide
description: An upgrade guide for Dojo 1.7
---

# Dojo 1.7 Overview

Dojo 1.7 is a minor release of the Dojo stack, bringing Sozo updates, RPC 0.9 support, and a new `DojoStore` trait for enhanced model serialization.

## Sozo Updates

Dojo 1.7 brings major changes to Sozo, Dojo's build tool.
Prior to 1.7, Sozo implemented Dojo's specialized functionality (like `#[dojo::model]`) through Cairo compiler plugins.
This was an advanced feature that few other teams used, meaning that Dojo had to essentially maintain a separate fork of Scarb, Cairo's build tool.
This extra complexity made Dojo development slower and more difficult than it otherwise would have been.

With Dojo 1.7, Sozo will instead began relying on "proc macros" (procedural macros) to implement specialized Dojo functionality.
With proc macros, Dojo functionality can be accessed by Scarb at compile-time, rather than requiring separate pre-compilation.
This means that Sozo can leverage the mainstream Scarb directly; going forward, calls to `sozo build` will be thin wrappers around underlying Scarb functionality.

The move to mainstream Scarb has reduced typical compile-times by about 3x, as well as unblocked quality-of-life improvements like in-editor syntax highligting and terminal text coloring.
Most importantly, this change will make it easier to maintain and improve Dojo and Sozo going forward.

The first action you need to take is to update your `Scarb.toml` file to add the `dojo_macros` dependency.

```toml
[dependencies]
dojo = "1.7.0"
# Add this line
dojo_cairo_macros = "1.7.0"

[dev-dependencies]
cairo_test = "2.12.2"
dojo_cairo_test = "1.7.0"
```

:::note
If you have an issue while compiling the project, ensure that you have rust `1.90` correctly installed locally.
In a future version of the `dojo` package, the cairo proc macros will be reexported and pre-compiled to avoid this issue.
:::

## Starknet 0.14.0

:::info
Starknet's 0.14.0 upgrade went live on mainnet September 1, 2025.
:::

Dojo 1.7 was timed to coincide with [Starknet's 0.14.0 upgrade](https://governance.starknet.io/voting-proposals/9), which brought several major changes to the network:

- The introduction of RPC 0.9 and the introduction of the `PRE_CONFIRMED` transaction status.
- The migration to a multi-sequencer architecture
- The introduction of an EIP-1559-style fee market for transaction prices

Dojo 1.7 brings support for RPC 0.9 to the entire stack, including Torii, Katana, and the client SDKs.

See [this guide](https://hackmd.io/8ILy9nLgTmaEJ98mrtPP3A) for more context and a migration guide for RPC 0.9.

## The `DojoStore` trait

:::warning
This is a **breaking change**; while migration is straightforward, existing projects which do not migrate are at risk of data loss.
:::

**TL;DR: all Enums which are stored inside of Dojo models must derive the `Default` trait and set a `#[default]` value.**

In response to a potential vulnerability identified with the existing implementation of Dojo storage and uninitialized storage, a new `DojoStore` trait was introduced to give developers more fine-grained control of model storage.

This trait will affect data serialization and requires some code updates to handle correctly if you have an existing project.

### Dojo Storage Overview
Before describing the issue, here's a brief summary of how Dojo storage works:

1. A model is defined as a Cairo struct.
2. This model is serialized using the `Serde` trait and written to world storage via `world.model_write(@m)`.
3. The world contract's storage acts as a database, where serialized data is written through syscalls to specific storage locations.

Since serialization is handled by the `Serde` trait, enums are serialized as follows:
1. The variant index is stored as the first `felt`.
2. If the variant contains a value (i.e., is not the unit type `()`), the serialized value occupies the remaining `felt`s.

For example, the `Option<T>` enum is serialized as:
```rust
enum Option<T> {
    Some: T,
    None,
}

let a = Option::None;
// Serialized = [0x1]

let b = Option::Some(2);
// Serialized = [0x0, 0x2]
```

In Starknet contracts, the Cairo compiler increments variant indices by `1`, ensuring that uninitialized storage defaults to a predictable variant.
Since Dojo uses `Serde`, this increment is not happening.

### Security Considerations
Given this behavior, consider the following model:
```rust
struct MyModel {
    #[key]
    id: u32,
    score: Option<u32>,
}
```
If this model is read from storage before being explicitly written, the world’s storage remains uninitialized (filled with `0x0`s). This results in:
```rust
let my_key: u32 = 0x1234;

// Reading an uninitialized model from storage.
let m = world.read_model(my_key);

// This assertion will revert Cairo execution.
// assert(m == None)

if m.score.is_some() {
    // Unexpected execution: `Some(0)` is returned instead of `None`.
} else {
    // Expected behavior, but will not occur in this case.
}
```
Here, `Some(0)` is returned instead of `None` because `Some` is the first variant of `Option<T>`, leading to unintended behavior when relying on `score` for logic for uninitialized models.

For custom enums, consider:
```rust
enum HeroState {
    Alive: u32,
    Injured: u32,
    Dead,
}
```
Reading uninitialized storage will return `HeroState::Alive(0)`, as it is the first variant but we might expect another default value associated to `HeroState::Alive`.

### Introduction of a new `DojoStore` trait

From Dojo 1.7.0, models are serialized using a new `DojoStore` trait, which basically does the same thing than `Serde` except for enums.

When reading an uninitialized model containing an enum, `DojoStore` will automatically use the default variant configured at enum level for deserialization.

Let's see an example:

```rust
#[derive(Drop)]
enum HeroState {
    Alive: u32,
    Injured: u32,
    Dead,
}

impl HeroStateDefault of Default<HeroState> {
    fn default() -> HeroState {
        HeroState::Alive(200)
    }
}

#[derive(Drop, Default)]
struct MyModel {
    state: HeroState,
}
```

Here, when `DojoStore` deserializes an uninitialized model, it uses the default value of `HeroState` which is `HeroState::Alive(200)`.

Of course, you can also use the `Default` derive attribute and tag the default variant when there is no need to configure a specific variant data:

```rust
#[derive(Drop, Default)]
enum MyEnum {
    Variant1,
    #[default]
    Variant2,
    Variant3
}
```

In this case, `Variant2` is used for deserializing an uninitialized model containing a `MyEnum` field.

For `Option<T>`, the default value is already configured as `None`.

### What to do for a new Dojo project ?

For a new Dojo project, just add the `DojoStore` derive attribute to all the data structures used in models (basically all the data structures aimed to be stored).

For stored enums, you must also add the `Default` derive attribute and configure a default variant (or implement the `Default` trait like in the previous example). 

You can omit the `DojoStore` attribute on the model `struct` itself because it will be automatically added when a `struct` is tagged with `dojo::model`. Same for `Introspect`, `Drop` and `Serde`.

Note that Dojo events and all the data structures used in events are not stored and so, don't need the `DojoStore` attribute. Of course, if a data structure is used in both Dojo models and events, you have to add the `DojoStore` attribute.

Some examples:

```rust

#[derive(Drop, Serde, DojoStore, Default)]
enum MyEnum {
    Variant1,
    #[default]
    Variant2,
    Variant3
}

#[dojo::model]
struct M1 {
    #[key]
    k: u32,
    v1: MyEnum
}

#[dojo::event]
struct E1 {
    v1: MyEnum
}

enum AnotherEnum {
    Variant1,
    Variant2
}

#[dojo::event]
struct E2 {
    v1: AnotherEnum
}
```

### How to migrate an existing Dojo project ?

If your project is already deployed on mainnet, there are two cases for each of your models.

1. The model does not contain any enum/option, directly in the model `struct` or in any nested data structures. In this case, just use the `DojoStore` trait as explained in the previous chapter about new projects. Already stored data will be preserved as `DojoStore` do the same thing than `Serde` for all data types other than enums. 

2. The model contains at least an enum/option (directly in the model `struct` or in nested data structures). In this case, you must keep the old Dojo storage behaviour to preserve already stored data. To do that, you must add the `DojoLegacyStore` derive attribute to your model `struct` only.

```rust
// The enum only need to derive Serde, which should already be the case
// since a model requires all its fields to derive Serde.
#[derive(Serde)]
enum MyEnum {
    Variant1,
    Variant2,
    Variant3
}

#[derive(DojoLegacyStore)]
#[dojo::model]
struct MyModel {
    #[key]
    k: u32,
    v: MyEnum
}
```

That means, you still have the potential issue described earlier with uninitialized storage and enums, but there are some solutions to mitigate the risks:
- Ensure models are explicitly initialized before being used.
- Avoid relying on `Option<T>` for initialization checks. Instead, use a separate `bool` or `integer` field, as these default to `0x0`.
- Define the default variant as the first variant to ensure correct behavior when reading uninitialized storage, and if you define an associated variant data, keep in mind that it will be set to 0 by default.

:::warning
Due to how `DojoStore` is implemented, you may have to rename few methods to interact with models.
All the following methods now have an additional `_legacy` version that must be used for the models using `DojoLegacyStore`.
```
read_member_legacy
read_member_of_models_legacy
write_member_legacy
write_member_of_models_legacy
read_schema_legacy
read_schemas_legacy
```
:::

### Conclusion to avoid an issue with uninitialized storage and enums
If your project relies on `Option<T>` or custom enums, this issue may be critical. We recommend reviewing your usage and considering explicit initialization strategies when applicable.

For projects already on `mainnet`, upgrading the contract to modify logic or adding a dedicated initialization field can mitigate potential security risks.

This issue affects all versions since Dojo `1.0.0`.

From Dojo `1.7.0`, the `DojoStore` trait ensures that uninitialized storage is handled correctly for enums and `Option<T>` and custom enums with a default variant.

### Testing with `dojo-cairo-test`

Since `1.7.0`, the `TEST_CLASS_HASH` is now an actual `ClassHash`. The API of `spawn_test_world` has also been updated to ensure we can publish the package on `scarb.xyz`.

You now have to import the `world` and pass its class hash to the `spawn_test_world` function. There is no more need of casting the `TEST_CLASS_HASH` to a `ClassHash`.

```rust
use dojo::world::{WorldStorageTrait, world};
use dojo_cairo_test::{
    NamespaceDef, TestResource, spawn_test_world,
};

fn namespace_def() -> NamespaceDef {
    let ndef = NamespaceDef {
        namespace: "dojo_starter",
        resources: [
            TestResource::Model(m_Position::TEST_CLASS_HASH),
            TestResource::Model(m_Moves::TEST_CLASS_HASH),
            TestResource::Event(actions::e_Moved::TEST_CLASS_HASH),
            TestResource::Contract(actions::TEST_CLASS_HASH),
        ]
            .span(),
    };

    ndef
}

#[test]
fn test_world_test_set() {
    let ndef = namespace_def();
    let mut world = spawn_test_world(world::TEST_CLASS_HASH, [ndef].span());
}
```

## Troubleshooting

As with any major upgrade, there are always "gotchas" to be aware of.
This section will help you address some common issues.

### Toolchain compatibility guide

:::warning
This compatibility guide is rapidly changing and may be slightly out of date.
For the most up-to-date information, [visit our Discord](https://discord.gg/dojoengine).
:::

The following is the **latest** compatibility guide for Dojo 1.7.

Add these to your `.tool-versions` for best results:

```txt
scarb 2.12.2
sozo 1.7.0
katana 1.7.0
torii 1.7.0
```

### Sozo build errors

If you're having trouble compiling your contracts with Sozo, try adding `dojo_macros` to your `Scarb.toml`:

```toml
[dependencies]
starknet = ">=2.12.2"
dojo = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0" }
dojo_macros = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0" } # Add this
```
