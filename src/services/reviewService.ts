import "reflect-metadata";
import { injectable } from "tsyringe";
import { ReviewRepository } from "../data/reviewRepository";
import { Review } from "../domain/review";
import { Moderator } from "../domain/moderator";
import { RatingCalculator } from "../domain/ratingCalculator";
import { Anonymizer } from "../domain/anonymizer";

interface ProductReview {
  reviews: Review[];
  averageRating: number;
}

@injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private moderator: Moderator,
    private ratingCalculator: RatingCalculator,
    private anonymizer: Anonymizer
  ) {}

  async crearReview(reviewData: {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }): Promise<Review> {
    this.moderator.validateMessage(reviewData.comment);
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
    const review = new Review(
      reviewData.productId,
      reviewData.userId,
      reviewData.rating,
      reviewData.comment
    );

    return this.reviewRepository.save(review);
  }

  async getReviewsByProduct(productId: string): Promise<ProductReview> {
    const reviews = await this.reviewRepository.getByProduct(productId);
    const anonymizedReviews = reviews.map((review) => {
      const anonymizedUserId = review.userId.includes("@")
        ? this.anonymizer.anonymizeEmail(review.userId)
        : this.anonymizer.anonymizeName(review.userId);

      return new Review(
        review.productId,
        anonymizedUserId,
        review.rating,
        review.comment,
        review.id
      );
    });
    const ratings = reviews.map((r) => r.rating);
    const averageRating = this.ratingCalculator.calculateAverage(ratings);

    return {
      reviews: anonymizedReviews,
      averageRating,
    };
  }
}
