import db from "../db.service";
import { v4 } from "uuid";
import { AddCollection } from "./types";

const addNewCollection = async (collectionInput: AddCollection) => {
    try {
        const collectionId = v4();
        await db.query(
            "INSERT INTO collections (id, name, user_id) VALUES ($1, $2, $3)",
            [collectionId, collectionInput.name, collectionInput.userId]
        );
        return { collectionId };
    } catch (error) {
        console.error("Error adding new collection:", error);
        throw error;
    }
};

const getAllCollections = async () => {
    try {
        const collections = await db.query("SELECT * FROM collections", []);
        return collections.rows;
    } catch (error) {
        console.error("Error retrieving collections:", error);
        throw error;
    }
};

const getCollectionByUserId = async (userId: string) => {
    try {
        const collections = await db.query(
            "SELECT * FROM collections WHERE user_id = $1",
            [userId]
        );
        return collections.rows;
    } catch (error) {
        console.error("Error retrieving collections:", error);
        throw error;
    }
};

const getCollectionById = async (collectionId: string) => {
    try {
        const collection = await db.query(
            "SELECT * FROM collections WHERE id = $1",
            [collectionId]
        );
        return collection.rows[0];
    } catch (error) {
        console.error("Error retrieving collection:", error);
        throw error;
    }
};

const deleteCollectionById = async (collectionId: string) => {
    try {
        await db.query("DELETE FROM collections WHERE id = $1", [collectionId]);
    } catch (error) {
        console.error("Error deleting collection:", error);
        throw error;
    }
};

export const collectionsService = {
    addNewCollection,
    getAllCollections,
    getCollectionByUserId,
    getCollectionById,
    deleteCollectionById,
};
