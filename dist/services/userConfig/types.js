"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConfigMapper = exports.parseUserConfig = exports.parseAddUserConfig = void 0;
const zod_1 = require("zod");
const AddUserConfigSchema = zod_1.z.object({
    currentSavings: zod_1.z.undefined().or(zod_1.z.number()),
    lifetimeSavings: zod_1.z.undefined().or(zod_1.z.number()),
    savingIntervalDuration: zod_1.z.undefined().or(zod_1.z.string()),
    savingIntervalAmount: zod_1.z.undefined().or(zod_1.z.number()),
});
const parseAddUserConfig = (config) => {
    return AddUserConfigSchema.safeParse(config);
};
exports.parseAddUserConfig = parseAddUserConfig;
const DBUserConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    current_savings: zod_1.z.number(),
    lifetime_savings: zod_1.z.number(),
    saving_interval_duration: zod_1.z.string(),
    saving_interval_amount: zod_1.z.number(),
});
const UserConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    currentSavings: zod_1.z.number(),
    lifetimeSavings: zod_1.z.number(),
    savingIntervalDuration: zod_1.z.string(),
    savingIntervalAmount: zod_1.z.number(),
});
const parseUserConfig = (config) => {
    return UserConfigSchema.safeParse(config);
};
exports.parseUserConfig = parseUserConfig;
exports.userConfigMapper = {
    from: (config) => ({
        id: config.id,
        currentSavings: config.current_savings,
        lifetimeSavings: config.lifetime_savings,
        savingIntervalDuration: config.saving_interval_duration,
        savingIntervalAmount: config.saving_interval_amount,
    }),
    to: (config) => ({
        id: config.id,
        current_savings: config.currentSavings,
        lifetime_savings: config.lifetimeSavings,
        saving_interval_duration: config.savingIntervalDuration,
        saving_interval_amount: config.savingIntervalAmount,
    }),
};
