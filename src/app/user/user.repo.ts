import format = require("pg-format");
import * as dbService from "../../database/connection";
import { UserDto } from "./dto/userDto";
import { getAllUsersQuery } from "./query/get-all-users.query";
import { getUserByIdQuery } from "./query/get-user-by-id.query";
import { inserUsersDataQuery } from "./query/insert-users-data.query";

export const getAllUsers = async (): Promise<Array<UserDto>> => {
  try {
    const data = await dbService.query(getAllUsersQuery, []);
    return data?.rows as UserDto[];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserById = async (id: number): Promise<UserDto> => {
  try {
    const data = await dbService.query(getUserByIdQuery, [id]);
    return data.rows[0] as UserDto;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertUserData = async (
  data: any[],
  userId: number | undefined
) => {
  try {
    const userData = addUserExtraFields(data, userId);
    const insertData = generateInsertData(userData);
    await dbService.query(format(inserUsersDataQuery, insertData), []);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
function generateInsertData(dataToInsert: any[]) {
  const data = [];
  for (const element of dataToInsert) {
    for (const [key, value] of Object.entries(element)) {
      if (!value) {
        element[key] = null;
      }
    }
    data.push(Object.values(element));
  }
  return data;
}

function addUserExtraFields(dataArray: any[], userId: number | undefined) {
  const nowTime = new Date();
  dataArray = dataArray.map((el) => ({
    name: el.name,
    email: el.email,
    image_url: el.image_url,
    is_player: true,
    updated_by: userId,
    created_at: nowTime,
    updated: nowTime,
  }));
  return dataArray;
}
