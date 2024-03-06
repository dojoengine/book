## sozo register

`register` is used to register new models.

```sh
sozo register [OPTIONS] <COMMAND>
```

```sh
Commands:
  model  Register a model to a world.
  help   Print this message or the help of the given subcommand(s)

Options:
      --manifest-path <MANIFEST_PATH>
          Override path to a directory containing a Scarb.toml file.
          
          [env: DOJO_MANIFEST_PATH=]

  -v, --verbose...
          Increase logging verbosity

  -q, --quiet...
          Decrease logging verbosity

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

```sh
# example: register a model
# this will register a model with the given class-hash
sozo register model 0x764906a97ff3e532e82b154908b25711cdec1c692bf68e3aba2a3dd9964a15c
```
