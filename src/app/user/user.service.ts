const fs = require("fs");
import { parse as csvParser } from "csv";
import { parseOptions } from "./dto/import-interface";
import { UserDto } from "./dto/userDto";
import * as userRepo from "./user.repo";

export const getAllUsers = async (): Promise<Array<UserDto>> => {
  try {
    const data = await userRepo.getAllUsers();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    return await userRepo.getUserById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadCsv = async (file: any, userId: number | undefined) => {
  const userData: any = [];

  const parseOptions: parseOptions = {
    relax: true,
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  };
  fs.createReadStream(file.path)
    .pipe(csvParser(parseOptions))
    .on("data", function (row: any) {
      userData.push(row);
    })
    .on("end", async () => {
      try {
        await userRepo.insertUserData(userData, userId);
        fs.unlinkSync(file.path);
        return;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
};
