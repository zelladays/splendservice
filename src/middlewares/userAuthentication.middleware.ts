import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

export const userAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      throw new Error("Authorization token not provided");
    }

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid Token");
    }

    if (!payload.email) {
      throw new Error("Email not found in token payload");
    }

    const email = payload.email;
    req["email"] = email;

    next();
  } catch (error) {
    console.error("Error in addEmailToRequest middleware:", error);
    res.status(401).json({ error: `Unauthorized: ${error}` });
  }
};
