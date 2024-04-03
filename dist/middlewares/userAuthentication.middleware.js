"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticationMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
dotenv_1.default.config();
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
const userAuthenticationMiddleware = async (req, res, next) => {
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
    }
    catch (error) {
        console.error("Error in addEmailToRequest middleware:", error);
        res.status(401).json({ error: `Unauthorized: ${error}` });
    }
};
exports.userAuthenticationMiddleware = userAuthenticationMiddleware;
