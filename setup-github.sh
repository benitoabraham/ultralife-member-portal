#!/bin/bash

# UltraLife Member Portal - GitHub Setup Script
# This script helps you push your project to GitHub

echo "🚀 UltraLife Member Portal - GitHub Setup"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Run this script from the project directory."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " github_username

# Get repository name
read -p "Enter repository name (default: ultralife-member-portal): " repo_name
repo_name=${repo_name:-ultralife-member-portal}

# Ask for visibility
echo ""
echo "Repository visibility:"
echo "1) Private (recommended)"
echo "2) Public"
read -p "Choose (1 or 2): " visibility_choice

if [ "$visibility_choice" = "1" ]; then
    visibility="private"
else
    visibility="public"
fi

echo ""
echo "📦 Configuration:"
echo "  Username: $github_username"
echo "  Repository: $repo_name"
echo "  Visibility: $visibility"
echo ""

read -p "Proceed with these settings? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Setup cancelled"
    exit 0
fi

echo ""
echo "🔧 Setting up remote repository..."

# Remove existing remote if present
git remote remove origin 2>/dev/null

# Add new remote
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Rename branch to main
git branch -M main

echo ""
echo "✅ Remote configured!"
echo ""
echo "📤 Now you need to:"
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   - Name it: $repo_name"
echo "   - Set visibility to: $visibility"
echo "   - DO NOT initialize with README"
echo ""
echo "2. After creating the repository, run:"
echo "   git push -u origin main"
echo ""
echo "3. When prompted for password, use a Personal Access Token (PAT)"
echo "   Generate one at: https://github.com/settings/tokens"
echo ""

read -p "Press Enter to continue to push (or Ctrl+C to cancel)..."

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub!"
    echo "🔗 View at: https://github.com/$github_username/$repo_name"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "  - Repository doesn't exist on GitHub yet"
    echo "  - Authentication failed (use Personal Access Token)"
    echo "  - Network connection issues"
    echo ""
    echo "💡 Try manually:"
    echo "  git push -u origin main"
fi
