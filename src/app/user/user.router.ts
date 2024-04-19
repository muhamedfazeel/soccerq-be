import express from "express";
import multer from "multer";
import { tokenHandler } from "../../middleware/validateToken";
import * as userController from "./user.controller";
const upload = multer({ dest: "tmp/csv/" });

const userRouter = express.Router();
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post(
  "/csv",
  tokenHandler,
  upload.single("user"),
  userController.uploadUserData
);

export default userRouter;
