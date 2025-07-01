# NodeMantra Core - Usage Guide

## Quick Start

### Installation

```bash
npm install nodemantra-core
```

### Basic Usage

```typescript
import NodeMantra from 'nodemantra-core';

// Create a new NodeMantra application
const app = new NodeMantra(3000, 'localhost');

// Initialize and start the application
app.initialize().then(() => {
  app.start();
});
```

## Creating a New Project

### 1. Initialize a New Project

```bash
# Create a new directory
mkdir my-nodemantra-app
cd my-nodemantra-app

# Initialize npm project
npm init -y

# Install NodeMantra Core
npm install nodemantra-core

# Install additional dependencies
npm install express cors dotenv
npm install -D typescript @types/node ts-node nodemon
```

### 2. Create TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 3. Create Project Structure

```
my-nodemantra-app/
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── services/
│   │   └── user.service.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   ├── config/
│   │   └── database.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

### 4. Basic Application Setup

Create `src/index.ts`:

```typescript
import NodeMantra from 'nodemantra-core';
import { AppDataSource } from 'nodemantra-core';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Create NodeMantra application
    const app = new NodeMantra(
      parseInt(process.env.PORT || '3000'),
      process.env.HOST || 'localhost'
    );

    // Initialize the application
    await app.initialize();
    
    // Start the server
    app.start();
    
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
```

### 5. Environment Configuration

Create `.env`:

```env
NODE_ENV=development
PORT=3000
HOST=localhost
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=nodemantra_db
JWT_SECRET_KEY=your-secret-key
```

## Advanced Usage

### Using Framework Components

```typescript
import NodeMantra, { 
  Controller, 
  Service, 
  Response, 
  errorHandler, 
  notFound,
  uploadFile 
} from 'nodemantra-core';
import express from 'express';

// Create a custom controller
class UserController extends Controller {
  async getUsers(req: express.Request, res: express.Response) {
    try {
      const users = await this.service.findAll();
      return Response.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }
}

// Create a custom service
class UserService extends Service {
  async findAll() {
    // Your business logic here
    return [];
  }
}

// Setup routes
const router = express.Router();
const userController = new UserController(new UserService());

router.get('/users', userController.getUsers.bind(userController));

// Add to your app
app.use('/api/v1', router);
```

### Database Integration

```typescript
import { AppDataSource } from 'nodemantra-core';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

// In your service
class UserService extends Service {
  async findAll() {
    return await AppDataSource.getRepository(User).find();
  }
}
```

### Middleware Usage

```typescript
import { uploadFile, errorHandler, notFound } from 'nodemantra-core';

// File upload middleware
app.post('/upload', uploadFile('memory'), (req, res) => {
  res.json({ file: req.body.file });
});

// Error handling
app.use(notFound);
app.use(errorHandler);
```

### Custom Middleware

```typescript
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // Verify token logic here
  next();
};

// Use in your app
app.use('/api/v1', authMiddleware);
```

## Project Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "mocha --require ts-node/register 'src/tests/**/*.test.ts'"
  }
}
```

## Complete Example Project

Here's a complete example of a NodeMantra Core project:

### Project Structure
```
my-nodemantra-app/
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── services/
│   │   └── user.service.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   ├── config/
│   │   └── database.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

### User Model (`src/models/user.model.ts`)
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### User Service (`src/services/user.service.ts`)
```typescript
import { Service } from 'nodemantra-core';
import { AppDataSource } from 'nodemantra-core';
import { User } from '../models/user.model';

export class UserService extends Service {
  private userRepository = AppDataSource.getRepository(User);

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
```

### User Controller (`src/controllers/user.controller.ts`)
```typescript
import { Controller } from 'nodemantra-core';
import { Response } from 'nodemantra-core';
import { Request, Response as ExpressResponse } from 'express';
import { UserService } from '../services/user.service';

export class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  async getUsers(req: Request, res: ExpressResponse) {
    try {
      const users = await this.userService.findAll();
      return Response.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }

  async getUser(req: Request, res: ExpressResponse) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);
      
      if (!user) {
        return Response.notFound(res, 'User not found');
      }
      
      return Response.success(res, user, 'User retrieved successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }

  async createUser(req: Request, res: ExpressResponse) {
    try {
      const user = await this.userService.create(req.body);
      return Response.created(res, user, 'User created successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }

  async updateUser(req: Request, res: ExpressResponse) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.update(id, req.body);
      return Response.success(res, user, 'User updated successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }

  async deleteUser(req: Request, res: ExpressResponse) {
    try {
      const id = parseInt(req.params.id);
      await this.userService.delete(id);
      return Response.success(res, null, 'User deleted successfully');
    } catch (error) {
      return Response.error(res, error.message);
    }
  }
}
```

### User Routes (`src/routes/user.routes.ts`)
```typescript
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/users', userController.getUsers.bind(userController));
router.get('/users/:id', userController.getUser.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export default router;
```

### Main Application (`src/index.ts`)
```typescript
import NodeMantra from 'nodemantra-core';
import { AppDataSource } from 'nodemantra-core';
import { errorHandler, notFound } from 'nodemantra-core';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  try {
    // Initialize database
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Create NodeMantra application
    const app = new NodeMantra(
      parseInt(process.env.PORT || '3000'),
      process.env.HOST || 'localhost'
    );

    // Initialize the application
    const expressApp = await app.initialize();
    
    // Add custom routes
    expressApp.use('/api/v1', userRoutes);
    
    // Add error handling
    expressApp.use(notFound);
    expressApp.use(errorHandler);
    
    // Start the server
    app.start();
    
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
```

## Running the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Testing

```bash
npm test
```

## Best Practices

1. **Use TypeScript**: Leverage TypeScript for better type safety
2. **Follow MVC Pattern**: Separate concerns into controllers, services, and models
3. **Use Environment Variables**: Keep configuration in `.env` files
4. **Implement Error Handling**: Use the built-in error handling middleware
5. **Use Database Transactions**: For complex database operations
6. **Implement Validation**: Validate input data using middleware
7. **Use Logging**: Implement proper logging for debugging
8. **Write Tests**: Create unit and integration tests

## Next Steps

- Explore the [NodeMantra Core documentation](https://github.com/developerprakashjoshi/nodemantra-core)
- Check out the [npm package](https://www.npmjs.com/package/nodemantra-core)
- Join the community and contribute to the framework 