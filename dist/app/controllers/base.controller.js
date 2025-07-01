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
exports.BaseController = void 0;
const controller_1 = __importDefault(require("../../libs/controller"));
class BaseController extends controller_1.default {
    constructor(service) {
        super();
        this.service = service;
    }
    /**
     * Get all records
     */
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.service.findAll();
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Records retrieved successfully',
                    data: records
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            }
        });
    }
    /**
     * Get a single record by ID
     */
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const record = yield this.service.findById(id);
                if (!record) {
                    return res.status(404).json({
                        success: false,
                        statusCode: 404,
                        message: 'Record not found'
                    });
                }
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Record retrieved successfully',
                    data: record
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            }
        });
    }
    /**
     * Create a new record
     */
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.service.create(req.body);
                return res.status(201).json({
                    success: true,
                    statusCode: 201,
                    message: 'Record created successfully',
                    data: record
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            }
        });
    }
    /**
     * Update a record
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const record = yield this.service.update(id, req.body);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Record updated successfully',
                    data: record
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            }
        });
    }
    /**
     * Delete a record
     */
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.service.delete(id);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Record deleted successfully'
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            }
        });
    }
}
exports.BaseController = BaseController;
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map