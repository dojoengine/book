/
├── index.mdx (Enhanced homepage with clear learning paths)
├── what-is-dojo.mdx (High-level conceptual introduction)
├── why-dojo.mdx (Value proposition and use cases)
├── installation.mdx (Quick setup guide)
└── glossary.mdx (Key terms and concepts)

/concepts/
├── index.mdx (Overview of core concepts)
├── onchain-games.mdx (Introduction to fully onchain games)
├── entity-component-system.mdx (ECS fundamentals)
├── provable-applications.mdx (ZK and provability concepts)
├── cairo-primer.mdx (Cairo basics for Dojo)
└── autonomous-worlds.mdx (Moved from theory/)

/getting-started/
├── index.mdx (Learning path overview)
├── your-first-dojo-app.mdx (Complete beginner tutorial)
├── understanding-the-toolchain.mdx (Toolchain overview)
├── development-workflow.mdx (Typical dev process)
└── next-steps.mdx (Progression guidance)

/tutorials/
├── index.mdx (Tutorial catalog with difficulty levels)
├── beginner/
│   ├── dojo-starter.mdx (Enhanced version)
│   ├── simple-game.mdx (Basic game mechanics)
│   └── first-deployment.mdx (Local to testnet)
├── intermediate/
│   ├── multiplayer-game.mdx (State synchronization)
│   ├── complex-systems.mdx (Advanced ECS patterns)
│   └── client-integration.mdx (Frontend integration)
├── advanced/
│   ├── custom-indexer.mdx (Torii customization)
│   ├── scaling-strategies.mdx (Performance optimization)
│   └── production-deployment.mdx (Mainnet deployment)
└── specialized/
    ├── nft-integration.mdx
    ├── defi-mechanics.mdx
    └── cross-chain.mdx

/framework/
├── index.mdx
├── world/
│   ├── index.md (World contract overview)
│   ├── api.md (World API reference)
│   ├── systems.md (System implementation patterns)
│   ├── events.md (Event handling and custom events)
│   └── metadata.md (World and resource metadata)
├── models/
│   ├── index.md (Data modeling fundamentals)
│   ├── entities.md (Entity management)
│   ├── enum.md (Enum usage in models)
│   ├── introspect.md (Introspection system)
│   └── upgrades.md (Model upgrade patterns)
├── authorization/
│   └── index.mdx (Access control and permissions)
├── testing/
│   ├── index.md (Testing strategies and setup)
│   └── cheat-codes.md (Testing utilities and cheat codes)
├── configuration/
│   └── index.md (Dojo configuration and profiles)
└── dojo-1x.mdx

/toolchain/
├── index.mdx (Toolchain ecosystem overview)
├── katana/
│   ├── index.mdx (Sequencer concepts & architecture)
│   ├── getting-started.mdx (Basic usage patterns)
│   ├── configuration/
│   │   ├── genesis.mdx
│   │   ├── mining.mdx
│   │   └── config-file.mdx
│   ├── advanced/
│   │   ├── forking.mdx
│   │   ├── messaging.mdx
│   │   └── execution-engine.mdx
│   └── reference/
│       ├── cli-commands.mdx
│       ├── rpc-api.mdx
│       └── troubleshooting.mdx
├── torii/
│   ├── index.mdx (Indexer concepts & architecture)
│   ├── getting-started.mdx (Basic setup)
│   ├── querying/
│   │   ├── graphql.mdx
│   │   ├── grpc.mdx
│   │   └── sql.mdx
│   ├── configuration/
│   │   ├── config-file.mdx
│   │   └── customization.mdx
│   └── reference/
│       ├── api-reference.mdx
│       └── performance.mdx
├── sozo/
│   ├── index.mdx (CLI concepts & workflow)
│   ├── getting-started.mdx (Basic commands)
│   ├── project-management/
│   │   ├── initialization.mdx
│   │   ├── building.mdx
│   │   └── testing.mdx
│   ├── deployment/
│   │   ├── local.mdx
│   │   ├── testnet.mdx
│   │   └── mainnet.mdx
│   ├── world-interaction/
│   │   ├── executing.mdx
│   │   ├── querying.mdx
│   │   └── authorization.mdx
│   └── reference/
│       ├── command-reference.mdx
│       ├── configuration.mdx
│       └── common-options.mdx
├── saya/
│   ├── index.mdx (Proving concepts & architecture)
│   ├── modes/
│   │   ├── sovereign.mdx
│   │   └── persistent.mdx
│   └── integrations/
│       ├── herodotus.mdx
│       └── slot.mdx
└── slot/
    ├── index.mdx (Deployment platform overview)
    ├── getting-started.mdx
    └── reference/
        └── commands.mdx

