import { Request } from "express";
import { ShibbolethUser } from "./user";

export interface IShibbolethRequest extends Request {
  user?: ShibbolethUser; // or any other type
}
