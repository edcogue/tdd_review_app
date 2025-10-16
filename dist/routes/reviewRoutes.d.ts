import "reflect-metadata";
import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { RateLimiter } from "../middleware/rateLimiter";
export declare class ReviewRouter {
    private controller;
    private rateLimiter;
    private router;
    constructor(controller: ReviewController, rateLimiter: RateLimiter);
    private setupRoutes;
    getRouter(): Router;
}
export { ReviewController };
//# sourceMappingURL=reviewRoutes.d.ts.map