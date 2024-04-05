## Torii - GraphQL

### Name

In Dojo, you have access to custom queries and subscriptions that are specifically designed to work with the `caller` for client applications. GraphQL is the technology that makes this possible.

GraphQL is the rising star of backend technologies. It replaces REST as an API design paradigm and is becoming the new standard for exposing the data and functionality of a web server. It allows you to specify exactly what data you want to retrieve, and it delivers that data in a structured JSON format. This flexibility in data retrieval ensures that you get the information you need efficiently and in a format that's easy to work with.

#### GraphQL Playground

GraphQL Playground is a `GraphQL IDE` that allows you to interactively explore the functionality of a GraphQL API by sending queries and mutations to it. It’s somewhat similar to Postman which offers comparable functionality for REST APIs.

### USAGE

#### Pre-requisites

Make sure torii is running in your local terminal.

```sh
torii --world <WORLD_ADDRESS>
```

It starts GraphQL server at `http://0.0.0.0:8080/graphql`

After the torii server starts on your local machine, you're ready to make query and subscription operations.

### Schema and query defintions

Torii generates both the schema and queries at runtime specific to your world. There are mainly two groups of queries, predefined queries and dynamically generated custom queries.

Predefined queries like `entities` provide a generic entry point to the entities data of the world. Custom queries on the other hand are built according to the models of the world. Each model has a correpsonding `{name}Models` query and retrieves the associated model data. For example: `positionModels`.

The benefit of custom queries becomes apparent when filtering and sorting is needed. They allow much more finer control of the returned dataset.

### Query operation

