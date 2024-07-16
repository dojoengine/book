# create

The **`create`** command initializes and configures new deployments for services like Katana, Torii, and Madara. It sets up specific configurations for each service, enabling rapid deployment and testing environments.

### **Usage**

```sh
slot deployments create <Project Name> <Service> [options]
```

### **Examples**

1. **Create a Katana Deployment:**
    
    ```sh
    slot deployments create 'MyProject' katana --version "1.0" --block-time 10
    ```
    
2. **Initialize a Torii Service with a World:**
    
    ```sh
    slot deployments create 'MyProject' torii --world 0x3fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac69f
    ```

### **Services Supported:**

- **Katana**
- **Madara**
- **Torii**