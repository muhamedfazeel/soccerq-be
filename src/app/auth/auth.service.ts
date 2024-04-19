import { OAuth2Client, TokenPayload } from "google-auth-library";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { CustomError } from "../../util/error.class";
import * as authRepo from "./auth.repo";

export const loginUser = async (credential: string) => {
  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.google.clientId,
  });
  const payload: TokenPayload | undefined = ticket.getPayload(); // Ensure payload is of type TokenPayload
  return authenticateUser(payload);
};

const authenticateUser = async (data: any) => {
  const user = await authRepo.upsertUserData(
    data?.name,
    data?.email,
    data?.picture
  );
  if (user) {
    const token = jwt.sign(
      {
        user: { email: user.email, name: user.name, id: user.id },
      },
      process.env.TOKEN_SECRET || "",
      { expiresIn: process.env.EXPIRY }
    );
    return token;
  } else {
    throw new CustomError("unauthorised", 401);
  }
};
