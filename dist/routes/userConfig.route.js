"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConfigRouter = void 0;
const express_1 = __importDefault(require("express"));
const userConfig_1 = require("../controllers/userConfig");
const router = express_1.default.Router();
router.get("/user-config", userConfig_1.userConfigController.getAllUserConfigs);
router.get("/user-config/:userId", userConfig_1.userConfigController.getUserConfigById);
router.post("/user-config", userConfig_1.userConfigController.createNewUserConfig);
exports.userConfigRouter = router;
