import { Request, Response } from 'express';
import { parseAddPot, potService } from '../../services';

const getPotById = async (req: Request, res: Response) => {
    try {
        const potId = req.params.potId;
        const pot = await potService.getPotById(potId);
        res.status(200).json(pot);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

const getPotsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const pot = await potService.getPotsByUserId(userId);
        res.status(200).json(pot);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

const createNewPot = async (req: Request, res: Response) => {
    try {
        const pot = parseAddPot(req.body);
        const result = await potService.createPot(pot);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

export const potsController = {
    getPotById,
    getPotsByUserId,
    createNewPot
}