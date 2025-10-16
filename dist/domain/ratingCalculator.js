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
exports.RatingCalculator = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
let RatingCalculator = class RatingCalculator {
    constructor() { }
    calculateAverage(ratings) {
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
};
exports.RatingCalculator = RatingCalculator;
exports.RatingCalculator = RatingCalculator = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], RatingCalculator);
//# sourceMappingURL=ratingCalculator.js.map