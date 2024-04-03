import { Request, Response } from "express";
import { profileService } from "../../services";

const getProfile = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.userContext;

    if (!userEmail) {
      res.status(401).send({
        errorMessage: "User is not authenticated.",
      });
      return;
    }

    const profile = await profileService.getProfile(userEmail);

    if (!profile) {
      res.status(404).send({
        errorMessage: "Profile not found.",
      });
      return;
    }

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
