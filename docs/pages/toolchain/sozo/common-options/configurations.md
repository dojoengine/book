# Account Options

This module provides options for configuring an account in the `sozo` command.

## Configuration Priorities

The configuration system follows the following priority order:
1. Command-line arguments
2. Environment variables
3. Configuration in `Scarb.toml`

## Account Options

- `account_address`: Starknet account address. Can be specified via command-line arguments or environment variables.
- `signer`: Options related to signer configuration.
- `legacy`: Enables the use of a legacy account (cairo0 account).

## Public Methods

- `account(provider, env_metadata)`: Creates a Starknet account using the specified options. Takes into account the configuration priorities to determine the account address and other settings.
- `account_address(env_metadata)`: Returns the Starknet account address. Takes into account the configuration priorities.

## Usage Examples

1. Specify the Starknet account address and Starknet RPC URL using command-line arguments:

   ```bash
   sozo --account-address 0x123456789 --rpc-url http://localhost:7474/
   ```


## Starknet Options

- `rpc_url`: The URL of the Starknet RPC endpoint. Can be specified via command-line arguments or environment variables.

## Usage Examples

1. Specify the Starknet RPC URL using a command-line argument:

   ```bash
   sozo --rpc-url http://localhost:7474/
   ```
