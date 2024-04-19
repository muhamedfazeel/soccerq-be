import { databaseConfig } from "./database.config";

const env = process.env;

export const config = {
  db: databaseConfig,
  google: {
    clientId: env.GOOGLE_CLIENT_ID,
  },
};
