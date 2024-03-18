
## Supported RPC Methods

### Namespaces

The RPC methods are categorized into the following namespaces:

| Namespace   | Description |
| ----------- | ----------- |
| `katana`    | - |
| `starknet`  | - |
| `torii`     | - |
| `dev`       | - |

### `starknet` Namespace

Katana supports version **v0.6.0** of the Starknet JSON-RPC specifications. The full documentations for the RPC methods can be found [here](https://github.com/starkware-libs/starknet-specs/tree/v0.6.0).

#### Read API

- `starknet_blockNumber`
- `starknet_blockHashAndNumber`
- `starknet_getBlockWithTxs`
- `starknet_getBlockWithTxHashes`
- `starknet_getBlockTransactionCount`
- `starknet_getStateUpdate`
- `starknet_getTransactionByHash`
- `starknet_getTransactionStatus`
- `starknet_getTransactionReceipt`
- `starknet_getTransactionByBlockIdAndIndex`

- `starknet_call`
- `starknet_estimateFee`
- `starknet_estimateMessageFee`

- `starknet_chainId`
- `starknet_syncStatus`

- `starknet_getNonce`
- `starknet_getEvents`
- `starknet_getStorageAt`
- `starknet_getClassHashAt`
- `starknet_getClass`
- `starknet_getClassAt`

#### Write API

- `starknet_addInvokeTransaction`
- `starknet_addDeclareTransaction`
- `starknet_addDeployAccountTransaction`

#### Trace API

- `starknet_simulateTransactions`

### `dev` Namespace

Katana provides a convenient set of custom RPC methods to quickly and easily configure the node to suit your testing environment.

`katana_generateBlock`  
Mine a new block which includes all currently pending transactions.

`katana_nextBlockTimestamp`  
Get the time for the next block.

`katana_increaseNextBlockTimestamp`  
Increase the time for the block by a given amount of time, in seconds.

`katana_setNextBlockTimestamp`  
Similar to `katana_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block.

`katana_predeployedAccounts`  
Get the info for all of the predeployed accounts.

### `torii` Namespace

### `katana` Namespace