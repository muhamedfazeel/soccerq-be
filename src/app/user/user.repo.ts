import * as dbService from "../../database/connection";
import { userDataUpsertQuery } from "./query/user-data-upsert.query";
export const upsertUserData = async (
  name: string | undefined,
  email: string | undefined,
  picture: string | undefined
): Promise<any> => {
  try {
    const data = await dbService.query(userDataUpsertQuery, [
      name,
      email,
      picture,
    ]);
    return data?.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
