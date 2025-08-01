---
title: Katana Development Features
description: Guide to Katana's development features including mining modes, storage options, network forking, and RPC interfaces for local blockchain development.
---

# Development Features

Katana provides essential development features designed to streamline local blockchain development and testing workflows.

## Mining Modes

Katana offers flexible block production through different mining modes.

:::info
By default, blocks are mined instantly when transactions are received.
:::

### Interval Mining

Interval mining creates blocks at regular time intervals rather than on each transaction.
Enable this mode with the `--block-time <MILLISECONDS>` flag:

```sh
# Produces a new block every 10 seconds
katana --block-time 10000
```

### On-demand Mining

On-demand mining gives you complete control over when blocks are created.
This mode is ideal for testing scenarios where you need precise timing control.

Transactions are processed immediately but remain pending until you manually trigger block creation using the [`generateBlock`](/toolchain/katana/reference#dev-namespace) RPC method.
When called, all pending transactions are included in the new block.

To enable on-demand mining, use the `--no-mining` flag.

```sh
katana --no-mining
```

## Storage Modes

Katana supports two storage modes to match different development needs:

**In-Memory (Default)**: All data is stored in RAM and cleared when Katana stops.
This provides best performance by avoiding disk operations, making it perfect for rapid testing and experimentation.

**Persistent Storage**: Chain state is saved to disk and restored on restart.
This is useful for production deployments, extended testing sessions, or when you need to preserve complex game states.

### Persistent Storage

Enable persistent storage with the `--db-dir <PATH>` flag.
Katana will create a new database file or load an existing database at the specified location.

:::note
Forked mode only supports in-memory storage.
Persistent storage for forked networks is not yet available.
:::

#### Usage Examples

```sh
# Initialize a new database in the specified directory
katana --db-dir ./katana-db
```

```sh
# Resume from a previously saved state
katana --db-dir ./existing-katana-db
```

## State Forking

State forking lets you create a local copy of any Starknet network, allowing you to test against real deployed contracts without having to manually reconstruct the chain state.

Configure forking with the `--fork.provider <URL>` flag.
Katana forks from the latest block by default, or specify a particular block with `--fork.block <BLOCK_NUMBER>`.

Once forked, you can:

- Deploy new contracts that interact with existing live contracts
- Use pre-funded Katana accounts to simulate user interactions
- Test complex scenarios without mainnet costs or setup overhead

This is especially valuable for testing integrations with established protocols or validating contract behavior against real network conditions before mainnet deployment.

:::note
Forking currently supports blockchain state (storage, classes, nonces) but not historical data (blocks, transactions, receipts, events).
Full historical data support is planned.
:::

#### Usage Example

Fork Starknet mainnet at a specific block.
Your local node will have all mainnet state up to that block and continue with new local blocks:

```sh
# Forks mainnet at block 1200
katana --fork.block 1200 \
    --fork.provider "https://api.cartridge.gg/x/starknet/mainnet"
```

## Cairo Native Compilation

Cairo Native provides significant performance improvements by compiling Cairo programs to native machine code instead of using VM interpretation.
This optional feature uses MLIR and LLVM for ahead-of-time compilation, offering substantial execution speed gains for compute-intensive contracts.

Native compilation can provide:

- **Faster contract execution** through optimized machine code
- **Reduced CPU overhead** compared to VM interpretation
- **Better performance scaling** for complex Cairo programs

### Enabling Native Compilation

Cairo Native must be enabled at compile time and runtime:

**Compile-time**: Build Katana with the `native` feature flag:
```bash
cargo build --release --features native
```

:::note
If installing Katana with `asdf`, pass `ASDF_NATIVE_BUILD=true` for the native build.
:::

**Runtime**: Enable native compilation when starting Katana:
```bash
katana --enable-native-compilation
```

### Development Considerations

**When to Use**:
- Performance testing and benchmarking
- Compute-heavy contract development
- Production environments requiring maximum throughput

**Trade-offs**:
- Increased compilation time during contract loading
- Additional system dependencies (LLVM 19)
- Larger binary size and memory usage

:::note
Native compilation requires LLVM 19 dependencies.
Install with `make native-deps-macos` (macOS) or `make native-deps-linux` (Linux).
:::

#### Usage Example

Start Katana with native compilation for performance testing:
```bash
katana --dev --enable-native-compilation --block-time 1000
```

## Metrics and Monitoring

Katana includes a built-in metrics system that exposes performance data in [Prometheus](https://prometheus.io/) format.
This enables monitoring of blockchain performance, resource usage, and transaction processing statistics.

### Available Metrics

Katana collects metrics across multiple components:
- **Block production**: Gas processed, Cairo steps, block timing
- **System resources**: Memory usage, CPU utilization, disk I/O
- **RPC performance**: Request latency, error rates, throughput
- **Transaction pool**: Pending transactions, validation times

### Enabling Metrics

Start the metrics server on port 9100:
```bash
katana --metrics
```

Customize the metrics server address and port:
```bash
katana --metrics --metrics.addr 0.0.0.0 --metrics.port 8080
```

Query metrics directly via HTTP:
```bash
curl http://127.0.0.1:9100/metrics
```

Sample metrics output:
```
# HELP block_producer_l1_gas_processed_total The amount of L1 gas processed in a block
# TYPE block_producer_l1_gas_processed_total counter
block_producer_l1_gas_processed_total 2500000

# HELP process_resident_memory_bytes Resident memory size in bytes
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 45670400
```

#### Usage Example

Enable metrics during testing to monitor performance:
```bash
# Start Katana with metrics
katana --dev --metrics --dev.no-fee

# Monitor block production in another terminal
watch -n 1 'curl -s http://127.0.0.1:9100/metrics | grep block_producer'
```

This provides real-time visibility into your local blockchain's performance characteristics during development and testing.

## Extended JSON-RPC Interface

Katana provides a comprehensive RPC interface for development and interaction.
RPC commands are organized across multiple namespaces:

- **`starknet`**: Standard Starknet RPC methods for contract calls and queries
- **`dev`**: Development utilities like manual block mining and time control
- **`katana`**: Node-specific endpoints for configuration and account info
- **`torii`**: ECS entity/component queries for Dojo integration

#### Usage Example

Generate blocks on-demand when using `--no-mining` mode:

```bash
curl -X POST http://127.0.0.1:5050 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"dev_generateBlock","params":[],"id":1}'
```

:::tip
See the complete [RPC Reference](/toolchain/katana/reference#json-rpc-interface) for detailed method documentation and examples.
:::
