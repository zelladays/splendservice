"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPotToSchema = exports.parseAddPot = exports.parseUpdatePot = void 0;
const zod_1 = __importDefault(require("zod"));
const AddPotSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    userId: zod_1.default.string(),
    savingGoal: zod_1.default.number(),
    amountSavedPerInterval: zod_1.default.number(),
});
const UpdatePotSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    userId: zod_1.default.string(),
    potProgressId: zod_1.default.string(),
    savingGoal: zod_1.default.number(),
    amountSavedPerInterval: zod_1.default.number(),
});
const parseUpdatePot = (pot) => {
    return UpdatePotSchema.safeParse(pot);
};
exports.parseUpdatePot = parseUpdatePot;
const parseAddPot = (pot) => {
    return AddPotSchema.safeParse(pot);
};
exports.parseAddPot = parseAddPot;
const PotSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    userId: zod_1.default.string(),
    potProgressId: zod_1.default.string(),
});
const mapPotToSchema = (pot) => {
    return PotSchema.parse(pot);
};
exports.mapPotToSchema = mapPotToSchema;