/client/
├── index.mdx (Client architecture overview)
├── concepts/
│   ├── state-synchronization.mdx
│   ├── real-time-updates.mdx
│   └── authentication.mdx
├── javascript/
│   ├── index.mdx (dojo.js overview)
│   ├── getting-started.mdx
│   ├── guides/
│   │   ├── querying-entities.mdx
│   │   ├── executing-systems.mdx
│   │   └── handling-events.mdx
│   └── reference/
│       ├── api.mdx
│       └── examples.mdx
├── unity/
│   ├── index.mdx (Unity integration overview)
│   ├── getting-started.mdx
│   ├── concepts.mdx
│   ├── guides/
│   │   ├── world-synchronization.mdx
│   │   └── ui-integration.mdx
│   ├── examples/
│   └── troubleshooting.mdx
├── unreal/
│   ├── index.mdx
│   ├── getting-started.mdx
│   ├── guides/
│   └── reference.mdx
├── other-engines/
│   ├── godot.mdx
│   ├── bevy.mdx
│   └── custom-integration.mdx
└── platforms/
    ├── telegram.mdx
    ├── discord.mdx
    └── web.mdx

/scaling/
├── index.mdx (Scaling overview & strategies)
├── layer-2-solutions/
│   ├── execution-sharding.mdx
│   └── sovereign-rollups.mdx
├── optimization/
│   ├── gas-optimization.mdx
│   ├── state-management.mdx
│   └── query-optimization.mdx
└── infrastructure/
    ├── indexer-scaling.mdx
    └── multi-world-patterns.mdx

/ecosystem/
├── index.mdx (Ecosystem overview)
├── libraries/
│   ├── origami.mdx (Enhanced)
│   ├── alexandria.mdx (Enhanced)
│   └── community-libraries.mdx
├── integrations/
│   ├── wallet-providers.mdx
│   ├── infrastructure-partners.mdx
│   └── analytics-tools.mdx
└── showcase/
    ├── games.mdx (Built with Dojo)
    ├── applications.mdx
    └── case-studies.mdx

/reference/
├── index.mdx (Reference overview)
├── cairo-api/
│   ├── world-interface.mdx
│   ├── model-macros.mdx
│   ├── system-macros.mdx
│   └── built-in-functions.mdx
├── cli-reference/
│   ├── sozo.mdx (Complete command reference)
│   ├── katana.mdx
│   └── torii.mdx
├── rpc-api/
│   ├── starknet-rpc.mdx
│   ├── katana-rpc.mdx
│   └── torii-rpc.mdx
├── configuration/
│   ├── dojo-toml.mdx
│   ├── katana-config.mdx
│   └── torii-config.mdx
└── error-codes/
    ├── compilation-errors.mdx
    ├── runtime-errors.mdx
    └── deployment-errors.mdx

/how-to/
├── index.mdx (Guide catalog)
├── development/
│   ├── debug-failing-tests.mdx
│   ├── optimize-gas-usage.mdx
│   ├── handle-large-state.mdx
│   └── implement-custom-authorization.mdx
├── deployment/
│   ├── deploy-to-mainnet.mdx
│   ├── verify-contracts.mdx
│   ├── migrate-between-versions.mdx
│   └── set-up-monitoring.mdx
├── integration/
│   ├── connect-existing-frontend.mdx
│   ├── integrate-external-apis.mdx
│   └── implement-custom-indexing.mdx
└── troubleshooting/
    ├── common-issues.mdx
    ├── performance-problems.mdx
    └── deployment-failures.mdx

/community/
├── index.mdx (Community overview)
├── contributing/
│   ├── code-contributions.mdx
│   ├── documentation.mdx
│   └── bug-reports.mdx
├── resources/
│   ├── blog.mdx (Link to external blog)
│   ├── videos.mdx
│   └── external-tutorials.mdx
└── support/
    ├── faq.mdx (Enhanced)
    ├── discord.mdx
    └── office-hours.mdx
