## Torii - GraphQL

### Name

In Dojo, you have access to custom queries and subscriptions that are specifically designed to work with the `caller` for client applications. GraphQL is the technology that makes this possible.

GraphQL is the rising star of backend technologies. It replaces REST as an API design paradigm and is becoming the new standard for exposing the data and functionality of a web server. It allows you to specify exactly what data you want to retrieve, and it delivers that data in a structured JSON format. This flexibility in data retrieval ensures that you get the information you need efficiently and in a format that's easy to work with.

#### GraphQL Playground

GraphQL Playground is a `GraphQL IDE`` that allows you to interactively explore the functionality of a GraphQL API by sending queries and mutations to it. It’s somewhat similar to Postman which offers comparable functionality for REST APIs.

### USAGE

#### Pre-requisites

Make sure torii is running in your local terminal.

```sh
torii --world <WORLD_ADDRESS>
```

Starts GraphQL server at `http://0.0.0.0:8080/graphql`

After the torii server starts on your local machine, you're ready to make query and subscription operations.

### Query operation

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

Great! If you're wondering about the number of fields a `Model` has or the details of a `Entities`, you can find all the information about the schema definition in the `Documentation Explorer` section of the GraphQL IDE. It's your go-to place for exploring the rest of the documentation.

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

Feel free to play around with the query by removing any fields from the selection set and observe the responses sent by the server. It is your turn to create any kind of query for entities and models!

### Subscription operations

Subscriptions are a GraphQL feature that allows a server to send data to its clients when a specific event happens. Subscriptions are usually implemented with WebSockets. In that setup, the server maintains a steady connection to its subscribed client. This also breaks the “Request-Response-Cycle” that is used for with REST APIs.

Instead, the client initially opens up a long-lived connection to the server by sending a subscription query that specifies which event it is interested in. Every time this particular event happens, the server uses the connection to push the event data to the subscribed client(s).

In this example, you can listen when an `Model` is registered by executing this subscription

```graphql
subscription modelRegistered {
  modelRegistered {
    id
    name
  }
}
```

Graphql also supports subscription to a targeted entity or model, for this we have to pass its id as an argument

In this example, our serve provides a `entityUpdated` subscription, which should notify clients whenever an entity with id `0x579e8877c7755365d5ec1ec7d3a94a457eff5d1f40482bbe9729c064cdead2` is updated. A client can execute a subscription that looks like this:

```graphql
subscription {
  entityUpdated(
    id: "0x579e8877c7755365d5ec1ec7d3a94a457eff5d1f40482bbe9729c064cdead2"
  ) {
    id
    keys
    model_names
    created_at
    updated_at
  }
}
```
