# delete

The **`delete`** command is used to remove existing deployments within Slot. This command ensures that specific services, such as Katana, Torii, or Madara, are cleanly and completely removed, along with their configurations and data.

## **Usage**

```sh
slot deployments delete <Project Name> <Service>
```

### **Examples**

1. **Delete a Katana Deployment:**

    ```sh
    slot deployments delete example_project Katana --version 1.0.0-alpha.1
    ```

2. **Remove a Torii Service Deployment:**

    ```sh
    slot deployments delete example_project Torii --version 1.0.0-alpha.1
    ```

Updating deployment for project 'example_project' with service 'katana'...
Deployment updated successfully to version 1.0.0-alpha.1 with block time 12.

### Response and Output

Upon execution, the command prints a confirmation message to the console, indicating that the deletion process has started and, upon completion, confirms the successful removal of the specified deployment, including the project name and service name.

### Sample Output

```
Deleting deployment for project 'example_project' with service 'katana'...
Deployment deleted successfully.


```

### **Supported Services:**

-   **Katana**
-   **Madara**
-   **Torii**
