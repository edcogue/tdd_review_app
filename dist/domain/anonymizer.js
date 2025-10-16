"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anonymizer = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
let Anonymizer = class Anonymizer {
    anonymizeName(fullName) {
        const names = fullName.split(" ");
        if (names.length < 2) {
            return fullName;
        }
        const firstName = names[0];
        const lastNameInitial = names[1]?.charAt(0).toUpperCase();
        return `${firstName} ${lastNameInitial}.`;
    }
    anonymizeEmail(email) {
        if (!email.includes("@")) {
            throw Error("Invalid email");
        }
        const [localPart, domain] = email.split("@");
        if (!localPart || localPart.trim() === "") {
            throw Error("Invalid email");
        }
        const halfLength = Math.floor(localPart.length / 2);
        const maskedLocalPart = localPart.slice(0, halfLength) + "****";
        return `${maskedLocalPart}@${domain}`;
    }
};
exports.Anonymizer = Anonymizer;
exports.Anonymizer = Anonymizer = __decorate([
    (0, tsyringe_1.injectable)()
], Anonymizer);
//# sourceMappingURL=anonymizer.js.map