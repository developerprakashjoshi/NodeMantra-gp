"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutes = void 0;
const express_1 = require("express");
class BaseRoutes {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.controller = controller;
        this.setupRoutes();
    }
    setupRoutes() {
        // GET / - Get all records
        this.router.get('/', this.controller.index.bind(this.controller));
        // GET /:id - Get a single record
        this.router.get('/:id', this.controller.show.bind(this.controller));
        // POST / - Create a new record
        this.router.post('/', this.controller.store.bind(this.controller));
        // PUT /:id - Update a record
        this.router.put('/:id', this.controller.update.bind(this.controller));
        // DELETE /:id - Delete a record
        this.router.delete('/:id', this.controller.destroy.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.BaseRoutes = BaseRoutes;
exports.default = BaseRoutes;
//# sourceMappingURL=base.routes.js.map