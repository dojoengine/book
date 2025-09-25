---
title: Model Introspection
description: Learn about Dojo's model introspection system, including how to implement the Introspect trait and handle custom types.
---

# Introspection

:::note
Introspection is an advanced Dojo topic.
Beginning Dojo developers can skip this section.
:::

In Dojo, every model automatically implements the [`Introspect` trait](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/meta/introspect.cairo). This trait outlines the data structure of the model, which is utilized by both the world database engine and [Torii](/toolchain/torii) for automatic data indexing.

The `dojo/core` library already implements the `Introspect` trait for Cairo built-in types including:

- All primitive types (`u8`, `u16`, `u32`, `u64`, `u128`, `u256`, `felt252`, `bool`)
- Starknet types (`ContractAddress`, `ClassHash`, `EthAddress`)
- Container types (`Array<T>`, `Option<T>`, `ByteArray`)
- Tuple types up to reasonable complexity

:::info
`Introspect` is _not_ a Cairo language feature, but a special feature of the Dojo framework.
:::

## Custom Types

User-defined types must implement the `Introspect` trait to be used inside of a model.

### Automatic Implementation

If the user-defined type **contains only Cairo built-in types** and is defined within your project, simply derive `Introspect` and the implementation for the type will be handled automatically by Cairo.

```cairo
#[derive(Drop, Serde, Introspect)]
struct Stats {
    atk: u8, // Cairo primitive type
    def: u8,
}
```

### Manual Implementation

If the user-defined type **includes a type that is either defined outside of your project or is an unsupported type**, you will need to manually implement `Introspect`:

```cairo
trait Introspect<T> {
    fn size() -> Option<usize>;
    fn layout() -> Layout;
    fn ty() -> Ty;
}
```

:::info
The `size` function should return `None` if your model, or any type within it, includes at least one dynamic type such as `ByteArray` or `Array`.
:::

