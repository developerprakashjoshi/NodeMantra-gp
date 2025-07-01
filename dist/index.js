"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
require("module-alias/register");
require("./module-alias");
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Load environment variables based on NODE_ENV
switch (process.env.NODE_ENV) {
    case 'production':
        dotenv_1.default.config({ path: '.env.production' });
        console.log("Connect to production environment");
        break;
    case 'development':
        dotenv_1.default.config({ path: '.env.development' });
        console.log("Connect to development environment");
        break;
    case 'stage':
        dotenv_1.default.config({ path: '.env.stage' });
        console.log("Connect to stage environment");
        break;
    default:
        console.log("Cannot connect to environment");
}
// Export the framework
__exportStar(require("./framework"), exports);
var framework_1 = require("./framework");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(framework_1).default; } });
//# sourceMappingURL=index.js.map