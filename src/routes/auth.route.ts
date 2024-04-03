import { Router } from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const router = Router();

const oAuth2Client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "postmessage"
);

router.post("/auth", async (req, res) => {
  if (!req.body.code) {
    res.status(400).send({ message: "Code not provided" });
    return;
  }

  const { tokens } = await oAuth2Client.getToken(req.body.code);

  if (!tokens.id_token) {
    res.status(401).send({ message: "Authentication failed." });
    return;
  }

  res.cookie("SPLEND_AUTH_TOKEN", tokens.id_token, {
    sameSite: "none",
    secure: true,
  });
  res.status(200).send({ message: "User authenticated" });
});

export const authRouter = router;
