![sozo](/sozo-icon-word.png)

`sozo` is a powerful all-in-one tool for managing your Dojo projects. It helps with everything from scaffolding a new project, all the way to deploying and interacting with your Dojo Worlds. It includes a migration planning tool, designed to streamline the updating and deployment of AWs. It provides a robust command-line interface (CLI) that simplifies World management tasks, enabling you to focus on the creative aspects of World-building. In the future, it may include a GUI.

## Features

-   **Binary CLI**: Sozo provides an intuitive binary CLI, ensuring easy management of your Worlds, whether you're updating existing ones or deploying new ones.

## Installation

`sozo` binary can be installed via [`dojoup`](/installation.mdx), our dedicated installation package manager.

### Installing from Source

```sh
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./bin/sozo --locked --force
```

This will install Sozo and the required dependencies on your local system.

## Calldata format

In the Dojo ecosystem, several tools or configuration files like `sozo` and the `dojo_<PROFILE>.toml` file require some calldata to be provided. This page describes the format which is expected for these calldata.

By default, any calldata value is a Cairo felt or any type that fits into one felt.

To be decoded as other Cairo types, calldata values must be prefixed. Here is a list of available prefixes:

| Prefix          | Description      | Example |
| --------------- | ---------------- | ------- |
| `u256`          | a 256-bit unsigned integer | `u256:0x1234` |
| `str`           | a Cairo string (ByteArray) | `str:'hello world'` |
| `sstr`          | a Cairo short string       | `sstr:'hello world'` |
| `int`           | a signed integer that fits into a `i128` | `int:0x1234` |
| `arr`           | a dynamic array of values that fits into one felt | `arr:0x01,0x02,0x03` |
| `u256arr`       | a dynamic array of 256-bit unsigned integers | `u256arr:0x01,0x02,0x03` |
| `farr`          | a fixed-size array of values that fits into one felt | `farr:0x01,0x02,0x03` |
| `u256farr`      | a fixed-size array of 256-bit unsigned integers | `u256farr:0x01,0x02,0x03` |
