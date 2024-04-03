"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get("/users", users_1.userController.getAllUsers);
router.get("/users/:userEmail", users_1.userController.getUserByEmail);
router.post("/users", users_1.userController.createUser);
exports.userRouter = router;
