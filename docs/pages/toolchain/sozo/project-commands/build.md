## sozo build

`build` is used to compile the cairo contracts, generating the necessary artifacts for deployment.

```sh
sozo build
```

The `build` command will also generate the manifests files into `manifests/<profile_name>/base` folder.
Those files contains the information about the contracts at compile time.

The `build` command can also generate the bindings for different backends. Currently, two backends are supported:

- typescript
- unity

You do so by passing the flag associated to each backend.
For example, to generate the unity bindings, you can do:

```sh
sozo build --unity
```

If you encounter the error message `<error: could not execute process>`, this indicates that Cargo experienced an issue while attempting to retrieve the project's dependencies. Use the command, as this  resolve the problem.

```sh
cargo fetch
```