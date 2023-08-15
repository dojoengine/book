## system

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