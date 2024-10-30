# update

The **`update`** command in Slot is utilized to modify and reconfigure existing deployments for services such as Katana, Torii, or Madara. This command allows for updating the configurations or the version of the service being used, ensuring that the latest features or necessary adjustments can be implemented without needing to redeploy from scratch.

## **Usage**

```sh
slot deployments update <Project Name> [service] [options]
```

### **Examples**

1. **Update a Katana Deployment:**

    ```sh
    slot deployments update example_project Katana --version 1.0.0-alpha.1 --block-time 12
    ```

2. **Update a Torii Service Deployment:**

    ```sh
    slot deployments update example_project Torii --version 1.0.0-alpha.1 --world 0x4fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac70f
    ```

### Response and Output

Upon execution, the command prints a confirmation message to the console, indicating that the update process has started and, upon completion, confirms the successful update of the deployment with new configuration details such as project name, service name, and updated settings.

### Sample Output

```
Updating deployment for project 'example_project' with service 'katana'...
Deployment updated successfully to version 1.0.0-alpha.1 with block time 12.

```

### **Supported Services:**

-   **Katana**
-   **Madara**
-   **Torii**
