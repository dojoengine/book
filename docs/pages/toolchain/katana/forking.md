# Forking

### State Forking in Dojo

Forking in Dojo revolutionizes the way developers interact with Starknet networks by providing a seamless mechanism to replicate the state of live networks locally. This feature empowers developers to conduct thorough testing and development activities without the need for deploying new contracts or configuring test accounts.

### Understanding Forking

When you fork a network in Dojo, you create a localized replica of the target network's state, encompassing critical components such as contract storage, class definitions, and transaction nonces. This replica enables developers to simulate interactions with the live network in an isolated environment, facilitating rigorous testing and development workflows.

### Configuring Forking

To enable forking in Dojo, configure your Katana node with a valid RPC provider using the `--rpc-url <URL>` flag. Optionally, specify a specific block number to fork from using the `--fork-block-number <BLOCK_NUMBER>` flag. This granular control allows developers to precisely tailor the state of the forked network to their testing requirements.

### Interacting with Forked Network

Once forking is enabled, developers can seamlessly interact with the forked network using familiar Starknet APIs and tools. Deploy custom smart contracts to the local Katana node and validate their interactions with existing contracts on the forked network. Leverage predeployed accounts provided by Katana to simulate transactions and verify contract behavior with confidence.

### Examples

```bash
# Forks the network at block 1200
katana --rpc-url https://starknet-mainnet.infura.io/v3/<YOUR_API_KEY> --fork-block-number 1200
```

This command initializes forking of the Starknet mainnet at the specified block number, establishing a dedicated local environment for comprehensive testing and development activities.

### Best Practices

- **Environment Isolation**: Establish separate instances of Katana for distinct testing scenarios to prevent conflicts and ensure the integrity of test results.
- **Automated Testing**: Integrate forking into automated testing pipelines to facilitate continuous integration and delivery (CI/CD) processes, enhancing testing efficiency and reliability.
- **Resource Management**: Monitor resource utilization when running forked networks to optimize performance and prevent resource exhaustion.
- **Continuous Improvement**: Stay informed about updates and enhancements to the forking feature in Dojo, incorporating them into your development workflow to leverage the latest capabilities and improvements.

### Future Enhancements

We remain committed to enhancing the forking feature in Dojo to provide developers with unparalleled testing and development capabilities. Expect ongoing updates and improvements that further elevate the usability and flexibility of forking in Dojo.
