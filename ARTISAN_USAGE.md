# Using NodeMantra Artisan in Your Projects

This guide explains how to use the NodeMantra Artisan command-line interface in projects created with `npx create-nodemantra`.

## Quick Start

### 1. Create a New Project

```bash
npx create-nodemantra my-awesome-app
cd my-awesome-app
npm install
```

### 2. Verify Artisan Installation

After installation, you should see the Artisan files in your project:

```
my-awesome-app/
├── .node_mantra/
│   └── sdk/
│       ├── artisan.ts
│       ├── util/
│       │   └── String.ts
│       └── template/
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
├── src/
├── package.json
└── README.md
```

### 3. Check Available Commands

```bash
npm run artisan list
```

## Available Commands

### Make Commands

#### Create a Complete Resource
```bash
npm run artisan make:resource User
```
This creates all files for a complete CRUD resource:
- `src/app/controllers/user.controller.ts`
- `src/app/models/user.schema.ts`
- `src/app/services/user.service.ts`
- `src/app/validators/user.validator.ts`
- `src/routes/user.route.ts`

#### Create Individual Components

```bash
# Create a controller
npm run artisan make:controller Post

# Create a model
npm run artisan make:model Category

# Create a service
npm run artisan make:service Comment

# Create a validator
npm run artisan make:validator Post

# Create a route
npm run artisan make:route Post

# Create middleware
npm run artisan make:middleware Auth

# Create tests
npm run artisan make:test User

# Create seeder
npm run artisan make:seeder User

# Create migration
npm run artisan make:migration CreateUsersTable
```

### Database Commands

```bash
# Run migrations
npm run artisan db:migrate

# Run seeders
npm run artisan db:seed

# Rollback migrations
npm run artisan db:rollback
```

### Utility Commands

```bash
# List all routes
npm run artisan route:list

# Generate application key
npm run artisan key:generate

# Clear cache
npm run artisan clear:cache

# Clear logs
npm run artisan clear:logs

# Start development server
npm run artisan serve
```

## Real-World Example: Building a Blog

Let's build a complete blog system using Artisan commands:

### 1. Create the Blog Resources

```bash
# Create Post resource
npm run artisan make:resource Post

# Create Category resource
npm run artisan make:resource Category

# Create Comment resource
npm run artisan make:resource Comment

# Create User resource (if not already exists)
npm run artisan make:resource User
```

### 2. Create Authentication Middleware

```bash
npm run artisan make:middleware Auth
```

### 3. Create Tests

```bash
npm run artisan make:test Post
npm run artisan make:test Category
npm run artisan make:test Comment
```

### 4. Create Seeders

```bash
npm run artisan make:seeder Post
npm run artisan make:seeder Category
npm run artisan make:seeder Comment
```

### 5. Create Migrations

```bash
npm run artisan make:migration CreatePostsTable
npm run artisan make:migration CreateCategoriesTable
npm run artisan make:migration CreateCommentsTable
```

### 6. Run Database Operations

```bash
# Run migrations
npm run artisan db:migrate

# Seed the database
npm run artisan db:seed
```

### 7. Start Development

```bash
npm run artisan serve
```

## File Structure After Using Artisan

After running the above commands, your project structure will look like:

```
my-awesome-app/
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── post.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── comment.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── models/
│   │   │   ├── post.schema.ts
│   │   │   ├── category.schema.ts
│   │   │   ├── comment.schema.ts
│   │   │   └── user.schema.ts
│   │   ├── services/
│   │   │   ├── post.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── comment.service.ts
│   │   │   └── user.service.ts
│   │   ├── validators/
│   │   │   ├── post.validator.ts
│   │   │   ├── category.validator.ts
│   │   │   ├── comment.validator.ts
│   │   │   └── user.validator.ts
│   │   └── middlewares/
│   │       └── auth.middleware.ts
│   ├── routes/
│   │   ├── post.route.ts
│   │   ├── category.route.ts
│   │   ├── comment.route.ts
│   │   └── user.route.ts
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 20231201120000_create_posts_table.ts
│   │   │   ├── 20231201120001_create_categories_table.ts
│   │   │   └── 20231201120002_create_comments_table.ts
│   │   └── seeders/
│   │       ├── post.seeder.ts
│   │       ├── category.seeder.ts
│   │       └── comment.seeder.ts
│   └── tests/
│       ├── post.test.ts
│       ├── category.test.ts
│       └── comment.test.ts
└── .node_mantra/
    └── sdk/
        ├── artisan.ts
        ├── util/
        └── template/
```

## Customizing Templates

You can customize the generated files by modifying the templates in `.node_mantra/sdk/template/`:

### Template Variables

All templates have access to these variables:

- `className`: PascalCase version (e.g., "UserController")
- `classNameLowerCase`: lowercase version (e.g., "user")
- `classNameCamelCase`: camelCase version (e.g., "userController")
- `classNameUpperCase`: UPPERCASE version (e.g., "USER")
- `classNameKebabCase`: kebab-case version (e.g., "user-controller")
- `classNameSnakeCase`: snake_case version (e.g., "user_controller")

### Example: Customizing Controller Template

Edit `.node_mantra/sdk/template/app/controllers/starter.controller.ejs`:

```ejs
import { Request, Response } from "express";
import <%= className %>Service from '@services/<%= classNameLowerCase %>.service'
import Controller from "@libs/controller";

export default class <%= className %>Controller extends Controller {
  // Your custom controller logic here
  static async customMethod(req: Request, res: Response) {
    // Custom implementation
  }
}
```

## Best Practices

### 1. Naming Conventions

- Use singular names for models: `User`, `Post`, `Category`
- Use descriptive names: `CreateUsersTable`, `AddEmailToUsers`
- Follow camelCase for file names: `userController`, `postService`

### 2. Resource Creation

- Use `make:resource` for complete CRUD operations
- Use individual commands for specific components
- Always create tests for your resources

### 3. Database Workflow

- Create migrations before models
- Use descriptive migration names
- Always test migrations in development first
- Use seeders for development data

### 4. Testing

- Create tests for all resources
- Use descriptive test names
- Test both success and error cases

## Troubleshooting

### Common Issues

1. **Command not found**
   ```bash
   # Make sure you're in the project root
   cd my-awesome-app
   npm run artisan list
   ```

2. **Template errors**
   ```bash
   # Check if template files exist
   ls .node_mantra/sdk/template/
   ```

3. **Permission errors**
   ```bash
   # Ensure write permissions
   chmod -R 755 .node_mantra/
   ```

### Getting Help

```bash
# Show all commands
npm run artisan list

# Show help for specific command
npm run artisan make:resource --help
```

## Integration with Existing Projects

If you have an existing NodeMantra project without Artisan:

1. Copy the `.node_mantra` directory from a new project
2. Add the artisan script to your `package.json`:
   ```json
   {
     "scripts": {
       "artisan": "ts-node ./.node_mantra/sdk/artisan.ts"
     }
   }
   ```
3. Install EJS dependency:
   ```bash
   npm install ejs
   ```

## Next Steps

- Read the [Complete Artisan Documentation](ARTISAN.md)
- Explore the [NodeMantra Core Documentation](USAGE.md)
- Check out the [GitHub Repository](https://github.com/developerprakashjoshi/nodemantra-core)

Happy coding with NodeMantra Artisan! 🚀 