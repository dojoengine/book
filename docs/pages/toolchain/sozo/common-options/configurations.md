# Configuration Priorities

The configuration system follows the following priority order:

1. Command-line arguments
2. Environment variables
3. Configuration in `Scarb.toml`

## Account Options

-   `account_address`: Starknet account address.
-   `signer`: Options related to signer configuration.
-   `legacy`: Enables the use of a legacy account (cairo0 account).

### Usage Examples

1. Specify the Starknet account address using command-line arguments:

```bash
sozo --account-address 0x123456789
```

## Starknet Options

-   `rpc_url`: The URL of the Starknet RPC endpoint. Can be specified via command-line arguments or environment variables.

### Usage Examples

1. Specify the Starknet RPC URL using a command-line argument:

```bash
sozo --rpc-url http://localhost:7474/
```

TODO: Add documentation of other common options
