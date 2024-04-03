import { v4 } from "uuid";
import db from "../db.service";
import { AddPot, Pot } from "./types";
import { potProgressService } from "../potProgress";

async function getPotById(potId: string) {
    try {
        const pot = await db.query("SELECT * FROM pots WHERE id = $1", [potId]);
        return pot.rows[0] as Pot;
    } catch (error) {
        console.error("Error retrieving pot:", error);
        throw error;
    }
}

async function getPotsByUserId(userId: string) {
    try {
        const { rows } = await db.query(
            "SELECT pots.id FROM pots JOIN users ON pots.user_id = users.id WHERE users.id = $1",
            [userId]
        );

        return rows as Pot[];
    } catch (error) {
        console.error("Error retrieving pots:", error);
        throw error;
    }
}

async function createPot(pot: AddPot) {
    try {
        const potId = v4();

        const { potProgressId } = await potProgressService.createPotProgress({
            savingGoal: pot.savingGoal,
            amountSavedPerInterval: pot.amountSavedPerInterval,
        });
        await db.query(
            "INSERT INTO pots (id, title, description, user_id, pot_progress_id) VALUES ($1, $2, $3, $4, $5)",
            [potId, pot.title, pot.description, pot.userId, potProgressId]
        );

        return { potId };
    } catch (error) {
        console.error("Error creating pot:", error);
        throw error;
    }
}

export const potService = {
    getPotsByUserId,
    getPotById,
    createPot,
};
