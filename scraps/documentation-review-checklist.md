# Dojo Documentation Review Checklist

This document provides a comprehensive, systematic framework for reviewing all components of the Dojo documentation. Each item represents a discrete reviewable unit that can be assigned to different reviewers or automated systems.

## 1. Critical Getting Started Flow

These components are essential for new users and should be reviewed with every release.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Installation Guide** | `/docs/pages/installation.mdx` | Accuracy, Currency, Platform Testing | Critical | Toolchain versions, OS compatibility | Every release |
| **Overview Introduction** | `/docs/pages/overview.mdx` | Clarity, Completeness, Accuracy | Critical | Framework concepts, toolchain overview | Every release |
| **Learning Path** | `/docs/pages/getting-started/index.mdx` | Flow, Progression, Links | Critical | All getting started components | Every release |
| **Your First Dojo App** | `/docs/pages/getting-started/your-first-dojo-app.mdx` | Code Examples, Step Verification | Critical | Installation, toolchain setup | Every release |
| **Understanding Toolchain** | `/docs/pages/getting-started/understanding-the-toolchain.mdx` | Accuracy, Completeness | Critical | Toolchain component docs | Every release |
| **Development Workflow** | `/docs/pages/getting-started/development-workflow.mdx` | Accuracy, Code Examples | High | Toolchain commands, best practices | Every release |
| **Next Steps** | `/docs/pages/getting-started/next-steps.mdx` | Link Verification, Relevance | High | Tutorial progression, advanced topics | Every release |

## 2. Core Framework Documentation

Foundation concepts that change with framework updates.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Framework Overview** | `/docs/pages/framework/index.mdx` | Accuracy, Completeness | Critical | ECS concepts, architecture | Every release |
| **World Overview** | `/docs/pages/framework/world/index.md` | API Accuracy, Examples | Critical | `src/framework/dojo` source | Every release |
| **World Permissions** | `/docs/pages/framework/world/permissions.md` | Code Examples, Security | Critical | Authorization system | Every release |
| **World Events** | `/docs/pages/framework/world/events.md` | API Accuracy, Examples | High | Event system implementation | Every release |
| **World Metadata** | `/docs/pages/framework/world/metadata.md` | API Accuracy, Examples | High | Metadata handling | Every release |
| **World API Reference** | `/docs/pages/framework/world/api.md` | API Accuracy, Completeness | Critical | Contract interfaces | Every release |
| **Models Overview** | `/docs/pages/framework/models/index.md` | Accuracy, Examples | Critical | Model system, ECS | Every release |
| **Models Entities** | `/docs/pages/framework/models/entities.md` | Code Examples, Accuracy | Critical | Entity definitions | Every release |
| **Models Enums** | `/docs/pages/framework/models/enums.md` | Code Examples, Accuracy | High | Enum usage patterns | Every release |
| **Models Introspection** | `/docs/pages/framework/models/introspection.md` | API Accuracy, Examples | High | Introspection system | Every release |
| **Models Upgrades** | `/docs/pages/framework/models/upgrades.md` | Migration Guide, Examples | High | Upgrade procedures | Every release |
| **Models API Reference** | `/docs/pages/framework/models/api.md` | API Accuracy, Completeness | Critical | Model interfaces | Every release |
| **Systems Overview** | `/docs/pages/framework/systems/index.md` | Accuracy, Examples | Critical | System implementation | Every release |
| **Configuration** | `/docs/pages/framework/configuration/index.md` | Accuracy, Examples | High | Config file formats | Every release |
| **Testing Overview** | `/docs/pages/framework/testing/index.md` | Accuracy, Examples | High | Testing framework | Every release |
| **Testing Cheat Codes** | `/docs/pages/framework/testing/cheat-codes.md` | API Accuracy, Examples | High | Test utilities | Every release |
| **Dojo 1.x Migration** | `/docs/pages/framework/dojo-1x.mdx` | Migration Guide, Accuracy | High | Version compatibility | Every major release |

## 3. Toolchain Documentation

Tools that frequently update with new features and CLI changes.

