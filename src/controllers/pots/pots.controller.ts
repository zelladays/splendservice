import { Request, Response } from "express";
import { parseAddPot, potService } from "../../services";

const getPotById = async (req: Request, res: Response) => {
    try {
        const potId = req.params.potId;

        if (!potId) {
            res.status(400).send({
                errorMessage: "Pot ID is required.",
            });
            return;
        }

        const pot = await potService.getPotById(potId);

        if (!pot) {
            res.status(404).send({
                errorMessage: "Pot not found.",
            });
            return;
        }

        res.status(200).json(pot);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

const getPotsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).send({
                errorMessage: "User ID is required.",
            });
            return;
        }

        const pot = await potService.getPotsByUserId(userId);

        res.status(200).json(pot);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

const createNewPot = async (req: Request, res: Response) => {
    try {
        if (parseAddPot(req.body).success === false) {
            res.status(400).send({
                errorMessage:
                    "Invalid request. Please check the request body and try again.",
            });
            return;
        }

        const result = await potService.createPot(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

export const potsController = {
    getPotById,
    getPotsByUserId,
    createNewPot,
};
