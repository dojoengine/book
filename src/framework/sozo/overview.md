# Sozo

Sozo is a powerful migration planning tool designed to streamline the updating and deployment of AWs. It provides a robust binary command-line interface (CLI) that simplifies World management tasks, enabling you to focus on the creative aspects of World-building. Future versions will provide a GUI.

## Features

- **Binary CLI**: Sozo provides an intuitive binary CLI, ensuring easy management of your Worlds, whether you're updating existing ones or deploying new ones.

## Installation

The `sozo` binary can be installed via [`dojoup`](../../getting-started/installation.md), our dedicated installation package manager.

### Installing from Source

If you prefer to install from the source code:

```sh
cargo install --path ./crates/sozo --profile local --force
```

This will install Sozo and the required dependencies on your local system.

### Usage

To build and deploy your Worlds onto the local network using Sozo, use the `migrate` command

```bash
sozo --migrate examples/
```

This command will prompt Sozo to build and deploy all Worlds found within the specified directory.
