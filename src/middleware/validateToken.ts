import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenRequest } from "../shared/dto/modifiedRequest.dto";
import { CustomError } from "../util/error.class";

export const tokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    let headers = req.headers["authorization"] as string;
    if (headers && headers.startsWith("Bearer")) {
      token = headers.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET || "", (err, decoded) => {
        if (err) {
          throw new CustomError("user not authenticated", 401);
        }
        (req as TokenRequest).user = (decoded as JwtPayload).user;
        next();
      });
    } else {
      throw new CustomError("no token provided", 401);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
