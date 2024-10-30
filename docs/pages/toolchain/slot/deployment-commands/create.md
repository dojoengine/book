# create

The **`create`** command initializes and configures new deployments for services like Katana, Torii, and Madara. It sets up specific configurations for each service, enabling rapid deployment and testing environments.

## **Usage**

```sh
slot deployments create <Project Name> <Service> [options]
```

### **Examples**

1. **Create a Katana Deployment:**

    ```sh
    slot deployments create example_project katana --version 1.0.0-alpha.1
    ```

2. **Initialize a Torii Service with a World:**

    ```sh
    slot deployments create example_project torii --world 0x3fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac69f
    ```

### Response and Output

Upon execution, the command prints a confirmation message to the console, indicating that the deployment process has started and, upon completion, confirms the successful creation of the deployment with details such as project name, service name, and version.

### Sample Output

```
Creating deployment for project 'example_project' with service 'katana'...
Deployment created successfully with version 1.0.0-alpha.1.
```

### **Services Supported:**

-   **Katana**
-   **Madara**
-   **Torii**
