"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = __importDefault(require("@controllers/company.controller"));
const validator_middleware_1 = __importDefault(require("@middlewares/validator.middleware"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const company_validator_1 = require("@validators/company.validator");
const route = express_1.default.Router();
const upload = (0, multer_1.default)({ storage });
route.get('/datatable', company_controller_1.default.datatable);
route.get('/count', company_controller_1.default.count);
route.get('/', company_controller_1.default.getCompanies);
route.get('/:id', company_controller_1.default.getCompany);
route.post('/', (0, validator_middleware_1.default)(company_validator_1.createCompany), company_controller_1.default.createCompany);
route.patch('/ceo-avtar/:id', upload.single('file'), company_controller_1.default.uploadCeoAvtar);
route.patch('/logo/:id', upload.single('file'), company_controller_1.default.uploadCompanyLogo);
route.patch('/photo/:id', upload.single('file'), company_controller_1.default.uploadPhoto);
route.patch('/:id', (0, validator_middleware_1.default)(company_validator_1.updateCompany), company_controller_1.default.updateCompany);
route.delete('/:id', (0, validator_middleware_1.default)(company_validator_1.deleteCompany), company_controller_1.default.deleteCompany);
exports.default = route;