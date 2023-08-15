## component

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