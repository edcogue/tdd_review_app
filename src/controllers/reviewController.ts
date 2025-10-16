import "reflect-metadata";
import { injectable } from "tsyringe";
import { ReviewService } from "../services/reviewService";
import { Request, Response } from "express";

@injectable()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async getReviewsByProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const productReview = await this.reviewService.getReviewsByProduct(
      productId!
    );
    if (productReview.reviews.length === 0) {
      res.status(404).json({ message: "No reviews found for this product." });
      return;
    }
    res.status(200).json(productReview);
  }

  async createReview(req: Request, res: Response): Promise<void> {
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
    } catch (_) {
      res.status(400).json({ message: "Error creating review." });
    }
  }
}
