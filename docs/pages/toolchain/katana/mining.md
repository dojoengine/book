## Mining Modes

In Katana, mining modes determine how frequent blocks are mined. By default, a new block is automatically mined as soon as a transaction is submitted.

You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the `--block-time <MILLISECONDS>` flag, as demonstrated in the following example.

```sh
# Produces a new block every 10 seconds
katana --block-time 10000
```