"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
const services_1 = require("../../services");
dotenv_1.default.config();
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, "postmessage");
const assertAuthenticated = async (req) => {
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
    const user = await services_1.usersService.getUserByEmail(payload.email);
    if (!user) {
        return false;
    }
    return true;
};
const authenticate = async (req, res) => {
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
const verify = async (req, res) => {
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
exports.authController = {
    authenticate,
    verify,
};