In [`hello-dojo`](/cairo/hello-dojo.md#next-steps) we fetched some data from the `Moves` model. This time let's fetch only `id`, `name`, `classHash` fields from `Position` model .

```graphql
query {
  model(id: "Position") {
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
      "id": "Position",
      "name": "Position",
      "classHash": "0x6ffc643cbc4b2fb9c424242b18175a5e142269b45f4463d1cd4dddb7a2e5095"
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

#### Transactions

GraphQL additionally offers an API to fetch transactions emitted from your `world`. Presently, you can retrieve `transaction data` with the potential for future support of `transaction receipt`. Current API includes pagination support, although filtering is not yet supported. Let's explore an example.

```graphql
query{
  transactions{
    edges{
      node{
        id
        transactionHash
        senderAddress
        calldata
      }
    }
    totalCount
  }
}
```

If you execute this query after you applied `sozo migrate plan` and `sozo migrate apply` in your [`hello-dojo`](/cairo/hello-dojo.md) example. You will get an output similar to this.

```json
{
  "data": {
    "transactions": {
      "edges": [
        {
          "node": {
            "id": "0x000000000000000000000000000000000000000000000000000000000000000a:0x0000",
            "transactionHash": "0x2da3d65e223362c72906f97663a4e7dc81ab0bbd04bbde5532a230c1e97d93e",
            "senderAddress": "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
            "calldata": [
              "0x1",
              "0x405a3c5421ca7e23052abce78057e27384ba9db5e4feff7b4041a74e769a98a",
              "0x2730079d734ee55315f4f141eaed376bddd8c2133523d223a344c5604e0f7f8",
              "0x0",
              "0x2",
              "0x2",
              "0x35ec9fd22092dc0c8fc9341e94d5f361924d921c128fa46a0648f2dac519ce4",
              "0x2ffecbe8de6c7c10c785a6eb964ee6489f8dcf139000adbe2c0f12d249be7d8"
            ]
          }
        },
        {
          "node": {
            "id": "0x0000000000000000000000000000000000000000000000000000000000000008:0x0000",
            "transactionHash": "0x2aa02de0e3fa582b3cb6cf9e4371051f44ae2e0d6c94f5c936338ffc8c2ac12",
            "senderAddress": "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
            "calldata": [
              "0x2",
              "0x405a3c5421ca7e23052abce78057e27384ba9db5e4feff7b4041a74e769a98a",
              "0x1e7875674bcb09daaf984cbf77264ac98120cb39e6d17522520defcdc347476",
              "0x0",
              "0x1",
              "0x405a3c5421ca7e23052abce78057e27384ba9db5e4feff7b4041a74e769a98a",
              "0x1e7875674bcb09daaf984cbf77264ac98120cb39e6d17522520defcdc347476",
              "0x1",
              "0x1",
              "0x2",
              "0x2e5174b54aef0b99d4685827ffa51488447e1f5607908293d5c715d6bd22433",
              "0x6a11b5b3003a3aa0ae7f8f443e48314cc0bc51eaea7c3ed1c19beb909f5dda3"
            ]
          }
        },
        {
          "node": {
            "id": "0x0000000000000000000000000000000000000000000000000000000000000005:0x0000",
            "transactionHash": "0x1f03fa7dc5a673f96d53b728785a98d6ff089c182a7bb32735b150e91817e5b",
            "senderAddress": "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
            "calldata": [
              "0x1",
              "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
              "0x1987cbd17808b9a23693d4de7e246a443cfe37e6e7fbaeabd7d7e6532b07c3d",
              "0x0",
              "0x6",
              "0x6",
              "0xb3e374b8087dca92601afbb9881fed855ac0d568e3bf878a876fca5ffcb479",
              "0x41d7f42bf7a362f0420aaae66d7a91df981100a039ac116a1d9cb632c74ad27",
              "0x0",
              "0x2",
              "0x59f31686991d7cac25a7d4844225b9647c89e3e1e2d03460dbc61e3fbfafc59",
              "0x77638e9a645209ac1e32e143bfdbfe9caf723c4f7645fcf465c38967545ea2f"
            ]
          }
        }
      ],
      "totalCount": 3
    }
  }
}
```

Now feel free to play around with the query by removing any fields from the selection set and observe the responses sent by the server. It is your turn to create any kind of query for entities and models!

#### Pagination

As the entities in your world grows, fetching all of that data at once can become inefficient and slow.

Torii provides two methods to address this - cursor or offset/limit based pagination. To keep the return type consistent, both methods will return a [`Connection`](https://relay.dev/graphql/connections.htm#sec-Connection-Types) type.

You can read more about graphql pagination [here](https://graphql.org/learn/pagination).

##### Cursor

Cursor based pagination is the most efficient, allowing us to query a subset or slice of the entire set of data. Both forward and backward pagination are supported using a combination of `first, last, before, after` input arguments.

Forward pagination uses `first`/`after` and backward pagination uses `last`/`before`. `first`/`last` are integers representing the number of items to return. `after`/`before` are the cursors to paginate from.

Query for first page of 2 entities

```graphql
query {
  entities (first: 2) {
    totalCount
    edges {
      cursor
      node {
        ...
      }
    }
  }
}
```

Result shows there are 5 entities and returns the first two

```json
{
  "entities" {
    "totalCount": 5,
    "edges" [
      {
        "cursor": "Y3Vyc29yX29uZQ==",
        "node" : { }
      },
      {
        "cursor": "Y3Vyc29yX3R3bw==",
        "node" : { }
      },
    ]
  }
}
```

Query 3 entities after the second node (last 3)

```graphql
query {
  entities (first: 3, after: "Y3Vyc29yX3R3bw==") {
    ...
  }
}
```

##### Offset/limit

Offset/limit based pagination can be more intuitive and easier to use. However, for very, very large datasets they can be inefficient.

```graphql
# essentially the same as the last query in cursor example
query {
  entities (offset: 2, limit 3) {
    ...
  }
}
```

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

In this example, our server provides a `entityUpdated` subscription, which should notify clients whenever an entity with id `0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20` is updated. On the same subscription we can get the model(components) values of the updated entity . A client can execute a subscription that looks like this:

```graphql
subscription {
  entityUpdated(
    id: "0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20"
  ) {
    id
    keys
    eventId
    createdAt
    updatedAt
    models {
      __typename
      ... on Moves {
        remaining
        player
      }
      ... on Position {
        vec {
          x
          y
        }
      }
    }
  }
}
```

According to your input, you will receive an output like this:

```json
{
  "data": {
    "entityUpdated": {
      "id": "0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20",
      "keys": [
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
      ],
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000013:0x0000:0x0000",
      "createdAt": "2023-10-17 11:39:42",
      "updatedAt": "2023-10-17 11:52:48",
      "models": [
        {
          "__typename": "Moves",
          "remaining": 10,
          "player": "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
        },
        {
          "__typename": "Position",
          "vec": {
            "x": 10,
            "y": 10
          }
        }
      ]
    }
  }
}
```

#### Susbcription to events

A valuable approach for harnessing the power of GraphQL is by actively monitoring the events emitted throughout your game. This allows you to extract essential information such as key values, data, and transaction hashes. These events are customizable and can be filtered based on keys, much like `entities query`, and they seamlessly support pagination. In the subsequent example, we will demonstrate how to listen for any event emitted within your program.

```graphql
subscription {
  eventEmitted {
    id
    keys
    data
    transactionHash
  }
}
```

If you execute this suscription after you applied `sozo execute <ACTION_CONTRACT_ADDRESS> spawn` in your [`hello-dojo`](/cairo/hello-dojo.md) example. You will get an output similar to this.

```json
{
  "data": {
    "eventEmitted": {
      "id": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0000",
      "keys": [
        "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"
      ],
      "data": [
        "0x4d6f766573",
        "0x1",
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
        "0x0",
        "0x2",
        "0x64",
        "0x0"
      ],
      "transactionHash": "0x3b7b034a087355c996abb52e363932c1135f8dd49587bc9a05902d3cf0650b"
    }
  }
}
-----------------------------------------------------------------------------------------------
{
  "data": {
    "eventEmitted": {
      "id": "0x000000000000000000000000000000000000000000000000000000000000000b:0x0000:0x0001",
      "keys": [
        "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"
      ],
      "data": [
        "0x506f736974696f6e",
        "0x1",
        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973",
        "0x0",
        "0x2",
        "0xa",
        "0xa"
      ],
      "transactionHash": "0x3b7b034a087355c996abb52e363932c1135f8dd49587bc9a05902d3cf0650b"
    }
  }
}
```
