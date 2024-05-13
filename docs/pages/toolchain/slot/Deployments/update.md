# update

The **`update`** command in Slot is utilized to modify and reconfigure existing deployments for services such as Katana, Torii, or Madara. This command allows for updating the configurations or the version of the service being used, ensuring that the latest features or necessary adjustments can be implemented without needing to redeploy from scratch.

### **Purpose**

This command is essential for maintaining and optimizing the deployment lifecycle, allowing changes to be seamlessly integrated into active services with minimal downtime.

### **Supported Services:**

- **Katana**: Updates a deployed Katana service's configuration.
- **Madara**: Applies updates to a Madara service deployment (functionality pending implementation).
- **Torii**: Updates a Torii service instance with new configurations or versions.

### **Usage**

```sh
slot deployments update <Project Name> [service] [options]
```

### **Parameters**

- **`<Project Name>`**: The name of the project associated with the deployment.
- **`[service]`**: The specific service to update. Options include **`Katana`**, **`Madara`**, and **`Torii`**.

### **Options**

- **`-version <version>`**: Specify the new version of the service to apply.
- **Service-Specific Options**:
    - **Katana**:
        - **`-block-time <time>`**: Update the block time for the blockchain instance.
        - **`-fork-rpc-url <URL>`**: Update the URL to fork from an existing blockchain.
    - **Torii**:
        - **`-world <world_id>`**: Update the world identifier for the Torii service.

### **Examples**

1. **Update a Katana Deployment:**
    
    ```sh
    slot deployments update "MyProject" Katana --version "1.2" --block-time 12
    ```
    
2. **Update a Torii Service Deployment:**
    
    ```sh
    slot deployments update "MyProject" Torii --version "2.0" --world 0x4fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac70f
    ```