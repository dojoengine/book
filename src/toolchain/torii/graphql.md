## Torii - GraphQL

### Name

In Dojo, you have access to custom queries and subscriptions that are specifically designed to work with the `caller` for client applications. GraphQL is the technology that makes this possible. It allows you to specify exactly what data you want to retrieve, and it delivers that data in a structured JSON format. This flexibility in data retrieval ensures that you get the information you need efficiently and in a format that's easy to work with.

### USAGE

#### Pre-requisites

Make sure torii is running in your local terminal.

```sh
torii --world <WORLD_ADDRESS>
```

Starts GraphQL server at `http://0.0.0.0:8080/graphql`

### Query Examples

After the torii server starts on your local machine, you're ready to make query and subscription operations.

#### Query operation

In [`hello-dojo`](../../cairo/hello-dojo.md#next-steps) we fetched all data from the `Moves` model. This time let's fetch only `id`, `name`, `classHash` fields from `Position` model .

```graphql
query {
  modelPosition(id: "position") {
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
    "model": {
      "id": "position",
      "name": "Position",
      "classHash": "0x6a8ab7eb5689bed6f0e9fb63d2565411830e1725aca7299f5f512d375d9a28c"
    }
  }
}
```

Great! If you're wondering about the number of fields a `Model` has or the details of a `System`, you can find all this information in the `Documentation Explorer` section of the GraphQL IDE. It's your go-to place for exploring the rest of the documentation.

Now lets retrieve data from `spawn` System.

```graphql
query getSystem {
  system(id: "spawn") {
    id
    name
    classHash
    transactionHash
    createdAt
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "system": {
      "id": "spawn",
      "name": "spawn",
      "classHash": "0x3c90894e85d9efd5b0e7dccc2fb2c6347ce1188317567d5b0f8d1128f0bbfa5",
      "transactionHash": "",
      "createdAt": "2023-09-28 14:14:28"
    }
  }
}
```

Now you can create any kind of query for `move` systems!

#### Subscription operations

These operations allow us to listen to changes in the system.

You can listen when an `Entity` is updated by executing this subscription

```graphql
subscription entityUpdated {
  entityUpdated {
    id
    modelNames
    createdAt
    updatedAt
  }
}
```

You can also listen for the models that are being registered by executing

```graphql
subscription modelRegistered {
  modelRegistered {
    id
    name
    classHash
    transactionHash
    createdAt
  }
}
```
