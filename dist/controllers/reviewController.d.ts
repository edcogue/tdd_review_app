import "reflect-metadata";
import { ReviewService } from "../services/reviewService";
import { Request, Response } from "express";
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    getReviewsByProduct(req: Request, res: Response): Promise<void>;
    createReview(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=reviewController.d.ts.map