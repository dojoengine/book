---
title: "Dojo Rust SDK"
description: "Native Rust integration for building Dojo applications with Rust"
---

# Dojo Rust SDK

Dojo is built in Rust, making it seamless to integrate into your Rust projects.
Simply import the required crates and you're ready to build powerful applications that interact with Dojo worlds.

## Core Components

The Dojo Rust ecosystem provides several key crates for different use cases:

- **`dojo-types`**: Core types and data structures for Dojo
- **`dojo-world`**: World contract interaction and management
- **`torii-client`**: Client for connecting to Torii indexer
- **`torii-grpc`**: gRPC client for real-time data streaming
- **`torii-relay`**: P2P networking and relay functionality
- **`cainome`**: Contract bindings generation for Cairo contracts

## Getting Started

Add these dependencies to your `Cargo.toml`:

```toml
[dependencies]
# Core Dojo types and functionality
dojo-types = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0-alpha.0" }
dojo-world = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0-alpha.0" }

# Torii client for indexing and real-time data (separate repository since 1.5.0)
torii-client = { git = "https://github.com/dojoengine/torii", tag = "v1.6.1-preview.2" }
torii-grpc-client = { git = "https://github.com/dojoengine/torii", tag = "v1.6.1-preview.2" }

# Contract bindings generation
cainome = { git = "https://github.com/cartridge-gg/cainome", rev = "7d60de1", features = ["abigen-rs"] }
cainome-cairo-serde = { git = "https://github.com/cartridge-gg/cainome", rev = "7d60de1" }

# Starknet integration
starknet = "0.17.0-rc.2"
starknet-crypto = "0.7.4"
starknet-types-core = "0.1.7"

# Async runtime
tokio = { version = "1.39", features = ["full"] }
```

## Basic Usage

### Connecting to a Dojo World

```rust
// Import necessary types for connecting to Dojo
use torii_client::client::Client;
use starknet_crypto::Felt;

// The #[tokio::main] attribute makes this function run in an async runtime
// This is required because we'll be making network calls
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Configure connection URLs for your Dojo world
    let torii_url = "http://localhost:8080".to_string();  // Torii indexer endpoint
    let rpc_url = "http://localhost:5050".to_string();    // Starknet RPC endpoint (Katana)
    let relay_url = "http://localhost:9090".to_string();  // P2P relay for real-time updates

    // The world address is a unique identifier for your Dojo world on Starknet
    let world_address = Felt::from_hex_unchecked("0x123...");

    // Create a new Torii client connection
    let client = Client::new(
        torii_url,
        rpc_url,
        relay_url,
        world_address,
    ).await?;

    // At this point, you have a connected client ready to interact with your Dojo world
    // You can now query models, subscribe to events, etc.

    Ok(())
}
```

### Subscribing to Events

```rust
// Import types needed for event subscriptions and stream processing
use torii_grpc_client::client::{EntityKeysClause, KeysClause, PatternMatching};
use futures::StreamExt; // Provides the .next() method on streams

// Subscribe to all entity updates in the Dojo world
// The `mut` keyword makes the subscription mutable so we can read from it
let mut subscription = client
    .on_event_message_updated(
        // Create a filter for which entities/models to watch
        vec![EntityKeysClause::Keys(KeysClause {
            keys: vec![],                                    // Empty = watch all entities
            pattern_matching: PatternMatching::VariableLen,  // Allow flexible key matching
            models: vec![],                                  // Empty = watch all models
        })],
        true, // Include historical data (events that happened before we subscribed)
    )
    .await?; // Wait for the subscription to be established

// Process incoming updates in a loop
// This will run continuously, waiting for new events
while let Some(Ok((_, entity))) = subscription.next().await {
    // The `Some(Ok(...))` pattern handles the Result<Option<...>> type:
    // - Some(...) means we got data (not the end of stream)
    // - Ok(...) means no error occurred
    // - The (_, entity) destructures the tuple, ignoring the first value

    println!("Entity updated: {:?}", entity);

    // Here you can add your custom logic to handle the entity update
    // For example: update a database, trigger game logic, send notifications, etc.
}
```

