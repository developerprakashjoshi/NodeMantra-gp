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
exports.NodeMantra = exports.Service = exports.Response = exports.MeiliSearch = exports.Controller = exports.BaseRoutes = exports.BaseModel = exports.BaseService = exports.BaseController = exports.uploadFile = exports.notFound = exports.errorHandler = exports.AppDataSource = void 0;
// NodeMantra Core Framework Entry Point
const database_1 = __importDefault(require("./config/database"));
exports.AppDataSource = database_1.default;
const error_handler_1 = require("./libs/error.handler");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return error_handler_1.errorHandler; } });
Object.defineProperty(exports, "notFound", { enumerable: true, get: function () { return error_handler_1.notFound; } });
const fileupload_middleware_1 = require("./app/middlewares/fileupload.middleware");
Object.defineProperty(exports, "uploadFile", { enumerable: true, get: function () { return fileupload_middleware_1.uploadFile; } });
// Export base classes
var base_controller_1 = require("@controllers/base.controller");
Object.defineProperty(exports, "BaseController", { enumerable: true, get: function () { return __importDefault(base_controller_1).default; } });
var base_service_1 = require("@services/base.service");
Object.defineProperty(exports, "BaseService", { enumerable: true, get: function () { return __importDefault(base_service_1).default; } });
var base_model_1 = require("@models/base.model");
Object.defineProperty(exports, "BaseModel", { enumerable: true, get: function () { return __importDefault(base_model_1).default; } });
var base_routes_1 = require("@routes/base.routes");
Object.defineProperty(exports, "BaseRoutes", { enumerable: true, get: function () { return __importDefault(base_routes_1).default; } });
// Export libraries
var controller_1 = require("@libs/controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return __importDefault(controller_1).default; } });
var meili_search_1 = require("@libs/meili.search");
Object.defineProperty(exports, "MeiliSearch", { enumerable: true, get: function () { return __importDefault(meili_search_1).default; } });
var response_1 = require("@libs/response");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return __importDefault(response_1).default; } });
var service_1 = require("@libs/service");
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return __importDefault(service_1).default; } });
// Framework Class
class NodeMantra {
    constructor(port = 3000, host = 'localhost') {
        this.port = port;
        this.host = host;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize database
            yield database_1.default.initialize();
            // Initialize Express app
            const express = require('express');
            this.app = express();
            // Setup middleware
            this.setupMiddleware();
            // Setup routes
            this.setupRoutes();
            return this.app;
        });
    }
    setupMiddleware() {
        const cors = require('cors');
        const bodyParser = require('body-parser');
        const morgan = require('morgan');
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('combined'));
    }
    setupRoutes() {
        // Add your routes here
        this.app.get('/', (req, res) => {
            res.json({ message: 'NodeMantra Framework is running!' });
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`NodeMantra server running at http://${this.host}:${this.port}`);
        });
    }
}
exports.NodeMantra = NodeMantra;
// Default export
exports.default = NodeMantra;
//# sourceMappingURL=framework.js.map