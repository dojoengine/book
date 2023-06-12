# Dojo Engine - Getting Started Guide

This README guides you through the process of setting up your local development environment for Dojo.

## Prerequisites

- Rust
- Cairo

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/dojoengine/dojo.git
```

## Setup Guide

### Linux & Mac

#### 1. Install Rust and Dependencies

Start by installing Rust and running the test suite to confirm your setup:

```bash
rustup override set stable && rustup update && cargo test
```

> Note: Depending on your Linux distribution, you may need to install additional dependencies. Make sure to install any suggested or missing dependencies that arise during the setup process.

#### 2. Install Scarb Package Manager

Next, install the [Scarb](https://docs.swmansion.com/scarb) package manager by running:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

#### 3. Setup Cairo VSCode Extension

For proper linting and syntax highlighting, you should install the Cairo 1.0 extension for Visual Studio Code.

- Clone the Cairo repository somewhere on your machine (make sure not to clone within the Dojo directory).

```bash
git clone https://github.com/starkware-libs/cairo.git
```

- Install the Cairo Language Server extension. Here's a step-by-step guide, or you can follow the [official instructions](https://github.com/starkware-libs/cairo/blob/main/vscode-cairo/README.md).

Navigate to the vscode-cairo directory:

```bash
cd cairo/vscode-cairo
```

Install the required packages:

```bash
sudo npm install --global @vscode/vsce
npm install
```

Package the extension:

```bash
vsce package
```

Install the extension:

```bash
code --install-extension cairo1*.vsix
```

> **Mac Tip:** If you don't have the `code` command, in VSCode do `Cmd+Shift+P` and type 'shell command' to find the Shell Command: Install 'code' command in PATH command.

The Cairo language server should now be installed globally in your Visual Studio Code. If you have the server enabled, Scarb should automatically pick this up and start linting your Cairo files.

### Windows

_Coming soon_

### Container

_Coming soon_
