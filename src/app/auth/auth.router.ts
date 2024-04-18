import express from "express";
import * as authController from "./auth.controller";

const authRouter = express.Router();
authRouter.post("/login", authController.loginUser);

export default authRouter;
