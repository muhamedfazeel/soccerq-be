import * as dbService from "../../database/connection";
import { convertKeysToCamelCase } from "../../util/utils.service";
import { TeamDto } from "./dto/getAllTeams.dto";
import { TeamDetailDto } from "./dto/getTeamById.dto";
import { getAllTeamListQuery } from "./query/get-all-team.query";
import { getTeamByIdQuery } from "./query/get-team-by-id.query";

export const getAllTeamList = async (): Promise<Array<TeamDto>> => {
  try {
    const data = await dbService.query(getAllTeamListQuery, []);
    return convertKeysToCamelCase(data.rows as TeamDto[]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllTeamById = async (id: number): Promise<TeamDetailDto> => {
  try {
    const data = await dbService.query(getTeamByIdQuery, [id]);
    return convertKeysToCamelCase(data.rows[0].team as TeamDetailDto[]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
