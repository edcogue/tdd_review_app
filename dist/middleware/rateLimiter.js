"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
let RateLimiter = class RateLimiter {
    store = {};
    windowMs;
    maxRequests;
    constructor() {
        this.windowMs = 60000;
        this.maxRequests = 3;
    }
    middleware(windowMs, maxRequests) {
        const effectiveWindowMs = windowMs || this.windowMs;
        const effectiveMaxRequests = maxRequests || this.maxRequests;
        return (req, res, next) => {
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
    getClientId(req) {
        return req.ip || req.connection.remoteAddress || "unknown";
    }
    reset() {
        this.store = {};
    }
};
exports.RateLimiter = RateLimiter;
exports.RateLimiter = RateLimiter = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], RateLimiter);
//# sourceMappingURL=rateLimiter.js.map