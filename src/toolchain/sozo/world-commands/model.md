# models

## sozo model

`model` is used to interact with a World's models. It is useful for querying about a model's information, or a model value of an entity.

### USAGE

```sh
sozo model <COMMAND>

Commands:
  class-hash  Get the class hash of a model
  schema      Retrieve the schema for a model
  get         Get the model value for an entity
```

### SUBCOMMANDS

#### `class-hash`

Get the class hash of a model

```sh
sozo model class-hash <NAME>
```

##### Arguments

_`NAME`_  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the model

#### `schema`

Retrieve the schema for a model

```sh
sozo model schema <NAME>
```

##### Arguments

_`NAME`_  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the model

#### `get`

Get the model value for an entity

```sh
sozo model get <NAME> [KEYS]...
```

##### Arguments

_`NAME`_  
 &nbsp;&nbsp;&nbsp;&nbsp;The name of the model

_`KEYS`_  
 &nbsp;&nbsp;&nbsp;&nbsp;The keys of the entity that you want to query.  
 &nbsp;&nbsp;&nbsp;&nbsp;Comma separated values e.g., 0x12345,0x69420,...

### OPTIONS

#### World Options

{{#include ../common/world-options.md}}

#### Starknet Options

{{#include ../common/starknet-options.md}}
