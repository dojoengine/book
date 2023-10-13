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

In [`hello-dojo`](../../cairo/hello-dojo.md#next-steps) we fetched some data from the `Moves` model. This time let's fetch only `id`, `name`, `class_hash` fields from `Position` model .

```graphql
query {
  model(id: "Position") {
    id
    name
    class_hash
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "model": {
      "id": "Position",
      "name": "Position",
      "class_hash": "0x6ffc643cbc4b2fb9c424242b18175a5e142269b45f4463d1cd4dddb7a2e5095"
    }
  }
}
```

Great! If you're wondering about the number of fields a `Model` has or the details of a `Entities`, you can find all this information in the `Documentation Explorer` section of the GraphQL IDE. It's your go-to place for exploring the rest of the documentation.

Now lets retrieve more data from `Moves` model.

```graphql
query {
  movesModels {
    edges {
      node {
        player
        remaining
        last_direction
      }
    }
  }
}
```

After you run the query, you will receive an output like this:

```json
{
  "data": {
    "movesModels": {
      "edges": [
        {
          "node": {
            "player": "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
            "remaining": 10,
            "last_direction": "None"
          }
        }
      ]
    }
  }
}
```

Now you can create any kind of query for entities and models!

#### Subscription operations

These operations allow us to listen to changes in the system.

You can listen when an `Entity` is updated by executing this subscription

```graphql
subscription {
  entityUpdated {
    id
    keys
    model_names
    created_at
    updated_at
  }
}
```

You can also listen for the models that are being registered by executing

```graphql
subscription modelRegistered {
  modelRegistered {
    id
    name
  }
}
```
