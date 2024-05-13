# list

The `list` command provides an overview of all the current deployments across various projects and teams within the Slot environment. It's an essential tool for managing and auditing service deployments.

### Purpose

This command allows users to quickly view all active deployments, facilitating an understanding of the scope and status of deployed services within their organization.

### Usage

```
slot deployments list
```

### Parameters

This command does not require any parameters or options. It is designed to fetch and display a comprehensive list of all deployments.

### Examples

```
slot deployments list
```

### Response and Output

Upon successful execution, the command outputs a list of deployments. Each entry includes details about the project, the service deployed, and other pertinent information such as the service ID and branch name.

### Detailed Description

When executed, the `list` command queries the Slot backend to retrieve all deployments associated with the user's teams and projects. It organizes the information by team and project, ensuring that users can easily navigate through their deployments. The output is structured to provide clear and concise details about each deployment:

- **Project**: Name of the project.
- **Branch**: Specific branch of the project deployed.
- **Service ID**: Identifier of the service deployed.