import { Request, Response } from "express";
import { collectionsService, parseAddCollection } from "../../services";

const createCollection = async (req: Request, res: Response) => {
    try {
        if (parseAddCollection(req.body).success === false) {
            res.status(400).send({
                errorMessage:
                    "Invalid request. Please check the request body and try again.",
            });
            return;
        }

        const result = await collectionsService.addNewCollection(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

const getCollectionById = async (req: Request, res: Response) => {
    try {
        const collectionId = req.params.collectionId;
        const collection =
            await collectionsService.getCollectionById(collectionId);
        res.status(200).json(collection);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

const getCollectionByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const collections =
            await collectionsService.getCollectionByUserId(userId);
        res.status(200).json(collections);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

const deleteCollectionById = async (req: Request, res: Response) => {
    try {
        const collectionId = req.params.collectionId;
        await collectionsService.deleteCollectionById(collectionId);
        res.status(200).send("Collection deleted successfully");
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

export const collectionsController = {
    createCollection,
    getCollectionById,
    getCollectionByUserId,
    deleteCollectionById,
};
