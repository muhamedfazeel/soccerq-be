import { Request, Response } from "express";
import httpStatus from "http-status";

import * as userService from "./user.service";

export const getAllUsers = (req: Request, res: Response) => {
  res.send("All users");
};

export const loginUser = async (req: Request, res: Response) => {
  const credential: string | undefined = req.headers["x-user-auth-token"] as
    | string
    | undefined; // Type assertion for better type inference
  if (credential) {
    userService
      .loginUser(credential)
      .then((data) => {
        res.status(httpStatus.CREATED).json(data);
      })
      .catch((err) => {
        console.error("Error verifying token:", err);
        res.status(httpStatus.NOT_FOUND).json({ error: "Invalid token" });
      });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: "Token not provided" });
  }
};
