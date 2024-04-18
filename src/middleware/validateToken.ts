import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenRequest } from "../shared/dto/modifiedRequest.dto";

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
          res.status(401);
          throw new Error("user not authenticated");
        }
        (req as TokenRequest).user = (decoded as JwtPayload).user;
        next();
      });
    } else {
      res.status(401);
      throw new Error("no token provided");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
