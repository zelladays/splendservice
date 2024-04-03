import { User, UserConfig } from "../../services";

const buildProfile = (user: User, config: UserConfig) => {
  return {
    name: user.name,
    email: user.email,
    savingsInterval: config.savingIntervalDuration,
    currentSavings: config.currentSavings,
    lifetimeSavings: config.lifetimeSavings,
    savingAmountInterval: config.savingIntervalAmount,
  };
};

export const profileBuilder = {
  buildProfile,
};
