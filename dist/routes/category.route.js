"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("@controllers/category.controller"));
const validator_middleware_1 = __importDefault(require("@middlewares/validator.middleware"));
const category_validator_1 = require("@validators/category.validator");
const route = express_1.default.Router();
route.get('/search', category_controller_1.default.search);
route.get('/datatable', category_controller_1.default.datatable);
route.get('/count', category_controller_1.default.count);
route.get('/', category_controller_1.default.getCategorys);
route.get('/:id', category_controller_1.default.getCategory);
route.post('/', (0, validator_middleware_1.default)(category_validator_1.createCategory), category_controller_1.default.createCategory);
route.patch('/:id', (0, validator_middleware_1.default)(category_validator_1.updateCategory), category_controller_1.default.updateCategory);
route.delete('/:id', (0, validator_middleware_1.default)(category_validator_1.deleteCategory), category_controller_1.default.deleteCategory);
exports.default = route;
//# sourceMappingURL=category.route.js.map