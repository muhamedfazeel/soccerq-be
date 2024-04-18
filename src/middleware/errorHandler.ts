import { NextFunction, Request, Response } from "express";
import { constants } from "../shared/constants";
import { SoccerQResponse } from "../util/response.class";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json(new SoccerQResponse(res.statusCode, null, err.message));
      break;
    case constants.FORBIDDEN:
      res.json(new SoccerQResponse(res.statusCode, null, err.message));
      break;
    case constants.UNAUTHORIZED:
      res.json(new SoccerQResponse(res.statusCode, null, err.message));
      break;
    case constants.SERVER_ERROR:
      res.json(new SoccerQResponse(res.statusCode, null, err.message));
      break;
    case constants.NOT_FOUND:
      res.json(new SoccerQResponse(res.statusCode, null, err.message));
      break;
    default:
      break;
  }
};
