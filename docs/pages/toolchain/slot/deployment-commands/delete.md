# delete

The **`delete`** command is used to remove existing deployments within Slot. This command ensures that specific services, such as Katana, Torii, or Madara, are cleanly and completely removed, along with their configurations and data.
s
### **Usage**

```sh
slot deployments delete <Project Name> <Service>
```

### **Examples**

1. **Delete a Katana Deployment:**
    
    ```sh
    slot deployments delete 'MyProject' Katana
    ```
    
2. **Remove a Torii Service Deployment:**
    
    ```sh
    slot deployments delete 'MyProject' Torii
    ```

### **Supported Services:**

- **Katana**
- **Madara**
- **Torii**