# Development Guidelines

We advise you to develop within our provided development container for an optimized setup. However, if you choose to use your local environment, steps for both have been described below. 

## Setting Up the Language Server

Follow these steps to set up the language server:

1. Navigate to the Cairo directory.

```bash
cd cairo/vscode-cairo
```

2. Install the `@vscode/vsce` package globally using npm.

```bash
npm install --global @vscode/vsce
```

3. Install the required npm packages.

```bash
npm install
```

4. Package the VS Code extension.

```bash
vsce package
```

5. Install the newly created VS Code extension.

```bash
code --install-extension cairo1*.vsix
```

6. Navigate back to the dojo workspace and build the dojo language server.

```bash
cd /workspaces/dojo
cargo build --bin dojo-language-server --release
```

## Development Without a Container

To develop outside the container, you'll need to have Rust installed on your local system. You can install it from [Rust's official website](https://www.rust-lang.org/tools/install).

Once Rust is installed, set Rust to the stable version, update it, and run the test cases with the following command:

```bash
rustup override set stable && rustup update && cargo test
```

Then, follow the steps described above to set up the language server.

---

Please note: These instructions are simplified to facilitate easy setup. If you encounter any issues during setup, please refer to the respective tool's official documentation or reach out on our support channel.