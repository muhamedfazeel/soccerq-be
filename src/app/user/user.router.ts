import express from "express";
import * as userController from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/login", userController.loginUser);

export default userRouter;
