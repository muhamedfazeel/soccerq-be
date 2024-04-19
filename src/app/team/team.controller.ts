import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "../../util/response.class";
import * as teamService from "./team.service";

export const getAllTeamList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await teamService.getAllTeamList();
    res.status(200).json(new CustomResponse(200, data, null));
  } catch (error) {
    next(error);
  }
};

export const getTeamById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (!id || typeof id != "number") {
      res.status(400);
      throw new Error("Invalid id provided");
    }
    const data = await teamService.getAllTeamById(id);
    res.status(200).json(new CustomResponse(200, data, null));
  } catch (error) {
    next(error);
  }
};
