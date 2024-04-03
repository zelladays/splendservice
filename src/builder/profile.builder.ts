import { User, UserConfig } from "../services";

const buildProfile = (data: User & UserConfig) => {
  return {
    name: data.name,
    email: data.email,
    savingsInterval: data.savingsInterval,
    currentSavings: data.currentSavings,
    lifetimeSavings: data.lifetimeSavings,
    savingAmountInterval: data.savingAmountInterval,
  };
};

export const profileBuilder = {
  buildProfile,
};
