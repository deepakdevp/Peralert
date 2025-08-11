# Commit Message Conventions

This document establishes the commit message standards for the PerAlert project, based on the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

Each commit message consists of a **header**, **body**, and **footer**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Header

### Type (Required)

Must be one of the following:

- **feat**: A new feature for the user
- **fix**: A bug fix for the user
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates, build changes
- **ci**: CI/CD pipeline changes
- **build**: Build system or external dependency changes
- **revert**: Reverting a previous commit

### Scope (Optional)

The scope should be a noun describing the section of the codebase:

- **auth**: Authentication related changes
- **ui**: User interface components
- **api**: API endpoints and server logic  
- **db**: Database schema and migrations
- **alerts**: Alert management functionality
- **integrations**: Third-party integrations (Gmail, Twilio, etc.)
- **dashboard**: Dashboard pages and components
- **jobs**: Background job processing (Inngest)
- **config**: Configuration files
- **deps**: Dependencies

### Description (Required)

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Maximum 50 characters

## Body (Optional)

- Use imperative, present tense
- Include motivation for the change and contrast with previous behavior
- Wrap at 72 characters per line
- Separate from header with a blank line

## Footer (Optional)

- Reference issues: `Fixes #123`, `Closes #456`, `Refs #789`
- Breaking changes: Start with `BREAKING CHANGE:` followed by description
- Co-authors: `Co-authored-by: Name <email@example.com>`

## Examples

### Simple Feature

```
feat(auth): add Google OAuth integration

Integrate Google OAuth for user authentication and Gmail access.
Users can now sign in with their Google account and connect Gmail
for email alerts.

Fixes #15
```

### Bug Fix

```
fix(alerts): resolve cron parsing for timezone-aware schedules

Previously, cron expressions were parsed without timezone context,
causing alerts to fire at incorrect times for users in different
timezones.

Fixes #42
```

### Breaking Change

```
feat(api): update alert creation endpoint structure

BREAKING CHANGE: Alert creation now requires a nested 'template' 
object instead of flat 'title' and 'body' properties.

Before: { title: "...", body: "..." }
After: { template: { title: "...", body: "..." } }

Fixes #28
```

### Documentation

```
docs: update README with Twilio WhatsApp setup instructions

Add detailed steps for configuring Twilio WhatsApp Business API
including sandbox setup for development testing.
```

### Chore/Maintenance

```
chore(deps): update Next.js to version 14.2.15

Update Next.js and related packages for security patches and
performance improvements.
```

### Refactoring

```
refactor(ui): extract common form validation logic

Move reusable form validation functions to shared utilities
to reduce code duplication across alert creation forms.
```

## Commit Message Rules

### Do ✅

- Keep the header under 50 characters
- Use present tense, imperative mood
- Start with lowercase after the colon
- Be specific and descriptive
- Reference issues when applicable
- Group related changes in single commits
- Write clear, self-explanatory messages

```bash
# Good examples
git commit -m "feat(alerts): add WhatsApp message scheduling"
git commit -m "fix(auth): handle expired OAuth tokens gracefully"
git commit -m "docs: add API endpoint documentation"
git commit -m "refactor(db): optimize user query performance"
```

### Don't ❌

- Use vague messages
- Exceed character limits
- Mix multiple unrelated changes
- Use past tense
- End with punctuation
- Capitalize first letter of description

```bash
# Bad examples
git commit -m "Fixed stuff"
git commit -m "WIP"
git commit -m "Updates"
git commit -m "Added new feature and fixed bugs and updated docs"
git commit -m "feat: Add WhatsApp Integration."
```

## Automated Tooling

### Commitizen

Install and use Commitizen for guided commits:

```bash
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# Use 'git cz' instead of 'git commit'
git cz
```

### Husky Pre-commit Hooks

Add commit message validation:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Add to package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### CommitLint Configuration

Create `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', 'fix', 'docs', 'style', 'refactor', 
        'perf', 'test', 'chore', 'ci', 'build', 'revert'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'auth', 'ui', 'api', 'db', 'alerts', 'integrations',
        'dashboard', 'jobs', 'config', 'deps'
      ]
    ]
  }
}
```

## Release Notes Generation

With conventional commits, release notes can be auto-generated:

```bash
# Install standard-version for automated versioning
npm install --save-dev standard-version

# Add to package.json scripts
{
  "scripts": {
    "release": "standard-version"
  }
}

# Generate changelog and version bump
npm run release
```

## Team Guidelines

### Code Review

- Verify commit messages follow conventions
- Ensure commits are atomic (single responsibility)
- Check that breaking changes are properly documented
- Confirm issue references are accurate

### Branch Naming

Align branch names with commit types:

```
feature/auth-google-oauth
fix/alert-timezone-bug
docs/api-documentation
refactor/form-validation
```

### Pull Request Titles

Use conventional commit format for PR titles:

```
feat(integrations): add Gmail polling with important email filter
fix(dashboard): resolve alert toggle state synchronization
```

## Benefits

Following these conventions provides:

1. **Automated Changelog Generation**: Tools can parse commits to generate release notes
2. **Semantic Versioning**: Automatic version bumping based on commit types
3. **Better Collaboration**: Clear, consistent commit history for team members
4. **Easier Debugging**: Quick identification of changes and their scope
5. **Tool Integration**: Better integration with CI/CD, issue trackers, and release tools

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [CommitLint](https://commitlint.js.org/)
- [Commitizen](https://commitizen.github.io/cz-cli/)

---

**Remember**: Good commit messages are a gift to your future self and your teammates. Take the time to write them well! 🎁