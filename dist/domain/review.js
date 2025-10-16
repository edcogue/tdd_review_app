"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    constructor(productId, userId, rating, comment, id) {
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        if (id) {
            this.id = id;
        }
    }
    id;
    productId;
    userId;
    rating;
    comment;
}
exports.Review = Review;
//# sourceMappingURL=review.js.map