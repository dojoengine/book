## sozo system

`system` is used to interact with a World's systems. It is useful for querying about a system's information.

### USAGE

```sh
sozo system <COMMAND>

Commands:
  get         Get the class hash of a system.
  dependency  Retrieve the component dependencies of a system.
```

### SUBCOMMANDS

#### `get`

Get the class hash of a system

```sh
sozo system get <NAME>
```

#### `dependency`

Retrieve the component dependencies of a system

```sh
sozo system dependency <NAME>
```

##### Arguments

_`NAME`_  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the system

### OPTIONS

#### World Options

{{#include ../common/world-options.md}}

#### Starknet Options

{{#include ../common/starknet-options.md}}

### EXAMPLES

1. Get the class hash of the _spawn_ system

```sh
sozo system get spawn
```

2. Get the component dependencies of the _spawn_ system

```
sozo system dependency spawn
```
