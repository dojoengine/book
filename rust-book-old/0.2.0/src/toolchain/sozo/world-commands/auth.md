## sozo auth

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
