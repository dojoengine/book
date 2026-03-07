---
title: Dojo 1.0 Overview
description: Major changes from Dojo 0.x to Dojo 1.0.
---

# Dojo 1.0 Overview

:::note
This guide focuses on the major changes from Dojo 0.x to Dojo 1.0, [released Nov 2024](https://github.com/dojoengine/dojo/releases/tag/v1.0.0).
If you are new to Dojo, you can skip this section.
:::

Dojo is composed of 5 basic resources:

- `world`: The smart contract that manages the state of your game, everything is stored here.
- `namespace`: Every resource that is not world or namespace must be namespaced when registered into the world. Namespaces are logical groups of resources, and allow you to organize your resources and permissions.
- `model` (namespaced): A model defines data that can be stored in the world.
- `event` (namespaced): An event also defines data, but meant to be stored offchain.
- `contract` (namespaced): Where you define your business logic, and interact with the world to write/read models and emit events. A function into a contract is called a `System`, which is an entrypoint for users to interact with the world.

Every resource in the world is identified by a dojo selector, a single felt identifier obtained by hashing.

For human readability, namespaced resources can also be identified by what's called a `Tag`, which is a combination of the namespace and the resource name:
`namespace-resource_name`.
The tag can be used to obtain the dojo selector of the resource.

A single resource can be registered multiple times into the world using different namespaces.

All the resources without exception in the world are permissioned.
This means that only the specified addresses can write/own resources.
There's only two permissions in Dojo:

- `writer`: Can write to the resource.
- `owner`: Can grant/revoke writer permissions, can register/upgrade resources.

## Interacting with the world and its data

First, when you are inside a dojo contract (define with `#[dojo::contract]`), you have to retrieve the world's instance.
As mentioned previously, all the resources are namespaced, so you have to specify the default namespace to use:

```rust
// Get the world instance, using the namespace "ns":
let world = self.world(@"ns");
```

This `world` instance provides you some functionalities to interact with the world and its data.

```rust
// Using the DNS to get a contract address and class hash from its tag.
// Since the default namespace has been set to "ns", the tag identifying
// the resource will be "ns-my_contract".
if let Some((contract_address, class_hash)) = world.dns("my_contract") {
    // Do something with the contract address and class hash.
}
```

To change the namespace you want to write/read from, you can use the `set_namespace` method:

```rust
world.set_namespace(@"ns2");

// At this point, using the DNS will return the resource from the "ns2"
// namespace, if it exists.
if let Some((contract_address, class_hash)) = world.dns("my_contract") {
    // Do something with the contract address and class hash.
}
```

To read/write data to models, you have to import the `ModelStorage` trait:

```rust
use dojo::model::ModelStorage;

#[dojo::model]
struct MyModel {
    #[key]
    id: u32,
    value: u32,
}

let mut world = self.world(@"ns");
// Note here the type specified for the compiler, this ensures the
// compiler can infer which data to retrieve:
let id = 1;
let mut model: MyModel = world.read_model(id);
model.value = 123;
world.write_model(@model);
world.erase_model(@model);
```

The full API of the `ModelStorage` can be found [here](https://github.com/dojoengine/dojo/blob/ab081b9fb8444d84aecaba848126f8c64db45eb8/crates/dojo/core/src/model/storage.cairo#L9) before more documentation is written.
The important concept to keep in mind is that the data stored in the world are identified by the `keys` you are adding using `#[key]` in models and events.
A model/event can have one or multiple keys.
When those keys are hashed, it's called the `entity_id`.

Events are only emitted by the world, and never stored onchain.
Instead, Torii will index them and store them in the SQL database.
However, they are subjected to the same namespace rules as models.

To emit an event, you have to import the `EventStorage` trait:

```rust
use dojo::event::EventStorage;

#[dojo::event]
struct MyEvent {
    #[key]
    id: u32,
    value: u32,
}

let mut world = self.world(@"ns");
let e = MyEvent { id: 1, value: 123 };
world.emit_event(@e);
```

## Permissions

In Dojo 1.0, the permission system has been updated to be more resource-based.
For detailed information about the new permission system, see the [World Permissions documentation](#TODO).

Notable changes from Dojo 0.x:

- Permissions are now granted per resource instead of globally
- The permission API has been simplified to `owner` and `writer` roles
- Configuration-time permissions are now set via profile-based configuration files

## Events and Torii

Events are not stored onchain, they are indexed by Torii.
And by default, events behave like models, which means only the latest state is kept.
However, you may want sometimes to keep events historical as it's regularly for blockchain events.

To do so, nothing to change onchain, only one way to define events:

```rust
#[dojo::event]
struct MyEvent {
    #[key]
    id: u32,
    data: felt252,
}
```

On the torii side, you can start it from the CLI or using a configuration file with the `historical_events` options, by providing tags of events you want to keep historical.

```bash
torii start --events.historical ns-MyEvent,ns-MyOtherEvent --world 0x00e2ea9b5dd9804d13903edf712998943b7d5d606c139dd0f13eeb8f5b84da8d
```

Or using a configuration file in `toml` format:

```toml
world_address = "0x00e2ea9b5dd9804d13903edf712998943b7d5d606c139dd0f13eeb8f5b84da8d"

[events]
historical = ["ns-MyEvent", "ns-MyOtherEvent"]
```

## Testing

In Dojo 1.0, the test runner has been updated to use the `cairo-test` system instead of the previous testing framework.
For detailed testing examples, patterns, and comprehensive testing documentation, see the [Testing guide](#TODO).

Notable testing changes from Dojo 0.x:

- Removed support for `starknet-foundry` test runner (will be added back when `scarb` and `cairo-lang` support it)
- Updated to use `dojo_cairo_test` crate for testing utilities
- New namespace-based testing approach with `NamespaceDef` and `ContractDef` structures

## Configuration

For detailed information about configuring your Dojo project, including profile management, environment settings, and deployment configuration, see the [Configuration guide](#TODO).

## Sozo

Sozo has changed to be more robust and 100% stateless for the migration.
All the data required to compute diffs and migration strategy are locally built or onchain.

As you remember, Dojo is profile based.
Hence, the build and migration must respond to the profile.
To specify a profile, use `-P` or `--profile` argument.

Basic commands:

```bash
# Builds a project.
sozo build

# Inspects the current state of the project by comparing local
# and remote resources.

# Inspect the full world.
sozo inspect
# Inspect a specific resource.
sozo inspect <RESOURCE_TAG>

# Migrate all the resources to the remote state.
# Generates a `manifest_<PROFILE>.json` file.
sozo migrate
```

If you change a permission, you just have to run `sozo migrate` again and the permissions will be updated.
We recommend using `sozo inspect` instead of reading output of migration or the build.
The `inspect` commands gives you summary of the world or specific resource.
Use it at your advantage.

## Sozo useful commands

Sozo provides different commands to help you manage your world.

```bash
# Inspect the current state of the project by comparing local
# and remote resources.
sozo inspect
```

```bash
# To enable the debugging experience on Walnut and verify your project, run:
sozo walnut verify
```

```bash
# Computes selectors on the fly and different hashes results,
# useful for entity_id computation too.
sozo hash ns-actions
sozo hash 1,2,3,4
sozo hash hello
```

```bash
# Gathers all the events of the world and output the changes in
# model storage in the terminal + transaction hash and block number.
sozo events
```

```bash
# Sometimes, you may want to introspect a model from the chain without
# using Torii indexed data.
# You can inspect the schema of a model from the chain directly by using
# the following command:
sozo model schema dojo_starter-Position

struct Position {
  #[key]
  player: ContractAddress,
  vec: Vec2,
}

struct Vec2 {
  x: u32,
  y: u32,
}
```

```bash
# You can also inspect the storage state of a model providing the keys,
# as you remember the keys are used to identify the entity_id
# which defined the storage slot of the model.
sozo model get dojo_starter-Position 0x123
{
    player          : 0x0000000000000000000000000000000000000000000000000000000000000123,
    vec             : {
        x               : 0,
        y               : 0
    }
}

# As a reminder, keys are never stored! For this reason,
# the value of the key will ALWAYS be the same as the one provided.
```

```bash
# Manage the permissions of the world from the command line,
# start by listing them:
sozo auth list

# Grant/revoke a owner/writer to any resource:
sozo auth grant owner ns,0x1234 ns-Position,ns-c1

# Clone all the resources `0xa` has to `0xb`:
sozo auth clone --from 0xa --to 0xb

# You can optionally revoke all the resource of `from`
# while doing the clone:
sozo auth clone --from 0xa --to 0xb --revoke-from
```

## Road to mainnet

Mainnet is a network with a huge history and thousands of blocks.
Currently, some nodes are not supported syncing the events providing block ranges that are too wide.
For this reason, when you target mainnet, you should do the following:

```bash
# Build the project.
sozo build --profile mainnet

# Migrate the project.
sozo migrate --profile mainnet
```

During the migration, sozo will output the block at which the world has been migrated and the address of the world at the end of the migration:

```bash
🌍 World deployed at block 821000 with txn hash: 0x038e984efa3e91e045b33d14e63c5e9f765e5a8fe2b3546fc3ab872f608e37a2
⛩️  Migration successful with world at address 0x00e2ea9b5dd9804d13903edf712998943b7d5d606c139dd0f13eeb8f5b84da8d
```

To ensure the nodes serving mainnet data are accepting `Sozo` requests, you must set the `world_block` key in the `dojo_<profile>.json` file.
Also, once the first migration of your world is done and you have a world address, you must set the `world_address` to ensure `Sozo` can easily detect upgrade of Dojo in the future.

```toml
[env]
# .. other configs
world_block = 821000
world_address = 0x00e2ea9b5dd9804d13903edf712998943b7d5d606c139dd0f13eeb8f5b84da8d
```

## Dojo 1.0.0 Breaking Changes

[Dojo 1.0.0](https://github.com/dojoengine/dojo/releases/tag/v1.0.0) introduces a number of breaking changes.

- Macros `set/get/delete` are currently not supported. They may be added again in the future.
- When working with contracts, the `world` is no longer automatically injected. You must use regular starknet interfaces and `self` with `ContractState`.
- World's metadata are not uploaded yet, this should be added back soon.
- You must remove `[[target.dojo]]` and use `[[target.starknet-contract]]` instead, not forgetting to add the dojo world in the `build-external-contracts`.
- Overlays files and intermediate manifests that were before produced can be deleted, they are no longer used.
- The `Model` API has changed, please refer to the new one [here](https://github.com/dojoengine/dojo/blob/ab081b9fb8444d84aecaba848126f8c64db45eb8/crates/dojo/core/src/model/model.cairo#L31).
- Katana has a different CLI arguments, please refer to `katana --help` for more details at the moment.
- Use transaction v3 by default paying in STRK, you must specify `--fee eth` if you want to use transaction v1 paying in ETH.
- Event messages are toggles historical from Torii, no longer from the chain using `#[dojo::event(historical = true)]`.
