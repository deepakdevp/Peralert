# Contributing to PerAlert

Thank you for your interest in contributing to PerAlert! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/peralert.git
   cd peralert
   ```
3. **Set up the development environment** (see [SETUP_GUIDE.md](./SETUP_GUIDE.md))
4. **Configure Git** for consistent commits:
   ```bash
   npm run setup:git
   ```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/description` - New features
- `fix/description` - Bug fixes  
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### 2. Make Your Changes

- Follow the existing code style and patterns
- Write tests for new functionality
- Update documentation as needed
- Ensure your code passes linting: `npm run lint`

### 3. Commit Your Changes

We follow [Conventional Commits](./COMMIT_CONVENTIONS.md) specification:

```bash
# Use the commit template
npm run commit

# Or manually follow the format
git commit -m "feat(auth): add Google OAuth integration"
```

**Commit Message Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### 4. Push and Create PR

```bash
git push origin your-branch-name
```

Create a Pull Request with:
- Clear title following commit conventions
- Detailed description of changes
- Screenshots for UI changes
- Reference to related issues

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Provide proper type definitions
- Avoid `any` type usage
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Keep components focused and reusable
- Use proper prop types

### API Routes

- Follow RESTful conventions
- Implement proper error handling
- Use Zod for input validation
- Include appropriate status codes

### Database

- Use Prisma for all database operations
- Write migrations for schema changes
- Follow naming conventions for models

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for UI elements
- Use descriptive test names

## Code Review Process

### For Contributors

1. **Self-review** your code before requesting review
2. **Test thoroughly** on different scenarios
3. **Update documentation** if needed
4. **Respond promptly** to review feedback

### For Reviewers

1. **Check functionality** - Does it work as intended?
2. **Review code quality** - Is it readable and maintainable?
3. **Verify tests** - Are there adequate tests?
4. **Check conventions** - Does it follow our standards?
5. **Security review** - Are there any security concerns?

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
├── components/            # Reusable React components
│   └── ui/               # Basic UI components
├── lib/                  # Utility libraries
├── inngest/              # Background job functions
└── types/                # TypeScript type definitions

prisma/
└── schema.prisma         # Database schema

scripts/                  # Build and setup scripts
```

## Issue Guidelines

### Reporting Bugs

Use the bug report template and include:
- **Environment details** (OS, browser, versions)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Console errors** if any

### Feature Requests

Use the feature request template and include:
- **Problem description** - What issue does this solve?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches
- **Additional context** - Screenshots, mockups, etc.

## Security

- **Never commit secrets** (API keys, passwords, etc.)
- **Use environment variables** for configuration
- **Follow security best practices** for authentication
- **Report security issues privately** to security@peralert.com

## Performance

- **Optimize images** before committing
- **Minimize bundle size** when adding dependencies
- **Use React best practices** (memo, useMemo, useCallback when needed)
- **Consider database query performance**

## Accessibility

- **Use semantic HTML** elements
- **Provide alt text** for images
- **Ensure keyboard navigation** works
- **Maintain proper contrast ratios**
- **Test with screen readers** when possible

## Documentation

### Code Comments

- **Comment complex logic** and business rules
- **Explain "why"** not "what"
- **Keep comments up-to-date** with code changes

### API Documentation

- **Document all endpoints** with examples
- **Include error responses**
- **Specify required vs optional parameters**

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backwards compatible)  
- **PATCH** version for backwards compatible bug fixes

### Automated Releases

Releases are automated based on conventional commits:
- `feat:` commits trigger minor version bumps
- `fix:` commits trigger patch version bumps
- `BREAKING CHANGE:` in commit message triggers major version bump

## Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Be patient** with new contributors
- **Provide constructive feedback**
- **Focus on the code**, not the person
- **Help others learn and grow**

### Communication

- **Use GitHub issues** for bug reports and feature requests
- **Use GitHub discussions** for questions and ideas
- **Use pull request comments** for code-specific discussions

## Getting Help

- **Read the documentation** first ([README.md](./README.md), [SETUP_GUIDE.md](./SETUP_GUIDE.md))
- **Search existing issues** before creating new ones
- **Join our community discussions** for questions
- **Contact maintainers** for urgent issues

## Recognition

Contributors are recognized in:
- **CONTRIBUTORS.md** file
- **GitHub contributors** section
- **Release notes** for significant contributions

---

Thank you for contributing to PerAlert! 🎉

Every contribution, no matter how small, makes a difference. Whether it's fixing a typo, reporting a bug, or implementing a new feature, your help makes PerAlert better for everyone.

Happy coding! 🚀