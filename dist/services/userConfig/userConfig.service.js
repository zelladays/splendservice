"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConfigService = void 0;
const db_service_1 = __importDefault(require("../db.service"));
const uuid_1 = require("uuid");
async function addNewUserConfig() {
    try {
        const configId = (0, uuid_1.v4)();
        await db_service_1.default.query("INSERT INTO user_config (id, saving_interval) VALUES ($1, $2)", [configId, "month"]);
        return { configId };
    }
    catch (error) {
        console.error("Error adding new config:", error);
        throw error;
    }
}
async function updateUserConfig(config) {
    try {
        const result = await db_service_1.default.query("UPDATE user_config SET saving_interval = $1, current_savings = $2, lifetime_savings = $3, saving_interval_amount = $4 WHERE id = $5", [
            config.savingsInterval,
            config.currentSavings,
            config.lifetimeSavings,
            config.savingAmountInterval,
            config.id,
        ]);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error updating config:", error);
        throw error;
    }
}
async function getUserConfigById(configId) {
    try {
        const config = await db_service_1.default.query("SELECT * FROM user_config WHERE id = $1", [
            configId,
        ]);
        return config.rows[0];
    }
    catch (error) {
        console.error("Error retrieving config:", error);
        throw error;
    }
}
async function getAllUserConfigs() {
    try {
        const config = await db_service_1.default.query("SELECT * FROM user_config", []);
        return config.rows;
    }
    catch (error) {
        console.error("Error retrieving config:", error);
        throw error;
    }
}
exports.userConfigService = {
    addNewUserConfig,
    updateUserConfig,
    getUserConfigById,
    getAllUserConfigs,
};
