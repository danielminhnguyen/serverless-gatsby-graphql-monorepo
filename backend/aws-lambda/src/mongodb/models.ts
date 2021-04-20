import mongoose, { Date, Document, Model } from "mongoose";

// Koha Clubs Table Modelling
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

// link to existing collection on mongodb
export const KohaModel: mongoose.Model<IKoha> = mongoose.model(
  "KohaClub",
  kohaclubSchema,
  "kohaclub"
);

// Transaction Table Modelling
export interface ITrasactions extends mongoose.Document {
  _id: string;
  clubId: string;
  date: Date;
  amount: number;
}

const TransactionsSchema: mongoose.Schema = new mongoose.Schema({
  _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  clubId: { type: mongoose.SchemaTypes.String },
  date: { type: mongoose.SchemaTypes.Date, default: Date.now },
  amount: { type: mongoose.SchemaTypes.Number },
});

// link to existing collection on mongodb
export const TransactionsModel: mongoose.Model<ITrasactions> = mongoose.model(
  "transactions",
  TransactionsSchema,
  "transactions"
);
