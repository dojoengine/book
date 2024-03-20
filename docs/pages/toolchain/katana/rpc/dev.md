## `dev` Namespace

The `dev` API provides a way to manipulate the blockchain state at runtime. This namespace is only accessible when the `--dev` flag is enabled.

### `generateBlock`  

Mines a new block which includes all currently pending transactions.

| Method invocation                                 |
| ------------------------------------------------- |
| `{ "method": "dev_generateBlock", "params": [] }` |

### `nextBlockTimestamp`  

Get the timestamp for the next block.

| Method invocation                                      |
| ------------------------------------------------------ |
| `{ "method": "dev_nextBlockTimestamp", "params": [] }` |

### `increaseNextBlockTimestamp`  

Increase the time for the block by a given amount of time, in seconds.

| Method invocation                                                      |
| ---------------------------------------------------------------------- |
| `{ "method": "dev_increaseNextBlockTimestamp", "params": [ amount ] }` |

### `setNextBlockTimestamp`  

Similar to `dev_increaseNextBlockTimestamp` but takes the exact timestamp that you want in the next block.

| Method invocation                                                    |
| -------------------------------------------------------------------- |
| `{ "method": "dev_setNextBlockTimestamp", "params": [ timestamp ] }` |