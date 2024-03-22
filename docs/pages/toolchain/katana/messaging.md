# Messaging

Katana also allows users to perform L1 <-> L2 integration using the messaging feature. There are two types of messaging service supported by Katana:

1. _Ethereum_
2. _Starknet_ (**experimental**)

If configured to _Ethereum_ messaging, Katana will listen/send messages on an Ethereum chain. This type of messaging behaves similar to the canonical Starknet sequencer with the exception that messages from L2 -> L1 will be sent directly to the settlement chain for consumption, instead of having to wait for the corresponding blocks of the messages to be proven on the settlement chain (which in reality would be a very time consuming process).

The _Starknet_ messaging, however, is an experimental feature that allows Katana to listen/send messages on a Starknet chain. It attempts to replicate the behaviour of Ethereum messaging but with a Starknet chain as the settlement layer. This is achieved by having Katana listen to the Starknet chain for new blocks and then sending the messages to the settlement chain for consumption. This is an experimental and opinionated feature, and is not recommended for production use.

```sh
katana --messaging path/to/messaging/config.json
```

The messaging config file is a JSON file that contains the following fields:

```json
{
  /// The type of messaging service to use. Can be either "ethereum" or "starknet".
  "chain": "ethereum",
  /// The RPC-URL of the settlement chain.
  "rpc_url": "http://127.0.0.1:8545",
  /// The messaging-contract address on the settlement chain.
  "contract_address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  /// The address to use for settling messages. It should be a valid address that
  /// can be used to send a transaction on the settlement chain.
  "sender_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  /// The private key associated to `sender_address`.
  "private_key": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  /// The interval, in seconds, at which the messaging service will fetch and settle messages
  /// from/to the settlement chain.
  "interval": 2,
  /// The block on settlement chain from where Katana will start fetching messages.
  "from_block": 0
}
```