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
exports.ReviewService = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const reviewRepository_1 = require("../data/reviewRepository");
const review_1 = require("../domain/review");
const moderator_1 = require("../domain/moderator");
const ratingCalculator_1 = require("../domain/ratingCalculator");
const anonymizer_1 = require("../domain/anonymizer");
let ReviewService = class ReviewService {
    reviewRepository;
    moderator;
    ratingCalculator;
    anonymizer;
    constructor(reviewRepository, moderator, ratingCalculator, anonymizer) {
        this.reviewRepository = reviewRepository;
        this.moderator = moderator;
        this.ratingCalculator = ratingCalculator;
        this.anonymizer = anonymizer;
    }
    async crearReview(reviewData) {
        this.moderator.validateMessage(reviewData.comment);
        if (reviewData.rating < 1 || reviewData.rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
        const review = new review_1.Review(reviewData.productId, reviewData.userId, reviewData.rating, reviewData.comment);
        return this.reviewRepository.save(review);
    }
    async getReviewsByProduct(productId) {
        const reviews = await this.reviewRepository.getByProduct(productId);
        const anonymizedReviews = reviews.map((review) => {
            const anonymizedUserId = review.userId.includes("@")
                ? this.anonymizer.anonymizeEmail(review.userId)
                : this.anonymizer.anonymizeName(review.userId);
            return new review_1.Review(review.productId, anonymizedUserId, review.rating, review.comment, review.id);
        });
        const ratings = reviews.map((r) => r.rating);
        const averageRating = this.ratingCalculator.calculateAverage(ratings);
        return {
            reviews: anonymizedReviews,
            averageRating,
        };
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [reviewRepository_1.ReviewRepository,
        moderator_1.Moderator,
        ratingCalculator_1.RatingCalculator,
        anonymizer_1.Anonymizer])
], ReviewService);
//# sourceMappingURL=reviewService.js.map