### Katana Documentation
| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Katana Overview** | `/docs/pages/toolchain/katana/index.md` | Accuracy, Examples | Critical | `src/toolchain/katana` source | Every release |
| **Katana CLI Reference** | `/docs/pages/toolchain/katana/cli/katana.md` | CLI Accuracy, Options | Critical | CLI implementation | Every release |
| **Katana DB Stats** | `/docs/pages/toolchain/katana/cli/db/stats.md` | CLI Accuracy, Examples | Medium | Database features | Every release |
| **Katana Completions** | `/docs/pages/toolchain/katana/cli/completions.md` | CLI Accuracy | Low | Shell completion | Every release |
| **Katana RPC Starknet** | `/docs/pages/toolchain/katana/rpc/starknet.md` | API Accuracy, Examples | Critical | RPC implementation | Every release |
| **Katana RPC Katana** | `/docs/pages/toolchain/katana/rpc/katana.md` | API Accuracy, Examples | Critical | Custom RPC methods | Every release |
| **Katana RPC Torii** | `/docs/pages/toolchain/katana/rpc/torii.md` | API Accuracy, Examples | High | Torii integration | Every release |
| **Katana RPC Dev** | `/docs/pages/toolchain/katana/rpc/dev.md` | API Accuracy, Examples | High | Development RPC | Every release |
| **Katana Mining** | `/docs/pages/toolchain/katana/mining.md` | Configuration, Examples | High | Mining implementation | Every release |
| **Katana Forking** | `/docs/pages/toolchain/katana/forking.md` | Configuration, Examples | High | Forking features | Every release |
| **Katana Genesis** | `/docs/pages/toolchain/katana/genesis.md` | Configuration, Examples | High | Genesis setup | Every release |
| **Katana Execution** | `/docs/pages/toolchain/katana/execution.md` | Technical Accuracy | High | Execution engine | Every release |
| **Katana Storage** | `/docs/pages/toolchain/katana/storage.md` | Configuration, Examples | High | Storage system | Every release |
| **Katana Transactions** | `/docs/pages/toolchain/katana/transactions.md` | Technical Accuracy | High | Transaction handling | Every release |
| **Katana Messaging** | `/docs/pages/toolchain/katana/messaging.md` | Configuration, Examples | High | L1/L2 messaging | Every release |
| **Katana Interact** | `/docs/pages/toolchain/katana/interact.md` | Examples, Accuracy | High | Usage patterns | Every release |
| **Katana Config File** | `/docs/pages/toolchain/katana/config_file.md` | Configuration, Examples | High | Config format | Every release |

### Torii Documentation
| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Torii Overview** | `/docs/pages/toolchain/torii/index.md` | Accuracy, Examples | Critical | `src/toolchain/torii` source | Every release |
| **Torii Reference** | `/docs/pages/toolchain/torii/cli.md` | CLI Accuracy, Options | Critical | CLI implementation | Every release |
| **Torii GraphQL** | `/docs/pages/toolchain/torii/graphql.md` | API Accuracy, Examples | Critical | GraphQL schema | Every release |
| **Torii gRPC** | `/docs/pages/toolchain/torii/grpc.md` | API Accuracy, Examples | High | gRPC implementation | Every release |
| **Torii Config File** | `/docs/pages/toolchain/torii/configuration.md` | Configuration, Examples | High | Config format | Every release |
| **Torii SQL** | `/docs/pages/toolchain/torii/sql.md` | Query Examples, Accuracy | High | SQL interface | Every release |

### Sozo Documentation
| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Sozo Overview** | `/docs/pages/toolchain/sozo/index.md` | Accuracy, Examples | Critical | `src/framework/dojo/crates/sozo` | Every release |
| **Sozo Calldata Format** | `/docs/pages/toolchain/sozo/calldata_format.md` | Format Accuracy, Examples | High | Calldata handling | Every release |
| **Sozo Init** | `/docs/pages/toolchain/sozo/project-commands/init.md` | CLI Accuracy, Examples | Critical | Project initialization | Every release |
| **Sozo Build** | `/docs/pages/toolchain/sozo/project-commands/build.md` | CLI Accuracy, Examples | Critical | Build system | Every release |
| **Sozo Test** | `/docs/pages/toolchain/sozo/project-commands/test.md` | CLI Accuracy, Examples | Critical | Test execution | Every release |
| **Sozo Migrate** | `/docs/pages/toolchain/sozo/project-commands/migrate.mdx` | CLI Accuracy, Examples | Critical | Migration process | Every release |
| **Sozo Execute** | `/docs/pages/toolchain/sozo/world-commands/execute.mdx` | CLI Accuracy, Examples | Critical | Command execution | Every release |
| **Sozo Auth** | `/docs/pages/toolchain/sozo/world-commands/auth.mdx` | CLI Accuracy, Security | Critical | Authorization commands | Every release |
| **Sozo Account** | `/docs/pages/toolchain/sozo/world-commands/account.mdx` | CLI Accuracy, Examples | High | Account management | Every release |

