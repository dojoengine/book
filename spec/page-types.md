# Documentation Page Types: The Diátaxis Framework

This guide defines how we structure our documentation using the **Diátaxis framework**, a systematic approach that divides technical documentation into four distinct types, each serving different user needs and contexts.

## Why Diátaxis?

The Diátaxis framework recognizes that users approach documentation with different needs:
- **I want to learn** → Tutorial
- **I want to achieve a specific goal** → How-to Guide
- **I need to look something up** → Reference
- **I want to understand** → Explanation

By clearly separating these purposes, we create documentation that serves users effectively regardless of their current context or experience level.

## The Four Documentation Types

```text
                  LEARNING-ORIENTED  |  GOAL-ORIENTED
                                     |
    PRACTICAL         Tutorials      |   How-to Guides
                                     |
                 ------------------- + -------------------
                                     |
    THEORETICAL    Explanations      |   Reference
                                     |
              UNDERSTANDING-ORIENTED | INFORMATION-ORIENTED
```

### When to Use Each Type

| Type | User's Question | User's Context | Content Focus |
|------|----------------|----------------|---------------|
| **Tutorial** | "Can you teach me?" | New to the topic, wants to learn by doing | Step-by-step learning journey |
| **How-to Guide** | "How do I solve this problem?" | Has specific goal, knows basics | Task completion |
| **Reference** | "What are the details?" | Needs precise information quickly | Facts and specifications |
| **Explanation** | "Why does this work this way?" | Wants deeper understanding | Concepts and design reasoning |

---

## Tutorial Pages

- **Purpose**: Learning-oriented guides that teach through hands-on experience
- **Audience**: Newcomers who want to gain confidence and basic competence
- **Promise**: "By following this, you will learn how to..."

### Structure Template

```
# [Tutorial Title]: Build Your First [Specific Thing]
Brief one-sentence description of what the reader will create and why it's useful.

## Overview
A paragraph explaining:
- What you'll build (be specific - "a simple dice game" not "a game")
- Why this tutorial is valuable for learning
- Estimated time to complete
- What the learner will be able to do afterward

## Prerequisites
### Required Knowledge
- List specific concepts the reader should understand
- Link to explanatory docs for each concept

### Required Setup
- Software versions needed
- Accounts or services to set up
- Hardware requirements (if any)

### Before You Begin
- Any preparation steps
- Files to download or repositories to clone

## What You'll Learn
- Specific skills or concepts (use bullet points)
- Each point should be actionable and measurable
- Focus on transferable knowledge, not just following steps

## Step 1: [Specific, Action-Oriented Title]
### Goal
What this step accomplishes in the larger learning context.

### Instructions
1. Detailed, numbered steps
2. Each step should be a single, clear action
3. Include expected output or results
4. Explain what's happening and why

// Code examples with comments explaining key concepts
// Keep examples minimal but functional
#[derive(Component)]
struct Position {
    x: u32,
    y: u32,
}

### Explanation
Why this step matters and how it connects to the bigger picture.

## Step 2: [Next Action-Oriented Title]
[Continue same pattern...]

## Testing Your Implementation
How to verify everything works correctly:
- Commands to run
- Expected outputs
- What success looks like

## Summary
### What You Built
- Recap the concrete thing created
- Highlight key features implemented

### Key Concepts Learned
- List the transferable concepts
- Each should link to deeper explanatory docs

### Next Steps
- Logical follow-up tutorials
- How-to guides for extending the project
- Related concepts to explore

## Troubleshooting
Common issues organized by step, with solutions that teach rather than just fix.
```

---

## How-to Guide Pages

- **Purpose**: Goal-oriented instructions for accomplishing specific tasks
- **Audience**: Users with some experience who need to solve a particular problem
- **Promise**: "This will help you achieve..."

### Structure Template

```
# How to [Specific Task]
One-sentence description of the task and its primary use case.

## When to Use This Guide
- Specific scenarios where this task is needed
- What problem this solves
- Assumptions about user's current state

## Prerequisites
### Required Setup
- What must be configured beforehand
- Minimum versions or dependencies
- Link to installation/setup guides

### Required Knowledge
- Concepts the reader should understand
- Link to explanatory documentation

## Overview
Brief explanation of the approach and any important considerations or warnings.

## Steps

### 1. [First Major Action]
# Commands with clear comments
dojo build --release

Expected result: What should happen after this step.

### 2. [Second Major Action]
Continue with numbered steps, each focused on a single objective.

// Relevant code examples
// Include only necessary parts, with comments

### 3. [Verification Step]
How to confirm the task was completed successfully.

## Variations
### For [Specific Use Case]
Modified steps or additional considerations for common variations.

### Alternative Approaches
When and why to use different methods.

## Troubleshooting
| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Specific error | Why it happens | How to fix |

## See Also
- Related how-to guides
- Reference docs for commands used
- Explanations for deeper understanding
```

