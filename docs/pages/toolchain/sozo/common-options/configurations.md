# Account Options

This module provides options for configuring an account in the `sozo` command.

## Configuration Priorities

The configuration system follows the following priority order:

1. Command-line arguments: If options are specified via command-line arguments, they have the highest priority.
2. Environment variables: Environment variables provide a way to configure options globally.
3. Configuration in `Scarb.toml`: Any configuration found within the `Scarb.toml` file will be considered if options are not found in the first two steps.

## Account Options

- `account_address`: StarkNet account address. Can be specified via command-line arguments or environment variables.
- `signer`: Options related to signer configuration.
- `legacy`: Enables the use of a legacy account (cairo0 account).

## Public Methods

- `account(provider, env_metadata)`: Creates a StarkNet account using the specified options. Takes into account the configuration priorities to determine the account address and other settings.
- `account_address(env_metadata)`: Returns the StarkNet account address. Takes into account the configuration priorities.

## Usage Examples

1. Specify the StarkNet account address and Starknet RPC URL using command-line arguments:

   ```bash
   sozo --account-address 0x123456789 --rpc-url http://localhost:7474/


## Starknet Options

- `rpc_url`: The URL of the Starknet RPC endpoint. Can be specified via command-line arguments or environment variables.

## Public Methods

- `provider(env_metadata)`: Creates a JSON-RPC client for interacting with the Starknet RPC endpoint. Takes into account the configuration priorities to determine the RPC URL.
- `url(env_metadata)`: Retrieves the RPC URL configured for Starknet options. Takes into account the configuration priorities.

## Usage Examples

1. Specify the Starknet RPC URL using a command-line argument:

   ```bash
   sozo --rpc-url http://localhost:7474/

