# NodeMantra Artisan - Command Line Interface

NodeMantra Artisan is a powerful command-line interface that provides a variety of helpful commands for building NodeMantra applications. It's inspired by Laravel's Artisan and provides similar functionality for Node.js applications.

## Installation

NodeMantra Artisan comes pre-installed with NodeMantra Core. You can access it using:

```bash
# Using npx
npx nodemantra <command>

# Or if installed globally
nodemantra <command>

# Or using npm script
npm run artisan <command>
```

## Available Commands

### Make Commands

#### `make:controller <name>`

Create a new controller class.

```bash
nodemantra make:controller User
```

This will create:

- `src/app/controllers/user.controller.ts`

#### `make:model <name>`

Create a new model class.

```bash
nodemantra make:model User
```

This will create:

- `src/app/models/user.schema.ts`

#### `make:service <name>`

Create a new service class.

```bash
nodemantra make:service User
```

This will create:

- `src/app/services/user.service.ts`

#### `make:validator <name>`

Create a new validator class.

```bash
nodemantra make:validator User
```

This will create:

- `src/app/validators/user.validator.ts`

#### `make:route <name>`

Create a new route file.

```bash
nodemantra make:route User
```

This will create:

- `src/routes/user.route.ts`

#### `make:middleware <name>`

Create a new middleware class.

```bash
nodemantra make:middleware Auth
```

This will create:

- `src/app/middlewares/auth.middleware.ts`

#### `make:test <name>`

Create a new test file.

```bash
nodemantra make:test User
```

This will create:

- `src/tests/user.test.ts`

#### `make:seeder <name>`

Create a new seeder class.

```bash
nodemantra make:seeder User
```

This will create:

- `src/database/seeders/user.seeder.ts`

#### `make:migration <name>`

Create a new migration file.

```bash
nodemantra make:migration CreateUsersTable
```

This will create:

- `src/database/migrations/YYYYMMDDHHMMSS_create_users_table.ts`

#### `make:resource <name>`

Create a complete resource (controller, model, service, validator, route).

```bash
nodemantra make:resource User
```

This will create all the files for a complete CRUD resource:

- `src/app/controllers/user.controller.ts`
- `src/app/models/user.schema.ts`
- `src/app/services/user.service.ts`
- `src/app/validators/user.validator.ts`
- `src/routes/user.route.ts`

### Database Commands

#### `db:seed [seeder]`

Run database seeders.

```bash
# Run all seeders
nodemantra db:seed

# Run specific seeder
nodemantra db:seed UserSeeder
```

#### `db:migrate`

Run database migrations.

```bash
nodemantra db:migrate
```

#### `db:rollback [steps]`

Rollback database migrations.

```bash
# Rollback last migration
nodemantra db:rollback

# Rollback multiple migrations
nodemantra db:rollback 3
```

### Route Commands

#### `route:list`

List all registered routes.

```bash
nodemantra route:list
```

### Cache Commands

#### `clear:cache`

Clear application cache.

```bash
nodemantra clear:cache
```

#### `clear:logs`

Clear application logs.

```bash
nodemantra clear:logs
```

#### `config:cache`

Cache configuration files.

```bash
nodemantra config:cache
```

#### `config:clear`

Clear configuration cache.

```bash
nodemantra config:clear
```

### Server Commands

#### `serve [--port=3000] [--host=localhost]`

Start the development server.

```bash
# Start with default settings
nodemantra serve

# Start with custom port
nodemantra serve --port=8080

# Start with custom host and port
nodemantra serve --host=0.0.0.0 --port=8080
```

### Utility Commands

#### `list`

List all available commands.

```bash
nodemantra list
```

#### `optimize`

Optimize the application for production.

```bash
nodemantra optimize
```

#### `key:generate`

Generate application key.

```bash
nodemantra key:generate
```

## Command Structure

All commands follow this pattern:

```bash
nodemantra <command> [arguments] [options]
```

### Arguments

Arguments are required parameters for the command.

### Options

Options are optional parameters that modify the command behavior.

## Examples

### Creating a Complete Blog System

```bash
# Create the Post resource
nodemantra make:resource Post

# Create the Category resource
nodemantra make:resource Category

# Create the Comment resource
nodemantra make:resource Comment

# Create authentication middleware
nodemantra make:middleware Auth

# Create tests
nodemantra make:test Post
nodemantra make:test Category
nodemantra make:test Comment

# Create seeders
nodemantra make:seeder Post
nodemantra make:seeder Category
nodemantra make:seeder Comment

# Run migrations
nodemantra db:migrate

# Seed the database
nodemantra db:seed

# Start the development server
nodemantra serve
```

### Working with Migrations

```bash
# Create a migration for users table
nodemantra make:migration CreateUsersTable

# Create a migration for posts table
nodemantra make:migration CreatePostsTable

# Run all pending migrations
nodemantra db:migrate

# Rollback the last migration
nodemantra db:rollback

# Rollback 3 migrations
nodemantra db:rollback 3
```

## Custom Commands

You can extend Artisan by creating custom commands. Create a new command class in your application and register it with Artisan.

### Creating a Custom Command

```typescript
// src/commands/CustomCommand.ts
import { Command } from 'nodemantra-core';

export class CustomCommand implements Command {
  name = 'custom:command';
  description = 'Description of your custom command';
  usage = 'custom:command [argument]';

  async execute(args: string[]): Promise<void> {
    // Your command logic here
    console.log('Custom command executed with args:', args);
  }
}
```

## File Templates

Artisan uses EJS templates to generate files. You can customize these templates by modifying the files in `.node_mantra/sdk/template/`.

### Template Variables

All templates have access to these variables:

- `className`: PascalCase version of the name (e.g., "UserController")
- `classNameLowerCase`: lowercase version of the name (e.g., "user")
- `classNameCamelCase`: camelCase version of the name (e.g., "userController")
- `classNameUpperCase`: UPPERCASE version of the name (e.g., "USER")
- `classNameKebabCase`: kebab-case version of the name (e.g., "user-controller")
- `classNameSnakeCase`: snake_case version of the name (e.g., "user_controller")

## Error Handling

Artisan provides clear error messages and helpful suggestions when commands fail:

```bash
❌ Command "unknown:command" not found.
Run 'nodemantra list' to see all available commands.
```

## Best Practices

1. **Use descriptive names**: Choose clear, descriptive names for your resources
2. **Follow naming conventions**: Use singular names for models, plural for controllers
3. **Run tests**: Always create and run tests for your new features
4. **Use migrations**: Always use migrations for database changes
5. **Seed data**: Use seeders for development and testing data

## Troubleshooting

### Common Issues

1. **Command not found**: Make sure you're running the command from the project root
2. **Template errors**: Check that all template files exist in `.node_mantra/sdk/template/`
3. **Permission errors**: Ensure you have write permissions in the project directory

### Getting Help

```bash
# Show all commands
nodemantra list

# Show help for a specific command
nodemantra <command> --help
```

## Contributing

To contribute to NodeMantra Artisan:

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Add tests for new functionality
5. Submit a pull request

## License

NodeMantra Artisan is part of NodeMantra Core and is licensed under the MIT License.
