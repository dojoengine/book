## JSON-RPC

### Supported Transport Layers

JSON-RPC is provided on multiple transports. Katana supports HTTP, and WebSocket. Both transports are enabled by default.

### Supported RPC Methods

#### Namespaces

The RPC methods are categorized into the following namespaces:

| Namespace                                    | Description |
| -------------------------------------------- | ----------- |
| [`starknet`](/toolchain/katana/rpc/starknet) | -           |
| [`katana`](/toolchain/katana/rpc/katana)     | -           |
| [`torii`](/toolchain/katana/rpc/torii)       | -           |
| [`dev`](/toolchain/katana/rpc/dev)           | -           |

Each RPC methods can be invoked by prefixing the method name with the namespace name and an underscore. For example, the `getTransactions` method in the `torii` namespace can be invoked as `torii_getTransactions`.

