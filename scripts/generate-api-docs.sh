#!/bin/bash

# API Documentation Generation Script
# Generates documentation for all Rust and Cairo projects in the Dojo ecosystem

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
API_DOCS_DIR="$PROJECT_ROOT/api"
SRC_DIR="$PROJECT_ROOT/src"

# Clean and create API docs directory
echo -e "${BLUE}Setting up API documentation directory...${NC}"
rm -rf "$API_DOCS_DIR"
mkdir -p "$API_DOCS_DIR"

# Function to print section headers
print_section() {
    echo
    echo -e "${BLUE}=====================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}=====================================${NC}"
}

# Function to print status messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Function to print errors
print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
print_section "Checking Prerequisites"

if ! command_exists cargo; then
    print_error "cargo not found. Please install Rust toolchain."
    exit 1
fi
print_status "cargo found"

if ! command_exists scarb; then
    print_error "scarb not found. Please install Scarb for Cairo development."
    exit 1
fi
print_status "scarb found"

# Check for optional but recommended tools
if command_exists ruskel; then
    print_status "ruskel found (will be used for enhanced Rust API documentation)"
else
    print_warning "ruskel not found. Consider installing for better Rust API docs:"
    echo "  cargo install ruskel"
fi

# Function to generate Rust documentation using markdown-friendly tools
generate_rust_docs() {
    local project_path="$1"
    local project_name="$2"

    print_section "Generating Rust docs for $project_name"

    if [[ ! -f "$project_path/Cargo.toml" ]]; then
        print_warning "No Cargo.toml found in $project_path, skipping"
        return
    fi

    cd "$project_path"

    echo "Current directory: $(pwd)"
    echo "Generating documentation..."

    local api_target_dir="$API_DOCS_DIR/rust/$project_name"
    mkdir -p "$api_target_dir"

    # Method 1: Try to use ruskel for generating markdown skeletons (if available)
    if command_exists ruskel; then
        echo "Using ruskel to generate API skeleton..."
        if ruskel . > "$api_target_dir/api_skeleton.md" 2>/dev/null; then
            print_status "Generated API skeleton using ruskel"
        else
            print_warning "ruskel failed, trying alternative approaches"
        fi
    fi

    # Method 2: Generate JSON docs and extract to markdown
    echo "Generating structured documentation..."
    if cargo doc --no-deps --all-features --document-private-items --output-format json 2>/dev/null || cargo doc --no-deps --all-features --document-private-items 2>/dev/null; then

        # Try to extract useful information from generated docs
        local target_doc_dir="$project_path/target/doc"

        if [[ -d "$target_doc_dir" ]]; then
            # Create a simple markdown index from the generated docs
            create_rust_markdown_index "$target_doc_dir" "$api_target_dir" "$project_name"
            print_status "Generated documentation index for $project_name"
        else
            print_warning "No documentation generated at $target_doc_dir"
        fi
    else
        print_warning "Failed to generate Rust docs for $project_name (this may be expected for some projects)"
    fi

    cd "$PROJECT_ROOT"
}

