# Dojo Documentation Style Guide

## Overview

This style guide ensures consistency, clarity, and accessibility across all Dojo documentation.
Follow these guidelines to create documentation that serves both newcomers to on-chain gaming and experienced Cairo developers.

## Voice and Tone

### Writing Style
- **Direct and conversational**: Address readers as "you"
- **Active voice**: Write "Run the `dojo build` command" instead of "The command should be run"
- **Present tense**: Use present tense for instructions and descriptions
- **Concise**: Deliver only the information needed to accomplish the goal
- **Plain language**: Avoid unnecessary jargon; explain technical terms when first introduced
- **Emphasize contrasts**: When explaining concepts, emphasize how ideas relate and contrast to each other
- **Avoid fluff**: Avoid fluffy, generic, or hyperbolic language

### Tone Guidelines
- **Helpful and encouraging**: Assume readers want to succeed
- **Neutral and inclusive**: Avoid slang, idioms, or culturally-specific references
- **Professional but approachable**: Maintain expertise without being intimidating

## Language and Terminology

### Dojo-Specific Terms
- **Dojo**: Always capitalize, never "the framework" or "dojo"
- **Component**: Capitalize when referring to ECS components
- **System**: Capitalize when referring to ECS systems
- **Entity**: Capitalize when referring to ECS entities
- **World**: Capitalize when referring to Dojo worlds
- **Cairo**: The programming language (not "cairo")

### Technical Terms
- Define domain-specific terms on first use in each document
- Link to glossary or explanation when introducing complex concepts
- Use consistent terminology throughout all documentation
- Avoid switching between synonyms (e.g., don't alternate between "deploy" and "publish")

## Headings
- Use sentence case: "Getting started with Dojo" not "Getting Started With Dojo"
- Be descriptive: "Deploy to testnet" not "Deployment"
- Use parallel structure in lists of headings
- Limit to 4 heading levels maximum

## Lists and Formatting
- Place every prose sentence on its own line
- Use numbered lists for sequential steps
- Use bullet points for non-sequential items
- **Bold** for UI elements, important terms, and emphasis
- `Code formatting` for commands, file names, and code snippets
- *Italic* for concepts being defined or emphasized

## Code Examples

### Code Blocks
```cairo
// Always include language identifier
// Add comments to explain key concepts
// Keep examples minimal but complete
```

### Inline Code
- Use for file names: `dojo.toml`
- Use for commands: `dojo build`
- Use for parameters: `--world 0x1234`
- Use for code elements: `Component` trait

### Code Example Guidelines
- Provide working, tested examples
- Include expected output when helpful
- Add comments to explain non-obvious code
- Show both basic and advanced usage patterns
- Keep examples focused on the concept being demonstrated

## Cross-References and Links

### Internal Links
- Link to related concepts when first mentioned
- Use descriptive link text: "See the [Component guide](./components.md)" not "click here"
- Cross-reference between tutorials, how-tos, and reference docs
- Link to prerequisites rather than repeating information

### External Links
- Use for official Cairo documentation, Starknet resources
- Open in same window (users can choose to open in new tab)
- Verify links regularly to prevent link rot

## Visual Elements

### Images and Diagrams
- Include alt text for accessibility: `![Dojo architecture diagram showing the relationship between worlds, systems, and components](./architecture.png)`
- Use captions to explain what the image shows
- Keep images simple and focused
- Use consistent visual style across diagrams

### Callouts and Admonitions
```markdown
> **Note**: Use for helpful information that supplements the main content.

> **Warning**: Use for actions that could cause problems or data loss.

> **Tip**: Use for pro tips and best practices.
```

## Accessibility Guidelines

### Writing for Global Audience
- Use simple, clear sentence structure
- Define acronyms on first use: "Entity Component System (ECS)"
- Avoid cultural references and idioms
- Use consistent vocabulary throughout

### Technical Accessibility
- Structure content with proper heading hierarchy
- Use descriptive link text
- Provide alt text for all images
- Ensure code examples are screen-reader friendly

## File and Folder Conventions

### File Naming
- Use lowercase with hyphens: `getting-started.md`
- Be descriptive: `deploy-to-testnet.md` not `deploy.md`
- Group related files in folders: `client/sdk/`, `toolchain/sozo/`

### Folder Structure
- Mirror the logical documentation hierarchy
- Keep related content together
- Use clear, descriptive folder names

## Review Checklist

Before publishing documentation:
- [ ] Tested all code examples
- [ ] Verified all links work
- [ ] Consistent terminology throughout
- [ ] Clear headings and structure
- [ ] Appropriate cross-references
- [ ] Alt text for images
- [ ] Spell check completed
- [ ] Follows document template structure
