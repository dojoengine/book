# describe

The **`describe`** command provides detailed information about the configurations of existing deployments in the Slot ecosystem, including Katana, Torii, and Madara services. It retrieves various configuration details, ensuring that users can view and verify the current settings of their deployments.


### Usage

```sh
slot deployments describe <Project Name> <Service> [options]
```

### Examples

1. **Describe a Katana Deployment:**
    
    ```sh
    slot deployments describe 'MyProject' Katana --version "1.2"
    ```
    
2. **Describe a Torii Service Deployment:**
    
    ```sh
   slot deployments describe 'MyProject' Torii --world 0x4fa481f41522b90b3684ecfab7650c259a76387fab9c380b7a959e3d4ac70f
    ```

