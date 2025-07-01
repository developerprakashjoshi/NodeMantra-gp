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
exports.BaseService = void 0;
const service_1 = __importDefault(require("../../libs/service"));
class BaseService extends service_1.default {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    /**
     * Get all records
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    /**
     * Get a single record by ID
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { id } });
        });
    }
    /**
     * Create a new record
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = this.repository.create(data);
            return yield this.repository.save(record);
        });
    }
    /**
     * Update a record
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, data);
            return yield this.findById(id);
        });
    }
    /**
     * Delete a record
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
    /**
     * Find records with pagination
     */
    findWithPagination(page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [records, total] = yield this.repository.findAndCount({
                skip,
                take: limit
            });
            return {
                records,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };
        });
    }
    /**
     * Find records with conditions
     */
    findBy(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({ where: conditions });
        });
    }
    /**
     * Find one record with conditions
     */
    findOneBy(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: conditions });
        });
    }
}
exports.BaseService = BaseService;
exports.default = BaseService;
//# sourceMappingURL=base.service.js.map