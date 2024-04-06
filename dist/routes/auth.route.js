"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/auth", controllers_1.authController.verify);
router.post("/auth", controllers_1.authController.authenticate);
exports.authRouter = router;
