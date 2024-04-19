import { Request, Response } from "express";
import httpStatus from "http-status";
import * as authService from "./auth.service";

export const loginUser = async (req: Request, res: Response) => {
  const credential: string | undefined = req.headers["x-user-auth-token"] as
    | string
    | undefined; // Type assertion for better type inference
  if (credential) {
    authService
      .loginUser(credential)
      .then(async (data) => {
        const token = await authService.authenticateUser(data);
        res.status(201).json({ token });
      })
      .catch((err) => {
        console.error("Error verifying token:", err);
        res.status(httpStatus.NOT_FOUND).json({ error: "Invalid token" });
      });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: "Token not provided" });
  }
};
