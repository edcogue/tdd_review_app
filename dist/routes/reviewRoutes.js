"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = exports.ReviewRouter = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
Object.defineProperty(exports, "ReviewController", { enumerable: true, get: function () { return reviewController_1.ReviewController; } });
const rateLimiter_1 = require("../middleware/rateLimiter");
let ReviewRouter = class ReviewRouter {
    controller;
    rateLimiter;
    router;
    constructor(controller, rateLimiter) {
        this.controller = controller;
        this.rateLimiter = rateLimiter;
        this.router = (0, express_1.Router)();
        this.setupRoutes();
    }
    setupRoutes() {
        // GET /products/:productId/reviews - Get all reviews for a product
        this.router.get("/products/:productId/reviews", async (req, res) => {
            await this.controller.getReviewsByProduct(req, res);
        });
        this.router.post("/reviews", this.rateLimiter.middleware(60000, 3), async (req, res) => {
            await this.controller.createReview(req, res);
        });
    }
    getRouter() {
        return this.router;
    }
};
exports.ReviewRouter = ReviewRouter;
exports.ReviewRouter = ReviewRouter = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [reviewController_1.ReviewController,
        rateLimiter_1.RateLimiter])
], ReviewRouter);
//# sourceMappingURL=reviewRoutes.js.map