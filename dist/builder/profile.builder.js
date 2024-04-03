"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileBuilder = void 0;
const buildProfile = (data) => {
    return {
        name: data.name,
        email: data.email,
        savingsInterval: data.savingsInterval,
        currentSavings: data.currentSavings,
        lifetimeSavings: data.lifetimeSavings,
        savingAmountInterval: data.savingAmountInterval,
    };
};
exports.profileBuilder = {
    buildProfile,
};
