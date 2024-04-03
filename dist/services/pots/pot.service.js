"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.potService = void 0;
const uuid_1 = require("uuid");
const db_service_1 = __importDefault(require("../db.service"));
const potProgress_1 = require("../potProgress");
async function getPotById(potId) {
    try {
        const pot = await db_service_1.default.query("SELECT * FROM pots WHERE id = $1", [potId]);
        return pot.rows[0];
    }
    catch (error) {
        console.error("Error retrieving pot:", error);
        throw error;
    }
}
async function getPotsByUserId(userId) {
    try {
        const { rows } = await db_service_1.default.query("SELECT pots.id FROM pots JOIN users ON pots.user_id = users.id WHERE users.id = $1", [userId]);
        return rows;
    }
    catch (error) {
        console.error("Error retrieving pots:", error);
        throw error;
    }
}
async function createPot(pot) {
    try {
        const potId = (0, uuid_1.v4)();
        const { potProgressId } = await potProgress_1.potProgressService.createPotProgress({
            savingGoal: pot.savingGoal,
            amountSavedPerInterval: pot.amountSavedPerInterval,
        });
        await db_service_1.default.query("INSERT INTO pots (id, title, description, user_id, pot_progress_id) VALUES ($1, $2, $3, $4, $5)", [potId, pot.title, pot.description, pot.userId, potProgressId]);
        return { potId };
    }
    catch (error) {
        console.error("Error creating pot:", error);
        throw error;
    }
}
exports.potService = {
    getPotsByUserId,
    getPotById,
    createPot,
};
