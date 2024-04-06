"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.potService = void 0;
const uuid_1 = require("uuid");
const db_service_1 = __importDefault(require("../../configs/db.service"));
const types_1 = require("./types");
const potProgress_1 = require("../potProgress");
async function getPotById(potId, userId) {
    try {
        const pot = await db_service_1.default.query("SELECT * FROM pots WHERE id = $1 AND user_id = $2", [potId, userId]);
        if (pot.rows.length === 0) {
            return null;
        }
        return types_1.potMapper.from(pot.rows[0]);
    }
    catch (error) {
        console.error("Error retrieving pot:", error);
        throw error;
    }
}
async function getPotsByUserId(userId) {
    try {
        const { rows } = await db_service_1.default.query("SELECT pots.id, pots.title, pots.last_modified_timestamp, pots.collection_id, pot_progress.saving_goal, pot_progress.current_amount, pot_progress.amount_saved_per_interval FROM pots JOIN users ON pots.user_id = users.id JOIN pot_progress ON pots.pot_progress_id = pot_progress.id WHERE users.id = $1", [userId]);
        return rows.map((row) => types_1.potMapper.from(row));
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
        await db_service_1.default.query("INSERT INTO pots (id, title, description, user_id, pot_progress_id, last_modified_timestamp) VALUES ($1, $2, $3, $4, $5)", [
            potId,
            pot.title,
            pot.description,
            pot.userId,
            potProgressId,
            Math.floor(Date.now() / 1000),
        ]);
        return { potId };
    }
    catch (error) {
        console.error("Error creating pot:", error);
        throw error;
    }
}
const updatePot = async (pot) => {
    try {
        await potProgress_1.potProgressService.updatePotProgress({
            id: pot.potProgressId,
            savingGoal: pot.savingGoal,
            amountSavedPerInterval: pot.amountSavedPerInterval,
        });
        await db_service_1.default.query("UPDATE pots SET title = $1, description = $2, pot_progress_id = $3, last_modified_timestamp = $4 WHERE id = $5", [
            pot.title,
            pot.description,
            pot.potProgressId,
            Math.floor(Date.now() / 1000),
            pot.id,
        ]);
    }
    catch (error) {
        console.error("Error updating pot:", error);
        throw error;
    }
};
exports.potService = {
    getPotsByUserId,
    getPotById,
    createPot,
    updatePot,
};
