"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategory = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    status: joi_1.default.number().required(),
}).options({ abortEarly: false });
exports.updateCategory = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    status: joi_1.default.number().optional(),
}).options({ abortEarly: false });
exports.deleteCategory = joi_1.default.object({
    id: joi_1.default.string().required(),
});
//# sourceMappingURL=category.validator.js.map