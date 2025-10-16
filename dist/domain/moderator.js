"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moderator = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
let Moderator = class Moderator {
    profanityWords = [
        "badword",
        "damn",
        "hell",
        "crap",
        "stupid",
        "idiot",
        "moron",
        "jerk",
        "loser",
        "freak",
        "weirdo",
        "creep",
        "fool",
        "dumb",
        "lame",
        "suck",
        "hate",
        "kill",
        "die",
        "gross",
        "ugly",
        "fat",
        "skinny",
        "short",
        "tall",
        "bald",
        "smelly",
        "dirty",
        "nasty",
        "disgusting",
        "awful",
        "terrible",
        "horrible",
        "pathetic",
        "worthless",
    ];
    minLength = 10;
    validateMessage(content) {
        if (content.length < this.minLength) {
            throw new Error(`Content must be at least ${this.minLength} characters long`);
        }
        const containsProfanity = this.profanityWords.some((word) => content.toLowerCase().includes(word.toLowerCase()));
        if (containsProfanity) {
            throw new Error("Content contains profanity and is not allowed");
        }
    }
};
exports.Moderator = Moderator;
exports.Moderator = Moderator = __decorate([
    (0, tsyringe_1.injectable)()
], Moderator);
//# sourceMappingURL=moderator.js.map