import { z } from "zod";

const AddConfigSchema = z.object({
    savingsInterval: z.undefined().or(z.string()),
    currentSavings: z.undefined().or(z.number()),
    lifetimeSavings: z.undefined().or(z.number()),
    savingAmountInterval: z.undefined().or(z.number()),
});

export type AddConfig = z.infer<typeof AddConfigSchema>;

export const parseAddConfig = (config: unknown) => {
    return AddConfigSchema.parse(config);
};

const ConfigSchema = z.object({
    id: z.string(),
    savingsInterval: z.string(),
    currentSavings: z.number(),
    lifetimeSavings: z.number(),
    savingAmountInterval: z.number(),
});

export type Config = z.infer<typeof ConfigSchema>;

export const mapConfigToSchema = (config: unknown) => {
    return ConfigSchema.parse(config);
};
