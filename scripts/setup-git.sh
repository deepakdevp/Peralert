#!/bin/bash

# PerAlert Git Configuration Setup Script
# This script configures git to use our commit message template and other best practices

echo "🔧 Setting up Git configuration for PerAlert..."

# Set the commit message template
git config commit.template .gitmessage
echo "✅ Set commit message template"

# Set default editor (uncomment your preferred editor)
# git config core.editor "code --wait"  # VS Code
# git config core.editor "subl -n -w"   # Sublime Text
# git config core.editor "vim"          # Vim
# git config core.editor "nano"         # Nano

# Set up useful aliases
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.st status
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'
git config alias.visual '!gitk'

# Set up better log formatting
git config alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Set up commit template for better commit messages
git config alias.c "commit --template=.gitmessage"

echo "✅ Configured git aliases"

# Set up line ending handling (for cross-platform teams)
git config core.autocrlf input
echo "✅ Configured line endings"

# Set up default pull behavior
git config pull.rebase false
echo "✅ Set default pull behavior"

# Show current git configuration
echo ""
echo "📋 Current Git Configuration:"
echo "User: $(git config user.name) <$(git config user.email)>"
echo "Commit template: $(git config commit.template)"
echo "Core editor: $(git config core.editor)"
echo ""

# Remind about global vs local config
echo "ℹ️  Note: These settings are applied to this repository only."
echo "   To apply globally, add --global flag to git config commands."
echo ""

# Show how to use the template
echo "🚀 How to use:"
echo "   git commit          # Opens template in your editor"
echo "   git c               # Shortcut for commit with template"
echo "   git lg              # Pretty log view"
echo ""

echo "✨ Git configuration complete! Happy committing! 🎉"