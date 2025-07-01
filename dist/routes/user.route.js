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
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const express_graphql_1 = require("express-graphql");
const user_service_1 = require("@services/user.service");
const route = express_1.default.Router();
const getSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [user_service_1.UsersResolver],
        emitSchemaFile: true,
    });
    return schema;
});
route.use('/', (0, express_graphql_1.graphqlHTTP)(() => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        schema: yield getSchema(),
        graphiql: process.env.NODE_ENV === 'development' ? true : false,
    });
})));
exports.default = route;
//# sourceMappingURL=user.route.js.map