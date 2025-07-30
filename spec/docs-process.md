# Documentation Update Process

This guide provides a step-by-step process for updating the Dojo documentation, whether generating content from scratch or performing regular interval updates.

## Overview

The Dojo documentation is built using Vocs and references multiple source code repositories as git submodules. This process ensures our documentation stays current with the latest code changes and maintains high quality standards.

## Prerequisites

### Required Tools
- **Node.js** (v18 or later) - for running the documentation site
- **pnpm** - package manager (`npm install -g pnpm`)
- **Git** - for version control and submodule management
- **Text editor/IDE** - with Markdown support

### Required Access
- Write access to the `dojoengine/book` repository
- Read access to all Dojo ecosystem repositories

### Initial Setup
```bash
# Clone the documentation repository
git clone https://github.com/dojoengine/book.git
cd book

# Install dependencies
pnpm install

# Set up git submodules (first time only)
./scripts/add-submodules.sh
```

## Step 1: Update Source Code Submodules

Before updating documentation, ensure you have the latest source code from all Dojo repositories.

### 1.1 Initialize Submodules (First Time Setup)
```bash
# If submodules aren't set up yet, run the setup script
./scripts/add-submodules.sh
```

### 1.2 Update Existing Submodules
```bash
# Update all submodules to their latest commits
git submodule update --remote

# Alternative: Update specific submodule
git submodule update --remote src/dojo
```

### 1.3 Verify Submodule Status
```bash
# Check current status of all submodules
git submodule status

# Should show current commit hashes and clean working directories
```

### 1.4 Generate API Documentation (New!)

TODO: Implement this functionality!

**Benefits of programmatic API generation:**
- **More accurate** than LLMs parsing raw source code
- **Structured markdown format** optimized for LLM consumption
- **Complete API coverage** including types, signatures, and documentation
- **Consistent formatting** across all projects
- **Automatically updated** with source code changes

## Step 2: Review Source Code Changes

### 2.1 Identify Changed Components
```bash
# Check which submodules have updates
git diff --submodule

# Review commit history for specific components
cd src/dojo && git log --oneline -10 && cd ../..
cd src/katana && git log --oneline -10 && cd ../..
# Repeat for other submodules as needed
```

### 2.2 Analyze Breaking Changes
Review the following for each updated component:
- **API changes**: New functions, modified signatures, deprecated methods
- **CLI changes**: New commands, modified options, removed flags
- **Configuration changes**: New settings, schema updates
- **Feature additions**: New capabilities requiring documentation
- **Bug fixes**: Issues that affect documented behavior

### 2.3 Check Release Notes
```bash
# Review recent releases for major changes
cd src/dojo
git tag --sort=-version:refname | head -5
git show <latest-tag> --name-only
cd ../..
```

## Step 3: Review Documentation Standards

Before writing new content, review the current documentation standards:

### 3.1 Read the Style Guide
- Review `spec/style-guide.md` for writing standards
- Note terminology, formatting, and voice guidelines
- Understand code example requirements

### 3.2 Understand Page Types (Diátaxis Framework)
- Review `spec/page-types.md` for content structure
- **Tutorials**: Learning-oriented, step-by-step guides
- **How-to Guides**: Goal-oriented, problem-solving instructions
- **Reference**: Information-oriented, precise specifications
- **Explanations**: Understanding-oriented, conceptual discussions

### 3.3 Review Architecture
- Study `spec/arch.md` for content organization
- Understand folder structure and navigation hierarchy
- Plan where new content should be placed

### 3.4 Check Best Practices
- Review `spec/best-practices.md` for quality standards
- Ensure accessibility and inclusivity guidelines
- Plan for code examples and visual aids

## Step 4: Audit Existing Documentation

### 4.1 Identify Outdated Content
```bash
# Search for version-specific references
grep -r "v[0-9]" docs/pages/ --include="*.md" --include="*.mdx"

# Find references to deprecated features
grep -r "deprecated\|removed\|legacy" docs/pages/ --include="*.md" --include="*.mdx"
```

### 4.2 Check Links and References
```bash
# Test the documentation site locally
pnpm run dev

# Navigate to http://localhost:5173/
# Manually check navigation and links
# Verify code examples still work
```

### 4.3 Review Navigation Structure
- Check `routes.ts` for navigation organization
- Ensure new content fits the existing structure
- Plan navigation updates if needed

## Step 5: Generate New Documentation

### 5.1 Use Generated API Documentation as LLM Context

**Before creating documentation, leverage the programmatically generated API docs:**

NOTE: not yet available!

### 5.2 Create Content Based on API Documentation

For each component requiring updates:

#### API Documentation (Reference)

For API documentation, read the underlying source code in `src/`

#### CLI Documentation (Reference)

For CLI documentation, check current `--help` outputs:

```bash
torii --help
katana --help
sozo --help
```

For Torii configuration options, check the full default configuration options by running:

```
torii -w 0 --dump-config default.toml # Dumps default configuration to default.toml
```

### 5.2 Follow Documentation Standards

For each new page:
1. **Choose the correct page type** (Tutorial, How-to, Reference, Explanation)
2. **Use the appropriate template** from `spec/page-types.md`
3. **Follow style guidelines** from `spec/style-guide.md`
4. **Include proper code examples** with comments and expected output; consult Sensei MCP when writing Dojo code
5. **Add cross-references** to related content

### 5.3 Update Navigation
```typescript
// Edit routes.ts to include new pages
// Follow existing patterns for organization
// Ensure logical grouping and hierarchy
```

## Step 6: Quality Assurance

### 6.1 Test Documentation Locally
```bash
# Start development server
pnpm run dev

# Test all new and updated content:
# - Navigation works correctly
# - Links resolve properly
# - Code examples are accurate
# - Images display correctly
```

### 6.2 Run Automated Checks
```bash
# Check formatting
pnpm run prettier-check

# Fix formatting issues
pnpm run prettier

# Build the site to check for errors
pnpm run build
```

### 6.3 Validate Code Examples
For each code example:
1. **Test compilation** (for Cairo/Rust code)
2. **Verify commands work** (for CLI examples)
3. **Check expected output** matches reality
4. **Ensure examples are minimal** but complete

## Troubleshooting

### Common Issues

#### Submodule Update Failures
```bash
# If submodule update fails
git submodule sync
git submodule update --init --recursive --force
```

#### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules
pnpm install

# Clear Vocs cache
rm -rf .vocs
```

#### Content Not Updating
```bash
# Hard refresh development server
# Stop server (Ctrl+C)
pnpm run dev

# Check for caching issues in browser
```

### Getting Help

- **Technical issues**: Create issue in `dojoengine/book` repository
- **Content questions**: Ask in #documentation Discord channel
- **Style guide questions**: Reference `spec/style-guide.md` or ask team

## Quick Reference

### Essential Commands
```bash
# Update all submodules
git submodule update --remote

# Start development server
pnpm run dev

# Run formatting
pnpm run prettier

# Build for production
pnpm run build
```

### Key Files to Monitor
- `src/*/` - Source code submodules
- `docs/pages/` - Documentation content
- `routes.ts` - Navigation structure
- `package.json` - Dependencies and versions
- `vocs.config.ts` - Site configuration

This process ensures our documentation remains accurate, useful, and aligned with the latest Dojo developments while maintaining high quality standards.
