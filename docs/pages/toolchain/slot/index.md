![slot](/slot-icon-word.png)

Slot is a toolchain developed by [Cartrige.gg](https://github.com/cartridge-gg/slot) for rapidly spinning up Katana and Torii instances for play testing and supporting games in production.

## Key Features

-   **Rapid Deployment:** Quickly spin up Katana and Torii instances to speed up testing cycles of your game projects.
-   **Easily manage services from CLI:** Easily manage services from the command line.
-   **Scaling and multiregion support on their way:** Upcoming support for scaling and multi-region deployments.

## Installation

Run the following command to install slot:

```sh
curl -L https://slot.cartridge.sh | bash
```

This command downloads and installs `Slot`.

Once finished, run `slotup` to manage slot installations and follow the outputted directions:

```sh
slotup
```

This command sets up `Slot`, ensuring it's ready for use.

Use the following command to get help and view available options:

```sh
slotup --help
```

## Deploy using Slot

Start deploying your projects with Slot using the most common services for Katana and Torii environments, . These tools are tailored for rapid deployment and testing. Check out the tutorial on Deploying Using Slot for detailed instructions. [Deploy using Slot](/tutorials/deploy-using-slot/main.md).

> 📚 **Reference**
>
> See the [`slot` Reference](/toolchain/slot/reference.md) for a detailed look at all the available subcommands.
