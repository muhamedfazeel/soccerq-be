import { CustomError } from "../../util/error.class";

export const validateUser = (id: any) => {
  if (!id || typeof id != "number") {
    throw new CustomError("invalid id provided", 400);
  }
};
