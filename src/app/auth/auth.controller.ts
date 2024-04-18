import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import * as authRepo from "./auth.repo";
import * as authService from "./auth.service";

export const loginUser = async (req: Request, res: Response) => {
  const credential: string | undefined = req.headers["x-user-auth-token"] as
    | string
    | undefined; // Type assertion for better type inference
  if (credential) {
    authService
      .loginUser(credential)
      .then(async (data) => {
        const user = await authRepo.upsertUserData(
          data?.payload?.name,
          data?.payload?.email,
          data?.payload?.picture
        );
        if (user) {
          const token = jwt.sign(
            {
              user: { email: user.email, name: user.name, id: user.id },
            },
            process.env.TOKEN_SECRET || "",
            { expiresIn: process.env.EXPIRY }
          );
          res.status(201).json({ token });
        } else {
          res.status(401);
          throw new Error("unauthorised");
        }
      })
      .catch((err) => {
        console.error("Error verifying token:", err);
        res.status(httpStatus.NOT_FOUND).json({ error: "Invalid token" });
      });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: "Token not provided" });
  }
};
