"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.potsRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/pots", controllers_1.potsController.getPots);
router.get("/pots/:userId", controllers_1.potsController.getPotsByUserId);
router.get("/pots/:potId", controllers_1.potsController.getPotById);
router.put("/pots/:potId", controllers_1.potsController.updateExistingPot);
router.post("/pots", controllers_1.potsController.createNewPot);
exports.potsRouter = router;
