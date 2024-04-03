import { Request, Response } from "express";
import { profileService } from "../../services";

const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.ctx.email) {
      res.status(401).send({
        errorMessage: "User is not authenticated.",
      });
      return;
    }

    const profile = await profileService.getProfile(req.ctx.email);

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal server error: " + JSON.stringify(error),
    });
  }
};

export const profileController = {
  getProfile,
};
