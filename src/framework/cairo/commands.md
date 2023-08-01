## Commands

Dojo'daki Komutlar, sistem yürütmesini kolaylaştırmak için derleme zamanında genişletilen genelleştirilmiş işlevlerdir. Bileşenleri almayı veya güncellemeyi ve benzersiz ID'ler oluşturmayı gibi ortak işlemleri soyutlayarak sistemlerin dünya durumuyla etkileşim kurmasını kolaylaştırırlar. Bu komutları kullanarak, geliştiriciler sistem uygulamalarını basitleştirebilir ve kod okunabilirliğini artırabilirler.

Komutları anlamak, Dojo'yu anlamak için anahtardır. Tasarladığınız sistemler içinde onları yoğun bir şekilde kullanacaksınız.

```rust,ignore
// Update an existing entity by setting its components with the provided values.
// This function takes a storage key representing the entity and a generic type T for the components to be updated.
set!(world: IWorldDispatcher, storage_key: StorageKey, components: T);

// Retrieve the components of a specific type T for an entity identified by the storage key.
// This function returns the components as an instance of the generic type T.
get!(world: IWorldDispatcher, storage_key: StorageKey, components: T) -> T;

// Retrieve all entity IDs that have components matching the provided type T.
// This function returns an array of entity IDs (felt252) containing the specified components.
find!(world: IWorldDispatcher, key: StorageKey, components: T);
```
