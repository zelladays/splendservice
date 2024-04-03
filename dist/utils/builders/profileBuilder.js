"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileBuilder = void 0;
const buildProfile = (user, config) => {
    return {
        name: user.name,
        email: user.email,
        savingsInterval: config.savingIntervalDuration,
        currentSavings: config.currentSavings,
        lifetimeSavings: config.lifetimeSavings,
        savingAmountInterval: config.savingIntervalAmount,
    };
};
exports.profileBuilder = {
    buildProfile,
};
