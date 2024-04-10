import { OAuth2Client, TokenPayload } from "google-auth-library";
import { config } from "../../config/config";

export const loginUser = async (credential: string) => {
  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.google.clientId,
  });
  const payload: TokenPayload | undefined = ticket.getPayload(); // Ensure payload is of type TokenPayload
  const userid: string | null = payload ? payload.sub : null;
  return { payload, userid };
};
