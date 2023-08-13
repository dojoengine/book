## sozo reference

```sh
sozo [OPTIONS] <COMMAND>
```

#### help

`help` is used to print help information for a given subcommand.

```sh
sozo help
```

```sh
Commands:
  build        Build the world, generating the necessary artifacts for deployment
  init         Initialize a new project
  migrate      Run a migration, declaring and deploying contracts as necessary to update the world
  test         Test the project's smart contracts
  execute      Execute a world's system
  component    Interact with a worlds components
  system       Interact with a worlds systems
  register     Register new systems and components
  events       Queries world events
  auth         Manage world authorization
  completions  Generate shell completion file for specified shell
  help         Print this message or the help of the given subcommand(s)
```

#### build

`build` is used to compile the cairo contracts, generating the necessary artifacts for deployment. 

```sh
sozo build
```

#### init

`init` is used to initialize a new project. It will initialize a new project in the current directory by cloning the [dojo-starter](https://github.com/dojoengine/dojo-starter).

```sh
sozo init
```

#### migrate

`migrate` is used to run a migration (deployment), declaring and deploying contracts as necessary to update the world. You need to pass in a <WORLD_NAME> to the command to run the migration.

```sh
sozo migrate --<WORLD_NAME>
```

#### test

`test` is used to test the project's cairo contracts. It will run all tests found within the project.

```sh
sozo test
```

#### execute

`execute` is used to execute a world's system. 

```sh
sozo execute <SYSTEM> <CALLDATA>

# example: execute the spawn system
sozo execute spawn
```

#### component

`component` is used to read the componet state of the world. 

```sh
sozo component [OPTIONS] <COMMAND>
```

```sh
Commands:
  get     Get the class hash of a component
  schema  Retrieve the schema for a component
  entity  Get the component value for an entity
  help    Print this message or the help of the given subcommand(s)
```

```sh
# example: get the class hash of the Moves component
sozo component get Moves

# example: view the schema of the Moves component
sozo component schema Moves

# example: get the component value for an entity
sozo component entity Moves <ENTITY_ID>
```

#### system

`system` is used to interact with a worlds systems. 

```sh
sozo system [OPTIONS] <COMMAND>
```

```sh
Commands:
  get         Get the class hash of a system.
  dependency  Retrieve the component dependencies of a system.
  help        Print this message or the help of the given subcommand(s)
```

```sh
# example: get the class hash of the spawn system
sozo system get spawn

# example: get the component dependencies of the spawn system
sozo system dependency spawn
```

#### register

`register` is used to register new systems and components. 

```sh
sozo register [OPTIONS] <COMMAND>
```
    
```sh
Commands:
  component  Register a component to a world.
  system     Register a system to a world.
  help       Print this message or the help of the given subcommand(s)
```

```sh
# example: component - register a component to a world
# this will register the Moves component to the world
sozo register component Moves

# example: system - register a system to a world
# this will register the spawn system to the world
sozo register system spawn
```

#### events

`events` is used to queries world events. 

```sh
sozo events
```

#### auth

`auth` is used to manage world authorization. 

```sh
sozo auth [OPTIONS] <COMMAND>
```

```sh
Commands:
  writer  Auth a system with the given calldata.
  help    Print this message or the help of the given subcommand(s)
```

```sh
# example: writer - auth a system with the given calldata
# This will auth the spawn system with the writer role for Position component
sozo auth writer Position spawn
```

#### completions

`completions` is used to generate shell completion file for specified shell. 

```sh
sozo completions <SHELL>
```