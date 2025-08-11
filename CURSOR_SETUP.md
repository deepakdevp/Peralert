# Cursor AI Integration for PerAlert

This document explains how to use Cursor's AI-powered commit message generation with PerAlert's commit conventions.

## 🎯 Overview

Cursor will now automatically generate commit messages following our Conventional Commits specification using the configuration files we've set up.

## 📁 Configuration Files

The following files have been created to integrate with Cursor:

### 1. `.cursorrules` - Main Cursor Configuration
- Defines commit message format and rules
- Provides examples of good/bad commits
- Includes coding guidelines and best practices

### 2. `.vscode/settings.json` - VSCode/Cursor Settings
- Configures conventional commit scopes
- Sets up git input validation
- Includes editor settings for commit messages

### 3. `.ai-commit-config.json` - AI Commit Configuration
- Structured configuration for AI commit generation
- Detailed examples for each commit type and scope
- Validation rules for commit format

### 4. `commitlint.config.js` - CommitLint Configuration
- Automated commit message validation
- Enforces our commit conventions
- Provides helpful error messages

## 🚀 How to Use

### Method 1: Cursor's AI Commit Feature
1. Make your changes and stage them (`git add .`)
2. Open the Source Control panel in Cursor (Ctrl/Cmd + Shift + G)
3. Click the "✨" (sparkle) icon next to the commit message box
4. Cursor will analyze your changes and generate a conventional commit message
5. Review and edit if needed
6. Commit your changes

### Method 2: Manual Commit with Template
1. Use the command: `npm run commit`
2. Your editor will open with the commit template
3. Follow the template guidelines
4. Save and close to commit

### Method 3: Quick Command Line
1. Stage your changes: `git add .`
2. Commit with format: `git commit -m "feat(scope): description"`

## 📋 Commit Types & Scopes

### Available Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Tests
- `chore` - Maintenance
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert previous commit

### Available Scopes
- `auth` - Authentication
- `ui` - User interface
- `api` - API endpoints
- `db` - Database
- `alerts` - Alert management
- `integrations` - Third-party integrations
- `dashboard` - Dashboard pages
- `jobs` - Background jobs
- `config` - Configuration
- `deps` - Dependencies

## ✅ Examples

Cursor will generate messages like these:

```bash
# Adding new functionality
feat(auth): add Google OAuth integration

# Fixing bugs
fix(alerts): resolve timezone parsing issue

# Documentation updates  
docs: update API endpoint documentation

# Performance improvements
perf(db): optimize user query performance

# Dependency updates
chore(deps): update Next.js to version 14.2.15
```

## 🔧 Validation

Your commits will be automatically validated against our rules:

```bash
# Check your last commit
npm run commitlint

# Generate changelog preview
npm run release:dry
```

## 🎨 Cursor-Specific Features

### Smart Suggestions
Cursor will:
- Analyze your file changes to suggest appropriate type/scope
- Generate descriptive commit messages based on actual changes
- Follow the 50-character limit for commit headers
- Use imperative mood automatically

### Context Awareness
Cursor considers:
- Files modified (suggests appropriate scope)
- Type of changes (suggests appropriate type)
- Project conventions (follows our rules)
- Previous commit patterns

## 🛠️ Setup Instructions

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Setup Git Configuration**:
   ```bash
   npm run setup:git
   ```

3. **Install Recommended Extensions**:
   - Open Cursor
   - Go to Extensions (Ctrl/Cmd + Shift + X)
   - Install recommended extensions from `.vscode/extensions.json`

4. **Test the Setup**:
   ```bash
   # Make a small change
   echo "# Test" >> test.md
   git add test.md
   
   # Use Cursor's AI commit feature
   # Should generate: "docs: add test documentation file"
   ```

## 🚨 Troubleshooting

### Cursor Not Generating Conventional Commits
1. Check that `.cursorrules` file exists in project root
2. Restart Cursor
3. Try refreshing the Source Control panel

### Commit Validation Failing
1. Run `npm run commitlint` to see specific errors
2. Check commit message format against examples
3. Ensure type and scope are from allowed lists

### AI Suggestions Not Appearing
1. Make sure you have changes staged (`git add`)
2. Click the ✨ sparkle icon in commit message box
3. Wait a moment for AI to analyze changes

## 📖 Additional Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Our Commit Conventions](./COMMIT_CONVENTIONS.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 💡 Tips for Better AI Commits

1. **Stage related changes together** - Cursor generates better messages when changes are logically grouped
2. **Use descriptive file/variable names** - AI uses these for context
3. **Keep changes focused** - One feature/fix per commit works best
4. **Review generated messages** - AI suggestions are starting points, feel free to refine

---

🎉 **You're all set!** Cursor will now generate professional, consistent commit messages automatically while following PerAlert's conventions.