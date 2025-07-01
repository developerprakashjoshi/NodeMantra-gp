import { Router } from 'express';
import { BaseController } from '@controllers/base.controller';

export class BaseRoutes {
  protected router: Router;
  protected controller: BaseController;

  constructor(controller: BaseController) {
    this.router = Router();
    this.controller = controller;
    this.setupRoutes();
  }

  protected setupRoutes() {
    // GET / - Get all records
    this.router.get('/', this.controller.index.bind(this.controller));
    
    // GET /:id - Get a single record
    this.router.get('/:id', this.controller.show.bind(this.controller));
    
    // POST / - Create a new record
    this.router.post('/', this.controller.store.bind(this.controller));
    
    // PUT /:id - Update a record
    this.router.put('/:id', this.controller.update.bind(this.controller));
    
    // DELETE /:id - Delete a record
    this.router.delete('/:id', this.controller.destroy.bind(this.controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default BaseRoutes; 