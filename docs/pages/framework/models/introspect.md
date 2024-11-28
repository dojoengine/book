# Introspection

In Dojo, every model automatically implements the [`Introspect` trait](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L57). This trait outlines the data structure of the model, which is utilized by both the world database engine and [Torii](/toolchain/torii) for automatic data indexing.

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
impl StatsIntrospect of dojo::database::introspect::Introspect<Stats> {
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

## IntrospectPacked trait

In some situations, you might need to store a model in a packed way. This is useful when you know the size of the model and want to save some storage space.

For this, you can derive the `IntrospectPacked` trait, which will force the use of the [`Fixed` layout](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L9).

```rust
// [!code word:IntrospectPacked]
#[derive(Drop, Serde, IntrospectPacked)]
struct Stats {
    atk: u8,
    def: u8,
}
```

Dynamic types such as `ByteArray` and `Array` are prohibited in a packed model. However, you can include other Cairo structs within a packed model, provided these structs also implement the `IntrospectPacked` trait.

:::tip
Old Dojo versions (before `0.7.0`) used to implement only the `IntrospectPacked` trait. Hence, you should use this trait if you're upgrading from an old version of Dojo.
:::

## Storage and layout

The [`Layout`](https://github.com/dojoengine/dojo/blob/78c88e5c4ffaa81134fb95e783c839efddf8e56b/crates/dojo-core/src/database/introspect.cairo#L8) enum describes the storage layout of the model in the Dojo database engine.

When the `Fixed` layout is used, all the fields of the model are stored in a single storage location, in the order of the fields in the struct. This has the advantage of saving storage space, but it also means that the fields are stored contiguously in memory, which can be a disadvantage if you need to upgrade your model ending up with a new storage layout.

For other layouts, each field is stored independently in a different storage location, computed from the field's selector (like Starknet does with regular contract's storage). This has the advantage of allowing for more flexible storage layouts, but it also means more gas to compute the storage location of a field as hash computation is involved.

<!-- TODO: add more details on the storage related to introspect. -->
