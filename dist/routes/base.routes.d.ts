import { Router } from 'express';
import { BaseController } from '@controllers/base.controller';
export declare class BaseRoutes {
    protected router: Router;
    protected controller: BaseController;
    constructor(controller: BaseController);
    protected setupRoutes(): void;
    getRouter(): Router;
}
export default BaseRoutes;
//# sourceMappingURL=base.routes.d.ts.map