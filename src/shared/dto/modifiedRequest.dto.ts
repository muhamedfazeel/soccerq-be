import { Request } from "express";
export interface TokenRequest extends Request {
  user?: User;
}

interface User {
  email: string;
  name: string;
  id: number;
}
