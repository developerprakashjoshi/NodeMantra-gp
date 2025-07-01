"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("@services/category.service"));
const controller_1 = __importDefault(require("@libs/controller"));
class CategoryController extends controller_1.default {
    static count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryService = new category_service_1.default();
            const result = yield categoryService.count();
            res.status(result.statusCode).json(result);
        });
    }
    static getCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryService = new category_service_1.default();
            const record = yield categoryService.list();
            res.status(record.statusCode).json(record);
        });
    }
    static getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let categoryService = new category_service_1.default();
            const records = yield categoryService.retrieve(id);
            res.status(records.statusCode).json(records);
        });
    }
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            let categoryService = new category_service_1.default();
            const result = yield categoryService.create(data);
            res.status(result.statusCode).json(result);
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            let categoryService = new category_service_1.default();
            const result = yield categoryService.update(id, data);
            res.status(result.statusCode).json(result);
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let categoryService = new category_service_1.default();
            const result = yield categoryService.delete(id);
            res.status(result.statusCode).json(result);
        });
    }
    static datatable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.query;
            let categoryService = new category_service_1.default();
            const records = yield categoryService.datatable(data);
            res.status(records.statusCode).json(records);
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query.q;
            let categoryService = new category_service_1.default();
            const results = yield categoryService.searchCategorys(query);
            res.status(results.statusCode).json(results);
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map