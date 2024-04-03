"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsController = void 0;
const services_1 = require("../../services");
const createCollection = async (req, res) => {
    try {
        if ((0, services_1.parseAddCollection)(req.body).success === false) {
            res.status(400).send({
                errorMessage: "Invalid request. Please check the request body and try again.",
            });
            return;
        }
        const result = await services_1.collectionsService.addNewCollection(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getCollectionById = async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        const collection = await services_1.collectionsService.getCollectionById(collectionId);
        res.status(200).json(collection);
    }
    catch (error) {
        res.status(400).send({
            errorMessage: "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};
const getCollectionByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const collections = await services_1.collectionsService.getCollectionByUserId(userId);
        res.status(200).json(collections);
    }
    catch (error) {
        res.status(400).send({
            errorMessage: "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};
const deleteCollectionById = async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        await services_1.collectionsService.deleteCollectionById(collectionId);
        res.status(200).send("Collection deleted successfully");
    }
    catch (error) {
        res.status(400).send({
            errorMessage: "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};
exports.collectionsController = {
    createCollection,
    getCollectionById,
    getCollectionByUserId,
    deleteCollectionById,
};
