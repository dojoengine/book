
**Installing Dojo with WSL2 on Windows**

1. **Enable the "Windows Subsystem for Linux" feature:**
   - Open "Control Panel" -> "Programs" -> "Turn Windows features on or off".
   - Enable the "Windows Subsystem for Linux" checkbox and click "OK".
   - Restart your computer.

2. **Install Ubuntu:**
   - Open a command prompt.
   - Run the following command:
     ```
     wsl --install -d Ubuntu
     ```

3. **Verify Installation (Step moved):**
   - Open a command prompt.
   - Run the following command:
     ```
     wsl -l
     ```
   - You should see "Ubuntu" listed as an installed distro.

4. **You will be prompted to create a Username and a password.**

5. **Installing rustup on Linux**

   - Open your WSL2 Ubuntu terminal.
   - Run the following command to install the latest stable release of Rust:
     ```
     curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
     ```
   - When prompted, select the first option "1) Proceed with standard installation (default - just press enter)".
   - After completion, you should see "Rust is installed now. Great!"

   **Temporarily adding Cargo bin directory to PATH (Optional):**

   - If you don't want to restart your terminal, you can temporarily add the 'Cargo bin directory' to your PATH environment variable.
   - Run the following command in your terminal:
     ```bash
     export PATH=$PATH:$HOME/.cargo/bin
     ```
   - This tells the system where to search for executables like `rustc` and `cargo`.

6. **Installing git**

   - At the time of writing, git v2.43.0 comes pre-installed with WSL2 Ubuntu 24.04.1 LTS.
   - You can verify this by running:
     ```
     git --version
     ```

7. **Installing Scarb**

   - Run the following command in your terminal to install the latest stable release of Scarb:
     ```
     curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh](https://docs.swmansion.com/scarb/install.sh) | sh
     ```
   - Follow the on-screen instructions during the installation.

   **Updating your PATH for Scarb (Optional):**

   - If you don't want to open a new terminal, run this command to update your PATH:
     ```
     source /home/<Username>/.bashrc
     ```
   - Replace `<Username>` with your actual username.

   - Now you can check the installation by running:
     ```
     scarb --version
     ```

8. **Installing DOJO with asdf **

   - Run the following command to install asdf:
     ```
     git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.1
     ```
   - Run the following commands in your terminal to configure asdf for Dojo:

     ```bash
     echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
     echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc

     source ~/.bashrc  # Reload the .bashrc file
     ```

9. **Installing dojo**

   - Add the Dojo plugin to asdf and install version 1.0.0-alpha.5:

     ```
     asdf plugin add dojo https://github.com/dojoengine/asdf-dojo
     asdf install dojo 1.0.0-alpha.5
     ```

   - Set the global version of Dojo:

     ```
     asdf global dojo 1.0.0-alpha.5
     ```

10. **Verifying Installation**

   - View the currently installed Dojo version:

     ```
     asdf current dojo
     ```

   - This should output something like:
     ```
     > dojo  1.0.0-alpha.5 /home/<Username>/.tool-versions
     ```

   - Alternatively, you can use the `sozo` command (provided by Dojo) to check the installed versions of Dojo, Scarb, Cairo, and Sierra:

     ```
     sozo --version
     ```

**Note:**

- Replace `<Username>` in the Scarb and Dojo PATH update commands with your actual username.

[dojo](https://book.dojoengine.org/getting-started)
[wsl2](https://learn.microsoft.com/en-us/windows/wsl/install)
[scarb](https://docs.swmansion.com/scarb/download.html)
[asdf](https://asdf-vm.com/guide/getting-started.html)



