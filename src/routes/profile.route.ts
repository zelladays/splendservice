import express from "express";
import { profileController } from "../controllers";

const router = express.Router();

router.get("/profile", profileController.getProfile);

export const profileRouter = router;
