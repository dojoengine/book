# 0. Setup

_Before you start, I recommend you to follow `hello-dojo` chaper to get a brief understanding of dojo game._

## sozo init

Create a new Dojo project using `sozo init`. Check if you already installed `sozo`. (If not, check out installation [page](../../getting-started/installation.md) )

Open your empty game folder and open the terminal.

```sh
sozo init
```

## setup

There are lots of boilerplate codes. We don't need it, so remove all the codes for now. Make `components.cairo` and `systmems.cairo` files blank.

Keep `lib.cairo` only the following codes:

```rust
mod components;
mod systems;
```

Build your initial setup project using `sozo build`.

## Basic components
