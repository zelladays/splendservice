"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePotProgress = exports.parseAddPotProgress = void 0;
const zod_1 = __importDefault(require("zod"));
const AddPotProgressSchema = zod_1.default.object({
    savingGoal: zod_1.default.number(),
    amountSavedPerInterval: zod_1.default.number(),
});
const parseAddPotProgress = (potProgress) => {
    return AddPotProgressSchema.parse(potProgress);
};
exports.parseAddPotProgress = parseAddPotProgress;
const PotProgressSchema = zod_1.default.object({
    id: zod_1.default.string(),
    savingGoal: zod_1.default.number(),
    amountSavedPerInterval: zod_1.default.number(),
    currentAmount: zod_1.default.string(),
});
const parsePotProgress = (potProgress) => {
    return PotProgressSchema.parse(potProgress);
};
exports.parsePotProgress = parsePotProgress;
