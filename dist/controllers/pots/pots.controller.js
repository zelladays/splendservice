"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.potsController = void 0;
const services_1 = require("../../services");
const getPots = async (req, res) => {
    try {
        const { userId } = req.userContext;
        if (!userId) {
            res.status(401).send({
                errorMessage: "User ID is required.",
            });
            return;
        }
        const pots = await services_1.potService.getPotsByUserId(userId);
        res.status(200).json(pots);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getPotById = async (req, res) => {
    try {
        const { userId } = req.userContext;
        if (!userId) {
            res.status(401).send({
                errorMessage: "User ID is required.",
            });
            return;
        }
        const potId = req.params.potId;
        if (!potId) {
            res.status(400).send({
                errorMessage: "Pot ID is required.",
            });
            return;
        }
        const pot = await services_1.potService.getPotById(potId, userId);
        if (!pot) {
            res.status(404).send({
                errorMessage: "Pot not found.",
            });
            return;
        }
        res.status(200).json(pot);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getPotsByUserId = async (req, res) => {
    try {
        const reqUserId = req.params.userId;
        if (!reqUserId) {
            res.status(400).send({
                errorMessage: "User ID is required.",
            });
            return;
        }
        const { userId, userRole } = req.userContext;
        if (!userId || userRole !== "SUPER_ADMIN") {
            res.status(403).send({
                errorMessage: "Unauthorized.",
            });
            return;
        }
        const pot = await services_1.potService.getPotsByUserId(reqUserId);
        res.status(200).json(pot);
    }
    catch (error) {
        res.status(400).send({
            errorMessage: "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};
const createNewPot = async (req, res) => {
    try {
        if ((0, services_1.parseAddPot)(req.body).success === false) {
            res.status(400).send({
                errorMessage: "Invalid request. Please check the request body and try again.",
            });
            return;
        }
        const result = await services_1.potService.createPot(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
exports.potsController = {
    getPots,
    getPotById,
    getPotsByUserId,
    createNewPot,
};
