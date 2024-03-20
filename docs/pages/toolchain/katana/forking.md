## State Forking

Katana offers a powerful feature called "*forking*," which allows you to interact with the state of another Starknet network as if it were a local network. This feature enables developers to test and interact with smart contracts deployed on live networks without the need to deploy their own contracts or set up test accounts on those networks.

To enable the forking feature, you can configure your Katana node by providing a valid RPC provider using the `--rpc-url <URL>` flag. By default, Katana will fork the latest block of the specified network. However, if you wish to fork from a specific block, you can use the `--fork-block-number <BLOCK_NUMBER>` flag to specify the desired block number.

Once the forking feature is enabled, you can interact with the forked network through Katana as if it were a separate, isolated environment. You can deploy your own smart contracts to the local Katana node and have them interact with the contracts that exist on the forked network. You can then use the accounts predeployed by Katana to simulate interactions with the external network, making it convenient for testing and development purposes.

The forking feature is particularly useful for smart contract developers who want to perform end-to-end tests against contracts already deployed on mainnet or testnet. It eliminates the need to deploy your own contracts on those networks and avoids the hassle of setting up test accounts and funding them, especially when working with the mainnet. By forking the state of the desired network, you can create a local testing environment that closely mimics the live network, allowing you to test your contracts and interactions with confidence.

With Katana's forking feature, developers can streamline their testing and development process, saving time and resources while ensuring the integrity and compatibility of their smart contracts with existing networks.

:::note
💡 **NOTE**  
Currently, the forking feature is limited to only the blockchain states (ie, storage, class definitions, nonces, etc). Support for fetching non-state data (eg., block, transaction, receipt, events) of the forked network through the RPC will be added in the future.
:::

#### Examples

The following command forks the Starknet mainnet at exactly the 1200th block. All the states of the mainnet up until block 1200 will be accessible on your local Katana node. It will then start producing new blocks starting from block 1201.

```sh
# Forks the network at block 1200
katana --rpc-url https://starknet-mainnet.infura.io/v3/<YOUR_API_KEY> --fork-block-number 1200
```