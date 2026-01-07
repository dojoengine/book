# Dojo Skills Overview

This document provides a complete overview of all 12 Dojo skills in the `book` plugin for Claude Code, replacing the functionality of the[ Sensei MCP server](https://github.com/dojoengine/sensei-mcp).

## Quickstart

Inside of a Claude Code session:

```
# Add the marketplace
/plugin marketplace add dojoengine/marketplace

# Install the plugin
/plugin install book@dojoengine
```

**Note:** Installing the plugin gives you all 12 skills. Claude Code doesn't support installing subsets or individual skills from a plugin.

Skills are automatically invoked based on your conversation context - use what you need, when you need it.

## Architecture

**12 focused skills**:
- Each skill handles ONE specific workflow
- Skills are self-contained with embedded knowledge
- Progressive disclosure: SKILL.md → detailed reference files

List of skills:

- `dojo-init`
- `dojo-model`
- `dojo-system`
- `dojo-test`
- `dojo-config`
- `dojo-review`
- `dojo-deploy`
- `dojo-migrate`
- `dojo-client`
- `dojo-world`
- `dojo-indexer`
- `dojo-token`

---

### 1. dojo-init
**Purpose:** Initialize new Dojo projects with proper structure

**Capabilities:**
- Interactive project setup
- Generate Scarb.toml with dependencies
- Create directory structure (src/models/, src/systems/, src/tests/)
- Set up configuration files (dojo_dev.toml, dojo_release.toml)
- Initialize git repository with .gitignore

**Trigger phrases:**
- "Create a new Dojo project"
- "Initialize a Dojo game"
- "Set up a new Dojo app"

**Files:**
- SKILL.md - Overview and project setup guide
- templates/Scarb.toml
- templates/dojo_dev.toml
- templates/dojo_release.toml
- templates/.gitignore
- templates/src/lib.cairo

**Replaces:** `dojo_101` (partial - project init only)

---

### 2. dojo-model
**Purpose:** Create and manage Dojo models (game state)

**Capabilities:**
- Generate model structs with proper traits
- Configure key fields (single and composite keys)
- Support entity, enum, and singleton patterns
- Generate model tests
- Provide model API guidance

**Trigger phrases:**
- "Add a model for..."
- "Create a Position model"
- "Generate a Player entity"

**Files:**
- SKILL.md - Model overview and quick start
- reference.md - Complete model guide (extracted from docs/pages/framework/models/)
- patterns.md - Common model patterns and examples
- templates/model.cairo.template
- templates/model_test.cairo.template

**Replaces:** `dojo_model`

---

### 3. dojo-system
**Purpose:** Create and manage Dojo systems (game logic)

**Capabilities:**
- Generate system contracts with interfaces
- Implement world access patterns
- Add model read/write operations
- Configure authorization checks
- Emit events
- Generate system tests

**Trigger phrases:**
- "Create a system for..."
- "Add a spawn system"
- "Implement move logic"

**Files:**
- SKILL.md - System overview and quick start
- reference.md - Complete system guide (extracted from docs/pages/framework/systems/)
- patterns.md - Common system patterns
- templates/system.cairo.template
- templates/system_test.cairo.template

**Replaces:** `dojo_logic`

---

### 4. dojo-test
**Purpose:** Write tests for Dojo models and systems

**Capabilities:**
- Generate test files with spawn_test_world setup
- Use cheat codes (warp, prank, etc.)
- Create unit and integration tests
- Add assertions and verifications
- Test model read/write operations

**Trigger phrases:**
- "Write tests for..."
- "Test the move system"
- "Add unit tests"

**Files:**
- SKILL.md - Testing overview
- cheatcodes.md - Complete cheat codes reference (extracted from docs/pages/framework/testing/)
- patterns.md - Testing patterns and examples
- templates/test.cairo.template

**Replaces:** `dojo_test`

---

### 5. dojo-config
**Purpose:** Manage Scarb and Dojo configuration

**Capabilities:**
- Configure Scarb.toml dependencies
- Set up Dojo profiles (dev, release)
- Manage world configuration
- Configure RPC endpoints
- Handle account settings

**Trigger phrases:**
- "Configure Dojo for..."
- "Update Scarb.toml"
- "Set up profiles"

**Files:**
- SKILL.md - Configuration overview
- scarb.md - Scarb.toml reference (extracted from docs/pages/framework/config/)
- profiles.md - Profile configuration
- world.md - World configuration

**Replaces:** `dojo_config`

---

### 6. dojo-review
**Purpose:** Review Dojo code for best practices and issues

**Capabilities:**
- Check model definitions against patterns
- Validate system implementations
- Verify test coverage
- Identify gas optimization opportunities
- Check for security issues

**Trigger phrases:**
- "Review my Dojo code"
- "Check this system"
- "Audit my models"

**Files:**
- SKILL.md - Code review overview
- checklist.md - Review checklist
- patterns.md - Best practices (extracted from docs/pages/framework/)
- antipatterns.md - Common mistakes to avoid

**New capability** (beyond Sensei MCP)

---

### 7. dojo-deploy
**Purpose:** Deploy Dojo worlds to networks

**Capabilities:**
- Start and configure Katana sequencer
- Deploy worlds to local/testnet/mainnet
- Generate migration manifests
- Handle world addresses
- Verify deployments

**Trigger phrases:**
- "Deploy my world"
- "Start Katana"
- "Deploy to Sepolia"

**Files:**
- SKILL.md - Deployment overview
- katana.md - Katana configuration (extracted from docs/pages/toolchain/katana/)
- sozo.md - Sozo deployment commands (extracted from docs/pages/toolchain/sozo/)
- networks.md - Network-specific guides

**New capability**

---

### 8. dojo-migrate
**Purpose:** Handle world migrations and upgrades

**Capabilities:**
- Analyze migration diffs
- Plan migration strategies
- Execute migrations
- Handle breaking changes
- Version upgrade guidance

**Trigger phrases:**
- "Migrate my world"
- "Upgrade Dojo version"
- "Handle breaking changes"

**Files:**
- SKILL.md - Migration overview
- workflow.md - Migration workflow
- upgrades.md - Version upgrade guides (extracted from docs/pages/framework/upgrading/)
- troubleshooting.md - Common migration issues

**New capability**

---

### 9. dojo-client
**Purpose:** Integrate Dojo with game clients and frontends

**Capabilities:**
- Set up JavaScript/TypeScript SDK
- Configure Unity integration
- Set up Unreal Engine plugin
- Configure Rust client
- Generate typed bindings
- Create connection code

**Trigger phrases:**
- "Set up JavaScript SDK"
- "Integrate with Unity"
- "Generate client bindings"

**Files:**
- SKILL.md - Client integration overview
- javascript.md - JavaScript SDK guide (extracted from docs/pages/client/sdk/javascript/)
- unity.md - Unity guide (extracted from docs/pages/client/sdk/unity/)
- unreal.md - Unreal guide (extracted from docs/pages/client/sdk/unreal/)
- rust.md - Rust guide
- templates/ - Client code templates

**New capability**

---

### 10. dojo-world
**Purpose:** Manage world permissions and configuration

**Capabilities:**
- Configure namespace permissions
- Set up resource registration
- Manage writer/owner permissions
- Handle role-based access
- Transfer ownership

**Trigger phrases:**
- "Configure world permissions"
- "Set up namespace"
- "Manage access control"

**Files:**
- SKILL.md - World management overview
- permissions.md - Permission system (extracted from docs/pages/framework/world/permissions.md)
- api.md - World API reference (extracted from docs/pages/framework/world/api.md)
- authorization.md - Authorization patterns (extracted from docs/pages/framework/authorization/)

**New capability**

---

### 11. dojo-indexer
**Purpose:** Set up and use Torii indexer

**Capabilities:**
- Configure Torii for world
- Create GraphQL queries
- Set up gRPC subscriptions
- Use SQL access patterns
- Handle custom indexing

**Trigger phrases:**
- "Set up Torii"
- "Configure indexer"
- "Create GraphQL queries"

**Files:**
- SKILL.md - Torii overview
- setup.md - Torii setup guide (extracted from docs/pages/toolchain/torii/)
- graphql.md - GraphQL query guide
- grpc.md - gRPC subscription guide
- sql.md - SQL access patterns

**New capability**

---

### 12. dojo-token
**Purpose:** Implement token standards (ERC20, ERC721)

**Capabilities:**
- Generate ERC20 token contracts
- Generate ERC721 NFT contracts
- Implement transfer logic
- Add minting/burning
- Use Origami library patterns

**Trigger phrases:**
- "Implement ERC20 token"
- "Create NFT contract"
- "Add token standard"

**Files:**
- SKILL.md - Token overview
- erc20.md - ERC20 implementation guide
- erc721.md - ERC721 implementation guide
- origami.md - Origami library usage (extracted from docs/pages/libraries/origami/)
- templates/ - Token contract templates

**Replaces:** `dojo_token`

---

## Skill Relationships

### Common Workflows

**1. New Project Setup**
```
dojo-init → dojo-model → dojo-system → dojo-test
```

**2. Development Iteration**
```
dojo-model/dojo-system → dojo-test → dojo-review
```

**3. Deployment Pipeline**
```
dojo-config → dojo-deploy → dojo-indexer
```

**4. Client Integration**
```
dojo-deploy → dojo-client
```

**5. Production Setup**
```
dojo-world → dojo-indexer → dojo-migrate
```

### Skill Dependencies

- **dojo-model** and **dojo-system** work together (models used in systems)
- **dojo-test** depends on **dojo-model** and **dojo-system** (tests models/systems)
- **dojo-deploy** depends on **dojo-config** (uses configuration)
- **dojo-client** depends on **dojo-deploy** (connects to deployed world)
- **dojo-indexer** depends on **dojo-deploy** (indexes deployed world)
- **dojo-world** depends on **dojo-deploy** (manages deployed world)

---

## Content Strategy

Each skill follows this structure:

### SKILL.md (Required)
- Name and description (YAML frontmatter)
- When to use this skill (trigger scenarios)
- Quick start with examples
- Core concepts (brief)
- Common workflows
- Links to detailed reference files
- **Target length:** 300-500 lines

### Reference Files (Optional)
- Detailed guides extracted from `docs/pages/`
- API references
- Pattern libraries
- Troubleshooting guides
- **Target length:** 200-1000 lines each

### Templates (Optional)
- Parameterized code templates
- Cairo contracts
- Configuration files
- Test files

### Scripts (Optional)
- Utility commands
- Validation scripts
- Helper tools

---

## Success Metrics

For each skill:
- **Completeness:** All trigger phrases handled
- **Quality:** Generated code compiles
- **Accuracy:** Patterns match official docs
- **Usability:** Clear examples and guidance
- **Coverage:** All major use cases addressed

---

## Related Documentation

- **Plugin Metadata:** `.claude-plugin/plugin.json`
- **Official Docs:** https://book.dojoengine.org
- **Skills Guide:** https://code.claude.com/docs/en/skills.md
