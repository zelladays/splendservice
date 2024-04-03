"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserConfig = exports.parseAddUserConfig = void 0;
const zod_1 = require("zod");
const AddUserConfigSchema = zod_1.z.object({
    savingsInterval: zod_1.z.undefined().or(zod_1.z.string()),
    currentSavings: zod_1.z.undefined().or(zod_1.z.number()),
    lifetimeSavings: zod_1.z.undefined().or(zod_1.z.number()),
    savingAmountInterval: zod_1.z.undefined().or(zod_1.z.number()),
});
const parseAddUserConfig = (config) => {
    return AddUserConfigSchema.safeParse(config);
};
exports.parseAddUserConfig = parseAddUserConfig;
const UserConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    savingsInterval: zod_1.z.string(),
    currentSavings: zod_1.z.number(),
    lifetimeSavings: zod_1.z.number(),
    savingAmountInterval: zod_1.z.number(),
});
const parseUserConfig = (config) => {
    return UserConfigSchema.safeParse(config);
};
exports.parseUserConfig = parseUserConfig;
