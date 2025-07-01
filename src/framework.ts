// NodeMantra Core Framework Entry Point
import AppDataSource from './config/database';
import { errorHandler, notFound } from './libs/error.handler';
import { uploadFile } from './app/middlewares/fileupload.middleware';

// Export core components
export { AppDataSource };
export { errorHandler, notFound };
export { uploadFile };

// Export routes
export { default as CategoryRoutes } from './routes/category.route';
export { default as RoleRoutes } from './routes/role.route';
export { default as StorageRoutes } from './routes/storage.route';
export { default as UserRoutes } from './routes/user.route';

// Export services
export { default as CategoryService } from './app/services/category.service';
export { default as RoleService } from './app/services/role.service';
export { default as StorageService } from './app/services/storage.service';
export { UsersResolver } from './app/services/user.service';

// Export models
export { default as CategorySchema } from './app/models/category.schema';
export { default as RoleSchema } from './app/models/role.schema';
export { default as StorageSchema } from './app/models/storage.schema';

// Export libraries
export { default as Controller } from './libs/controller';
export { default as Response } from './libs/response';
export { default as Service } from './libs/service';

// Framework Class
export class NodeMantra {
  private app: any;
  private port: number;
  private host: string;

  constructor(port: number = 3000, host: string = 'localhost') {
    this.port = port;
    this.host = host;
  }

  async initialize() {
    // Initialize database
    await AppDataSource.initialize();
    
    // Initialize Express app
    const express = require('express');
    this.app = express();
    
    // Setup middleware
    this.setupMiddleware();
    
    // Setup routes
    this.setupRoutes();
    
    return this.app;
  }

  private setupMiddleware() {
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('combined'));
  }

  private setupRoutes() {
    // Add your routes here
    this.app.get('/', (req: any, res: any) => {
      res.json({ message: 'NodeMantra Framework is running!' });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`NodeMantra server running at http://${this.host}:${this.port}`);
    });
  }
}

// Default export
export default NodeMantra; 