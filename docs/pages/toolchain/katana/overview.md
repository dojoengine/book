![katana](/katana-icon-word.png)

Katana is a _blazingly fast_ Starknet sequencer, designed to support both local development as well as production deployments.

In development mode, Katana provides the tool necessary for rapid iteration, including custom development RPCs for manipulating the execution context.

In production mode, Katana provides a high performance sequencer optimized for gaming workloads, with support for settlment and cross layer communication.

### Features highlight

- [Starknet JSON-RPC v0.6.0](https://github.com/starkware-libs/starknet-specs/tree/v0.6.0) support
- Cross layer communication (L1 <> L2, LN <> LN+1)
- Development RPC methods for manipulating the blockchain states
- State forking
- Highly configurable

## Installation

`katana` binary is available via [`dojoup`](/getting-started/quick-start.md).

### Installing from source

```sh
git clone https://github.com/dojoengine/dojo
cd dojo
cargo install --path ./bin/katana --locked --force
```

### Usage

You can run Katana without any arguments to start the sequencer with default settings.

```console
katana
```

```console


██╗  ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗ █████╗
██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗
█████╔╝ ███████║   ██║   ███████║██╔██╗ ██║███████║
██╔═██╗ ██╔══██║   ██║   ██╔══██║██║╚██╗██║██╔══██║
██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝


PREDEPLOYED CONTRACTS
==================

| Contract        | Fee Token
| Address         | 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
| Class Hash      | 0x02a8846878b6ad1f54f6ba46f5f40e11cee755c677f130b2c4b60566c9003f1f

| Contract        | Universal Deployer
| Address         | 0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf
| Class Hash      | 0x07b3e05f48f0c69e4a65ce5e076a66271a527aff2c34ce1083ec6e1526997a69

| Contract        | Account Contract
| Class Hash      | 0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c


PREFUNDED ACCOUNTS
==================

| Account address |  0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca
| Private key     |  0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a
| Public key      |  0x640466ebd2ce505209d3e5c4494b4276ed8f1cde764d757eb48831961f7cdea

| Account address |  0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a
| Private key     |  0x14d6672dcb4b77ca36a887e9a11cd9d637d5012468175829e9c6e770c61642
| Public key      |  0x16e375df37a7653038bd9eccd767e780c2c4d4c66b4c85f455236a3fd75673a

| Account address |  0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af
| Private key     |  0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912
| Public key      |  0x33246ce85ebdc292e6a5c5b4dd51fab2757be34b8ffda847ca6925edf31cb67

| Account address |  0x2d71e9c974539bb3ffb4b115e66a23d0f62a641ea66c4016e903454c8753bbc
| Private key     |  0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b
| Public key      |  0x4c0f884b8e5b4f00d97a3aad26b2e5de0c0c76a555060c837da2e287403c01d

| Account address |  0x3ebb4767aae1262f8eb28d9368db5388cfe367f50552a8244123506f0b0bcca
| Private key     |  0x3e3979c1ed728490308054fe357a9f49cf67f80f9721f44cc57235129e090f4
| Public key      |  0x1e8965b7d0b20b91a62fe515dd991dc9fcb748acddf6b2cf18cec3bdd0f9f9a

| Account address |  0x541da8f7f3ab8247329d22b3987d1ffb181bc8dc7f9611a6eccec3b0749a585
| Private key     |  0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8
| Public key      |  0x570258e7277eb345ab80803c1dc5847591efd028916fc826bc7cd47ccd8f20d

| Account address |  0x56c155b624fdf6bfc94f7b37cf1dbebb5e186ef2e4ab2762367cd07c8f892a1
| Private key     |  0x6bf3604bcb41fed6c42bcca5436eeb65083a982ff65db0dc123f65358008b51
| Public key      |  0x4b076e402835913e3f6812ed28cef8b757d4643ebf2714471a387cb10f22be3

| Account address |  0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03
| Private key     |  0x1800000000300000180000000000030000000000003006001800006600
| Public key      |  0x2b191c2f3ecf685a91af7cf72a43e7b90e2e41220175de5c4f7498981b10053

| Account address |  0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a
| Private key     |  0x283d1e73776cd4ac1ac5f0b879f561bded25eceb2cc589c674af0cec41df441
| Public key      |  0x73c8a29ba0e6a368422d0551b3f45a30a27166b809ba07a41a1bc434b000ba7

| Account address |  0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114
| Private key     |  0x1c9053c053edf324aec366a34c6901b1095b07af69495bffec7d7fe21effb1b
| Public key      |  0x4c339f18b9d1b95b64a6d378abd1480b2e0d5d5bd33cd0828cbce4d65c27284


ACCOUNTS SEED
=============
0


🚀 JSON-RPC server started: http://0.0.0.0:5050


```

> 📚 **CLI Reference**
>
> See the [`katana` Reference](/toolchain/katana/reference.md) for an in depth reference and documentation on all the available subcommands and options.
