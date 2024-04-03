"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const services_1 = require("../../services");
const getProfile = async (req, res) => {
    try {
        if (!req.ctx.email) {
            res.status(401).send({
                errorMessage: "User is not authenticated.",
            });
            return;
        }
        const profile = await services_1.profileService.getProfile(req.ctx.email);
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
exports.profileController = {
    getProfile,
};
