import express from "express";
import { userController } from "../controllers/users";

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:userEmail", userController.getUserByEmail);

router.post("/users", userController.createUser);

export const userRouter = router;
