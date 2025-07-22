---
title: Upgrading
description: An overview of Dojo upgrading guides
---

# Upgrading Overview

## Major Releases

### Dojo 1.x

Dojo's first **major release** in November 2024, which stabilized the Dojo API.

[See the Dojo 1.x upgrading guide here.](dojo-1x)

:::note
It is unlikely that a new Dojo developer will need to upgrade from Dojo 0.x
:::

## Minor Releases

### Dojo 1.6.x

**Dojo 1.6.0 key changes:**

- This release stabilizes the use of RPC 0.8 of Starknet.

[See the Dojo 1.6.0 release notes.](https://github.com/dojoengine/dojo/releases/tag/v1.6.0)

### Dojo 1.5.x

This release marked the shift from the "monorepo" approach in which Katana and Torii were kept in the Dojo repo, to a multi-repository approach.
As such, this is the first release in which version compatibility became an issue.

**Dojo 1.5.1 key changes:**

- Dojo lang: introspection is now correctly handling the unity type when explicitly used in enums variant (()).

- World: now that the syscall to get the class hash is supported by the network, using the dns correctly returns the class hash relying on the get_class_hash_at syscall.

[See the Dojo 1.5.1 release notes.](https://github.com/dojoengine/dojo/releases/tag/v1.5.1)

**Dojo 1.5.0 key changes:**

- Support for Cairo 2.10 (Dojo lang is still a built-in compiler plugin, no scarbs.xyz at the moment).

- The world now keeps track of the ownership counter on resources. It has a new API to verify the ownership of a resource owners_count.

- Signed integers are now fully supported by the introspection.

[See the Dojo 1.5.0 release notes.](https://github.com/dojoengine/dojo/releases/tag/v1.5.0)

## Version Compatibility Guide

Dojo framework versions are tightly coupled with the rest of the toolchain.
Please consult this guide for release and compatibility information.

  | Dojo Version | 1.5.0 | 1.5.1 | 1.6.0 |
  |--------------|-------|-------|-------|
  | Katana       |       |       |       |
  | 1.6.3        | ❌     | ❌     | ✅     |
  | 1.6.2        | ❌     | ❌     | ✅     |
  | 1.6.1        | ❌     | ❌     | ✅     |
  | 1.6.0        | ❌     | ❌     | ✅     |
  | 1.5.4        | ✅     | ✅     | ❌     |
  | 1.5.3        | ✅     | ✅     | ❌     |
  | 1.5.2        | ✅     | ✅     | ❌     |
  | 1.5.1        | ✅     | ✅     | ❌     |
  | 1.5.0        | ✅     | ✅     | ❌     |
  | Torii        |       |       |       |
  | 1.5.9        | ❌     | ❌     | ✅     |
  | 1.5.8        | ❌     | ✅     | ✅     |
  | 1.5.7        | ❌     | ✅     | ✅     |
  | 1.5.6        | ❌     | ✅     | ✅     |
  | 1.5.5        | ✅     | ✅     | ✅     |
  | 1.5.4        | ✅     | ✅     | ✅     |
  | 1.5.3        | ✅     | ✅     | ✅     |
  | 1.5.2        | ✅     | ✅     | ✅     |
  | 1.5.1        | ✅     | ✅     | ✅     |
  | 1.5.0        | ✅     | ✅     | ✅     |

:::info
Compatibility data drawn from [this file](https://github.com/dojoengine/dojo/blob/main/versions.json).
:::
