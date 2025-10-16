import "reflect-metadata";
import { injectable } from "tsyringe";

@injectable()
export class RatingCalculator {
  constructor() {}
  public calculateAverage(ratings: number[]): number {
    if (ratings.length < 1) {
      return 0;
    }

    const outLimits = ratings.filter((v) => v < 1 || v > 5);
    if (outLimits.length > 0) {
      throw Error("Value less than 1 or greater than 5");
    }
    let accumulate = 0;
    for (const item of ratings) {
      accumulate += item;
    }
    return Math.round((accumulate / ratings.length) * 10) / 10;
  }
}
