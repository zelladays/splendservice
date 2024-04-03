"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
dotenv_1.default.config();
const router = (0, express_1.Router)();
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, "postmessage");
router.post("/auth", async (req, res) => {
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
exports.authRouter = router;
