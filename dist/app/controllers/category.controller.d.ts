import { Request, Response } from "express";
import Controller from "@libs/controller";
export default class CategoryController extends Controller {
    static count(req: Request, res: Response): Promise<void>;
    static getCategorys(req: Request, res: Response): Promise<void>;
    static getCategory(req: Request, res: Response): Promise<void>;
    static createCategory(req: Request, res: Response): Promise<void>;
    static updateCategory(req: Request, res: Response): Promise<void>;
    static deleteCategory(req: Request, res: Response): Promise<void>;
    static datatable(req: Request, res: Response): Promise<void>;
    static search(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=category.controller.d.ts.map