---

## Reference Documentation Pages

- **Purpose**: Information-oriented material for looking up precise details
- **Audience**: Users who know what they're looking for and need accurate information
- **Promise**: "Here are the facts about..."

### Structure Template

```
# [Command/API/Component Name]
Brief, precise description of what this element does and its primary purpose.

## Syntax
command [OPTIONS] <REQUIRED_ARG> [OPTIONAL_ARG]

## Description
Comprehensive explanation of the command's purpose, behavior, and any important characteristics.

## Arguments
### Required Arguments
| Argument | Type | Description |
|----------|------|-------------|
| world_address | felt252 | The address of the deployed world contract |

### Optional Arguments
| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| --rpc-url | string | http://localhost:5050 | RPC endpoint URL |

## Options
### Global Options
| Flag | Short | Description |
|------|-------|-------------|
| --help | -h | Show help information |

### Command-Specific Options
| Flag | Type | Description |
|------|------|-------------|
| --verbose | boolean | Enable detailed output |

## Examples
### Basic Usage
sozo execute --world 0x1234 move --direction north

Most common use case with minimal options.

### Advanced Usage
sozo execute --world 0x1234 --account player1 \
  --rpc-url https://starknet-goerli.infura.io/v3/YOUR-PROJECT-ID \
  move --direction north --speed 5

Complex example showing multiple options and their interactions.

### Configuration File Usage
{
  "world": "0x1234",
  "account": "player1",
  "actions": [
    {
      "name": "move",
      "args": ["north", 5]
    }
  ]
}

## Return Values
### Success Response
{
  "transaction_hash": "0x...",
  "status": "success"
}

### Error Response
{
  "error": "InvalidMove",
  "message": "Cannot move north from current position"
}

## Error Codes
| Code | Name | Description | Resolution |
|------|------|-------------|------------|
| 1 | InvalidWorld | World address not found | Verify world address is correct |

## See Also
- Related commands or APIs
- Configuration files that affect this command
- How-to guides demonstrating usage
```

---

## Explanation Pages

- **Purpose**: Understanding-oriented discussions of concepts and design decisions
- **Audience**: Users who want to understand the reasoning behind how things work
- **Promise**: "This will help you understand..."

### Structure Template

```
# Understanding [Concept Name]
One-sentence summary of what this concept is and why it matters in the larger system.

## Overview
High-level explanation of the concept, its purpose, and how it fits into the broader ecosystem.

## The Problem
What challenge or limitation this concept addresses:
- Context where the problem arises
- Why existing approaches weren't sufficient
- Real-world implications of the problem

## How [Concept] Works
### Core Principles
- Fundamental ideas underlying the concept
- Key assumptions or constraints
- Design philosophy and trade-offs

### Architecture
World
├── Systems (contain game logic)
├── Components (define data structures)
└── Entities (represent game objects)

Explanation of how components interact and why this structure was chosen.

### Key Mechanisms
Detailed explanation of the most important processes or algorithms.

## Design Decisions
### Why We Chose This Approach
- Alternatives that were considered
- Trade-offs made in the design
- Benefits and limitations

### Comparison with Other Approaches
How this concept relates to similar solutions in other contexts.

## Implications
### For Developers
What this means for how you write code and structure applications.

### For Users
How this affects the end-user experience.

### For the Ecosystem
Broader impacts on tooling, compatibility, and future development.

## Common Misconceptions
Address frequent misunderstandings about the concept.

## See Also
- Tutorials that demonstrate the concept in practice
- How-to guides for implementing related functionality
- Reference docs for specific implementations
```

---

## Choosing the Right Type

When creating new documentation, ask yourself:

1. **What is the user trying to accomplish?**
   - Learn something new → Tutorial
   - Solve a specific problem → How-to Guide
   - Look up information → Reference
   - Understand concepts → Explanation

2. **What is the user's experience level?**
   - Beginner wanting to learn → Tutorial
   - Experienced with a specific goal → How-to Guide
   - Any level needing facts → Reference
   - Any level wanting understanding → Explanation

3. **What type of content are you writing?**
   - Step-by-step learning → Tutorial
   - Problem-solving steps → How-to Guide
   - Facts and specifications → Reference
   - Concepts and reasoning → Explanation

## Cross-References Between Types

Effective documentation links between types appropriately:

- **Tutorials** should link to **Explanations** for concepts and **Reference** docs for commands used
- **How-to Guides** should link to **Reference** docs for detailed specifications and **Tutorials** for learning prerequisites
- **Reference** docs should link to **How-to Guides** for usage examples and **Explanations** for conceptual context
- **Explanations** should link to **Tutorials** for hands-on learning and **Reference** docs for implementation details

This creates a cohesive documentation ecosystem where users can easily navigate between different types of information as their needs change.
