import AppDataSource from './config/database';
import { errorHandler, notFound } from './libs/error.handler';
import { uploadFile } from './app/middlewares/fileupload.middleware';
export { AppDataSource };
export { errorHandler, notFound };
export { uploadFile };
export { default as BaseController } from './app/controllers/base.controller';
export { default as BaseService } from './app/services/base.service';
export { default as BaseModel } from './app/models/base.model';
export { default as BaseRoutes } from './routes/base.routes';
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