# Algebra

The Origami Algebra crate is a library that provides algebraic primitives for Dojo-based games. It offers efficient implementations of mathematical structures and operations commonly used in game development.

## Overview

The Algebra crate focuses on providing fundamental mathematical structures and operations that are essential for game development. Its primary scope includes:

- Vector operations
- Matrix operations
- Basic algebraic computations

The crate is designed to work seamlessly with the Dojo engine and other Origami crates.

## Installation

To add the Origami Algebra crate as a dependency in your project, you need to modify your Scarb.toml file. Add the following to your [dependencies] section:

```toml
[dependencies]
origami_algebra = { git = "https://github.com/dojoengine/origami" }
```

Make sure you have dojo installed and configured in your project.

## Features

The crate currently implements a 2D vector (Vec2) with various operations:

```rust
struct Vec2<T> {
    x: T,
    y: T
}
```

Key features of `Vec2` include:

- Construction: new and splat methods
- Dot product calculation
- Swizzle operations (xx, xy, yx, yy)
- Mask-based selection

Example usage:

```rust
let vec2a = Vec2Trait::new(1, -2);
let vec2b = Vec2Trait::new(-3, 4);
let a_dot_b = vec2a.dot(vec2b);  // -11
```

## Conclusion

The Origami Algebra crate provides a solid foundation for mathematical operations in Dojo-based games. It offers efficient implementations of 2D vectors with various utility functions. As the crate evolves, more features and mathematical structures may be added to support a wider range of game development needs.
For the most up-to-date information and usage examples, refer to the crate's source code and any accompanying documentation in the Origami repository.

## References

Find the Origami [Algebra crate](https://github.com/dojoengine/origami/blob/main/crates/algebra)
