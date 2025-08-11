module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type validation
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Tests
        'chore',    // Maintenance
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Revert previous commit
      ]
    ],
    // Scope validation
    'scope-enum': [
      2,
      'always',
      [
        'auth',         // Authentication
        'ui',           // User interface
        'api',          // API endpoints
        'db',           // Database
        'alerts',       // Alert management
        'integrations', // Third-party integrations
        'dashboard',    // Dashboard pages
        'jobs',         // Background jobs
        'config',       // Configuration
        'deps'          // Dependencies
      ]
    ],
    // Subject rules
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50],
    'subject-min-length': [2, 'always', 5],

    // Type rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Scope rules
    'scope-case': [2, 'always', 'lower-case'],

    // Header rules
    'header-max-length': [2, 'always', 72],

    // Body rules
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 72],

    // Footer rules  
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 72]
  },
  // Custom parser options
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\(([^)]*)\))?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  // Ignore certain patterns
  ignores: [(commit) => commit.includes('WIP')],
  // Default ignore rules
  defaultIgnores: true,
  // Help URL
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
}