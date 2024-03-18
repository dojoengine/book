## Genesis configuration

### Configuration file format

- `number`: The block number of the genesis block.
- `parentHash`: The parent hash of the genesis block.
- `timestamp`: The timestamp of the genesis block.
- `stateRoot`: The state root of the genesis block.
- `sequencerAddress`: The sequencer address.
- `gasPrices`: The gas prices for the L1 tokens at the genesis block.  
&nbsp; - `ETH`: The price of ETH in wei.  
&nbsp; - `STRK`: The price of STRK in fri.
- `feeToken` (optional): The network fee token configuration.  
&nbsp; - `address`: The fee token contract address.  
&nbsp; - `name`: The name of the fee token.  
&nbsp; - `symbol`: The symbol of the fee token.  
&nbsp; - `decimals`: The number of decimal places for the fee token.  
&nbsp; - `class`: The class of the fee token.  
&nbsp; - `storage`: Key-value pairs for the fee token's storage.
- `universalDeployer` (optional): The universal deployer configuration.  
&nbsp; - `address`: The universal deployer contract address.  
&nbsp; - `storage`: Key-value pairs for the universal deployer's storage.  
- `accounts`: The genesis allocations.  
&nbsp; - <account_address>:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `publicKey`: The public key associated with the account.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `privateKey` (optional): The private key associated with publicKey.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `balance`: The initial balance of the account.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `nonce`: The nonce of the account.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `class` (optional): The class to be used for the account contract.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `storage` (optional): Key-value pairs for the account's storage.
- `contracts`: Contract configurations.  
&nbsp; - <contract_address>:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `balance`: The balance allocated to the contract.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `class`: The class of the contract.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `storage` (optional): Key-value pairs for the contract's storage.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `classes`: Classes to declare at genesis.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `class`: The path to the class file.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `classHash`: The hash of the class.

### Example

```jsonc
{
	"number": 0,
	"parentHash": "0x999",
	"timestamp": 5123512314,
	"stateRoot": "0x99",
	"sequencerAddress": "0x100",
	"gasPrices": {
		"ETH": 1111,
		"STRK": 2222
	},
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
	},
	"universalDeployer": {
		"address": "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
		"storage": {
			"0x10": "0x100"
		}
	},
	"accounts": {
		"0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a": {
			"publicKey": "0x1",
			"balance": "0xD3C21BCECCEDA1000000",
			"nonce": "0x1",
			"class": "0x80085",
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
		},
		"0x053a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf": {
			"publicKey": "0x4",
			"balance": "0xD3C21BCECCEDA1000000",
			"privateKey": "0x115"
		}
	},
	"contracts": {
		"0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af": {
			"balance": "0xD3C21BCECCEDA1000000",
			"class": "0x8",
			"storage": {
				"0x1": "0x1",
				"0x2": "0x2"
			}
		},
		"0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a": {
			"balance": "0xD3C21BCECCEDA1000000"
		},
		"0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c": {
			"storage": {
				"0x1": "0x1"
			}
		}
	},
	"classes": [
		{
			"class": "../../contracts/compiled/erc20.json",
			"classHash": "0x8"
		},
		{
			"class": "../../contracts/compiled/universal_deployer.json",
			"classHash": "0x80085"
		},
		{
			"class": "../../contracts/compiled/oz_account_080.json",
			"classHash": "0xa55"
		}
	]
}
```