### Saya Documentation
| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Saya Overview** | `/docs/pages/toolchain/saya/index.md` | Accuracy, Examples | Critical | `src/toolchain/saya` source | Every release |
| **Saya Herodotus** | `/docs/pages/toolchain/saya/herodotus.md` | Integration, Examples | High | Herodotus integration | Every release |
| **Saya Persistent** | `/docs/pages/toolchain/saya/persistent.md` | Configuration, Examples | High | Persistent mode | Every release |
| **Saya Sovereign** | `/docs/pages/toolchain/saya/sovereign.md` | Configuration, Examples | High | Sovereign mode | Every release |
| **Saya Slot** | `/docs/pages/toolchain/saya/slot.md` | Integration, Examples | High | Slot integration | Every release |

### Slot Documentation
| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Slot Overview** | `/docs/pages/toolchain/slot/index.md` | Accuracy, Examples | High | Slot platform | Every release |
| **Slot Reference** | `/docs/pages/toolchain/slot/reference.md` | CLI Accuracy, Options | High | CLI implementation | Every release |
| **Slot Create** | `/docs/pages/toolchain/slot/deployment-commands/create.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |
| **Slot Delete** | `/docs/pages/toolchain/slot/deployment-commands/delete.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |
| **Slot Update** | `/docs/pages/toolchain/slot/deployment-commands/update.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |
| **Slot Describe** | `/docs/pages/toolchain/slot/deployment-commands/describe.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |
| **Slot List** | `/docs/pages/toolchain/slot/deployment-commands/list.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |
| **Slot Logs** | `/docs/pages/toolchain/slot/deployment-commands/logs.md` | CLI Accuracy, Examples | High | Deployment commands | Every release |

## 4. SDK and Client Documentation

Platform-specific integrations that need testing across different environments.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **SDK Overview** | `/docs/pages/client/sdk/index.mdx` | Accuracy, Completeness | Critical | All SDK implementations | Every release |
| **JavaScript SDK Overview** | `/docs/pages/client/sdk/javascript/index.mdx` | Accuracy, Examples | Critical | `src/sdks/dojo.js` source | Every release |
| **JavaScript Getting Started** | `/docs/pages/client/sdk/javascript/get-started.mdx` | Step Verification, Examples | Critical | JavaScript SDK setup | Every release |
| **JavaScript Overview** | `/docs/pages/client/sdk/javascript/overview.mdx` | API Accuracy, Examples | Critical | JavaScript SDK features | Every release |
| **JavaScript Query Entities** | `/docs/pages/client/sdk/javascript/query-your-entities.mdx` | Code Examples, API Accuracy | Critical | Query system | Every release |
| **JavaScript Tokens** | `/docs/pages/client/sdk/javascript/tokens.mdx` | Code Examples, API Accuracy | High | Token handling | Every release |
| **Unity SDK Overview** | `/docs/pages/client/sdk/unity/index.md` | Accuracy, Examples | High | `src/sdks/dojo.unity` source | Every release |
| **Unity Getting Started** | `/docs/pages/client/sdk/unity/get-started.md` | Step Verification, Examples | High | Unity SDK setup | Every release |
| **Unity Concepts** | `/docs/pages/client/sdk/unity/important-concepts.md` | Accuracy, Examples | High | Unity integration | Every release |
| **Unity Common Problems** | `/docs/pages/client/sdk/unity/common-problems.md` | Troubleshooting, Solutions | High | Unity issues | Every release |
| **Unity Example** | `/docs/pages/client/sdk/unity/example.md` | Code Examples, Testing | High | Unity sample code | Every release |
| **Unreal SDK Overview** | `/docs/pages/client/sdk/unrealengine/index.md` | Accuracy, Examples | High | `src/sdks/dojo.unreal` source | Every release |
| **Unreal Reference** | `/docs/pages/client/sdk/unrealengine/reference.md` | API Accuracy, Examples | High | Unreal integration | Every release |
| **Unreal Example** | `/docs/pages/client/sdk/unrealengine/example.md` | Code Examples, Testing | High | Unreal sample code | Every release |
| **C SDK** | `/docs/pages/client/sdk/c.mdx` | API Accuracy, Examples | Medium | `src/sdks/dojo.c` source | Every release |
| **Godot SDK** | `/docs/pages/client/sdk/godot.mdx` | API Accuracy, Examples | Medium | Godot integration | Every release |
| **Rust SDK** | `/docs/pages/client/sdk/rust.mdx` | API Accuracy, Examples | Medium | Rust integration | Every release |
| **Rust SDK Example** | `/docs/pages/client/sdk/rust/example.mdx` | Code Examples, Testing | Medium | Rust sample code | Every release |
| **Telegram SDK** | `/docs/pages/client/sdk/telegram.mdx` | API Accuracy, Examples | Low | Telegram integration | Every release |
| **Discord SDK** | `/docs/pages/client/sdk/discord.mdx` | API Accuracy, Examples | Low | Discord integration | Every release |

## 5. Tutorial Content

Step-by-step guides that require end-to-end testing.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Tutorial Overview** | `/docs/pages/tutorials/index.mdx` | Navigation, Progression | High | All tutorials | Every release |
| **Dojo 101 Tutorial** | `/docs/pages/tutorials/dojo-starter.mdx` | Step Verification, Code Testing | Critical | Basic setup, framework | Every release |
| **Deploy to Mainnet** | `/docs/pages/tutorials/deploy-to-mainnet/main.md` | Step Verification, Accuracy | High | Deployment process | Every release |
| **Deploy using Slot** | `/docs/pages/tutorials/deploy-using-slot/main.md` | Step Verification, Accuracy | High | Slot deployment | Every release |
| **React Tutorial** | `/docs/pages/tutorials/react.mdx` | Code Examples, Testing | High | React integration | Every release |
| **Dojo React Tutorial** | `/docs/pages/tutorials/dojo-react.mdx` | Code Examples, Testing | High | React Dojo integration | Every release |
| **Advanced Tutorial** | `/docs/pages/tutorials/advanced.mdx` | Code Examples, Accuracy | Medium | Advanced concepts | Every release |
| **Katana Starkli Scarb** | `/docs/pages/tutorials/katana-starkli-scarb/main.md` | Tool Integration, Examples | Medium | Tool compatibility | Every release |
| **Onchain Chess Setup** | `/docs/pages/tutorials/onchain-chess/0-setup.md` | Step Verification, Examples | Medium | Chess tutorial progression | Every release |
| **Onchain Chess Action** | `/docs/pages/tutorials/onchain-chess/1-action.md` | Code Examples, Testing | Medium | Chess game logic | Every release |
| **Onchain Chess Move** | `/docs/pages/tutorials/onchain-chess/2-move.md` | Code Examples, Testing | Medium | Chess move implementation | Every release |
| **Onchain Chess Test** | `/docs/pages/tutorials/onchain-chess/3-test.md` | Testing Examples, Accuracy | Medium | Chess testing | Every release |

## 6. Library Documentation

Ecosystem libraries that have their own release cycles.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Origami Library** | `/docs/pages/libraries/origami/index.mdx` | API Accuracy, Examples | High | `src/libraries/origami` source | Every Origami release |
| **Alexandria Library** | `/docs/pages/libraries/alexandria/index.mdx` | API Accuracy, Examples | High | Alexandria library | Every Alexandria release |

## 7. Architecture and Scaling

Technical deep-dives that change with architectural decisions.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Execution Sharding** | `/docs/pages/architecture/execution-sharding.md` | Technical Accuracy, Examples | Medium | Scaling architecture | Every major release |
| **Sovereign Rollups** | `/docs/pages/architecture/sovereign-rollups.md` | Technical Accuracy, Examples | Medium | Rollup architecture | Every major release |

## 8. Supporting Content

Community and reference materials.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **FAQ** | `/docs/pages/faq.md` | Accuracy, Completeness | High | Common issues, solutions | Monthly |
| **Theory: Autonomous Worlds** | `/docs/pages/theory/autonomous-worlds.md` | Accuracy, Relevance | Medium | Theoretical concepts | Quarterly |
| **Community Getting Started** | `/docs/pages/community/get-started.md` | Link Verification, Accuracy | Medium | Community resources | Monthly |
| **Contributors Guide** | `/docs/pages/misc/contributors.md` | Process Accuracy, Links | Medium | Contribution process | Monthly |
| **Blog Index** | `/docs/pages/blog/index.mdx` | Navigation, Links | Low | Blog content | Monthly |
| **Provable Games Blog** | `/docs/pages/blog/provable-games.mdx` | Content Accuracy, Links | Low | Blog content | As needed |

## 9. Navigation and Cross-References

Structural components that affect user experience.

| Component | Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|----------|-------------|----------|--------------|------------------|
| **Navigation Routes** | `/routes.ts` | Link Verification, Structure | Critical | All documentation pages | Every release |
| **Homepage** | `/docs/pages/index.mdx` | Accuracy, Navigation | Critical | Overview content | Every release |
| **Internal Links** | All pages | Link Verification, Accuracy | High | Page structure | Every release |
| **Code Examples** | All pages | Syntax, Testing, Accuracy | Critical | Source code | Every release |
| **Images and Assets** | `/docs/public/` | Relevance, Accuracy | Medium | Visual content | Quarterly |

## 10. Source Code Synchronization

Components that must stay synchronized with source code changes.

| Component | Source Location | Review Type | Priority | Dependencies | Review Frequency |
|-----------|-----------------|-------------|----------|--------------|------------------|
| **Framework Source** | `/src/framework/dojo/` | API Changes, Breaking Changes | Critical | Framework documentation | Every commit |
| **Toolchain Source** | `/src/toolchain/` | CLI Changes, API Changes | Critical | Toolchain documentation | Every commit |
| **SDK Source** | `/src/sdks/` | API Changes, Examples | Critical | SDK documentation | Every commit |
| **Example Games** | `/src/games/` | Code Examples, Patterns | High | Tutorial content | Every release |
| **Starter Templates** | `/src/starters/` | Setup Instructions, Examples | High | Getting started guides | Every release |
| **Library Source** | `/src/libraries/` | API Changes, Examples | High | Library documentation | Every library release |

## Review Process Guidelines

### 1. **Critical Path Reviews** (Every Release)
- All Critical priority items must be reviewed before release
- Focus on user-facing changes and breaking changes
- Verify all code examples compile and run
- Test all step-by-step instructions end-to-end

### 2. **High Priority Reviews** (Every Release)
- Review High priority items for accuracy and completeness
- Update examples to match current best practices
- Verify CLI commands and API references

### 3. **Medium Priority Reviews** (Monthly/Quarterly)
- Review Medium priority items for continued relevance
- Update screenshots and visual content
- Check for outdated information

### 4. **Low Priority Reviews** (As Needed)
- Review Low priority items when specifically changed
- Update community links and resources
- Refresh blog content and news

### 5. **Automated Checks**
- Link verification across all documentation
- Code example compilation and testing
- Spelling and grammar checking
- Broken image detection

### 6. **Source Code Synchronization**
- Monitor git submodules for changes
- Automated alerts for API changes
- Regular sync with development branches
- Breaking change impact assessment

## Tools and Automation

### Recommended Review Tools
- **Link Checker**: Automated link verification
- **Code Tester**: Automated code example testing
- **Spell Checker**: Grammar and spelling verification
- **Image Optimizer**: Asset optimization and validation
- **Git Hooks**: Pre-commit documentation validation

### Review Assignment Matrix
- **Technical Writers**: Content accuracy, clarity, style
- **Engineers**: Code examples, API accuracy, technical concepts
- **DevRel**: User experience, tutorial flow, beginner-friendliness
- **Community**: FAQ updates, common issues, user feedback

This checklist ensures comprehensive coverage of all documentation components while providing a structured approach to maintaining accuracy and currency across the entire Dojo documentation ecosystem.
