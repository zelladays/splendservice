import { Request, Response } from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { userAuthenticationMiddleware } from "../../middlewares";
import { usersService } from "../../services";

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "postmessage"
);

const assertAuthenticated = async (req: Request) => {
  const token = req.cookies["SPLEND_AUTH_TOKEN"];

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

  const user = await usersService.getUserByEmail(payload.email);

  if (!user) {
    return false;
  }

  return true;
};

const authenticate = async (req: Request, res: Response) => {
  if (!req.body.code) {
    res.status(400).json({ message: "Code not provided" });
    return;
  }

  const { tokens } = await oAuth2Client.getToken(req.body.code);

  if (!tokens.id_token) {
    res.status(401).json({ message: "Authentication failed." });
    return;
  }

  res.cookie("SPLEND_AUTH_TOKEN", tokens.id_token, {
    sameSite: "none",
    secure: true,
  });

  if (await assertAuthenticated(req)) {
    res.status(200).json({ authState: "ONBOARDED" });
    return;
  }

  res.status(200).json({ authState: "NOT_ONBOARDED" });
};

const verify = async (req: Request, res: Response) => {
  const token = req.cookies.SPLEND_AUTH_TOKEN;

  if (!token) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (await assertAuthenticated(req)) {
    res.status(200).send({ authState: "LOGGED_IN" });
    return;
  }

  res.status(200).send({ authState: null });
};

export const authController = {
  authenticate,
  verify,
};
