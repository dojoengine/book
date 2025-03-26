---
title: "Dojo Unreal Engine Integration"
description: "Detailed guide to integrating Dojo with Unreal Engine for building onchain games"
---

# dojo.unreal

### Prerequisites

Setup your project by following the instructions [here](./../../unrealengine)
## Dojo Unreal Engine methods

Using the command `sozo build --unreal`, you can add the `DojoHelpers.h` and `DojoHelpers.cpp` files to your project.

These files use the Dojo plugin and expose simple functions that you can use from another cpp file or directly from a Blueprint.

If you have set up everything correctly, you will have a connected Torii client in a blueprint.

Here are all the things you need to set up:

::::steps

#### Create public variables in your `DojoGameLogic` Blueprint (click on the closed eye to be able to change it in the Inspector)

![unrealinspector](/unreal/configinspector2.png)
![unrealinspector2](/unreal/configinspector.png)

#### Create your DojoHelpers actor

![unrealhelpers](/unreal/spawnhelpers.png)

#### Connect to Torii and set contracts addresses

![unrealtoriicontracts](/unreal/connect_setup.png)

#### Subscribe and fetch existing models

This is where you will retrieve all the models that are stored on-chain.

Both subscription and fetch existing models will trigger a custom event called `OnDojoModelUpdate`. Always bind this Custom Event before calling any of these functions.

![unrealmodels0](/unreal/getmodelupdate.png)

You can then create functions for each model to retrieve the values and update your game

![unrealmodels3](/unreal/accessmodel2.png)

Generated models follow the Unreal Engine 5 convention in cpp. For example, if you have a Vec2 model, it will be called FVec2.

For enums, to avoid conflicts, they are prefixed with "ED" (E for Enums, D for Dojo). For example, Direction enum becomes EDDirection.

When used in a blueprint, the prefix is removed.

#### Controller

To send transactions, you need to use the Cartridge Controller.

When a player connects, a new browser tab opens to handle authentication. The connection result is returned through a custom event after the player successfully connects. Important: Always bind this Custom Event before calling either ControllerConnect or ControllerGetAccountOrConnect.

The ControllerAccount method always opens a new browser tab for authentication. GetAccountOrConnect first attempts to retrieve a previously stored account, and only opens a new browser tab if no existing account is found.

If the account address is 0x0, it means the player did not connect to the Controller.

We also call the CallControllerDojoStarterActionsSpawn function. More information about calls is provided below.

![unrealcontroller](/unreal/controllerconnectandcall.png)

#### Calls

There are two functions available for each selector of your contracts.

If you used CreateBurnerDeprecated, use functions prefixed with `Call`.
If you used the Controller Connect, use functions prefixed with `CallController`.

The format for each function is `<PREFIX><NAMESPACE><CONTRACT><SELECTOR>` with all the required parameters

![unrealcall](/unreal/callmethod.png)
