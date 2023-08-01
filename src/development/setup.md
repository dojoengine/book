# Dojo Motoru - Başlangıç Rehberi

Bu README, Dojo için yerel geliştirme ortamınızı kurma sürecine rehberlik eder.

## Gereksinimler

- Rust
- Cairo

## Repository'yi Klonlayın

Öncelikle, repository'yi yerel makinenize klonlayın:

```bash
git clone https://github.com/dojoengine/dojo.git
```

## Kurulum Rehberi

### Linux & Mac

#### 1. Rust ve Bağımlılıklarını Yükleyin

Rust'ı yüklemeye ve kurulumunuzu onaylamak için test süitesini çalıştırmaya başlayın:

```bash
rustup override set stable && rustup update && cargo test
```

> Not: Linux dağıtımınıza bağlı olarak, ek bağımlılıkları yüklemeniz gerekebilir. Kurulum süreci sırasında ortaya çıkan önerilen veya eksik bağımlılıkları yüklediğinizden emin olun.

#### 2. Scarb Paket Yöneticisini Yükleyin

Sonra, [Scarb](https://docs.swmansion.com/scarb) paket yöneticisini aşağıdaki komutu çalıştırarak yükleyin:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

#### 3. Cairo VSCode Eklentisini Ayarlayın

Düzgün bir lintleme ve sözdizimi vurgulama için, Visual Studio Code için Cairo 1.0 eklentisini yüklemeniz gerekir.

- Cairo repository'sini makinenizde bir yere klonlayın (Dojo dizini içinde klonlamadığınızdan emin olun).

```bash
git clone https://github.com/starkware-libs/cairo.git
```

Cairo Dil Sunucusu eklentisini yükleyin. Aşağıdaki adım adım rehberi veya [caironun kendi talimatlarını](https://github.com/starkware-libs/cairo/blob/main/vscode-cairo/README.md) takip edebilirsiniz.

vscode-cairo dizinine gidin:

```bash
cd cairo/vscode-cairo
```

Gerekli paketleri yükleyin:

```bash
sudo npm install --global @vscode/vsce
npm install
```

Eklentiyi paketleyin:

```bash
vsce package
```

Eklentiyi yükleyin:

```bash
code --install-extension cairo1*.vsix
```

> **Mac İpucu:** Eğer code komutuna sahip değilseniz, VSCode'da Cmd+Shift+P yapın ve 'shell command' yazın ve Shell Command: Install 'code' command in PATH komutunu bulun.

Cairo dil sunucusu şimdi Visual Studio Code'da global olarak yüklenmiş olmalıdır. Sunucunuz etkinse, Scarb bunu otomatik olarak algılar ve Cairo dosyalarınızı lintlemeye başlar.

### Windows

_Yakında_

### Konteyner

_Yakında_
