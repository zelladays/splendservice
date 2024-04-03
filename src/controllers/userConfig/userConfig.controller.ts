import { Request, Response } from "express";
import { parseAddConfig, userConfigService } from "../../services";

const getAllUserConfigs = async (req: Request, res: Response) => {
    try {
        const config = await userConfigService.getAllUserConfigs();
        res.status(200).json(config);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

const getUserConfigById = async (req: Request, res: Response) => {
    try {
        const configId = req.params.configId;

        if (!configId) {
            res.status(400).send({
                errorMessage: "Config ID is required.",
            });
            return;
        }

        const config = await userConfigService.getUserConfigById(configId);

        if (!config) {
            res.status(404).send({
                errorMessage: "Config not found.",
            });
            return;
        }

        res.status(200).json(config);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

const createNewUserConfig = async (req: Request, res: Response) => {
    try {
        const result = await userConfigService.addNewUserConfig();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};

export const userConfigController = {
    getAllUserConfigs,
    getUserConfigById,
    createNewUserConfig,
};