The [`Layout`](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/meta/layout.cairo#L10) enum describes **how** data is stored in the world database:

```cairo
enum Layout {
    Fixed: Span<u8>,                 // Fixed-size layout (packed) - all data in single storage slot
    Struct: Span<FieldLayout>,       // Struct with field layouts - each field in separate storage slot
    Tuple: Span<Layout>,             // Tuple of layouts - ordered collection of different types
    Array: Span<Layout>,             // Array of elements - dynamic collection of same type
    FixedArray: Span<(Layout, u32)>, // Fixed-size array with element layout and size
    ByteArray,                       // Dynamic byte array - variable-length string data
    Enum: Span<FieldLayout>,         // Enum variants - discriminated union with variant layouts
}
```

- **Fixed**: All fields packed together in a single storage slot (most gas-efficient)
- **Struct**: Each field stored in its own storage slot (more flexible, allows upgrades)
- **Tuple**: Describes the layout of contained elements in order
- **Array**: Dynamic collection - describes the layout of contained elements
- **FixedArray**: Fixed-size collection - describes element layout and array size
- **ByteArray**: Special handling for dynamic strings
- **Enum**: Stores discriminant plus the layout of the active variant

The [`Ty`](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/meta/introspect.cairo#L176) (`type`) enum tells Dojo's indexer (Torii) **what** your data represents:

```cairo
enum Ty {
    Primitive: felt252,           // Primitive type name (like 'u32', 'felt252')
    Struct: Struct,               // Struct definition with field names and types
    Enum: Enum,                   // Enum definition with variant names and types
    Tuple: Span<Ty>,              // Tuple element types in order
    Array: Span<Ty>,              // Array element type(s) - usually single element
    FixedArray: Span<(Ty, u32)>,  // Fixed-size array with element type and size
    ByteArray,                    // Dynamic byte array type marker
}
```

- **Primitive**: Basic types like `u32`, `felt252`, `bool` - identified by name
- **Struct**: Complex types with named fields - includes field names and their types
- **Enum**: Discriminated unions - includes variant names and their associated data types
- **Tuple**: Ordered collections of different types - useful for composite keys
- **Array**: Dynamic collections of the same type - element type is specified
- **FixedArray**: Fixed-size collections - element type and size are specified
- **ByteArray**: Variable-length strings - special handling for text data

### Understanding the Introspect Trait

Each type implements `Introspect` and returns exactly **one** `Layout` variant and **one** `Ty` variant that describes itself:

```cairo
// u32 returns:
Layout::Fixed(...)         // Simple fixed-size storage
Ty::Primitive('u32')      // Primitive type identifier

// Array<u32> returns:
Layout::Array(...)        // Dynamic array storage
Ty::Array(...)           // Array type with element info

// Position struct returns:
Layout::Struct(...)       // Multi-field storage layout
Ty::Struct(...)          // Struct type with field info
```

The enum variants provide flexibility to describe **any** type while maintaining type safety.
Think of it as a "universal descriptor" - each type knows its own storage strategy and provides that information through the appropriate enum variant.

As an example of implementation, consider the following case of an externally-imported struct being used as part of your game logic:

```cairo
// Your project
#[derive(Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    token_id: u256,
    stats: Stats,
}

// Imported from another project
struct Stats {
    atk: u8,
    def: u8,
}
```

You would need to implement `Introspect` for the struct, as follows:

```cairo
impl StatsIntrospect of dojo::meta::introspect::Introspect<Stats> {
    #[inline(always)]
    fn size() -> Option<usize> {
        // An Option representing the two struct fields
        Option::Some(2)
    }

    fn layout() -> dojo::meta::introspect::Layout {
        // A Layout value representing a fixed-size struct
        dojo::meta::introspect::Layout::Struct(
            array![
                // A FieldLayout struct representing a single struct field
                dojo::meta::introspect::FieldLayout {
                    selector: selector!("atk"),
                    layout: dojo::meta::introspect::Introspect::<u8>::layout()
                },
                dojo::meta::introspect::FieldLayout {
                    selector: selector!("def"),
                    layout: dojo::meta::introspect::Introspect::<u8>::layout()
                },
            ]
                .span()
        )
    }

    #[inline(always)]
    fn ty() -> dojo::meta::introspect::Ty {
        // A Ty value representing a fixed-size struct
        dojo::meta::introspect::Ty::Struct(
            // A Struct struct representing the entire struct
            dojo::meta::introspect::Struct {
                name: 'Stats',
                attrs: array![].span(),
                children: array![
                    // A Struct struct representing a single struct field
                    dojo::meta::introspect::Member {
                        name: 'atk',
                        attrs: array![].span(),
                        ty: dojo::meta::introspect::Introspect::<u8>::ty()
                    },
                    // How many times can we say struct in one snippet?
                    dojo::meta::introspect::Member {
                        name: 'def',
                        attrs: array![].span(),
                        ty: dojo::meta::introspect::Introspect::<u8>::ty()
                    },
                ]
                    .span()
            }
        )
    }
}
```

:::warning
Use `#[inline(always)]` wisely to avoid hidden bugs during the cairo to sierra compilation.
Usually it's fine to use it with dojo utils functions.
In case you're using a function you don't know the complexity of, you should avoid using it.
:::

## IntrospectPacked trait

In some situations, you might want to store a model in a packed way -- useful when you know the size of the model and want to save some storage space.

For this, you can derive the `IntrospectPacked` trait, which will force the use of the [`Fixed` layout](https://github.com/dojoengine/dojo/blob/main/crates/dojo/core/src/meta/introspect.cairo).

```cairo
#[derive(Drop, Serde, IntrospectPacked)]
struct Stats {
    atk: u8,
    def: u8,
}
```

:::warning
Dynamic types such as `ByteArray` and `Array` are prohibited in a packed model.
:::

### IntrospectPacked vs Introspect

| Feature            | IntrospectPacked           | Introspect                 |
| ------------------ | -------------------------- | -------------------------- |
| **Storage**        | Fewer storage slots        | More storage slots         |
| **Gas cost**       | Lower (fewer reads/writes) | Higher (more reads/writes) |
| **Upgrade safety** | Not upgradeable            | Upgradeable                |
| **Dynamic types**  | Not supported              | Supported                  |
| **Field access**   | Must read entire model     | Can read individual fields |

### When to Use IntrospectPacked

Use `IntrospectPacked` when:

- Model has a fixed, known size
- Model structure is stable (won't change)
- Performance is critical
- Model is read/written frequently as a whole

```cairo
// Good for packed: stable, small, fixed-size
#[derive(Copy, Drop, Serde, IntrospectPacked)]
struct Position {
    x: u32,
    y: u32,
}

// Bad for packed: dynamic size, may need upgrades
#[derive(Drop, Serde, Introspect)]
struct PlayerData {
    name: ByteArray,
    inventory: Array<u32>,
}
```

### Nested Packed Types

You can nest structs within a packed model, provided they also implement `IntrospectPacked`.

```cairo
#[derive(Copy, Drop, Serde, IntrospectPacked)]
struct Vec2 {
    x: u32,
    y: u32,
}

#[derive(Copy, Drop, Serde, IntrospectPacked)]
struct Transform {
    position: Vec2,
    rotation: u16,
    scale: Vec2,
}
```

:::tip
Old Dojo versions (before `0.7.0`) used to implement only the `IntrospectPacked` trait.
Hence, you should use this trait if you're upgrading from an old version of Dojo.
:::

### Storage Optimization Tips

1. **Use packed layouts** for stable, frequently-accessed models
2. **Group related fields** to minimize storage slots
3. **Consider field ordering** - place smaller fields together
4. **Use appropriate types** - don't use `u256` when `u32` suffices

## Best Practices

### Trait Selection

1. **Use `Introspect` by default** - provides flexibility and upgrade safety
2. **Use `IntrospectPacked` for performance** - when model is stable and frequently accessed
3. **Mix approaches** - use packed for stable core models, unpacked for extensible ones

### Implementation Guidelines

1. **Auto-derive when possible** - manual implementation is error-prone
2. **Test thoroughly** - validate serialization/deserialization
3. **Document implementations** - explain why custom implementation was needed
4. **Use consistent naming** - follow naming conventions for fields and types

### Future-Proofing

1. **Plan for upgrades** - use unpacked layouts for evolving models
2. **Version your data** - include version fields for complex models
3. **Document constraints** - clearly document why certain layouts were chosen
4. **Test upgrade paths** - validate that model changes work as expected

By following these guidelines, you can create efficient, maintainable models that work well with Dojo's introspection system.
