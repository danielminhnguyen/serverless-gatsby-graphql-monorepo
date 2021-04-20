import * as Mongoose from "mongoose";
import ClubSchema from "./clubs.schema";
import { IClubDocument, IClubModel } from "./clubs.types";

export const UserModel = Mongoose.model<IClubDocument>(
  "kohaclub",
  ClubSchema,
  "kohaclub"
) as IClubModel;
