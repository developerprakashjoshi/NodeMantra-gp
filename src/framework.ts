// NodeMantra Core Framework Entry Point
import AppDataSource from './config/database';
import { errorHandler, notFound } from './libs/error.handler';
import { uploadFile } from './app/middlewares/fileupload.middleware';

// Export core components
export { AppDataSource };
export { errorHandler, notFound };
export { uploadFile };

// Export base classes
export { default as BaseController } from './app/controllers/base.controller';
export { default as BaseService } from './app/services/base.service';
export { default as BaseModel } from './app/models/base.model';
export { default as BaseRoutes } from './routes/base.routes';

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