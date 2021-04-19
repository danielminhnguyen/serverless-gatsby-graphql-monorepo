import mongoose, { Number } from "mongoose";

export interface IKoha extends mongoose.Document {
  _id: string;
  name: string;
  Amount: Number;
}

// const schema: mongoose.SchemaDefinition = {
//   _id: { type: mongoose.SchemaTypes.Number, required: true },
//   name: { type: mongoose.SchemaTypes.String, required: true },
//   Amount: { type: mongoose.SchemaTypes.Number, required: true },
// };

const collectionName: string = "kohaclub";
// const kohaclubSchema: mongoose.Schema = new mongoose.Schema(schema);
const kohaclubSchema: mongoose.Schema = new mongoose.Schema({
  _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  name: { type: mongoose.SchemaTypes.String, required: true },
  Amount: { type: mongoose.SchemaTypes.Number, required: true },
});

// const kohaclub = mongoose.model("kohaclub", kohaclubSchema);
// const Kohaclub = (conn: mongoose.Connection): any => {
//   conn.model(collectionName, kohaclubSchema);
// };

const Kohaclub: mongoose.Model<IKoha> = mongoose.model(
  collectionName,
  kohaclubSchema
);

export default Kohaclub;
