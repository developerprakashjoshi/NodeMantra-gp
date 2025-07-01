"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryStatus = void 0;
const mongoose_1 = require("mongoose");
var CategoryStatus;
(function (CategoryStatus) {
    CategoryStatus[CategoryStatus["Active"] = 1] = "Active";
    CategoryStatus[CategoryStatus["Inactive"] = 0] = "Inactive";
})(CategoryStatus = exports.CategoryStatus || (exports.CategoryStatus = {}));
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, enum: [0, 1], default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
const Category = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = Category;
//# sourceMappingURL=category.schema.js.map