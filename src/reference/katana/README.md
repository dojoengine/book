## katana

### AD

katana - Starknet akıllı sözleşmelerini konuşlandırmak ve test etmek için yerel bir testnet düğümü oluşturun.

### ÖZET

`katana` [*options*]

### AÇIKLAMA

Starknet akıllı sözleşmelerini konuşlandırmak ve test etmek için yerel bir testnet düğümü oluşturun. Katana, Cairo sözleşmelerinin 0 ve 1 sürümlerinin konuşlandırılması ve çalıştırılmasını destekler.

Bu bölüm, Madencilik Modları, Desteklenen RPC Metodları, Katana bayrakları ve kullanımları hakkında geniş bilgi içerir. Aynı anda birden fazla bayrak çalıştırabilirsiniz.

#### Madencilik Modları

Madencilik modları, Katana kullanılarak blokların ne sıklıkta oluşturulduğunu belirtir. Varsayılan olarak, bir işlem gönderildiği anda otomatik olarak yeni bir blok oluşturur.

Bu ayarı, isteğe bağlı olarak aralıklı madenciliğe değiştirebilirsiniz, bu da kullanıcı tarafından seçilen belirli bir süre içinde yeni bir blok oluşturulacağı anlamına gelir. Bu tür madenciliği seçmek isterseniz, aşağıdaki örnekte olduğu gibi --block-time <blok-zamanı-saniye-cinsinden> bayrağını ekleyerek bunu yapabilirsiniz.

```sh
# Her 10 saniyede bir yeni bir blok oluşturur
katana --block-time 10
```

#### Desteklenen Taşıma Katmanları

Şu anda yalnızca HTTP bağlantısı desteklenmektedir. Sunucu varsayılan olarak 5050 portunda dinler, ancak aşağıdaki komutu çalıştırarak değiştirilebilir:

```sh
katana --port <PORT>
```

#### Starknet Özellik Uyumluluğu

##### Desteklenen İşlem Türü

| Type           | Version |
| -------------- | ------- |
| INVOKE         | 1       |
| DECLARE        | 1, 2    |
| DEPLOY_ACCOUNT |         |

#### Desteklenen RPC Metodları

##### Starknet Metodları

Katana, Starknet JSON-RPC spesifikasyonlarının **v0.3.0** sürümünü destekler. Standart metodlar [bu](https://github.com/starkware-libs/starknet-specs/tree/v0.3.0) referansa dayanır.

-   `starknet_blockNumber`
-   `starknet_blockHashAndNumber`
-   `starknet_getBlockWithTxs`
-   `starknet_getBlockWithTxHashes`
-   `starknet_getBlockTransactionCount`
-   `starknet_getTransactionByHash`
-   `starknet_getTransactionByBlockIdAndIndex`
-   `starknet_getTransactionReceipt`
-   `starknet_pendingTransactions`
-   `starknet_getStateUpdate`

-   `starknet_call`
-   `starknet_estimateFee`

-   `starknet_chainId`

-   `starknet_getNonce`
-   `starknet_getEvents`
-   `starknet_getStorageAt`
-   `starknet_getClassHashAt`
-   `starknet_getClass`
-   `starknet_getClassAt`

-   `starknet_syncing`

-   `starknet_addInvokeTransaction`
-   `starknet_addDeclareTransaction`
-   `starknet_addDeployAccountTransaction`

##### Özel Metodlar

Katana, düğümünüzü test ortamınıza uyacak şekilde hızlı ve kolay bir şekilde yapılandırmak için kullanışlı bir dizi özel RPC metodları sağlar.

`katana_generateBlock`  
Şu anda bekleyen tüm işlemleri içeren yeni bir blok oluştur

`katana_nextBlockTimestamp`  
Sonraki blok için zamanı al

`katana_increaseNextBlockTimestamp`  
Blok için süreyi belirtilen süre kadar, saniye cinsinden artır

`katana_setNextBlockTimestamp`  
`katana_increaseNextBlockTimestamp`'a benzer, ancak sonraki blokta istediğiniz kesin zamanı alır

`katana_predeployedAccounts`  
Önceden konuşlandırılmış tüm hesapların bilgilerini al

### SEÇENEKLER

#### Genel Seçenekler

`--silent`  
&nbsp;&nbsp;&nbsp;&nbsp; Başlangıçta hiçbir şey yazdırma

`--no-mining`  
&nbsp;&nbsp;&nbsp;&nbsp; Otomatik ve aralıklı madenciliği devre dışı bırakın ve talep üzerine madencilik yapın

`-b, --block-time <SECONDS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Aralıklı madencilik için blok süresi (saniye)

`-h, --help`  
&nbsp;&nbsp;&nbsp;&nbsp; Yardımı yazdır ('-h' ile özet gör)

`-V, --version`  
&nbsp;&nbsp;&nbsp;&nbsp; Sürüm bilgisini yazdır

#### Sunucu Seçenekleri

`-p, --port <PORT>`  
&nbsp;&nbsp;&nbsp;&nbsp; Dinlenecek port numarası [varsayılan: 5050]

`--host <HOST>`  
&nbsp;&nbsp;&nbsp;&nbsp; Sunucunun dinleyeceği IP adresi

#### Starknet Seçenekleri

`--seed <SEED>`  
&nbsp;&nbsp;&nbsp;&nbsp; Önceden konuşlandırılacak hesapların rastlantısallığı için tohumu belirtin

`--accounts <NUM>`  
&nbsp;&nbsp;&nbsp;&nbsp; Oluşturulacak ön-finanse edilmiş hesapların sayısı [varsayılan: 10]

`--allow-zero-max-fee`  
&nbsp;&nbsp;&nbsp;&nbsp; İşlem maksimum ücretinin sıfır olmasına izin ver

#### Environment Options

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; Zincir ID [varsayılan: KATANA]

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; Gaz fiyatı

### ÖRNEKLER

1. Hesap sayısını 15'e ayarla ve sıfır ücretli işlem yapmaya izin ver

```sh
katana --accounts 15 --allow-zero-max-fee
```

2. Zincir id'sini SN_GOERLI olarak ayarla ve sunucuyu 8545 portunda çalıştır

```sh
katana --chain-id SN_GOERLI --port 8545
```
