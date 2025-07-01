import AppDataSource from './config/database';
import { errorHandler, notFound } from './libs/error.handler';
import { uploadFile } from './app/middlewares/fileupload.middleware';
export { AppDataSource };
export { errorHandler, notFound };
export { uploadFile };
export { default as CategoryRoutes } from './routes/category.route';
export { default as RoleRoutes } from './routes/role.route';
export { default as StorageRoutes } from './routes/storage.route';
export { default as UserRoutes } from './routes/user.route';
export { default as CategoryService } from './app/services/category.service';
export { default as RoleService } from './app/services/role.service';
export { default as StorageService } from './app/services/storage.service';
export { UsersResolver } from './app/services/user.service';
export { default as CategorySchema } from './app/models/category.schema';
export { default as RoleSchema } from './app/models/role.schema';
export { default as StorageSchema } from './app/models/storage.schema';
export { default as Controller } from './libs/controller';
export { default as Response } from './libs/response';
export { default as Service } from './libs/service';
export declare class NodeMantra {
    private app;
    private port;
    private host;
    constructor(port?: number, host?: string);
    initialize(): Promise<any>;
    private setupMiddleware;
    private setupRoutes;
    start(): void;
}
export default NodeMantra;
//# sourceMappingURL=framework.d.ts.map