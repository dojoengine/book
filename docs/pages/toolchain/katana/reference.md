---
title: JSON-RPC API Reference
description: Complete reference documentation for Katana's JSON-RPC methods and supported transaction types.
---

# JSON-RPC API Reference

This page provides complete reference documentation for Katana's JSON-RPC API and supported transaction types.

Katana provides a comprehensive RPC interface for interacting with your local blockchain.
The RPC server runs on `http://127.0.0.1:5050` by default and supports both HTTP and WebSocket transports by default.

## RPC Method Namespaces

The RPC methods are categorized into the following namespaces:

| Namespace                           | Description                   | Use Case                              |
| ----------------------------------- | ----------------------------- | ------------------------------------- |
| [`starknet`](#starknet-namespace)   | Standard Starknet RPC methods | Contract calls, transaction queries   |
| [`dev`](#dev-namespace)             | Development utilities         | Block mining, time control, debugging |
| [`cartridge`](#cartridge-namespace) | Cartridge-specific methods    | Paymaster and external execution      |

Each RPC method can be invoked by prefixing the method name with the namespace name and an underscore.
For example, the `generateBlock` method in the `dev` namespace can be invoked as `dev_generateBlock`.

:::note
Torii provides its own separate gRPC server queries and does not integrate with Katana's JSON-RPC interface.
See the [Torii documentation](/toolchain/torii) for Torii's API reference.
:::

### Common Development Workflow

Here's a typical workflow using the dev namespace for testing:

```bash
# 1. Get predeployed accounts
curl -X POST http://127.0.0.1:5050 -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"dev_predeployedAccounts","params":[],"id":1}'

# 2. Set specific timestamp for time-dependent testing
curl -X POST http://127.0.0.1:5050 -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"dev_setNextBlockTimestamp","params":[1704067200],"id":2}'

# 3. Generate block with transactions
curl -X POST http://127.0.0.1:5050 -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"dev_generateBlock","params":[],"id":3}'
```

### `starknet` Namespace

Katana supports version **0.8.1** of the Starknet JSON-RPC specification.
The full documentation for the RPC methods can be found [here](https://github.com/starkware-libs/starknet-specs).

#### Read API

**Block and State Queries:**

- `starknet_blockNumber`
- `starknet_blockHashAndNumber`
- `starknet_getBlockWithTxs`
- `starknet_getBlockWithTxHashes`
- `starknet_getBlockTransactionCount`
- `starknet_getBlockWithReceipts`
- `starknet_getStateUpdate`

**Transaction Queries:**

- `starknet_getTransactionByHash`
- `starknet_getTransactionStatus`
- `starknet_getTransactionReceipt`
- `starknet_getTransactionByBlockIdAndIndex`

**Contract and Storage:**

- `starknet_call`
- `starknet_getNonce`
- `starknet_getStorageAt`
- `starknet_getStorageProof`
- `starknet_getClassHashAt`
- `starknet_getClass`
- `starknet_getClassAt`

**Events and Messages:**

- `starknet_getEvents`
- `starknet_getMessagesStatus`

**Network Status:**

- `starknet_specVersion`
- `starknet_chainId`
- `starknet_syncing`

**Fee Estimation:**

- `starknet_estimateFee`
- `starknet_estimateMessageFee`

#### Write API

- `starknet_addInvokeTransaction`
- `starknet_addDeclareTransaction`
- `starknet_addDeployAccountTransaction`

#### Trace API

- `starknet_traceTransaction`
- `starknet_simulateTransactions`
- `starknet_traceBlockTransactions`

### `dev` Namespace

The `dev` API provides a way to manipulate the blockchain state at runtime. This namespace is only accessible when the `--dev` flag is enabled.

#### `dev_generateBlock`

Mines a new block which includes all currently pending transactions.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_generateBlock",
    "params": [],
    "id": 1
}
```

#### `dev_nextBlockTimestamp`

Get the timestamp for the next block.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_nextBlockTimestamp",
    "params": [],
    "id": 1
}
```

#### `dev_increaseNextBlockTimestamp`

Increase the time for the block by a given amount of time, in seconds.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_increaseNextBlockTimestamp",
    "params": [300],
    "id": 1
}
```

#### `dev_setNextBlockTimestamp`

Similar to `dev_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_setNextBlockTimestamp",
    "params": [1703875200],
    "id": 1
}
```

#### `dev_predeployedAccounts`

Get information for all predeployed accounts.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_predeployedAccounts",
    "params": [],
    "id": 1
}
```

**Response:**

```json
{
    "jsonrpc": "2.0",
    "result": [
        {
            "address": "0x517eb...",
            "public_key": "0x1ef15...",
            "private_key": "0x1800000000300000180000000000030000000000003006001800006600"
        }
    ],
    "id": 1
}
```

#### `dev_setStorageAt`

Set storage value at a specific key for a contract address.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "dev_setStorageAt",
    "params": ["0x1234...", "0x5678...", "0x9abc..."],
    "id": 1
}
```

**Parameter descriptions:**

- `contract_address`: The contract address to modify
- `key`: The storage key
- `value`: The value to set

### `cartridge` Namespace

Cartridge-specific methods for paymaster support and external execution in local development.

:::info
The `cartridge` namespace is only available when Katana is built with the `cartridge` feature enabled.
:::

#### `cartridge_addExecuteOutsideTransaction`

Execute an outside transaction with paymaster support.

**Method invocation:**

```json
{
    "jsonrpc": "2.0",
    "method": "cartridge_addExecuteOutsideTransaction",
    "params": [
        "0x1234...",
        {
            "caller": "0x5678...",
            "nonce": "0x1",
            "execute_after": 1234567890,
            "execute_before": 1234567900,
            "calls": []
        },
        ["0x9abc...", "0xdef0..."]
    ],
    "id": 1
}
```

**Parameter descriptions:**

- `address`: Contract address to execute on
- `outside_execution`: Outside execution object with caller, nonce, timing, and calls
- `signature`: Array of signature components

:::note
This API is designed for local development with Cartridge controllers and is not intended for production use.
:::

## Supported Transaction Types

Katana aims to follow the Starknet specifications as closely as possible, mimicking the features currently supported on mainnet. Katana currently supports the following Starknet transaction types:

| Type               | Version | Description                             |
| ------------------ | ------- | --------------------------------------- |
| **INVOKE**         | 1, 3    | Execute functions on deployed contracts |
| **DECLARE**        | 1, 2, 3 | Declare contract classes                |
| **DEPLOY_ACCOUNT** | 1, 3    | Deploy new account contracts            |

### Transaction Versions

**Version 1**: Legacy transaction format with lower gas efficiency.

**Version 3**: Current transaction format with improved gas efficiency and fee estimation. Recommended for new development.

**DECLARE Version 2**: Introduces Sierra compilation for improved contract verification.

:::tip
Use transaction version 3 for new development to benefit from improved gas efficiency and better fee estimation.
:::

To learn more about the different transaction types, refer to the [Starknet documentation](https://docs.starknet.io/architecture/transactions/).
