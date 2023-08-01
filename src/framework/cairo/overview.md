## Genel Bakış

Dojo, Autonomous Worlds (AWs) durumunu ve davranışını verimli bir şekilde yönetmek ve düzenlemek için ECS (Entity Component System - Varlık Bileşen Sistemi) mimari desenini kullanır. Bu desende, hesaplama, her biri saf veri bileşenlerinden oluşan bir varlık seti üzerinde işlem yapan sistemlerin bir listesi olarak tanımlanır. Sistemler, varlıkların bileşenleri üzerinde sürekli ve verimli sorgular aracılığıyla işlem yapacak varlıkları seçer.

ECS hakkında mükemmel ve okumaya değer bir [SSS](https://github.com/SanderMertens/ecs-faq).

### Dojo'daki ECS'yi Anlama

Varlık Bileşen Sistemi (ECS), Dojo motorunun omurgasını oluşturur. İşte çekirdek unsurlarına genel bir bakış:

1. **Varlıklar**: Çoklu bileşen taşıyabilen benzersiz nesneler. Bunlar, benzersiz ID'ler aracılığıyla tanımlanabilirler.
2. **Bileşenler**: Bir varlığın çeşitli nitelikleri, örneğin geometri, fizik ve vuruş noktaları. Bileşenler sadece veri depolamadan sorumludur.
3. **Sistemler**: Varlıkları yöneten ve bileşenleri değiştiren kod parçaları.
4. **Sorgular**: Sistemler tarafından, ilişkili bileşenlere dayanarak varlıkları seçmek için kullanılır.
5. **Dünya**: Varlıklar, bileşenler, sistemler ve sorgular için kapsamlı bir konteyner.

---

### Dojo ile Otomatik Dünya Oluşturma

Dojo dünyasını etkili bir şekilde oluşturmak için aşağıdaki adımları izleyin:

1. **Varlıkları Kavramsallaştırın**: Dünyanızı dolduracak varlıkları görselleştirin.
2. **Ortak Nitelikleri Tanıyın**: Varlıklarınızın ortak özelliklerini belirleyin, örneğin konum, isim veya sağlık.
3. **Yeniden Kullanılabilir Bileşenler Oluşturun**: Bu paylaşılan niteliklerden türetilen çok yönlü bileşenler oluşturun.
4. **Özelleştirilmiş Sistemler Geliştirin**: Belirli bir görevi gerçekleştirmede uzmanlaşmış sistemler tasarlayın.

Örneklendirmek için, bileşenleri ve sistemleri kullanarak dört ayrı varlık oluşturan basit bir tasarım örneği:


![ECS](../../images/ECS.png)
