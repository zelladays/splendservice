"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddCollection = exports.AddCollection = exports.Collection = void 0;
const zod_1 = __importDefault(require("zod"));
exports.Collection = zod_1.default.object({
    id: zod_1.default.string(),
    name: zod_1.default.string(),
    userId: zod_1.default.string(),
});
exports.AddCollection = zod_1.default.object({
    name: zod_1.default.string(),
    userId: zod_1.default.string(),
});
const parseAddCollection = (collection) => {
    return exports.AddCollection.safeParse(collection);
};
exports.parseAddCollection = parseAddCollection;