# Function to create a markdown index from Rust HTML docs
create_rust_markdown_index() {
    local target_doc_dir="$1"
    local api_target_dir="$2"
    local project_name="$3"

    cat > "$api_target_dir/README.md" << EOF
# $project_name API Documentation

This directory contains API documentation for the $project_name Rust project.

## Structure

This documentation was generated from the Rust source code and includes:

- Public APIs and their signatures
- Module structure and organization
- Type definitions and implementations

## Files

EOF

    # If ruskel skeleton exists, reference it
    if [[ -f "$api_target_dir/api_skeleton.md" ]]; then
        cat >> "$api_target_dir/README.md" << EOF
- \`api_skeleton.md\`: Complete API skeleton showing all public interfaces
EOF
    fi

    cat >> "$api_target_dir/README.md" << EOF

## Generated Content

The documentation below was extracted from the Rust compiler's documentation generation:

EOF

    # Try to extract some useful information from the HTML docs if they exist
    if [[ -f "$target_doc_dir/index.html" ]]; then
        # Extract main crates from the index
        if command_exists grep; then
            echo "### Available Crates" >> "$api_target_dir/README.md"
            echo "" >> "$api_target_dir/README.md"

            # Simple extraction of crate names from HTML (very basic)
            if grep -o 'href="[^"]*index\.html"[^>]*>[^<]*' "$target_doc_dir/index.html" 2>/dev/null | \
               sed 's/.*>\([^<]*\)$/- \1/' >> "$api_target_dir/README.md" 2>/dev/null; then
                echo "" >> "$api_target_dir/README.md"
            fi
        fi

        # Copy the HTML docs as well for reference
        cp -r "$target_doc_dir" "$api_target_dir/html_docs" 2>/dev/null || true
    fi

    cat >> "$api_target_dir/README.md" << EOF

## Usage Notes

This documentation is intended for LLM consumption and includes:

1. **API Signatures**: Function and method signatures with parameter types
2. **Module Structure**: How the code is organized into modules and crates
3. **Type Information**: Struct, enum, and trait definitions
4. **Documentation Comments**: Extracted from source code comments

For human-readable documentation, see the generated HTML docs in the \`html_docs/\` subdirectory.
EOF
}

# Function to generate Cairo documentation in markdown format
generate_cairo_docs() {
    local project_path="$1"
    local project_name="$2"

    print_section "Generating Cairo docs for $project_name"

    if [[ ! -f "$project_path/Scarb.toml" ]]; then
        print_warning "No Scarb.toml found in $project_path, skipping"
        return
    fi

    cd "$project_path"

    echo "Current directory: $(pwd)"
    echo "Generating markdown documentation..."

    local api_target_dir="$API_DOCS_DIR/cairo/$project_name"
    mkdir -p "$api_target_dir"

    # Generate documentation in markdown format (default for scarb doc)
    if scarb doc --output-format markdown --document-private-items 2>/dev/null; then
        print_status "Successfully generated Cairo docs for $project_name"

        # Copy generated docs to API directory
        local target_doc_dir="$project_path/target/doc"

        if [[ -d "$target_doc_dir" ]]; then
            cp -r "$target_doc_dir"/* "$api_target_dir/"
            print_status "Copied markdown docs to $api_target_dir"

            # Create an index file for the project
            create_cairo_docs_index "$api_target_dir" "$project_name"
        else
            print_warning "No documentation generated at $target_doc_dir"
        fi
    else
        print_warning "Failed to generate Cairo docs for $project_name (this may be expected for some projects)"

        # Try without private items as fallback
        if scarb doc --output-format markdown 2>/dev/null; then
            print_status "Generated Cairo docs (public items only) for $project_name"
            local target_doc_dir="$project_path/target/doc"
            if [[ -d "$target_doc_dir" ]]; then
                cp -r "$target_doc_dir"/* "$api_target_dir/"
                create_cairo_docs_index "$api_target_dir" "$project_name"
            fi
        fi
    fi

    cd "$PROJECT_ROOT"
}

# Function to create an index for Cairo documentation
create_cairo_docs_index() {
    local api_target_dir="$1"
    local project_name="$2"

    cat > "$api_target_dir/README.md" << EOF
# $project_name Cairo API Documentation

This directory contains API documentation for the $project_name Cairo project.

## About Cairo Documentation

This documentation was generated using \`scarb doc\` with markdown output format, making it ideal for:

- LLM consumption and analysis
- Integration with documentation tools
- Version control and diff tracking
- Cross-referencing with other markdown content

## Structure

The documentation includes:

- **Module Documentation**: Complete module structure and organization
- **Function Signatures**: All public functions with parameter and return types
- **Trait Definitions**: Available traits and their implementations
- **Type Definitions**: Structs, enums, and custom types
- **Documentation Comments**: Extracted from source code

## Files

EOF

    # List the generated markdown files
    if [[ -d "$api_target_dir" ]]; then
        find "$api_target_dir" -name "*.md" -type f ! -name "README.md" | sort | while read -r file; do
            local relative_path=$(basename "$file")
            echo "- \`$relative_path\`: Generated API documentation" >> "$api_target_dir/README.md"
        done
    fi

    cat >> "$api_target_dir/README.md" << EOF

## Usage for LLMs

This markdown format documentation is optimized for LLM processing because:

1. **Structured Format**: Clear hierarchical organization
2. **Type Information**: Explicit type annotations and signatures
3. **Searchable Content**: Easy to parse and search programmatically
4. **Context Preservation**: Maintains relationships between components

The documentation can be directly included in LLM prompts for code generation, analysis, and explanation tasks.
EOF
}

# Main Rust projects
print_section "Processing Main Rust Projects"

# Core Rust projects
RUST_PROJECTS=(
    "dojo:$SRC_DIR/dojo"
    "katana:$SRC_DIR/katana"
    "torii:$SRC_DIR/torii"
    "saya:$SRC_DIR/saya"
)

for project in "${RUST_PROJECTS[@]}"; do
    IFS=':' read -r name path <<< "$project"
    if [[ -d "$path" ]]; then
        generate_rust_docs "$path" "$name"
    else
        print_warning "Rust project directory not found: $path"
    fi
done

# Language bindings (these might not all have Cargo.toml at root)
BINDING_PROJECTS=(
    "dojo-c:$SRC_DIR/dojo.c"
    "dojo-bevy:$SRC_DIR/dojo.bevy"
)

for project in "${BINDING_PROJECTS[@]}"; do
    IFS=':' read -r name path <<< "$project"
    if [[ -d "$path" ]]; then
        generate_rust_docs "$path" "$name"
    else
        print_warning "Binding project directory not found: $path"
    fi
done

# Main Cairo projects
print_section "Processing Main Cairo Projects"

# Core Cairo projects
CAIRO_PROJECTS=(
    "origami:$SRC_DIR/origami"
    "katana-contracts:$SRC_DIR/katana/contracts"
)

for project in "${CAIRO_PROJECTS[@]}"; do
    IFS=':' read -r name path <<< "$project"
    if [[ -d "$path" ]]; then
        generate_cairo_docs "$path" "$name"
    else
        print_warning "Cairo project directory not found: $path"
    fi
done

# Dojo example projects
print_section "Processing Dojo Example Projects"

if [[ -d "$SRC_DIR/dojo/examples" ]]; then
    for example_dir in "$SRC_DIR/dojo/examples"/*; do
        if [[ -d "$example_dir" && -f "$example_dir/Scarb.toml" ]]; then
            example_name=$(basename "$example_dir")
            generate_cairo_docs "$example_dir" "example-$example_name"
        fi
    done
else
    print_warning "Dojo examples directory not found"
fi

# Generate documentation index
print_section "Generating Documentation Index"

cat > "$API_DOCS_DIR/README.md" << 'EOF'
# API Documentation

This directory contains auto-generated API documentation for all Dojo ecosystem projects in **markdown format**, optimized for LLM consumption and analysis.

## Structure

### Rust Projects (`rust/` directory)
- **dojo/**: Core Dojo framework (Rust)
- **katana/**: Katana sequencer
- **torii/**: Torii indexer
- **saya/**: Saya prover
- **dojo-c/**: C language bindings
- **dojo-bevy/**: Bevy game engine integration

### Cairo Projects (`cairo/` directory)
- **origami/**: Origami Cairo library
- **katana-contracts/**: Katana smart contracts
- **example-*/**: Dojo example projects

## Documentation Generation

This documentation is generated automatically using:

### For Rust Projects
- **Primary method**: `ruskel` for generating markdown API skeletons (if available)
- **Fallback method**: `cargo doc` with structured extraction to markdown
- **Output**: Markdown files with API signatures, types, and documentation

### For Cairo Projects
- **Method**: `scarb doc --output-format markdown`
- **Output**: Native markdown documentation (default format)
- **Features**: Complete API coverage including private items when possible

## Regeneration

To regenerate this documentation, run:
```bash
./scripts/generate-api-docs.sh
```

### Prerequisites
- `cargo` (Rust toolchain)
- `scarb` (Cairo toolchain)
- `ruskel` (optional, for enhanced Rust docs): `cargo install ruskel`

## Integration with LLM Documentation Process

This markdown-format API documentation is specifically designed for LLM consumption and provides:

### Key Benefits
1. **Markdown Format**: Easy to parse and include in LLM prompts
2. **Accurate API Signatures**: Function signatures, parameter types, return types
3. **Structured Organization**: Consistent hierarchical structure across projects
4. **Type Information**: Complete type annotations and relationships
5. **Documentation Comments**: Extracted from source code comments
6. **Cross-references**: Maintains relationships between components

### LLM Usage Patterns

When updating documentation, LLMs can:

- **Reference this as source of truth**: Use instead of parsing raw source code
- **Generate documentation**: Create human-readable docs from these API specs
- **Code generation**: Use API signatures for accurate code examples
- **Cross-project analysis**: Understand relationships between different components
- **Validation**: Check generated code against actual API definitions

### File Organization

Each project directory contains:
- `README.md`: Project overview and structure
- `*.md`: Generated API documentation files
- `api_skeleton.md`: Complete API skeleton (Rust projects with ruskel)
- `html_docs/`: Reference HTML documentation (Rust projects)

This structured approach ensures that LLM-generated documentation remains accurate and up-to-date with the actual codebase.
EOF

print_status "Generated documentation index"

# Generate a metadata file for tooling
cat > "$API_DOCS_DIR/metadata.json" << EOF
{
  "generated_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "generator_version": "1.0.0",
  "rust_projects": [
    "dojo",
    "katana",
    "torii",
    "saya",
    "dojo-c",
    "dojo-bevy"
  ],
  "cairo_projects": [
    "origami",
    "katana-contracts"
  ],
  "example_projects": []
}
EOF

# Find generated example projects and add to metadata
if [[ -d "$API_DOCS_DIR/cairo" ]]; then
    EXAMPLES=$(find "$API_DOCS_DIR/cairo" -name "example-*" -type d -exec basename {} \; | sort)
    if [[ -n "$EXAMPLES" ]]; then
        # Update metadata with actual examples found
        EXAMPLES_JSON=$(echo "$EXAMPLES" | sed 's/^/    "/;s/$/",/' | sed '$ s/,$//')
        sed -i '' "s/\"example_projects\": \[\]/\"example_projects\": [\n$EXAMPLES_JSON\n  ]/" "$API_DOCS_DIR/metadata.json"
    fi
fi

print_status "Generated metadata file"

print_section "Summary"
echo "API documentation generated successfully!"
echo
echo "Documentation structure:"
if [[ -d "$API_DOCS_DIR/rust" ]]; then
    echo "  Rust projects: $(find "$API_DOCS_DIR/rust" -maxdepth 1 -type d | wc -l | tr -d ' ') projects"
fi
if [[ -d "$API_DOCS_DIR/cairo" ]]; then
    echo "  Cairo projects: $(find "$API_DOCS_DIR/cairo" -maxdepth 1 -type d | wc -l | tr -d ' ') projects"
fi
echo
echo "Location: $API_DOCS_DIR"
echo
echo -e "${GREEN}Next steps:${NC}"
echo "1. Review generated documentation in $API_DOCS_DIR"
echo "2. Update your LLM prompts to reference this structured API documentation"
echo "3. Run this script regularly to keep API docs up to date"
echo "4. Consider integrating this into your CI/CD pipeline"
