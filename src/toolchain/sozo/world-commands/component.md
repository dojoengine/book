## sozo component

`component` is used to interact with a World's components. It is useful for querying about a component's information, or a component value of an entity.

### USAGE

```sh
sozo component <COMMAND>

Commands:
  get     Get the class hash of a component
  schema  Retrieve the schema for a component
  entity  Get the component value for an entity
```

### SUBCOMMANDS

#### `get`

Get the class hash of a component

```sh
sozo component get <NAME>
```

##### Arguments

_`NAME`_  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the component

#### `schema`

Retrieve the schema for a component

```sh
sozo component schema <NAME>
```

##### Arguments

_`NAME`_  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the component

#### `entity`

Get the component value for an entity

```sh
sozo component entity <NAME> [KEYS]...
```

##### Arguments

_`NAME`_  
 &nbsp;&nbsp;&nbsp;&nbsp;The name of the component

_`KEYS`_  
 &nbsp;&nbsp;&nbsp;&nbsp;The keys of the entity that you want to query.  
 &nbsp;&nbsp;&nbsp;&nbsp;Comma separated values e.g., 0x12345,0x69420,...

### OPTIONS

#### World Options

{{#include ../common/world-options.md}}

#### Starknet Options

{{#include ../common/starknet-options.md}}
