## `starknet` Namespace

Katana supports version **v0.6.0** of the Starknet JSON-RPC specifications. The full documentations for the RPC methods can be found [here](https://github.com/starkware-libs/starknet-specs/tree/v0.6.0).

### Read API

-   `starknet_blockNumber`
-   `starknet_blockHashAndNumber`
-   `starknet_getBlockWithTxs`
-   `starknet_getBlockWithTxHashes`
-   `starknet_getBlockTransactionCount`
-   `starknet_getStateUpdate`
-   `starknet_getTransactionByHash`
-   `starknet_getTransactionStatus`
-   `starknet_getTransactionReceipt`
-   `starknet_getTransactionByBlockIdAndIndex`

-   `starknet_call`
-   `starknet_estimateFee`
-   `starknet_estimateMessageFee`

-   `starknet_chainId`
-   `starknet_syncStatus`

-   `starknet_getNonce`
-   `starknet_getEvents`
-   `starknet_getStorageAt`
-   `starknet_getClassHashAt`
-   `starknet_getClass`
-   `starknet_getClassAt`

### Write API

-   `starknet_addInvokeTransaction`
-   `starknet_addDeclareTransaction`
-   `starknet_addDeployAccountTransaction`

### Trace API

-   `starknet_simulateTransactions`
