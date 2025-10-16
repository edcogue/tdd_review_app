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
exports.ReviewController = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const reviewService_1 = require("../services/reviewService");
let ReviewController = class ReviewController {
    reviewService;
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReviewsByProduct(req, res) {
        const { productId } = req.params;
        const productReview = await this.reviewService.getReviewsByProduct(productId);
        if (productReview.reviews.length === 0) {
            res.status(404).json({ message: "No reviews found for this product." });
            return;
        }
        res.status(200).json(productReview);
    }
    async createReview(req, res) {
        const { productId, userId, rating, comment } = req.body;
        if (!productId || !userId || !rating || !comment) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }
        try {
            const newReview = await this.reviewService.crearReview({
                productId,
                userId,
                rating,
                comment,
            });
            res.status(201).json(newReview);
        }
        catch (_) {
            res.status(400).json({ message: "Error creating review." });
        }
    }
};
exports.ReviewController = ReviewController;
exports.ReviewController = ReviewController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [reviewService_1.ReviewService])
], ReviewController);
//# sourceMappingURL=reviewController.js.map