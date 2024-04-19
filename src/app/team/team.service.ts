import * as teamRepo from "./team.repo";

export const getAllTeamList = async () => {
  try {
    return await teamRepo.getAllTeamList();
  } catch (error) {
    throw error;
  }
};

export const getAllTeamById = async (id: number) => {
  try {
    return await teamRepo.getAllTeamById(id);
  } catch (error) {
    throw error;
  }
};
