import { NextFunction, Request, Response } from "express";
import { usersService } from "../services";

export const userContext = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail } = req.userContext;

    if (!userEmail) {
      res.status(401).send({
        errorMessage: "User email is required.",
      });
      return;
    }

    const user = await usersService.getUserByEmail(userEmail);

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
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal server error: " + JSON.stringify(error),
    });
  }
};
