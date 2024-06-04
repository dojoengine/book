# create

The **`create`** command in Slot is designed to initialize and configure new deployments for services like Katana, Torii, and Madara. This command facilitates the setup of specific configurations tailored to each service, enabling rapid deployment and testing environments.

### **Usage**

```sh
slot deployments create <Project Name> [service] [options]
```

### **Options**

- **`-version <version>`** Specify the version of the service to deploy.
- **`-config <config-path>`** Path to the service-specific configuration file.
- **Service-Specific Options**:
    - **Katana**:
        - **`-block-time <time>`** Block time for the blockchain instance.
        - **`-fork-rpc-url <URL>`** URL to fork from an existing blockchain.
    - **Torii**:
        - **`-world <world_id>`** Identifier for the virtual world to link the service.
    - **Madara**:
        - **`-chain <chain_name>`** Name of the blockchain configuration to deploy.

### **Examples**

1. **Create a Katana Deployment:**
    
    ```sh
    slot deployments create "MyProject" katana --version "1.0" --block-time 10
    ```
    
2. **Initialize a Torii Service with a World:**
    
    ```sh
    slot deployments create "MyProject" torii --world 0x3fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac69f
    ```

### **Services Supported:**

- **Katana**
- **Madara**
- **Torii**