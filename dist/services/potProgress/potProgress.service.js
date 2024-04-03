"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.potProgressService = void 0;
const uuid_1 = require("uuid");
const db_service_1 = __importDefault(require("../db.service"));
const createPotProgress = async (potProgress) => {
    try {
        const potProgressId = (0, uuid_1.v4)();
        await db_service_1.default.query("INSERT INTO pot_progress (id, saving_goal, amount_saved_per_interval) VALUES ($1, $2, $3)", [
            potProgressId,
            potProgress.savingGoal,
            potProgress.amountSavedPerInterval,
        ]);
        return { potProgressId };
    }
    catch (error) {
        console.error("Error creating pot progress:", error);
        throw error;
    }
};
const getPotProgressById = async (potProgressId) => {
    try {
        const potProgress = await db_service_1.default.query("SELECT * FROM pot_progress WHERE id = $1", [potProgressId]);
        return potProgress.rows[0];
    }
    catch (error) {
        console.error("Error retrieving pot progress:", error);
        throw error;
    }
};
const getAllPotProgress = async () => {
    try {
        const potProgress = await db_service_1.default.query("SELECT * FROM pot_progress", []);
        return potProgress.rows;
    }
    catch (error) {
        console.error("Error retrieving pot progress:", error);
        throw error;
    }
};
exports.potProgressService = {
    createPotProgress,
    getPotProgressById,
    getAllPotProgress,
};
