import { Request, Response } from "express";
import { parseAddConfig, userConfigService } from "../../services";

const getAllUserConfigs = async (req: Request, res: Response) => {
    try {
        const config = await userConfigService.getAllUserConfigs();
        res.status(200).json(config);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

const getUserConfigById = async (req: Request, res: Response) => {
    try {
        const configId = req.params.configId;
        const config = await userConfigService.getUserConfigById(configId);
        res.status(200).json(config);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

const createNewUserConfig = async (req: Request, res: Response) => {
    try {
        const config = parseAddConfig(req.body);
        const result = await userConfigService.addNewUserConfig(config);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send({ errorMessage: "Invalid request. Please check the request body and try again." + JSON.stringify(error) });
    }
}

export const userConfigController = {
    getAllUserConfigs,
    getUserConfigById,
    createNewUserConfig
}