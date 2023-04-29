## Setup

# On windows:

Building dojo is currently not supported on windows yet...

In the future, we plan to compile it like this:

On admin powershell:

```powershell
choco install rust --yes
choco install --yes vscode
choco install rustup.install --yes
choco install protoc --yes
winget install LLVM.LLVM --force  --accept-source-agreements
```

On user powershell:

```powershell
git clone https://github.com/starkware-libs/cairo
cd cairo/vscode-cairo
npm install --global @vscode/vsce
npm install
vsce package
code --install-extension cairo1*.vsix
cd ..

rustup override set stable 
rustup update 
cargo test

git clone https://github.com/dojoengine/dojo
cd dojo
git submodule init
git submodule update
cargo build --bin dojo-language-server --release
```