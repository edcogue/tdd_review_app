import { RatingCalculator } from "../../src/domain/ratingCalculator";
import { container } from "tsyringe";

describe("Rating Calculator", () => {
  let calculator: RatingCalculator;
  beforeEach(() => {
    calculator = container.resolve(RatingCalculator);
  });

  test("It should calculate the average", () => {
    const ratings = [1, 2, 3];

    const averageRatings = calculator.calculateAverage(ratings);

    const expectedAverage = 2;
    expect(averageRatings).toBe(expectedAverage);
  });

  test("It should round the result to 1 decimal", () => {
    const ratings = [1, 1, 2];

    const averageRatings = calculator.calculateAverage(ratings);

    const expectedAverage = 1.3;
    expect(averageRatings).toBe(expectedAverage);
  });

  test("It should raise an exception if values are lesser than 1 or greater than 5", () => {
    const ratingsWithLesser = [1, 0, 2];
    const ratingsWithGreaters = [6, 1, 1];
    const ratingsOnLimits = [5, 1];

    expect(() => calculator.calculateAverage(ratingsWithLesser)).toThrow();
    expect(() => calculator.calculateAverage(ratingsWithGreaters)).toThrow();
    expect(() => calculator.calculateAverage(ratingsOnLimits)).not.toThrow();
  });

  test("It should return 0 when an empty list is provided", () => {
    const ratings: number[] = [];

    const averageRatings = calculator.calculateAverage(ratings);

    const expectedAverage = 0;
    expect(averageRatings).toBe(expectedAverage);
  });
});
