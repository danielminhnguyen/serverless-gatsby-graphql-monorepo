import { Document, Model } from "mongoose";

export interface IClub {
  name: string;
  Amount: number;
}

export interface IClubDocument extends IClub, Document {}

export interface IClubModel extends Model<IClubDocument> {}
