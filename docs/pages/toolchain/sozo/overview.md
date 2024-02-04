![katana](/sozo-icon-word.png)

## Sozo

`sozo` is a powerful all-in-one tool for managing your Dojo projects. It helps with everything from scaffolding a new project, all the way to deploying and interacting with your Dojo Worlds. It includes a migration planning tool, designed to streamline the updating and deployment of AWs. It provides a robust command-line interface (CLI) that simplifies World management tasks, enabling you to focus on the creative aspects of World-building. In the future, it may include a GUI.

## Features

- **Binary CLI**: Sozo provides an intuitive binary CLI, ensuring easy management of your Worlds, whether you're updating existing ones or deploying new ones.

## Installation

`sozo` binary can be installed via [`dojoup`](/getting-started/quick-start.md), our dedicated installation package manager.

### Installing from Source

```sh
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./bin/sozo --locked --force
```

This will install Sozo and the required dependencies on your local system.

> 📚 **Reference**
>
> See the [`sozo` Reference](/toolchain/sozo/reference.md) for a complete overview of all the available subcommands.
