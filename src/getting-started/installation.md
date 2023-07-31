## Kurulum

### Önceden derlenmiş binaryler

Önceden derlenmiş binaryler [GitHub sürümleri](https://github.com/dojoengine/dojo/releases) sayfasında bulunabilir.
Bunlar [Dojoup](#using-dojoup) kullanılarak daha iyi yönetilir.

### Dojoup Kullanarak

Dojoup, Dojo araç seti yükleyicisidir. Hakkında daha fazla bilgiyi [burada](https://github.com/dojoengine/dojo/blob/master/dojoup/README.md) bulabilirsiniz.

Terminalinizi açın ve aşağıdaki komutu çalıştırın:

```sh
curl -L https://install.dojoengine.org | bash
```

Bu, Dojoup'u yükleyecek. Bunun ardından sadece ekrandaki talimatları izleyin,
Ayrıca bu dojoup komutunu CLI'nızda kullanılabilir hale getirecektir.

Dojoup komutunu tek başına çalıştırmak, en son (gece yarısı) [önceden derlenmiş binaryleri](#precompiled-binaries): sozo, katana ve torii yükleyecektir.
Bir belirli sürümden veya commit'ten yüklemek gibi daha fazla seçenek için `dojoup --help` komutunu kullanabilirsiniz.

> ℹ️ **Not**
>
> Eğer Windows kullanıyorsanız, şu anda Dojoup'un Powershell veya Cmd'yi desteklemediği için terminal olarak [Git BASH](https://gitforwindows.org/) veya [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) yüklemeli ve kullanmalısınız.

## Kaynaktan Derleme

### Gereksinimler

[Rust](https://rust-lang.org) derleyicisi ve Cargo, Rust paket yöneticisine ihtiyacınız olacak.
Her ikisini de [`rustup.rs`](https://rustup.rs/) ile en kolay şekilde yükleyebilirsiniz.

Windows'ta, "Desktop Development With C++" iş yükü seçeneğiyle yüklenmiş en son sürüm [Visual Studio](https://visualstudio.microsoft.com/downloads/)'ya da ihtiyacınız olacak.

#### Derleme

Farklı [Dojoup](#using-dojoup) bayraklarını kullanabilirsiniz:

```sh
dojoup --branch master
dojoup --path path/to/dojo
```

Veya, tek bir Cargo komutu kullanarak:

```sh
cargo install --git https://github.com/dojoengine/dojo --force sozo katana torii
```

Veya, manuel olarak yerel bir [Dojo repository](https://github.com/dojoengine/dojo) kopyasından derleyerek:

```sh
# repository'yi klonlayın
git clone https://github.com/dojoengine/dojo.git
cd dojo
# Sozo'yu yükleyin
cargo install --path ./crates/sozo --force
# Katana'yı yükleyin
cargo install --path ./crates/katana --force
# Torii'yi yükleyin
cargo install --path ./crates/torii --force```
```
