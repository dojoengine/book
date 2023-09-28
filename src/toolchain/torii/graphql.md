## Torii - GraphQL

### Name

GraphQL - A modern alternative to the well-known REST API server. In Dojo, it offers custom queries and subscriptions tailored to the world contract for client applications. GraphQL enables us to selectively retrieve the data we need, providing it all in the JSON format.

### USAGE

#### Pre-requisites

Make sure torii is running in your local terminal.

```sh
torii
```

Starts GraphiQL server at `http://0.0.0.0:8080/`

### Query Examples

Following [`hello-dojo`](../../cairo/hello-dojo.md) we are going to use the same local Dojo project. It means will utilize the `Moves` and `Position` components and `spawn` and `move` systems. Now, we are going discuss about query and subscription operation

#### Query operation

In `hello-dojo` we fetched all data from the `Moves` component. This time let's fetch only `id`, `name`, `classHash` fields from `Position` component .

```json
query {
	component(id: "position") {
		id
		name
		classHash
	}
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "component": {
      "id": "position",
      "name": "Position",
      "classHash": "0x6a8ab7eb5689bed6f0e9fb63d2565411830e1725aca7299f5f512d375d9a28c"
    }
  }
}
```

Nice! But how can you know about how many fields a `component` have, or what are the fields of `system`. All this information you can find in the `Documentation Explorer` section of GraphiQL IDE.

Now lets retrieve data from `spawn` system.

```json
query {
	system(id: "spawn") {
		classHash
		createdAt
		id
		name
		transactionHash
	}
}

```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "system": {
      "classHash": "0x3c90894e85d9efd5b0e7dccc2fb2c6347ce1188317567d5b0f8d1128f0bbfa5",
      "createdAt": "2023-09-28 14:14:28",
      "id": "spawn",
      "name": "spawn",
      "transactionHash": ""
    }
  }
}
```

Now you can create any kind of query for `move` systems!

#### Subscription operation
