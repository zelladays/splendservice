import { Request, Response } from "express";
import { parseAddUser, usersService } from "../../services";

const createUser = async (req: Request, res: Response) => {
  try {
    if (parseAddUser(req.body).success === false) {
      res.status(400).send({
        errorMessage:
          "Invalid request. Please check the request body and try again.",
      });
      return;
    }

    const result = await usersService.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal server error: " + JSON.stringify(error),
    });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.userEmail;

    if (!userEmail) {
      res.status(400).send({
        errorMessage: "User email is required.",
      });
      return;
    }

    const user = await usersService.getUserByEmail(userEmail);

    if (!user) {
      res.status(404).send({
        errorMessage: "User not found.",
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal server error: " + JSON.stringify(error),
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal server error: " + JSON.stringify(error),
    });
  }
};

export const userController = {
  createUser,
  getUserByEmail,
  getAllUsers,
};
