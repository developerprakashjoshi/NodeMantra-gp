import { Request, Response } from 'express';
import Controller from '@libs/controller';
export declare class BaseController extends Controller {
    protected service: any;
    constructor(service: any);
    /**
     * Get all records
     */
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get a single record by ID
     */
    show(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Create a new record
     */
    store(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Update a record
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Delete a record
     */
    destroy(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default BaseController;
//# sourceMappingURL=base.controller.d.ts.map