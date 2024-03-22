# Mining Modes

In Katana, mining modes determine how frequent blocks are produced. By default, a new block is automatically created as soon as a transaction is received.

## Interval Mining

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <MILLISECONDS>` flag, as demonstrated in the following example.

```sh
# Produces a new block for every 10 seconds
katana --block-time 10000
```

## On-demand Mining

On-demand mining is another mode of mining that allows users to manually create a new block. This mode is useful for testing purposes or when you want to create a block at a specific time. New blocks can only be created by calling the [`generateBlock`](/toolchain/katana/rpc/overview.md) RPC method of the `dev` namespace.

In on-demand mining mode, transactions will be executed after receiving them but blocks will not be mined until you have called the `generateBlock` RPC method. Upon calling it, a new block will be created and all the pending transactions will be included in it.

To enable on-demand mining, use the `--no-mining` flag.

```sh
katana --no-mining
```
