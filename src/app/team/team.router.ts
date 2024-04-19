import express from "express";
import * as teamController from "./team.controller";

const teamRouter = express.Router();

teamRouter.get("/", teamController.getAllTeamList);
teamRouter.get("/:id", teamController.getTeamById);

export default teamRouter;
