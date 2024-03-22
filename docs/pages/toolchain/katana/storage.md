# Storage Modes

Katana offers different storage modes to cater to various use cases and requirements. There are two primary storage modes: **in-memory** storage and **persistent** storage. 

By default, Katana operates in an **ephemeral mode**, where all data is stored in memory and is not persisted when the process is terminated. Running Katana using in-memory storage offers the fastest performance, as it eliminates the overhead of performing disk I/O operations. Ephemeral mode is suitable for quick testing and experimentation of your Dojo game.

However, Katana also supports persistent storage, allowing the state of the chain to be saved and restored across process restarts. This is particularly useful for scenarios where maintaining the state of the chain is crucial, such as in production environments or performing long-running playtests. 

## Persistent Storage

To enable persistent storage, you can use the `--db-dir <PATH>` command-line flag when running Katana. This flag specifies the directory where the database files will be stored. If the specified path points to an empty directory, Katana will create a new database. On the other hand, if the path points to a directory with a previously initialized Katana database, Katana will use the existing database, allowing you to resume from the previous state.

::::note
💡 **NOTE**  
When Katana is running in "forked" mode, the storage mode currently defaults to in-memory. Persistent storage support for forked mode is not yet available.
::::

### Usage Examples

```sh
# Initialize a new database in the specified directory
katana --db-dir ./katana-db
```
```sh
# Resume from a previously saved state
katana --db-dir ./existing-katana-db
```