## Discord Bot Example

This example demonstrates how to build a Discord bot that connects to a Dojo World using the Rust SDK.
The bot monitors world events and posts updates to a Discord channel.
This example uses the Shuttle runtime for easy deployment.

You will need a Discord bot token to use this example.
You can get one by creating an application and bot in the [Discord Developer Portal](https://discord.com/developers/applications).

### Prerequisites

- Download and install the Rust compiler from [rust-lang.org](https://rustup.rs/)
- Set up a new Rust project: `cargo new dojo-discord-bot`
- Install the Shuttle CLI: [Shuttle Installation Guide](https://docs.shuttle.rs/getting-started/installation)
- Create a Discord application and bot in the Discord Developer Portal

### Setup

Create a `Secrets.toml` file in the root of your project:

```toml
DISCORD_TOKEN = "your_discord_token_here"
TORII_URL = "http://localhost:8080"
NODE_URL = "http://localhost:5050"
TORII_RELAY_URL = "http://localhost:9090"
WORLD_ADDRESS = "your_world_address_here"
CHANNEL_ID = "your_discord_channel_id_here"
```

Add these dependencies to your `Cargo.toml`:

```toml
[dependencies]
# Discord bot framework
poise = "0.6.1"
serenity = { version = "0.12.0", default-features = false, features = ["client", "gateway", "rustls_backend", "model"] }

# Utility dependencies
toml = { version = "0.7", default-features = false, features = ["parse", "display"] }

# Shuttle deployment platform
shuttle-runtime = "0.48.0"
shuttle-serenity = "0.48.0"
shuttle-rocket = "0.48.0"

# Dojo components
dojo-types = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0-alpha.0" }
dojo-world = { git = "https://github.com/dojoengine/dojo", tag = "v1.7.0-alpha.0" }

# Torii components
torii-client = { git = "https://github.com/dojoengine/torii", tag = "v1.6.1-preview.2" }
torii-grpc-client = { git = "https://github.com/dojoengine/torii", tag = "v1.6.1-preview.2" }
torii-relay = { git = "https://github.com/dojoengine/torii", tag = "v1.6.1-preview.2" }

# Contract bindings and Cairo tooling
cainome = { git = "https://github.com/cartridge-gg/cainome", rev = "7d60de1", features = ["abigen-rs"] }
cainome-cairo-serde = { git = "https://github.com/cartridge-gg/cainome", rev = "7d60de1" }
cairo-lang-filesystem = "=2.8.4"
scarb = { git = "https://github.com/software-mansion/scarb", rev = "4fdeb7810" }

# Starknet integration
starknet = "0.17.0-rc.2"
starknet-crypto = "0.7.4"
starknet-types-core = "0.1.7"

# Async runtime
tokio = { version = "1.39", features = ["full"] }
```

### Code

````rust
// Standard library imports
use std::{num::NonZero, sync::Arc, time::Duration};

// Discord library imports - Serenity is the main Discord API wrapper for Rust
use serenity::{
    all::{ChannelId, CreateMessage, GatewayIntents, Http}, // Discord API types
    futures::StreamExt,  // Stream processing utilities
    Client,              // Discord client
};
use shuttle_runtime::SecretStore; // For accessing environment variables securely
use starknet_crypto::Felt;        // Starknet field elements for addresses
use torii_grpc_client::client::{EntityKeysClause, KeysClause, PatternMatching}; // Dojo event filtering

// Type aliases to make error handling cleaner
// Box<dyn std::error::Error + Send + Sync> is Rust's way of saying "any error type"
pub type Error = Box<dyn std::error::Error + Send + Sync>;
// Context is the type passed to Discord command functions
pub type Context<'a> = poise::Context<'a, Data, Error>;

// Data structure to share state between Discord commands
// Currently empty, but you could add database connections, etc.
pub struct Data {}

// Discord slash command definition
#[poise::command(slash_command)]
pub async fn hello(ctx: Context<'_>) -> Result<(), Error> {
    // ctx.say() sends a message back to Discord in response to the command
    ctx.say("🤖 Hello! I'm your Dojo Discord Bot - monitoring world events and ready to help!").await?;
    Ok(())
}

#[poise::command(slash_command)]
pub async fn world_status(ctx: Context<'_>) -> Result<(), Error> {
    ctx.say("🌍 Connected to Dojo World! I'm watching for all the exciting things happening in your autonomous world.").await?;
    Ok(())
}

// Configuration structure to hold all the connection details
// This keeps our configuration organized and type-safe
struct Config {
    discord_token: String,        // Discord bot authentication token
    channel_id: NonZero<u64>,     // Discord channel ID (NonZero ensures it's never 0)
    torii_url: String,            // URL to connect to Torii indexer
    node_url: String,             // URL to connect to Starknet node (Katana)
    torii_relay_url: String,      // URL for P2P relay connection
    world_address: String,        // Hex string of the Dojo world address
}

// Implementation block for Config - this is where we define methods on the Config struct
impl Config {
    // Constructor method to create Config from Shuttle's secret store
    pub fn from_secrets(secret_store: SecretStore) -> Self {
        // Extract Discord bot token from environment variables
        let discord_token = secret_store.get("DISCORD_TOKEN").unwrap();

        // Parse channel ID from string to number
        // This chain: get string -> parse to u64 -> wrap in NonZero -> unwrap all results
        let channel_id = NonZero::new(
            secret_store
                .get("CHANNEL_ID")
                .unwrap()                    // Get the string value
                .parse::<u64>()              // Convert string to 64-bit unsigned integer
                .unwrap(),                   // Handle parsing errors by crashing
        )
        .unwrap();

        // Extract all the Dojo connection URLs
        let torii_url = secret_store.get("TORII_URL").unwrap();
        let node_url = secret_store.get("NODE_URL").unwrap();
        let torii_relay_url = secret_store.get("TORII_RELAY_URL").unwrap();
        let world_address = secret_store.get("WORLD_ADDRESS").unwrap();

        // Create and return a new Config instance
        // The `fieldname,` syntax is shorthand for `fieldname: fieldname,`
        Config {
            discord_token,
            channel_id,
            torii_url,
            node_url,
            torii_relay_url,
            world_address,
        }
    }
}

// This attribute tells Shuttle this is the main entry point for our application
#[shuttle_runtime::main]
async fn main(
    // This parameter injection gives us access to the SecretStore containing our environment variables
    #[shuttle_runtime::Secrets] secret_store: SecretStore,
) -> shuttle_serenity::ShuttleSerenity {
    // Set up Discord permissions - non_privileged() gives us basic bot permissions
    // You might need more permissions depending on what your bot does
    let intents = GatewayIntents::non_privileged();

    let config = Config::from_secrets(secret_store);

    // Set up the Discord command framework (Poise)
    // This handles parsing slash commands and routing them to our functions
    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            commands: vec![hello(), world_status()],
            ..Default::default()
        })
        .setup(|ctx, _ready, framework| {
            // This closure runs when the bot connects to Discord
            Box::pin(async move {
                // Register our commands globally so they appear in all servers
                poise::builtins::register_globally(ctx, &framework.options().commands).await?;

                Ok(Data {})
            })
        })
        .build();

    // Create the Discord client with our bot token and the command framework
    let client = Client::builder(config.discord_token.clone(), intents)
        .framework(framework)
        .await
        .expect("Failed to build Discord client");

    // Spawn a separate async task to handle Dojo world monitoring
    // This runs concurrently with the Discord bot
    // `move` captures the config by value so it can be used in the async block
    tokio::spawn(async move {
        // Create a connection to the Dojo world
        let torii_client = torii_client::client::Client::new(
            config.torii_url.clone(),
            config.node_url.clone(),
            config.torii_relay_url.clone(),
            Felt::from_hex_unchecked(&config.world_address.clone()),
        )
        .await
        .expect("Failed to create Torii client");

        // Start monitoring the Dojo world and sending updates to Discord
        subscribe(torii_client, config).await;
    });

    // Return the Discord client wrapped in Shuttle's expected type
    Ok(client.into())
}

// This function handles subscribing to Dojo world events and forwarding them to Discord
// It includes retry logic to handle network issues gracefully
async fn subscribe(client: torii_client::client::Client, config: Config) {
    let mut tries = 0;              // Current number of failed attempts
    let max_num_tries = 200;        // Maximum attempts before giving up

    // Exponential backoff for reconnection attempts
    let mut backoff = Duration::from_secs(1);
    let max_backoff = Duration::from_secs(60);

    // Create a Discord HTTP client for sending messages
    // Arc (Atomically Reference Counted) allows sharing this across async tasks safely
    let http = Arc::new(Http::new(&config.discord_token.clone()));

    // Main monitoring loop - this runs continuously
    loop {
        // Attempt to subscribe to world events
        let rcv: Result<
            torii_grpc_client::client::EntityUpdateStreaming, // Success type: stream of updates
            torii_client::client::error::Error,               // Error type
        > = client
            .on_event_message_updated(
                // Set up event filtering
                vec![EntityKeysClause::Keys(KeysClause {
                    keys: vec![],                                    // Empty = all entities
                    pattern_matching: PatternMatching::VariableLen,  // Flexible key matching
                    models: vec![],                                  // Empty = all models
                })],
                true, // Include historical events (backfill)
            )
            .await;

        // Handle the subscription result
        match rcv {
            // Successfully connected - process incoming events
            Ok(mut rcv) => {
                // Reset backoff delay since we connected successfully
                backoff = Duration::from_secs(1);

                // Process each event as it comes in
                while let Some(Ok((_, entity))) = rcv.next().await {
                    // Format the entity data as a Discord message
                    // {:#?} creates a pretty-printed debug representation
                    let entity_message = format!("🎮 **Dojo World Update!**\n```\n{:#?}\n```", entity);
                    let content = CreateMessage::new().content(entity_message);

                    // Send the message to Discord
                    // We use `if let Err(e)` to handle errors without crashing
                    if let Err(e) = ChannelId::from(config.channel_id)
                        .send_message(http.clone(), content)
                        .await
                    {
                        println!("Failed to send Discord message: {}", e);
                    }
                }
                // If we get here, the stream ended (connection lost)
            }
            // Failed to connect - we'll retry
            Err(_) => {
                println!("Subscription was lost, attempting to reconnect");
                tries += 1;
            }
        }

        // Wait before trying to reconnect (exponential backoff)
        tokio::time::sleep(backoff).await;
        backoff = std::cmp::min(backoff * 2, max_backoff);

        if tries >= max_num_tries {
            println!("Max number of tries reached, exiting");
            break;
        }
    }

    println!("Torii client disconnected");
}
````

### Deployment

#### Local Development

Run the bot locally for testing:

```bash
shuttle run
```

This will start the bot using your local `Secrets.toml` file.
The bot will connect to your specified Dojo world and Discord channel.

#### Production Deployment

Deploy the bot to Shuttle's cloud platform:

```bash
shuttle deploy
```

The bot will be hosted on Shuttle's infrastructure and run continuously.
Make sure your `Secrets.toml` contains production-ready values before deploying.

### Next Steps

This example demonstrates the basic integration between Dojo and Discord using Rust.
You can extend it by:

- Adding more Discord commands to interact with your world
- Filtering events by specific models or entities
- Formatting Discord messages with rich embeds
- Adding database persistence using Shuttle's shared database
- Implementing user authentication and authorization
- Adding custom event processing logic
