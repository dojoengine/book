## World

The world functions as a central system kernel, serving as the foundation for initiating and resolving all interactions. Within this kernel, contracts are deployed, registered, and executed, streamlining the process for downstream systems by enabling them to engage with a single contract rather than managing hundreds.

### constructor (constructor)

This function is used to create a new instance of the World with a given name and executor address.

```rust
#[constructor]
fn constructor(name: ShortString, executor_: ContractAddress);
```

### initialize (external)

This function initializes the world with the routes that specify the permissions for each system to access components. This function must be called before any other operations on the world are performed.

```rust
#[external]
fn initialize(routes: Array<Route>);
```

### is_authorized (view)

This function checks if a given system is authorized to access a given component.

```rust
#[view]
fn is_authorized(system: ClassHash, component: ClassHash) -> bool;
```

### is_account_admin (view)

This function checks if the calling account has an admin role.

```rust
#[view]
fn is_account_admin() -> bool;
```

### register_component (external)

This function registers a new component in the world. If the component is already registered, the implementation will be updated.

```rust
#[external]
fn register_component(class_hash: ClassHash);
```

### component (view)

This function retrieves the ClassHash of a component using its name.

```rust
#[view]
fn component(name: ShortString) -> ClassHash;
```

### register_system (external)

This function registers a new system in the world. If the system is already registered, the implementation will be updated.

```rust
#[external]
fn register_system(class_hash: ClassHash);
```

### system (view)

This function retrieves the ClassHash of a system using its name.

```rust
#[view]
fn system(name: ShortString) -> ClassHash;
```

### execute (external)

This function allows the execution of a system.

```rust
#[external]
fn execute(name: ShortString, execute_calldata: Span<felt252>) -> Span<felt252>;
```

### uuid (external)

This function issues an autoincremented id to the caller.

```rust
#[external]
fn uuid() -> usize;
```

### set_entity (external)

This function sets an entity's state in a component's storage.

```rust
#[external]
fn set_entity(component: ShortString, query: Query, offset: u8, value: Span<felt252>);
```

### delete_entity (external)

This function deletes an entity from a component's storage.

```rust
#[external]
fn delete_entity(component: ShortString, query: Query);
```

### entity (view)

This function retrieves an entity's state from a component's storage.

```rust
#[view]
fn entity(
    component: ShortString,
    address_domain: u32,
    partition: u250,
    keys: Span<u250>,
    offset: u8,
    length: usize
) -> Span<felt252>;
```

### entities (view)

This function retrieves all entities that contain the state of a specific component.

```rust
#[view]
fn entities(component: ShortString, partition: u250) -> (Span<u250>, Span<Span<felt252>>);
```

### set_executor (external)

This function sets the executor of the world to a given contract address.

```rust
#[external]
fn set_executor(contract_address: ContractAddress);
```
