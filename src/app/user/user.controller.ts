import { NextFunction, Request, Response } from "express";
import { TokenRequest } from "../../shared/dto/modifiedRequest.dto";
import { CustomError } from "../../util/error.class";
import { CustomResponse } from "../../util/response.class";
import * as userService from "./user.service";
import * as userValidation from "./user.validation";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json(new CustomResponse(200, data, null));
  } catch (err) {
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
    userValidation.validateUser(id);
    const data = await userService.getUserById(id);
    if (!data) {
      throw new CustomError("User not found", 404);
    }
    res.status(200).json(new CustomResponse(200, data, null));
  } catch (err: any) {
    res.status(err.status);
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
    res.status(200).json(new CustomResponse(200, null, null));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
