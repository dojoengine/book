# logs

The **`logs`** command is used to fetch and display logs from a specified deployment service within the Slot environment. This command supports real-time log streaming as well as querying historical logs, making it an essential tool for monitoring and debugging deployment activities.

### Usage

```sh
slot deployments logs <Project Name> <Service> [options]
```

### Parameters

- **`<Project Name>`**: The name of the project associated with the deployment.
- **`<Service>`**: The specific service from which to fetch logs. Valid options are `Katana`, `Madara`, and `Torii`.

### Options

- **`-since <RFC3339 timestamp>`**: Fetch logs starting after this timestamp. If omitted, logs are fetched from the latest available entry.
- **`-limit <n>`**: Limits the number of log entries returned. Default is 25.
- **`-follow`**: Continuously stream logs. If set, logs will be streamed until the command is manually stopped.

### Examples

1. **Fetch the last 50 logs from a Katana service:**
    
    ```sh
    slot deployments logs "MyProject" Katana --limit 50
    ```
    
2. **Stream logs from a Torii service:**
    
    ```sh
    slot deployments logs "MyProject" Torii --follow
    ```
    

### Response and Output

Upon execution, logs are printed directly to the console. For historical log queries, the command prints up to the specified limit of log entries. When using the `--follow` option, logs are streamed in real-time and the command continues to run until manually terminated.

### Detailed Description

- **Fetching Logs**: The command queries the Slot backend to retrieve logs associated with the specified service and project. Logs can be filtered by time using the `-since` option.
- **Streaming Logs**: When `-follow` is used, the command enters a streaming mode where new log entries are printed as they become available, similar to tailing a log file in many traditional operating systems.

### Handling Large Volumes of Logs

- To prevent excessive data usage or console overflow, use the `-limit` option judiciously.
- For continuous monitoring, the `-follow` mode provides a live view of the service's operational status.

### Sample Output

```
2023-01-01T12:00:00Z INFO Starting new deployment...
2023-01-01T12:01:00Z WARN High memory usage detected...
2023-01-01T12:02:00Z ERROR Failed to connect to database...
---
```

This structured approach ensures users are well-equipped to use the `logs` command effectively, facilitating better management and oversight of their deployments within the Slot CLI tool.