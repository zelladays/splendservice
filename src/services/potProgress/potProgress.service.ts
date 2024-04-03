import { v4 } from "uuid";
import db from "../db.service";
import { AddPotProgress } from "./types";

const createPotProgress = async (potProgress: AddPotProgress) => {
    try {
        const potProgressId = v4();
        await db.query(
            "INSERT INTO pot_progress (id, saving_goal, amount_saved_per_interval) VALUES ($1, $2, $3)",
            [
                potProgressId,
                potProgress.savingGoal,
                potProgress.amountSavedPerInterval,
            ]
        );
        return { potProgressId };
    } catch (error) {
        console.error("Error creating pot progress:", error);
        throw error;
    }
};

const getPotProgressById = async (potProgressId: string) => {
    try {
        const potProgress = await db.query(
            "SELECT * FROM pot_progress WHERE id = $1",
            [potProgressId]
        );
        return potProgress.rows[0];
    } catch (error) {
        console.error("Error retrieving pot progress:", error);
        throw error;
    }
};

const getAllPotProgress = async () => {
    try {
        const potProgress = await db.query("SELECT * FROM pot_progress", []);
        return potProgress.rows;
    } catch (error) {
        console.error("Error retrieving pot progress:", error);
        throw error;
    }
};

export const potProgressService = {
    createPotProgress,
    getPotProgressById,
    getAllPotProgress,
};
