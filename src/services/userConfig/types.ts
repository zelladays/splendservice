import { z } from "zod";

const AddUserConfigSchema = z.object({
  currentSavings: z.undefined().or(z.number()),
  lifetimeSavings: z.undefined().or(z.number()),
  savingIntervalDuration: z.undefined().or(z.string()),
  savingIntervalAmount: z.undefined().or(z.number()),
});

export type AddUserConfig = z.infer<typeof AddUserConfigSchema>;

export const parseAddUserConfig = (config: unknown) => {
  return AddUserConfigSchema.safeParse(config);
};

const DBUserConfigSchema = z.object({
  id: z.string(),
  current_savings: z.number(),
  lifetime_savings: z.number(),
  saving_interval_duration: z.string(),
  saving_interval_amount: z.number(),
});

export type DBUserConfig = z.infer<typeof DBUserConfigSchema>;

const UserConfigSchema = z.object({
  id: z.string(),
  currentSavings: z.number(),
  lifetimeSavings: z.number(),
  savingIntervalDuration: z.string(),
  savingIntervalAmount: z.number(),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;

export const parseUserConfig = (config: unknown) => {
  return UserConfigSchema.safeParse(config);
};

export const userConfigMapper = {
  from: (config: DBUserConfig): UserConfig => ({
    id: config.id,
    currentSavings: config.current_savings,
    lifetimeSavings: config.lifetime_savings,
    savingIntervalDuration: config.saving_interval_duration,
    savingIntervalAmount: config.saving_interval_amount,
  }),
  to: (config: UserConfig): DBUserConfig => ({
    id: config.id,
    current_savings: config.currentSavings,
    lifetime_savings: config.lifetimeSavings,
    saving_interval_duration: config.savingIntervalDuration,
    saving_interval_amount: config.savingIntervalAmount,
  }),
};
