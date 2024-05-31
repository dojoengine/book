# delete

The **`delete`** command is used to remove existing deployments within the Slot toolchain. This command ensures that specific services, such as Katana, Torii, or Madara, are cleanly and completely removed, along with their configurations and data.

### **Purpose**

This command is crucial for managing the lifecycle of services by allowing users to terminate and clean up deployments when they are no longer needed or require replacement.

### **Supported Services:**

- **Katana**: Removes a deployed Katana service.
- **Madara**: Deletes a Madara service deployment.
- **Torii**: Terminates a Torii service instance.

### **Usage**

```sh
slot deployments delete <Project Name> <Service>
```

### **Parameters**

- **`<Project Name>`**: The name of the project associated with the deployment.
- **`<Service>`**: The specific service to delete. Options include **`Katana`**, **`Madara`**, and **`Torii`**.

### **Examples**

1. **Delete a Katana Deployment:**
    
    ```sh
    slot deployments delete "MyProject" Katana
    
    ```
    
2. **Remove a Torii Service Deployment:**
    
    ```sh
    slot deployments delete "MyProject" Torii
    ```