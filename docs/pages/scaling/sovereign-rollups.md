---
title: Sovereign Rollups with Celestia and Dojo
description: Learn about implementing sovereign rollups using Celestia's data availability layer and Dojo's stack, including Katana sequencer and Saya proving service.
---

# Sovereign Rollup Using Celestia and Dojo

![Sovereign Worlds](/scaling/architecture/sw.png)

## Introduction

This documentation outlines the design and implementation of sovereign rollups built with Celestia and Dojo's infrastructure stack.
Sovereign rollups provide scalable and decentralized execution by leveraging Celestia's modular data availability layer combined with Starknet's cryptographic proofs.

:::tip
See [Mage Duel](https://mageduel.evolute.network/) for an example of a game built using this architecture.
:::

### Architecture Overview

Three components power the sovereign rollup:

- [**Katana**](/toolchain/katana): Sequences transactions into blocks
- [**Saya**](/toolchain/saya): Generates proofs from Katana blocks and posts to Celestia
- [**Celestia**](https://celestia.org/): Stores proofs as blobs with retrieval metadata

### Key Features

- **State Reconstruction**: Full state rebuilding from latest proof
- **Proof Chaining**: Headers enable retrieval of previous proofs via commitment/height
- **Batch Aggregation**: Multiple blocks can be proven together for efficiency

:::note
This implementation shares conceptual similarities with **Rollkit**, another framework for building sovereign rollups using modular blockchain architecture.
The difference lies in the underlying infrastructure: this solution is built specifically around Dojo's proven stack (Katana and Saya), while Rollkit uses different technical components.
Both approaches enable developers to deploy customizable sovereign rollups with similar capabilities.
:::

## Technical Architecture

![Sovereign Rollup Architecture](/scaling/architecture/celestia-sw-diagram.png)

### 1. Katana - Block Producer

Katana sequences transactions into blocks within the sovereign rollup.

#### Sync Mode

Katana reconstructs complete state from Celestia proofs:

- **State Recovery**: Rebuilds rollup state from latest Celestia proof
- **Requires**: Celestia height and commitment of latest proof  
- **Process**: Retrieves prior proofs backward until full state reconstruction
- **Independence**: Nodes start/resume using only Celestia data

### 2. Saya - Prover and Proof Poster

Saya generates proofs from Katana blocks and posts them to Celestia.

#### Workflow

- **Polling**: Actively retrieves new blocks from Katana
- **STARK Proving**: Generates cryptographic proofs of block validity and state updates
- **Posting**: Submits proofs to Celestia for storage

#### Proof Aggregation

- **Batching**: Combines multiple blocks into single proofs
- **Efficiency**: Reduces proving and storage costs
- **Scalability**: Handles higher transaction volumes
- **Completeness**: Maintains all state transition data

### 3. Celestia - Data Availability

Celestia provides decentralized storage for rollup proofs.

#### Blob Storage

- **Proof Blobs**: Stores STARK proofs with retrieval metadata
- **Navigation**: Headers enable proof retrieval via commitment/height
- **Reconstruction**: State rebuilding by following proof chains
- **Decentralization**: No centralized coordinator required

#### Header Format

Each blob contains metadata for rollup continuity:

**`prev_state_root`**: Previous rollup state root, ensuring transition continuity

**`state_root`**: Current rollup state root after STARK-verified transitions

**`prev_height`**: Celestia height of previous proof blob for efficient retrieval

**`prev_commitment`**: Previous blob's commitment hash, required for Celestia retrieval

**`proof`**: STARK proof with state updates enabling integrity verification

## Implementation Notes

Current optimizations under consideration:

### Network Architecture

- **Progress Tracking**: Nodes use latest Celestia height/commitment only
- **Namespace**: Predetermined and shared among participants
- **Future**: P2P network for propagating chain heads and updates

### Proof Format

- **Current**: String format converted to bytes for Celestia
- **Future**: Compression using Starknet felts for improved efficiency
