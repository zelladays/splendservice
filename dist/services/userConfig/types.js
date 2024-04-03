"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapConfigToSchema = exports.parseAddConfig = void 0;
const zod_1 = require("zod");
const AddConfigSchema = zod_1.z.object({
    savingsInterval: zod_1.z.undefined().or(zod_1.z.string()),
    currentSavings: zod_1.z.undefined().or(zod_1.z.number()),
    lifetimeSavings: zod_1.z.undefined().or(zod_1.z.number()),
    savingAmountInterval: zod_1.z.undefined().or(zod_1.z.number()),
});
const parseAddConfig = (config) => {
    return AddConfigSchema.parse(config);
};
exports.parseAddConfig = parseAddConfig;
const ConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    savingsInterval: zod_1.z.string(),
    currentSavings: zod_1.z.number(),
    lifetimeSavings: zod_1.z.number(),
    savingAmountInterval: zod_1.z.number(),
});
const mapConfigToSchema = (config) => {
    return ConfigSchema.parse(config);
};
exports.mapConfigToSchema = mapConfigToSchema;
