## sozo execute

`execute` is used to execute a World's system.

Performing a system execution requires sending a transaction, therefore, `execute` expects an account address as well as its respective private key in order to sign the transaction before sending it.

### USAGE

```sh
sozo execute <SYSTEM> [OPTIONS]
```

### OPTIONS

#### General Options

`--calldata` _CALLDATA_  
&nbsp;&nbsp;&nbsp;&nbsp;The calldata to be passed to the system that you want to execute.  
&nbsp;&nbsp;&nbsp;&nbsp;Comma separated values e.g., 0x12345,0x69420.

#### World Options

{{#include ../common/world-options.md}}

#### Starknet Options

{{#include ../common/starknet-options.md}}

#### Account Options

{{#include ../common/account-options.md}}

#### Signer Options - Raw

{{#include ../common/signer-options-raw.md}}

#### Signer Options - Keystore

{{#include ../common/signer-options-keystore.md}}

### EXAMPLES

1. Executing the _position_ system which takes two values (_x_: 0x77 and _y_: 0x44)

```sh
sozo execute position --calldata 0x77,0x44
```
