import { Review } from "../domain/review";
export interface IReviewRepository {
    save(review: Review): Promise<Review>;
    getByProduct(productId: string): Promise<Review[]>;
    getById(id: string): Promise<Review | null>;
    getAll(): Promise<Review[]>;
}
export declare class ReviewRepository implements IReviewRepository {
    private reviews;
    save(review: Review): Promise<Review>;
    getByProduct(productId: string): Promise<Review[]>;
    getById(id: string): Promise<Review | null>;
    getAll(): Promise<Review[]>;
    limpiar(): Promise<void>;
    contarReviews(): Promise<number>;
}
//# sourceMappingURL=reviewRepository.d.ts.map