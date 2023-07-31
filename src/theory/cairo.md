## Cairo

Cairo, Starkware tarafından geliştirilen açık kaynaklı, Turing-tamamlanmış bir akıllı sözleşme dilidir ve Doğrulama Rollup'ı Starknet'i güçlendirmek üzere tasarlanmıştır. Bu dil, yüksek derecede ifade edilebilir ve doğrulanabilir hesaplamaları mümkün kılarak, merkezi olmayan finans (DeFi) projeleri de dahil olmak üzere ölçeklenebilir ve güvenli uygulamaların geliştirilmesi için uygundur.

Dojo kendisini, Cairo üzerine kurarak Özerk Dünyalar (AWs) geliştirmek için sağlam bir framework oluşturur. Cairo'nun gücünden yararlanarak, Dojo geliştirme sürecini basitleştirmeyi, bakımı iyileştirmeyi ve AW'ların performansını artırmayı hedefler.

Dojo framework'ün ana özelliği [komutların](../framework/cairo/commands.md) kullanımıdır. Komutlar, boilerplate kodunu azaltmaya yardımcı olan bir tasarım desenidir ve sonuç olarak daha temiz ve daha kolay bakım yapılan uygulamalar oluştururlar. Bu, belirli eylemleri veya işlemleri özerk, yeniden kullanılabilir birimler içine kapsülleyerek gerçekleştirilir.

Geliştiriciler, Sistemler içinde komutları özgürce yazabilir ve Cairo derleyicisi uygun işlevleri içeri ekler.

#### Temel Okuma
- [Cairo kitabı](https://cairo-book.github.io/)
- [Harika Cairo](https://github.com/auditless/awesome-cairo)
- [Starknet Kitabı](https://book.starknet.io/)

### Bir L2 Olarak Starknet

Starknet, Ethereum'u ölçeklendirmek için tasarlanmış bir Doğrulama Rollup Katman 2 (L2) çözümüdür. Ethereum Katman 1 (L1) ile aynı güvenlik düzeyini korurken yüksek işlem hacmi ve düşük gaz maliyeti sunar. Kullanılan strateji, bir sudoku bulmacasını çözmeye benzer: bir çözümü doğrulamak, çözümü sıfırdan bulmaktan daha kolaydır. Benzer şekilde, Starknet, zincir dışında hesaplanan STARK kanıtlarının kullanımıyla ağır ve maliyetli L1 hesaplamalarını daha ucuz L1 doğrulamaları ile değiştirir.

Daha teknik terimlerle, Starknet, genel hesaplamaları destekleyen izinsiz bir Doğrulama-Rollup (aynı zamanda bir "ZK-Rollup" olarak da bilinir) ve şu anda Ethereum üzerinde bir L2 ağı olarak çalışır. Ağın L1 güvenliği, en güvenli ve en ölçeklenebilirlerden biri olarak kabul edilen STARK kriptografik kanıt sistemini kullanmasıyla garanti altına alınmıştır.

### Bir Appchain Olarak Starknet

Cairo, Sıfır Bilgi (ZK) kanıtları için optimize edilmiş izomorfik, genel amaçlı bir dildir. Starknet, Starkex ve appchainlerin arkasındaki itici güçtür. Dikkat çekici şekilde, ayrıca istemci tarafında kanıtlar oluşturmak için WebAssembly'de (WASM) de çalıştırabilirsiniz! Dojo ekibi, Starknet appchainlerinin Dojo dünyalarını sorunsuz bir şekilde çalıştırabilmesini sağlamak için Madara ekibiyle yakından çalışıyor.
