## Genesis Configuration

Katana's genesis configuration feature allows you to define the **initial state** and settings of your blockchain network. This feature enables you to **customize** the chain's starting point and set up some aspects of the network according to your specific requirements. With this feature, you can:

1. Specify the **token** used for network fees
2. **Allocate** initial token balances to accounts
3. **Pre-declare classes** at the start of the chain
4. **Pre-deploy smart contracts** at the start of the chain

The genesis configuration provides a convenient way to customize the chain's starting point, **reduce manual setup** efforts, and ensure a **consistent** and predictable initial state for your applications and smart contracts.

### Configuration File Format

The genesis config file is a JSON file that contains the following fields:

- `number`  
*The block number of the genesis block.*
- `parentHash`  
*The parent hash of the genesis block.*
- `timestamp`  
*The timestamp of the genesis block.*
- `stateRoot`  
*The state root of the genesis block.*
- `sequencerAddress`  
*The sequencer address.*
- `gasPrices` *The gas prices for the L1 tokens at the genesis block.*  
    - `ETH`   
  	*The price of ETH in wei.*
    - `STRK`  
	*The price of STRK in fri.*
- `feeToken` *The network fee token configuration. (optional)* 
	- `name`  
	*The name of the fee token.*
	- `symbol`  
	*The symbol of the fee token.*  
	- `decimals`  
	*The number of decimal places for the fee token.*
    - `address` (optional)  
  	*The fee token contract address.* 
	- `class`  (optional)  
  	*The class of the fee token.* 
	- `storage` (optional)  
    *Key-value pairs for the fee token's storage.*
- `universalDeployer` *The universal deployer configuration. (optional)*
	- `address` (optional)  
	*The universal deployer contract address.* 
	- `storage` (optional)  
	*Key-value pairs for the universal deployer's storage.* 
- `accounts` *The genesis allocations.*
	- <CONTRACT_ADDRESS> *The address of the account contract.* 
		- `publicKey`  
		*The public key associated with the account.*  
		- `privateKey` (optional)  
		*The private key associated with publicKey.* 
		- `balance` (optional)  
		*The initial balance of the account.* 
		- `nonce` (optional)  
		*The nonce of the account.* 
		- `class` (optional)  
		*The class to be used for the account contract.* 
		- `storage` (optional)  
		*Key-value pairs for the account's storage.* 
- `contracts` *Genesis contract deployments.*  
    - <CONTRACT_ADDRESS> *The address of the contract.* 
		- `class`  
		*The class of the contract.*  
		- `balance` (optional)    
		 *The balance allocated to the contract.*  
		- `storage` (optional)  
		*Key-value pairs for the contract's storage.*  
- `classes`  *Classes to declare at genesis.*  
    - `class`  
    *The path to the class artifact file relative to the genesis config file, or the full class artifact object.*  
    - `classHash` (optional)
    *The hash of the class. To override the actual class hash that will be computed from the class definition itself.*  

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
			"class": "path/to/file/erc20.json",
			"classHash": "0x8"
		},
		{
			"class": "path/to/file/universal_deployer.json",
			"classHash": "0x444"
		},
		{
			"class": {
				"abi": [
					{
						"members": [
							{ "name": "to", "offset": 0, "type": "felt" },
							{ "name": "selector", "offset": 1, "type": "felt" },
							{ "name": "data_offset", "offset": 2, "type": "felt" },
							{ "name": "data_len", "offset": 3, "type": "felt" }
						],
						"name": "AccountCallArray",
						"size": 4,
						"type": "struct"
					}
				],
                ...
			}
		}
	]
}
```
