# Slot

Slot is a robust toolchain designed by [Cartrige.gg](https://github.com/cartridge-gg/slot) for rapidly spinning up Katana and Torii instances. which are essential for testing and development in gaming projects.

## Key Features

- **Rapid Deployment**: Quickly spin up Katana and Torii instances to speed up the development and testing cycles of your game projects.
- **Easy Installation**: Simple one-line installation command.
- **Comprehensive Management**: Use `slotup` to manage Slot installations and configurations seamlessly.

## Installation

Run the following command to install slot:

```sh
curl -L https://slot.cartridge.sh | bash
```
This command downloads and installs the latest version of `Slot`, preparing you to manage your instances immediately.

Once finished, run `slotup` to manage slot installations and follow the outputted directions:
```sh
slotup --help
```


## Deploy using Slot

To start deploying your projects with Slot, you can utilize the built-in support for Katana and Torii environments. These tools are tailored for rapid deployment and testing, check out the tutorial [Deploy using Slot](/tutorial/deploy-using-slot/main.md).

> 📚 **Reference**
>
> See the [`slot` Reference](/toolchain/slot/reference.md) for a detailed look at all the available subcommands.
