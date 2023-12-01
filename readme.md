## 📖 The Dojo Book

Explore the world of Autonomous Worlds with Dojo, your trusted toolchain. [Dive in now](https://book.dojoengine.org/).

### Contributing

Embrace the open-source spirit of Dojo. As it's in its nascent phase, we welcome contributors with open arms.

Peruse our [contributing guidelines](./src/misc/contributors.md). From minor wording adjustments to extensive chapters, every contribution matters!

### Setup

1. **Rust-related Packages**:
   - Obtain the `cargo` toolchain via [rustup](https://rustup.rs/).
   - Get [mdBook](https://rust-lang.github.io/mdBook/guide/installation.html) and its translation extension with the command:
     `cargo install mdbook mdbook-i18n-helpers`
2. **Host Machine Packages**:
   - To assist with translations, install [gettext](https://www.gnu.org/software/gettext/). It's typically accessible via most package managers. Use: `sudo apt install gettext`.
3. Clone this repository to get started.

### Working Locally (English - Primary Language)

Always edit Markdown files in English. Here's how to work on it:

- Spin up a local server using `mdbook serve`. Navigate to [localhost:3000](http://localhost:3000). For an automated browser launch, append the `--open` flag: `mdbook serve --open`.
- Modify the content as desired. Refresh your browser to review edits.
- Ready to share? Open a PR with your enhancements.

### Working Locally (Translations)

Catering to a global audience, we aspire for multilingual content.

**Note**: Ensure all files in the `src` directory are in English, facilitating automated generation and updates of translation files.

For translation tasks:

- Start a local server for a specific language, e.g., `./translations.sh es`. Without specifying a language, the script defaults to extracting English translations.
- Focus on the relevant translation file, such as `po/es.po`. Tools like [poedit](https://poedit.net/) can make this task easier.
- Conclude your session with changes only in the `po/xx.po` file. Commit and open a PR. Ensure the PR begins with `i18n` to signal it involves translation.

This translation model draws inspiration from the [Comprehensive Rust repository](https://github.com/google/comprehensive-rust/blob/main/TRANSLATIONS.md).

#### Starting a New Language Translation

If initiating a new language translation without a local server:

- Use `./translations.sh new xx`, replacing `xx` with your language code. This command spawns the `xx.po` file for your language.
- Update your `xx.po` file with `./translations.sh xx` (swap `xx` with your language code), as detailed above.
- For pre-existing `xx.po` files, refrain from using the `new` command.

#### GPT Translation

Setup env:

```bash
python3 -m venv ~/lang

source ~/lang/bin/activate

pip install -r requirements.txt
```

See script `./main.py` for instructions.
