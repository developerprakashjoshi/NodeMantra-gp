"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
exports.morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms\n" +
    "User Type: :user-type\n" +
    "Request Body: :req-body\n", {
    stream: {
        write: (message) => {
            // You can customize how the log is written, e.g., send to a logging service
            console.log(message);
        },
    },
});
//# sourceMappingURL=morgan.middleware.js.map