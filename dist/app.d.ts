import "reflect-metadata";
import { Application } from "express";
export declare class App {
    app: Application;
    constructor();
    private setupMiddleware;
    private setupRoutes;
    listen(port: number): void;
    getExpressApp(): Application;
}
//# sourceMappingURL=app.d.ts.map