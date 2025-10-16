"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const tsyringe_1 = require("tsyringe");
let ReviewRepository = class ReviewRepository {
    reviews = [];
    async save(review) {
        const existingIndex = this.reviews.findIndex((r) => r.id === review.id);
        if (existingIndex !== -1) {
            this.reviews[existingIndex] = review;
            return this.reviews[existingIndex];
        }
        else {
            const newReview = {
                ...review,
                id: `${this.reviews.length + 1}`,
            };
            this.reviews.push(newReview);
            return newReview;
        }
    }
    async getByProduct(productId) {
        return this.reviews.filter((review) => review.productId === productId);
    }
    async getById(id) {
        const review = this.reviews.find((r) => r.id === id);
        return review || null;
    }
    async getAll() {
        return [...this.reviews];
    }
    async limpiar() {
        this.reviews = [];
    }
    async contarReviews() {
        return this.reviews.length;
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ReviewRepository);
//# sourceMappingURL=reviewRepository.js.map