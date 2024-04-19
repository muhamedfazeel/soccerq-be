import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "../util/response.class";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json(new CustomResponse(statusCode, null, err.message));
};
