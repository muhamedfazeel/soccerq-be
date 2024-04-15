import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import * as userRepo from "./user.repo";
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
      .then(async (data) => {
        const user = await userRepo.upsertUserData(
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
            { expiresIn: "100m" }
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
