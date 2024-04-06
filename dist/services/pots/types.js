"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPotToSchema = exports.potMapper = exports.mapDBPotToSchema = exports.parseAddPot = exports.parseUpdatePot = void 0;
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
const DBPotSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    pot_progress_id: zod_1.default.string(),
    collection_id: zod_1.default.string(),
    last_modified_timestamp: zod_1.default.number(),
    saving_goal: zod_1.default.number(),
    amount_saved_per_interval: zod_1.default.number(),
    current_amount: zod_1.default.number(),
});
const mapDBPotToSchema = (pot) => {
    return DBPotSchema.parse(pot);
};
exports.mapDBPotToSchema = mapDBPotToSchema;
const PotSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    potProgressId: zod_1.default.string(),
    collectionId: zod_1.default.string(),
    lastModifiedTimestamp: zod_1.default.number(),
    savingGoal: zod_1.default.number(),
    amountSavedPerInterval: zod_1.default.number(),
    currentAmountSaved: zod_1.default.number(),
});
exports.potMapper = {
    from: (pot) => {
        return {
            id: pot.id,
            title: pot.title,
            description: pot.description,
            potProgressId: pot.pot_progress_id,
            collectionId: pot.collection_id,
            lastModifiedTimestamp: pot.last_modified_timestamp,
            savingGoal: pot.saving_goal,
            amountSavedPerInterval: pot.amount_saved_per_interval,
            currentAmountSaved: pot.current_amount,
        };
    },
    to: (pot) => {
        return {
            id: pot.id,
            title: pot.title,
            description: pot.description,
            pot_progress_id: pot.potProgressId,
            collection_id: pot.collectionId,
            last_modified_timestamp: pot.lastModifiedTimestamp,
            saving_goal: pot.savingGoal,
            amount_saved_per_interval: pot.amountSavedPerInterval,
            current_amount: pot.currentAmountSaved,
        };
    },
};
const mapPotToSchema = (pot) => {
    return PotSchema.parse(pot);
};
exports.mapPotToSchema = mapPotToSchema;
