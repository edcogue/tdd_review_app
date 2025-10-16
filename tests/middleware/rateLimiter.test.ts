import "reflect-metadata";
import request from "supertest";
import { container } from "tsyringe";
import { App } from "../../src/app";
import { Application } from "express";
import { ReviewRepository } from "../../src/data/reviewRepository";
import { Review } from "../../src/domain/review";

describe("Rate Limiter Middleware", () => {
  let app: Application;
  let mockRepository: jest.Mocked<ReviewRepository>;

  beforeEach(() => {
    // Reset container and clear mocks
    jest.useFakeTimers();
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

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should forgive requests exceeding limit for create review", async () => {
    const newReview = {
      productId: "product123",
      userId: "user456",
      rating: 5,
      comment: "Great product!",
    };

    const savedReview = new Review(
      newReview.productId,
      newReview.userId,
      newReview.rating,
      newReview.comment,
      "generated-id"
    );
    mockRepository.save.mockResolvedValue(savedReview);

    for (let i = 0; i < 3; i++) {
      await request(app).post("/api/reviews").send(newReview).expect(201);
    }
    await request(app).post("/api/reviews").send(newReview).expect(429);
  });

  it("should allow again after the time window has passed", async () => {
    const newReview = {
      productId: "product123",
      userId: "user456",
      rating: 5,
      comment: "Great product!",
    };

    const savedReview = new Review(
      newReview.productId,
      newReview.userId,
      newReview.rating,
      newReview.comment,
      "generated-id"
    );
    mockRepository.save.mockResolvedValue(savedReview);

    for (let i = 0; i < 3; i++) {
      await request(app).post("/api/reviews").send(newReview).expect(201);
    }
    await request(app).post("/api/reviews").send(newReview).expect(429);

    // Fast forward time by 61 seconds
    jest.advanceTimersByTime(61000);

    // Now the request should be allowed again
    await request(app).post("/api/reviews").send(newReview).expect(201);
  });
});
