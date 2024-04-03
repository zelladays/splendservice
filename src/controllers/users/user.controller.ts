import { Request, Response } from "express";
import { parseUser, userApplication } from "../../services";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = parseUser(req.body);
        const result = await userApplication.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.userEmail;
        const user = await userApplication.getUserByEmail(userEmail);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userApplication.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send({
            errorMessage:
                "Invalid request. Please check the request body and try again." +
                JSON.stringify(error),
        });
    }
};

export const userController = {
    createUser,
    getUserByEmail,
    getAllUsers,
};
