---
title: Upgrades models in Dojo
description: Learn how to upgrade models in Dojo.
---

# Upgrades

In Dojo, all models are upgradeable, which means that when their code changes, they are redeployed 
to the same address, preserving the existing model storage and therefore the existing model data.

However, to be able to preserve existing model data, there are some limitations.

## General rules

- To be upgradeable, the layout of a model must not be packed (using `IntrospectPacked`).

- For composite data structures like `struct`, `enum`, `tuple` and `array`
    - they are upgreadable as soon as all their elements are upgreadable,
    - existing elements cannot be removed, they can only be modified according to the rules described 
  on this page. New elements can be freely added.

- Each element of a data structure must keep the same type (i.e a `tuple` must remain a `tuple`), the same name and
  the same attributes if any (such as `#[key]` for model members).

- A primitive type can be upgraded to a larger primitive type as soon as its felt252 representation uses the same number of felts
(for example, `u8` to `u128` but not `u128` to `u256`). See the next chapter for more details.

- A key model member is upgradeable only if its type is an upgreadable primitive or an enum with new variants only (existing variants cannot be
modified for a key member).

## Primitive upgrades

This table lists the allowed upgrades for every primitive types.
The type `usize` is not supported since it is a architecture-dependent type.

| Current         | Allowed upgrades |
| --------------- | ---------------- |
| bool            | bool, felt252 |
| u8              | u8 to u128, felt252 |
| u16             | u16 to u128, felt252 |
| u32             | u32 to u128, felt252 |
| u64             | u64 and u128, felt252 |
| u128            | u128, felt252 |
| u256            | u256 |
| i8              | i8 to i128, felt252 |
| i16             | i16 to i128, felt252 |
| i32             | i32 to i128, felt252 |
| i64             | i64 and i128, felt252 |
| i128            | i128, felt252 |
| felt252         | felt252, ClassHash, ContractAddress |
| ClassHash       | felt252, ClassHash, ContractAddress |
| ContractAddress | felt252, ClassHash, ContractAddress |
| EthAddress      | felt252, ClassHash, ContractAddress, EthAddress |
