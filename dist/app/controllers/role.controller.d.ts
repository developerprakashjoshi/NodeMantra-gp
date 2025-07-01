import { Request, Response } from "express";
import Controller from "@libs/controller";
export default class RoleController extends Controller {
    static count(req: Request, res: Response): Promise<void>;
    static getRoles(req: Request, res: Response): Promise<void>;
    static getRole(req: Request, res: Response): Promise<void>;
    static createRole(req: Request, res: Response): Promise<void>;
    static updateRole(req: Request, res: Response): Promise<void>;
    static deleteRole(req: Request, res: Response): Promise<void>;
    static datatable(req: Request, res: Response): Promise<void>;
    static search(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=role.controller.d.ts.map