## Dojo: Kanıtlanabilir oyun motoru

Bu kılavuz, size Dojo motoru ve Kanıtlanabilir oyunların dönüştürücü potansiyeli hakkında bilgi vermek için hazırlanmıştır. Özel bir bölümde [Teori](./theory/autonomous-worlds.md) bağımsız dünyalar ve Kanıtlanabilir oyunlar gibi yeni bir kavram açıklanmaktadır.

## Dojo Nedir?

Dojo, entegre bir araç zinciri ile tasarlanmış, onchain oyunlar ve özerk dünyalar oluşturmak için [Cairo 1.0](https://github.com/starkware-libs/cairo) kullanan bir kanıtlanabilir oyun motorudur. Bir varlık bileşeni sistemi [(entity component system)](https://en.wikipedia.org/wiki/Entity_component_system) ve bir elmas modeli [(diamond pattern)](https://eips.ethereum.org/EIPS/eip-2535) kullanarak, modüler, ölçeklenebilir bir dünya oluşturmayı kolaylaştırır. Dünyalar, Bileşenler (durum) ve Sistemler (mantık) eklenerek büyür. Mimarimiz, mükemmel [Bevy](https://bevyengine.org/) motorundan büyük ölçüde etkilenmiştir.

İşte 2023 [Otonom Anonim Zirvesi](https://twitter.com/pet3rpan_/status/1666764726427353091)’de [Cartridge](https://cartridge.gg/) ve [Tarrence](https://twitter.com/tarrenceva) tarafından Dojo'nun nasıl çalıştığınının anlatıldığı bir video:

<video controls poster="https://gf326cjag4w6pdpc42qp22enfhxsywmq6sgs7mkxbn6el7aioyxa.arweave.net/MXevCSA3LeeN4uag_WiNKe8sWZD0jS-xVwt8RfwIdi4">
  <source src="https://sfx25btazqz62pajxecorlp4exskwgokakub44rxmpnsosep5iqa.arweave.net/kW-uhmDMM-08CbkE6K38JeSrGcoCqB5yN2PbJ0iP6iA" type="video/mp4">
  Your browser does not support the video tag.
</video>

#### Ana Özellikler
- [Cairo 1.0](https://github.com/starkware-libs/cairo) üzerine kurulu Entity Component System (ECS)
- [Sozo](./framework/sozo/overview.md) dünya migrasyon planlayıcısı
- [Torii](./framework/torii/overview.md) ağ ve indeksleme yığınağı
- [Katana](./framework/katana/overview.md) RPC geliştirme ağı
- Yazılmış SDK'lar

Dojo açık kaynaklı bir proje olup şu anda erken geliştirme aşamasındadır ve katkıda bulunanları sıcak bir şekilde karşılar. Ek kaynaklar için, kitabı [Github](https://github.com/dojoengine/book) üzerinde bulabilirsiniz.

### Neden Dojo?

Dojo, [onchain oyun](https://naavik.co/digest/primer-fully-on-chain-gaming) oyunlar oluşturma denemelerinden alınan derslerin bir sonucudur. Ayrıca bu sektör oyun endüstrisinde yeni bir alan. Herhangi bir geliştirici, bir onchain oyun oluşturmaya çalışırken karşılaştığı mühendislik engellerini anlar - bu da bizi Dojo'yu yaratmaya itti. Onchain oyun oluşturmaktaki zorluk sebebi bizi Dojo'yu oluşturmaya itti. Her yeni oyun geliştirdiğinizde Unity'yi yeniden oluşturmazsınız, aynı prensip burada da geçerli. Dojo, geliştiricilerin oyunlarının benzersiz yönlerine odaklanmalarını sağlarken karmaşık altyapıyı yönetmek üzere tasarlanmıştır.

### Neden Cairo & Starknet?

Kanıtlanabilir oyunlar, hesaplamaların verimli ölçeklenmesi ve doğrulanması için sıfır bilgi [(zero-knowledge)](https://ethereum.org/en/zero-knowledge-proofs/) özelliklerini talep eder. [Cairo](https://book.starknet.io/chapter_1/what_is_cairo.html), bu ihtiyacı, [SNARK](https://consensys.net/blog/developers/introduction-to-zk-snarks/)'ları dahil etmek için devreler oluşturma karmaşıklığını ortadan kaldırarak genel bir dil sağlar.

**Cairo'da basitçe programlama yapabilirsiniz ve uygulamalarınız otomatik olarak kanıtlanabilir hale gelir.**

Dahası, programlarınızı [Cairo Virtual Machine](https://medium.com/starkware/cairo-welcome-on-board-1cf3487554f) (CVM) üzerinde, Starknet'ın Katman 2'si, Starknet uygulama zincirleri ve hatta tarayıcı içinde WebAssembly (WASM) üzerinden bile dağıtabilirsiniz! Dojo, oyun geliştirmenizi hızlandırmak için basit ZK ilkel parçaları sağlamayı amaçlar.

Starknet, Cairo ve teknik yığını hakkında daha fazla bilgi için, [Starknet & Cairo kitabına](https://book.starknet.io/) kitabına göz atın.

### Vizyon
Dojo, geliştiricilerin onchain oyunlar ve Özerk Dünyalar (AWs) oluşturmayı saatler içinde, haftalar değil, hedefleyen cesur bir çalışmadır.

### Organizasyon Yapısı
Dojo, MIT lisansı altında, Özerk Dünyalar (AWs) kavramını teşvik etmeye ve ilerletmeye adanmış, açık kaynaklı bir girişimdir. [Cartridge](https://cartridge.gg/), [Realms & BibliothecaDAO](https://bibliothecadao.xyz/) & BibliothecaDAO, [briq](https://briq.construction/) ve daha [birçok katılmcı](https://github.com/orgs/dojoengine/people) tarafından yönlendirilmektedir.

### Nasıl Katkıda Bulunabilirim?
[Github](https://github.com/dojoengine) sayfamızı, [Twitter/X](https://twitter.com/dojostarknet) hesabımızı, [Discord](https://discord.gg/vUN4Xq9Qv6) kanalımızı ve [katkı rehberimizi](https://book.dojoengine.org/misc/contributors.html!) kontrol edin!
