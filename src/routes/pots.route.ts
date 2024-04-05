import express from "express";
import { potsController } from "../controllers";

const router = express.Router();

router.get("/pots", potsController.getPots);
router.get("/pots/:userId", potsController.getPotsByUserId);
router.get("/pots/:potId", potsController.getPotById);
router.put("/pots/:potId", potsController.updateExistingPot);

router.post("/pots", potsController.createNewPot);

export const potsRouter = router;
