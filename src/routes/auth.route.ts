import { Router } from "express";
import { authController } from "../controllers";

const router = Router();

router.get("/auth", authController.verify);
router.post("/auth", authController.authenticate);

export const authRouter = router;
