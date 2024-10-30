<!-- TODO: @ghilm -->

# Authorization

> Authorization is crucial to a world, just like how authorization is crucial to any smart contract.

## Permissions

In Dojo, the following permissions are available:

-   `writer`: The ability to update the state of a resource.
-   `owner`: The ownership of a resource. The owner has the ability to grant or revoke other permissions (including `owner`) on a resource.

:::warning[Permission verification]
The `writer` permission is verified at the **caller level**. This means you usually grant `writer` permission to a system, and not to an account.

The `owner` permission is verified at the **account level**. This means you usually grant `owner` permission to an account, and not to a system.
:::

:::tip[Deployer is owner]
By default, the account that originates the deployment of a resource (system, model, world) is the owner of the resource.

In the current version, the deployer of the world has permissions on everything. This is subject to change in the future.
:::

## Auth Architecture

In order to write data into the world, in other term to update the state of a model, a system must have the appropriate authorization.

In Dojo, to write data to the world the `set!` [macro](/framework/world/api.md) is used.

Every time a `set!` is called, the world checks if the system has authorization to update the model state. First the `writer` permission is checked, and then the `owner` permission.

Only when the system possesses the necessary authorization, the `set!` is executed. The following diagram illustrates the authorization architecture.

![Authorization Architecture](/dojo-auth.png)

## Providing Authorization

:::note
As a recall, the deployer of the model is its initial owner. A model owner is able to grant the `owner` and `writer` permissions. Only owners can grant a system the `writer` permission which allows it to update the model.
:::

The world APIs contains the following functions associated with authorization:

```rust
fn is_owner(self: @T, address: ContractAddress, resource: felt252) -> bool;
fn grant_owner(ref self: T, address: ContractAddress, resource: felt252);
fn revoke_owner(ref self: T, address: ContractAddress, resource: felt252);

fn is_writer(self: @T, model: felt252, contract: ContractAddress) -> bool;
fn grant_writer(ref self: T, model: felt252, contract: ContractAddress);
fn revoke_writer(ref self: T, model: felt252, contract: ContractAddress);
```

To provide authorization you have multiple choices:

-   Using [Sozo auth command](/toolchain/sozo/world-commands/auth.mdx) to set permissions from the command line.
-   Leveraging the overlay system to set permissions automatically when you migrate your project. (TODO: PAGE + LINK).
