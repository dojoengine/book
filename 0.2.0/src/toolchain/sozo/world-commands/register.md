## sozo register

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