# create

The **`create`** command in Slot is designed to initialize and configure new deployments for services like Katana, Torii, and Madara. This command facilitates the setup of specific configurations tailored to each service, enabling rapid deployment and testing environments.

### **Purpose**

This command configures and launches new instances of specified services. Each service type can be customized with specific options to meet the deployment needs.

### **Services Supported:**

- **Katana**: Configures and launches a Katana service.
- **Madara**: Sets up a Madara service with custom blockchain configurations.
- **Torii**: Initializes a Torii service linked to a specified world.

### **Usage**

```
slot deployments create <Project Name> [service] [options]
```

### **Options**

- **`-version <version>`**: Specify the version of the service to deploy.
- **`-config <config-path>`**: Path to the service-specific configuration file.
- **Service-Specific Options**:
    - **Katana**:
        - **`-block-time <time>`**: Block time for the blockchain instance.
        - **`-fork-rpc-url <URL>`**: URL to fork from an existing blockchain.
    - **Torii**:
        - **`-world <world_id>`**: Identifier for the virtual world to link the service.
    - **Madara**:
        - **`-chain <chain_name>`**: Name of the blockchain configuration to deploy.

### **Examples**

1. **Create a Katana Deployment:**
    
    ```
    slot deployments create "MyProject" katana --version "1.0" --block-time 10
    ```
    
2. **Initialize a Torii Service with a World:**
    
    ```
    slot deployments create "MyProject" torii --world 0x3fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac69f
    ```