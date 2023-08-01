## Entities

ECS sistemlerine yeni başlayanlar için yaygın bir yanılgı, varlıkların Dünya içindeki var oluş biçimidir. Farklı ECS sistemleri, varlıkları çeşitli şekillerde ele alır. Dojo'da, varlıklar dünya içinde birincil anahtar değeri olarak ele alınır ve bunlara bileşenler eklenir. Bu kavramı anlamak için, bir konuma ve bir sağlık bileşenine sahip bir oyun karakterinin basit bir örneğini düşünün.

Bu varlık için bileşenleri tanımlarken, varlığa doğrudan atıfta bulunmadığımızı belirtmek önemlidir. Bunun yerine, sadece varlığın içereceği iki yapı sağlarız. Bu yaklaşım, ECS sisteminin esnekliğini ve bir araya getirilebilirliğini vurgular, çeşitli bileşen kombinasyonlarıyla varlıkların kolay oluşturulmasına ve modifiye edilmesine olanak sağlar.

```rust,ignore
#[component]
struct Position {
    x: u32,
    y: u32
}

#[component]
struct Health {
    value: u32,
}

```

Şimdi, karakter için bir `SpawnSystem` oluşturalım. Herhangi bir yerde açıkça bir Varlık tanımlamadığımızı belirtmek önemlidir. Bunun yerine, sistem bu sistemi çalıştırdığında varlığa birincil anahtar ID atayacaktır.

```rust,ignore
// Verilen bir isme ve 100 sağlık puanına sahip yeni bir oyuncu varlığı oluşturan en temel sistem.

#[system]
mod Spawn {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Health;

    fn execute(ctx: Context) {
        set !(
            ctx.world, ctx.origin.into(), (Moves { remaining: 10 }, Position { x: 0, y: 0 }, )
        );
        return ();
    }
}
```

Son olarak, karakteri `MoveSystem` ile hareket ettirelim.

```rust,ignore
#[system]
mod Move {
    use array::ArrayTrait;
    use traits::Into;

    use dojo::world::Context;
    use dojo_examples::components::Position;
    use dojo_examples::components::Moves;

    #[derive(Serde, Drop)]
    enum Direction {
        Left: (),
        Right: (),
        Up: (),
        Down: (),
    }

    impl DirectionIntoFelt252 of Into<Direction, felt252> {
        fn into(self: Direction) -> felt252 {
            match self {
                Direction::Left(()) => 0,
                Direction::Right(()) => 1,
                Direction::Up(()) => 2,
                Direction::Down(()) => 3,
            }
        }
    }

    fn execute(ctx: Context, direction: Direction) {
        let (position, moves) = get !(ctx.world, ctx.origin.into(), (Position, Moves));
        let next = next_position(position, direction);
        set !(
            ctx.world,
            ctx.origin.into(),
            (Moves { remaining: moves.remaining - 1 }, Position { x: next.x, y: next.y }, )
        );
        return ();
    }

    fn next_position(position: Position, direction: Direction) -> Position {
        match direction {
            Direction::Left(()) => {
                Position { x: position.x - 1, y: position.y }
            },
            Direction::Right(()) => {
                Position { x: position.x + 1, y: position.y }
            },
            Direction::Up(()) => {
                Position { x: position.x, y: position.y - 1 }
            },
            Direction::Down(()) => {
                Position { x: position.x, y: position.y + 1 }
            },
        }
    }
}
```
