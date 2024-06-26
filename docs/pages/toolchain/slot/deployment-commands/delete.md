# delete

The **`delete`** command is used to remove existing deployments within the Slot toolchain. This command ensures that specific services, such as Katana, Torii, or Madara, are cleanly and completely removed, along with their configurations and data.

### **Usage**

```sh
slot deployments delete <Project Name> <Service>
```

### **Parameters**

- **`<Project Name>`** The name of the project associated with the deployment.
- **`<Service>`** The specific service to delete. Options include **`Katana`**, **`Madara`**, and **`Torii`.**

### **Examples**

1. **Delete a Katana Deployment:**
    
    ```sh
    slot deployments delete "MyProject" Katana
    ```
    
2. **Remove a Torii Service Deployment:**
    
    ```sh
    slot deployments delete "MyProject" Torii
    ```

### **Supported Services:**

- **Katana**
- **Madara**
- **Torii**