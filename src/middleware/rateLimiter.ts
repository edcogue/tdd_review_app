import "reflect-metadata";
import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

@injectable()
export class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number;
  private maxRequests: number;

  constructor() {
    this.windowMs = 60000;
    this.maxRequests = 3;
  }

  middleware(windowMs?: number, maxRequests?: number) {
    const effectiveWindowMs = windowMs || this.windowMs;
    const effectiveMaxRequests = maxRequests || this.maxRequests;

    return (req: Request, res: Response, next: NextFunction): void => {
      const clientId = this.getClientId(req);
      const now = Date.now();

      if (!this.store[clientId] || now > this.store[clientId].resetTime) {
        this.store[clientId] = {
          count: 1,
          resetTime: now + effectiveWindowMs,
        };
        next();
        return;
      }

      this.store[clientId].count++;

      if (this.store[clientId].count > effectiveMaxRequests) {
        res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
        return;
      }

      next();
    };
  }

  private getClientId(req: Request): string {
    return req.ip || req.connection.remoteAddress || "unknown";
  }

  reset(): void {
    this.store = {};
  }
}
