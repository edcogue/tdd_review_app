import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
export declare class RateLimiter {
    private store;
    private windowMs;
    private maxRequests;
    constructor();
    middleware(windowMs?: number, maxRequests?: number): (req: Request, res: Response, next: NextFunction) => void;
    private getClientId;
    reset(): void;
}
//# sourceMappingURL=rateLimiter.d.ts.map