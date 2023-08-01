## Components

Bileşenler, dünya yapısını tanımlamak için temel hizmet verir, sistemlerin değiştirebileceği durumu kapsular. Örneğin, Bir Pozisyon bileşeni, is_zero ve is_equal metodlarını ortaya çıkaracak şekilde bir yapı olarak uygulanabilir. Dojo, bu bileşenleri, çeşitli ve özelleştirilebilir ortamların oluşturulmasını sağlayacak şekilde dünyada ilan edilebilecek ve yüklenebilecek sözleşmeler haline getirir.

Bir dünyanın bileşenlerini tasarlarken, oluşturduğunuz soyutlamaları dikkatlice düşünmek hayati öneme sahiptir, her zaman bir araya getirilebilirliği aklınızda bulundurmalısınız.

Diyelim ki, harita etrafında hareket eden ve birbirinden temelde farklı olan iki varlık yaratmayı planlıyorsunuz, tek ortak noktaları her ikisinin de dünya içinde var olması. Bu durumda, her iki varlık için ortak bir Pozisyon bileşeni oluşturabilirsiniz. Bu, Entity Component System (ECS) soyutlamanın gücünü gösterir: tek bir bileşen yazarak, onu birden çok çeşitli varlıkta yeniden kullanabilir, dünya tasarımınızda modülerlik ve esnekliği teşvik edersiniz.

```rust,ignore
use array::ArrayTrait;

#[derive(Component, Copy, Drop, Serde)]
#[component(indexed = true)]
struct Moves {
    remaining: u8,
}

#[derive(Component, Copy, Drop, Serde)]
struct Position {
    x: u32,
    y: u32
}

trait PositionTrait {
    fn is_zero(self: Position) -> bool;
    fn is_equal(self: Position, b: Position) -> bool;
}

impl PositionImpl of PositionTrait {
    fn is_zero(self: Position) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Position, b: Position) -> bool {
        self.x == b.x && self.y == b.y
    }
}
```
