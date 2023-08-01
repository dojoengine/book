## Komutlar

Dojo'daki Komutlar, sistem yürütmesini kolaylaştırmak için derleme zamanında genişletilen genelleştirilmiş işlevlerdir. Bileşenleri almayı veya güncellemeyi ve benzersiz ID'ler oluşturmayı gibi ortak işlemleri soyutlayarak sistemlerin dünya durumuyla etkileşim kurmasını kolaylaştırırlar. Bu komutları kullanarak, geliştiriciler sistem uygulamalarını basitleştirebilir ve kod okunabilirliğini artırabilirler.

Komutları anlamak, Dojo'yu anlamak için anahtardır. Tasarladığınız sistemler içinde onları yoğun bir şekilde kullanacaksınız.

```rust,ignore
// Mevcut bir varlığı, sağlanan değerlerle bileşenlerini ayarlayarak güncelleyin.
// Bu fonksiyon, varlığı temsil eden bir depolama anahtarı ve güncellenecek bileşenler için genel bir tip T alır.
set!(world: IWorldDispatcher, storage_key: StorageKey, components: T);

// Depolama anahtarı ile belirlenen bir varlık için belirli tip T bileşenlerini alın.
// Bu fonksiyon, bileşenleri genel tip T'nin bir örneği olarak döndürür.
get!(world: IWorldDispatcher, storage_key: StorageKey, components: T) -> T;

// Sağlanan tip T ile eşleşen bileşenlere sahip tüm varlık kimliklerini alın.
// Bu fonksiyon, belirtilen bileşenleri içeren varlık kimliklerinin bir dizisini (felt252) döndürür.
find!(world: IWorldDispatcher, key: StorageKey, components: T);
```
