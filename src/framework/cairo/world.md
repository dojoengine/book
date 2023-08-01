## Dünya

Dünya sözleşmesi, merkezi bir sistem çekirdeği işlevi görerek tüm etkileşimlerin başlatılması ve çözülmesi için temel sağlar. Bu çekirdek içinde, sözleşmeler dağıtılır, kaydedilir ve yürütülür, istemcilerin tek bir sözleşmeyle, potansiyel olarak yüzlercesi yerine, etkileşime girmesine olanak sağlayarak akışı aşağı sistemler için düzgünleştirir.


> **Düşünün:** Autonomous Worlds'ü başka bir blockchain içinde bulunan egemen blockchainler olarak düşünün - bir nevi iç içe geçmiş blockchain. Ethereum'a sözleşmeleri dağıtarak onun işlevselliğini artırabileceğiniz gibi, sistemleri Dünya sözleşmesine tanıtarak da özelliklerini zenginleştirebilirsiniz. Ethereum'a benzer şekilde, herkes Dünya'ya katkıda bulunabilir, ancak bileşen durumuyla etkileşime geçmek için yetkilendirme gereklidir. Yetkilendirmeye adanmış bir konu vardır.


### API

```rust,ignore
// World interface
#[abi]
trait IWorld {
    fn initialize(routes: Array<Route>);
    fn component(name: ShortString) -> ClassHash;
    fn register_component(class_hash: ClassHash);
    fn system(name: ShortString) -> ClassHash;
    fn register_system(class_hash: ClassHash);
    fn uuid() -> usize;
    fn execute(name: ShortString, execute_calldata: Span<felt252>) -> Span<felt252>;
    fn entity(component: ShortString, key: Query, offset: u8, length: usize) -> Span<felt252>;
    fn set_entity(component: ShortString, key: Query, offset: u8, value: Span<felt252>);
    fn entities(component: ShortString, partition: u250) -> (Span<u250>, Span<Span<felt252>>);
    fn set_executor(contract_address: ContractAddress);
    fn is_authorized(system: ClassHash, component: ClassHash) -> bool;
    fn is_account_admin() -> bool;
    fn delete_entity(component: ShortString, query: Query);
}
```
