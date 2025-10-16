import { ReviewService } from "../../src/services/reviewService";
import {
  IReviewRepository,
  ReviewRepository,
} from "../../src/data/reviewRepository";
import { Review } from "../../src/domain/review";
import { Moderator } from "../../src/domain/moderator";
import { RatingCalculator } from "../../src/domain/ratingCalculator";
import { Anonymizer } from "../../src/domain/anonymizer";

describe("ReviewService", () => {
  let reviewRepositoryMock: IReviewRepository;
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewRepositoryMock = jest.mocked({} as IReviewRepository);

    const moderator = new Moderator();
    const ratingCalculator = new RatingCalculator();
    const anonymizer = new Anonymizer();

    reviewService = new ReviewService(
      reviewRepositoryMock as ReviewRepository,
      moderator,
      ratingCalculator,
      anonymizer
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Create a Review", () => {
    test("It should save a review if content is valid", async () => {
      const reviewData = {
        productId: "product-1",
        userId: "John Doe",
        rating: 5,
        comment: "Great product!",
      };

      const expectedReview = new Review(
        "product-1",
        "John Doe",
        5,
        "Great product!",
        "1"
      );
      reviewRepositoryMock.save = jest.fn().mockResolvedValue(expectedReview);

      const savedReview = await reviewService.crearReview(reviewData);

      expect(savedReview).toEqual(
        expect.objectContaining({
          productId: reviewData.productId,
          rating: reviewData.rating,
          comment: reviewData.comment,
          userId: reviewData.userId,
        })
      );
    });

    test("It should return a valid review with an id after saving", async () => {
      const reviewData = {
        productId: "product-1",
        userId: "John Doe",
        rating: 4,
        comment: "Good value for money.",
      };

      const expectedReview = new Review(
        "product-1",
        "John Doe",
        4,
        "Good value for money.",
        "1"
      );
      reviewRepositoryMock.save = jest.fn().mockResolvedValue(expectedReview);

      const savedReview = await reviewService.crearReview(reviewData);

      expect(savedReview.id).toBeDefined();
      expect(savedReview.id).toBe("1");
    });

    test("It should failed if it does not pass the moderation check", async () => {
      const reviewData = {
        productId: "product-1",
        userId: "John Doe",
        rating: 5,
        comment: "This is a badword content",
      };

      await expect(reviewService.crearReview(reviewData)).rejects.toThrow();
    });
  });

  describe("Get reviews by product", () => {
    test("It should provide the average ratings", async () => {
      const productId = "product-1";
      const mockReviews = [
        new Review("product-1", "John Doe", 5, "Great product!", "1"),
        new Review("product-1", "Jane Doe", 4, "Good value for money.", "2"),
      ];

      reviewRepositoryMock.getByProduct = jest
        .fn()
        .mockResolvedValue(mockReviews);

      const expectedAverageRating = 4.5;

      const productReview = await reviewService.getReviewsByProduct(productId);

      expect(productReview.averageRating).toEqual(expectedAverageRating);
    });

    test("It should return anonymize user name data", async () => {
      const productId = "product-1";
      const mockReviews = [
        new Review("product-1", "John Doe", 5, "Great product!", "1"),
        new Review(
          "product-1",
          "jane1234@example.com",
          4,
          "Good value for money.",
          "2"
        ),
      ];

      reviewRepositoryMock.getByProduct = jest
        .fn()
        .mockResolvedValue(mockReviews);

      const productReview = await reviewService.getReviewsByProduct(productId);

      expect(productReview.reviews).toEqual([
        expect.objectContaining({ userId: "John D." }),
        expect.objectContaining({ userId: "jane****@example.com" }),
      ]);
    });
  });
});
