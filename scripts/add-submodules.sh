#!/bin/bash

# Script to add Dojo ecosystem repositories as git submodules
# This script adds the source code repositories that are documented in this book

set -e  # Exit on any error

# Detect the project root directory (where package.json is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel)"

# Change to project root to ensure relative paths work correctly
cd "$PROJECT_ROOT"

echo "🔧 Adding Dojo ecosystem repositories as git submodules..."
echo "📁 Project root: $PROJECT_ROOT"
echo "This will allow us to reference the latest source code for documentation."
echo ""

# Create src directory if it doesn't exist
mkdir -p src

# Array of repositories and their target directories
# Format: "repository_url target_directory"
REPOS=(
    "https://github.com/dojoengine/dojo.git src/dojo"
    "https://github.com/dojoengine/katana.git src/katana"
    "https://github.com/dojoengine/torii.git src/torii"
    "https://github.com/dojoengine/saya.git src/saya"
    "https://github.com/dojoengine/origami.git src/origami"
    "https://github.com/dojoengine/dojo.c.git src/dojo.c"
    "https://github.com/dojoengine/dojo.js.git src/dojo.js"
    "https://github.com/dojoengine/dojo.bevy.git src/dojo.bevy"
    "https://github.com/dojoengine/dojo.unity.git src/dojo.unity"
    "https://github.com/dojoengine/dojo.unreal.git src/dojo.unreal"
)

# Function to add a submodule with error handling
add_submodule() {
    local repo_url="$1"
    local target_dir="$2"
    local repo_name=$(basename "$repo_url" .git)

    echo "📦 Adding $repo_name..."

    # Check if submodule already exists
    if [ -d "$target_dir" ] && [ -f "$target_dir/.git" ]; then
        echo "⚠️  Submodule $repo_name already exists at $target_dir, skipping..."
        return 0
    fi

    # Remove directory if it exists but is not a submodule
    if [ -d "$target_dir" ]; then
        echo "🗑️  Removing existing directory $target_dir..."
        rm -rf "$target_dir"
    fi

    # Add the submodule
    if git submodule add "$repo_url" "$target_dir"; then
        echo "✅ Successfully added $repo_name"
    else
        echo "❌ Failed to add $repo_name"
        return 1
    fi

    echo ""
}

# Verify we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from within the Dojo book repository"
    exit 1
fi

# Add each repository as a submodule
for repo_info in "${REPOS[@]}"; do
    # Split the repo_info into URL and target directory
    repo_url=$(echo "$repo_info" | cut -d' ' -f1)
    target_dir=$(echo "$repo_info" | cut -d' ' -f2-)
    add_submodule "$repo_url" "$target_dir"
done

echo "🎉 Submodule setup complete!"
echo ""
echo "📋 Summary of added submodules:"
git submodule status | grep "^[[:space:]]*[a-f0-9]" | while read -r line; do
    echo "  $line"
done

echo ""
echo "🔄 To update all submodules to their latest commits, run:"
echo "   git submodule update --remote"
echo ""
echo "📖 To initialize submodules after cloning this repository, run:"
echo "   git submodule update --init --recursive"
