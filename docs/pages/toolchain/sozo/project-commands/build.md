## sozo build

`build` is used to compile the cairo contracts, generating the necessary artifacts for deployment.

```sh
sozo build
```

The `build --<option>` command can generate the bindings for different backends. Currently, the following backends are supported:

- typescript
- typescript-v2
- unity

You do so by passing the flag associated to each backend.
For example, to generate the unity bindings, you can do:

```sh
sozo build --unity
```
