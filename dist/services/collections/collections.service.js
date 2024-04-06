"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsService = void 0;
const db_service_1 = __importDefault(require("../../configs/db.service"));
const uuid_1 = require("uuid");
const addNewCollection = async (collectionInput) => {
    try {
        const collectionId = (0, uuid_1.v4)();
        await db_service_1.default.query("INSERT INTO collections (id, name, user_id) VALUES ($1, $2, $3)", [collectionId, collectionInput.name, collectionInput.userId]);
        return { collectionId };
    }
    catch (error) {
        console.error("Error adding new collection:", error);
        throw error;
    }
};
const getAllCollections = async () => {
    try {
        const collections = await db_service_1.default.query("SELECT * FROM collections", []);
        return collections.rows;
    }
    catch (error) {
        console.error("Error retrieving collections:", error);
        throw error;
    }
};
const getCollectionByUserId = async (userId) => {
    try {
        const collections = await db_service_1.default.query("SELECT * FROM collections WHERE user_id = $1", [userId]);
        return collections.rows;
    }
    catch (error) {
        console.error("Error retrieving collections:", error);
        throw error;
    }
};
const getCollectionById = async (collectionId) => {
    try {
        const collection = await db_service_1.default.query("SELECT * FROM collections WHERE id = $1", [collectionId]);
        if (collection.rows.length === 0) {
            return null;
        }
        return collection.rows[0];
    }
    catch (error) {
        console.error("Error retrieving collection:", error);
        throw error;
    }
};
const deleteCollectionById = async (collectionId) => {
    try {
        await db_service_1.default.query("DELETE FROM collections WHERE id = $1", [collectionId]);
    }
    catch (error) {
        console.error("Error deleting collection:", error);
        throw error;
    }
};
exports.collectionsService = {
    addNewCollection,
    getAllCollections,
    getCollectionByUserId,
    getCollectionById,
    deleteCollectionById,
};
