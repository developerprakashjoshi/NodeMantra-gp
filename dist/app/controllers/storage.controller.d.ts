import { Request, Response } from "express";
import Controller from "@libs/controller";
export default class RoleController extends Controller {
    static count(req: Request, res: Response): Promise<void>;
    static getStorages(req: Request, res: Response): Promise<void>;
    static getStorage(req: Request, res: Response): Promise<void>;
    static getStorageByFilename(req: Request, res: Response): Promise<void>;
    static upload(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static datatable(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=storage.controller.d.ts.map