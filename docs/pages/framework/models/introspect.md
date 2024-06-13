# Introspection

Within Dojo, all the models implement the [`Introspect` trait](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L57). This trait is used to describe the layout of the model's data, which is both used by the world database engine and [Torii](/toolchain/torii) to automatically index the data.

The `dojo-core` library already implements the `Introspect` trait for Cairo built-in types.

## Custom Types

For user defined types, it's crucial to implement the `Introspect` trait if you plan to use those types inside a model.

Two possible cases:

1. If the user-defined type **contains only Cairo built-in types** and is defined within your project, simply derive `Introspect` and the implementation for the type will be handled automatically by Cairo.

```rust
// [!code word:Introspect]
#[derive(Drop, Serde, Introspect)]
struct Stats {
    atk: u8,
    def: u8,
}
```

2. If the user-defined type **includes a type that is either defined outside of your project or is an unsupported type**, you will need to manually implement the `Introspect` trait.

## Implement the trait

The trait has this signature:
```rust
trait Introspect<T> {
    fn size() -> Option<usize>;
    fn layout() -> Layout;
    fn ty() -> Ty;
}
```

The `size` function should return `None` if your model, or any type within it, includes at least one dynamic type such as `ByteArray` or `Array`.

Here are the definition of [`Ty`](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L24) and [`Layout`](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L8).

As an example of implementation, consider the following:

```rust
// My project.
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    token_id: u256,
    stats: Stats,
}

// From an other project imported as a dependency.
struct Stats {
    atk: u8,
    def: u8,
}
```

```rust
impl MovesIntrospect of dojo::database::introspect::Introspect<Moves> {
    #[inline(always)]
    fn size() -> Option<usize> {
        Option::Some(2)
    }

    fn layout() -> dojo::database::introspect::Layout {
        dojo::database::introspect::Layout::Struct(
            array![
                dojo::database::introspect::FieldLayout {
                    selector: selector!("atk"),
                    layout: dojo::database::introspect::Introspect::<u8>::layout()
                },
                dojo::database::introspect::FieldLayout {
                    selector: selector!("def"),
                    layout: dojo::database::introspect::Introspect::<u8>::layout()
                },
            ]
                .span()
        )
    }

    #[inline(always)]
    fn ty() -> dojo::database::introspect::Ty {
        dojo::database::introspect::Ty::Struct(
            dojo::database::introspect::Struct {
                name: 'Stats',
                attrs: array![].span(),
                children: array![
                    dojo::database::introspect::Member {
                        name: 'atk',
                        attrs: array![].span(),
                        ty: dojo::database::introspect::Introspect::<u8>::ty()
                    },
                    dojo::database::introspect::Member {
                        name: 'def',
                        attrs: array![].span(),
                        ty: dojo::database::introspect::Introspect::<u8>::ty()
                    },
                ]
                    .span()
            }
        )
    }
}
```

:::warning
Use `#[inline(always)]` wisely to avoid hidden bugs during the cairo to sierra compilation. Usually it's fine to use it with dojo utils functions. In case you're using a function you don't know the complexity of, you should avoid using it.
:::

<!-- TODO: add more details on some specific cases -->
