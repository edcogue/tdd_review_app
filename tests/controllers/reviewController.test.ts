import "reflect-metadata";
import request from "supertest";
import { container } from "tsyringe";
import { Review } from "../../src/domain/review";
import { ReviewRepository } from "../../src/data/reviewRepository";
import { App } from "../../src/app";
import { Application } from "express";

describe("Review Controller", () => {
  let app: Application;
  let mockRepository: jest.Mocked<ReviewRepository>;

  beforeEach(() => {
    // Reset container and clear mocks
    container.reset();
    jest.clearAllMocks();

    // Create and register mock repository
    mockRepository = {
      save: jest.fn(),
      getByProduct: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      limpiar: jest.fn(),
      contarReviews: jest.fn(),
    } as unknown as jest.Mocked<ReviewRepository>;

    container.registerInstance(ReviewRepository, mockRepository);

    // Create a new app instance for each test
    const appInstance = new App();
    app = appInstance.getExpressApp();
  });

  describe("GET /api/products/:productId/reviews", () => {
    it("should return a 200 status code if it contains reviews", async () => {
      const mockReviews = [
        new Review(
          "product123",
          "john.doe@example.com",
          5,
          "Great product!",
          "1"
        ),
        new Review("product123", "Jane Smith", 4, "Good quality", "2"),
      ];

      // Set up the mock to return our test data
      mockRepository.getByProduct.mockResolvedValue(mockReviews);

      const response = await request(app)
        .get("/api/products/product123/reviews")
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it("should return a list of reviews", async () => {
      // Mock data that the repository should return
      const mockReviews = [
        new Review(
          "product123",
          "john.doe@example.com",
          5,
          "Great product!",
          "1"
        ),
        new Review("product123", "Jane Smith", 4, "Good quality", "2"),
      ];

      // Set up the mock to return our test data
      mockRepository.getByProduct.mockResolvedValue(mockReviews);

      const response = await request(app)
        .get("/api/products/product123/reviews")
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.reviews).toBeDefined();
      expect(Array.isArray(response.body.reviews)).toBe(true);
      expect(response.body.reviews.length).toBe(2);
      expect(response.body.averageRating).toBeDefined();
      expect(typeof response.body.averageRating).toBe("number");
    });

    it("should return the average rating of all products review", async () => {
      // Mock data for average rating
      const mockAverageRating = 4.5;
      const mockReviews = [
        new Review(
          "product123",
          "john.doe@example.com",
          5,
          "Great product!",
          "1"
        ),
        new Review("product123", "Jane Smith", 4, "Good quality", "2"),
      ];

      mockRepository.getByProduct.mockResolvedValue(mockReviews);

      const response = await request(app)
        .get("/api/products/product123/reviews")
        .expect(200);

      expect(response.body.averageRating).toBeDefined();
      expect(typeof response.body.averageRating).toBe("number");
      expect(response.body.averageRating).toBe(mockAverageRating);
    });

    it("should return names of the users anonymized", async () => {
      // Mock data with different userId formats
      const mockReviews = [
        new Review(
          "product123",
          "john.doe@example.com",
          5,
          "Great product!",
          "1"
        ),
      ];

      mockRepository.getByProduct.mockResolvedValue(mockReviews);

      const response = await request(app)
        .get("/api/products/product123/reviews")
        .expect(200);

      expect(response.body.reviews).toBeDefined();
      expect(Array.isArray(response.body.reviews)).toBe(true);
      expect(response.body.reviews[0].userId).toBe("john****@example.com");
    });
  });

  it("should return 404 if product has no reviews", async () => {
    // Set up the mock to return empty array
    mockRepository.getByProduct.mockResolvedValue([]);

    await request(app)
      .get("/api/products/nonexistentProduct/reviews")
      .expect(404); // Assuming the endpoint returns 404 if no reviews found
  });

  describe("POST /reviews", () => {
    it("should create a new review and return 201 status code", async () => {
      const newReview = {
        productId: "product123",
        userId: "user456",
        rating: 5,
        comment: "Great product!",
      };

      const response = await request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201);

      expect(response.body).toBeDefined();
    });

    it("should return the created review with an id", async () => {
      const newReview = {
        productId: "product123",
        userId: "user456",
        rating: 5,
        comment: "Great product!",
      };

      const mockId = "generated-id";

      const savedReview = new Review(
        newReview.productId,
        newReview.userId,
        newReview.rating,
        newReview.comment,
        mockId
      );
      mockRepository.save.mockResolvedValue(savedReview);

      const response = await request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(mockId);
      expect(response.body.productId).toBe(newReview.productId);
      expect(response.body.userId).toBe(newReview.userId);
      expect(response.body.rating).toBe(newReview.rating);
      expect(response.body.comment).toBe(newReview.comment);
    });

    it("should return 400 if required fields are missing", async () => {
      const incompleteReview = {
        productId: "product123",
        // userId is missing
        rating: 5,
        comment: "Great product!",
      };

      await request(app)
        .post("/api/reviews")
        .send(incompleteReview)
        .expect(400); // Assuming the endpoint returns 400 for bad requests
    });

    it("should return 400 if rating is out of bounds", async () => {
      const invalidReview = {
        productId: "product123",
        userId: "user456",
        rating: 6, // Invalid rating
        comment: "Great product!",
      };

      await request(app).post("/api/reviews").send(invalidReview).expect(400); // Assuming the endpoint returns 400 for bad requests
    });
  });
});
