## Systems

Sistemler, dünya durumu üzerinde işlem yapan fonksiyonları temsil eder. Kullanıcıdan giriş alırlar, dünyadan mevcut durumu alırlar, bir durum geçişi hesaplarlar ve bunu uygularlar. Her sistem, execute fonksiyonu olan tek bir giriş noktasına sahiptir. Dünya ile etkileşimi hızlandırmak için sistemler komutları kullanabilir.

```rust,ignore
#[system]
mod Spawn {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    fn execute(ctx: Context) {
        set !(
            ctx.world, ctx.origin.into(), (Moves { remaining: 10 }, Position { x: 0, y: 0 }, )
        );
        return ();
    }
}
```
