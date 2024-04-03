"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConfigController = void 0;
const services_1 = require("../../services");
const getAllUserConfigs = async (req, res) => {
    try {
        const config = await services_1.userConfigService.getAllUserConfigs();
        res.status(200).json(config);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getUserConfigById = async (req, res) => {
    try {
        const configId = req.params.configId;
        if (!configId) {
            res.status(400).send({
                errorMessage: "Config ID is required.",
            });
            return;
        }
        const config = await services_1.userConfigService.getUserConfigById(configId);
        if (!config) {
            res.status(404).send({
                errorMessage: "Config not found.",
            });
            return;
        }
        res.status(200).json(config);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const createNewUserConfig = async (req, res) => {
    try {
        const result = await services_1.userConfigService.addNewUserConfig();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
exports.userConfigController = {
    getAllUserConfigs,
    getUserConfigById,
    createNewUserConfig,
};
