# update

The **`update`** command in Slot is utilized to modify and reconfigure existing deployments for services such as Katana, Torii, or Madara. This command allows for updating the configurations or the version of the service being used, ensuring that the latest features or necessary adjustments can be implemented without needing to redeploy from scratch.

### **Usage**

```sh
slot deployments update <Project Name> [service] [options]
```

### **Examples**

1. **Update a Katana Deployment:**
    
    ```sh
    slot deployments update 'MyProject' Katana --version "1.2" --block-time 12
    ```
    
2. **Update a Torii Service Deployment:**
    
    ```sh
    slot deployments update 'MyProject' Torii --version "2.0" --world 0x4fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac70f
    ```

### **Supported Services:**

- **Katana**
- **Madara**
- **Torii**