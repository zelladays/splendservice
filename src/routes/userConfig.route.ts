import express from "express";
import { userConfigController } from "../controllers/userConfig";

const router = express.Router();

router.get("/user-config", userConfigController.getAllUserConfigs);
router.get("/user-config/:userId", userConfigController.getUserConfigById);

router.post("/user-config", userConfigController.createNewUserConfig);

export const userConfigRouter = router;
