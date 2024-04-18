import { NextFunction, Request, Response } from "express";
import { TokenRequest } from "../../shared/dto/modifiedRequest.dto";
import { SoccerQResponse } from "../../util/response.class";
import * as userService from "./user.service";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json(new SoccerQResponse(200, data, null));
  } catch (err) {
    res.status(500);
    next(err);
  }
};

export const getUserById = async (
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
    const data = await userService.getUserById(id);
    if (!data) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(new SoccerQResponse(200, data, null));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const uploadUserData = async (
  req: TokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    await userService.uploadCsv(req.file, userId);
    res.status(200).json(new SoccerQResponse(200, null, null));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
