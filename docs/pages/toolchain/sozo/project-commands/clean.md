## sozo clean

`clean` is used to remove the build artifacts to ensure you're not keeping old files that are not overwritten by the [build](/toolchain/sozo/project-commands/build.md) command.

Sozo produces two kinds of artifacts when `build` command is issued:

1. Scarb artifacts: which are present into `target/<profile_name>` folder.
2. Manifests: which are present into `manifests/<profile_name>/base` folder.

The `clean` command operates only on the `base` manifests folder, which are the files generated at compile time.

### Usage

```sh
sozo clean
```

### OPTIONS

#### General Options

`--manifests-abis [-m]`  
&nbsp;&nbsp;&nbsp;&nbsp;Removes manifests files and associated abis only.
