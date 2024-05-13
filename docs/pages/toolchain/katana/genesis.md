# Genesis Configuration

The Genesis Configuration feature in Katana allows you to define the initial state and settings of your blockchain network. This feature enables you to customize the chain's starting point and set up some aspects of the network according to your specific requirements. With this feature, you can:

- Specify the token used for network fees
- Allocate initial token balances to accounts
- Pre-declare classes at the start of the chain
- Pre-deploy smart contracts at the start of the chain

The genesis configuration provides a convenient way to customize the chain's starting point, reduce manual setup efforts, and ensure a consistent and predictable initial state for your applications and smart contracts.

## Configuration File Format

The genesis config file is a JSON file that contains the following fields:

- `number`: The block number of the genesis block.
- `parentHash`: The parent hash of the genesis block.
- `timestamp`: The timestamp of the genesis block.
- `stateRoot`: The state root of the genesis block.
- `sequencerAddress`: The sequencer address.
- `gasPrices`: The gas prices for the L1 tokens at the genesis block.
- `feeToken`: The network fee token configuration (optional).
- `universalDeployer`: The universal deployer configuration (optional).
- `accounts`: The genesis allocations.
- `contracts`: The genesis contract deployments.
- `classes`: The classes to declare at genesis.

## Usage Examples

### 1. Creating Genesis Accounts

Genesis accounts are initialized with predefined balances and settings.

```json
"accounts": {
    "0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a": {
        "publicKey": "0x1",
        "balance": "0xD3C21BCECCEDA1000000",
        "nonce": "0x1",
        "class": "0x444",
        "storage": {
            "0x1": "0x1",
            "0x2": "0x2"
        }
    },
    "0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114": {
        "publicKey": "0x2",
        "balance": "0xD3C21BCECCEDA1000000"
    },
    "0x79156ecb3d8f084001bb498c95e37fa1c4b40dbb35a3ae47b77b1ad535edcb9": {
        "publicKey": "0x3"
    }
}
```

### 2. Deploying Contracts & Declaring Classes

Deploy smart contracts and declare associated classes at the genesis block.

```json
"contracts": {
    "0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af": {
        "balance": "0xD3C21BCECCEDA1000000",
        "class": "0x8",
        "storage": {
            "0x1": "0x1",
            "0x2": "0x2"
        }
    }
},
"classes": [
    {
        "class": "path/to/file/erc20.json",
        "classHash": "0x8"
    }
]
```

### 3. Custom Fee Token

Define a custom token for network fees.

```json
"feeToken": {
    "address": "0x55",
    "name": "ETHER",
    "symbol": "ETH",
    "decimals": 18,
    "class": "0x8",
    "storage": {
        "0x111": "0x1",
        "0x222": "0x2"
    }
}
```
