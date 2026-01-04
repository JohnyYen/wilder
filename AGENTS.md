# AGENTS.md

This file provides guidelines for agentic coding agents working in this repository.

## Project Overview

This is a lightweight CLI wrapper for npm that automatically injects a custom registry in all commands. The project is written in plain JavaScript (CommonJS module system) with no build step required. Features dynamic registry configuration via a local `.wilderrc` file with URL validation and accessibility checking.

## Build, Lint, and Test Commands

### Running the Application
```bash
# Run directly with node
node wilder.js <command>

# Or use as a CLI tool after npm link
wilder install
wilder add <package>
```

### Testing
```bash
# Run tests (currently no tests configured)
npm test

# Manual testing - registry management
node wilder.js get-registry
node wilder.js set-registry https://registry.npmjs.org/
node wilder.js reset-registry

# Manual testing - npm commands
node wilder.js install
node wilder.js add lodash
node wilder.js add axios --save-dev
```

### Linting
```bash
# No linting configured - add ESLint if desired
npm init -y
npm install --save-dev eslint
npx eslint .
```

## Code Style Guidelines

### General Principles
- Write clear, readable code with meaningful variable names
- Keep functions focused and small (ideally < 50 lines)
- Use async/await for asynchronous operations
- Handle errors gracefully with proper error messages
- Always call `closeReadline()` before exiting to avoid hanging processes

### File Organization
- Main entry point: `wilder.js` - CLI command parsing and execution
- Configuration module: `config.js` - Registry configuration management
- Utilities: `utils.js` - Shared utility functions
- Keep the codebase flat; avoid deep directory structures
- One logical module per file

### Import Conventions (CommonJS)
```javascript
// Use require() for CommonJS imports
const { spawn } = require('child_process');
const { getCurrentRegistry, writeConfig } = require('./config');
const { findPackageManagerPath } = require('./utils');

// Order imports: built-in modules first, then external, then local
```

### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings
- No trailing commas
- Semicolons required at statement ends
- Max line length: 100 characters
- Use blank lines to separate logical sections within functions
- JSON files use 2 spaces for indentation

### Naming Conventions
- **Files**: kebab-case (e.g., `utils.js`, `config.js`, `wilder.js`)
- **Variables/Constants**: camelCase (e.g., `currentRegistry`, `npmPath`)
- **Constants**: UPPER_SNAKE_CASE for configuration constants (e.g., `DEFAULT_REGISTRY`, `CONFIG_FILE`)
- **Functions**: camelCase, verb-first naming (e.g., `handleSetRegistry`, `validateRegistryUrl`)
- **Classes** (if added): PascalCase
- **Config files**: dot-prefix (e.g., `.wilderrc`, `.npmrc`)

### Types and Type Checking
- This is a plain JavaScript project (no TypeScript)
- Use JSDoc comments for function documentation when helpful
- Validate function inputs early and throw descriptive errors
- Handle null/undefined gracefully (e.g., `readConfig()` returns null if file doesn't exist)

### Error Handling
- Use try/catch blocks for async operations
- Always call `closeReadline()` before exiting on error
- Provide user-friendly error messages (no stack traces for end users)
- Exit with appropriate codes: `process.exit(1)` for errors, `process.exit(0)` for success
- Wrap errors with context when re-throwing
- Validate URL format and accessibility before saving configuration

### Example Pattern
```javascript
async function exampleFunction() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (err) {
    console.error('❌ Descriptive error message:', err.message);
    closeReadline();
    process.exit(1);
  }
}
```

### CLI and User Interaction
- Use clear console messages with emojis for visual feedback (✅ ❌ ⚠️)
- Provide helpful prompts for user input (yes/no questions)
- Always inherit stdio for child processes (`stdio: "inherit"`)
- Use readline interface for user consent prompts
- Normalize URLs by adding trailing slash if missing

### Registry Configuration
- Registry configuration is stored in `.wilderrc` in the project directory
- Default registry is defined as a constant in `config.js`: `DEFAULT_REGISTRY`
- When adding features, ensure registry flag `--registry=<url>` is passed to all npm commands
- Validate both URL format and accessibility before saving
- Ask user consent if URL is not accessible but has valid format
- Normalize URLs to always end with `/`

### URL Validation
- Format validation: Must be a valid URL starting with `http://` or `https://`
- Accessibility validation: Make HTTP HEAD request to verify URL is reachable
- Timeout: 5 seconds for accessibility check
- Consider accessible if status code is 200-499 (404 may indicate registry is valid but package not found)
- Ask user consent if validation fails

### Command Pattern
The wrapper uses a command-based pattern:
1. Parse CLI arguments
2. Check for special commands (`set-registry`, `get-registry`, `reset-registry`)
3. Execute special command or delegate to npm
4. Always exit with appropriate code

## Adding New Features

1. Add utility functions to `utils.js` and export them
2. Add configuration functions to `config.js` and export them
3. Import and use new functions in `wilder.js`
4. Update this AGENTS.md if adding new conventions
5. Update README.md for user-facing changes
6. Add examples to README for new commands

## Common Tasks

### Adding a New Special Command
1. Create a handler function in `wilder.js` (e.g., `handleNewCommand()`)
2. Add command check in main async IIFE
3. Handle errors gracefully with try/catch
4. Always call `closeReadline()` before exiting
5. Update README with command documentation

### Modifying Registry Configuration
1. Edit `DEFAULT_REGISTRY` constant in `config.js`
2. Update `.wilderrc.example` if default changes
3. Test with `node wilder.js get-registry` and `node wilder.js reset-registry`

### Changing Validation Logic
1. Modify `normalizeRegistryUrl()` or `validateRegistryUrl()` in `config.js`
2. Test with various URL formats
3. Update README if validation behavior changes

## Security Considerations
- Never log or expose secrets/credentials
- Validate all user input before processing (especially URLs)
- Use `execSync` and `spawn` with controlled commands only
- Pass user input as arguments, not in command strings
- Be cautious with URLs containing authentication (user:pass@host)
- `.wilderrc` file should not be committed to version control

## Testing Checklist
- Test all special commands (`set-registry`, `get-registry`, `reset-registry`)
- Test with valid accessible URL
- Test with valid but inaccessible URL (should prompt user)
- Test with invalid URL format (should error immediately)
- Test npm commands work with current registry
- Test that `closeReadline()` is called before all exits
- Test error messages are user-friendly
- Test with various URL formats (with/without trailing slash, with auth, etc.)
