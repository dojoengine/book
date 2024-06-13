# Systems

> Systems = Functions in a Dojo contract

**_TL;DR_**

- Systems are Dojo contract functions.
- Systems can pass a `world` param as their first parameter to access it.
- Systems engage the world contract to alter models' state.
- Systems ought to be concise and specific.
- In most scenarios, systems are stateless.

## What are systems?

Within Dojo we define systems as functions within a Dojo contract that act on the world.

Systems play a pivotal role in your world's logic, directly mutating its component states. It's important to understand that to enact these mutations, a system needs explicit permission from the [`models`](/framework/models) owner.

## Permissions

In order to write data to the world, a system needs explicit permission from the [`models`](/framework/models) owner.

:::warning[Permissions defined contract level]
Permissions are defined at Dojo contract level. Which means that all the systems inside the same contract will inherit the same permissions.

Before defining your systems, prioritize permissions. Plan carefully to ensure proper access and security.
:::

A simple way to think about system design for permissions:

![System Permissions](/permissions.png)

## Dojo interface

In a Dojo contract, you must first define a Dojo interface to declare the systems that your contract will expose.

```rust
#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher);
    fn move(ref world: IWorldDispatcher, direction: Direction);
}
```
We can note here the very first parameter, called the `world` param, which is a special parameter that injects the world dispatcher into the system.

The two `world` param forms are:

- `ref world: IWorldDispatcher` - This form will generate a function with the `external` state mutability in the ABI.
- `world: @IWorldDispatcher` - This form will generate a function with the `view` state mutability in the ABI.

Usually, systems are using `ref world` to write data to the world models. However, keep in mind that you are not forced to.

:::tip
The `world` parameter is removed at the compilation time. If you don't need to call the world in a system, you can remove this parameter.
:::

## System implementation

To implement the code related to the system, you must be placed inside a `#[dojo::contract]` and implement the interface you've defined.

```rust
#[dojo::contract]
mod actions {
    use super::IActions;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref world: IWorldDispatcher) {
            let player = get_caller_address();
            let position = get!(world, player, (Position));

            set!(
                world,
                (
                    Moves { player, remaining: 100, last_direction: Direction::None(()) },
                    Position {
                        player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 }
                    },
                )
            );
        }

        fn move(ref world: IWorldDispatcher, direction: Direction) {
            let player = get_caller_address();

            let (mut position, mut moves) = get!(world, player, (Position, Moves));

            moves.remaining -= 1;
            moves.last_direction = direction;

            let next = next_position(position, direction);

            set!(world, (moves, next));
        }
    }
}
```
Inside the system's implementation, you can use the Dojo [macros](/framework/contracts/macros) to easily interact with the world.
