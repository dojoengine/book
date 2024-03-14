# Getting Started

This section guides you through:

- Dojo Unity SDK Setup: Learn how to integrate the Dojo.unity SDK into your Unity scene for seamless development.
- Calling Dojo Systems: Discover how to interact with various systems within your Dojo world directly from Unity.
- Building for Desktop & WebGL: Master the steps for building your onchain game for both desktop and WebGL platforms(using the Slot framework).

## Setting up Unity Scene

::::steps

### Add Essential Prefabs

In your Unity project, navigate to the scene where you want to integrate the Dojo SDK.

- From the `Project` window, locate the `Assets/Dojo/Prefabs` folder.
Drag the `WorldManager` prefab into your scene. This prefab acts as the central hub for managing entities in your Dojo world.
- Additionally, navigate to the `Assets/Dojo/Runtime` folder and drag the `UnityMainThreadDispatcher` prefab into your scene.

### Configuring the World Manager

Here's how to tailor the World Manager's settings to your specific needs:

#### Default Configuration

The World Manager operates with a default configuration called `WorldManagerDataLocalConfig`, residing in `Dojo/Runtime/Config`.

![world-manager-data](/unity/world-manager-data.png)
Feel free to modify this configuration directly if it suits your project's requirements.

#### Creating Custom Configurations

To create separate configuration files for different environments (like Slot), follow these simple steps:

In the `Project` window, right-click and choose `Create > ScriptableObjects > WorldManagerData`.
Customize the configuration values within this new ScriptableObject instance.

#### Applying a Configuration

To use a specific configuration, locate the `WorldManager` game object in your scene.
Drag the desired ScriptableObject (either the default one or your custom configuration) onto the `DojoConfig` field within the `WorldManager` component.

### Adding Binding Models

- Generate Models: If you haven't already created your model bindings, please refer to the [Bingen section](/client/sdk/unity/important-concepts#bingen) for step-by-step instructions on how to do so.

- Import Models: Locate the `bindings/unity/Models` folder within your Dojo project. Simply drag the desired `model` files from this folder into your Unity project. The `Synchronization Master` will automatically detect and load these models for seamless data exchange.

![bindings-example](/unity/bindings-example.png)

::::

## Calling systems

This section explores the process of interacting with Dojo systems from Unity, which involves a three-step process: account creation, call assembly, and call execution.

### Account Creation

We have two options for creating an account: a simple account or a burner account.

#### Simple Account Creation

To create a simple account, follow this code:

``` cs
using Dojo;
using Dojo.Starknet;
using UnityEngine;

void Start()
{
    var provider = new JsonRpcClient(dojoConfig.rpcUrl);
    var signer = new SigningKey(masterPrivateKey);
    var account = new Account(provider, signer, new FieldElement(masterAddress));
}
```

#### Burner Account Creation

For a burner account, execute the following code:

``` cs
using Dojo;
using Dojo.Starknet;
using UnityEngine;

async void Start()
{
    Account burnerAccount = await CreateBurnerAccount(dojoConfig.rpcUrl, masterAddress, masterPrivateKey);
}

private async Task<Account> CreateBurnerAccount(string rpcUrl, string masterAddress, string masterPrivateKey )
{
    var provider = new JsonRpcClient(rpcUrl);
    var signer = new SigningKey(masterPrivateKey);
    var account = new Account(provider, signer, new FieldElement(masterAddress));

    BurnerManager burnerManager = new BurnerManager(provider, account);
    return await burnerManager.DeployBurner();
}
```

> Replace `masterAddress` and `masterPrivateKey` with the **account Address** and **private key** of the prefunded Katana account.
![bindings-example](/unity/prefunded-account-address.png)
