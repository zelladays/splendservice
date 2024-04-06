import { v4 } from "uuid";
import db from "../../configs/db.service";
import { AddPot, DBPot, Pot, potMapper, UpdatePot } from "./types";
import { potProgressService } from "../potProgress";

async function getPotById(potId: string, userId: string) {
  try {
    const pot = await db.query(
      "SELECT * FROM pots WHERE id = $1 AND user_id = $2",
      [potId, userId]
    );

    if (pot.rows.length === 0) {
      return null;
    }

    return potMapper.from(pot.rows[0] as DBPot);
  } catch (error) {
    console.error("Error retrieving pot:", error);
    throw error;
  }
}

async function getPotsByUserId(userId: string) {
  try {
    const { rows } = await db.query(
      "SELECT pots.id, pots.title, pots.last_modified_timestamp, pots.collection_id, pot_progress.saving_goal, pot_progress.current_amount, pot_progress.amount_saved_per_interval FROM pots JOIN users ON pots.user_id = users.id JOIN pot_progress ON pots.pot_progress_id = pot_progress.id WHERE users.id = $1",
      [userId]
    );

    return rows.map((row) => potMapper.from(row as DBPot));
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
      "INSERT INTO pots (id, title, description, user_id, pot_progress_id, last_modified_timestamp) VALUES ($1, $2, $3, $4, $5)",
      [
        potId,
        pot.title,
        pot.description,
        pot.userId,
        potProgressId,
        Math.floor(Date.now() / 1000),
      ]
    );

    return { potId };
  } catch (error) {
    console.error("Error creating pot:", error);
    throw error;
  }
}

const updatePot = async (pot: UpdatePot) => {
  try {
    await potProgressService.updatePotProgress({
      id: pot.potProgressId,
      savingGoal: pot.savingGoal,
      amountSavedPerInterval: pot.amountSavedPerInterval,
    });

    await db.query(
      "UPDATE pots SET title = $1, description = $2, pot_progress_id = $3, last_modified_timestamp = $4 WHERE id = $5",
      [
        pot.title,
        pot.description,
        pot.potProgressId,
        Math.floor(Date.now() / 1000),
        pot.id,
      ]
    );
  } catch (error) {
    console.error("Error updating pot:", error);
    throw error;
  }
};

export const potService = {
  getPotsByUserId,
  getPotById,
  createPot,
  updatePot,
};
