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

Predefined queries like `entities` provide a generic entry point to the entities data of the world. Custom queries on the other hand are built according to the models of the world. Each model has a correpsonding `{model_name}Models` query and retrieves the associated model data. For example: `positionModels`.

The benefit of custom queries becomes apparent when filtering and sorting is needed. They allow much more finer control of the returned dataset.

### Query operation

In [`hello-dojo`](../../cairo/hello-dojo.md#indexing) we fetched some data from all the registered models. This time let's fetch only `id`, `name`, `classHash` fields from `Position` model. To accomplish this, you have to pass the `id` of the model as an argument to the query operation. The id is generated as the selector from the model's names. This selector is computed by applying the `sn_keccak` hash function to the string representation of the function name. To obtain this value, you can utilize the [stark-utils](https://www.stark-utils.xyz/). Alternatively, you may opt to use the `starkli` command line tool.

```graphql
query {
  model(
    id: "0x28b9aeb6b19af1454b16ce28c1ee6909e3946e4552ed09886a06ebe1e158fc"
  ) {
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
      "id": "0x28b9aeb6b19af1454b16ce28c1ee6909e3946e4552ed09886a06ebe1e158fc",
      "name": "Position",
      "classHash": "0x2e9c42b868b520d54bff1b7f4c9b91f39bb2e2ad1c39d6484fb5d8a95382e01"
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
            "player": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "remaining": 100,
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
query {
  transactions {
    edges {
      node {
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

If you execute this query after you applied `sozo migrate` in your [`hello-dojo`](/cairo/hello-dojo.md) example. You will get an output similar to this.

```json
{
  "data": {
    "transactions": {
      "edges": [
        {
          "node": {
            "id": "0x0000000000000000000000000000000000000000000000000000000000000a:0x4b26441ad51e51517c45c703579bd41e99401815d5dd12eadb7b1ef65242f2a",
            "transactionHash": "0x4b26441ad51e51517c45c703579bd41e99401815d5dd12eadb7b1ef65242f2a",
            "senderAddress": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "calldata": [
              "0x1",
              "0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3",
              "0x217c73ea9ef26581623f20edd45571c1d024612b70d0af3e0842c5b0dc253cd",
              "0x0"
            ]
          }
        },
        {
          "node": {
            "id": "0x00000000000000000000000000000000000000000000000000000000000009:0x5e0ffaf422fed0753ab479c6236bf2e5b1a4206830f19073c68ea46daca918f",
            "transactionHash": "0x5e0ffaf422fed0753ab479c6236bf2e5b1a4206830f19073c68ea46daca918f",
            "senderAddress": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "calldata": [
              "0x4",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x3f253dbf9dbb8599c8500e1a9eebeaef9c64c07e566c29fbaafec4dccca3a1a",
              "0x5",
              "0x0",
              "0x3",
              "0x697066733a2f2f516d646a4d555466616f6d43776d6a6765413962514d3746",
              "0x74637838413975664b345972564b44514339486a424d2f",
              "0x0",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x3f253dbf9dbb8599c8500e1a9eebeaef9c64c07e566c29fbaafec4dccca3a1a",
              "0x5",
              "0x23a5929b01fe8ac7a5c4ac078445d94c81ecdc23ae2c5c8555b3a4e0280964a",
              "0x3",
              "0x697066733a2f2f516d646b364532506f54794c6d514a666e5a647732656f69",
              "0x354b31644d567561447763645675734a4765356f74672f",
              "0x0",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x3f253dbf9dbb8599c8500e1a9eebeaef9c64c07e566c29fbaafec4dccca3a1a",
              "0x5",
              "0x19a4478427ad87dac878352f7b5c33354395e17e7041e759f9581174962fe72",
              "0x3",
              "0x697066733a2f2f516d527934437067784b5247686d62647a6466664e77746a",
              "0x69646e6b6a63444d39487571565263617a7669735a6f2f",
              "0x0",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x3f253dbf9dbb8599c8500e1a9eebeaef9c64c07e566c29fbaafec4dccca3a1a",
              "0x5",
              "0x7ec42d76c6d876b8f219c20b6a152fe35fe2afc62c471b29ba689c2f6a075b3",
              "0x3",
              "0x697066733a2f2f516d5977674258754e736a79477876635236546e4d57676f",
              "0x763845354248457835756b6e414175666e32763954792f",
              "0x0"
            ]
          }
        },
        {
          "node": {
            "id": "0x00000000000000000000000000000000000000000000000000000000000008:0x381f944a6fa5d5fe756574fad1d1d44a5f5b612adef2dbc6c2773ebd123fa8e",
            "transactionHash": "0x381f944a6fa5d5fe756574fad1d1d44a5f5b612adef2dbc6c2773ebd123fa8e",
            "senderAddress": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "calldata": [
              "0x1",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x2730079d734ee55315f4f141eaed376bddd8c2133523d223a344c5604e0f7f8",
              "0x2",
              "0x7cf8d2b741abd5436f3cda5e7e3d3948462c9caa256311dd352cee5be4f5b23",
              "0x7d17f102164e9f0dc5450b33b19e2a52d17665ddb089b8dc40d3552d36bfaf2"
            ]
          }
        },
        {
          "node": {
            "id": "0x00000000000000000000000000000000000000000000000000000000000006:0x5d4c0d1184853a6162a3cc94f06e4e1115d23f0245f50f821d556145ab9b39d",
            "transactionHash": "0x5d4c0d1184853a6162a3cc94f06e4e1115d23f0245f50f821d556145ab9b39d",
            "senderAddress": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "calldata": [
              "0x2",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x1e7875674bcb09daaf984cbf77264ac98120cb39e6d17522520defcdc347476",
              "0x1",
              "0x23c28dcfad6be01ca6509fdb35fd2bed6622238397613c60da5d387a43c38d0",
              "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
              "0x1e7875674bcb09daaf984cbf77264ac98120cb39e6d17522520defcdc347476",
              "0x1",
              "0x2e9c42b868b520d54bff1b7f4c9b91f39bb2e2ad1c39d6484fb5d8a95382e01"
            ]
          }
        },
        {
          "node": {
            "id": "0x00000000000000000000000000000000000000000000000000000000000003:0x7f1456c94b5cc20a043c7acb7e183a31b57b6de82699b062498189f8aae9d0b",
            "transactionHash": "0x7f1456c94b5cc20a043c7acb7e183a31b57b6de82699b062498189f8aae9d0b",
            "senderAddress": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
            "calldata": [
              "0x1",
              "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
              "0x1987cbd17808b9a23693d4de7e246a443cfe37e6e7fbaeabd7d7e6532b07c3d",
              "0x5",
              "0x799bc4e9da10bfb3dd88e6f223c9cfbf7745435cd14f5d69675ea448e578cd",
              "0x71131a3c2bf0edb426793dade03cf88da0639eb70e6e178d18aba022f913802",
              "0x0",
              "0x1",
              "0x679177a2cb757694ac4f326d01052ff0963eac0bc2a17116a2b87badcdf6f76"
            ]
          }
        }
      ],
      "totalCount": 5
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
  entities(first: 2) {
    totalCount
    edges {
      cursor
      node {
        id
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
        "node": {
            "id": "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666"
          }
      },
      {
        "cursor": "Y3Vyc29yX3R3bw==",
        "node": {
            "id": "0x2c2ed100c1bc7031693cfec277303497d64376b57108ef82ef3b76f6c4d96f6"
          }
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

In this example, our server provides a `entityUpdated` subscription, which should notify clients whenever an entity with id `0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666` is updated. On the same subscription we can get the model(components) values of the updated entity . A client can execute a subscription that looks like this:

```graphql
subscription {
  entityUpdated(
    id: "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666"
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
      "id": "0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666",
      "keys": [
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
      ],
      "eventId": "0x0000000000000000000000000000000000000000000000000000000000000f:0x1d37ab2448ecb69aa4beb36dd47f8e793d59c605d565ab88b527d8ef2a15a3:0x00",
      "createdAt": "2024-05-03T15:24:42Z",
      "updatedAt": "2024-05-03T15:24:42Z",
      "models": [
        {
          "__typename": "Position",
          "vec": {
            "x": 41,
            "y": 40
          }
        },
        {
          "__typename": "Moves",
          "remaining": 100,
          "player": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"
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
      "id": "0x00000000000000000000000000000000000000000000000000000000000011:0x140b59e6a4b707e33eb2634a7358892ade98cd374a67a44fcfb792928920e0:0x00",
      "keys": [
        "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"
      ],
      "data": [
        "0x4d6f766573",
        "0x1",
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
        "0x2",
        "0x64",
        "0x0"
      ],
      "transactionHash": "0x140b59e6a4b707e33eb2634a7358892ade98cd374a67a44fcfb792928920e0"
    }
  }
}
-----------------------------------------------------------------------------------------------
{
  "data": {
    "eventEmitted": {
      "id": "0x00000000000000000000000000000000000000000000000000000000000011:0x140b59e6a4b707e33eb2634a7358892ade98cd374a67a44fcfb792928920e0:0x01",
      "keys": [
        "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"
      ],
      "data": [
        "0x506f736974696f6e",
        "0x1",
        "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
        "0x2",
        "0x47",
        "0x46"
      ],
      "transactionHash": "0x140b59e6a4b707e33eb2634a7358892ade98cd374a67a44fcfb792928920e0"
    }
  }
}
```
