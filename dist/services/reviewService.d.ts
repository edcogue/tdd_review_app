import "reflect-metadata";
import { ReviewRepository } from "../data/reviewRepository";
import { Review } from "../domain/review";
import { Moderator } from "../domain/moderator";
import { RatingCalculator } from "../domain/ratingCalculator";
import { Anonymizer } from "../domain/anonymizer";
interface ProductReview {
    reviews: Review[];
    averageRating: number;
}
export declare class ReviewService {
    private reviewRepository;
    private moderator;
    private ratingCalculator;
    private anonymizer;
    constructor(reviewRepository: ReviewRepository, moderator: Moderator, ratingCalculator: RatingCalculator, anonymizer: Anonymizer);
    crearReview(reviewData: {
        productId: string;
        userId: string;
        rating: number;
        comment: string;
    }): Promise<Review>;
    getReviewsByProduct(productId: string): Promise<ProductReview>;
}
export {};
//# sourceMappingURL=reviewService.d.ts.map