"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContext = void 0;
const services_1 = require("../services");
const userContext = async (req, res, next) => {
    try {
        const { userEmail } = req.userContext;
        if (!userEmail) {
            res.status(401).send({
                errorMessage: "User email is required.",
            });
            return;
        }
        const user = await services_1.usersService.getUserByEmail(userEmail);
        if (!user) {
            res.status(401).send({
                errorMessage: "User not found.",
            });
            return;
        }
        req.userContext = {
            userId: user.id,
            userEmail,
            userRole: user.role,
        };
        next();
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
exports.userContext = userContext;
