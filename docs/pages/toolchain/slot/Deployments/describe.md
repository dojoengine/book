# describe

The `update` command allows users to modify configurations of existing deployments within the Slot ecosystem, including Katana, Torii, and Madara services. This command supports various configuration options tailored to each service, ensuring deployments are kept up-to-date with the latest operational requirements and features.

### Purpose

This command facilitates the ongoing maintenance and enhancement of service deployments, allowing adjustments such as version updates, configuration changes, and performance tuning.

### Supported Services:

- **Katana**: Updates configurations specific to the Katana service.
- **Torii**: Applies updates to a Torii service instance.
- **Madara**: (Pending implementation) Future support for updating Madara services.

### Usage

```
slot deployments update <Project Name> [service] [options]
```

### Parameters

- **`<Project Name>`**: The name of the project associated with the deployment.
- **`[service]`**: The specific service to update. Valid options are `Katana`, `Torii`, and `Madara`.

### Options

- **General Options**:
    - **`-version <version>`**: Specify the version of the service.
    - **`-tier <tier>`**: Deployment tier, e.g., `basic`.
- **Service-Specific Options**:
    - **Katana**:
        - **`-block-time <time>`**: Set the block time for the deployment.
        - **`-fork-rpc-url <URL>`**: Specify the RPC URL to fork.
        - **`-fork-block-number <number>`**: Block number to fork from.
        - **`-disable-fee <boolean>`**: Enable or disable fee processing.
        - **`-gas-price <price>`**: Set the gas price.
        - **`-invoke-max-steps <steps>`**: Maximum steps for invoke operations.
        - **`-validate-max-steps <steps>`**: Maximum steps for validate operations.
    - **Torii**:
        - **`-world <world_id>`**: Identifier for the virtual world.
        - **`-start-block <block>`**: Start block for the deployment.
        - **`-index-pending <boolean>`**: Enable or disable indexing of pending transactions.

### Examples

1. **Update a Katana Deployment:**
    
    ```
    slot deployments update "MyProject" Katana --version "1.2" --block-time 15 --disable-fee true
    ```
    
2. **Update a Torii Service Deployment:**
    
    ```
    slot deployments update "MyProject" Torii --world 0x4fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac70f --start-block 500
    ```