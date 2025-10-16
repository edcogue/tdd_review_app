"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const reviewRoutes_1 = require("./routes/reviewRoutes");
const tsyringe_1 = require("tsyringe");
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    setupRoutes() {
        const reviewRouter = tsyringe_1.container.resolve(reviewRoutes_1.ReviewRouter);
        this.app.use("/api", reviewRouter.getRouter());
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    getExpressApp() {
        return this.app;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map