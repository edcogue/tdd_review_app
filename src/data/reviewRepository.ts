import { injectable } from "tsyringe";
import { Review } from "../domain/review";

export interface IReviewRepository {
  save(review: Review): Promise<Review>;
  getByProduct(productId: string): Promise<Review[]>;
  getById(id: string): Promise<Review | null>;
  getAll(): Promise<Review[]>;
}

@injectable()
export class ReviewRepository implements IReviewRepository {
  private reviews: Review[] = [];

  async save(review: Review): Promise<Review> {
    const existingIndex = this.reviews.findIndex((r) => r.id === review.id);
    if (existingIndex !== -1) {
      this.reviews[existingIndex] = review;
      return this.reviews[existingIndex];
    } else {
      const newReview = {
        ...review,
        id: `${this.reviews.length + 1}`,
      };
      this.reviews.push(newReview);
      return newReview;
    }
  }

  async getByProduct(productId: string): Promise<Review[]> {
    return this.reviews.filter((review) => review.productId === productId);
  }

  async getById(id: string): Promise<Review | null> {
    const review = this.reviews.find((r) => r.id === id);
    return review || null;
  }

  async getAll(): Promise<Review[]> {
    return [...this.reviews];
  }

  async limpiar(): Promise<void> {
    this.reviews = [];
  }

  async contarReviews(): Promise<number> {
    return this.reviews.length;
  }
}
