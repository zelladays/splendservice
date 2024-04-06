"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../../services");
const createUser = async (req, res) => {
    try {
        if ((0, services_1.parseAddUser)(req.body).success === false) {
            res.status(400).send({
                errorMessage: "Invalid request. Please check the request body and try again.",
            });
            return;
        }
        const result = await services_1.usersService.createUser(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getUserByEmail = async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        if (!userEmail) {
            res.status(400).send({
                errorMessage: "User email is required.",
            });
            return;
        }
        const user = await services_1.usersService.getUserByEmail(userEmail);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await services_1.usersService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send({
            errorMessage: "Internal server error: " + JSON.stringify(error),
        });
    }
};
exports.userController = {
    createUser,
    getUserByEmail,
    getAllUsers,
};
