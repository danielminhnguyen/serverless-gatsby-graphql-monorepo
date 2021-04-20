import mongoose, { Document, Model } from "mongoose";

export interface IKoha extends mongoose.Document {
  _id: string;
  name: string;
  Amount: number;
}

const kohaclubSchema: mongoose.Schema = new mongoose.Schema({
  _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  name: { type: mongoose.SchemaTypes.String, required: true },
  Amount: { type: mongoose.SchemaTypes.Number, required: true },
});

export const KohaModel: mongoose.Model<IKoha> = mongoose.model(
  "KohaClub",
  kohaclubSchema,
  "kohaclub"
);
