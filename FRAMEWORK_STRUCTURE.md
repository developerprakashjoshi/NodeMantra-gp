# NodeMantra Framework Structure Guide

This document outlines the correct structure that should be followed when creating new projects with `create-nodemantra.js`, based on the actual framework structure in the `src` folder.

## Project Structure Overview

When you create a new NodeMantra project using `npx create-nodemantra <project-name>`, the following structure should be generated:

```
project-name/
├── src/
│   ├── app/                          # Application layer
│   │   ├── controllers/              # Request handlers
│   │   ├── services/                 # Business logic
│   │   ├── models/                   # Data models/schemas
│   │   ├── middlewares/              # Custom middleware
│   │   ├── validators/               # Request validation
│   │   ├── requests/                 # Request DTOs
│   │   └── graphschema/              # GraphQL schemas
│   ├── config/                       # Configuration files
│   ├── database/                     # Database related files
│   │   ├── migrations/               # Database migrations
│   │   └── seeders/                  # Database seeders
│   ├── routes/                       # Route definitions
│   ├── middlewares/                  # Global middleware
│   ├── libs/                         # Library files
│   ├── utils/                        # Utility functions
│   ├── tests/                        # Test files
│   ├── storage/                      # File storage
│   ├── vendor/                       # Third-party integrations
│   ├── lang/                         # Language files
│   ├── framework.ts                  # Framework initialization
│   ├── index.ts                      # Application entry point
│   ├── websocket.ts                  # WebSocket configuration
│   └── module-alias.ts               # TypeScript path aliases
├── .node_mantra/                     # Artisan CLI tools
│   └── sdk/
│       ├── artisan.ts                # Main artisan file
│       ├── util/                     # Utility functions
│       └── template/                 # Code generation templates
│           ├── app/
│           │   ├── controllers/
│           │   ├── models/
│           │   ├── services/
│           │   ├── validators/
│           │   └── middlewares/
│           ├── routes/
│           ├── tests/
│           └── database/
│               ├── seeders/
│               └── migrations/
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── nodemon.json                      # Nodemon configuration
└── README.md                         # Project documentation
```

## Key Directory Explanations

### `/src/app/` - Application Layer
This is the core application layer where your business logic resides:

- **`controllers/`**: Handle HTTP requests and responses
- **`services/`**: Contain business logic and data processing
- **`models/`**: Define data models, schemas, and database entities
- **`middlewares/`**: Custom middleware for request processing
- **`validators/`**: Request validation logic
- **`requests/`**: Request DTOs (Data Transfer Objects)
- **`graphschema/`**: GraphQL schema definitions

### `/src/config/` - Configuration
Contains all configuration files for different aspects of your application:
- Database configuration
- Authentication settings
- CORS settings
- Mail configuration
- Cache settings
- etc.

### `/src/database/` - Database Management
- **`migrations/`**: Database schema changes
- **`seeders/`**: Initial data population

### `/src/routes/` - Route Definitions
Define API endpoints and their handlers

### `/src/middlewares/` - Global Middleware
Application-wide middleware (logging, authentication, etc.)

### `/src/libs/` - Library Files
Reusable library components and utilities

### `/src/utils/` - Utility Functions
Helper functions and utilities

### `/src/tests/` - Testing
Unit tests, integration tests, and test utilities

### `/src/storage/` - File Storage
File upload handling and storage management

### `/src/vendor/` - Third-party Integrations
External service integrations and APIs

### `/src/lang/` - Internationalization
Multi-language support files

## Important Files

### `src/index.ts`
The main entry point of your application that bootstraps the NodeMantra framework.

### `src/framework.ts`
Framework initialization and configuration.

### `src/websocket.ts`
WebSocket server configuration and setup.

### `src/module-alias.ts`
TypeScript path alias configuration for clean imports.

## TypeScript Path Aliases

The framework uses the following path aliases for clean imports:

```typescript
{
  "@/*": ["*"],
  "@models/*": ["models/*"],
  "@services/*": ["services/*"],
  "@controllers/*": ["controllers/*"],
  "@routes/*": ["routes/*"],
  "@middlewares/*": ["middlewares/*"],
  "@config/*": ["config/*"]
}
```

## Artisan CLI Structure

The `.node_mantra/sdk/` directory contains the Artisan CLI tools:

- **`artisan.ts`**: Main CLI entry point
- **`util/`**: Helper functions for code generation
- **`template/`**: EJS templates for generating code files

## Code Generation Templates

The framework includes templates for generating:
- Controllers
- Models/Schemas
- Services
- Validators
- Middleware
- Routes
- Tests
- Seeders
- Migrations

## Best Practices

1. **Follow the layered architecture**: Keep controllers thin, business logic in services
2. **Use TypeScript**: Leverage type safety throughout the application
3. **Follow naming conventions**: Use kebab-case for files, PascalCase for classes
4. **Organize by feature**: Group related files together
5. **Use dependency injection**: Leverage the framework's DI container
6. **Write tests**: Include unit and integration tests
7. **Use environment variables**: Keep configuration separate from code

## Creating New Resources

Use the Artisan CLI to generate new resources:

```bash
npm run artisan make:resource User
```

This will create:
- User controller
- User service
- User model/schema
- User validator
- User routes
- User tests
- User seeder
- User migration

## Migration from create-nodemantra.js

The current `create-nodemantra.js` script should be updated to match this structure. The key differences are:

1. **App directory structure**: All application code should be under `src/app/`
2. **Framework files**: Include `framework.ts`, `websocket.ts`, `module-alias.ts`
3. **Additional directories**: Include `libs/`, `utils/`, `storage/`, `vendor/`, `lang/`
4. **Proper TypeScript configuration**: Include all necessary path aliases
5. **Artisan CLI structure**: Complete `.node_mantra/sdk/` structure with templates

This structure ensures consistency across all NodeMantra projects and provides a solid foundation for scalable applications. 