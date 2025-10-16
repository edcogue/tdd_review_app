import "reflect-metadata";
import { container, injectable } from "tsyringe";
import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { RateLimiter } from "../middleware/rateLimiter";

@injectable()
export class ReviewRouter {
  private router: Router;

  constructor(
    private controller: ReviewController,
    private rateLimiter: RateLimiter
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // GET /products/:productId/reviews - Get all reviews for a product
    this.router.get("/products/:productId/reviews", async (req, res) => {
      await this.controller.getReviewsByProduct(req, res);
    });

    this.router.post(
      "/reviews",
      this.rateLimiter.middleware(60000, 3),
      async (req, res) => {
        await this.controller.createReview(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export { ReviewController };
