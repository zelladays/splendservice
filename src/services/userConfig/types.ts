import { z } from "zod";

const AddUserConfigSchema = z.object({
  savingsInterval: z.undefined().or(z.string()),
  currentSavings: z.undefined().or(z.number()),
  lifetimeSavings: z.undefined().or(z.number()),
  savingAmountInterval: z.undefined().or(z.number()),
});

export type AddUserConfig = z.infer<typeof AddUserConfigSchema>;

export const parseAddUserConfig = (config: unknown) => {
  return AddUserConfigSchema.safeParse(config);
};

const UserConfigSchema = z.object({
  id: z.string(),
  savingsInterval: z.string(),
  currentSavings: z.number(),
  lifetimeSavings: z.number(),
  savingAmountInterval: z.number(),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;

export const parseUserConfig = (config: unknown) => {
  return UserConfigSchema.safeParse(config);
};
